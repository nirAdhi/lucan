# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

# ---- dependencies -----------------------------------------------------------
FROM base AS deps
# sharp (next/image optimization) needs these on musl/alpine.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- build --------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Public env vars are baked in at build time (Next.js inlines NEXT_PUBLIC_*), so pass them
# through as build args if the deployed origin differs from the .env.example default.
ARG NEXT_PUBLIC_SITE_URL=https://ldic.ie
ARG NEXT_PUBLIC_GA4_ID=
ARG NEXT_PUBLIC_GSC_VERIFICATION=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GA4_ID=$NEXT_PUBLIC_GA4_ID \
    NEXT_PUBLIC_GSC_VERIFICATION=$NEXT_PUBLIC_GSC_VERIFICATION
RUN npm run build

# ---- runtime --------------------------------------------------------------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    # BOOKING_LOG_FILE's default (.env.example) is a relative .data/ dir - create it here
    # so the non-root user can write to it even before a volume is mounted over it.
    && mkdir -p /app/.data && chown nextjs:nodejs /app/.data

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/', r => process.exit(r.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "server.js"]

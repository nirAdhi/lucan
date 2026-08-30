# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

# ---- dependencies -----------------------------------------------------------
FROM base AS deps
# sharp (next/image optimization) needs these on musl/alpine.
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json ./
# postinstall runs `prisma generate`, which needs the schema present.
COPY prisma ./prisma
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
# Prisma's query engine binary is linked against OpenSSL - missing on bare Alpine.
RUN apk add --no-cache openssl
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    # BOOKING_LOG_FILE's default (.env.example) is a relative .data/ dir, and uploaded
    # photos go to public/uploads - create both here so the non-root user can write to
    # them even before a volume is mounted over them.
    && mkdir -p /app/.data /app/public/uploads \
    && chown -R nextjs:nodejs /app/.data /app/public/uploads

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Next's standalone output tracing doesn't always pick up Prisma's native query engine
# binary (it's loaded dynamically, not via a static require) - copy it explicitly.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma/client ./node_modules/@prisma/client

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/', r => process.exit(r.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "server.js"]

import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe half of the Auth.js config - no providers with Node-only code (like
 * node:crypto), so this can be imported from src/middleware.ts, which runs on the Edge
 * runtime. src/auth.ts extends this with the actual Credentials provider for everywhere
 * else (API route, Server Actions, Server Components - all Node runtime).
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  // Self-hosted behind an unknown/no reverse proxy - without this Auth.js v5 rejects
  // requests whose Host header it doesn't recognise ("UntrustedHost").
  trustHost: true,
  providers: [],
};

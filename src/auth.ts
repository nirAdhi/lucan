import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createHash, timingSafeEqual } from "node:crypto";
import { authConfig } from "@/auth.config";

/**
 * Single practice-admin login (PRD Phase 2 admin CMS). One username/password pair from
 * environment variables - no user table, no OAuth, no multi-user roles, because this is a
 * one-practice site with one operator.
 *
 * This file (unlike auth.config.ts) uses node:crypto, so it must only be imported from
 * Node-runtime code - the API route, Server Actions and Server Components. Never import it
 * from src/middleware.ts, which runs on the Edge runtime and doesn't have node:crypto.
 *
 * Credentials are compared with a constant-time hash comparison rather than `===`, so the
 * check doesn't leak timing information about how much of the password was correct.
 */
function safeEqual(a: string, b: string): boolean {
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const expectedUser = process.env.ADMIN_USERNAME;
        const expectedPass = process.env.ADMIN_PASSWORD;
        if (!expectedUser || !expectedPass) return null;

        const username = typeof credentials?.username === "string" ? credentials.username : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";
        if (!username || !password) return null;

        if (safeEqual(username, expectedUser) && safeEqual(password, expectedPass)) {
          return { id: "admin", name: "Practice admin" };
        }
        return null;
      },
    }),
  ],
});

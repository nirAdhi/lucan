import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "LDIC Admin", template: "%s | LDIC Admin" },
  robots: { index: false, follow: false },
};

/**
 * Every admin route renders per-request, including the login and "new" forms that would
 * otherwise be prerendered.
 *
 * This is required, not a preference: the CSP in src/middleware.ts carries a per-request
 * nonce, and prerendered HTML is generated at build time with a nonce that no longer
 * matches. The browser then blocks every script on the page - which for /admin/login means
 * a sign-in form that cannot submit.
 */
export const dynamic = "force-dynamic";

/**
 * Just the metadata - the visible admin chrome (nav, sign-out) lives in the nested
 * (dashboard) layout so /admin/login can render its own plain, unauthenticated page
 * instead of a dashboard nav that would just bounce back to login.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}

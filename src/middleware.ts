import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";
import { findRedirect } from "@/content/redirects";

// Built from authConfig (not @/auth) deliberately - middleware runs on the Edge runtime,
// and @/auth pulls in node:crypto for the Credentials provider's authorize(), which the
// Edge runtime can't bundle. This instance only ever reads the signed session cookie
// (JWT strategy), so it never needs that provider or a database connection.
const { auth } = NextAuth(authConfig);

/**
 * Legacy URL redirects (PRD s23, s73) plus the /admin auth gate (Phase 2 admin CMS).
 *
 * Redirects run before routing, so an old WordPress URL is redirected before Next has a
 * chance to 404 it.
 */
export default auth((request) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!request.auth) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  const rule = findRedirect(pathname);
  if (!rule) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = rule.to;
  // Query strings are preserved: paid traffic pointed at an old URL keeps its UTMs.
  return NextResponse.redirect(url, rule.status);
});

export const config = {
  /**
   * Skip static assets and the API. Everything else is cheap to check - the redirect
   * lookup is a Map hit.
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};

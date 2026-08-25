import { NextResponse, type NextRequest } from "next/server";
import { findRedirect } from "@/content/redirects";

/**
 * Legacy URL redirects (PRD s23, s73).
 *
 * Runs before routing, so an old WordPress URL is redirected before Next has a chance to
 * 404 it. Kept in middleware rather than next.config so that Phase 2 can back the redirect
 * table with PostgreSQL and let the admin add rules without a deploy.
 */
export function middleware(request: NextRequest) {
  const rule = findRedirect(request.nextUrl.pathname);
  if (!rule) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = rule.to;
  // Query strings are preserved: paid traffic pointed at an old URL keeps its UTMs.
  return NextResponse.redirect(url, rule.status);
}

export const config = {
  /**
   * Skip static assets and the API. Everything else is cheap to check - the redirect
   * lookup is a Map hit.
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};

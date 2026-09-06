import NextAuth from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authConfig } from "@/auth.config";
import { findRedirect } from "@/content/redirects";

// Built from authConfig (not @/auth) deliberately - middleware runs on the Edge runtime,
// and @/auth pulls in node:crypto for the Credentials provider's authorize(), which the
// Edge runtime can't bundle. This instance only ever reads the signed session cookie
// (JWT strategy), so it never needs that provider or a database connection.
const { auth } = NextAuth(authConfig);

/**
 * Per-request Content-Security-Policy with a fresh nonce.
 *
 * `strict-dynamic` means we trust the scripts Next itself injects (which carry the nonce)
 * and anything they load, rather than trying to keep a host allowlist in sync with the
 * build output. Without a nonce the only way to run Next's inline bootstrap is
 * 'unsafe-inline', which makes the whole policy decorative.
 *
 * Known compromises, both deliberate:
 *  - style-src keeps 'unsafe-inline'. React writes inline style attributes and Next inlines
 *    critical CSS; there is no nonce path for those, and style injection is a far weaker
 *    vector than script injection.
 *  - No Trusted Types. Enforcing it would require every DOM sink in Next's runtime to be
 *    Trusted-Types-aware, which it is not - turning it on would break the app, not harden it.
 *
 * Cloudinary is allowed for media/images because the hero video is served from there
 * (content/site.ts); Google Maps is allowed as a frame source but is only ever loaded
 * after the visitor clicks "Show map" (components/sections/MapEmbed.tsx).
 */
function buildCsp(nonce: string, isDev: boolean): string {
  return [
    "default-src 'self'",
    // 'unsafe-eval' only in dev: React Refresh needs it, production never should.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: ${isDev ? "'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://res.cloudinary.com https://maps.gstatic.com https://*.googleapis.com",
    "media-src 'self' https://res.cloudinary.com",
    "font-src 'self' data:",
    // ws:/wss: in dev only, for the hot-reload socket. Chrome accepts a same-origin
    // websocket under 'self', but not if dev is proxied through a different origin - and a
    // silently dead HMR socket is a miserable thing to debug.
    `connect-src 'self' https://res.cloudinary.com https://*.google-analytics.com https://*.googletagmanager.com${isDev ? " ws: wss:" : ""}`,
    "frame-src https://www.google.com https://maps.google.com",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ]
    .filter(Boolean)
    .join("; ");
}

function withCsp(request: NextRequest, response: NextResponse, nonce: string): NextResponse {
  const csp = buildCsp(nonce, process.env.NODE_ENV !== "production");
  // Next reads this header off the *request* to stamp its own script tags with the nonce.
  request.headers.set("x-nonce", nonce);
  request.headers.set("content-security-policy", csp);
  response.headers.set("content-security-policy", csp);
  return response;
}

/**
 * Legacy URL redirects (PRD s23, s73), the /admin auth gate (Phase 2 admin CMS), and the
 * CSP nonce.
 *
 * Redirects run before routing, so an old WordPress URL is redirected before Next has a
 * chance to 404 it.
 */
export default auth((request) => {
  const { pathname } = request.nextUrl;
  const nonce = crypto.randomUUID().replace(/-/g, "");

  const next = () =>
    NextResponse.next({ request: { headers: request.headers } });

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!request.auth) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return withCsp(request, next(), nonce);
  }

  const rule = findRedirect(pathname);
  if (rule) {
    const url = request.nextUrl.clone();
    url.pathname = rule.to;
    // Query strings are preserved: paid traffic pointed at an old URL keeps its UTMs.
    return NextResponse.redirect(url, rule.status);
  }

  return withCsp(request, next(), nonce);
});

export const config = {
  /**
   * Skip static assets and the API. Everything else is cheap to check - the redirect
   * lookup is a Map hit.
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};

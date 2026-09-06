import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Self-contained server bundle for the Docker image (see Dockerfile) - copies only the
  // traced production dependencies instead of the full node_modules tree.
  output: "standalone",
  // Legacy-URL redirects live in src/middleware.ts (backed by src/content/redirects.ts)
  // so that Phase 2 can move the redirect table into PostgreSQL without a redeploy.
  images: {
    formats: ["image/avif", "image/webp"],
    // The hero poster lives on Cloudinary. Routing it through next/image gets it resized
    // per device and re-encoded to AVIF - as a plain <img> it shipped one 1600px JPEG to
    // every visitor, including phones.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  /**
   * Force <title>/<meta description> into <head> for every user agent.
   *
   * Next 15 streams metadata into the body for dynamic routes and only blocks for user
   * agents matching its built-in bot list. Every page here is dynamic (Postgres-backed),
   * so by default a plain HTTP fetch got the description ~20KB into the body instead of
   * the head. Googlebot recovers because it runs JS, and Next's list covers Bing plus the
   * social scrapers - but crawlers that only read raw HTML (SEO tools, AI crawlers, link
   * previewers not on that list) would see a page with no description at all.
   *
   * On an SEO-led build that is not a trade worth making, so this matches every UA and
   * makes metadata blocking for all of them.
   */
  htmlLimitedBots: /.*/,
  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Isolates the browsing context group so a popup can't reach back into the page.
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Nothing here uses these, so deny them outright rather than leave them open.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // HSTS only in production: sending it from a local HTTP dev server would pin
          // localhost to HTTPS in the browser and break every other local project.
          ...(isProd
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;

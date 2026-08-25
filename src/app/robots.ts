import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/seo";

/**
 * robots.txt (PRD s22).
 *
 * Two rules matter here: the API intake route is never crawled, and a non-production
 * deployment blocks everything - a staging site that gets indexed competes with the real
 * one and splits its search equity.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = siteUrl === "https://ldic.ie" || siteUrl === "https://www.ldic.ie";

  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}

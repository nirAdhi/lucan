/**
 * Metadata builder (PRD s10, s16, s25).
 *
 * Every page goes through buildMetadata so that a canonical URL, an Open Graph block and
 * an explicit robots directive exist by construction - the three things the s20 audit
 * most often finds missing on hand-rolled pages.
 *
 * Phase 2 swaps the hard-coded arguments for a lookup against `seo_metadata`, keeping the
 * per-page defaults below as the fallback when an admin has not overridden a page.
 */

import type { Metadata } from "next";
import { site } from "@/content/site";

export const siteUrl = site.url.replace(/\/+$/, "");

/** Absolute URL for a site-relative path. Canonicals must be absolute (PRD s25). */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return `${siteUrl}/`;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export type SeoInput = {
  title: string;
  description: string;
  /** Site-relative path, used for the canonical URL. */
  path: string;
  /** Override the canonical - only when a page genuinely duplicates another (PRD s25). */
  canonical?: string;
  index?: boolean;
  follow?: boolean;
  ogType?: "website" | "article" | "profile";
  /**
   * Social share image. Left undefined by default: no og:image tag is emitted rather than
   * pointing at a file that does not exist. See docs/SEO-LAUNCH-CHECKLIST.md.
   */
  ogImage?: { url: string; width?: number; height?: number; alt: string };
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata(input: SeoInput): Metadata {
  const {
    title,
    description,
    path,
    canonical,
    index = true,
    follow = true,
    ogType = "website",
    ogImage,
    publishedTime,
    modifiedTime,
  } = input;

  const url = canonical ? absoluteUrl(canonical) : absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index,
      follow,
      googleBot: { index, follow, "max-image-preview": "large" },
    },
    openGraph: {
      type: ogType === "profile" ? "profile" : ogType,
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      ...(ogImage ? { images: [ogImage] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [ogImage.url] } : {}),
    },
  };
}

/** Breadcrumb trail shared by the visible breadcrumbs and BreadcrumbList schema. */
export type Crumb = { name: string; path: string };

export function crumbs(...trail: Crumb[]): Crumb[] {
  return [{ name: "Home", path: "/" }, ...trail];
}

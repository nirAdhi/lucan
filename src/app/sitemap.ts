import type { MetadataRoute } from "next";
import { indexableStaticRoutes } from "@/lib/routes";
import { treatments } from "@/content/treatments";
import { getTeam } from "@/content/team";
import { publishedPosts } from "@/content/posts";
import { absoluteUrl } from "@/lib/seo";

/**
 * XML sitemap (PRD s21).
 *
 * Generated from the route registry plus the content collections, so a new treatment, team
 * member or published post is included automatically. Only indexable, canonical URLs
 * appear here - a sitemap that lists redirects or noindex pages is worse than no sitemap.
 *
 * Available at /sitemap.xml. Submit it in Search Console (PRD s75).
 *
 * Rendered per-request (not at build time): team members now come from Postgres (Phase 2
 * admin CMS), which isn't reachable during `docker build`.
 */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const team = await getTeam();

  const pages: MetadataRoute.Sitemap = indexableStaticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const treatmentPages: MetadataRoute.Sitemap = treatments.map((treatment) => ({
    url: absoluteUrl(`/treatments/${treatment.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: treatment.featured ? 0.9 : 0.8,
  }));

  const teamPages: MetadataRoute.Sitemap = team.map((member) => ({
    url: absoluteUrl(`/our-team/${member.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const postPages: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...treatmentPages, ...teamPages, ...postPages];
}

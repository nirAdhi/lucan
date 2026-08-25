/**
 * Static route registry (PRD s15, s21).
 *
 * The sitemap is generated from this list plus the content collections, so a new page is
 * indexable the moment it is registered here - there is no second place to remember.
 * In Phase 2 this same list seeds the SEO Page Manager table.
 */

export type SitemapGroup = "pages" | "treatments" | "team" | "blog" | "locations";

export type StaticRoute = {
  path: string;
  /** Label used by the SEO page manager and breadcrumbs. */
  label: string;
  group: SitemapGroup;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  /** False for pages that should exist but stay out of the index (PRD s16). */
  indexable: boolean;
};

export const staticRoutes: StaticRoute[] = [
  { path: "/", label: "Home", group: "pages", priority: 1, changeFrequency: "weekly", indexable: true },
  {
    path: "/treatments",
    label: "Treatments",
    group: "pages",
    priority: 0.9,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/emergency-dentist-lucan",
    label: "Emergency Dentist Lucan",
    group: "pages",
    priority: 0.9,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/new-patients",
    label: "New Patients",
    group: "pages",
    priority: 0.9,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/pricing",
    label: "Pricing",
    group: "pages",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/our-team",
    label: "Our Team",
    group: "pages",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/locations/lucan",
    label: "Lucan",
    group: "locations",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/book",
    label: "Book Appointment",
    group: "pages",
    priority: 0.8,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/contact",
    label: "Contact",
    group: "pages",
    priority: 0.7,
    changeFrequency: "yearly",
    indexable: true,
  },
  {
    path: "/faqs",
    label: "FAQs",
    group: "pages",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/about",
    label: "About",
    group: "pages",
    priority: 0.6,
    changeFrequency: "yearly",
    indexable: true,
  },
  {
    path: "/dentist-referrals",
    label: "Dentist Referrals",
    group: "pages",
    priority: 0.6,
    changeFrequency: "yearly",
    indexable: true,
  },
  {
    path: "/patient-stories",
    label: "Patient Stories",
    group: "pages",
    priority: 0.6,
    changeFrequency: "monthly",
    indexable: true,
  },
  {
    path: "/blog",
    label: "Blog",
    group: "blog",
    priority: 0.6,
    changeFrequency: "weekly",
    indexable: true,
  },
  {
    path: "/privacy",
    label: "Privacy & Cookies",
    group: "pages",
    priority: 0.3,
    changeFrequency: "yearly",
    indexable: true,
  },
];

export const indexableStaticRoutes = staticRoutes.filter((route) => route.indexable);

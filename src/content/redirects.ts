/**
 * Legacy URL map (PRD s23, s73, s74).
 *
 * Every indexable URL found on the current ldic.ie (crawled August 2026) is listed here
 * with its destination on the new site. This is the single most valuable table in the
 * migration: without it, the search equity attached to the old WordPress URLs is lost the
 * day the new site goes live.
 *
 * Source paths are matched after the trailing slash is normalised away, so "/prices/" and
 * "/prices" both hit the same rule. Add a rule the moment a URL changes - the 404 report
 * (PRD s24) is the backstop, not the plan.
 *
 * Phase 2 moves this into the `redirects` table so the admin can add rules without a
 * deploy, and records `status` + `notes` per PRD s74.
 */

export type Redirect = {
  /** Old path, without trailing slash. */
  from: string;
  /** New path. */
  to: string;
  /** 301 permanent unless there is a reason for a temporary redirect. */
  status: 301 | 302 | 308;
  notes?: string;
};

export const redirects: Redirect[] = [
  { from: "/our-practice", to: "/about", status: 301, notes: "Legacy about page." },
  { from: "/meet-the-team", to: "/our-team", status: 301, notes: "Legacy team page." },
  {
    from: "/our-services",
    to: "/treatments",
    status: 301,
    notes: "Single services page split into individual treatment pages (PRD s8).",
  },
  { from: "/faq", to: "/faqs", status: 301, notes: "Legacy FAQ page." },
  { from: "/prices", to: "/pricing", status: 301, notes: "Legacy price list." },
  {
    from: "/prsi",
    to: "/pricing",
    status: 301,
    notes:
      "TODO: 'PRSI dentist' is a high-intent local query. Replace this redirect with a dedicated /prsi page once the practice supplies the entitlement wording it wants published.",
  },
  { from: "/contact-us", to: "/contact", status: 301, notes: "Legacy contact page." },
  {
    from: "/dentist-referrals",
    to: "/dentist-referrals",
    status: 301,
    notes:
      "Path unchanged - listed here so the URL inventory stays complete. No redirect is emitted for same-path rules.",
  },
];

/** Rules that actually change the path. Same-path entries are inventory, not redirects. */
export const activeRedirects = redirects.filter((rule) => rule.from !== rule.to);

const redirectIndex = new Map<string, Redirect>(
  activeRedirects.map((rule): [string, Redirect] => [rule.from, rule]),
);

/** Normalise a request path the way the redirect table expects it. */
export function normalisePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function findRedirect(pathname: string): Redirect | undefined {
  return redirectIndex.get(normalisePath(pathname).toLowerCase());
}

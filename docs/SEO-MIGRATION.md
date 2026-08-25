# SEO migration: ldic.ie → new platform

PRD §73–§75. This is the highest-risk part of the project: LDIC already ranks, and a rebuild that
drops its URLs loses that overnight. Nothing here is optional.

---

## 1. Old URL inventory

Crawled from the live site, August 2026. Every indexable URL on the current WordPress site:

| Old URL | New URL | Status | Notes |
| --- | --- | --- | --- |
| `/` | `/` | — | Unchanged |
| `/our-practice/` | `/about` | 301 | |
| `/meet-the-team/` | `/our-team` | 301 | Individual dentist pages are new |
| `/our-services/` | `/treatments` | 301 | One page split into 10 landing pages (§8) |
| `/faq/` | `/faqs` | 301 | |
| `/dentist-referrals/` | `/dentist-referrals` | — | Path kept deliberately |
| `/new-patients/` | `/new-patients` | — | Path kept |
| `/prices/` | `/pricing` | 301 | |
| `/prsi/` | `/pricing` | 301 | **See open question below** |
| `/contact-us/` | `/contact` | 301 | |

Implemented in [`src/content/redirects.ts`](../src/content/redirects.ts), served by
[`src/middleware.ts`](../src/middleware.ts). Trailing slashes are normalised, so `/prices/` and
`/prices` both resolve. Query strings are preserved, so paid traffic pointed at an old URL keeps
its UTMs.

### Still to do on the inventory

The list above is what a page-level crawl of the live navigation found. Before launch, confirm it
against the sources that see URLs the navigation does not:

- [ ] **Search Console → Pages**, exported. This is the authority on what Google actually has
      indexed, including old posts, attachment pages and paginated archives.
- [ ] **Screaming Frog / Sitebulb crawl** of `https://ldic.ie`, exported with titles and meta
      descriptions, to catch orphans.
- [ ] The existing **WordPress sitemap** (`/sitemap.xml` or `/wp-sitemap.xml`).
- [ ] **Top landing pages** from the last 12 months of Analytics — the pages that actually earn
      traffic are the ones that must not break.
- [ ] Any **WordPress artefacts** still linked from elsewhere: `/?p=123`, `/category/…`,
      `/tag/…`, `/author/…`, uploaded PDFs under `/wp-content/uploads/…`.

Add every one to `redirects.ts`. A rule costs nothing; a 404 on a ranking page costs a patient.

### Open question: `/prsi/`

"PRSI dentist" is a high-intent Irish search, and the old site has a page for it. It currently
redirects to `/pricing` (which carries the PRSI prices), but that loses topical relevance. The
right fix is a dedicated `/prsi` page — it was not written because the entitlement wording has to
come from the practice rather than be invented. **Decision needed from LDIC.**

---

## 2. What is already in place

| PRD | Requirement | Status |
| --- | --- | --- |
| §10 | Per-page title, description, canonical, H1, OG | `lib/seo.ts` — every page routed through `buildMetadata()` |
| §21 | Sitemap | `app/sitemap.ts`, generated from the route registry + content |
| §22 | robots.txt | `app/robots.ts`; blocks `/api/`, and blocks everything on non-production origins |
| §23 | Redirect manager | `content/redirects.ts` + `middleware.ts` |
| §25 | Canonical management | Absolute canonical on every page; per-page override available |
| §26 | Structured data | `lib/schema.ts` — Dentist, WebSite, Service, FAQPage, Person, Article, BreadcrumbList |
| §27 | Internal linking | `related` on treatments, treatment↔dentist links, footer treatment list |
| §51 | Emergency landing page | `/emergency-dentist-lucan` |
| §52 | New patient landing page | `/new-patients` |

Deliberately **not** emitted: `aggregateRating` / `Review` markup, until real reviews exist.

---

## 3. Launch checklist (PRD §75)

### Before switching DNS

- [ ] Export current URLs, titles and meta descriptions from Search Console and a full crawl
- [ ] Identify the top 20 pages by organic traffic and confirm each has a mapped destination
- [ ] Complete `redirects.ts` from that export
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://ldic.ie` (robots blocks indexing on any other origin)
- [ ] Decide `ldic.ie` vs `www.ldic.ie` and redirect one to the other at the CDN — pick one and
      never serve both
- [ ] Confirm the street line and **Eircode**, then update `content/site.ts` (schema + local SEO)
- [ ] Confirm the map pin coordinates against the Google Business Profile
- [ ] Configure `BOOKING_NOTIFY_WEBHOOK` and send a live test request end to end
- [ ] Set `NEXT_PUBLIC_GA4_ID`, then verify `book_click`, `booking_started` and
      `booking_completed` fire in GA4 realtime
- [ ] Mark `booking_completed` as a **conversion** in GA4 and import it into Google Ads (§41) —
      not `book_click`
- [ ] Supply Open Graph / social share images and wire them into `buildMetadata()`
- [ ] Clinical sign-off on all treatment copy (§30)
- [ ] Privacy notice completed and reviewed (`/privacy` currently carries a draft banner)
- [ ] Lighthouse / Core Web Vitals pass on mobile (§54)
- [ ] Test the booking form on a real phone, including the emergency path
- [ ] Verify the mobile CTA bar does not cover form submit buttons on small screens

### Switch day

- [ ] Point DNS
- [ ] Verify the new property in Search Console (`NEXT_PUBLIC_GSC_VERIFICATION`)
- [ ] Submit `https://ldic.ie/sitemap.xml`
- [ ] Spot-check every redirect in the table with `curl -I` — confirm a single 301 hop, no chains
- [ ] Confirm `robots.txt` allows crawling and names the sitemap
- [ ] Request indexing for the homepage, `/treatments`, `/pricing`,
      `/emergency-dentist-lucan`, `/new-patients`
- [ ] Update the Google Business Profile website link if any path changed

### First 30 days

- [ ] Watch Search Console **Pages** for new 404s daily in week one — each one becomes a rule in
      `redirects.ts`
- [ ] Watch Coverage/Indexing for unexpected `noindex` or canonical warnings
- [ ] Compare clicks and impressions week over week; a dip in week 1–2 is normal, a dip still
      there in week 4 is a problem to investigate
- [ ] Confirm bookings are arriving and attribution is populated — if `utm_source` is empty on
      everything, the capture is broken
- [ ] Record the starting position for the §12 keyword set so later movement is measurable

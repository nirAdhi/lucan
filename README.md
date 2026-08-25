# LDIC Platform

The digital platform for **Lucan Dental & Implantology Centre** (ldic.ie) — a public website,
SEO engine and appointment-request funnel, built to the LDIC PRD.

This repository currently contains **Phase 1: Website Foundation** (PRD §77), plus the parts of
Phase 2 (SEO platform) and Phase 3 (booking) that had to exist from day one: per-page metadata,
canonicals, structured data, sitemap, robots, the legacy-URL redirect table, GA4 conversion
events with consent gating, UTM attribution capture, and an appointment-request funnel.

---

## Getting started

Node.js 20.9+ is required and is **not currently installed on this machine** — install it from
[nodejs.org](https://nodejs.org/) first.

```bash
npm install
cp .env.example .env.local     # then edit
npm run dev                    # http://localhost:3000
```

Other scripts:

```bash
npm run typecheck              # tsc --noEmit
npm run build                  # production build
npm start                      # serve the production build
```

### Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origin used for canonicals, sitemap and Open Graph. Must be the real origin in production, or `robots.ts` will block indexing. |
| `NEXT_PUBLIC_GA4_ID` | GA4 measurement ID. Empty ⇒ no analytics loaded and no cookie banner shown. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Search Console HTML verification token. |
| `BOOKING_NOTIFY_WEBHOOK` | Where appointment requests are POSTed (email service, Make/Zapier, practice inbox integration). |
| `BOOKING_LOG_FILE` | Local fallback for development, default `.data/booking-requests.jsonl`. |

> **Before launch:** configure `BOOKING_NOTIFY_WEBHOOK`. With no delivery destination the API
> returns `503` and the form tells the patient to phone the practice. That is deliberate — an
> appointment request that is silently dropped is worse than a form that admits it is broken.

---

## Architecture

A **modular monolith** in a single Next.js app (PRD §83), rather than the separate NestJS API of
§56. For one practice this ships faster, keeps SEO rendering and data in one place, and the
booking intake is already an HTTP endpoint (`/api/booking-requests`), so the Phase 6 voice and AI
clients of §70 have something to call. If LDIC ever goes multi-practice, that endpoint is the
seam to split on.

```
src/
├── app/                     Routes (App Router, server components by default)
│   ├── api/booking-requests/  Appointment-request intake (validation, rate limit, delivery)
│   ├── treatments/[slug]/     10 treatment landing pages from one template (§9)
│   ├── our-team/[slug]/       Dentist profiles (§46)
│   ├── blog/[slug]/           Articles (§28)
│   ├── locations/lucan/       Location page (§11)
│   ├── sitemap.ts robots.ts   Generated, never hand-maintained (§21, §22)
│   └── ...                    home, pricing, new-patients, emergency, faqs, contact, privacy
├── content/                 The data layer — becomes PostgreSQL tables in Phase 2
│   ├── site.ts              NAP, hours, nav, reasons-to-choose
│   ├── treatments.ts        Treatment pages + their SEO fields (§10)
│   ├── pricing.ts           Full price list, referenced by slug — never typed into copy (§44)
│   ├── team.ts booking.ts faqs.ts posts.ts stories.ts
│   └── redirects.ts         Legacy URL map (§23, §74)
├── lib/
│   ├── seo.ts               buildMetadata(): canonical + OG + robots by construction
│   ├── schema.ts            JSON-LD generated from content (§26)
│   ├── routes.ts            Route registry that feeds the sitemap (§15, §21)
│   ├── analytics.ts         Typed GA4 events (§40)
│   └── attribution.ts       First-touch UTM capture (§38)
├── components/              ui/ · layout/ · sections/ · booking/ · analytics/
└── middleware.ts            Serves the redirect table before routing
```

### Conventions worth knowing

- **Prices are never written into page copy.** Treatment pages list `priceSlugs` and read from
  `content/pricing.ts`, so one edit updates every page that quotes a figure.
- **Every page goes through `buildMetadata()`.** That is what guarantees a canonical, an OG block
  and an explicit robots directive on all of them.
- **Visible breadcrumbs and `BreadcrumbList` share one `crumbs()` trail**, so the markup can't
  drift from the page.
- **Client components are islands.** Pages are server components; only the header, mobile CTA bar,
  booking form, consent banner and two analytics pings ship JavaScript.
- **No webfont.** System stacks, so the site builds with no network access and mobile LCP stays
  cheap (§54). Adding `next/font` later is a two-line change in `app/layout.tsx`.

---

## Content provenance

Every fact on the site — the treatment list, all prices, the team, hours, phone, email, policies
— was transcribed from the live ldic.ie in **August 2026** and is held in `src/content/`.

Clinical explanations on the treatment pages were written to be cautious and general: no
guarantees, no success rates, no outcome claims (§30). **They still need a clinician at the
practice to sign them off before launch.**

Two things were deliberately *not* invented:

- **Patient stories and testimonials** (`content/stories.ts`) ship empty. Fabricating them would
  be publishing false reviews. The page, layout and schema are built and render an honest empty
  state until the practice supplies consented content (§43).
- **Review counts and star ratings.** No `aggregateRating` markup is emitted until real reviews
  are collected.

Items the practice must confirm are marked `TODO(verify)` in the source and listed in
[docs/CONTENT-VERIFICATION.md](docs/CONTENT-VERIFICATION.md) — the exact street line and Eircode
matter most, because local search and `LocalBusiness` schema both depend on them.

---

## Documentation

- [docs/SEO-MIGRATION.md](docs/SEO-MIGRATION.md) — old-URL inventory, redirect map and the §75
  launch checklist. **Read this before pointing DNS at the new site.**
- [docs/ROADMAP.md](docs/ROADMAP.md) — what is built, what comes next, and the Phase 2 data model.
- [docs/CONTENT-VERIFICATION.md](docs/CONTENT-VERIFICATION.md) — what the practice needs to
  confirm or supply.

## A note on what this platform does not promise

The PRD is explicit and so is this codebase: no application can guarantee a Google ranking (§76).
What is built here is the infrastructure — crawlable pages, correct metadata, structured data,
redirects that preserve existing equity, and honest measurement of what turns a visitor into a
patient.

# Roadmap

Mapped to the PRD phases (§77–§82). "Done" means built in this repository; it does not mean
signed off by the practice.

---

## Phase 1 — Website foundation (§77)

| Item | Status |
| --- | --- |
| Design system, layout, mobile-first | Done — tokens in `app/globals.css`, no webfont |
| Homepage in the §7 order | Done |
| Treatment landing pages (10) from the §9 template | Done |
| Team pages + individual dentist profiles | Done |
| Location page | Done — `/locations/lucan` |
| Pricing (full published list) | Done — `/pricing`, single source in `content/pricing.ts` |
| About, Contact, FAQs, Dentist referrals | Done |
| New patients landing page (§52) | Done |
| Emergency landing page (§51) | Done |
| Blog | Done — index + article template, one seed post |
| Patient stories | Page built; content awaits consented material (§43) |
| Privacy / cookie notice | Draft, needs legal review |
| **Admin CMS** | **Not built** — see Phase 2 |

Everything content-shaped lives in `src/content/*.ts`. That is the deliberate seam: those modules
are shaped like the tables they become, so the CMS is a matter of moving the data, not rewriting
the pages.

## Phase 2 — SEO platform + CMS (§78)

Built already: metadata builder, canonicals, sitemap, robots, schema generation, redirect table,
internal linking, route registry.

Still to build:

- **PostgreSQL + an ORM** (Drizzle or Prisma) and the §57 tables. Start with the ones the site
  already reads: `treatments`, `pricing` + `price_history`, `dentists`, `pages`, `seo_metadata`,
  `redirects`, `blog_posts`, `faqs`, `testimonials`, `media`.
- **Admin app** at `/admin` (§62) behind auth + RBAC: page manager (§15), SEO editor (§16),
  pricing with the §45 audit trail, media library with enforced alt text (§49, §50).
- **Search Console API integration** (§19) — real clicks, impressions, CTR and position. Keyword
  tracking (§18) must read from it, never invent numbers.
- **SEO audit job** (§17, §20, §65) — missing/duplicate titles and descriptions, missing H1,
  multiple H1s, missing alt text, broken links, orphan pages, redirect chains. Run it as a job,
  surface it as the §65 recommendations list.
- **404 report → redirect** flow (§24), fed from server logs or Search Console.

Migration note: when `seo_metadata` lands, `buildMetadata()` should read the DB row and fall back
to the values now hard-coded in each page. That keeps the site correct while the admin fills in.

## Phase 3 — Booking (§79)

Today `/book` and `/contact` capture an appointment *request*; the practice confirms it by phone.
The form is honest about that, and the funnel already measures it.

To make it a real booking engine:

- `appointment_types` with durations, `dentists` working hours, practice hours, holidays
- Availability engine (§33) — slots from duration + existing appointments + treatment rules
- Real slot selection replacing the date/time *preference* fields, without changing the
  surrounding form
- Confirmation email + SMS, reschedule and cancellation links (Resend/Postmark + Twilio)
- Admin booking management (§34): create, edit, cancel, reschedule, mark attended, mark no-show

The intake endpoint (`/api/booking-requests`) becomes the write path, so the voice and AI clients
of §69–§70 use the same engine as the website.

## Phase 4 — CRM (§80)

Every enquiry becomes a `leads` row with the attribution already captured client-side today
(`lib/attribution.ts` → the `attribution` object on each request). Then the §37 pipeline: new →
contacted → booked → attended → proposed → accepted → converted, with sources (§36), tasks and
notes. This is what makes §38 answerable: *which channel produced this patient?*

## Phase 5 — Marketing (§81)

Campaigns, landing pages, offers, review requests after appointments (with consent), patient
stories, recall, email marketing, and the conversion analytics that closes the §3 funnel from
visitor to revenue.

## Phase 6 — AI (§82)

Website assistant, SEO assistant, lead assistant, booking assistant, voice receptionist. Two
rules from §30 and §68 hold throughout: the assistant reads prices and clinical content from the
CMS rather than generating them, and no AI-generated healthcare content is published without
human review.

---

## Immediate next steps, in order

1. **Install Node 20+, run `npm install`, `npm run typecheck`, `npm run build`.** None of it has
   been executed — this machine has no Node runtime.
2. Walk the site on a phone and fix whatever the design gets wrong at 375px.
3. Get clinical sign-off on the treatment copy and confirm the `TODO(verify)` list.
4. Complete the redirect inventory from Search Console before launch — see
   [SEO-MIGRATION.md](SEO-MIGRATION.md).
5. Wire `BOOKING_NOTIFY_WEBHOOK` to something the practice actually monitors.
6. Then start Phase 2 with the database and the pricing admin — pricing changes most often and
   §45 already asks for the audit trail.

# What the practice needs to confirm or supply

Everything on the site was transcribed from ldic.ie in August 2026. This is the list of things
that could not be verified from the live site, or that were deliberately left empty. Items marked
**blocking** should be settled before launch.

## Practice details — `src/content/site.ts`

| Item | Current value | Needed |
| --- | --- | --- |
| Street line | "Carlaimar, Lucan Village" | **Blocking.** The live site says only "Lucan Village … Carlaimar (opposite AIB Bank)". Confirm the exact postal address line. |
| Eircode | *empty* | **Blocking.** Required for `LocalBusiness`/`Dentist` schema, Google Business Profile consistency and local ranking. |
| Map coordinates | Approximate Lucan Village point | Confirm against the Google Business Profile pin. |
| Saturday hours | "Some Saturdays by appointment only" | Confirm the wording, and whether specific Saturdays can be published. |
| Social profiles | *empty* | Facebook / Instagram URLs, if the practice wants them in `sameAs` and the footer. |
| Parking and transport | Generic wording, marked `TODO(verify)` in `components/sections/LocationBlock.tsx` | What the practice actually wants to tell patients. |

## Clinical content — `src/content/treatments.ts`

- **Blocking: clinical sign-off.** The treatment descriptions are cautious, general explanations
  of routine procedures, written to avoid guarantees, success rates and outcome claims (PRD §30).
  A clinician at the practice must read and approve all ten before launch.
- Confirm each treatment's stated timeline is consistent with how the practice actually works.
- Confirm the technology list per treatment (imaging, sedation, materials).
- Confirm which dentist leads on which treatment — the `treatments` array in `content/team.ts`
  drives the "Your dentist" block and was inferred from the published specialities.

## Team — `src/content/team.ts`

| Item | Status |
| --- | --- |
| Names, roles, qualifications, biography facts | Taken verbatim from `/meet-the-team/` |
| Portrait photographs | **Missing.** An initials avatar renders until supplied. Each needs alt text. |
| Dental Council of Ireland registration numbers | Not published on the live site — supply if the practice wants them shown |
| Languages spoken | Not published — a useful trust signal in Dublin West if the team wants it listed |

## Prices — `src/content/pricing.ts`

- Transcribed in full from `/prices/`. **Confirm the list is current** and update
  `pricingLastUpdated`.
- Confirm the PRSI wording, and whether any entitlement detail should be published.

## Patient stories and reviews — `src/content/stories.ts`

Ships **empty on purpose**. Nothing was invented, because fabricated testimonials are false
reviews. To populate:

- Written patient consent covering text and any images (record the date in `consentRecorded`)
- First name or initials only, unless the patient consents to more
- Before/after images only where consent explicitly covers publication

No `aggregateRating` or `Review` schema is emitted until real reviews are collected.

## Blog — `src/content/posts.ts`

One seed article, *"What to expect at your first appointment in Lucan"*, describing practice
process and published prices only — no clinical claims. Needs practice sign-off, or set its
`status` to `"draft"` to pull it from the site.

## Legal — `src/app/privacy/page.tsx`

**Blocking.** The privacy notice accurately describes what the website does (booking form,
consent-gated GA4, session-scoped attribution) but is not a complete healthcare privacy notice.
It carries a visible draft banner until the practice completes it: retention periods, processors,
lawful bases, and how clinical records are handled. Because this is healthcare, PRD §72 asks for a
formal legal/compliance review before production.

## Assets still missing

- Open Graph / social share images (1200×630). Until supplied, no `og:image` tag is emitted —
  better than pointing at a file that does not exist.
- Favicon: a placeholder tooth monogram ships at `src/app/icon.svg`. Replace it with the
  practice's own mark, and add a PNG apple-touch icon.
- Practice interior/exterior photography — the design currently carries no photography at all,
  which is the single biggest visual improvement available.
- A logo file. The header currently renders a typographic wordmark.

/**
 * Patient stories and testimonials (PRD s42, s43).
 *
 * DELIBERATELY EMPTY. Testimonials, before/after images and outcome descriptions can only
 * be published with the patient's documented consent (PRD s43), and inventing them would
 * be fabricating patient reviews. The page, schema and layout are all built and will
 * render as soon as the practice supplies consented content.
 *
 * Phase 2 moves this into the `testimonials` / `reviews` tables with a consent flag and a
 * post-appointment review request flow (PRD s42).
 */

export type PatientStory = {
  slug: string;
  /** Patient's first name or initials only, as consented. */
  patient: string;
  /** Treatment slug from content/treatments.ts. */
  treatment: string;
  headline: string;
  problem: string;
  treatmentGiven: string;
  result: string;
  quote?: string;
  /** Only ever populated where written patient consent covers image publication. */
  images?: { src: string; alt: string; caption?: string }[];
  /** ISO date the practice recorded consent. Required before a story goes live. */
  consentRecorded: string;
};

export const patientStories: PatientStory[] = [];

/**
 * Short testimonials moved to content/testimonials.ts in Phase 2 - they are now managed at
 * /admin/testimonials and stored in Postgres with a consent flag and a consent date, so
 * the practice can add them without a deploy. The longer, structured case narratives in
 * `patientStories` above are still static and still deliberately empty.
 */

export function getStory(slug: string): PatientStory | undefined {
  return patientStories.find((story) => story.slug === slug);
}

export function getStoriesForTreatment(treatmentSlug: string): PatientStory[] {
  return patientStories.filter((story) => story.treatment === treatmentSlug);
}

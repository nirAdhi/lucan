/**
 * Patient testimonials - managed at /admin/testimonials, backed by the `testimonials`
 * table (prisma/schema.prisma).
 *
 * getTestimonials() filters on `consentConfirmed` server-side, so a testimonial typed in
 * but not yet consented can never reach the public site by accident. This is the same rule
 * content/stories.ts and content/caseStudies.ts follow, and it is not optional politeness:
 * publishing a patient's words about their own treatment without documented consent is a
 * data-protection problem, not just an etiquette one.
 */

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type Testimonial = {
  id: string;
  /** First name or initials only, as consented. */
  author: string;
  area?: string;
  quote: string;
  treatmentSlug?: string;
  treatmentLabel?: string;
  rating?: number;
};

const loadTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const rows = await prisma.testimonial.findMany({
      where: { consentConfirmed: true },
      orderBy: { order: "asc" },
    });
    return rows.map((row) => ({
      id: row.id,
      author: row.author,
      area: row.area ?? undefined,
      quote: row.quote,
      treatmentSlug: row.treatmentSlug ?? undefined,
      treatmentLabel: row.treatmentLabel ?? undefined,
      rating: row.rating ?? undefined,
    }));
  },
  ["testimonials"],
  { tags: ["testimonials"] },
);

/** Consented, published testimonials only - see the module doc above. */
export async function getTestimonials(): Promise<Testimonial[]> {
  return loadTestimonials();
}

export async function getTestimonialsForTreatment(treatmentSlug: string): Promise<Testimonial[]> {
  const all = await getTestimonials();
  return all.filter((t) => t.treatmentSlug === treatmentSlug);
}

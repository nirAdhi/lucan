/**
 * Before/after case studies - the admin-managed photo gallery at /admin/case-studies
 * (backed by the `case_studies` table, prisma/schema.prisma).
 *
 * `consentConfirmed` is a checkbox the admin must explicitly tick before a case study can
 * appear here - getCaseStudies() filters on it server-side, so an unconfirmed upload can
 * never reach the public site by accident. Same "never publish what isn't verified" rule
 * content/stories.ts already applies to patient testimonials.
 */

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type CaseStudy = {
  id: string;
  treatmentSlug: string;
  treatmentLabel: string;
  beforePhotoUrl: string;
  afterPhotoUrl: string;
  caption: string;
};

const loadCaseStudies = unstable_cache(
  async (): Promise<CaseStudy[]> => {
    const rows = await prisma.caseStudy.findMany({
      where: { consentConfirmed: true },
      orderBy: { order: "asc" },
    });
    return rows.map((row) => ({
      id: row.id,
      treatmentSlug: row.treatmentSlug,
      treatmentLabel: row.treatmentLabel,
      beforePhotoUrl: row.beforePhotoUrl,
      afterPhotoUrl: row.afterPhotoUrl,
      caption: row.caption,
    }));
  },
  ["case-studies"],
  { tags: ["case-studies"] },
);

/** Consented, published case studies only - see the module doc above. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  return loadCaseStudies();
}

export async function getCaseStudiesForTreatment(treatmentSlug: string): Promise<CaseStudy[]> {
  const all = await getCaseStudies();
  return all.filter((c) => c.treatmentSlug === treatmentSlug);
}

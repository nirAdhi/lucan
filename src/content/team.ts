/**
 * Clinical team (PRD s46) - Phase 2: backed by the `dentists` table (see prisma/schema.prisma)
 * behind the admin CMS at /admin/dentists, instead of the hardcoded array this module used
 * to export directly.
 *
 * Every call site already awaited nothing before (this was plain array data), so Phase 2
 * changed every one of these functions from sync to async. Reads are cached with Next's
 * `unstable_cache` and tagged "dentists" - the admin's save/delete actions call
 * `revalidateTag("dentists")` so an edit shows up immediately without a redeploy, while
 * normal page loads don't hit Postgres on every request.
 */

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  qualifications: string;
  /** Short line used on cards and in schema. */
  summary: string;
  bio: string[];
  specialities: string[];
  /** Short chips shown on the team card - see prisma/schema.prisma. */
  tags: string[];
  /** Treatment slugs this clinician leads on - powers "Your dentist" on treatment pages. */
  treatments: string[];
  /** Practice-supplied portrait, uploaded via /admin/dentists; null renders an initials avatar. */
  photo: string | null;
  registration?: string;
  languages?: string[];
  seo: { title: string; description: string };
};

function fromRow(row: {
  slug: string;
  name: string;
  role: string;
  qualifications: string;
  summary: string;
  bio: string[];
  specialities: string[];
  tags: string[];
  treatments: string[];
  photoUrl: string | null;
  registration: string | null;
  languages: string[];
  seoTitle: string;
  seoDescription: string;
}): TeamMember {
  return {
    slug: row.slug,
    name: row.name,
    role: row.role,
    qualifications: row.qualifications,
    summary: row.summary,
    bio: row.bio,
    specialities: row.specialities,
    tags: row.tags,
    treatments: row.treatments,
    photo: row.photoUrl,
    registration: row.registration ?? undefined,
    languages: row.languages.length > 0 ? row.languages : undefined,
    seo: { title: row.seoTitle, description: row.seoDescription },
  };
}

const loadTeam = unstable_cache(
  async (): Promise<TeamMember[]> => {
    const rows = await prisma.dentist.findMany({ orderBy: { order: "asc" } });
    return rows.map(fromRow);
  },
  ["team"],
  { tags: ["dentists"] },
);

/** Every dentist, in the order the admin has set. */
export async function getTeam(): Promise<TeamMember[]> {
  return loadTeam();
}

export async function getTeamMember(slug: string): Promise<TeamMember | undefined> {
  const team = await getTeam();
  return team.find((member) => member.slug === slug);
}

/** Clinicians associated with a treatment, for the "Your dentist" block (PRD s9). */
export async function getTeamForTreatment(treatmentSlug: string): Promise<TeamMember[]> {
  const team = await getTeam();
  return team.filter((member) => member.treatments.includes(treatmentSlug));
}

export function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

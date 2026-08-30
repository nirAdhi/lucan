/**
 * Price list (PRD s44) - Phase 2: backed by the `price_items` table (see
 * prisma/schema.prisma) behind the admin CMS at /admin/pricing, instead of the hardcoded
 * array this module used to export directly.
 *
 * Every function here became async when the data moved to Postgres. Reads are cached with
 * Next's `unstable_cache`, tagged "pricing" - the admin's save/delete actions call
 * `revalidateTag("pricing")` so a price change shows up immediately without a redeploy.
 */

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type PriceItem = {
  /** Stable key used by treatment pages to quote a price. */
  slug: string;
  name: string;
  /** Rendered verbatim, including "From" and per-arch qualifiers. */
  price: string;
  note?: string;
};

export type PriceGroup = {
  slug: string;
  title: string;
  items: PriceItem[];
};

/**
 * Date the list was last confirmed against the practice (PRD s44 "Last Updated").
 * TODO(verify): not yet derived from the data itself - update by hand when the practice
 * confirms the list, same as before Phase 2. A future pass could take max(updatedAt)
 * across price_items instead.
 */
export const pricingLastUpdated = "2026-08-25";

export const pricingDisclaimer =
  "Prices are a guide. A written treatment plan with a final cost is provided after an examination, because the treatment needed varies from patient to patient. PRSI entitlements are subject to eligibility.";

const loadPriceGroups = unstable_cache(
  async (): Promise<PriceGroup[]> => {
    const rows = await prisma.priceItem.findMany({
      orderBy: [{ groupOrder: "asc" }, { itemOrder: "asc" }],
    });

    const groups = new Map<string, PriceGroup>();
    for (const row of rows) {
      if (!groups.has(row.groupSlug)) {
        groups.set(row.groupSlug, { slug: row.groupSlug, title: row.groupTitle, items: [] });
      }
      groups.get(row.groupSlug)!.items.push({
        slug: row.slug,
        name: row.name,
        price: row.price,
        note: row.note ?? undefined,
      });
    }
    return [...groups.values()];
  },
  ["price-groups"],
  { tags: ["pricing"] },
);

/** The full price list, grouped for display (PRD s44). */
export async function getPriceGroups(): Promise<PriceGroup[]> {
  return loadPriceGroups();
}

/**
 * Look up a single price by slug. Returns undefined rather than throwing, so a mistyped
 * slug degrades to "price on request" instead of taking a page down.
 */
export async function getPrice(slug: string): Promise<PriceItem | undefined> {
  const groups = await getPriceGroups();
  for (const group of groups) {
    const item = group.items.find((i) => i.slug === slug);
    if (item) return item;
  }
  return undefined;
}

export async function getPrices(slugs: readonly string[]): Promise<PriceItem[]> {
  const groups = await getPriceGroups();
  const index = new Map<string, PriceItem>(
    groups.flatMap((group) => group.items.map((item): [string, PriceItem] => [item.slug, item])),
  );
  return slugs.map((slug) => index.get(slug)).filter((item): item is PriceItem => Boolean(item));
}

export async function getPriceGroup(slug: string): Promise<PriceGroup | undefined> {
  const groups = await getPriceGroups();
  return groups.find((group) => group.slug === slug);
}

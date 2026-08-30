"use server";

import { revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function updatePriceItem(id: string, formData: FormData): Promise<void> {
  await requireAdmin();

  await prisma.priceItem.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? "").trim(),
      price: String(formData.get("price") ?? "").trim(),
      note: String(formData.get("note") ?? "").trim() || null,
    },
  });

  revalidateTag("pricing");
  revalidatePath("/admin/pricing");
}

export async function createPriceItem(formData: FormData): Promise<void> {
  await requireAdmin();

  await prisma.priceItem.create({
    data: {
      slug: String(formData.get("slug") ?? "").trim(),
      name: String(formData.get("name") ?? "").trim(),
      price: String(formData.get("price") ?? "").trim(),
      note: String(formData.get("note") ?? "").trim() || null,
      groupSlug: String(formData.get("groupSlug") ?? "").trim(),
      groupTitle: String(formData.get("groupTitle") ?? "").trim(),
      groupOrder: Number(formData.get("groupOrder") ?? 0) || 0,
      itemOrder: Number(formData.get("itemOrder") ?? 0) || 0,
    },
  });

  revalidateTag("pricing");
  revalidatePath("/admin/pricing");
}

export async function deletePriceItem(id: string): Promise<void> {
  await requireAdmin();
  await prisma.priceItem.delete({ where: { id } });
  revalidateTag("pricing");
  revalidatePath("/admin/pricing");
}

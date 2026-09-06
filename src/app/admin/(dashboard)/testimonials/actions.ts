"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

function readFields(formData: FormData) {
  const rating = Number(formData.get("rating"));
  const consentDate = String(formData.get("consentRecordedAt") ?? "").trim();

  return {
    author: String(formData.get("author") ?? "").trim(),
    area: String(formData.get("area") ?? "").trim() || null,
    quote: String(formData.get("quote") ?? "").trim(),
    treatmentSlug: String(formData.get("treatmentSlug") ?? "").trim() || null,
    treatmentLabel: String(formData.get("treatmentLabel") ?? "").trim() || null,
    rating: Number.isFinite(rating) && rating >= 1 && rating <= 5 ? rating : null,
    consentConfirmed: formData.get("consentConfirmed") === "on",
    // Stored as a date, not just "true" - a consent record with no date is weak evidence.
    consentRecordedAt: consentDate ? new Date(consentDate) : null,
    order: Number(formData.get("order") ?? 0) || 0,
  };
}

export async function createTestimonial(formData: FormData): Promise<void> {
  await requireAdmin();
  await prisma.testimonial.create({ data: readFields(formData) });
  revalidateTag("testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  await prisma.testimonial.update({ where: { id }, data: readFields(formData) });
  revalidateTag("testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string): Promise<void> {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidateTag("testimonials");
  redirect("/admin/testimonials");
}

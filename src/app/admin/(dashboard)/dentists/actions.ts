"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { saveUploadedPhoto } from "@/lib/upload";

/** Splits a textarea's lines into a clean string array - the convention every
 * multi-line field (bio, specialities, languages) uses on this form. */
function lines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function readFields(formData: FormData) {
  const photoFile = formData.get("photo");
  let photoUrl: string | undefined;
  if (photoFile instanceof File && photoFile.size > 0) {
    photoUrl = await saveUploadedPhoto(photoFile);
  }

  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    qualifications: String(formData.get("qualifications") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    bio: lines(formData.get("bio")),
    specialities: lines(formData.get("specialities")),
    treatments: formData.getAll("treatments").map(String),
    languages: lines(formData.get("languages")),
    registration: String(formData.get("registration") ?? "").trim() || null,
    seoTitle: String(formData.get("seoTitle") ?? "").trim(),
    seoDescription: String(formData.get("seoDescription") ?? "").trim(),
    order: Number(formData.get("order") ?? 0) || 0,
    photoUrl,
  };
}

export async function createDentist(formData: FormData): Promise<void> {
  await requireAdmin();
  const fields = await readFields(formData);

  await prisma.dentist.create({
    data: { ...fields, photoUrl: fields.photoUrl ?? null },
  });

  revalidateTag("dentists");
  redirect("/admin/dentists");
}

export async function updateDentist(id: string, formData: FormData): Promise<void> {
  await requireAdmin();
  const fields = await readFields(formData);

  await prisma.dentist.update({
    where: { id },
    data: {
      ...fields,
      // Only overwrite the stored photo if a new one was actually uploaded this submit.
      ...(fields.photoUrl ? { photoUrl: fields.photoUrl } : {}),
    },
  });

  revalidateTag("dentists");
  redirect("/admin/dentists");
}

export async function deleteDentist(id: string): Promise<void> {
  await requireAdmin();
  await prisma.dentist.delete({ where: { id } });
  revalidateTag("dentists");
  redirect("/admin/dentists");
}

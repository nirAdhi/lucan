"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { saveUploadedPhoto } from "@/lib/upload";

async function readPhoto(formData: FormData, field: string): Promise<string | undefined> {
  const file = formData.get(field);
  if (file instanceof File && file.size > 0) return saveUploadedPhoto(file);
  return undefined;
}

export async function createCaseStudy(formData: FormData): Promise<void> {
  await requireAdmin();

  const before = await readPhoto(formData, "beforePhoto");
  const after = await readPhoto(formData, "afterPhoto");
  if (!before || !after) {
    throw new Error("Both a before and an after photo are required.");
  }

  await prisma.caseStudy.create({
    data: {
      treatmentSlug: String(formData.get("treatmentSlug") ?? "").trim(),
      treatmentLabel: String(formData.get("treatmentLabel") ?? "").trim(),
      caption: String(formData.get("caption") ?? "").trim(),
      consentConfirmed: formData.get("consentConfirmed") === "on",
      beforePhotoUrl: before,
      afterPhotoUrl: after,
      order: Number(formData.get("order") ?? 0) || 0,
    },
  });

  revalidateTag("case-studies");
  redirect("/admin/case-studies");
}

export async function updateCaseStudy(id: string, formData: FormData): Promise<void> {
  await requireAdmin();

  const before = await readPhoto(formData, "beforePhoto");
  const after = await readPhoto(formData, "afterPhoto");

  await prisma.caseStudy.update({
    where: { id },
    data: {
      treatmentSlug: String(formData.get("treatmentSlug") ?? "").trim(),
      treatmentLabel: String(formData.get("treatmentLabel") ?? "").trim(),
      caption: String(formData.get("caption") ?? "").trim(),
      consentConfirmed: formData.get("consentConfirmed") === "on",
      ...(before ? { beforePhotoUrl: before } : {}),
      ...(after ? { afterPhotoUrl: after } : {}),
      order: Number(formData.get("order") ?? 0) || 0,
    },
  });

  revalidateTag("case-studies");
  redirect("/admin/case-studies");
}

export async function deleteCaseStudy(id: string): Promise<void> {
  await requireAdmin();
  await prisma.caseStudy.delete({ where: { id } });
  revalidateTag("case-studies");
  redirect("/admin/case-studies");
}

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { treatments } from "@/content/treatments";
import { DentistForm } from "../DentistForm";
import { updateDentist } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditDentistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dentist = await prisma.dentist.findUnique({ where: { id } });
  if (!dentist) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink-900">Edit {dentist.name}</h1>
      <div className="mt-6 max-w-2xl rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
        <DentistForm
          dentist={dentist}
          allTreatments={treatments}
          action={updateDentist.bind(null, dentist.id)}
        />
      </div>
    </div>
  );
}

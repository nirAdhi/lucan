import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CaseStudyForm } from "../CaseStudyForm";
import { updateCaseStudy } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caseStudy = await prisma.caseStudy.findUnique({ where: { id } });
  if (!caseStudy) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink-900">Edit case study</h1>
      <div className="mt-6 max-w-2xl rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
        <CaseStudyForm caseStudy={caseStudy} action={updateCaseStudy.bind(null, caseStudy.id)} />
      </div>
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCaseStudy } from "./actions";

export const dynamic = "force-dynamic";

export default async function CaseStudiesListPage() {
  const caseStudies = await prisma.caseStudy.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink-900">Case studies</h1>
        <Link
          href="/admin/case-studies/new"
          className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Add case study
        </Link>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((cs) => (
          <li key={cs.id} className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-4">
            <div className="grid grid-cols-2 gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.beforePhotoUrl} alt="Before" className="aspect-square rounded-lg object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.afterPhotoUrl} alt="After" className="aspect-square rounded-lg object-cover" />
            </div>
            <p className="mt-3 font-semibold text-ink-900">{cs.treatmentLabel}</p>
            <p className="mt-1 text-sm text-ink-500">{cs.caption}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
              {cs.consentConfirmed ? "Published (consent confirmed)" : "Hidden - no consent recorded"}
            </p>
            <div className="mt-3 flex gap-3">
              <Link
                href={`/admin/case-studies/${cs.id}`}
                className="text-sm font-semibold text-brand-700 hover:underline"
              >
                Edit
              </Link>
              <form action={deleteCaseStudy.bind(null, cs.id)}>
                <button type="submit" className="text-sm font-semibold text-urgent-700 hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
        {caseStudies.length === 0 ? (
          <li className="col-span-full rounded-[var(--radius-card)] border border-dashed border-ink-300 p-8 text-center text-sm text-ink-500">
            No case studies yet. Add one above - it only appears on the public site once
            "consent confirmed" is ticked.
          </li>
        ) : null}
      </ul>
    </div>
  );
}

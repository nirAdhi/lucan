import { CaseStudyForm } from "../CaseStudyForm";
import { createCaseStudy } from "../actions";

export default function NewCaseStudyPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink-900">Add case study</h1>
      <div className="mt-6 max-w-2xl rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
        <CaseStudyForm action={createCaseStudy} />
      </div>
    </div>
  );
}

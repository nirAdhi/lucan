import type { Faq } from "@/content/faqs";

/**
 * FAQ list built on <details>/<summary>: no JavaScript, no hydration cost, keyboard and
 * screen-reader accessible for free, and the answers are in the HTML for crawlers even
 * when collapsed (PRD s54).
 */
export function FaqList({ faqs, defaultOpenFirst = false }: { faqs: Faq[]; defaultOpenFirst?: boolean }) {
  return (
    <div className="divide-y divide-ink-200 overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white">
      {faqs.map((faq, i) => (
        <details
          key={faq.question}
          open={defaultOpenFirst && i === 0}
          className="group px-5 py-1 open:bg-brand-50/40"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left font-semibold text-ink-800 hover:text-brand-700 [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-45"
            >
              <PlusIcon />
            </span>
          </summary>
          <p className="pb-5 pr-8 leading-relaxed text-ink-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 3.5v11M3.5 9h11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

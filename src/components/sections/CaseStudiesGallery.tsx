import { getCaseStudies } from "@/content/caseStudies";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";

/**
 * Before/after gallery - admin-managed at /admin/case-studies. Renders nothing until the
 * practice has uploaded at least one case study with consent confirmed (see
 * content/caseStudies.ts) - never a placeholder or stock photo standing in for real cases.
 */
export async function CaseStudiesGallery() {
  const caseStudies = await getCaseStudies();
  if (caseStudies.length === 0) return null;

  return (
    <Section>
      <Container width="wide">
        <SectionHeading
          eyebrow="Real results"
          title="Before and after"
          intro="Published with the patient's documented consent."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <li
              key={cs.id}
              className="overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white shadow-[var(--shadow-soft)]"
            >
              <div className="grid grid-cols-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cs.beforePhotoUrl} alt={`Before ${cs.treatmentLabel.toLowerCase()}`} className="aspect-square w-full object-cover" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cs.afterPhotoUrl} alt={`After ${cs.treatmentLabel.toLowerCase()}`} className="aspect-square w-full object-cover" />
              </div>
              <div className="p-4">
                <p className="font-semibold text-ink-900">{cs.treatmentLabel}</p>
                {cs.caption ? <p className="mt-1 text-sm text-ink-500">{cs.caption}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

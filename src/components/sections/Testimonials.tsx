import { getTestimonials } from "@/content/testimonials";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";

/**
 * Patient testimonials, managed at /admin/testimonials.
 *
 * Renders nothing until the practice has entered at least one testimonial with consent
 * confirmed - never a placeholder or an invented quote. See content/testimonials.ts.
 */
export async function Testimonials({ limit }: { limit?: number }) {
  const all = await getTestimonials();
  if (all.length === 0) return null;

  const testimonials = limit ? all.slice(0, limit) : all;

  return (
    <Section tone="tint">
      <Container width="wide">
        <SectionHeading
          eyebrow="Patient experience"
          title="What patients say after treatment"
          intro="Published with the patient's consent. Every mouth is different, so nothing here predicts your own result."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.id}
              className="flex flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 shadow-[var(--shadow-soft)]"
            >
              {testimonial.rating ? <Stars value={testimonial.rating} /> : null}

              <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-600">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <footer className="mt-5 border-t border-ink-100 pt-4">
                <p className="text-sm font-semibold text-ink-900">
                  {testimonial.author}
                  {testimonial.area ? (
                    <span className="font-normal text-ink-500"> &middot; {testimonial.area}</span>
                  ) : null}
                </p>
                {testimonial.treatmentLabel ? (
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.1em] text-brand-600">
                    {testimonial.treatmentLabel}
                  </p>
                ) : null}
              </footer>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5 text-gold-500" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            fill={i < value ? "currentColor" : "var(--color-ink-200)"}
            d="m10 1.5 2.47 5.51 6 .59-4.53 4.01 1.32 5.89L10 14.6l-5.26 2.9 1.32-5.89L1.53 7.6l6-.59L10 1.5Z"
          />
        </svg>
      ))}
    </div>
  );
}

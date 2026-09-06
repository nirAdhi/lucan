import type { Metadata } from "next";
import Link from "next/link";
import { patientStories } from "@/content/stories";
import { getTestimonials } from "@/content/testimonials";
import { getTreatment } from "@/content/treatments";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";
import { LinkButton } from "@/components/ui/Button";
import { cta } from "@/content/site";

const trail = crumbs({ name: "Patient Stories", path: "/patient-stories" });

export const metadata: Metadata = buildMetadata({
  title: "Patient Stories | Lucan Dental & Implantology Centre",
  description:
    "Patient stories from Lucan Dental & Implantology Centre, published with patient consent. See what treatment at the practice involves, from first visit to result.",
  path: "/patient-stories",
});

export default async function PatientStoriesPage() {
  // Admin-managed and consent-gated - see content/testimonials.ts.
  const testimonials = await getTestimonials();
  const hasContent = patientStories.length > 0 || testimonials.length > 0;

  return (
    <>
      <PageHero
        eyebrow="Patient stories"
        title="Treatment at the practice, in patients' own words"
        intro="Stories and testimonials are only published where the patient has given consent, so this page grows as patients agree to share their experience."
        trail={trail}
        actions={
          <LinkButton href={cta.book.href} size="lg">
            {cta.book.label}
          </LinkButton>
        }
      />

      <Section>
        <Container width="wide">
          {patientStories.length > 0 ? (
            <ul className="space-y-8">
              {patientStories.map((story) => {
                const treatment = getTreatment(story.treatment);
                return (
                  <Card as="li" key={story.slug} className="scroll-mt-28" >
                    <div id={story.slug} className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                          {treatment?.name ?? story.treatment}
                        </p>
                        <h2 className="mt-2 text-xl">{story.headline}</h2>
                        <p className="mt-2 text-sm text-ink-400">{story.patient}</p>
                        {treatment ? (
                          <Link
                            href={`/treatments/${treatment.slug}`}
                            className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
                          >
                            About {treatment.name.toLowerCase()} &rarr;
                          </Link>
                        ) : null}
                      </div>
                      <dl className="space-y-4 text-[0.95rem] leading-relaxed">
                        <div>
                          <dt className="font-semibold text-ink-900">The problem</dt>
                          <dd className="mt-1 text-ink-600">{story.problem}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-ink-900">The treatment</dt>
                          <dd className="mt-1 text-ink-600">{story.treatmentGiven}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-ink-900">The result</dt>
                          <dd className="mt-1 text-ink-600">{story.result}</dd>
                        </div>
                        {story.quote ? (
                          <blockquote className="border-l-2 border-brand-300 pl-4 italic text-ink-700">
                            {story.quote}
                          </blockquote>
                        ) : null}
                      </dl>
                    </div>
                  </Card>
                );
              })}
            </ul>
          ) : (
            /* Honest empty state. Fabricated testimonials would be a false review, so the
               page ships with the layout ready and no invented content (PRD s43). */
            <div className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-dashed border-ink-300 bg-ink-50 p-10 text-center">
              <h2 className="text-xl">Patient stories are being collected</h2>
              <p className="mt-3 leading-relaxed text-ink-500">
                The practice is gathering stories from patients who have agreed to share their
                treatment and results. Until they are published here, the treatment pages set out
                exactly what each procedure involves, and the team page introduces the dentists
                who carry it out.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <LinkButton href="/treatments" variant="outline">
                  Browse treatments
                </LinkButton>
                <LinkButton href="/our-team" variant="ghost">
                  Meet the team
                </LinkButton>
              </div>
            </div>
          )}

          {testimonials.length > 0 ? (
            <div className="mt-14">
              <SectionHeading eyebrow="Testimonials" title="What patients say" />
              <ul className="mt-8 grid gap-5 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <Card as="li" key={testimonial.id}>
                    <blockquote className="text-[0.95rem] leading-relaxed text-ink-600">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <p className="mt-4 text-sm font-semibold text-ink-900">
                      {testimonial.author}
                      {testimonial.area ? (
                        <span className="font-normal text-ink-500"> &middot; {testimonial.area}</span>
                      ) : null}
                    </p>
                    {testimonial.treatmentLabel ? (
                      <p className="text-xs text-ink-400">{testimonial.treatmentLabel}</p>
                    ) : null}
                  </Card>
                ))}
              </ul>
            </div>
          ) : null}

          {hasContent ? (
            <p className="mt-10 text-xs leading-relaxed text-ink-400">
              Stories and images are published with patient consent. Individual results vary and
              nothing on this page should be taken as a prediction of your own outcome.
            </p>
          ) : null}
        </Container>
      </Section>

      <BookingCta location="stories-footer" />

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

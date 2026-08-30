import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTreatment, getTreatments, treatments } from "@/content/treatments";
import { getPrices, pricingDisclaimer } from "@/content/pricing";
import { getTeamForTreatment } from "@/content/team";
import { getStoriesForTreatment } from "@/content/stories";
import { cta } from "@/content/site";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, treatmentSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { LinkButton } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Cards";
import { FaqList } from "@/components/ui/Faq";
import { PriceTable } from "@/components/ui/PriceTable";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";
import { TrackedCta } from "@/components/analytics/TrackedCta";
import { TreatmentView } from "./TreatmentView";

// Kept for route validation/typing, but this segment now renders dynamically (see
// app/(site)/layout.tsx) since prices and clinicians come from Postgres - it no longer
// drives build-time static generation the way PRD s54 originally described.
export function generateStaticParams() {
  return treatments.map((treatment) => ({ slug: treatment.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);

  if (!treatment) {
    return buildMetadata({
      title: "Treatment not found | LDIC",
      description: "This treatment page could not be found.",
      path: `/treatments/${slug}`,
      index: false,
    });
  }

  return buildMetadata({
    title: treatment.seo.title,
    description: treatment.seo.description,
    path: `/treatments/${treatment.slug}`,
  });
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  const trail = crumbs(
    { name: "Treatments", path: "/treatments" },
    { name: treatment.name, path: `/treatments/${treatment.slug}` },
  );

  const prices = await getPrices(treatment.priceSlugs);
  const clinicians = await getTeamForTreatment(treatment.slug);
  const stories = getStoriesForTreatment(treatment.slug);
  const related = getTreatments(treatment.related);
  const bookHref = `${cta.book.href}?reason=${encodeURIComponent(treatment.bookingReason)}&treatment=${treatment.slug}`;

  return (
    <>
      {/* Records treatment_view for the PRD s3 funnel. */}
      <TreatmentView slug={treatment.slug} name={treatment.name} category={treatment.category} />

      <PageHero
        eyebrow={treatment.category}
        title={treatment.h1}
        intro={treatment.summary}
        trail={trail}
        tone={treatment.category === "Urgent" ? "urgent" : "tint"}
        actions={
          <>
            <TrackedCta
              href={bookHref}
              event="book_click"
              location="treatment-hero"
              treatment={treatment.slug}
              size="lg"
              variant={treatment.category === "Urgent" ? "urgent" : "primary"}
            >
              Book {treatment.bookingReason.toLowerCase()}
            </TrackedCta>
            <TrackedCta
              href={cta.call.href}
              event="phone_click"
              location="treatment-hero"
              treatment={treatment.slug}
              variant="outline"
              size="lg"
            >
              Call the practice
            </TrackedCta>
          </>
        }
        aside={
          prices.length > 0 ? (
            <Card>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                Indicative prices
              </p>
              <dl className="mt-4 space-y-2.5 text-[0.95rem]">
                {prices.slice(0, 3).map((price) => (
                  <div key={price.slug} className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink-600">{price.name}</dt>
                    <dd className="whitespace-nowrap font-semibold text-brand-800">{price.price}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href={`/pricing#${treatment.priceGroup}`}
                className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
              >
                All {treatment.name.toLowerCase()} prices &rarr;
              </Link>
            </Card>
          ) : null
        }
      />

      {/* What is it / who is it for (PRD s9). */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-2xl">What is {treatment.name.toLowerCase()}?</h2>
              <div className="mt-4 space-y-4 text-[1.05rem] leading-relaxed text-ink-600">
                {treatment.whatIsIt.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <Card className="bg-brand-50/60">
              <h2 className="text-lg">Who it is for</h2>
              <ul className="mt-4 space-y-3 text-[0.95rem] text-ink-600">
                {treatment.whoIsItFor.map((item) => (
                  <li key={item.slice(0, 32)} className="flex gap-3">
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Benefits (PRD s9). */}
      <Section tone="tint">
        <Container width="wide">
          <SectionHeading eyebrow="Benefits" title={`Why patients choose ${treatment.name.toLowerCase()}`} />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {treatment.benefits.map((benefit) => (
              <li key={benefit.title} className="border-t border-ink-200 pt-5">
                <h3 className="font-semibold text-ink-900">{benefit.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">{benefit.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Process and timeline (PRD s9). */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <SectionHeading eyebrow="The process" title="What treatment involves" />
              <ol className="mt-8 space-y-6">
                {treatment.process.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink-900">{step.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-ink-500">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-6">
              <Card>
                <h3 className="text-lg">Expected timeline</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{treatment.timeline}</p>
              </Card>
              <Card>
                <h3 className="text-lg">Technology and technique</h3>
                <ul className="mt-3 space-y-2 text-[0.95rem] text-ink-600">
                  {treatment.technology.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Clinicians (PRD s9, s46). */}
      {clinicians.length > 0 ? (
        <Section tone="tint">
          <Container width="wide">
            <SectionHeading
              eyebrow="Your dentist"
              title={`Who carries out ${treatment.name.toLowerCase()}`}
            />
            <ul className="mt-8 grid gap-5 lg:grid-cols-2">
              {clinicians.map((member) => (
                <Card as="li" key={member.slug} className="flex gap-5">
                  <Avatar member={member} />
                  <div>
                    <h3 className="font-semibold">
                      <Link href={`/our-team/${member.slug}`} className="hover:text-brand-700">
                        {member.name}
                      </Link>
                    </h3>
                    <p className="text-sm font-medium text-brand-700">{member.role}</p>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
                      {member.summary}
                    </p>
                  </div>
                </Card>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* Pricing (PRD s9, s44). */}
      <Section>
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Pricing"
                title={`${treatment.name} prices`}
                intro={pricingDisclaimer}
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedCta
                  href={bookHref}
                  event="book_click"
                  location="treatment-pricing"
                  treatment={treatment.slug}
                >
                  {cta.book.label}
                </TrackedCta>
                <LinkButton href={`/pricing#${treatment.priceGroup}`} variant="outline">
                  Full price list
                </LinkButton>
              </div>
            </div>
            <PriceTable items={prices} caption={`${treatment.name} - indicative prices`} />
          </div>
        </Container>
      </Section>

      {/* Patient stories (PRD s43) - only where consented content exists. */}
      {stories.length > 0 ? (
        <Section tone="tint">
          <Container width="wide">
            <SectionHeading eyebrow="Patient stories" title={`${treatment.name} at the practice`} />
            <ul className="mt-8 grid gap-5 lg:grid-cols-3">
              {stories.map((story) => (
                <Card as="li" key={story.slug}>
                  <h3 className="font-semibold">{story.headline}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">{story.result}</p>
                  {story.quote ? (
                    <blockquote className="mt-3 border-l-2 border-brand-200 pl-3 text-[0.95rem] italic text-ink-600">
                      {story.quote}
                    </blockquote>
                  ) : null}
                </Card>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* FAQs (PRD s9) with matching FAQPage markup. */}
      <Section tone={stories.length > 0 ? "white" : "tint"}>
        <Container width="narrow">
          <SectionHeading
            eyebrow="FAQs"
            title={`${treatment.name} questions`}
            align="center"
          />
          <div className="mt-8">
            <FaqList faqs={treatment.faqs} defaultOpenFirst />
          </div>
        </Container>
      </Section>

      {/* Internal linking (PRD s27). */}
      {related.length > 0 ? (
        <Section>
          <Container width="wide">
            <SectionHeading eyebrow="Related" title="You might also be looking at" />
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((item) => (
                <Card as="li" key={item.slug}>
                  <h3 className="font-semibold">
                    <Link href={`/treatments/${item.slug}`} className="hover:text-brand-700">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">{item.cardText}</p>
                </Card>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <BookingCta
        title={`Book a ${treatment.bookingReason.toLowerCase()}`}
        body="Request an appointment online at any time and the practice will confirm it with you, or phone during opening hours."
        location="treatment-footer"
        treatment={treatment.slug}
        reason={treatment.bookingReason}
      />

      <JsonLd
        data={[treatmentSchema(treatment), faqSchema(treatment.faqs), breadcrumbSchema(trail)]}
      />
    </>
  );
}

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-1 shrink-0 text-brand-600"
    >
      <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

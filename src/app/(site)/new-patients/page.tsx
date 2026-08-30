import type { Metadata } from "next";
import Link from "next/link";
import { cta, site } from "@/content/site";
import { getPrices } from "@/content/pricing";
import { faqGroups } from "@/content/faqs";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { LinkButton } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/Faq";
import { PriceTable } from "@/components/ui/PriceTable";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";
import { TrackedCta } from "@/components/analytics/TrackedCta";

const trail = crumbs({ name: "New Patients", path: "/new-patients" });

export const metadata: Metadata = buildMetadata({
  title: "New Patients | Dentist in Lucan | LDIC",
  description:
    "New patients are welcome at Lucan Dental & Implantology Centre. What happens at your first appointment, what it costs, PRSI eligibility and how to book. Call (01) 628 1500.",
  path: "/new-patients",
});

const nervousFaqs = faqGroups.find((group) => group.slug === "nervous-patients")?.faqs ?? [];
const costFaqs = faqGroups.find((group) => group.slug === "costs-and-prsi")?.faqs ?? [];
const pageFaqs = [...costFaqs, ...nervousFaqs];

const steps = [
  {
    title: "Booking in",
    body: "Request an appointment online at any time, or phone the practice on (01) 628 1500 during opening hours. Tell us if you are anxious about dental treatment so enough time is allowed.",
  },
  {
    title: "Arriving",
    body: "You will be asked for your details and medical history, and for your PPS number if you would like your PRSI eligibility checked.",
  },
  {
    title: "The examination",
    body: "Your dentist listens to your concerns first, then examines your teeth, gums and bite. X-rays are taken only where they are needed.",
  },
  {
    title: "Your options",
    body: "Findings are explained in plain language, along with the choices available - including doing nothing where that is reasonable.",
  },
  {
    title: "Your written plan",
    body: "You leave with a clear, written treatment plan and the cost, so nothing is started before you have agreed to it.",
  },
  {
    title: "Next appointments",
    body: "Any treatment is booked in the order your plan sets out, with hygiene and review appointments as needed.",
  },
];

export default async function NewPatientsPage() {
  const firstVisitPrices = await getPrices([
    "exam-existing",
    "exam-and-clean",
    "exam-prsi",
    "exam-diagnosis-plan",
    "small-xray",
    "opg",
    "child-exam",
  ]);

  return (
    <>
      <PageHero
        eyebrow="New patients"
        title="New patients are welcome"
        intro="If it has been a while since your last visit, you are in good company. Here is exactly what happens at a first appointment, what it costs, and how to get booked in."
        trail={trail}
        actions={
          <>
            <TrackedCta
              href={`${cta.book.href}?reason=${encodeURIComponent("New patient examination")}`}
              event="book_click"
              location="new-patients-hero"
              size="lg"
            >
              Book a first appointment
            </TrackedCta>
            <TrackedCta
              href={cta.call.href}
              event="phone_click"
              location="new-patients-hero"
              variant="outline"
              size="lg"
            >
              {site.phone}
            </TrackedCta>
          </>
        }
      />

      <Section>
        <Container width="wide">
          <SectionHeading
            eyebrow="Your first visit"
            title="Six steps, no surprises"
            intro="The practice has invested in a calm environment - gentle scents, soothing background sound and a welcoming atmosphere - because a first visit sets the tone for everything after it."
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-[var(--radius-card)] bg-ink-50 p-6">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Costs"
                title="What a first appointment costs"
                intro="Prices are published in full, so there is no need to ask what something might cost before you come in."
              />
              <ul className="mt-6 space-y-3 text-[0.95rem] text-ink-600">
                <li>
                  <strong className="text-ink-900">PRSI:</strong> a general dentist exam is free
                  once per year and a scale and polish is €15, both subject to eligibility. Bring
                  your PPS number.
                </li>
                <li>
                  <strong className="text-ink-900">Children:</strong> an exam is €50, or €80 with
                  an X-ray and prescription.
                </li>
                <li>
                  <strong className="text-ink-900">Written plans:</strong> the cost of any
                  treatment is confirmed in writing before it starts.
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <LinkButton href="/pricing" variant="outline">
                  Full price list
                </LinkButton>
                <LinkButton href="/faqs#costs-and-prsi" variant="ghost">
                  PRSI questions
                </LinkButton>
              </div>
            </div>
            <PriceTable items={firstVisitPrices} caption="First appointment prices" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <h2 className="text-lg">Nervous about the dentist?</h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
                Say so when you book. Sedation dentistry is available for anxious patients, and
                appointments can be paced to suit you.
              </p>
            </Card>
            <Card>
              <h2 className="text-lg">What to bring</h2>
              <ul className="mt-2 space-y-1.5 text-[0.95rem] text-ink-500">
                <li>A list of any medication you take</li>
                <li>Your PPS number, for PRSI eligibility</li>
                <li>Details of any recent dental treatment</li>
              </ul>
            </Card>
            <Card>
              <h2 className="text-lg">Changing an appointment</h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
                {site.cancellationNote} Late cancellation or non-attendance fees may otherwise
                apply.
              </p>
            </Card>
          </div>

          <p className="mt-10 text-[0.95rem] text-ink-500">
            Looking for a specific treatment?{" "}
            <Link href="/treatments" className="font-semibold text-brand-700 hover:underline">
              Browse all treatments
            </Link>{" "}
            or{" "}
            <Link href="/our-team" className="font-semibold text-brand-700 hover:underline">
              meet the dentists
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading eyebrow="FAQs" title="Questions new patients ask" align="center" />
          <div className="mt-8">
            <FaqList faqs={pageFaqs} defaultOpenFirst />
          </div>
        </Container>
      </Section>

      <BookingCta
        title="Book your first appointment"
        location="new-patients-footer"
        reason="New patient examination"
      />

      <JsonLd data={[faqSchema(pageFaqs), breadcrumbSchema(trail)]} />
    </>
  );
}

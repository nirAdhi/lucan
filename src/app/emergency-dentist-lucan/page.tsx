import type { Metadata } from "next";
import Link from "next/link";
import { cta, site } from "@/content/site";
import { getTreatment } from "@/content/treatments";
import { getPrices } from "@/content/pricing";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { FaqList } from "@/components/ui/Faq";
import { PriceTable } from "@/components/ui/PriceTable";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";
import { TrackedCta } from "@/components/analytics/TrackedCta";

/**
 * Emergency landing page (PRD s51).
 *
 * The highest-intent page on the site. Everything here is arranged around one action -
 * phoning the practice - because someone in pain is not going to read a treatment page.
 */

const trail = crumbs({ name: "Emergency Dentist Lucan", path: "/emergency-dentist-lucan" });

export const metadata: Metadata = buildMetadata({
  title: "Emergency Dentist in Lucan | Same-Day Dental Care | LDIC",
  description:
    "Dental emergency in Lucan? Phone Lucan Dental & Implantology Centre on (01) 628 1500. Emergency appointments €100, Monday to Friday 9am to 5pm, Lucan Village.",
  path: "/emergency-dentist-lucan",
});

const emergency = getTreatment("emergency-dentistry");

const emergencyPrices = getPrices([
  "emergency-appointment",
  "pulp-dressing",
  "temporary-filling",
  "recement-crown",
  "extraction-regular",
  "extraction-surgical",
  "small-xray",
]);

const symptoms = [
  {
    title: "Severe toothache",
    body: "Pain that keeps you awake, throbs, or does not settle with painkillers.",
    action: "Phone the practice - a nerve may be involved and can often be settled the same day.",
  },
  {
    title: "Swelling",
    body: "Swelling of the gum, face or jaw, with or without a bad taste.",
    action:
      "Phone the practice straight away. Go to a hospital emergency department if you have difficulty breathing or swallowing, or the swelling is spreading quickly.",
  },
  {
    title: "Broken or chipped tooth",
    body: "A tooth broken by biting, a fall or a knock, sharp edges or an exposed nerve.",
    action: "Keep any fragments, avoid biting on it and phone the practice.",
  },
  {
    title: "Knocked-out tooth",
    body: "An adult tooth completely out of its socket.",
    action:
      "Handle it by the crown, not the root. Do not scrub it. Phone immediately - time matters.",
  },
  {
    title: "Lost filling or crown",
    body: "A restoration has come out, leaving the tooth sharp or sensitive.",
    action: "Keep the crown if you have it and phone the practice - it can often be recemented.",
  },
  {
    title: "Bleeding that will not stop",
    body: "Bleeding after an extraction or an injury that continues despite pressure.",
    action:
      "Bite firmly on clean gauze for 15 minutes and phone the practice. Attend an emergency department if it continues.",
  },
];

export default function EmergencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Urgent care"
        title="Emergency dentist in Lucan"
        intro="If you are in pain, have swelling, or have broken a tooth, phone the practice. Emergency problems are triaged by phone so you can be given the soonest suitable appointment."
        trail={trail}
        tone="urgent"
        actions={
          <>
            <TrackedCta
              href={cta.call.href}
              event="phone_click"
              location="emergency-hero"
              variant="urgent"
              size="lg"
            >
              Call {site.phone} now
            </TrackedCta>
            <TrackedCta
              href={`${cta.book.href}?reason=${encodeURIComponent("Emergency appointment")}`}
              event="book_click"
              location="emergency-hero"
              variant="outline"
              size="lg"
            >
              Request an urgent appointment
            </TrackedCta>
          </>
        }
        aside={
          <Card className="bg-urgent-50 ring-1 ring-urgent-100">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-urgent-700">
              Opening hours
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
              Monday to Friday, 9am to 5pm. {site.hoursNote}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
              Emergency appointment: <span className="font-semibold">€100</span>
            </p>
            <hr className="my-4 border-urgent-100" />
            <p className="text-sm leading-relaxed text-ink-600">
              <strong className="text-ink-900">Outside opening hours,</strong> contact an
              out-of-hours emergency dental service. Go to a hospital emergency department for
              facial swelling with difficulty breathing or swallowing, uncontrolled bleeding, or
              injury from trauma.
            </p>
          </Card>
        }
      />

      <Section>
        <Container width="wide">
          <SectionHeading
            eyebrow="Symptoms"
            title="Is this a dental emergency?"
            intro="If any of these describe your situation, phone the practice rather than waiting for a routine appointment."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {symptoms.map((symptom) => (
              <Card as="li" key={symptom.title}>
                <h3 className="font-semibold text-ink-900">{symptom.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">{symptom.body}</p>
                <p className="mt-3 border-t border-ink-100 pt-3 text-[0.95rem] font-medium leading-relaxed text-brand-800">
                  {symptom.action}
                </p>
              </Card>
            ))}
          </ul>

          <div className="mt-10 rounded-[var(--radius-card)] border border-urgent-100 bg-urgent-50 p-6">
            <h3 className="font-semibold text-urgent-700">When to go to hospital instead</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-700">
              A dental practice is not the right place for a medical emergency. Go to a hospital
              emergency department, or call the emergency services, if you have difficulty
              breathing or swallowing, a rapidly spreading facial swelling, an injury from
              significant trauma, or bleeding that cannot be controlled.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="What happens"
                title="At an emergency appointment"
                intro="The visit is about getting you comfortable and stabilising the tooth. Longer treatment is planned afterwards, in writing."
              />
              <ol className="mt-6 space-y-4 text-[0.95rem] text-ink-600">
                <li>
                  <strong className="text-ink-900">1. Triage by phone.</strong> Reception asks
                  what has happened so the urgency can be judged.
                </li>
                <li>
                  <strong className="text-ink-900">2. Examination.</strong> An examination, with a
                  small X-ray, OPG or CT scan where needed - all available on site.
                </li>
                <li>
                  <strong className="text-ink-900">3. Immediate treatment.</strong> Pain relief,
                  a temporary filling, recementing a crown, opening a canal, or an extraction
                  where a tooth cannot be saved.
                </li>
                <li>
                  <strong className="text-ink-900">4. A plan.</strong> Written costs for anything
                  further, such as root canal treatment, a crown or an implant.
                </li>
              </ol>
            </div>
            <PriceTable items={emergencyPrices} caption="Emergency treatment prices" />
          </div>
        </Container>
      </Section>

      {emergency ? (
        <Section>
          <Container width="narrow">
            <SectionHeading eyebrow="FAQs" title="Emergency dental questions" align="center" />
            <div className="mt-8">
              <FaqList faqs={emergency.faqs} defaultOpenFirst />
            </div>
            <p className="mt-8 text-center text-[0.95rem] text-ink-500">
              Related:{" "}
              <Link href="/treatments/root-canal" className="font-semibold text-brand-700 hover:underline">
                root canal treatment
              </Link>
              ,{" "}
              <Link href="/treatments/dental-crowns" className="font-semibold text-brand-700 hover:underline">
                crowns
              </Link>{" "}
              and{" "}
              <Link
                href="/treatments/wisdom-teeth-removal"
                className="font-semibold text-brand-700 hover:underline"
              >
                wisdom teeth removal
              </Link>
              .
            </p>
          </Container>
        </Section>
      ) : null}

      <BookingCta
        title="Phone the practice now"
        body="Emergency problems are triaged by phone so you can be given the soonest suitable appointment. Requests sent online are picked up during opening hours."
        location="emergency-footer"
        reason="Emergency appointment"
      />

      <JsonLd
        data={
          emergency
            ? [faqSchema(emergency.faqs), breadcrumbSchema(trail)]
            : [breadcrumbSchema(trail)]
        }
      />
    </>
  );
}

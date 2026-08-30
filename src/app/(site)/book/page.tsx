import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { cta, site } from "@/content/site";
import { getTeam } from "@/content/team";
import { faqGroups } from "@/content/faqs";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section } from "@/components/ui/Layout";
import { FaqList } from "@/components/ui/Faq";
import { PageHero } from "@/components/sections/Hero";
import { BookingForm } from "@/components/booking/BookingForm";
import { TrackedCta } from "@/components/analytics/TrackedCta";

const trail = crumbs({ name: "Book Appointment", path: "/book" });

export const metadata: Metadata = buildMetadata({
  title: "Book a Dental Appointment in Lucan | LDIC",
  description:
    "Request a dental appointment at Lucan Dental & Implantology Centre, Lucan Village. Choose your appointment type and preferred time, and the practice will confirm it with you.",
  path: "/book",
});

const appointmentFaqs = faqGroups.find((group) => group.slug === "appointments")?.faqs ?? [];

export default async function BookPage() {
  const team = await getTeam();

  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Request an appointment"
        intro="Send a request at any hour and the practice will come back to you to confirm a time. New patients are welcome."
        trail={trail}
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <Suspense
              fallback={
                <div className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-8 text-ink-500">
                  Loading the appointment form...
                </div>
              }
            >
              <BookingForm team={team} />
            </Suspense>

            <div className="space-y-5 lg:sticky lg:top-28">
              <Card>
                <h2 className="text-lg">Rather phone?</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
                  Reception can book you in directly during opening hours, Monday to Friday, 9am
                  to 5pm.
                </p>
                <TrackedCta
                  href={cta.call.href}
                  event="phone_click"
                  location="book-sidebar"
                  className="mt-4 w-full"
                  size="lg"
                >
                  {site.phone}
                </TrackedCta>
                <p className="mt-3 text-sm text-ink-400">
                  Or email{" "}
                  <a href={`mailto:${site.email}`} className="text-brand-700 underline">
                    {site.email}
                  </a>
                </p>
              </Card>

              <Card className="bg-urgent-50 ring-1 ring-urgent-100">
                <h2 className="text-lg text-urgent-700">In pain right now?</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">
                  Phone the practice rather than waiting for a reply to an online request, so the
                  problem can be triaged.
                </p>
                <Link
                  href={cta.emergency.href}
                  className="mt-3 inline-block text-sm font-semibold text-urgent-700 hover:underline"
                >
                  Emergency dental care &rarr;
                </Link>
              </Card>

              <Card>
                <h2 className="text-lg">What happens next</h2>
                <ol className="mt-3 space-y-3 text-[0.95rem] text-ink-600">
                  <li className="flex gap-3">
                    <Dot />
                    <span>Reception reviews your request during opening hours.</span>
                  </li>
                  <li className="flex gap-3">
                    <Dot />
                    <span>
                      You are contacted on the number you give us to agree a time that suits.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Dot />
                    <span>Your appointment is confirmed, along with anything to bring.</span>
                  </li>
                </ol>
                <p className="mt-4 text-sm text-ink-400">
                  Bring your PPS number if you would like PRSI eligibility checked.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {appointmentFaqs.length > 0 ? (
        <Section tone="tint">
          <Container width="narrow">
            <h2 className="text-2xl">Appointment questions</h2>
            <div className="mt-6">
              <FaqList faqs={appointmentFaqs} />
            </div>
          </Container>
        </Section>
      ) : null}

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
    />
  );
}

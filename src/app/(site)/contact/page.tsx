import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { cta, site } from "@/content/site";
import { getTeam } from "@/content/team";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { PageHero } from "@/components/sections/Hero";
import {
  DirectionsList,
  PracticeDetailsCard,
  PracticeMap,
} from "@/components/sections/LocationBlock";
import { BookingForm } from "@/components/booking/BookingForm";
import { TrackedCta } from "@/components/analytics/TrackedCta";
import { EmailOff } from "@/components/ui/EmailOff";

const trail = crumbs({ name: "Contact", path: "/contact" });

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Dentist in Lucan Village | LDIC",
  description:
    "Contact Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin. Phone (01) 628 1500, email info@ldic.ie, or request an appointment online. Open Mon-Fri 9am-5pm.",
  path: "/contact",
});

export default async function ContactPage() {
  const team = await getTeam();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact the practice"
        intro="Phone during opening hours, email, or send an appointment request at any time and we will come back to you."
        trail={trail}
        actions={
          <>
            <TrackedCta href={cta.call.href} event="phone_click" location="contact-hero" size="lg">
              {site.phone}
            </TrackedCta>
            <EmailOff>
              <TrackedCta
                href={`mailto:${site.email}`}
                event="contact_form"
                location="contact-hero"
                variant="outline"
                size="lg"
              >
                {site.email}
              </TrackedCta>
            </EmailOff>
          </>
        }
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <PracticeDetailsCard />
            <PracticeMap />
          </div>

          <div className="mt-12">
            <DirectionsList />
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Appointments"
                title="Request an appointment"
                intro="Send this at any hour. The practice will contact you during opening hours to confirm a time."
              />
              <div className="mt-8">
                <Suspense
                  fallback={
                    <div className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-8 text-ink-500">
                      Loading the appointment form...
                    </div>
                  }
                >
                  <BookingForm team={team} />
                </Suspense>
              </div>
            </div>

            <div className="space-y-5 lg:sticky lg:top-28">
              <Card className="bg-urgent-50 ring-1 ring-urgent-100">
                <h2 className="text-lg text-urgent-700">Dental emergency</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">
                  Phone the practice rather than using the form, so the problem can be triaged.
                </p>
                <Link
                  href={cta.emergency.href}
                  className="mt-3 inline-block text-sm font-semibold text-urgent-700 hover:underline"
                >
                  Emergency dental care &rarr;
                </Link>
              </Card>

              <Card>
                <h2 className="text-lg">Referring a patient?</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
                  Implant, periodontal and surgical referrals are accepted from other dentists.
                </p>
                <Link
                  href="/dentist-referrals"
                  className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
                >
                  How referrals work &rarr;
                </Link>
              </Card>

              <Card>
                <h2 className="text-lg">Before you send</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
                  Please do not send detailed medical information through the website. Bring it to
                  your appointment, or discuss it by phone.
                </p>
                <p className="mt-3 text-sm text-ink-400">
                  See our{" "}
                  <Link href="/privacy" className="text-brand-700 underline">
                    privacy notice
                  </Link>{" "}
                  for how enquiry details are handled.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

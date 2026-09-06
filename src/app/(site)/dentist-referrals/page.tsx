import type { Metadata } from "next";
import Link from "next/link";
import { cta, site } from "@/content/site";
import { getTeam } from "@/content/team";
import { getPrices } from "@/content/pricing";
import { faqGroups } from "@/content/faqs";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { FaqList } from "@/components/ui/Faq";
import { PriceTable } from "@/components/ui/PriceTable";
import { PageHero } from "@/components/sections/Hero";
import { TrackedCta } from "@/components/analytics/TrackedCta";
import { EmailOff } from "@/components/ui/EmailOff";

/**
 * Referral page (PRD s73 - the legacy /dentist-referrals URL keeps its path).
 *
 * Referring dentists are a commercially significant channel for an implantology practice,
 * so this audience gets its own page rather than being redirected into /contact.
 */

const trail = crumbs({ name: "Dentist Referrals", path: "/dentist-referrals" });

export const metadata: Metadata = buildMetadata({
  title: "Dentist Referrals | Implant & Periodontal Referrals Lucan | LDIC",
  description:
    "Refer a patient to Lucan Dental & Implantology Centre for implant, periodontal and oral surgery treatment. On-site CT imaging and IV sedation. Call (01) 628 1500.",
  path: "/dentist-referrals",
});

const referralFaqs = faqGroups.find((group) => group.slug === "referrals")?.faqs ?? [];

export default async function ReferralsPage() {
  const referralPrices = await getPrices([
    "specialist-consultation-opg",
    "specialist-consultation-ct",
    "implant",
    "crown-on-implant",
    "bone-graft",
    "sinus-lift",
    "periodontal-treatment",
    "iv-sedation",
  ]);

  const team = await getTeam();
  const specialists = team.filter((member) =>
    /periodontist|oral surgeon/i.test(member.role),
  );

  return (
    <>
      <PageHero
        eyebrow="For referring dentists"
        title="Referrals for implant, periodontal and surgical care"
        intro="The practice accepts referrals from other dentists, particularly for implant placement, advanced gum care and oral surgery. Patients are returned to your care with a written report."
        trail={trail}
        actions={
          <>
            <TrackedCta
              href={cta.call.href}
              event="phone_click"
              location="referrals-hero"
              size="lg"
            >
              {site.phone}
            </TrackedCta>
            <EmailOff>
              <TrackedCta
                href={`mailto:${site.email}?subject=Patient%20referral`}
                event="contact_form"
                location="referrals-hero"
                variant="outline"
                size="lg"
              >
                Email a referral
              </TrackedCta>
            </EmailOff>
          </>
        }
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="What we accept"
                title="Treatment carried out on referral"
              />
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Implant placement, single and multiple",
                  "Bone grafting and sinus lift surgery",
                  "Implant explantation",
                  "Surgical and non-surgical periodontal therapy",
                  "Surgical extractions and impacted wisdom teeth",
                  "Gingivectomy, frenectomy and open flap surgery",
                  "Biopsy and oral pathology assessment",
                  "Treatment under IV sedation",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-ink-200 px-4 py-3 text-[0.95rem] text-ink-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 text-2xl">How to refer</h2>
              <ol className="mt-4 space-y-4 text-[0.95rem] text-ink-600">
                <li>
                  <strong className="text-ink-900">1. Send the referral.</strong> Email{" "}
                  <EmailOff>
                    <a href={`mailto:${site.email}`} className="text-brand-700 underline">
                      {site.email}
                    </a>
                  </EmailOff>{" "}
                  or phone {site.phone} with the patient's details, the reason for referral and
                  any imaging you already hold.
                </li>
                <li>
                  <strong className="text-ink-900">2. Assessment.</strong> The patient is seen for
                  a specialist consultation, with OPG or CT imaging taken here where needed.
                </li>
                <li>
                  <strong className="text-ink-900">3. Plan and consent.</strong> The patient
                  receives a written plan and costs; you receive the assessment.
                </li>
                <li>
                  <strong className="text-ink-900">4. Treatment and handover.</strong> Treatment is
                  carried out here and the patient returns to you for ongoing general care, with a
                  report of what was done.
                </li>
              </ol>
            </div>

            <div className="space-y-6">
              <Card>
                <h2 className="text-lg">Imaging and facilities</h2>
                <ul className="mt-3 space-y-2 text-[0.95rem] text-ink-600">
                  <li>CT scanning for implant planning</li>
                  <li>OPG and digital intra-oral radiography</li>
                  <li>IV sedation</li>
                  <li>Bone grafting and sinus lift surgery</li>
                </ul>
              </Card>

              {specialists.length > 0 ? (
                <Card>
                  <h2 className="text-lg">Who will see your patient</h2>
                  <ul className="mt-3 space-y-3">
                    {specialists.map((member) => (
                      <li key={member.slug}>
                        <Link
                          href={`/our-team/${member.slug}`}
                          className="font-semibold text-brand-800 hover:underline"
                        >
                          {member.name}
                        </Link>
                        <p className="text-sm text-ink-500">
                          {member.role} &middot; {member.qualifications}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}

              <Card>
                <h2 className="text-lg">Reports</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
                  Referral letters with consultation or X-ray, and hospital reports, are provided
                  at €100.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <SectionHeading
              eyebrow="Costs"
              title="Referral treatment prices"
              intro="So you can set your patient's expectations before they arrive. Final costs follow assessment and are confirmed with the patient in writing."
            />
            <PriceTable items={referralPrices} caption="Specialist and surgical prices" />
          </div>
        </Container>
      </Section>

      {referralFaqs.length > 0 ? (
        <Section>
          <Container width="narrow">
            <SectionHeading eyebrow="FAQs" title="Referral questions" align="center" />
            <div className="mt-8">
              <FaqList faqs={referralFaqs} defaultOpenFirst />
            </div>
          </Container>
        </Section>
      ) : null}

      <section className="bg-brand-800 text-brand-50">
        <Container>
          <div className="flex flex-col items-start gap-8 py-14 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl text-white sm:text-3xl">Discuss a case</h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-100">
                Phone the practice to talk a case through before referring, or email the details
                and imaging.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
              <TrackedCta
                href={cta.call.href}
                event="phone_click"
                location="referrals-footer"
                variant="light"
                size="lg"
              >
                {site.phone}
              </TrackedCta>
              <EmailOff>
                <TrackedCta
                  href={`mailto:${site.email}?subject=Patient%20referral`}
                  event="contact_form"
                  location="referrals-footer"
                  variant="outline"
                  size="lg"
                  className="border-brand-300 text-white hover:bg-brand-700"
                >
                  {site.email}
                </TrackedCta>
              </EmailOff>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd data={[faqSchema(referralFaqs), breadcrumbSchema(trail)]} />
    </>
  );
}

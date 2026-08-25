import type { Metadata } from "next";
import Link from "next/link";
import { cta, site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { team } from "@/content/team";
import { homepageFaqs } from "@/content/faqs";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, practiceSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { FaqList } from "@/components/ui/Faq";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";
import {
  DirectionsList,
  PracticeDetailsCard,
  PracticeMap,
} from "@/components/sections/LocationBlock";
import { LocationView } from "./LocationView";
import { TrackedCta } from "@/components/analytics/TrackedCta";

/**
 * Location page (PRD s11).
 *
 * One practice, one location page. It exists as a distinct URL because local search
 * behaves differently from treatment search, and because the structure scales if the
 * practice ever opens a second site - /locations/[slug] is already the shape.
 */

const trail = crumbs({ name: "Lucan", path: "/locations/lucan" });

export const metadata: Metadata = buildMetadata({
  title: "Dentist in Lucan Village, Co. Dublin | LDIC",
  description:
    "Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin - opposite AIB Bank. Opening hours, directions, treatments and dentists. Phone (01) 628 1500.",
  path: "/locations/lucan",
});

const areas = [
  "Lucan",
  "Adamstown",
  "Palmerstown",
  "Clondalkin",
  "Newcastle",
  "Celbridge",
  "Leixlip",
  "Dublin 22",
  "Dublin West",
];

export default function LucanLocationPage() {
  return (
    <>
      <LocationView slug="lucan" />

      <PageHero
        eyebrow="Lucan, Co. Dublin"
        title="Your dentist in Lucan Village"
        intro={`${site.name} is in the centre of Lucan Village, ${site.address.landmark.toLowerCase()}. Open Monday to Friday, 9am to 5pm, with some Saturdays by appointment.`}
        trail={trail}
        actions={
          <>
            <TrackedCta href={cta.book.href} event="book_click" location="location-hero" size="lg">
              {cta.book.label}
            </TrackedCta>
            <TrackedCta
              href={cta.call.href}
              event="phone_click"
              location="location-hero"
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
          <SectionHeading
            eyebrow="Treatments here"
            title="What is available at the Lucan practice"
            intro="Everything from routine examinations to implant surgery is carried out at this practice, with imaging on site."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((treatment) => (
              <li key={treatment.slug}>
                <Link
                  href={`/treatments/${treatment.slug}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.95rem] font-medium text-ink-700 hover:border-brand-300 hover:text-brand-800"
                >
                  {treatment.name}
                  <span aria-hidden="true" className="text-brand-600">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionHeading eyebrow="The team here" title="Dentists at this practice" />
              <ul className="mt-6 space-y-3">
                {team.map((member) => (
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
            </div>

            <Card>
              <h2 className="text-lg">Areas we serve</h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
                Patients travel to the practice from across Dublin West and north Kildare.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {areas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-ink-100 px-3 py-1 text-sm text-ink-600"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="narrow">
          <SectionHeading eyebrow="FAQs" title="Visiting the practice" align="center" />
          <div className="mt-8">
            <FaqList faqs={homepageFaqs} defaultOpenFirst />
          </div>
        </Container>
      </Section>

      <BookingCta location="location-footer" />

      <JsonLd data={[practiceSchema(), faqSchema(homepageFaqs), breadcrumbSchema(trail)]} />
    </>
  );
}

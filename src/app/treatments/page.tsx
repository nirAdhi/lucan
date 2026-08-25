import type { Metadata } from "next";
import Link from "next/link";
import { otherServices, treatmentCategories, treatments } from "@/content/treatments";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { TreatmentCard } from "@/components/ui/Cards";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";
import { LinkButton } from "@/components/ui/Button";
import { cta } from "@/content/site";

const trail = crumbs({ name: "Treatments", path: "/treatments" });

export const metadata: Metadata = buildMetadata({
  title: "Dental Treatments in Lucan | LDIC",
  description:
    "Dental treatments at Lucan Dental & Implantology Centre: implants, Invisalign, whitening, veneers, crowns, root canal, dentures, wisdom teeth and emergency care. Prices published.",
  path: "/treatments",
});

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title="Dental treatments in Lucan"
        intro="Every treatment below has its own page setting out what it involves, how long it takes and what it costs. If you are not sure what you need, book an examination and your dentist will talk you through the options."
        trail={trail}
        actions={
          <>
            <LinkButton href={cta.book.href} size="lg">
              {cta.book.label}
            </LinkButton>
            <LinkButton href="/pricing" variant="outline" size="lg">
              See prices
            </LinkButton>
          </>
        }
      />

      {treatmentCategories.map((category) => {
        const inCategory = treatments.filter((treatment) => treatment.category === category);
        if (inCategory.length === 0) return null;

        return (
          <Section key={category} tone={category === "Implants" ? "tint" : "white"}>
            <Container width="wide">
              <SectionHeading eyebrow={category} title={categoryTitles[category]} />
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {inCategory.map((treatment) => (
                  <TreatmentCard key={treatment.slug} treatment={treatment} />
                ))}
              </ul>
            </Container>
          </Section>
        );
      })}

      {/* The wider service list. These do not have dedicated pages yet - PRD s12 asks for
          pages to follow real search demand rather than being generated wholesale. */}
      <Section tone="tint">
        <Container width="wide">
          <SectionHeading
            eyebrow="Also available"
            title="Other treatments at the practice"
            intro="Not everything needs its own page. Ask about any of the following when you book, or phone the practice."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((group) => (
              <div key={group.group}>
                <h3 className="font-semibold text-ink-900">{group.group}</h3>
                <ul className="mt-3 space-y-1.5 text-[0.95rem] text-ink-500">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[0.95rem] text-ink-500">
            Referring a patient?{" "}
            <Link href="/dentist-referrals" className="font-semibold text-brand-700 hover:underline">
              See how referrals work
            </Link>
            .
          </p>
        </Container>
      </Section>

      <BookingCta location="treatments-index" />

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

const categoryTitles: Record<string, string> = {
  Implants: "Implants and tooth replacement",
  Cosmetic: "Cosmetic dentistry",
  Orthodontics: "Straightening teeth",
  Restorative: "Repairing and restoring teeth",
  Surgery: "Oral surgery",
  Urgent: "Urgent and emergency care",
};

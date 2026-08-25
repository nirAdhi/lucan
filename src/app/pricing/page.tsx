import type { Metadata } from "next";
import Link from "next/link";
import { priceGroups, pricingDisclaimer, pricingLastUpdated } from "@/content/pricing";
import { faqGroups } from "@/content/faqs";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { PriceGroupTable } from "@/components/ui/PriceTable";
import { FaqList } from "@/components/ui/Faq";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";
import { LinkButton } from "@/components/ui/Button";
import { cta } from "@/content/site";

const trail = crumbs({ name: "Pricing", path: "/pricing" });

export const metadata: Metadata = buildMetadata({
  title: "Dental Prices in Lucan | Price List | LDIC",
  description:
    "Published dental prices at Lucan Dental & Implantology Centre, Lucan Village: exams from €60, implants from €950, crowns from €550, whitening from €250, PRSI exams free.",
  path: "/pricing",
});

const costFaqs = faqGroups.find((group) => group.slug === "costs-and-prsi")?.faqs ?? [];

const formattedDate = new Date(pricingLastUpdated).toLocaleDateString("en-IE", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Dental prices in Lucan"
        intro="The full price list, published in the open. Prices are a guide - a written treatment plan with the final cost follows your examination, because what is needed differs from patient to patient."
        trail={trail}
        actions={
          <>
            <LinkButton href={cta.book.href} size="lg">
              {cta.book.label}
            </LinkButton>
            <LinkButton href="/treatments" variant="outline" size="lg">
              Browse treatments
            </LinkButton>
          </>
        }
      />

      <Section>
        <Container width="wide">
          {/* Jump links: the list is long, and on a phone nobody scrolls through eleven tables. */}
          <nav aria-label="Price list sections" className="rounded-[var(--radius-card)] bg-ink-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
              Jump to
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {priceGroups.map((group) => (
                <li key={group.slug}>
                  <a
                    href={`#${group.slug}`}
                    className="inline-block rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-600 hover:border-brand-300 hover:text-brand-700"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-6 text-sm text-ink-400">
            Price list last reviewed {formattedDate}. {pricingDisclaimer}
          </p>

          <div className="mt-8 space-y-10">
            {priceGroups.map((group) => (
              <PriceGroupTable key={group.slug} group={group} />
            ))}
          </div>

          <p className="mt-10 text-[0.95rem] text-ink-500">
            Looking for detail on a particular treatment?{" "}
            <Link href="/treatments" className="font-semibold text-brand-700 hover:underline">
              Every treatment page
            </Link>{" "}
            sets out the process, timescale and what the price includes.
          </p>
        </Container>
      </Section>

      {costFaqs.length > 0 ? (
        <Section tone="tint" id="costs-and-prsi">
          <Container width="narrow">
            <SectionHeading eyebrow="FAQs" title="Costs, PRSI and payment" align="center" />
            <div className="mt-8">
              <FaqList faqs={costFaqs} defaultOpenFirst />
            </div>
          </Container>
        </Section>
      ) : null}

      <BookingCta
        title="Book an examination"
        body="An examination is where a written plan and a final price come from. Request an appointment online or phone the practice."
        location="pricing-footer"
      />

      <JsonLd data={[faqSchema(costFaqs), breadcrumbSchema(trail)]} />
    </>
  );
}

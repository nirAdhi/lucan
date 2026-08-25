import type { Metadata } from "next";
import { allFaqs, faqGroups } from "@/content/faqs";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { Container, JsonLd, Section } from "@/components/ui/Layout";
import { FaqList } from "@/components/ui/Faq";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";

const trail = crumbs({ name: "FAQs", path: "/faqs" });

export const metadata: Metadata = buildMetadata({
  title: "Dental FAQs | Lucan Dental & Implantology Centre",
  description:
    "Answers to common questions about appointments, costs, PRSI, nervous patients and referrals at Lucan Dental & Implantology Centre, Lucan Village, Co. Dublin.",
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Questions patients ask"
        intro="Appointments, costs, PRSI, nervous patients and referrals. Treatment-specific questions are answered on each treatment page."
        trail={trail}
      />

      <Section>
        <Container width="narrow">
          <nav aria-label="FAQ sections" className="flex flex-wrap gap-2">
            {faqGroups.map((group) => (
              <a
                key={group.slug}
                href={`#${group.slug}`}
                className="inline-block rounded-full border border-ink-200 px-3.5 py-1.5 text-sm font-medium text-ink-600 hover:border-brand-300 hover:text-brand-700"
              >
                {group.title}
              </a>
            ))}
          </nav>

          <div className="mt-10 space-y-12">
            {faqGroups.map((group) => (
              <div key={group.slug} id={group.slug} className="scroll-mt-28">
                <h2 className="text-2xl">{group.title}</h2>
                <div className="mt-5">
                  <FaqList faqs={group.faqs} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <BookingCta location="faqs-footer" />

      <JsonLd data={[faqSchema(allFaqs), breadcrumbSchema(trail)]} />
    </>
  );
}

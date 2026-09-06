import type { Metadata } from "next";
import { getTeam } from "@/content/team";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { TeamCard } from "@/components/team/TeamCard";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";
import { LinkButton } from "@/components/ui/Button";
import { cta } from "@/content/site";

const trail = crumbs({ name: "Our Team", path: "/our-team" });

export const metadata: Metadata = buildMetadata({
  title: "Our Dentists in Lucan | Meet the Team | LDIC",
  description:
    "Meet the dentists at Lucan Dental & Implantology Centre: a periodontist, an oral surgeon and general and cosmetic dentists, in Lucan Village, Co. Dublin.",
  path: "/our-team",
});

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The dentists who will treat you"
        intro="A small team with postgraduate training in the areas the practice is known for: implants, periodontology and oral surgery, alongside general and cosmetic dentistry."
        trail={trail}
        actions={
          <LinkButton href={cta.book.href} size="lg">
            {cta.book.label}
          </LinkButton>
        }
      />

      <Section>
        <Container width="wide">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="wide">
          <SectionHeading
            eyebrow="Working together"
            title="Why a mixed team matters"
            intro="Implant and gum cases are handled by clinicians whose postgraduate training is in exactly that, while routine care, cosmetic work and children's dentistry sit with the general dentists. Complex cases are planned together, in the same practice, using the same imaging."
          />
        </Container>
      </Section>

      <BookingCta location="team-footer" />

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

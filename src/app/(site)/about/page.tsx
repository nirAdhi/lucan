import type { Metadata } from "next";
import Link from "next/link";
import { cta, site, whyChoose } from "@/content/site";
import { getTeam } from "@/content/team";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { TeamCard } from "@/components/team/TeamCard";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";
import { PracticeMap } from "@/components/sections/LocationBlock";
import { LinkButton } from "@/components/ui/Button";

const trail = crumbs({ name: "About", path: "/about" });

export const metadata: Metadata = buildMetadata({
  title: "About the Practice | Lucan Dental & Implantology Centre",
  description:
    "About Lucan Dental & Implantology Centre in Lucan Village, Co. Dublin: an implantology-focused practice with on-site CT imaging, sedation and a specialist-led team.",
  path: "/about",
});

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <PageHero
        eyebrow="About"
        title="An implantology practice in Lucan Village"
        intro="Lucan Dental & Implantology Centre provides everyday dental care for adults and children, alongside the implant, periodontal and surgical treatment the practice is named for."
        trail={trail}
        actions={
          <>
            <LinkButton href={cta.book.href} size="lg">
              {cta.book.label}
            </LinkButton>
            <LinkButton href="/our-team" variant="outline" size="lg">
              Meet the team
            </LinkButton>
          </>
        }
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="prose-ldic text-[1.05rem] text-ink-600">
              <h2>How the practice works</h2>
              <p>
                Two things shape how treatment is delivered here. The first is that the clinical
                team spans general dentistry and specialist-level training: a periodontist, an
                oral surgeon and two general and cosmetic dentists, in one practice. Routine care
                and complex implant cases are planned in the same building, using the same
                records.
              </p>
              <p>
                The second is that diagnostics are on site. Digital X-rays, OPG imaging and CT
                scanning mean an implant case can be assessed and planned without sending you
                elsewhere, and an emergency can be diagnosed on the day.
              </p>
              <h2>How treatment is agreed</h2>
              <p>
                Your dentist takes time to listen to your concerns, explains the options, and
                provides a clear written treatment plan. Prices are published in full, and the
                cost of your plan is confirmed before treatment begins.
              </p>
              <h2>Care for anxious patients</h2>
              <p>
                The practice has invested in a calm environment - gentle scents, soothing
                background sound and a welcoming atmosphere - and sedation dentistry is available
                for patients who need it. If dental visits are difficult for you, say so when you
                book so enough time is allowed.
              </p>
              <h2>Where we are</h2>
              <p>
                The practice is in Lucan Village, {site.address.landmark.toLowerCase()},
                convenient for Lucan, Adamstown, Palmerstown, Clondalkin, Newcastle, Celbridge
                and Dublin West.{" "}
                <Link href="/locations/lucan">Practice details, hours and directions</Link>.
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <h2 className="text-lg">At a glance</h2>
                <dl className="mt-4 space-y-3 text-[0.95rem]">
                  <div>
                    <dt className="text-ink-400">Practice</dt>
                    <dd className="font-medium text-ink-800">{site.name}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-400">Location</dt>
                    <dd className="font-medium text-ink-800">
                      {site.address.street}, {site.address.locality}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-400">Clinical team</dt>
                    <dd className="font-medium text-ink-800">{team.length} dentists</dd>
                  </div>
                  <div>
                    <dt className="text-ink-400">Hours</dt>
                    <dd className="font-medium text-ink-800">
                      Mon&ndash;Fri 9am&ndash;5pm. {site.hoursNote}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-400">Referrals</dt>
                    <dd className="font-medium text-ink-800">
                      <Link href="/dentist-referrals" className="text-brand-700 hover:underline">
                        Accepted from other dentists
                      </Link>
                    </dd>
                  </div>
                </dl>
              </Card>
              <PracticeMap />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container width="wide">
          <SectionHeading eyebrow="Why LDIC" title="What patients tell us matters" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((reason) => (
              <li key={reason.title} className="border-t border-ink-200 pt-5">
                <h3 className="font-semibold text-ink-900">{reason.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">{reason.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <SectionHeading eyebrow="Our team" title="The dentists" />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </ul>
        </Container>
      </Section>

      <BookingCta location="about-footer" />

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

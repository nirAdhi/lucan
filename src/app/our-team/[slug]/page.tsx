import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamMember, team } from "@/content/team";
import { getTreatments } from "@/content/treatments";
import { cta } from "@/content/site";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { Avatar } from "@/components/ui/Cards";
import { PageHero } from "@/components/sections/Hero";
import { BookingCta } from "@/components/sections/BookingCta";
import { TrackedCta } from "@/components/analytics/TrackedCta";

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    return buildMetadata({
      title: "Team member not found | LDIC",
      description: "This profile could not be found.",
      path: `/our-team/${slug}`,
      index: false,
    });
  }

  return buildMetadata({
    title: member.seo.title,
    description: member.seo.description,
    path: `/our-team/${member.slug}`,
    ogType: "profile",
  });
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const trail = crumbs(
    { name: "Our Team", path: "/our-team" },
    { name: member.name, path: `/our-team/${member.slug}` },
  );

  const treats = getTreatments(member.treatments);
  const colleagues = team.filter((other) => other.slug !== member.slug);

  return (
    <>
      <PageHero
        eyebrow={member.role}
        title={member.name}
        intro={member.summary}
        trail={trail}
        actions={
          <TrackedCta href={cta.book.href} event="book_click" location="team-profile" size="lg">
            Book with {member.name.split(" ").slice(0, 2).join(" ")}
          </TrackedCta>
        }
        aside={
          <Card className="flex items-center gap-5">
            <Avatar member={member} size="lg" />
            <div>
              <p className="font-semibold text-ink-900">{member.name}</p>
              <p className="text-sm text-brand-700">{member.role}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink-400">
                {member.qualifications}
              </p>
            </div>
          </Card>
        }
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-2xl">About {member.name}</h2>
              <div className="mt-4 space-y-4 text-[1.05rem] leading-relaxed text-ink-600">
                {member.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              {treats.length > 0 ? (
                <>
                  <h2 className="mt-12 text-2xl">Treatments</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {treats.map((treatment) => (
                      <li key={treatment.slug}>
                        <Link
                          href={`/treatments/${treatment.slug}`}
                          className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 px-4 py-3 text-[0.95rem] font-medium text-ink-700 hover:border-brand-300 hover:bg-brand-50"
                        >
                          {treatment.name}
                          <span aria-hidden="true" className="text-brand-600">
                            &rarr;
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>

            <div className="space-y-6">
              <Card>
                <h3 className="text-lg">Areas of focus</h3>
                <ul className="mt-3 space-y-2 text-[0.95rem] text-ink-600">
                  {member.specialities.map((speciality) => (
                    <li key={speciality} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                      />
                      <span>{speciality}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {member.languages && member.languages.length > 0 ? (
                <Card>
                  <h3 className="text-lg">Languages</h3>
                  <p className="mt-2 text-[0.95rem] text-ink-600">
                    {member.languages.join(", ")}
                  </p>
                </Card>
              ) : null}

              <Card>
                <h3 className="text-lg">Qualifications</h3>
                <p className="mt-2 text-[0.95rem] text-ink-600">{member.qualifications}</p>
                {member.registration ? (
                  <p className="mt-2 text-sm text-ink-400">
                    Dental Council of Ireland registration: {member.registration}
                  </p>
                ) : null}
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {colleagues.length > 0 ? (
        <Section tone="tint">
          <Container width="wide">
            <SectionHeading eyebrow="The team" title="Also at the practice" />
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {colleagues.map((colleague) => (
                <Card as="li" key={colleague.slug} className="flex items-center gap-4">
                  <Avatar member={colleague} />
                  <div>
                    <p className="font-semibold">
                      <Link href={`/our-team/${colleague.slug}`} className="hover:text-brand-700">
                        {colleague.name}
                      </Link>
                    </p>
                    <p className="text-sm text-brand-700">{colleague.role}</p>
                  </div>
                </Card>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <BookingCta title={`Book an appointment`} location="team-profile-footer" />

      <JsonLd data={[personSchema(member), breadcrumbSchema(trail)]} />
    </>
  );
}

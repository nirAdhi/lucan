import type { Metadata } from "next";
import Link from "next/link";
import { cta, site, whyChoose } from "@/content/site";
import { featuredTreatments, treatments } from "@/content/treatments";
import { getTeam } from "@/content/team";
import { getPrices } from "@/content/pricing";
import { homepageFaqs } from "@/content/faqs";
import { patientStories } from "@/content/stories";
import { publishedPosts } from "@/content/posts";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/schema";
import { Card, Container, JsonLd, Section, SectionHeading } from "@/components/ui/Layout";
import { LinkButton } from "@/components/ui/Button";
import { TreatmentCard, TeamCard } from "@/components/ui/Cards";
import { FaqList } from "@/components/ui/Faq";
import { PriceTable } from "@/components/ui/PriceTable";
import { TrackedCta } from "@/components/analytics/TrackedCta";
import { Accent } from "@/components/ui/Accent";
import { GoogleRating } from "@/components/sections/GoogleRating";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { CaseStudiesGallery } from "@/components/sections/CaseStudiesGallery";
import { BookingCta } from "@/components/sections/BookingCta";
import { PracticeDetailsCard, PracticeMap } from "@/components/sections/LocationBlock";

export const metadata: Metadata = buildMetadata({
  title: "Dentist in Lucan, Co. Dublin | Lucan Dental & Implantology Centre",
  description:
    "Dental care and implantology in Lucan Village, Co. Dublin. General, cosmetic and implant dentistry, emergency appointments and published prices. Book online or call (01) 628 1500.",
  path: "/",
});

const trustPoints = [
  { label: "Implantology", detail: "A practice built around implant and periodontal care" },
  { label: "On site", detail: "Digital X-rays, OPG and CT imaging" },
  { label: "Mon–Fri", detail: "9am to 5pm, some Saturdays by appointment" },
  { label: "PRSI", detail: "Exams and scale & polish, subject to eligibility" },
];

const quickLinks = [
  {
    eyebrow: "Pricing",
    title: "Transparent fees",
    body: "The full price list is published on the site, so there are no phone-call quotes.",
    href: "/pricing",
    cta: "See prices",
  },
  {
    eyebrow: "PRSI",
    title: "Dental benefits",
    body: "PRSI examinations and scale-and-polish are offered, subject to eligibility.",
    href: "/faqs#costs-and-prsi",
    cta: "PRSI and payment",
  },
  {
    eyebrow: "Referrals",
    title: "For other dentists",
    body: "Refer a patient for implant, periodontal or oral surgery treatment.",
    href: "/dentist-referrals",
    cta: "Refer a patient",
  },
  {
    eyebrow: "FAQs",
    title: "Common questions",
    body: "Answers on costs, first visits, anxiety and what to expect.",
    href: "/faqs",
    cta: "Read the FAQs",
  },
];

export default async function HomePage() {
  const team = await getTeam();
  const headlinePrices = await getPrices([
    "exam-existing",
    "exam-and-clean",
    "implant",
    "clear-aligners",
    "whitening-surgery",
    "emergency-appointment",
  ]);

  return (
    <>
      {/* Hero (PRD s6, s7): who, where, what, and the primary action, above the fold. */}
      <div className="border-b border-ink-100 bg-gradient-to-b from-brand-50 via-brand-50/40 to-white">
        <Container width="wide">
          <div className="grid items-center gap-12 py-14 lg:grid-cols-[1.15fr_1fr] lg:py-20">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                Lucan Village, Co. Dublin
              </p>
              <h1 className="text-3xl leading-[1.15] sm:text-4xl lg:text-[3.25rem]">
                Dentistry and implantology in the <Accent>heart</Accent> of Lucan
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
                General, cosmetic and implant dentistry for adults and children, from a team
                that includes a periodontist and an oral surgeon. Treatment is explained,
                planned and priced in writing before it starts.
              </p>

              <div className="mt-5">
                <GoogleRating />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedCta href={cta.book.href} event="book_click" location="home-hero" variant="gold" size="lg">
                  {cta.book.label}
                </TrackedCta>
                <LinkButton href={cta.emergency.href} variant="urgent" size="lg">
                  {cta.emergency.label}
                </LinkButton>
              </div>

              <p className="mt-6 text-sm text-ink-500">
                Prefer to talk to someone?{" "}
                <TrackedCta
                  href={cta.call.href}
                  event="phone_click"
                  location="home-hero"
                  variant="ghost"
                  size="sm"
                  className="px-1 underline"
                >
                  {site.phone}
                </TrackedCta>
              </p>
            </div>

            <Card className="lg:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                New patients welcome
              </p>
              <h2 className="mt-3 text-xl">What a first visit involves</h2>
              <ol className="mt-4 space-y-3 text-[0.95rem] text-ink-600">
                <li className="flex gap-3">
                  <Step n={1} />
                  <span>Your dentist listens to your concerns and examines your teeth and gums.</span>
                </li>
                <li className="flex gap-3">
                  <Step n={2} />
                  <span>X-rays or scans are taken only where they are needed.</span>
                </li>
                <li className="flex gap-3">
                  <Step n={3} />
                  <span>You leave with the options explained and a written treatment plan.</span>
                </li>
              </ol>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-5">
                <p className="text-sm text-ink-500">
                  Exam from <span className="font-semibold text-brand-800">€60</span>
                  <span className="mx-1.5 text-ink-300">|</span>
                  PRSI exam free, subject to eligibility
                </p>
                <Link href="/new-patients" className="text-sm font-semibold text-brand-700 hover:underline">
                  New patient guide &rarr;
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </div>

      {/* Trust strip - factual practice attributes only. Review markup waits for real reviews. */}
      <div className="bg-sand-100">
        <Container width="wide">
          <ul className="grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <li
                key={point.label}
                className="rounded-[var(--radius-card)] bg-white p-5 shadow-[var(--shadow-soft)]"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-700">
                  {point.label}
                </span>
                <span className="mt-1.5 block text-[0.95rem] leading-snug text-ink-600">
                  {point.detail}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Key treatments (PRD s7) - each links to its own landing page (PRD s8). */}
      <Section tone="tint">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Treatments"
              title="What we treat"
              intro="Each treatment has its own page with the process, the timescale and the price."
            />
            <Link
              href="/treatments"
              className="text-sm font-semibold text-brand-700 hover:underline"
            >
              All {treatments.length} treatments &rarr;
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {featuredTreatments.map((treatment) => (
              <TreatmentCard key={treatment.slug} treatment={treatment} />
            ))}
          </ul>
        </Container>
      </Section>

      {/* Why choose LDIC (PRD s6). */}
      <Section>
        <Container width="wide">
          <SectionHeading
            eyebrow="Why LDIC"
            title="Why patients choose the practice"
            intro="Implantology is the practice's focus, alongside everyday general and cosmetic dentistry."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((reason) => (
              <li
                key={reason.title}
                className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 shadow-[var(--shadow-soft)]"
              >
                <h3 className="font-semibold text-ink-900">{reason.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">{reason.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* About teaser - short intro + link through, same line PageHero uses on /about. */}
      <Section tone="tint">
        <Container width="narrow" className="text-center">
          <SectionHeading
            eyebrow="About the practice"
            title="An implantology practice in Lucan Village"
            intro="Lucan Dental & Implantology Centre provides everyday dental care for adults and children, alongside the implant, periodontal and surgical treatment the practice is named for."
            align="center"
          />
          <Link
            href="/about"
            className="mt-6 inline-block text-sm font-semibold text-brand-700 hover:underline"
          >
            More about the practice &rarr;
          </Link>
        </Container>
      </Section>

      {/* Team (PRD s7, s46). */}
      <Section>
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our team"
              title="The dentists who will treat you"
              intro="A periodontist, an oral surgeon and two general and cosmetic dentists."
            />
            <Link href="/our-team" className="text-sm font-semibold text-brand-700 hover:underline">
              Meet the team &rarr;
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {team.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </ul>
        </Container>
      </Section>

      {/* Real Google review quotes - renders nothing until content/site.ts's
          googlePlaceId + GOOGLE_PLACES_API_KEY are set (see lib/googleRating.ts). */}
      <GoogleReviews />

      {/* Before/after gallery - admin-managed at /admin/case-studies, renders nothing
          until at least one consented case study exists. */}
      <CaseStudiesGallery />

      {/* Patient stories (PRD s43) - rendered only when consented stories exist. */}
      {patientStories.length > 0 ? (
        <Section>
          <Container width="wide">
            <SectionHeading eyebrow="Patient stories" title="Treatment at the practice" />
            <ul className="mt-10 grid gap-5 lg:grid-cols-3">
              {patientStories.slice(0, 3).map((story) => (
                <Card as="li" key={story.slug}>
                  <h3 className="font-semibold">{story.headline}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">{story.result}</p>
                  <Link
                    href={`/patient-stories#${story.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
                  >
                    Read the story &rarr;
                  </Link>
                </Card>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* Pricing (PRD s7, s44). */}
      <Section>
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Pricing"
                title="Prices published, plans in writing"
                intro="The full price list is on the site, so you can see what treatment costs before you come in. A written plan with the final cost follows your examination."
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <LinkButton href="/pricing" variant="outline">
                  See the full price list
                </LinkButton>
                <LinkButton href="/faqs#costs-and-prsi" variant="ghost">
                  PRSI and payment
                </LinkButton>
              </div>
            </div>
            <PriceTable items={headlinePrices} caption="A few common treatments" />
          </div>
        </Container>
      </Section>

      {/* Quick links - the practical questions a new patient has before booking. */}
      <Section tone="tint">
        <Container width="wide">
          <SectionHeading
            eyebrow="Before you book"
            title="Making your visit simple"
            intro="Fees, PRSI cover, referrals and common questions, answered up front."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <Card as="li" key={link.href}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
                  {link.eyebrow}
                </p>
                <h3 className="mt-2 font-semibold text-ink-900">{link.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">{link.body}</p>
                <Link
                  href={link.href}
                  className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
                >
                  {link.cta} &rarr;
                </Link>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Location (PRD s11). */}
      <Section tone="tint" id="location">
        <Container width="wide">
          <SectionHeading
            eyebrow="Find us"
            title="In Lucan Village, opposite AIB Bank"
            intro="Convenient for Lucan, Adamstown, Palmerstown, Clondalkin and Dublin West."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <PracticeDetailsCard />
            <PracticeMap />
          </div>
        </Container>
      </Section>

      {/* FAQs (PRD s7) with matching FAQPage markup. */}
      <Section>
        <Container width="narrow">
          <SectionHeading eyebrow="FAQs" title="Common questions" align="center" />
          <div className="mt-10">
            <FaqList faqs={homepageFaqs} defaultOpenFirst />
          </div>
          <p className="mt-6 text-center text-sm text-ink-500">
            More questions?{" "}
            <Link href="/faqs" className="font-semibold text-brand-700 hover:underline">
              Read the full FAQs
            </Link>
          </p>
        </Container>
      </Section>

      {publishedPosts.length > 0 ? (
        <Section tone="tint">
          <Container width="wide">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Blog" title="From the practice" />
              <Link href="/blog" className="text-sm font-semibold text-brand-700 hover:underline">
                All articles &rarr;
              </Link>
            </div>
            <ul className="mt-10 grid gap-5 lg:grid-cols-3">
              {publishedPosts.slice(0, 3).map((post) => (
                <Card as="li" key={post.slug}>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">
                    {post.category}
                  </p>
                  <h3 className="mt-2 font-semibold">
                    <Link href={`/blog/${post.slug}`} className="hover:text-brand-700">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">{post.excerpt}</p>
                </Card>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <BookingCta location="home-footer" />

      <JsonLd data={faqSchema(homepageFaqs)} />
    </>
  );
}

function Step({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800"
    >
      {n}
    </span>
  );
}

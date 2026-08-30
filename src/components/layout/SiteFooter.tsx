import Link from "next/link";
import { cta, site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { Container } from "@/components/ui/Layout";
import { TrackedCta, TrackedLink } from "@/components/analytics/TrackedCta";
import { GoogleRating } from "@/components/sections/GoogleRating";

const quickLinks = [
  { label: "New patients", href: "/new-patients" },
  { label: "Our team", href: "/our-team" },
  { label: "Pricing", href: "/pricing" },
  { label: "Patient stories", href: "/patient-stories" },
  { label: "FAQs", href: "/faqs" },
  { label: "Dentist referrals", href: "/dentist-referrals" },
  { label: "Blog", href: "/blog" },
  { label: "About the practice", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-700 bg-brand-900 text-brand-100">
      <Container width="wide">
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-semibold text-white">{site.name}</p>
            <div className="mt-2">
              <GoogleRating inverted />
            </div>
            <address className="mt-4 not-italic leading-relaxed text-brand-200">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region}
              {site.address.postalCode ? (
                <>
                  <br />
                  {site.address.postalCode}
                </>
              ) : null}
              <br />
              <span className="text-brand-300">{site.address.landmark}</span>
            </address>
            <p className="mt-4 space-y-1">
              <TrackedLink
                href={cta.call.href}
                event="phone_click"
                location="footer"
                className="block font-semibold text-white hover:underline"
              >
                {site.phone}
              </TrackedLink>
              <a href={`mailto:${site.email}`} className="block hover:underline">
                {site.email}
              </a>
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-300">
              Treatments
            </p>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              {treatments.map((treatment) => (
                <li key={treatment.slug}>
                  <Link href={`/treatments/${treatment.slug}`} className="hover:text-white hover:underline">
                    {treatment.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-300">
              Practice
            </p>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-300">
              Opening hours
            </p>
            <dl className="mt-4 space-y-1.5 text-[0.95rem]">
              <div className="flex justify-between gap-4">
                <dt>Monday &ndash; Friday</dt>
                <dd className="text-white">9am &ndash; 5pm</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Saturday</dt>
                <dd className="text-brand-200">By appointment</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sunday</dt>
                <dd className="text-brand-200">Closed</dd>
              </div>
            </dl>

            <div className="mt-6 grid gap-2">
              <TrackedCta
                href={cta.book.href}
                event="book_click"
                location="footer"
                variant="gold"
                size="md"
              >
                {cta.book.label}
              </TrackedCta>
              <Link
                href={cta.emergency.href}
                className="rounded-full border border-brand-600 px-5 py-2.5 text-center text-[0.95rem] font-semibold text-white hover:bg-brand-800"
              >
                Dental emergency?
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-800 py-6 text-sm text-brand-300">
          <p className="mb-3">
            Serving Lucan, Adamstown, Palmerstown, Clondalkin, Newcastle, Celbridge and Dublin West.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>
              &copy; {year} {site.name}. All rights reserved.
            </p>
            <p className="flex gap-4">
              <Link href="/privacy" className="hover:text-white hover:underline">
                Privacy &amp; cookies
              </Link>
              <Link href="/contact" className="hover:text-white hover:underline">
                Contact
              </Link>
            </p>
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-brand-400">
            Information on this website is general and does not replace a dental examination.
            Prices are a guide; a written treatment plan is provided after assessment.
          </p>
        </div>
      </Container>
    </footer>
  );
}

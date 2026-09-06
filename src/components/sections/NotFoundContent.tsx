import Link from "next/link";
import { cta, site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { Container } from "@/components/ui/Layout";
import { LinkButton } from "@/components/ui/Button";

/**
 * 404 body, shared by the two not-found entry points (PRD s24).
 *
 * A missing page is a lost patient, so this routes people onward rather than
 * apologising. Every 404 in Search Console should end up as a rule in
 * content/redirects.ts - this is the safety net, not the plan.
 */
export function NotFoundContent() {
  return (
    <Container width="narrow">
      <div className="py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
          Page not found
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl">We could not find that page</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-500">
          The page may have moved when the site was rebuilt. Try one of these, or phone the
          practice on{" "}
          <a href={cta.call.href} className="font-semibold text-brand-700 underline">
            {site.phone}
          </a>
          .
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/" size="lg">
            Home
          </LinkButton>
          <LinkButton href="/treatments" variant="outline" size="lg">
            All treatments
          </LinkButton>
          <LinkButton href={cta.book.href} variant="ghost" size="lg">
            Book an appointment
          </LinkButton>
        </div>

        <div className="mt-14 text-left">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink-400">
            Popular pages
          </h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {[
              { label: "Pricing", href: "/pricing" },
              { label: "New patients", href: "/new-patients" },
              { label: "Emergency dentist", href: "/emergency-dentist-lucan" },
              { label: "Our team", href: "/our-team" },
              { label: "Contact and directions", href: "/contact" },
              { label: "FAQs", href: "/faqs" },
              ...treatments.slice(0, 4).map((treatment) => ({
                label: treatment.name,
                href: `/treatments/${treatment.slug}`,
              })),
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between gap-3 rounded-xl border border-ink-200 px-4 py-3 text-[0.95rem] font-medium text-ink-700 hover:border-brand-300 hover:text-brand-800"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-brand-600">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}

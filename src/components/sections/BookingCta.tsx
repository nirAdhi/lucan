import { cta, site } from "@/content/site";
import { Container } from "@/components/ui/Layout";
import { TrackedCta } from "@/components/analytics/TrackedCta";

/**
 * Closing conversion band (PRD s7, s9).
 *
 * Appears at the foot of every content page: the visitor should never have to scroll back
 * up to find the booking action. `location` distinguishes the click in GA4 so the funnel
 * can show which page produced the booking.
 */
export function BookingCta({
  title = "Ready to book an appointment?",
  body = "Request an appointment online at any time and the practice will confirm it with you, or phone during opening hours.",
  location,
  treatment,
  reason,
}: {
  title?: string;
  body?: string;
  location: string;
  treatment?: string;
  /** Pre-selects the appointment reason on the booking form. */
  reason?: string;
}) {
  const bookHref = reason
    ? `${cta.book.href}?reason=${encodeURIComponent(reason)}`
    : cta.book.href;

  return (
    <section className="bg-brand-800 text-brand-50">
      <Container>
        <div className="flex flex-col items-start gap-8 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl text-white sm:text-3xl">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-100">{body}</p>
            <p className="mt-4 text-sm text-brand-200">
              {site.address.street}, {site.address.locality} &middot; Mon&ndash;Fri 9am&ndash;5pm
              &middot; {site.hoursNote}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
            <TrackedCta
              href={bookHref}
              event="book_click"
              location={location}
              treatment={treatment}
              variant="light"
              size="lg"
            >
              {cta.book.label}
            </TrackedCta>
            <TrackedCta
              href={cta.call.href}
              event="phone_click"
              location={location}
              variant="outline"
              size="lg"
              className="border-brand-300 text-white hover:bg-brand-700"
            >
              {site.phone}
            </TrackedCta>
          </div>
        </div>
      </Container>
    </section>
  );
}

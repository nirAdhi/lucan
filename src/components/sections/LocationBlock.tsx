import { cta, site } from "@/content/site";
import { Card } from "@/components/ui/Layout";
import { TrackedCta, TrackedLink } from "@/components/analytics/TrackedCta";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { EmailOff } from "@/components/ui/EmailOff";

/** Practice details card: NAP, hours and the two actions (PRD s11, s47). */
export function PracticeDetailsCard() {
  return (
    <Card className="lg:p-7">
      <h2 className="text-xl font-semibold">Lucan Dental &amp; Implantology Centre</h2>

      <dl className="mt-5 space-y-4 text-[0.95rem]">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
            Address
          </dt>
          <dd className="mt-1 text-ink-700">
            <address className="not-italic leading-relaxed">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region}
              {site.address.postalCode ? (
                <>
                  <br />
                  {site.address.postalCode}
                </>
              ) : null}
            </address>
            <span className="mt-1 block text-sm text-ink-400">{site.address.landmark}</span>
          </dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Phone</dt>
          <dd className="mt-1">
            <TrackedLink
              href={cta.call.href}
              event="phone_click"
              location="practice-details"
              className="font-semibold text-brand-700 hover:underline"
            >
              {site.phone}
            </TrackedLink>
          </dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Email</dt>
          <dd className="mt-1">
            <EmailOff>
              <a href={`mailto:${site.email}`} className="text-brand-700 hover:underline">
                {site.email}
              </a>
            </EmailOff>
          </dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
            Opening hours
          </dt>
          <dd className="mt-1.5 space-y-1 text-ink-700">
            {site.hours.map((slot) => (
              <p key={slot.label} className="flex justify-between gap-6">
                <span>{slot.label}</span>
                <span className="tabular-nums">
                  {slot.opens} &ndash; {slot.closes}
                </span>
              </p>
            ))}
            <p className="flex justify-between gap-6 text-ink-500">
              <span>Saturday</span>
              <span>By appointment</span>
            </p>
            <p className="flex justify-between gap-6 text-ink-500">
              <span>Sunday</span>
              <span>Closed</span>
            </p>
          </dd>
        </div>
      </dl>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <TrackedCta href={cta.book.href} event="book_click" location="practice-details">
          {cta.book.label}
        </TrackedCta>
        <TrackedCta
          href={cta.call.href}
          event="phone_click"
          location="practice-details"
          variant="outline"
        >
          Call the practice
        </TrackedCta>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-400">{site.cancellationNote}</p>
    </Card>
  );
}

/**
 * Google Maps embed, behind a click.
 *
 * The iframe used to load with the page, which set ten Google cookies on every visitor
 * before they had agreed to anything. For an Irish practice under GDPR that is a consent
 * problem, not just a Lighthouse line item - and the site already gates GA4 behind consent,
 * so loading Maps unconditionally was inconsistent with its own rules.
 *
 * Nothing third-party is requested until the visitor asks for the map. The address and a
 * directions link are there without it, so the section is still useful if they never do.
 */
export function PracticeMap({ className }: { className?: string }) {
  return (
    <div
      className={[
        "overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-ink-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <MapEmbed />
    </div>
  );
}

export function DirectionsList() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <div>
        <h3 className="font-semibold text-ink-900">Finding us</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
          The practice is in Lucan Village, {site.address.landmark.toLowerCase()}.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-ink-900">Parking</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
          {/* TODO(verify): confirm parking arrangements with the practice before launch. */}
          Village parking is available nearby. Phone the practice if you need to check
          arrangements before your visit.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-ink-900">Public transport</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-500">
          {/* TODO(verify): confirm the bus routes the practice wants listed. */}
          Lucan Village is served by Dublin Bus routes into the city centre and Dublin West.
        </p>
      </div>
    </div>
  );
}

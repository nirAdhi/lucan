import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { buildMetadata, crumbs } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { Container, JsonLd, Section } from "@/components/ui/Layout";
import { PageHero } from "@/components/sections/Hero";
import { EmailOff } from "@/components/ui/EmailOff";

/**
 * Privacy and cookie notice (PRD s72).
 *
 * DRAFT. This describes accurately what the Phase 1 website does with data - the booking
 * form, consent-gated GA4 and session-scoped attribution - and nothing more. It is NOT a
 * complete healthcare privacy notice: patient records, retention periods, processors and
 * the practice's lawful bases must be documented by the practice and reviewed by its data
 * protection adviser before launch. The banner below stays until that review happens.
 */

const trail = crumbs({ name: "Privacy & Cookies", path: "/privacy" });

export const metadata: Metadata = buildMetadata({
  title: "Privacy & Cookies | Lucan Dental & Implantology Centre",
  description:
    "How Lucan Dental & Implantology Centre handles information submitted through this website, and the cookies the site uses.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy and cookies"
        intro="How information submitted through this website is handled."
        trail={trail}
      />

      <Section>
        <Container width="narrow">
          <div className="rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-5 text-sm leading-relaxed text-ink-700">
            <strong className="text-ink-900">Draft for practice review.</strong> This notice
            describes what the website itself does with information. It must be reviewed and
            completed by the practice - including retention periods, processors and how patient
            clinical records are handled - before the site goes live.
          </div>

          <div className="prose-ldic mt-8 text-ink-600">
            <h2>Who is responsible</h2>
            <p>
              {site.name}, {site.address.street}, {site.address.locality}, {site.address.region},
              is the data controller for information submitted through this website. You can
              contact the practice on{" "}
              <a href={`tel:${site.phoneE164}`}>{site.phone}</a> or at{" "}
              <EmailOff>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </EmailOff>
              .
            </p>

            <h2>Appointment requests and enquiries</h2>
            <p>
              When you submit an appointment request, the practice receives the details you
              provide: your name, phone number, email address if you give one, the type of
              appointment, any treatment or dentist preference, your preferred date and time, and
              anything you write in the message field. This is used to contact you and arrange the
              appointment.
            </p>
            <p>
              The request also records how you arrived at the site - the campaign or referral
              information in the link you followed, and the page you landed on - so the practice
              can understand which of its channels patients actually find useful.
            </p>
            <p>
              Please do not send detailed medical information through the website. Bring it to
              your appointment or discuss it by phone.
            </p>

            <h2>Marketing</h2>
            <p>
              The appointment form includes an optional tick box for practice news and reminders.
              It is off unless you choose it, and you can opt out at any time by replying to any
              message or contacting the practice.
            </p>

            <h2>Cookies and analytics</h2>
            <p>
              This site sets no analytics or advertising cookies unless you accept them. If you
              accept, Google Analytics 4 is loaded and sets its own cookies to measure how the
              site is used - which pages are read, and whether visits lead to appointment
              requests. IP addresses are anonymised. If you decline, no analytics is loaded at
              all, and your choice is remembered in your browser.
            </p>
            <p>
              Separately, the site stores the campaign information described above in your
              browser&rsquo;s session storage so it can be attached to an enquiry you choose to
              send. It is not a cookie, it is not shared with anyone, and it is discarded when you
              close the tab.
            </p>
            <p>
              The map on the contact and location pages is embedded from Google Maps, which may
              set its own cookies when it loads.
            </p>

            <h2>Your rights</h2>
            <p>
              You have the right to ask what personal data the practice holds about you, to have
              inaccurate data corrected, to object to processing, to request erasure where it
              applies, and to receive a copy of your data. Requests can be made using the contact
              details above.
            </p>
            <p>
              If you are not satisfied with how a request has been handled, you can complain to
              the Data Protection Commission, the supervisory authority in Ireland.
            </p>

            <h2>Clinical records</h2>
            <p>
              Dental records created in the course of treatment are handled separately from this
              website, under the practice&rsquo;s own record-keeping and retention obligations.
              Ask at the practice for details.
            </p>

            <h2>Changes</h2>
            <p>
              This notice will be updated as the website gains new functionality, including online
              booking with confirmed appointment times and, in future, a patient portal.
            </p>

            <p>
              <Link href="/contact">Contact the practice</Link> with any question about this
              notice.
            </p>
          </div>
        </Container>
      </Section>

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

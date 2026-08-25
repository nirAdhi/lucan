"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { GA4_ID, analyticsEnabled } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

/**
 * GA4 loading, cookie consent and attribution capture (PRD s38, s40, s72).
 *
 * Consent first: gtag.js is not loaded at all until the visitor accepts. Declining stores
 * the decision so the banner does not reappear, and no analytics cookie is ever set.
 *
 * Attribution capture is separate and runs regardless, because it uses sessionStorage for
 * the visitor's own enquiry - it is not tracking, sets no cookie and leaves nothing behind
 * after the tab closes. It is what lets a booking answer "which campaign produced this?".
 */

const CONSENT_KEY = "ldic.consent.analytics.v1";

type Consent = "granted" | "denied" | "unset";

function readConsent(): Consent {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

export function Analytics() {
  const [consent, setConsent] = useState<Consent>("unset");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
    captureAttribution();
  }, []);

  function decide(next: Exclude<Consent, "unset">) {
    try {
      window.localStorage.setItem(CONSENT_KEY, next);
    } catch {
      // A visitor blocking storage simply gets asked again next visit.
    }
    setConsent(next);
  }

  // Nothing to ask and nothing to load when GA4 is not configured for this environment.
  if (!analyticsEnabled) return null;

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA4_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {ready && consent === "unset" ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-heading"
          className="fixed inset-x-3 bottom-[5.5rem] z-50 rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 shadow-[var(--shadow-lift)] sm:inset-x-auto sm:left-6 sm:max-w-sm lg:bottom-6"
        >
          <p id="cookie-consent-heading" className="font-semibold text-ink-900">
            Cookies on this site
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            We would like to use Google Analytics to understand how the site is used, which
            helps us improve it. No analytics cookies are set unless you accept.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="flex-1 rounded-full bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="flex-1 rounded-full border border-ink-300 px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
            >
              Decline
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

/**
 * Marketing attribution capture (PRD s38).
 *
 * The first page of a visit carries the campaign information; the booking usually happens
 * a few pages later. This module stores the first-touch UTM set, landing page and referrer
 * for the session so every enquiry can answer "which channel produced this patient?".
 *
 * First-touch is deliberate: overwriting on every page view would credit an internal link
 * or a self-referral instead of the campaign that actually brought the visitor in. Phase 4
 * persists this onto the `leads` row and feeds the s37 pipeline.
 */

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
};

const STORAGE_KEY = "ldic.attribution.v1";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

function safeSession(): Storage | null {
  // sessionStorage throws in some privacy modes; attribution is never worth an exception.
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/** Record first-touch attribution. Call once per page view; later calls do not overwrite. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const store = safeSession();
  if (!store) return;

  try {
    if (store.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {
      landing_page: window.location.pathname + window.location.search,
      captured_at: new Date().toISOString(),
    };

    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) data[key] = value.slice(0, 200);
    }

    // Same-host referrers say nothing about acquisition.
    if (document.referrer && !document.referrer.includes(window.location.host)) {
      data.referrer = document.referrer.slice(0, 300);
    }

    store.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore: attribution is best-effort and must never break a page.
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const store = safeSession();
  if (!store) return {};

  try {
    const raw = store.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

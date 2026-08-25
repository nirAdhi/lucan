/**
 * Conversion tracking (PRD s39, s40, s41).
 *
 * The funnel this measures is the one in PRD s3: treatment view -> book click -> booking
 * started -> booking completed. `booking_completed` is the event Google Ads should optimise
 * against (PRD s41), not `book_click`.
 *
 * Nothing is sent unless NEXT_PUBLIC_GA4_ID is configured, so a dev or preview build is
 * silent by default. Analytics loading is also gated on cookie consent (PRD s72) - see
 * components/analytics/Analytics.tsx.
 */

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export const analyticsEnabled = GA4_ID.length > 0;

/** The GA4 event names from PRD s40. Keeping them in a union stops silent typos. */
export type AnalyticsEvent =
  | "book_click"
  | "booking_started"
  | "booking_completed"
  | "phone_click"
  | "contact_form"
  | "lead_created"
  | "treatment_view"
  | "location_view";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a conversion event. Safe to call from anywhere: no-ops on the server, when GA4 is
 * not configured, and when consent has not been given (gtag is simply absent).
 */
export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined" || !analyticsEnabled) return;

  const clean: Params = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) clean[key] = value;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, clean);
    return;
  }

  // gtag.js may not have executed yet; the dataLayer queue survives until it does.
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...clean });
}

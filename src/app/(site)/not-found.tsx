import { headers } from "next/headers";
import { NotFoundContent } from "@/components/sections/NotFoundContent";

/**
 * 404 for paths that matched this segment - e.g. a notFound() thrown by
 * /our-team/[slug] or /treatments/[slug]. Unmatched URLs are handled by the root
 * app/not-found.tsx instead, which has to supply its own chrome.
 *
 * Awaiting headers() opts the page out of prerendering. Route segment config
 * (`export const dynamic`) is ignored on not-found files, and this page must render per
 * request: the CSP in src/middleware.ts carries a fresh nonce, and build-time HTML would
 * carry a stale one, leaving every 404 with its JavaScript blocked.
 */
export default async function NotFound() {
  await headers();
  return <NotFoundContent />;
}

import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/ui/Layout";
import { practiceSchema, websiteSchema } from "@/lib/schema";
import { getGoogleRating } from "@/lib/googleRating";

// Team, pricing and case-study content now comes from Postgres (Phase 2 admin CMS), which
// isn't reachable during `docker build` - so this whole segment renders per-request rather
// than being statically generated at build time. Reads still go through `unstable_cache`
// (see content/team.ts, content/pricing.ts, content/caseStudies.ts), tagged and invalidated
// by the admin's Server Actions, so this doesn't mean hitting Postgres on every request.
export const dynamic = "force-dynamic";

/** Public-site chrome (everything /admin/* deliberately does not get). */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const rating = await getGoogleRating();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <SiteHeader />

      {/* Bottom padding clears the fixed mobile CTA bar. */}
      <main id="main" className="flex-1 pb-24 lg:pb-0">
        {children}
      </main>

      <SiteFooter />
      <MobileCtaBar />
      <WhatsAppBubble />
      <Analytics />

      <JsonLd data={[practiceSchema(rating ?? undefined), websiteSchema()]} />
    </>
  );
}

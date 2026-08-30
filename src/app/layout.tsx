import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { accentFont } from "@/lib/fonts";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/ui/Layout";
import { practiceSchema, websiteSchema } from "@/lib/schema";
import { siteUrl } from "@/lib/seo";
import { getGoogleRating } from "@/lib/googleRating";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // Every page supplies its own full title; this is the fallback for any that does not.
    default: `${site.name} | Dentist in Lucan, Co. Dublin`,
    template: `%s`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  formatDetection: { telephone: true, address: true },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#276862",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const rating = await getGoogleRating();

  return (
    <html lang="en-IE" className={accentFont.variable}>
      <body className="flex min-h-dvh flex-col bg-sand-50">
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
      </body>
    </html>
  );
}

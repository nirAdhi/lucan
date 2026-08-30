import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { accentFont } from "@/lib/fonts";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/seo";

/**
 * True root layout - just the <html>/<body> shell and site-wide fonts/metadata defaults.
 * Everything visual (header, footer, CTA bar, JSON-LD) lives in app/(site)/layout.tsx so
 * that /admin/* gets its own chrome instead of the public marketing header and footer -
 * see app/admin/layout.tsx.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IE" className={accentFont.variable}>
      <body className="flex min-h-dvh flex-col bg-sand-50">{children}</body>
    </html>
  );
}

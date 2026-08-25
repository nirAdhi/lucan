import localFont from "next/font/local";

/**
 * Editorial accent face for the handful of emphasis words in hero and section headlines
 * (see components/ui/Accent.tsx) - never full paragraphs, so a single static italic
 * instance is enough and keeps the added weight to ~45KB, self-hosted (PRD s54: the site
 * must build with no network access, so the woff2 is committed rather than fetched via
 * next/font/google at build time).
 */
export const accentFont = localFont({
  src: "../fonts/fraunces-italic.woff2",
  weight: "560",
  style: "italic",
  display: "swap",
  variable: "--font-accent-face",
});

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

/**
 * Rounded geometric display face for H1s and the biggest section headlines - a single
 * ExtraBold weight (~12KB), self-hosted for the same build-with-no-network reason as
 * accentFont above. Gives headlines a warmer, more distinctive silhouette than the system
 * sans stack, which is kept for body copy and UI chrome (still the fast, zero-cost default
 * everywhere else - see --font-sans in globals.css).
 */
export const displayFont = localFont({
  src: "../fonts/plusjakartasans-extrabold.woff2",
  weight: "800",
  style: "normal",
  display: "swap",
  variable: "--font-display-face",
});

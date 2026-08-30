"use client";

import { site } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Floating quick-contact bubble. Renders nothing until site.whatsapp (TODO(verify) in
 * content/site.ts) is a real number - this codebase never ships a contact affordance that
 * points at an unverified or placeholder number.
 *
 * Desktop-only: mobile already has a persistent Call action in MobileCtaBar, and a second
 * fixed bottom-corner button would overlap it.
 */
export function WhatsAppBubble() {
  if (!site.whatsapp) return null;

  const digits = site.whatsapp.replace(/[^\d]/g, "");
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(
    `Hi ${site.name}, I'd like to ask about an appointment.`,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("phone_click", { cta_location: "whatsapp-bubble" })}
      aria-label={`Message ${site.name} on WhatsApp`}
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-white shadow-[var(--shadow-lift)] transition-colors hover:bg-brand-800 lg:flex"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.44 1.33 4.93L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.84 14.24c-.25.7-1.24 1.28-2.02 1.44-.54.11-1.24.2-3.6-.77-3.02-1.25-4.96-4.32-5.11-4.52-.15-.2-1.22-1.62-1.22-3.1 0-1.47.77-2.19 1.05-2.49.24-.26.63-.38.94-.38.11 0 .22 0 .32.01.28.01.42-.02.62.46.24.6.83 2.07.9 2.22.07.15.12.32.02.52-.09.2-.14.32-.28.5-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.26.13.44.19.5.3.07.11.07.62-.18 1.31Z"
        />
      </svg>
    </a>
  );
}

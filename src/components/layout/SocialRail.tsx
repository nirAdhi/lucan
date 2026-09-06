"use client";

import type { ReactNode } from "react";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Floating contact/social rail, pinned to the right edge.
 *
 * Each button renders only when its destination is actually configured in content/site.ts,
 * so a half-filled config degrades to a shorter rail rather than a dead link - the same
 * rule the Google rating and case-study gallery follow.
 *
 * On mobile it sits above the fixed MobileCtaBar rather than being hidden: WhatsApp and a
 * tap-to-DM are most useful on a phone, which is where most local dental searches happen.
 *
 * Icons are the current brand marks - glyph only, since the tile already carries the brand
 * colour and a logo's own enclosing circle would read as a badge inside a badge.
 */
const iconClass = "h-5 w-5 lg:h-6 lg:w-6";

type RailItem = {
  key: string;
  label: string;
  href: string;
  className: string;
  onClick?: () => void;
  icon: ReactNode;
};

export function SocialRail() {
  const whatsappDigits = site.whatsapp.replace(/[^\d]/g, "");

  const items = [
    whatsappDigits && {
      key: "whatsapp",
      label: `Message ${site.name} on WhatsApp`,
      href: `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
        `Hi ${site.name}, I'd like to ask about an appointment.`,
      )}`,
      className: "bg-[#25D366] hover:bg-[#1eb955]",
      onClick: () => track("phone_click", { cta_location: "social-rail-whatsapp" }),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClass}>
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.44 1.33 4.93L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.84 14.24c-.25.7-1.24 1.28-2.02 1.44-.54.11-1.24.2-3.6-.77-3.02-1.25-4.96-4.32-5.11-4.52-.15-.2-1.22-1.62-1.22-3.1 0-1.47.77-2.19 1.05-2.49.24-.26.63-.38.94-.38.11 0 .22 0 .32.01.28.01.42-.02.62.46.24.6.83 2.07.9 2.22.07.15.12.32.02.52-.09.2-.14.32-.28.5-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.26.13.44.19.5.3.07.11.07.62-.18 1.31Z" />
        </svg>
      ),
    },
    site.social.facebook && {
      key: "facebook",
      label: `${site.name} on Facebook`,
      href: site.social.facebook,
      className: "bg-[#1877F2] hover:bg-[#0f66d8]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClass}>
          <path d="M13.5 21.5v-8h2.7l.4-3.13h-3.1V8.37c0-.9.25-1.52 1.55-1.52h1.66V4.05a22.2 22.2 0 0 0-2.42-.12c-2.4 0-4.04 1.46-4.04 4.15v2.32H7.5v3.12h2.75v8h3.25Z" />
        </svg>
      ),
    },
    site.social.instagram && {
      key: "instagram",
      label: `${site.name} on Instagram`,
      href: site.social.instagram,
      className:
        "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] hover:opacity-90",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={iconClass}>
          <rect x="2.9" y="2.9" width="18.2" height="18.2" rx="5.2" stroke="currentColor" strokeWidth="1.9" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.9" />
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
        </svg>
      ),
    },
  ].filter(Boolean) as RailItem[];

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-28 right-3 z-40 flex flex-col gap-2 lg:bottom-auto lg:right-5 lg:top-1/2 lg:-translate-y-1/2">
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          onClick={item.onClick}
          className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-[var(--shadow-lift)] transition-transform duration-200 hover:scale-105 lg:h-12 lg:w-12 ${item.className}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

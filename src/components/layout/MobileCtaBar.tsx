"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cta, site } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Persistent mobile CTA bar (PRD s53).
 *
 * Most local dental searches happen on a phone, and the two actions that matter are "call"
 * and "book". On the emergency page the call action takes over the bar, because someone in
 * pain should not have to hunt for the number.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const urgent = pathname.startsWith("/emergency-dentist");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a
          href={cta.call.href}
          onClick={() => track("phone_click", { cta_location: "mobile-cta-bar" })}
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[0.95rem] font-semibold ${
            urgent
              ? "bg-urgent-600 text-white"
              : "border border-brand-700 text-brand-800"
          }`}
        >
          <PhoneIcon />
          {urgent ? "Call now" : "Call"}
        </a>
        <Link
          href={cta.book.href}
          onClick={() => track("book_click", { cta_location: "mobile-cta-bar" })}
          className="flex items-center justify-center gap-2 rounded-full bg-brand-700 px-4 py-3 text-[0.95rem] font-semibold text-white"
        >
          Book
        </Link>
      </div>
      <p className="sr-only">
        Call {site.name} on {site.phone} or request an appointment online.
      </p>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5.2 2.5 6.6 5 5.4 6.4a9 9 0 0 0 4.2 4.2L11 9.4l2.5 1.4v2.3c0 .5-.4.9-.9.8A11.5 11.5 0 0 1 2.1 3.4c0-.5.4-.9.9-.9h2.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

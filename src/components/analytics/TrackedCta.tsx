"use client";

import type { ReactNode } from "react";
import { LinkButton } from "@/components/ui/Button";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * A CTA that records the click before navigating (PRD s40).
 *
 * Use for the CTAs the funnel depends on - "Book Appointment" and any phone number - so
 * that book_click and phone_click are measured everywhere they appear, with the page that
 * produced them attached. Ordinary links do not need this.
 */
export function TrackedCta({
  href,
  event,
  location,
  treatment,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  event: AnalyticsEvent;
  /** Where on the site the CTA sits, e.g. "header", "hero", "treatment-page". */
  location: string;
  /** Treatment slug, when the CTA sits on or refers to a treatment page. */
  treatment?: string;
  variant?: "primary" | "gold" | "urgent" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}) {
  return (
    <LinkButton
      href={href}
      variant={variant}
      size={size}
      className={className}
      onClick={() => track(event, { cta_location: location, treatment })}
    >
      {children}
    </LinkButton>
  );
}

/** Inline (non-button) tracked link, for phone numbers in body copy and footers. */
export function TrackedLink({
  href,
  event,
  location,
  className,
  children,
}: {
  href: string;
  event: AnalyticsEvent;
  location: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event, { cta_location: location })}
    >
      {children}
    </a>
  );
}

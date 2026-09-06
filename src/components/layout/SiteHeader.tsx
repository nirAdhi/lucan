"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cta, mainNav, site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { track } from "@/lib/analytics";
import { LinkButton } from "@/components/ui/Button";

/**
 * Desktop nav, split into two groups so the bar degrades in a controlled order rather than
 * wrapping or overflowing. Everything below xl still reaches every link through the menu
 * button, and the footer carries the full list on every page.
 *
 *  - PRIMARY   shows from lg up.
 *  - SECONDARY shows from xl up (below that there simply isn't room alongside both CTAs).
 *  - The phone pill shows from 2xl up, where it stops competing for space with the nav.
 */
const DESKTOP_PRIMARY = ["/new-patients", "/our-team", "/pricing", "/contact"];
const DESKTOP_SECONDARY = ["/patient-stories", "/about", "/blog"];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const treatmentsRef = useRef<HTMLDivElement>(null);

  // Close both panels on navigation, otherwise the menu stays open over the new page.
  useEffect(() => {
    setMenuOpen(false);
    setTreatmentsOpen(false);
  }, [pathname]);

  // The pill lifts slightly once it stops sitting flush with the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!treatmentsOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!treatmentsRef.current?.contains(event.target as Node)) setTreatmentsOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setTreatmentsOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [treatmentsOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const navLink = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      className={`rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors ${
        isActive(href)
          ? "bg-brand-50 text-brand-800"
          : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
      }`}
      aria-current={isActive(href) ? "page" : undefined}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 pt-3 sm:pt-4">
      {/* Wider than the page container: the nav needs the extra room to sit on one line. */}
      <div className="mx-auto w-full max-w-[92rem] px-4 sm:px-6 lg:px-8">
        {/* Floating pill rather than a full-width bar - keeps the page feeling open. */}
        <div
          className={`flex items-center justify-between gap-3 rounded-full border border-ink-100 bg-white px-3 py-2.5 transition-shadow duration-300 ${
            scrolled ? "shadow-[var(--shadow-lift)]" : "shadow-[var(--shadow-soft)]"
          }`}
        >
          <div className="flex shrink-0 items-center gap-2.5">
            <Link href="/" className="flex items-center px-1 py-1" aria-label={`${site.name} home`}>
              <Image
                src="/brand/ldic-logo.png"
                alt=""
                width={230}
                height={144}
                priority
                className="h-10 w-auto lg:h-11"
              />
            </Link>

            <a
              href={cta.call.href}
              onClick={() => track("phone_click", { cta_location: "header-badge" })}
              // 1400px, not a stock breakpoint: measured as the width where the full nav,
              // both CTAs and this pill stop competing for the same row.
              className="hidden items-center rounded-full border border-ink-200 px-3.5 py-1.5 text-[0.85rem] font-semibold text-ink-800 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 min-[1400px]:flex"
            >
              {site.phone}
            </a>
          </div>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            <div className="relative" ref={treatmentsRef}>
              <button
                type="button"
                onClick={() => setTreatmentsOpen((open) => !open)}
                aria-expanded={treatmentsOpen}
                aria-controls="treatments-menu"
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors ${
                  isActive("/treatments") || treatmentsOpen
                    ? "bg-brand-50 text-brand-800"
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                }`}
              >
                Treatments
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${treatmentsOpen ? "rotate-180" : ""}`}
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {treatmentsOpen ? (
                <div
                  id="treatments-menu"
                  className="absolute left-1/2 top-full z-50 mt-3 w-[34rem] -translate-x-1/2 overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-[var(--shadow-lift)]"
                >
                  <ul className="grid grid-cols-2 gap-0.5 p-2.5">
                    {treatments.map((treatment) => (
                      <li key={treatment.slug}>
                        <Link
                          href={`/treatments/${treatment.slug}`}
                          className="group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-800"
                        >
                          {treatment.name}
                          <span
                            aria-hidden="true"
                            className="text-brand-500 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            &rarr;
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/treatments"
                    className="flex items-center justify-between border-t border-ink-100 bg-ink-50/60 px-5 py-3.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                  >
                    All {treatments.length} treatments
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              ) : null}
            </div>

            {mainNav
              .filter((item) => DESKTOP_PRIMARY.includes(item.href))
              .map((item) => navLink(item.href, item.label))}

            <span aria-hidden="true" className="mx-1.5 hidden h-4 w-px bg-ink-200 xl:block" />

            <span className="hidden items-center gap-0.5 xl:flex">
              {mainNav
                .filter((item) => DESKTOP_SECONDARY.includes(item.href))
                .map((item) => navLink(item.href, item.label))}
            </span>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link
              href={cta.emergency.href}
              className="flex items-center gap-1.5 rounded-full border border-urgent-100 px-3.5 py-2 text-[0.85rem] font-semibold text-urgent-700 transition-colors hover:border-urgent-600/30 hover:bg-urgent-50"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-urgent-600" />
              Emergency
            </Link>
            <LinkButton
              href={cta.book.href}
              variant="gold"
              size="sm"
              onClick={() => track("book_click", { cta_location: "header" })}
            >
              {cta.book.label}
            </LinkButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50 lg:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M2 2l12 8M14 2L2 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              ) : (
                <path d="M1 1.5h14M1 6h14M1 10.5h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen ? (
          <div
            id="mobile-menu"
            className="mt-2 overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-white shadow-[var(--shadow-lift)] lg:hidden"
          >
            <nav aria-label="Mobile" className="max-h-[calc(100dvh-8rem)] overflow-y-auto p-4">
              <ul className="grid gap-0.5">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-xl px-3 py-2.5 font-medium transition-colors ${
                        isActive(item.href) ? "bg-brand-50 text-brand-800" : "text-ink-700 hover:bg-ink-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-5 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                Treatments
              </p>
              <ul className="mt-1.5 grid gap-0.5 sm:grid-cols-2">
                {treatments.map((treatment) => (
                  <li key={treatment.slug}>
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="block rounded-xl px-3 py-2 text-sm text-ink-600 transition-colors hover:bg-ink-50"
                    >
                      {treatment.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid gap-2 border-t border-ink-100 pt-4">
                <LinkButton
                  href={cta.book.href}
                  variant="gold"
                  size="lg"
                  onClick={() => track("book_click", { cta_location: "mobile-menu" })}
                >
                  {cta.book.label}
                </LinkButton>
                <LinkButton
                  href={cta.emergency.href}
                  variant="outline"
                  size="lg"
                  className="border-urgent-600/30 text-urgent-700 hover:bg-urgent-50"
                >
                  {cta.emergency.label}
                </LinkButton>
                <LinkButton
                  href={cta.call.href}
                  variant="ghost"
                  size="lg"
                  onClick={() => track("phone_click", { cta_location: "mobile-menu" })}
                >
                  {cta.call.label}
                </LinkButton>
              </div>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}

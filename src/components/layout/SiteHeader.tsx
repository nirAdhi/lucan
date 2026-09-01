"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cta, mainNav, site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { track } from "@/lib/analytics";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";

/** Links shown in the desktop bar; the rest live in the mobile menu and the footer. */
const DESKTOP_PRIMARY = ["/treatments", "/new-patients", "/our-team", "/pricing", "/contact"];
const DESKTOP_SECONDARY = ["/patient-stories", "/about", "/blog"];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const treatmentsRef = useRef<HTMLDivElement>(null);

  // Close both panels on navigation, otherwise the menu stays open over the new page.
  useEffect(() => {
    setMenuOpen(false);
    setTreatmentsOpen(false);
  }, [pathname]);

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
      className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
        isActive(href) ? "text-brand-800" : "text-ink-600 hover:text-brand-700"
      }`}
      aria-current={isActive(href) ? "page" : undefined}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 bg-sand-50/95 backdrop-blur supports-[backdrop-filter]:bg-sand-50/85">
      <Container width="wide">
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/" className="flex items-center py-1" aria-label={`${site.name} home`}>
              <Image
                src="/brand/ldic-logo.png"
                alt=""
                width={230}
                height={144}
                priority
                className="h-11 w-auto lg:h-12"
              />
            </Link>

            <a
              href={cta.call.href}
              onClick={() => track("phone_click", { cta_location: "header-badge" })}
              className="hidden items-center rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-800 hover:border-brand-300 hover:text-brand-800 xl:flex"
            >
              {site.phone}
            </a>
          </div>

          <nav aria-label="Main" className="hidden items-center lg:flex">
            <div className="relative" ref={treatmentsRef}>
              <button
                type="button"
                onClick={() => setTreatmentsOpen((open) => !open)}
                aria-expanded={treatmentsOpen}
                aria-controls="treatments-menu"
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive("/treatments") ? "text-brand-800" : "text-ink-600 hover:text-brand-700"
                }`}
              >
                Treatments
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform ${treatmentsOpen ? "rotate-180" : ""}`}
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {treatmentsOpen ? (
                <div
                  id="treatments-menu"
                  className="absolute left-0 top-full z-50 mt-2 w-[30rem] rounded-[var(--radius-card)] border border-ink-200 bg-white p-3 shadow-[var(--shadow-lift)]"
                >
                  <ul className="grid grid-cols-2 gap-1">
                    {treatments.map((treatment) => (
                      <li key={treatment.slug}>
                        <Link
                          href={`/treatments/${treatment.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-brand-50 hover:text-brand-800"
                        >
                          {treatment.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/treatments"
                    className="mt-2 block rounded-lg bg-ink-50 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                  >
                    All treatments &rarr;
                  </Link>
                </div>
              ) : null}
            </div>

            {mainNav
              .filter((item) => DESKTOP_PRIMARY.includes(item.href) && item.href !== "/treatments")
              .map((item) => navLink(item.href, item.label))}

            <span className="mx-2 hidden h-5 w-px bg-ink-200 xl:block" />

            <span className="hidden xl:flex">
              {mainNav
                .filter((item) => DESKTOP_SECONDARY.includes(item.href))
                .map((item) => navLink(item.href, item.label))}
            </span>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LinkButton href={cta.emergency.href} variant="ghost" size="sm" className="text-urgent-700 hover:bg-urgent-50">
              Emergency
            </LinkButton>
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
            className="flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 lg:hidden"
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
      </Container>

      {menuOpen ? (
        <div id="mobile-menu" className="border-t border-ink-100 bg-white lg:hidden">
          <Container>
            <nav aria-label="Mobile" className="py-4">
              <ul className="grid gap-1">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-2.5 font-medium ${
                        isActive(item.href) ? "bg-brand-50 text-brand-800" : "text-ink-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                Treatments
              </p>
              <ul className="mt-1 grid gap-0.5">
                {treatments.map((treatment) => (
                  <li key={treatment.slug}>
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-ink-600"
                    >
                      {treatment.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-5 grid gap-2 px-1 pb-2">
                <LinkButton
                  href={cta.book.href}
                  variant="gold"
                  size="lg"
                  onClick={() => track("book_click", { cta_location: "mobile-menu" })}
                >
                  {cta.book.label}
                </LinkButton>
                <LinkButton href={cta.emergency.href} variant="outline" size="lg">
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
          </Container>
        </div>
      ) : null}
    </header>
  );
}

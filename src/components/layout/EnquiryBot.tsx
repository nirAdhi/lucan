"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cta, site } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Scripted enquiry widget - a menu wearing a chat interface, not a chat.
 *
 * Every option lands on a real destination: the booking form with `?reason=` pre-filled
 * (the values come straight from content/booking.ts, so the form's select matches), or a
 * phone/WhatsApp/email link. There is no free-text input and no message ever gets "sent",
 * because nobody is staffing an inbox behind it - the header says so plainly. Someone in
 * pain typing into a dead chat box and waiting is the failure mode this avoids.
 *
 * NOTE ON WORDING: the reference this was modelled on offers "FREE consultations". LDIC's
 * own price list charges EUR 50-300 for consultations (only the PRSI exam is free, subject
 * to eligibility), so these labels deliberately do not promise a free appointment.
 */

type Option =
  | { label: string; href: string; tone?: "urgent"; external?: boolean; event?: () => void }
  | { label: string; next: StepId; tone?: "urgent" };

type StepId = "root" | "question" | "emergency";

const bookHref = (reason: string) => `${cta.book.href}?reason=${encodeURIComponent(reason)}`;

/**
 * Auto-open timings. Long on purpose: popping open the moment someone lands is what makes
 * these widgets feel like spam, and Google treats an overlay that covers content on
 * arrival as an intrusive interstitial. Waiting until the visitor has settled means it
 * reads as an offer of help rather than an interruption.
 */
const BADGE_AFTER_MS = 4000;
const AUTO_OPEN_AFTER_MS = 15000;
/** Session-scoped, so a dismissal lasts the visit but doesn't follow them forever. */
const DISMISSED_KEY = "ldic:enquiry-dismissed";

export function EnquiryBot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<StepId>("root");
  const [greeting, setGreeting] = useState("Hello");
  const [badge, setBadge] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  /** Set once the visitor has opened or dismissed it - stops any pending auto-open. */
  const engagedRef = useRef(false);

  // Computed after mount: doing this during render would mismatch the server HTML.
  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening");
  }, []);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.sessionStorage.getItem(DISMISSED_KEY) === "1";
    } catch {
      // Private mode / storage blocked - fall through and just behave as first visit.
    }
    if (dismissed) return;

    const badgeTimer = window.setTimeout(() => {
      if (!engagedRef.current) setBadge(true);
    }, BADGE_AFTER_MS);

    const openTimer = window.setTimeout(() => {
      // Deliberately does NOT move focus. Yanking the caret out of whatever someone is
      // reading (or typing) is hostile, and for keyboard users it loses their place.
      if (!engagedRef.current) {
        setOpen(true);
        setBadge(false);
      }
    }, AUTO_OPEN_AFTER_MS);

    return () => {
      window.clearTimeout(badgeTimer);
      window.clearTimeout(openTimer);
    };
  }, []);

  /** Any deliberate open/close counts as engagement and suppresses the auto-open. */
  function markEngaged(persistDismissal: boolean) {
    engagedRef.current = true;
    setBadge(false);
    if (!persistDismissal) return;
    try {
      window.sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Storage unavailable - worst case it may auto-open again on the next page.
    }
  }

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      // Clicking away just closes it. It is NOT treated as "go away for the whole visit":
      // a stray click while reading the page shouldn't silently kill the widget, which is
      // indistinguishable from it being broken.
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        markEngaged(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      // Escape is deliberate, so it counts as a real dismissal.
      if (event.key === "Escape") {
        setOpen(false);
        markEngaged(true);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const whatsappDigits = site.whatsapp.replace(/[^\d]/g, "");

  const steps: Record<StepId, { messages: string[]; options: Option[] }> = {
    root: {
      messages: [`${greeting} - welcome to ${site.shortName}.`, "What can we help you with?"],
      options: [
        { label: "Dental implants", href: bookHref("Implant consultation") },
        { label: "Braces or aligners", href: bookHref("Orthodontic consultation") },
        { label: "Cosmetic treatment", href: bookHref("Cosmetic consultation") },
        { label: "Check-up or hygiene", href: bookHref("General examination") },
        { label: "I'm a new patient", href: bookHref("New patient examination") },
        { label: "I have a question", next: "question" },
        { label: "Dental emergency", next: "emergency", tone: "urgent" },
      ],
    },
    question: {
      messages: [
        "Happy to help.",
        `Reception answers Mon-Fri 9am-5pm. ${site.hoursNote}`,
      ],
      options: [
        {
          label: `Call ${site.phone}`,
          href: cta.call.href,
          event: () => track("phone_click", { cta_location: "enquiry-bot" }),
        },
        ...(whatsappDigits
          ? [
              {
                label: "Message us on WhatsApp",
                href: `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
                  `Hi ${site.name}, I have a question.`,
                )}`,
                external: true,
                event: () => track("phone_click", { cta_location: "enquiry-bot-whatsapp" }),
              } as Option,
            ]
          : []),
        { label: `Email ${site.email}`, href: `mailto:${site.email}` },
        { label: "Read the FAQs", href: "/faqs" },
        { label: "Back", next: "root" },
      ],
    },
    emergency: {
      messages: [
        "If you are in pain, have swelling or have broken a tooth, phone the practice rather than waiting on an online request.",
      ],
      options: [
        {
          label: `Call ${site.phone} now`,
          href: cta.call.href,
          tone: "urgent",
          event: () => track("phone_click", { cta_location: "enquiry-bot-emergency" }),
        },
        { label: "Emergency dental care", href: cta.emergency.href },
        { label: "Back", next: "root" },
      ],
    },
  };

  const current = steps[step];

  return (
    <div ref={rootRef} className="fixed bottom-28 left-3 z-40 lg:bottom-6 lg:left-6">
      {open ? (
        <div
          id="enquiry-panel"
          className="mb-3 flex w-[min(21rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-100 bg-ink-50 shadow-[var(--shadow-lift)]"
        >
          <div className="flex items-center gap-3 bg-brand-800 px-4 py-3.5 text-white">
            <Avatar />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{site.name}</p>
              {/* Says plainly that this is a menu, not a person. */}
              <p className="text-[0.7rem] text-brand-200">Automated menu &middot; not a live chat</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                markEngaged(true);
              }}
              aria-label="Close"
              className="-mr-1 rounded-full p-1.5 text-brand-100 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="max-h-[min(28rem,60dvh)] overflow-y-auto p-4">
            <div key={step} className="grid gap-2.5">
              {current.messages.map((message, i) => (
                <div key={message} className="flex items-end gap-2">
                  <span className="shrink-0">{i === 0 ? <Avatar small /> : <span className="block h-7 w-7" />}</span>
                  <p
                    className="enquiry-msg max-w-[15rem] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink-700 shadow-[var(--shadow-soft)]"
                    style={{ animationDelay: `${i * 160}ms` }}
                  >
                    {message}
                  </p>
                </div>
              ))}

              <div
                className="enquiry-msg mt-1 grid gap-2 sm:grid-cols-2"
                style={{ animationDelay: `${current.messages.length * 160}ms` }}
              >
                {current.options.map((option) => {
                  const urgent = option.tone === "urgent";
                  const className = `rounded-xl border px-3 py-2.5 text-center text-[0.82rem] font-semibold leading-snug transition-colors ${
                    urgent
                      ? "border-urgent-100 bg-white text-urgent-700 hover:bg-urgent-50"
                      : "border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                  }`;

                  if ("next" in option) {
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => setStep(option.next)}
                        className={className}
                      >
                        {option.label}
                      </button>
                    );
                  }

                  const isInternal = option.href.startsWith("/");
                  const shared = {
                    className,
                    onClick: () => {
                      option.event?.();
                      setOpen(false);
                    },
                  };

                  return isInternal ? (
                    <Link key={option.label} href={option.href} {...shared}>
                      {option.label}
                    </Link>
                  ) : (
                    <a
                      key={option.label}
                      href={option.href}
                      {...(option.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      {...shared}
                    >
                      {option.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => {
          const next = !open;
          setOpen(next);
          setStep("root");
          // Closing by hand is a dismissal; opening by hand just stops the auto-open.
          markEngaged(!next);
        }}
        aria-expanded={open}
        aria-controls="enquiry-panel"
        className="relative flex items-center gap-3 rounded-full border border-ink-100 bg-white p-2 shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.02] lg:pr-5"
      >
        {badge ? (
          <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-urgent-600 text-[0.7rem] font-bold text-white shadow-sm">
            1<span className="sr-only"> new message</span>
          </span>
        ) : null}

        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white lg:h-11 lg:w-11">
          {open ? null : (
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-40 [animation-duration:2.5s]"
            />
          )}
          <svg viewBox="0 0 20 20" fill="none" className="relative h-5 w-5" aria-hidden="true">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path
                d="M3 4.5h14v9H8l-4 3v-3H3v-9Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </span>

        <span className="hidden text-left lg:block">
          <span className="block text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand-700">
            Talk to us
          </span>
          <span className="block text-sm font-semibold text-ink-900">{site.phone}</span>
        </span>
        <span className="sr-only lg:hidden">{open ? "Close enquiry menu" : "Open enquiry menu"}</span>
      </button>
    </div>
  );
}

/** The practice mark, not a stock portrait - a stranger's face implying they are staff. */
function Avatar({ small = false }: { small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-white ${
        small ? "h-7 w-7" : "h-9 w-9"
      }`}
    >
      <svg viewBox="0 0 32 32" className={small ? "h-4 w-4" : "h-5 w-5"} fill="none">
        <path
          fill="var(--color-brand-700)"
          d="M16 6.6c-3.1 0-4.3 1.3-6.4 1.3-2.1 0-2.3-.5-2.3 2.1 0 3 1.3 4.4 1.8 7.3.5 2.3.6 6.5 2.2 6.5 1.5 0 1.6-3.3 2.3-5.4.4-1.1.9-1.8 2.4-1.8s2 .7 2.4 1.8c.7 2.1.8 5.4 2.3 5.4 1.6 0 1.7-4.2 2.2-6.5.5-2.9 1.8-4.3 1.8-7.3 0-2.6-.2-2.1-2.3-2.1-2.1 0-3.3-1.3-6.4-1.3Z"
        />
      </svg>
    </span>
  );
}

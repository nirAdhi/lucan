"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cta } from "@/content/site";
import type { TeamMember } from "@/content/team";
import { initials } from "@/lib/initials";
import { track } from "@/lib/analytics";

/**
 * Team card with the biography behind a "Read bio" overlay.
 *
 * Progressive enhancement, deliberately: the trigger is a real <Link> to the clinician's
 * own page, and JS intercepts the plain-left-click to open the dialog instead. That means
 * the modal experience for ordinary visitors, while crawlers still see a normal href,
 * cmd/ctrl/middle-click still opens the page in a tab, and it degrades to the full page
 * with JS off. Making it a <button> would have thrown all of that away.
 *
 * The overlay is a native <dialog> opened with showModal(), which brings focus trapping,
 * Escape-to-close and inertness of the page behind it for free - all things a hand-rolled
 * div gets subtly wrong.
 */
export function TeamCard({ member }: { member: TeamMember }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    dialogRef.current?.showModal();
    setOpen(true);
    track("treatment_view", { cta_location: "team-bio", treatment: member.slug });
  }, [member.slug]);

  const closeDialog = useCallback(() => dialogRef.current?.close(), []);

  // showModal() blocks interaction behind the dialog but not scrolling, so lock it here.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <li className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-200 bg-white shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-lift)]">
      <div className="p-6 pb-5">
        <h3 className="text-lg font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
          {member.name}
        </h3>
        <p className="mt-1 text-sm text-ink-500">
          {member.qualifications ? `${member.qualifications}, ` : ""}
          {member.role}
        </p>

        {member.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {member.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-ink-100 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-ink-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex items-end justify-between gap-4">
          {member.languages && member.languages.length > 0 ? (
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
                Speaks
              </p>
              <p className="mt-1 text-sm text-ink-700">{member.languages.join(" | ")}</p>
            </div>
          ) : (
            <span />
          )}

          <Link
            href={`/our-team/${member.slug}`}
            onClick={(event) => {
              // Let the browser handle "open in new tab" gestures normally.
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              openDialog();
            }}
            className="shrink-0 rounded-full border border-ink-200 px-4 py-1.5 text-sm font-semibold text-ink-700 transition-colors group-hover:border-brand-300 group-hover:bg-brand-50 group-hover:text-brand-800"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            Read bio
            {/* Every card's button reads "Read bio", so name it for assistive tech. */}
            <span className="sr-only"> for {member.name}</span>
          </Link>
        </div>
      </div>

      <Portrait member={member} className="mt-auto h-64 w-full object-cover object-top" />

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          // showModal() makes the backdrop part of the dialog itself, so a click landing
          // directly on the element (not its content) is a backdrop click.
          if (event.target === dialogRef.current) closeDialog();
        }}
        aria-labelledby={`bio-${member.slug}`}
        // m-auto is load-bearing: a native modal <dialog> centres itself with `margin:auto`,
        // and Tailwind's preflight zeroes margins, which pins it to the top-left corner.
        className="m-auto max-h-[88dvh] w-[min(52rem,calc(100vw-2rem))] overflow-y-auto rounded-[var(--radius-card)] bg-sand-50 p-0 backdrop:bg-ink-900/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative">
          <button
            type="button"
            onClick={closeDialog}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-700 shadow-[var(--shadow-soft)] transition-colors hover:bg-white hover:text-ink-900"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>

          <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1.15fr_1fr] md:gap-8">
            <div className="order-2 md:order-1">
              <h2 id={`bio-${member.slug}`} className="text-3xl leading-tight sm:text-4xl">
                {member.name}
              </h2>
              <p className="mt-3 text-ink-500">
                {member.qualifications ? `${member.qualifications}, ` : ""}
                {member.role}
              </p>
              <hr className="my-5 border-ink-200" />
              <p className="text-[0.95rem] leading-relaxed text-ink-600">{member.summary}</p>
            </div>

            <div className="order-1 md:order-2">
              <Portrait
                member={member}
                className="aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover object-top"
              />
            </div>
          </div>

          <div className="border-t border-ink-200 bg-white px-6 py-7 sm:px-8">
            <h3 className="text-xl">About {member.name}</h3>
            <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-ink-600">
              {member.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            {member.specialities.length > 0 ? (
              <>
                <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
                  Areas of focus
                </h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {member.specialities.map((speciality) => (
                    <li key={speciality} className="flex gap-2.5 text-[0.95rem] text-ink-600">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                      />
                      {speciality}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-ink-100 pt-6">
              <Link
                href={cta.book.href}
                onClick={() => track("book_click", { cta_location: "team-bio-modal" })}
                className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-600"
              >
                Book with {member.name.split(" ").slice(0, 2).join(" ")}
              </Link>
              {/* Still offers the real page - useful for sharing a clinician's profile. */}
              <Link
                href={`/our-team/${member.slug}`}
                className="text-sm font-semibold text-brand-700 hover:underline"
              >
                Open full profile &rarr;
              </Link>
            </div>
          </div>
        </div>
      </dialog>
    </li>
  );
}

/** Portrait, falling back to a monogram until the practice uploads a photo in /admin. */
function Portrait({ member, className }: { member: TeamMember; className: string }) {
  if (member.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- practice-supplied, fixed display size
      <img
        src={member.photo}
        alt={`${member.name}, ${member.role} at Lucan Dental & Implantology Centre`}
        className={`bg-ink-50 ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 ${className}`}
    >
      <span className="text-3xl font-bold tracking-tight text-brand-700/40">
        {initials(member.name)}
      </span>
    </div>
  );
}

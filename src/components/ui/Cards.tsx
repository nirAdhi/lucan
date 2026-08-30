import Link from "next/link";
import type { Treatment } from "@/content/treatments";
import { initials, type TeamMember } from "@/content/team";
import { Badge } from "@/components/ui/Layout";

/** Tooth mark from app/icon.svg, reused here as a watermark until real treatment photos
 * exist behind the admin CMS (see Phase 2 of the design-refresh plan) - swapping this for
 * a `next/image` once `treatment.image` exists is a one-line change, not a redesign. */
function TreatmentImageSlot({ urgent }: { urgent?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex h-32 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-card)] sm:h-auto sm:w-2/5 ${
        urgent
          ? "bg-gradient-to-br from-urgent-50 to-urgent-100"
          : "bg-gradient-to-br from-brand-50 to-brand-100"
      }`}
    >
      <svg
        viewBox="0 0 32 32"
        className={`h-20 w-20 sm:h-24 sm:w-24 ${urgent ? "text-urgent-600/25" : "text-brand-700/20"}`}
      >
        <path
          fill="currentColor"
          d="M16 6.6c-3.1 0-4.3 1.3-6.4 1.3-2.1 0-2.3-.5-2.3 2.1 0 3 1.3 4.4 1.8 7.3.5 2.3.6 6.5 2.2 6.5 1.5 0 1.6-3.3 2.3-5.4.4-1.1.9-1.8 2.4-1.8s2 .7 2.4 1.8c.7 2.1.8 5.4 2.3 5.4 1.6 0 1.7-4.2 2.2-6.5.5-2.9 1.8-4.3 1.8-7.3 0-2.6-.2-2.1-2.3-2.1-2.1 0-3.3-1.3-6.4-1.3Z"
        />
      </svg>
    </div>
  );
}

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const urgent = treatment.category === "Urgent";

  return (
    <li className="group relative flex flex-col gap-5 rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-lift)] sm:flex-row sm:items-stretch">
      <div className="flex flex-1 flex-col">
        <div className="mb-3">
          <Badge tone={urgent ? "urgent" : "brand"}>{treatment.category}</Badge>
        </div>
        <h3 className="text-lg font-semibold">
          <Link href={`/treatments/${treatment.slug}`} className="hover:text-brand-700">
            {/* Stretched link keeps the whole card clickable without nesting anchors. */}
            <span className="absolute inset-0" aria-hidden="true" />
            {treatment.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-500">{treatment.cardText}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
          Learn more
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </div>
      <TreatmentImageSlot urgent={urgent} />
    </li>
  );
}

export function Avatar({ member, size = "md" }: { member: TeamMember; size?: "md" | "lg" }) {
  const dimension = size === "lg" ? "h-24 w-24 text-2xl" : "h-16 w-16 text-lg";

  if (member.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- portraits are supplied by the practice at fixed sizes
      <img
        src={member.photo}
        alt={`${member.name}, ${member.role} at Lucan Dental & Implantology Centre`}
        className={`${dimension} shrink-0 rounded-full object-cover`}
        width={size === "lg" ? 96 : 64}
        height={size === "lg" ? 96 : 64}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${dimension} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 font-semibold text-brand-800 ring-4 ring-white`}
    >
      {initials(member.name)}
    </span>
  );
}

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <li className="group relative flex gap-5 rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-lift)]">
      <Avatar member={member} />
      <div>
        <h3 className="font-semibold">
          <Link href={`/our-team/${member.slug}`} className="hover:text-brand-700">
            <span className="absolute inset-0" aria-hidden="true" />
            {member.name}
          </Link>
        </h3>
        <p className="text-sm font-medium text-brand-700">{member.role}</p>
        <p className="mt-1 text-xs uppercase tracking-wide text-ink-400">{member.qualifications}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">{member.summary}</p>
      </div>
    </li>
  );
}

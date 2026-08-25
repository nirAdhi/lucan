import Link from "next/link";
import type { Treatment } from "@/content/treatments";
import { initials, type TeamMember } from "@/content/team";
import { Badge } from "@/components/ui/Layout";

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <li className="group relative flex flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-lift)]">
      <div className="mb-3">
        <Badge tone={treatment.category === "Urgent" ? "urgent" : "brand"}>
          {treatment.category}
        </Badge>
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
      className={`${dimension} flex shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-800`}
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

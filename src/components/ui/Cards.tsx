import Link from "next/link";
import type { Treatment } from "@/content/treatments";
import type { TeamMember } from "@/content/team";
import { initials } from "@/lib/initials";
import { Badge } from "@/components/ui/Layout";

/**
 * Text-only by design. An empty image panel reads as a broken/missing photo, which looks
 * worse than no panel at all - so until the practice has real treatment photography, these
 * stay clean text cards rather than holding space for an image that isn't there.
 */
export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const urgent = treatment.category === "Urgent";

  return (
    <li className="group relative flex flex-col rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 shadow-[var(--shadow-soft)] transition-shadow duration-200 hover:shadow-[var(--shadow-lift)]">
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
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
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
      className={`${dimension} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 font-semibold text-brand-800 ring-4 ring-white`}
    >
      {initials(member.name)}
    </span>
  );
}


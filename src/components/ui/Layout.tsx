import Link from "next/link";
import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const max =
    width === "narrow" ? "max-w-3xl" : width === "wide" ? "max-w-7xl" : "max-w-6xl";
  return (
    <div className={["mx-auto w-full px-5 sm:px-6 lg:px-8", max, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "tint" | "brand" | "sand";
  id?: string;
}) {
  const tones = {
    white: "bg-white",
    tint: "bg-ink-50",
    sand: "bg-sand-50",
    brand: "bg-brand-800 text-brand-50",
  } as const;

  return (
    <section
      id={id}
      className={["py-14 sm:py-20", tones[tone], className].filter(Boolean).join(" ")}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  inverted = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  inverted?: boolean;
}) {
  return (
    <div
      className={[
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "",
      ].join(" ")}
    >
      {eyebrow ? (
        <p
          className={[
            "mb-3 text-xs font-semibold uppercase tracking-[0.14em]",
            inverted ? "text-brand-200" : "text-brand-600",
          ].join(" ")}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={[
          "text-2xl sm:text-3xl lg:text-[2.1rem] lg:leading-tight",
          inverted ? "text-white" : "",
        ].join(" ")}
      >
        {title}
      </h2>
      {intro ? (
        <p className={["mt-4 text-lg", inverted ? "text-brand-100" : "text-ink-500"].join(" ")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag
      className={[
        "rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 shadow-[var(--shadow-soft)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}

export function Badge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "urgent" | "neutral";
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-700 ring-brand-100",
    urgent: "bg-urgent-50 text-urgent-700 ring-urgent-100",
    neutral: "bg-ink-100 text-ink-600 ring-ink-200",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Visible breadcrumbs. Pair with breadcrumbSchema() so the markup matches the trail. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-400">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink-500">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="hover:text-brand-700 hover:underline">
                  {crumb.name}
                </Link>
              )}
              {last ? null : (
                <span aria-hidden="true" className="text-ink-300">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Renders JSON-LD. Kept in one place so no page hand-writes a script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is generated server-side from our own content modules, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={["prose-ldic text-ink-600", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

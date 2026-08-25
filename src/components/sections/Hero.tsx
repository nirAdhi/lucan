import type { ReactNode } from "react";
import { Breadcrumbs, Container } from "@/components/ui/Layout";
import type { Crumb } from "@/lib/seo";

/**
 * Standard page hero. Every page states what it is, where it is (Lucan) and offers the
 * booking action in the first screen (PRD s6, s53).
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  trail,
  actions,
  tone = "tint",
  aside,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  trail?: Crumb[];
  actions?: ReactNode;
  tone?: "tint" | "brand" | "urgent";
  aside?: ReactNode;
}) {
  const tones = {
    tint: "bg-gradient-to-b from-brand-50 to-white",
    brand: "bg-brand-800 text-brand-50",
    urgent: "bg-gradient-to-b from-urgent-50 to-white",
  } as const;

  const inverted = tone === "brand";

  return (
    <div className={`border-b border-ink-100 ${tones[tone]}`}>
      <Container width="wide">
        <div className="py-8 sm:py-12">
          {trail ? (
            <div className={inverted ? "[&_a]:text-brand-200 [&_span]:text-brand-300" : ""}>
              <Breadcrumbs trail={trail} />
            </div>
          ) : null}

          <div className={`mt-6 gap-10 ${aside ? "lg:grid lg:grid-cols-[1.4fr_1fr]" : ""}`}>
            <div className="max-w-3xl">
              {eyebrow ? (
                <p
                  className={`mb-3 text-xs font-semibold uppercase tracking-[0.16em] ${
                    inverted ? "text-brand-200" : "text-brand-600"
                  }`}
                >
                  {eyebrow}
                </p>
              ) : null}
              <h1
                className={`text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${
                  inverted ? "text-white" : ""
                }`}
              >
                {title}
              </h1>
              {intro ? (
                <p
                  className={`mt-5 max-w-2xl text-lg leading-relaxed ${
                    inverted ? "text-brand-100" : "text-ink-500"
                  }`}
                >
                  {intro}
                </p>
              ) : null}
              {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
            </div>
            {aside ? <div className="mt-8 lg:mt-0">{aside}</div> : null}
          </div>
        </div>
      </Container>
    </div>
  );
}

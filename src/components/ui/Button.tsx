import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type Variant = "primary" | "urgent" | "outline" | "ghost" | "light";
export type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white hover:bg-brand-800",
  urgent: "bg-urgent-600 text-white hover:bg-urgent-700",
  outline: "border border-brand-700 text-brand-800 hover:bg-brand-50",
  ghost: "text-brand-800 hover:bg-brand-50",
  light: "bg-white text-brand-800 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
}

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Fired before navigation - used for conversion tracking (PRD s40). */
  onClick?: () => void;
  target?: string;
  rel?: string;
  title?: string;
  "aria-label"?: string;
};

/**
 * Anchor-flavoured button. Uses next/link for internal paths and a plain anchor for
 * tel:/mailto:/external URLs - both branches keep onClick, so a tracked phone CTA still
 * reports its click.
 */
export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  target,
  rel,
  title,
  "aria-label": ariaLabel,
}: LinkButtonProps) {
  const shared = {
    className: classes(variant, size, className),
    onClick,
    target,
    rel,
    title,
    "aria-label": ariaLabel,
  };

  if (/^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a href={href} {...shared}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...shared}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
} & ComponentProps<"button">;

export function Button({ variant = "primary", size = "md", className, ...rest }: ButtonProps) {
  return <button className={classes(variant, size, className)} {...rest} />;
}

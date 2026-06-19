"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide " +
  "transition-all duration-200 ease-out focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 " +
  "active:scale-[0.98] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-sand text-background hover:shadow-sand hover:brightness-[1.05] hover:-translate-y-0.5",
  outline:
    "border border-line bg-white/[0.02] text-foreground backdrop-blur-sm hover:border-sand/60 hover:bg-white/[0.05] hover:-translate-y-0.5",
  ghost: "text-foreground/80 hover:text-foreground hover:bg-white/[0.05]",
  whatsapp: "bg-[#1FAE54] text-white hover:brightness-110 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  /** When set, renders a link instead of a <button>. */
  href?: string;
  /** Open href in a new tab (renders a plain <a>). */
  external?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "color">;

/**
 * Unified CTA. Renders:
 *  - a Next <Link> for internal hrefs,
 *  - a plain <a target=_blank> when `external`,
 *  - a <button> otherwise (passing through native button attributes).
 */
export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", className, children, icon, href, external, ...native },
  ref
) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {icon}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} {...native}>
      {icon}
      {children}
    </button>
  );
});

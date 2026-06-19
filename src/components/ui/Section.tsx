import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { AnimatedHeading } from "./AnimatedHeading";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds the faint top hairline used between most sections. */
  divider?: boolean;
};

/** Page section with consistent vertical rhythm + scroll anchor offset. */
export function Section({ id, children, className, divider = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-20 sm:py-28 lg:py-36",
        divider && "border-t border-line",
        className
      )}
    >
      <div className="container-tts">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  /** Title split into lines for the line-by-line reveal. */
  titleLines: string[];
  intro?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  titleLines,
  intro,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-sand/70" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <AnimatedHeading
        as="h2"
        lines={titleLines}
        className={cn(
          "mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-tightest text-foreground sm:text-4xl lg:text-5xl",
          titleClassName
        )}
      />
      {intro ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-6 text-base leading-relaxed text-muted sm:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

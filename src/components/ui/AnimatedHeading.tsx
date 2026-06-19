"use client";

import { type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { lineReveal, inViewOnce, EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  /** Each entry is one visual line, revealed in sequence (text or rich node). */
  lines: ReactNode[];
  className?: string;
  /** Render tag for semantics (h1, h2, ...). */
  as?: ElementType;
  /** Stagger between lines (seconds). */
  stagger?: number;
};

/**
 * Cinematic heading where each line is clipped and rises into place,
 * one after another. Falls back to static text under reduced-motion.
 */
export function AnimatedHeading({
  lines,
  className,
  as: Tag = "h2",
  stagger = 0.12,
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            variants={lineReveal}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            transition={{ delay: i * stagger, duration: 0.8, ease: EASE_OUT }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Inline helper to wrap a word in the sand gradient inside a line. */
export function Accent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-gradient-sand", className)}>{children}</span>;
}

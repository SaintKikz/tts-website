"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before this element animates in (seconds). */
  delay?: number;
  variants?: Variants;
  as?: "div" | "section" | "li" | "article" | "span";
};

/** Single element that rises + fades in when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  // Cast to a concrete motion component: all supported `as` values share the
  // same (div-like) prop shape, which keeps MotionProps correctly typed.
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "section";
};

/**
 * Parent that staggers the entrance of its `Reveal`/motion children.
 * Children should use `variants={fadeUp}` (the default) to inherit timing.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0.05,
  as = "div",
}: RevealGroupProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      {children}
    </MotionTag>
  );
}

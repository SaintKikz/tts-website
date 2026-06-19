"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Animated count-up that fires once when scrolled into view. */
export function Counter({ to, prefix = "", suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 55,
    damping: 18,
  });

  useEffect(() => {
    if (reduce) return;
    if (inView) motionValue.set(to);
  }, [inView, to, motionValue, reduce]);

  useEffect(() => {
    if (reduce) return;
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [spring, prefix, suffix, reduce]);

  return (
    <span ref={ref} className={className}>
      {reduce ? `${prefix}${to}${suffix}` : `${prefix}0${suffix}`}
    </span>
  );
}

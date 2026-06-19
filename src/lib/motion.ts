import type { Variants, Transition } from "framer-motion";

/**
 * Centralized motion presets so every animation across the site shares the
 * same rhythm and easing (UX rule: motion-consistency).
 *
 * NOTE: Components should still wrap these with `useReducedMotion()` and fall
 * back to a no-op when the user prefers reduced motion.
 */

export const EASE_OUT: Transition["ease"] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: Transition["ease"] = [0.65, 0, 0.35, 1];

/** Standard "rise + fade" used by scroll reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Parent container that staggers its children (cards, list items). */
export const staggerContainer = (stagger = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Per-line heading reveal (clip + rise), used by AnimatedHeading. */
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

/** Shared viewport config: animate once when ~25% is on screen. */
export const inViewOnce = { once: true, amount: 0.25 } as const;

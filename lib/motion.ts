import type { Variants } from "motion/react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Subtle, single entrance. Opacity-led with a small lift. No blur, no big travel.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

// Gentle, slow stagger for a section's own children (not a spectacle).
export const staggerParent = (stagger = 0.06): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

export const inViewport = { once: true, amount: 0.3 } as const;

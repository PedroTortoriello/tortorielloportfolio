"use client";

import { MotionConfig } from "motion/react";

// Honors prefers-reduced-motion globally: Framer Motion drops transform/layout
// animations and keeps simple opacity for users who ask for reduced motion.
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

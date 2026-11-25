"use client";

import { LazyMotion, MotionConfig } from "motion/react";

// The animation features load in their own chunk, after the page (lib/motion-features.ts);
// components use the light `m` elements. MotionConfig honors prefers-reduced-motion:
// transform and layout animations drop, simple opacity stays.
const features = () => import("@/lib/motion-features").then((r) => r.domMax);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={features}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

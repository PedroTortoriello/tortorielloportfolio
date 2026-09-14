"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT, inViewport } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
};

/**
 * One subtle fade-up the first time a block enters view. Content is always in
 * the DOM (SEO/crawler safe); only a small opacity+lift is animated.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewport}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
}

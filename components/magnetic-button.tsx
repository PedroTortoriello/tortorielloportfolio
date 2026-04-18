"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const classes =
    variant === "primary"
      ? "border-[var(--accent)] bg-[var(--accent)] text-black shadow-[0_12px_28px_rgba(38,245,162,0.18)]"
      : "border-[rgba(255,255,255,0.14)] bg-black/20 text-[var(--text-primary)] shadow-[0_12px_28px_rgba(0,0,0,0.16)]";

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-flex"
      data-cursor="magnetic"
    >
      <Link
        href={href}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-lg border px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:scale-[1.015] active:scale-[0.985] ${classes}`}
      >
        <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.24),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative">{children}</span>
        <motion.span
          className="relative text-base"
          initial={false}
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          -&gt;
        </motion.span>
      </Link>
    </motion.div>
  );
}

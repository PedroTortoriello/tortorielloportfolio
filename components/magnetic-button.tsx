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
      ? "border-[rgba(212,175,55,0.22)] bg-[linear-gradient(135deg,rgba(241,209,122,0.96),rgba(212,175,55,0.9))] text-[#11110d] shadow-[0_10px_40px_rgba(212,175,55,0.22)]"
      : "border-[rgba(255,255,255,0.12)] bg-white/[0.03] text-[var(--text-primary)] shadow-[0_10px_40px_rgba(0,0,0,0.18)]";

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
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:scale-[1.015] active:scale-[0.985] ${classes}`}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.34),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="relative">{children}</span>
        <motion.span
          className="relative text-base"
          initial={false}
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  );
}

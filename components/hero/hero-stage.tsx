"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Publishes the pointer position as CSS variables on the hero:
// --cx/--cy (px, for the cursor light) and --px/--py (-1..1, for parallax).
export function HeroStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--cx", `${x - r.left}px`);
      el.style.setProperty("--cy", `${y - r.top}px`);
      el.style.setProperty("--px", (((x - r.left) / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--py", (((y - r.top) / r.height) * 2 - 1).toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className={className}>
      {children}
    </section>
  );
}

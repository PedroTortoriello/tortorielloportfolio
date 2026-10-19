"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { REDUCE } from "@/lib/motion";

// Publishes the pointer as CSS variables on the hero: --cx/--cy (px, for the
// crosshair and the light) and --px/--py (-1..1, for the depth layers), and
// writes the crosshair readout. Mouse only; nothing under reduced motion.
export function HeroStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia(REDUCE).matches) return;
    const rx = el.querySelector<HTMLElement>("[data-cx]");
    const ry = el.querySelector<HTMLElement>("[data-cy]");
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const lx = x - r.left;
      const ly = y - r.top;
      el.style.setProperty("--cx", `${lx}px`);
      el.style.setProperty("--cy", `${ly}px`);
      el.style.setProperty("--px", ((lx / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--py", ((ly / r.height) * 2 - 1).toFixed(3));
      if (rx) rx.textContent = String(Math.round(lx)).padStart(4, "0");
      if (ry) ry.textContent = String(Math.round(ly)).padStart(4, "0");
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      el.dataset.pointer = "";
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => delete el.dataset.pointer;
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" data-station="00" data-station-label="Início" className={`group/stage ${className}`}>
      {children}
    </section>
  );
}

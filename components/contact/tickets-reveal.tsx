"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/motion";

// The tickets land once the headline's lines have started to rise: tossed in
// from a little higher, spinning, each settling with an overshoot. Reduced
// motion, no JS, or a reload with the finale already in view: they are just there.
export function TicketsReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let revert = () => {};
    loadGsap().then(({ gsap }) => {
      const el = ref.current;
      if (cancelled || !el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) return;
        // yPercent, scale and rotation only: x/y belong to the cursor field.
        gsap.from(el.children, {
          autoAlpha: 0,
          scale: 0.35,
          yPercent: -80,
          rotation: "random(-45, 45)",
          duration: 1.1,
          ease: "back.out(1.7)",
          stagger: { each: 0.07, from: "random" },
          delay: 0.45,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={className}>
      {children}
    </div>
  );
}

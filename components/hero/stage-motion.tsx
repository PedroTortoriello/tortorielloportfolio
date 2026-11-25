"use client";

import { useEffect } from "react";
import { loadGsap } from "@/lib/motion";

// Hero → intro: the headline lifts away, the orb steps aside (desktop) or dims
// behind the text (phones) while the intro arrives, then fades as the stage ends.
// From 768px it shrinks toward the bottom-right corner on its way out: the corner
// where it comes back as the narrator (orb.tsx).
export function StageMotion() {
  useEffect(() => {
    let cancelled = false;
    let revert = () => {};
    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 1024px)",
          corner: "(min-width: 768px)", // the companion's media query (stage.module.css)
        },
        (ctx) => {
          const { motion, wide, corner } = ctx.conditions as {
            motion: boolean;
            wide: boolean;
            corner: boolean;
          };
          if (!motion) return;
          gsap.to("[data-hero-copy]", {
            yPercent: -22,
            opacity: 0, // not autoAlpha: visibility:hidden would drop the page's only h1 from the a11y tree
            ease: "none",
            scrollTrigger: {
              trigger: "#top",
              start: "top top",
              end: "bottom 30%",
              scrub: true,
            },
          });
          gsap.fromTo(
            "[data-orb-move]",
            { scale: 1, xPercent: 0, yPercent: 0 },
            {
              ...(wide ? { scale: 0.56, xPercent: 23, yPercent: 3 } : { scale: 0.8, yPercent: -4 }),
              ease: "none",
              scrollTrigger: {
                trigger: "#intro",
                start: "top bottom",
                end: "top 15%",
                scrub: true,
              },
            },
          );
          if (!wide)
            gsap.to("[data-orb-dim]", {
              autoAlpha: 0.32,
              ease: "none",
              scrollTrigger: {
                trigger: "#intro",
                start: "top bottom",
                end: "top 35%",
                scrub: true,
              },
            });
          gsap.to("[data-orb-out]", {
            autoAlpha: 0,
            ...(corner ? { scale: 0.45, transformOrigin: "100% 100%" } : {}),
            ease: "none",
            scrollTrigger: {
              trigger: "#intro",
              start: "bottom 98%",
              end: "bottom 45%",
              scrub: true,
            },
          });
        },
      );
      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return null;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { DUR, EASE, REDUCE, delayOf, loadGsap } from "@/lib/motion";

// The one place where scroll-linked motion is wired. Server components opt in
// with data attributes and never import GSAP themselves:
//   data-reveal              rise + fade when it enters ("rule": a hairline draws from the left)
//   data-stagger             its direct children rise one after another
//   data-title               title-frame cut: the lines slide up behind a mask
//   data-draw                `.draw` strokes inside draw in (`.fade-edge` fade after);
//                            data-draw="scrub" ties the drawing to the scroll
//   data-print               [data-line] children land one by one with a bloom
//   data-power               console power-on: opens from a centre band
//   data-parallax="-0.12"    drifts against the scroll (fraction of its own height)
//   data-exit                fades and lifts while its section leaves the top (from 1024px)
//   data-loop                CSS loops inside run only while it is on screen
// The markup's default is the finished state: reduced motion and no-JS keep it,
// and anything already on screen when this runs is left alone (no flash on reload).
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    const root = document.documentElement;

    loadGsap().then(({ gsap, ScrollTrigger, SplitText }) => {
      if (cancelled) return;
      const all = <T extends HTMLElement = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
      const onScreen = (el: Element) => {
        const r = el.getBoundingClientRect();
        return r.top < innerHeight && r.bottom > 0;
      };
      const once = (el: Element, start = "top 86%") => ({ trigger: el, start, once: true });

      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: REDUCE, wide: "(min-width: 1024px)" }, (ctx) => {
        const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };

        all("[data-loop]").forEach((el) =>
          ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", toggleClass: "in-view" }),
        );
        if (!motion) return;

        all("[data-reveal]").forEach((el) => {
          if (onScreen(el)) return;
          if (el.dataset.reveal === "rule") {
            gsap.from(el, { scaleX: 0, transformOrigin: "0% 50%", duration: DUR.cine, scrollTrigger: once(el) });
            return;
          }
          gsap.from(el, { autoAlpha: 0, y: 28, duration: DUR.focal, delay: delayOf(el), scrollTrigger: once(el) });
        });

        all("[data-stagger]").forEach((el) => {
          if (onScreen(el)) return;
          const items = Array.from(el.children);
          gsap.from(items, {
            autoAlpha: 0,
            y: 22,
            duration: DUR.focal,
            stagger: Math.min(0.08, 0.6 / Math.max(items.length, 1)),
            delay: delayOf(el),
            scrollTrigger: once(el),
          });
        });

        all("[data-title]").forEach((el) => {
          if (onScreen(el)) return;
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 112,
                duration: DUR.cine,
                ease: EASE.out,
                stagger: 0.09,
                delay: delayOf(el),
                scrollTrigger: once(el, "top 88%"),
              }),
          });
        });

        all("[data-draw]").forEach((el) => {
          const strokes = el.querySelectorAll(".draw");
          const fades = el.querySelectorAll(".fade-edge");
          if (el.dataset.draw === "scrub") {
            gsap.fromTo(
              strokes,
              { drawSVG: "0%" },
              {
                drawSVG: "100%",
                ease: "none",
                scrollTrigger: { trigger: el, start: el.dataset.start ?? "top 75%", end: el.dataset.end ?? "bottom 70%", scrub: 0.6 },
              },
            );
            return;
          }
          if (onScreen(el)) return;
          const tl = gsap.timeline({ scrollTrigger: once(el, "top 82%"), delay: delayOf(el) });
          if (strokes.length) tl.from(strokes, { drawSVG: "0%", duration: 1.4, ease: EASE.inOut, stagger: 0.05 });
          if (fades.length) tl.from(fades, { autoAlpha: 0, duration: 0.8, stagger: 0.04 }, strokes.length ? "-=0.8" : 0);
        });

        all("[data-print]").forEach((el) => {
          if (onScreen(el)) return;
          const lines = el.querySelectorAll<HTMLElement>("[data-line]");
          gsap.set(lines, { autoAlpha: 0 });
          const tl = gsap.timeline({ delay: delayOf(el) + 0.2, scrollTrigger: once(el, "top 80%") });
          lines.forEach((l, i) => tl.set(l, { autoAlpha: 1, onComplete: () => l.classList.add("bloom") }, i * 0.14));
        });

        all("[data-power]").forEach((el) => {
          if (onScreen(el)) return;
          gsap.fromTo(
            el,
            { clipPath: "inset(48% 0% 48% 0%)", autoAlpha: 0.25 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              autoAlpha: 1,
              duration: DUR.cine,
              ease: EASE.out,
              delay: delayOf(el),
              scrollTrigger: once(el, "top 82%"),
              clearProps: "clipPath",
            },
          );
        });

        all("[data-parallax]").forEach((el) => {
          const s = parseFloat(el.dataset.parallax ?? "") || -0.1;
          gsap.fromTo(
            el,
            { yPercent: -s * 50 },
            { yPercent: s * 50, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        // Only where the section fits the screen: on phones the hero is taller
        // than the viewport and would dim copy that is still being read.
        if (wide) all("[data-exit]").forEach((el) => {
          const section = el.closest("section") ?? el;
          gsap.to(el, {
            y: () => -innerHeight * (parseFloat(el.dataset.exit ?? "") || 0.12),
            autoAlpha: 0.15,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
          });
        });
      });

      root.classList.add("motion-ready");
      // Trigger positions depend on layout, which settles after fonts and images
      // and moves whenever the page height changes (an accordion opening).
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);
      let h = document.body.offsetHeight;
      let timer = 0;
      const ro = new ResizeObserver(() => {
        if (document.body.offsetHeight === h) return;
        h = document.body.offsetHeight;
        clearTimeout(timer);
        timer = window.setTimeout(refresh, 200);
      });
      ro.observe(document.body);
      cleanup = () => {
        window.removeEventListener("load", refresh);
        ro.disconnect();
        clearTimeout(timer);
        mm.revert();
        root.classList.remove("motion-ready");
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname]);

  return null;
}

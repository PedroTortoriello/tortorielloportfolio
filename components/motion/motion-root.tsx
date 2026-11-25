"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { DUR, EASE, REDUCE, delayOf, getLenis, loadGsap, setLenis } from "@/lib/motion";
import { HTML_LANG, localeOf } from "@/lib/i18n/locale";
import { isStill } from "@/lib/still";

// The one place where scroll- and cursor-linked motion is wired. Server
// components opt in with data attributes and never import GSAP themselves:
//   data-reveal              rise + fade when it enters ("rule": a hairline draws from the left)
//   data-stagger             its direct children rise one after another
//   data-split="lines|words|chars"   masked text reveal (data-title is an alias for lines)
//   data-scrub-words         each word lights up as the scroll passes it
//   data-mask                clip reveal from the bottom; a [data-mask-img] child zooms out inside it
//   data-parallax="-0.12"    drifts against the scroll (fraction of its own height)
//   data-draw                `.draw` strokes inside draw in
//   data-print               [data-line] children land one by one
//   data-magnetic="0.3"      pulled toward the cursor (fine pointers only)
//   data-cursor-field        [data-depth="0.6"] children drift with the cursor inside it
//   data-chip-area           a [data-chip] child follows the cursor while it is inside
// The markup's default is the finished state: reduced motion and no-JS keep it,
// and anything already on screen when this runs is left alone (no flash on reload).
export function MotionRoot() {
  const pathname = usePathname();

  // Lenis lives for the whole visit; ScrollTrigger reads its position.
  useEffect(() => {
    if (matchMedia(REDUCE).matches) return;
    let cancelled = false;
    let stop = () => {};
    Promise.all([loadGsap(), import("lenis")]).then(([{ gsap, ScrollTrigger }, { default: Lenis }]) => {
      if (cancelled) return;
      // horizontal-dominant wheel input stays native, so the system map scrolls sideways
      const lenis = new Lenis({
        lerp: 0.09,
        wheelMultiplier: 0.95,
        autoRaf: false,
        virtualScroll: ({ deltaX, deltaY }) => Math.abs(deltaX) <= Math.abs(deltaY),
      });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);

      // --scroll-v on <html>: the scroll speed, smoothed and clamped to -1..1, easing back to 0 at rest.
      // Cover media marked data-velocity lean with it (globals.css). Written only while it changes, and
      // held at 0 on touch and under html.still, where nothing reads it.
      const root = document.documentElement;
      const fine = matchMedia("(hover: hover) and (pointer: fine)");
      let v = 0;
      let shown = "0";
      const velocity = (_time: number, dt: number) => {
        const speed = (lenis.velocity * 16.7) / Math.max(dt, 1); // px per 60 Hz frame
        // a steady wheel scroll runs ~15 px per frame here, so it leans about halfway; a fling hits the cap
        const target = fine.matches && !isStill() ? Math.max(-1, Math.min(1, speed / 30)) : 0;
        v += (target - v) * (1 - 0.86 ** (dt / 16.7));
        const next = Math.abs(v) < 0.002 ? "0" : v.toFixed(3);
        if (next !== shown) root.style.setProperty("--scroll-v", (shown = next));
      };
      gsap.ticker.add(velocity);

      stop = () => {
        gsap.ticker.remove(raf);
        gsap.ticker.remove(velocity);
        root.style.removeProperty("--scroll-v");
        lenis.destroy();
        setLenis(null);
      };
    });
    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  // A client-side navigation: stop the old page's ease and take the scroll Next
  // just set (a layout effect, so it lands before Lenis's next frame puts the
  // old offset back), and size Lenis to the new page.
  useLayoutEffect(() => {
    const l = getLenis();
    // stop()/start() run Lenis's reset: the old page's ease dies and Lenis takes the scroll Next set
    l?.stop();
    l?.start();
    l?.resize();
  }, [pathname]);

  // /pt and the landing-page area are Portuguese; the <head> script sets it before first paint.
  useEffect(() => {
    document.documentElement.lang = pathname.startsWith("/landing-pages") ? HTML_LANG.pt : HTML_LANG[localeOf(pathname)];
  }, [pathname]);

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
      const once = (el: Element, start = "top 86%") => ({
        trigger: el,
        start,
        once: true,
      });

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          fine: "(hover: hover) and (pointer: fine)",
        },
        (ctx) => {
          const { motion, fine } = ctx.conditions as {
            motion: boolean;
            fine: boolean;
          };
          if (!motion) return;
          // Listeners added here belong to this context: removed whenever it reverts
          // (a media query flips, or the route changes).
          const off: Array<() => void> = [];
          const listen = <K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
            el.addEventListener(type, fn, { passive: true });
            off.push(() => el.removeEventListener(type, fn));
          };

          // Reveals fade with opacity, never visibility: content waiting below the
          // fold stays focusable and in the accessibility tree. A control that gets
          // focus before its reveal has played shows at once.
          all("[data-reveal]").forEach((el) => {
            if (onScreen(el)) return;
            if (el.dataset.reveal === "rule") {
              gsap.from(el, {
                scaleX: 0,
                transformOrigin: "0% 50%",
                duration: DUR.cine,
                ease: EASE.inOut,
                scrollTrigger: once(el),
              });
              return;
            }
            gsap.from(el, {
              opacity: 0,
              y: 32,
              duration: DUR.focal,
              delay: delayOf(el),
              scrollTrigger: once(el),
            });
          });
          listen(root, "focusin", (e) => {
            const host = (e.target as Element).closest("[data-reveal], [data-stagger] > *");
            if (host) gsap.getTweensOf(host).forEach((t) => t.progress(1));
          });

          // The contact orbit's star only travels while the finale is on screen.
          const contact = document.getElementById("contact");
          if (contact)
            ScrollTrigger.create({
              trigger: contact,
              start: "top bottom",
              end: "bottom top",
              toggleClass: { targets: contact, className: "orbit-live" },
            });

          all("[data-stagger]").forEach((el) => {
            if (onScreen(el)) return;
            const items = Array.from(el.children);
            gsap.from(items, {
              opacity: 0,
              y: 26,
              duration: DUR.focal,
              stagger: Math.min(0.09, 0.7 / Math.max(items.length, 1)),
              delay: delayOf(el),
              scrollTrigger: once(el),
            });
          });

          all("[data-split], [data-title]").forEach((el) => {
            if (onScreen(el)) return;
            const type = (el.dataset.split || "lines") as "lines" | "words" | "chars";
            const kind = type === "chars" ? "chars" : type === "words" ? "words" : "lines";
            SplitText.create(el, {
              type: kind === "chars" ? "words,chars" : kind,
              mask: kind === "chars" ? "words" : kind,
              // finished lines are div.split-line inside div.split-line-mask, so CSS can
              // style them without also catching the words SplitText measures first
              linesClass: "split-line",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self[kind], {
                  yPercent: 115,
                  duration: kind === "chars" ? DUR.focal : DUR.cine,
                  ease: EASE.out,
                  stagger: kind === "chars" ? 0.025 : kind === "words" ? 0.05 : 0.1,
                  delay: delayOf(el),
                  scrollTrigger: once(el, "top 88%"),
                }),
            });
          });

          all("[data-scrub-words]").forEach((el) => {
            SplitText.create(el, {
              type: "words",
              autoSplit: true,
              onSplit: (self) =>
                gsap.fromTo(
                  self.words,
                  { opacity: 0.16 },
                  {
                    opacity: 1,
                    ease: "none",
                    stagger: 0.08,
                    scrollTrigger: {
                      trigger: el,
                      start: el.dataset.start ?? "top 82%",
                      end: el.dataset.end ?? "bottom 48%",
                      scrub: 0.4,
                    },
                  },
                ),
            });
          });

          all("[data-mask]").forEach((el) => {
            if (onScreen(el)) return;
            const img = el.querySelector("[data-mask-img]");
            const tl = gsap.timeline({
              delay: delayOf(el),
              scrollTrigger: once(el, "top 88%"),
            });
            tl.fromTo(
              el,
              { clipPath: "inset(100% 0% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: DUR.cine,
                ease: EASE.inOut,
                clearProps: "clipPath",
              },
            );
            if (img) tl.from(img, { scale: 1.28, duration: 1.9, ease: EASE.out }, 0);
          });

          all("[data-parallax]").forEach((el) => {
            const s = parseFloat(el.dataset.parallax ?? "") || -0.1;
            gsap.fromTo(
              el,
              { yPercent: -s * 50 },
              {
                yPercent: s * 50,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });

          all("[data-draw]").forEach((el) => {
            if (onScreen(el)) return;
            const strokes = el.querySelectorAll(".draw");
            if (strokes.length)
              gsap.from(strokes, {
                drawSVG: "0%",
                duration: 1.4,
                ease: EASE.inOut,
                stagger: 0.05,
                scrollTrigger: once(el, "top 82%"),
              });
          });

          all("[data-print]").forEach((el) => {
            if (onScreen(el)) return;
            const lines = el.querySelectorAll<HTMLElement>("[data-line]");
            gsap.from(lines, {
              opacity: 0,
              duration: 0.01,
              stagger: 0.12,
              delay: delayOf(el) + 0.2,
              scrollTrigger: once(el, "top 80%"),
            });
          });

          // Pointer-only effects below; everything above also runs on touch.
          if (fine) wirePointer();
          return () => off.splice(0).forEach((f) => f());

          function wirePointer() {
            all("[data-magnetic]").forEach((el) => {
              const k = parseFloat(el.dataset.magnetic ?? "") || 0.3;
              const xTo = gsap.quickTo(el, "x", {
                duration: 0.7,
                ease: "elastic.out(1, 0.45)",
              });
              const yTo = gsap.quickTo(el, "y", {
                duration: 0.7,
                ease: "elastic.out(1, 0.45)",
              });
              listen(el, "pointermove", (e) => {
                const r = el.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * k);
                yTo((e.clientY - (r.top + r.height / 2)) * k);
              });
              listen(el, "pointerleave", () => {
                xTo(0);
                yTo(0);
              });
            });

            all("[data-cursor-field]").forEach((field) => {
              const items = Array.from(field.querySelectorAll<HTMLElement>("[data-depth]")).map((el) => ({
                d: parseFloat(el.dataset.depth ?? "") || 0.5,
                x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3.out" }),
                y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3.out" }),
              }));
              listen(field, "pointermove", (e) => {
                const r = field.getBoundingClientRect();
                const nx = (e.clientX - r.left) / r.width - 0.5;
                const ny = (e.clientY - r.top) / r.height - 0.5;
                items.forEach((i) => {
                  i.x(nx * 90 * i.d);
                  i.y(ny * 70 * i.d);
                });
              });
              listen(field, "pointerleave", () =>
                items.forEach((i) => {
                  i.x(0);
                  i.y(0);
                }),
              );
            });

            all("[data-chip-area]").forEach((area) => {
              const chip = area.querySelector<HTMLElement>("[data-chip]");
              if (!chip) return;
              gsap.set(chip, {
                xPercent: -50,
                yPercent: -50,
                scale: 0.4,
                autoAlpha: 0,
              });
              const xTo = gsap.quickTo(chip, "x", {
                duration: 0.5,
                ease: "power3.out",
              });
              const yTo = gsap.quickTo(chip, "y", {
                duration: 0.5,
                ease: "power3.out",
              });
              const at = (e: PointerEvent) => {
                const r = area.getBoundingClientRect();
                return [e.clientX - r.left, e.clientY - r.top] as const;
              };
              listen(area, "pointerenter", (e) => {
                const [x, y] = at(e);
                gsap.set(chip, { x, y });
                gsap.to(chip, {
                  scale: 1,
                  autoAlpha: 1,
                  duration: 0.4,
                  ease: EASE.out,
                  overwrite: "auto",
                });
              });
              listen(area, "pointermove", (e) => {
                const [x, y] = at(e);
                xTo(x);
                yTo(y);
              });
              const hide = () =>
                gsap.to(chip, {
                  scale: 0.4,
                  autoAlpha: 0,
                  duration: 0.3,
                  overwrite: "auto",
                });
              listen(area, "pointerleave", hide);
              // Escape dismisses it until the pointer leaves and comes back (WCAG 1.4.13)
              listen(root, "keydown", (e) => e.key === "Escape" && hide());
            });
          }
        },
      );

      root.classList.add("motion-ready");
      // Trigger positions depend on layout, which settles after fonts and images
      // and moves whenever the page height changes.
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
        mm.revert(); // also removes the listeners its contexts added
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

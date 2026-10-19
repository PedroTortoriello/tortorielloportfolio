// Motion system. One vocabulary for every animated thing on the site:
// - CSS keyframes: the front-wall boot (first paint, no JS) and hover states.
// - GSAP + ScrollTrigger: everything tied to the scroll (MotionRoot, the rail).
// - Motion (motion/react): component state (nav underline, menu, copy feedback).
// GSAP is imported on demand, after hydration, so it never blocks first paint.

export const DUR = { fast: 0.18, base: 0.32, slow: 0.6, focal: 0.9, cine: 1.2 } as const;

// expo.out ≈ cubic-bezier(0.16, 1, 0.3, 1), the CSS --ease-out.
export const EASE = { out: "expo.out", inOut: "power3.inOut", cut: "power4.out" } as const;

// For motion/react, which takes bezier arrays.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const REDUCE = "(prefers-reduced-motion: reduce)";

async function load() {
  const [{ gsap }, { ScrollTrigger }, { SplitText }, { DrawSVGPlugin }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/SplitText"),
    import("gsap/DrawSVGPlugin"),
  ]);
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
  gsap.defaults({ ease: EASE.out, duration: DUR.slow });
  return { gsap, ScrollTrigger, SplitText };
}

let loading: ReturnType<typeof load> | null = null;
export const loadGsap = () => (loading ??= load());
export type Gsap = Awaited<ReturnType<typeof load>>;

// "120ms" / "0.12s" from an element's --d custom property, in seconds.
export function delayOf(el: Element) {
  const v = getComputedStyle(el).getPropertyValue("--d").trim();
  if (!v) return 0;
  return v.endsWith("ms") ? parseFloat(v) / 1000 : parseFloat(v) || 0;
}

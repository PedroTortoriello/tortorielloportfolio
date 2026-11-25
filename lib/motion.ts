// Motion system. One vocabulary for every animated thing on the site:
// - CSS keyframes: first-paint entrances (no JS needed) and hover states.
// - GSAP + ScrollTrigger + SplitText: everything tied to the scroll or the cursor (MotionRoot).
// - Lenis: the smooth scroll that ScrollTrigger reads (desktop and touch, off for reduced motion).
// - Motion (motion/react): component state (dock indicator, copy feedback).
// GSAP and Lenis are imported on demand, after hydration, so they never block first paint.
import type Lenis from "lenis";

export const DUR = {
  fast: 0.18,
  base: 0.32,
  slow: 0.6,
  focal: 0.9,
  cine: 1.3,
} as const;

// expo.out ≈ cubic-bezier(0.16, 1, 0.3, 1), the CSS --ease-out.
export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
  cut: "power4.out",
} as const;

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

// The one Lenis instance (null when reduced motion is on or before it loads).
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

// Scroll to a section by id: smooth through Lenis when it runs, native otherwise.
// Returns false when the id is not on this page (the caller lets the link navigate).
export function scrollToId(id: string) {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target === null) return false;
  if (lenis) {
    // Lenis ignores scroll-margin: pass it as the offset (sections without one get 0)
    const offset = target === 0 ? 0 : -(parseFloat(getComputedStyle(target).scrollMarginTop) || 0);
    lenis.scrollTo(target, {
      offset,
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  } else if (target === 0) {
    window.scrollTo({ top: 0 });
  } else {
    target.scrollIntoView();
  }
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
  // Move focus for keyboard and screen-reader users without a second scroll.
  // "top" focuses the page content: the dock that asked for it hides once the hero is back.
  const focusEl = target === 0 ? document.getElementById("content") : target;
  if (focusEl) {
    if (!focusEl.hasAttribute("tabindex")) focusEl.setAttribute("tabindex", "-1");
    focusEl.focus({ preventScroll: true });
  }
  return true;
}

// "120ms" / "0.12s" from an element's --d custom property, in seconds.
export function delayOf(el: Element) {
  const v = getComputedStyle(el).getPropertyValue("--d").trim();
  if (!v) return 0;
  return v.endsWith("ms") ? parseFloat(v) / 1000 : parseFloat(v) || 0;
}

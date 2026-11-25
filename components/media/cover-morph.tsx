"use client";

import { ViewTransition, useLayoutEffect, useRef, type ReactNode } from "react";

// The shared element of the case transition. A work card, a /work row, the next-case poster and the
// case hero all name their cover `cover-<slug>`, so a navigation between two of them morphs the one
// cover into the other (experimental.viewTransition in next.config.ts, timing in globals.css). It only
// morphs when both covers are on screen ("share"); otherwise the cover goes and comes with its page.
// Other props (data-mask-img, className) land on the box, which is the element that morphs.
export function CoverMorph({ slug, children, ...box }: { slug: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Landing through the morph, an entrance inside the box (the case hero's CSS reveal) would play a
  // second time within it. React names the box just before the browser captures the new page, so the
  // entrance is finished right then; a box that is not morphing is never named and keeps it.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mo = new MutationObserver(() => {
      if (!el.style.viewTransitionName) return;
      el.getAnimations({ subtree: true }).forEach((a) => a.finish());
      mo.disconnect();
    });
    mo.observe(el, { attributeFilter: ["style"] });
    // the naming happens in the commit that mounts the box, or not at all
    const t = setTimeout(() => mo.disconnect(), 1500);
    return () => {
      clearTimeout(t);
      mo.disconnect();
    };
  }, []);

  return (
    <ViewTransition name={`cover-${slug}`} share="morph" default="none">
      <div ref={ref} {...box}>
        {children}
      </div>
    </ViewTransition>
  );
}

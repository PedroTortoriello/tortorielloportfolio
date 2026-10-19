"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One observer for every [data-reveal] block, one for running loops only while
// they are on screen, one pointer listener for every .edge-light surface, and
// Escape-to-dismiss for tooltips. Content stays visible until this opts it in.
export function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const root = document.documentElement;

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            reveal.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    // Loops (packets on rails and connectors) pause again when scrolled away.
    const loops = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle("in-view", e.isIntersecting);
    });

    const watch = (el: HTMLElement, initial: boolean) => {
      if (el.querySelector(".flow-pulse, .conn-dot")) loops.observe(el);
      if (el.classList.contains("is-in")) return;
      const r = el.getBoundingClientRect();
      // Already on screen at start: reveal without hiding first (no flash on reload).
      if (initial && r.top < window.innerHeight * 0.92 && r.bottom > 0) el.classList.add("is-in");
      else reveal.observe(el);
    };
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => watch(el, true));

    // Nodes React mounts later (remounts, client navigation) need observing too.
    const mo = new MutationObserver((records) => {
      for (const r of records)
        r.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          const found = n.matches("[data-reveal]") ? [n] : Array.from(n.querySelectorAll<HTMLElement>("[data-reveal]"));
          found.forEach((el) => watch(el, false));
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Only hide unrevealed blocks once everything that will reveal them exists.
    root.classList.add("reveal-ready");
    return () => {
      reveal.disconnect();
      loops.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      frame = 0;
      if (!last) return;
      const el = (last.target as Element | null)?.closest?.<HTMLElement>(".edge-light");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${last.clientX - r.left}px`);
      el.style.setProperty("--my", `${last.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    // WCAG 1.4.13: Escape hides the tooltip under the pointer or on the focused item.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const owners = new Set<Element>();
      document.querySelectorAll("[aria-describedby^='tip-']").forEach((b) => {
        const li = b.parentElement;
        if (li && (li.matches(":hover") || b === document.activeElement)) owners.add(li);
      });
      owners.forEach((li) => li.setAttribute("data-tip-dismissed", ""));
    };
    const onOut = (e: Event) => {
      const li = (e.target as Element | null)?.closest?.("[data-tip-dismissed]");
      if (li && !li.contains((e as PointerEvent).relatedTarget as Node | null)) li.removeAttribute("data-tip-dismissed");
    };
    const onBlur = (e: FocusEvent) => {
      (e.target as Element | null)?.parentElement?.removeAttribute?.("data-tip-dismissed");
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("focusout", onBlur);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("focusout", onBlur);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

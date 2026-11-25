"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/lib/i18n/client";
import { DUR, EASE, loadGsap } from "@/lib/motion";

const STAGGER = 0.06;
// Horizontal offsets (em) each letter snaps through as it rises: the signal locking in.
const JITTER = [0.06, -0.04, 0.02, 0];
const MODULES = { en: "MODULES", pt: "MÓDULOS" } as const;

// "SKILLS." and the stack readout: one tick per module, clustered by group.
// On enter it plays a calibration: the letters rise from a mask with a stepped
// jitter, the ticks fill in, and the violet period pops in last. The markup is
// the finished state, which no-JS and reduced motion keep.
export function SkillsHead({ id, counts }: { id: string; counts: number[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const total = counts.reduce((a, b) => a + b, 0);

  useEffect(() => {
    const root = ref.current;
    const letters = root?.querySelector<HTMLElement>("[data-letters]");
    if (!root || !letters) return;
    let cancelled = false;
    let revert = () => {};

    loadGsap().then(({ gsap, SplitText }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const r = root.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) return; // already in view: no replay, no flash
        const em = parseFloat(getComputedStyle(letters).fontSize);
        // Reverted with the matchMedia context (SplitText is context-aware).
        const { chars } = SplitText.create(letters, { type: "chars", aria: "none" });
        const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 85%", once: true } });
        tl.from(chars, { yPercent: 112, duration: DUR.focal, ease: EASE.out, stagger: STAGGER }, 0);
        chars.forEach((c, i) => {
          const dir = i % 2 ? -1 : 1;
          tl.to(c, { keyframes: { x: JITTER.map((v) => v * dir * em), easeEach: "steps(1)" }, duration: 0.32 }, i * STAGGER);
        });
        tl.from(root.querySelectorAll("[data-tick]"), { autoAlpha: 0, duration: 0.01, stagger: 0.02 }, 0.1);
        tl.from(
          root.querySelectorAll("[data-period]"),
          // origin: the glyph's centre inside its 0.8em line box
          { scale: 0, rotate: -90, duration: 0.7, ease: "back.out(2.6)", transformOrigin: "50% 81%" },
          chars.length * STAGGER + 0.4,
        );
      });
      revert = () => mm.revert();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      {/* Phones: 21.5vw fills ~90% of the width (the word is 3.79em wide); desktop: 13vw. */}
      <h2 id={id} className="font-tech text-[clamp(4.5rem,max(13vw,min(21.5vw,6.5rem)),12.5rem)] font-black leading-[0.8] text-ink">
        <span className="sr-only">Skills</span>
        {/* The S's side bearing is pulled back so its stem lines up with the columns. */}
        <span aria-hidden className="-ml-[0.035em] flex">
          <span data-letters className="overflow-y-clip">
            SKILLS
          </span>
          <span data-period className="text-violet">
            .
          </span>
        </span>
      </h2>

      <div aria-hidden className="md:mt-2 md:text-right">
        <p className="t-label">
          SYS / STACK — {String(total).padStart(2, "0")} {MODULES[locale]}
        </p>
        <span className="mt-3 flex items-end gap-2.5 md:justify-end">
          {counts.map((n, g) => (
            <span key={g} className="flex items-end gap-[3px]">
              {Array.from({ length: n }, (_, i) => (
                <span key={i} data-tick className={`w-px bg-line-strong ${i ? "h-2" : "h-3.5"}`} />
              ))}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

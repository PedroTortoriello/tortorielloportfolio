"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { loadGsap } from "@/lib/motion";
import { setActiveStation, useActiveStation } from "@/lib/stations";

type Station = { id: string; index: string; label: string; at: number };

// The mission trajectory as page furniture: a hairline under the header that
// fills with the scroll (every width) and, from 1400px, a fixed index rail on
// the left with one node per [data-station] section. ScrollTrigger drives both
// and publishes the active station for the header.
export function MissionRail() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [stations, setStations] = useState<Station[]>([]);
  const active = useActiveStation();

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    loadGsap().then(({ ScrollTrigger }) => {
      if (cancelled) return;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-station]"));
      const measure = () => {
        const max = ScrollTrigger.maxScroll(window) || 1;
        setStations(
          sections.map((s) => ({
            id: s.id,
            index: s.dataset.station ?? "",
            label: s.dataset.stationLabel ?? s.id,
            at: Math.min(1, Math.max(0, (s.getBoundingClientRect().top + window.scrollY - 64) / max)),
          })),
        );
      };
      const write = (p: number) => {
        bar.current?.style.setProperty("--p", p.toFixed(4));
        fill.current?.style.setProperty("--p", p.toFixed(4));
      };
      const progress = ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => write(self.progress), onRefresh: measure });
      const triggers = sections.map((s) =>
        ScrollTrigger.create({
          trigger: s,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActiveStation(s.id === "top" ? "" : s.id);
          },
        }),
      );
      write(progress.progress);
      measure();
      cleanup = () => {
        progress.kill();
        triggers.forEach((t) => t.kill());
        setActiveStation("");
      };
    });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={bar}
        aria-hidden
        className="mission-rail pointer-events-none fixed inset-x-0 top-16 z-[51] h-px origin-left bg-gradient-to-r from-blue/30 via-blue to-blue-bright [transform:scaleX(var(--p,0))]"
      />
      {stations.length > 1 ? (
        <nav aria-label="Índice da página" className="mission-rail fixed bottom-14 left-6 top-28 z-40 hidden w-8 min-[1400px]:block">
          <span aria-hidden className="absolute bottom-0 left-[3px] top-0 w-px bg-line" />
          <span ref={fill} aria-hidden className="absolute bottom-0 left-[3px] top-0 w-px origin-top bg-blue [transform:scaleY(var(--p,0))]" />
          <ol>
            {stations.map((s) => {
              const on = s.id === "top" ? active === "" : active === s.id;
              return (
                <li key={s.id} className="absolute left-0 -translate-y-1/2" style={{ top: `${s.at * 100}%` }}>
                  <a href={`#${s.id}`} aria-current={on ? "location" : undefined} className="group/st relative flex items-center gap-2 py-1 outline-offset-4">
                    <span
                      className={`block size-[7px] rounded-full border transition-[background-color,border-color,box-shadow] duration-300 ${
                        on ? "border-blue bg-blue shadow-[0_0_12px_rgb(94_158_255/0.85)]" : "border-line-strong bg-bg group-hover/st:border-blue"
                      }`}
                    />
                    <span className={`font-mono text-[0.625rem] tracking-[0.08em] tabular transition-colors ${on ? "text-blue" : "text-ink-faint"}`}>
                      {s.index}
                    </span>
                    <span className="pointer-events-none absolute left-9 whitespace-nowrap rounded-[4px] border border-line bg-surface px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink opacity-0 transition-opacity duration-200 group-hover/st:opacity-100 group-focus-visible/st:opacity-100">
                      {s.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}
    </>
  );
}

"use client";

import { useId, useState, type FocusEvent, type KeyboardEvent } from "react";
import { Glyph } from "@/components/ui/icons";
import { TechLogo } from "@/components/ui/tech-logo";
import type { Tech } from "@/lib/data";

function Reading({ t, live = false }: { t: Tech; live?: boolean }) {
  return (
    <>
      <p className={`text-[0.875rem] font-medium leading-5 text-ink ${live ? "bloom" : ""}`}>{t.name}</p>
      <p className="mt-1.5 max-w-[64ch] text-pretty text-[0.875rem] leading-6 text-ink-muted">{t.use}</p>
      <p className="mt-3 flex items-baseline gap-2.5">
        <span className="hud shrink-0">onde</span>
        <span className="font-mono text-[0.8125rem] leading-5 text-ink">{t.where.join(" · ")}</span>
      </p>
    </>
  );
}

// One layer of the stack map: a toolbar of toggle buttons (one Tab stop, arrows
// move inside) and a readout that reads the item under the pointer or focus,
// else the pinned one. The readout reserves the height of the layer's longest
// item (invisible copies in the same grid cell), so switching never moves the page.
export function LayerPicker({ title, items, cols = "" }: { title: string; items: Tech[]; cols?: string }) {
  const rid = useId();
  const [pinned, setPinned] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [focus, setFocus] = useState<number | null>(null);
  const shown = hover ?? focus ?? pinned;
  const home = focus ?? pinned; // roving tabindex: the button Tab lands on

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const n = items.length;
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    const next = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : step ? (home + step + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    e.currentTarget.querySelectorAll("button")[next]?.focus();
  }

  function onBlur(e: FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget)) setFocus(null);
  }

  return (
    <>
      <div
        role="toolbar"
        aria-label={`Tecnologias · ${title}`}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onMouseLeave={() => setHover(null)}
        className={`grid grid-cols-2 content-start gap-px p-1.5 md:grid-cols-3 ${cols}`}
      >
        {items.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-pressed={i === pinned}
            aria-controls={rid}
            tabIndex={i === home ? 0 : -1}
            onClick={() => setPinned(i)}
            onFocus={() => {
              // focus outranks a pointer left resting elsewhere (Tab or arrows into the list)
              setHover(null);
              setFocus(i);
            }}
            onMouseEnter={() => setHover(i)}
            className={`flex min-h-10 min-w-0 items-center gap-2.5 rounded-[5px] px-2.5 py-2 text-left text-[0.875rem] leading-snug transition-colors duration-200 sm:gap-3 ${
              i === shown ? "bg-elevated text-ink" : "text-ink-muted"
            }`}
          >
            <span aria-hidden className="grid size-5 shrink-0 place-items-center">
              {t.icon ? (
                <TechLogo src={t.icon} alt="" className={`size-4 transition-opacity duration-200 ${i === shown ? "opacity-100" : "opacity-60"}`} />
              ) : t.glyph ? (
                <Glyph name={t.glyph} className="size-4" />
              ) : null}
            </span>
            <span className="min-w-0 flex-1">{t.name}</span>
            {/* pinned: a lit node; the rest stay hollow. Touch has no hover, so
                on phones the row tint alone marks the pinned item. */}
            <span
              aria-hidden
              className={`hidden size-1.5 shrink-0 rounded-full transition-[background-color,box-shadow] duration-200 sm:block ${
                i === pinned ? "bg-blue shadow-[0_0_8px_rgb(94_158_255/0.8)]" : "ring-1 ring-inset ring-line-strong"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="grid rounded-b-[5px] border-t border-line bg-elevated/35 px-3.5 py-4">
        {items.map((t) => (
          <div key={t.name} aria-hidden className="invisible col-start-1 row-start-1">
            <Reading t={t} />
          </div>
        ))}
        <div id={rid} aria-live="polite" aria-atomic="true" className="col-start-1 row-start-1">
          <Reading key={shown} t={items[shown]} live />
        </div>
      </div>
    </>
  );
}

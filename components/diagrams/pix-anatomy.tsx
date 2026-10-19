"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { PixSegment } from "@/lib/pix";

// Code palette (sx-*), ordered so neighbouring fields never share a hue (nor two
// near blues side by side). The checksum is the one green: it makes the payload valid.
const hues = ["#d9e2ee", "#8db8ff", "#e6c07b", "#f0a988", "#7fc8ff", "#d9e2ee", "#e6c07b", "#8db8ff", "#f0a988"];
const hue = (s: PixSegment, i: number) => (s.id === "63" ? "#6ee7b0" : hues[i % hues.length]);

// The BR Code payload, field by field. Hover a field in the string, or hover /
// focus / tap a row, to see where it lives.
export function PixAnatomy({ segments }: { segments: PixSegment[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div>
      <p className="hud flex items-center justify-between gap-4">
        <span>payload BR Code · EMV</span>
        <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-green">
          <Check aria-hidden className="size-3" strokeWidth={2.5} /> CRC16 válido
        </span>
      </p>
      <p className="mt-3 break-all rounded-[6px] border border-line bg-bg/70 p-3.5 font-mono text-[0.8125rem] leading-[1.85]">
        <span className="sr-only">Payload: </span>
        {segments.map((s, i) => (
          <span
            key={s.id}
            onMouseEnter={() => setActive(s.id)}
            onMouseLeave={() => setActive(null)}
            className="rounded-[3px] transition-[background-color,opacity] duration-200"
            style={{
              color: hue(s, i),
              backgroundColor: active === s.id ? "rgb(94 158 255 / 0.18)" : "transparent",
              opacity: active && active !== s.id ? 0.3 : 1,
            }}
          >
            {s.raw}
          </span>
        ))}
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        {segments.map((s, i) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.id)}
                onBlur={() => setActive(null)}
                className={`flex min-h-11 w-full items-baseline gap-3 border-b py-2.5 text-left transition-colors duration-200 ${
                  on ? "border-line-strong text-ink" : "border-line-faint text-ink-muted"
                }`}
              >
                <span className="w-6 shrink-0 font-mono text-[0.72rem] tabular" style={{ color: hue(s, i) }}>
                  {s.id}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.875rem] font-medium">{s.name}</span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-faint">{s.hint}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

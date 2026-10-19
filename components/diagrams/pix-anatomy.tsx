"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { PixSegment } from "@/lib/pix";

const hues = ["#82aaff", "#46d9ff", "#a9c8ff", "#e6c07b", "#f4a97c", "#929dad", "#65e6a5", "#82aaff", "#46d9ff", "#65e6a5"];

// The BR Code payload, segment by segment. Hover a field (or focus a row)
// to see where it lives in the string.
export function PixAnatomy({ payload, segments }: { payload: string; segments: PixSegment[] }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div>
      <p className="hud flex items-center justify-between">
        <span>payload BR Code · EMV</span>
        <span className="inline-flex items-center gap-1 normal-case tracking-normal text-green">
          <Check aria-hidden className="size-3" strokeWidth={2.5} /> CRC16 válido
        </span>
      </p>
      <p className="mt-3 break-all rounded-lg border border-line bg-bg/70 p-3.5 font-mono text-[0.74rem] leading-[1.8]" aria-label={`Payload: ${payload}`}>
        {segments.map((s, i) => (
          <span
            key={s.id}
            onMouseEnter={() => setActive(s.id)}
            onMouseLeave={() => setActive(null)}
            className="rounded-[3px] transition-[background-color,opacity] duration-200"
            style={{
              color: hues[i % hues.length],
              backgroundColor: active === s.id ? "rgb(67 136 255 / 0.18)" : "transparent",
              opacity: active && active !== s.id ? 0.35 : 1,
            }}
          >
            {s.raw}
          </span>
        ))}
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        {segments.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onMouseEnter={() => setActive(s.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(s.id)}
              onBlur={() => setActive(null)}
              className={`flex w-full items-baseline gap-3 border-b border-line-faint py-2 text-left transition-colors ${active === s.id ? "text-ink" : "text-ink-muted"}`}
            >
              <span className="w-6 shrink-0 font-mono text-[0.7rem] tabular" style={{ color: hues[i % hues.length] }}>
                {s.id}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.82rem] font-medium">{s.name}</span>
                <span className="block text-[0.74rem] leading-snug text-ink-faint">{s.hint}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

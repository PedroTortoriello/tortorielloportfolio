"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "@/lib/i18n/client";
import { isSoundOn, onSoundChange, toggleSound } from "@/lib/sound";

const COPY = {
  en: { name: "Sound", on: "Sound on", off: "Turn on sound" },
  pt: { name: "Som", on: "Som ligado", off: "Ligar o som" },
} as const;

// Built like "Pause motion" beside it: a fixed name with aria-pressed for the state, and a glyph that shows
// it (waves while sound plays, a cross while it is muted). Measured in Chrome: the row is 1.8px too wide at
// 360px and fits from 362px, so it shows from 375px (8px or more to spare everywhere it appears). Narrower
// screens toggle sound from the command palette and the terminal.
export function SoundToggle() {
  const t = COPY[useLocale()];
  const on = useSyncExternalStore(onSoundChange, isSoundOn, () => false);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={t.name}
      title={on ? t.on : t.off}
      onClick={toggleSound}
      className="group relative -mx-2 hidden place-items-center px-2 py-3 min-[375px]:grid"
    >
      <svg aria-hidden viewBox="0 0 12 12" className="size-3 fill-current">
        <path d="M1 4.25h2.25L6.25 1.5v9L3.25 7.75H1z" />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          d={on ? "M8.1 4.4a2.4 2.4 0 0 1 0 3.2M9.6 2.9a4.2 4.2 0 0 1 0 6.2" : "M8.25 4.5l3 3M11.25 4.5l-3 3"}
        />
      </svg>
      <span
        aria-hidden
        className="absolute inset-x-2 bottom-2 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-x-100"
      />
    </button>
  );
}

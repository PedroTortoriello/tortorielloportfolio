"use client";

import { AnimatePresence, m } from "motion/react";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT } from "@/lib/motion";

// Copies the value and confirms in place: "Copy" flips to "Copied" with a lime
// check, and a polite live region says it aloud. A small mono chip inside a
// 44px hit area; the label keeps the width of the longer word, so nothing
// beside it moves. Without clipboard access it falls back to the mail client.
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 1800);
          } catch {
            window.location.href = `mailto:${value}`;
          }
        }}
        aria-label={label}
        className="group inline-flex h-11 shrink-0 items-center px-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] active:scale-[0.98]"
      >
        <span
          className={`inline-flex h-7 items-center overflow-hidden rounded-full border px-3 transition-[border-color,color] duration-200 ease-out ${
            copied ? "border-accent/50 text-ink" : "border-line-strong text-ink-muted group-hover:border-accent group-hover:text-accent"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={copied ? "done" : "idle"}
              aria-hidden
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              className="inline-flex items-center gap-2"
            >
              {copied ? <Check className="size-3 text-accent" strokeWidth={2.25} /> : <Copy className="size-3" strokeWidth={1.75} />}
              {/* "Copied": 6 mono glyphs of 1ch, each followed by 0.14em of tracking */}
              <span className="w-[calc(6ch+0.84em)] text-left">{copied ? "Copied" : "Copy"}</span>
            </m.span>
          </AnimatePresence>
        </span>
      </button>
      <span role="status" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </>
  );
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT } from "@/lib/motion";

// Copies the value and confirms in place: the label flips to "copiado" with a
// blue check (success), and a polite live region says it aloud. The label
// keeps a fixed width, so nothing beside it moves. Without clipboard access it
// falls back to opening the mail client.
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
        className={`inline-flex h-10 shrink-0 items-center overflow-hidden rounded-[5px] border px-3.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] transition-[border-color,background-color,color,transform] duration-200 ease-out active:scale-[0.98] ${
          copied ? "border-blue/60 bg-surface text-ink" : "border-line-strong bg-surface/60 text-ink-muted hover:border-blue/70 hover:bg-elevated hover:text-ink"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "done" : "idle"}
            aria-hidden
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="inline-flex items-center gap-2"
          >
            {copied ? <Check className="size-3.5 text-blue" strokeWidth={2} /> : <Copy className="size-3.5" strokeWidth={1.75} />}
            {/* 7 mono chars + 0.1em tracking each = 8.2ch */}
            <span className="w-[8.2ch] text-left">{copied ? "copiado" : "copiar"}</span>
          </motion.span>
        </AnimatePresence>
      </button>
      <span role="status" className="sr-only">
        {copied ? "E-mail copiado" : ""}
      </span>
    </>
  );
}

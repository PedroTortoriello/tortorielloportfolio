"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${value}`;
        }
      }}
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-line px-3 text-[0.78rem] text-ink-muted transition-colors hover:border-blue/60 hover:text-ink"
      aria-label={label}
    >
      {copied ? <Check aria-hidden className="size-3.5 text-green" /> : <Copy aria-hidden className="size-3.5" />}
      <span aria-hidden>{copied ? "copiado" : "copiar"}</span>
    </button>
      <span role="status" className="sr-only">
        {copied ? "E-mail copiado" : ""}
      </span>
    </>
  );
}

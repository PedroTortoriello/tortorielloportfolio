import type { CSSProperties } from "react";
import { LocalTime } from "@/components/site/local-time";
import { TzConverter } from "@/components/site/tz-converter";
import type { Locale } from "@/lib/i18n/locale";
import styles from "./time-bridge.module.css";

const COPY = {
  en: { and: "and", california: "California", local: "Local time", where: " in São Paulo:" },
  pt: { and: "e", california: "Califórnia", local: "Hora local", where: " em São Paulo:" },
} as const;

// São Paulo ←→ California as technical labels on one wire: where Pedro works
// and where the remote US team was based. A lime pulse runs the wire both ways
// (CSS only). Phones: both labels on top, the wire full width under them.
// Under it, the converter maps any hour of the visitor's day to São Paulo.
export function TimeBridge({ className = "", locale = "en" }: { className?: string; locale?: Locale }) {
  const t = COPY[locale];
  return (
    <div className={className}>
      <p className="grid grid-cols-[auto_auto] items-center justify-between gap-x-4 gap-y-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-6">
        <span data-reveal className="t-label text-ink">
          São Paulo · UTC−3
        </span>
        <span className="sr-only">{t.and}</span>
        <span data-reveal style={{ "--d": "120ms" } as CSSProperties} className="t-label text-right text-ink md:col-start-3">
          {t.california} · UTC−8/−7
        </span>
        {/* the wire: arrowheads at both ends; overflow-x-clip keeps the runner inside it */}
        <span
          aria-hidden
          data-reveal="rule"
          className="relative col-span-2 block h-px overflow-x-clip bg-line-strong before:absolute before:left-[2px] before:top-1/2 before:size-[7px] before:-translate-y-1/2 before:rotate-45 before:border-b before:border-l before:border-ink-faint after:absolute after:right-[2px] after:top-1/2 after:size-[7px] after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-ink-faint md:col-span-1 md:col-start-2 md:row-start-1"
        >
          <span className={`absolute inset-0 ${styles.runner}`}>
            <span className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)]" />
            <span className="absolute left-1/2 top-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
          </span>
        </span>
      </p>
      <p data-reveal style={{ "--d": "200ms" } as CSSProperties} className="t-label mt-4 flex items-center gap-2.5">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        {t.local}
        <span className="sr-only">{t.where}</span>
        <span className="text-ink">
          <LocalTime />
        </span>
      </p>
      <TzConverter style={{ "--d": "280ms" } as CSSProperties} className="mt-12 md:mt-16" />
    </div>
  );
}

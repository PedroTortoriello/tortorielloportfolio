import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import type { Point, Readout } from "@/lib/projects";

const pad = (n: number) => String(n).padStart(2, "0");

const COPY = {
  en: { spec: "Spec · from the code and docs, not live metrics", challenge: "Challenge" },
  pt: { spec: "Ficha técnica · do código e da documentação, não métricas ao vivo", challenge: "Desafio" },
} as const;

// Status values stay English in the data (isLive() reads them); only the label is translated.
const STATUS_PT: Record<string, string> = { Live: "No ar", "In production": "Em produção", Private: "Privado", Pilot: "Piloto" };

// "Live · PWA" → "No ar · PWA"; a value the map does not know stays as it is.
export const statusIn = (locale: Locale, status: string) =>
  locale === "pt"
    ? status
        .split(" · ")
        .map((s) => STATUS_PT[s] ?? s)
        .join(" · ")
    : status;

// "Deploy safety: a hardlink…" → the words before the first colon in ink.
export function Lead({ text }: { text: string }) {
  const cut = text.indexOf(": ");
  if (cut < 1 || cut > 64) return text;
  return (
    <>
      <span className="font-medium text-ink">{text.slice(0, cut)}</span>: {text.slice(cut + 2)}
    </>
  );
}

// One chapter of a case: a hairline that draws, the title cut in line by line,
// its number beside it (never above it as an eyebrow).
export function CaseSection({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[calc(var(--header-h)+1.5rem)] pb-[clamp(4.5rem,9vw,8rem)]">
      <div aria-hidden data-reveal="rule" className="h-px bg-line-strong" />
      <div className="flex items-start justify-between gap-6 pt-6">
        <h2
          id={`${id}-title`}
          data-split="lines"
          className="min-w-0 text-balance break-words text-[clamp(1.6rem,4.2vw,3.75rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] text-ink"
        >
          {title}
        </h2>
        <p aria-hidden className="t-label t-bracket tabular pt-1.5">
          {n}
        </p>
      </div>
      <div className="mt-[clamp(2rem,4vw,3.25rem)]">{children}</div>
    </section>
  );
}

// The readouts as a spec strip: values written in the code and docs.
export function Spec({ items, locale = "en" }: { items: Readout[]; locale?: Locale }) {
  return (
    <div className="mt-[clamp(3rem,6vw,4.5rem)]">
      <p className="t-label">{COPY[locale].spec}</p>
      <dl data-stagger className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        {items.map((r) => (
          <div key={r.k} className="bg-black p-5">
            <dt className="t-label">{r.k}</dt>
            <dd className="mt-2.5 font-mono text-[0.875rem] leading-[1.45] text-ink">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Where({ where }: { where?: string }) {
  return where ? <span className="tag">{where}</span> : null;
}

export function Decisions({ items }: { items: Point[] }) {
  return (
    <ol data-stagger className="grid gap-x-10 md:grid-cols-2">
      {items.map((x, i) => (
        <li key={x.title} className="border-t border-line pb-10 pt-6 md:pb-12">
          <p className="flex flex-wrap items-center gap-3">
            <span className="t-label tabular">{pad(i + 1)}</span>
            <Where where={x.where} />
          </p>
          <h3 className="mt-5 text-balance text-[clamp(1.25rem,1.9vw,1.625rem)] font-bold leading-[1.15] tracking-[-0.025em] text-ink">
            {x.title}
          </h3>
          <p className="mt-4 max-w-[58ch] text-[0.9375rem] leading-[1.7] text-ink-muted">{x.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function Challenges({ items, locale = "en" }: { items: Point[]; locale?: Locale }) {
  return (
    <ol data-stagger className="border-b border-line">
      {items.map((x, i) => (
        <li key={x.title} className="grid gap-y-5 border-t border-line py-9 md:grid-cols-12 md:gap-x-6 md:py-11">
          <div className="md:col-span-5">
            <p className="flex flex-wrap items-center gap-3">
              <span className="t-label tabular">
                {COPY[locale].challenge} {pad(i + 1)}
              </span>
              <Where where={x.where} />
            </p>
            <h3 className="mt-4 text-balance text-[clamp(1.5rem,2.3vw,2.125rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-ink">
              {x.title}
            </h3>
          </div>
          <p className="max-w-[60ch] text-[0.9375rem] leading-[1.7] text-ink-muted md:col-span-7 md:pt-9 md:text-base">{x.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function Implementation({ items }: { items: string[] }) {
  return (
    <ol data-stagger className="border-b border-line">
      {items.map((t, i) => (
        <li
          key={t}
          className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 border-t border-line py-6 md:grid-cols-[3rem_minmax(0,1fr)] md:py-7"
        >
          <span aria-hidden className="t-label tabular pt-1">
            {pad(i + 1)}
          </span>
          <p className="max-w-[70ch] text-[0.9375rem] leading-[1.7] text-ink-muted md:text-base">
            <Lead text={t} />
          </p>
        </li>
      ))}
    </ol>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul data-stagger className="flex flex-wrap gap-2.5">
      {items.map((t) => (
        <li key={t} className="tag min-h-9 px-4 text-[0.75rem]">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Results({ items }: { items: string[] }) {
  return (
    <ul data-stagger className="border-b border-line">
      {items.map((r) => (
        <li key={r} className="flex gap-4 border-t border-line py-5">
          <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 bg-ink" />
          <p className="max-w-[72ch] text-base leading-[1.65] text-ink">{r}</p>
        </li>
      ))}
    </ul>
  );
}

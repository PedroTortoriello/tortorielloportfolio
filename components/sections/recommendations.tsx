import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Recommendation } from "@/lib/data";
import { content, type Locale } from "@/lib/i18n";

const COPY = {
  en: { label: "Recommendations", title: ["In their", "own words"], source: "On LinkedIn", newTab: " (opens in a new tab)" },
  pt: { label: "Recomendações", title: ["Nas palavras", "deles"], source: "No LinkedIn", newTab: " (abre em nova aba)" },
} as const;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

// Between the ledger and the finale: what people Pedro worked with wrote, word for word
// (lib/data.ts). It shares the ledger's grid and rules; a large serif mark opens each quote and
// the attribution speaks in mono. Nothing renders until a real recommendation is pasted in.
export function Recommendations({ items, locale = "en" }: { items?: Recommendation[]; locale?: Locale }) {
  const list = items ?? content(locale).recommendations;
  const t = COPY[locale];
  if (!list.length) return null;

  return (
    <section id="recommendations" aria-labelledby="recommendations-title" className="section-y bg-bg">
      <div className="container-x">
        <header className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6">
          <p data-reveal className="t-label t-bracket hidden md:col-span-3 md:mt-1 md:block lg:col-span-2">
            {t.label}
          </p>
          {/* the slashes are drawn, so screen readers (and SplitText's label) skip them */}
          <h2
            id="recommendations-title"
            data-split="lines"
            className="text-[length:min(11.2vw,4.25rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.045em] md:col-span-9 md:text-[length:6.3vw] lg:col-span-7 lg:text-[length:min(4.85vw,4.375rem)]"
          >
            <span className="text-ink before:content-['//'_/_'']">{t.title[0]}</span> <br />
            <span className="text-[#8a8a8a]">{t.title[1]}</span>
          </h2>
        </header>

        <ul className="mt-16 md:mt-20 lg:mt-24">
          {list.map((r, i) => (
            <li key={`${r.name}${r.date ?? i}`}>
              <div aria-hidden data-reveal="rule" className="h-px bg-line-strong" />
              <figure className="grid grid-cols-1 py-10 md:grid-cols-12 md:gap-x-6 md:py-14 lg:py-16">
                <div aria-hidden className="flex items-start justify-between md:col-span-3 md:flex-col md:justify-start lg:col-span-2">
                  <span
                    data-reveal
                    className="-mb-[0.35em] -ml-[0.04em] font-serif text-[clamp(5.5rem,10vw,9rem)] italic leading-[0.8] text-[#8a8a8a]"
                  >
                    &ldquo;
                  </span>
                  <span className="t-label tabular mt-2 md:mt-6">{`[${pad(i + 1)}]`}</span>
                </div>

                <div className="md:col-span-9 lg:col-span-8">
                  <blockquote cite={r.url} lang={r.lang}>
                    <p
                      data-reveal
                      style={delay(80)}
                      className="max-w-[58ch] whitespace-pre-line text-pretty text-[clamp(1.125rem,1.7vw,1.5rem)] leading-[1.5] text-ink"
                    >
                      {r.quote}
                    </p>
                  </blockquote>

                  <figcaption
                    data-reveal
                    style={delay(160)}
                    className="mt-8 flex flex-col gap-2 border-l border-line-strong pl-4 md:mt-10 md:pl-5"
                  >
                    <span className="font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-ink">{r.name}</span>
                    <span className="t-label text-ink-muted">
                      {r.role} · {r.company}
                    </span>
                    <span className="t-label">
                      {r.relation}
                      {r.date ? ` · ${r.date}` : null}
                    </span>
                    {r.url ? (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group -my-2.5 inline-flex min-h-11 w-fit items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-accent"
                      >
                        <span className="link-draw">{t.source}</span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                        <span className="sr-only">{t.newTab}</span>
                      </a>
                    ) : null}
                  </figcaption>
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import type { Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import { Lead } from "./case-blocks";

const COPY = {
  en: { title: "Authorship & scope", mine: "What I built" },
  pt: { title: "Autoria e escopo", mine: "O que eu construí" },
} as const;

// Read this first: who built what and what production runs, before any claim.
// The co-authorship note leads; "what I built" carries a lime square, the same
// mark as the lime ring on the system map.
export function CaseRecord({ project: p, locale = "en" }: { project: Project; locale?: Locale }) {
  if (!p.note && !p.mine && !p.parts && !p.notes) return null;
  const wideNotes = !p.mine;

  return (
    <section aria-labelledby="record-title" className="container-x pt-[clamp(3rem,6vw,5rem)]">
      <div data-reveal className="border border-line-strong">
        <div className="flex min-h-11 items-center justify-between gap-4 border-b border-line px-5 sm:px-8 lg:px-10">
          <h2 id="record-title" className="t-label t-bracket text-ink">
            {COPY[locale].title}
          </h2>
          <p aria-hidden className="t-label tabular">
            {p.index}
          </p>
        </div>

        <div className="grid gap-x-6 gap-y-12 p-5 sm:p-8 lg:grid-cols-12 lg:p-10">
          {p.note ? (
            <p className="max-w-[40ch] text-pretty font-geo text-[clamp(1.375rem,2.6vw,2.25rem)] font-light leading-[1.18] tracking-[-0.01em] text-ink lg:col-span-12">
              {p.note}
            </p>
          ) : null}

          {p.parts ? (
            <ul data-stagger className="grid gap-px border border-line bg-line md:grid-cols-3 lg:col-span-12">
              {p.parts.map((x) => (
                <li key={x.name} className="bg-black p-6 lg:p-7">
                  <p className="t-label">{x.role}</p>
                  <h3 className="mt-3 text-[clamp(1.5rem,2.2vw,2rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-ink">
                    {x.name}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-[1.65] text-ink-muted">{x.text}</p>
                </li>
              ))}
            </ul>
          ) : null}

          {p.mine ? (
            <div className="lg:col-span-7">
              <h3 className="t-label">{COPY[locale].mine}</h3>
              <ul data-stagger className="mt-4 border-b border-line">
                {p.mine.map((m) => (
                  <li key={m} className="flex gap-4 border-t border-line py-4">
                    <span aria-hidden className="mt-[0.4rem] size-2 shrink-0 border border-accent bg-accent/15" />
                    <p className="text-[0.9375rem] leading-[1.65] text-ink-muted">
                      <Lead text={m} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {p.notes ? (
            <dl
              data-stagger
              className={`grid content-start gap-x-8 gap-y-8 ${
                !wideNotes
                  ? "lg:col-span-5"
                  : p.notes.length === 1
                    ? "lg:col-span-12"
                    : `md:grid-cols-2 lg:col-span-12 ${p.notes.length === 3 ? "xl:grid-cols-3" : ""}`
              }`}
            >
              {p.notes.map((n) => (
                <div key={n.title} className="border-t border-line pt-4">
                  <dt className="t-label">{n.title}</dt>
                  <dd className="mt-3 max-w-[62ch] text-[0.9375rem] leading-[1.65] text-ink-muted">{n.detail}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}

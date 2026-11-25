"use client";

import { useLocale } from "@/lib/i18n/client";
import { scrollToId } from "@/lib/motion";
import { useActiveSection } from "@/lib/use-active-section";

type Item = { id: string; label: string };

const pad = (n: number) => String(n).padStart(2, "0");

const COPY = { en: { label: "Case contents" }, pt: { label: "Conteúdo do case" } } as const;

// The case's contents. From 1024px a sticky column that marks the section
// crossing the middle of the viewport with a lime rule; below that, a row of
// chips that scrolls sideways under the record.
export function CaseNav({ items, index, title }: { items: Item[]; index: string; title: string }) {
  const active = useActiveSection(items.map((s) => s.id));
  const locale = useLocale();

  return (
    <nav aria-label={COPY[locale].label} className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
      <p className="t-label hidden lg:block">
        <span className="t-bracket tabular">{index}</span>
        <span className="mt-2 block text-ink">{title}</span>
      </p>
      <ol className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-10 pt-2 [scrollbar-width:none] md:flex-wrap lg:mx-0 lg:mt-7 lg:block lg:overflow-visible lg:border-t lg:border-line lg:p-0 lg:pt-3">
        {items.map((s, i) => {
          const on = active === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  if (scrollToId(s.id)) e.preventDefault();
                }}
                aria-current={on ? "location" : undefined}
                className="group flex min-h-11 items-center gap-2.5 whitespace-nowrap rounded-full border border-line-strong px-4 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ink-muted transition-colors duration-300 hover:border-ink-muted hover:text-ink aria-[current=location]:text-ink lg:min-h-10 lg:rounded-none lg:border-0 lg:px-0 lg:font-sans lg:text-[0.9375rem] lg:normal-case lg:tracking-normal"
              >
                <span
                  aria-hidden
                  className="hidden h-px w-3 bg-line-strong transition-[width,background-color] duration-500 ease-[var(--ease-out)] group-aria-[current=location]:w-6 group-aria-[current=location]:bg-accent lg:block"
                />
                <span aria-hidden className="tabular font-mono text-[0.6875rem] text-ink-faint">
                  {pad(i + 1)}
                </span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

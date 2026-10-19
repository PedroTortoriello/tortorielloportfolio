import type { ReactNode } from "react";

type SectionHeaderProps = {
  index: string;
  label: string;
  meta?: ReactNode;
  statement: ReactNode;
  lead?: ReactNode;
  id?: string;
};

// A hairline rule, then the statement as the section heading. The code-comment
// title and its number sit beside it (below it on phones), never above it.
export function SectionHeader({ index, label, meta, statement, lead, id }: SectionHeaderProps) {
  return (
    <header>
      <div className="flex items-center gap-4">
        <span aria-hidden data-reveal="rule" className="h-px min-w-6 flex-1 bg-line" />
        {meta ? <span className="hud hidden shrink-0 md:block">{meta}</span> : null}
      </div>
      <div className="mt-9 grid grid-cols-1 items-end gap-7 lg:mt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <h2
          id={id}
          data-reveal
          className="max-w-[20ch] text-balance text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[1.03] tracking-[-0.035em] text-ink"
        >
          {statement}
        </h2>
        <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="max-w-md lg:justify-self-end">
          <p className="font-mono text-[0.76rem] uppercase tracking-[0.14em] text-ink">
            <span className="text-blue tabular">{index}</span>
            <span className="text-blue" aria-hidden>
              {"  // "}
            </span>
            {label}
          </p>
          {lead ? <p className="mt-4 text-pretty text-base leading-7 text-ink-muted">{lead}</p> : null}
        </div>
      </div>
    </header>
  );
}

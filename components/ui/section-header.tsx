import type { ReactNode } from "react";

type SectionHeaderProps = {
  index: string;
  label: string;
  meta?: ReactNode;
  statement: ReactNode;
  lead?: ReactNode;
  id?: string;
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// The title frame that opens every section. Its station node sits on the
// mission line (the gutter line MissionLine draws from lg up; below lg a short
// arrival line drawn by the scroll), the ruler draws across from the node, then
// the statement cuts in line by line (data-title).
// The station index and label sit beside the statement, never above it.
export function SectionHeader({ index, label, meta, statement, lead, id }: SectionHeaderProps) {
  return (
    <header className="relative">
      <div
        aria-hidden
        data-draw="scrub"
        data-start="top 96%"
        data-end="top 52%"
        className="pointer-events-none absolute left-0 top-[9px] h-[clamp(6rem,12vw,10rem)] w-px -translate-y-full [mask-image:linear-gradient(to_bottom,transparent,black_70%)] lg:hidden"
      >
        <svg viewBox="0 0 2 100" preserveAspectRatio="none" className="size-full overflow-visible text-blue">
          <line x1="1" y1="0" x2="1" y2="100" className="draw" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="flex items-end gap-4">
        <span className="relative min-w-6 flex-1">
          <span aria-hidden data-reveal="rule" className="ruler block" />
          <span aria-hidden className="absolute -left-6 bottom-0 hidden h-px w-6 bg-blue/70 lg:block" />
          <span
            aria-hidden
            className="absolute -bottom-[4px] -left-[4px] size-[9px] rounded-full border border-blue bg-bg shadow-[0_0_12px_rgb(94_158_255/0.75)] lg:-left-[calc(1.5rem+4px)]"
          />
        </span>
        {meta ? <span className="hud hidden shrink-0 md:block">{meta}</span> : null}
      </div>
      <div className="mt-10 grid grid-cols-1 items-end gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
        <h2 id={id} data-title className="display max-w-[19ch] text-[clamp(2.25rem,5vw,4.4rem)] text-ink [--wdth:104]">
          {statement}
        </h2>
        <div data-reveal style={d(150)} className="max-w-md lg:justify-self-end lg:pb-1.5">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted">
            <span className="text-blue tabular">{index}</span>
            <span aria-hidden className="text-line-strong">
              {"  —  "}
            </span>
            {label}
          </p>
          {lead ? <p className="mt-4 text-pretty text-base leading-7 text-ink-muted">{lead}</p> : null}
        </div>
      </div>
    </header>
  );
}

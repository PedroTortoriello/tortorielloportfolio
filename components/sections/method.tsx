import { SectionHeader } from "@/components/ui/section-header";
import { method } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");

// The five stages grouped by phase, in data order; `n` is the stage number on the track.
const phases = [...new Set(method.map((s) => s.phase))].map((name) => ({
  name,
  steps: method.map((s, i) => ({ ...s, n: i + 1 })).filter((s) => s.phase === name),
}));

const range = (steps: { n: number }[]) =>
  steps.length > 1 ? `${pad(steps[0].n)}–${pad(steps[steps.length - 1].n)}` : pad(steps[0].n);

// The track: a static hairline with the blue line drawn over it by the scroll
// (data-draw="scrub" on the parent). Non-uniform viewBox scaling keeps the
// stroke at 1px because the line runs along the stretched axis only.
function Track({ axis }: { axis: "x" | "y" }) {
  const h = axis === "x";
  const id = `metodo-track-${axis}`;
  const line = h ? { x1: 0, y1: 1.5, x2: 1000, y2: 1.5 } : { x1: 1.5, y1: 0, x2: 1.5, y2: 1000 };
  return (
    <svg viewBox={h ? "0 0 1000 3" : "0 0 3 1000"} preserveAspectRatio="none" className="block size-full">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={h ? 1000 : 0} y2={h ? 0 : 1000}>
          <stop offset="0" className="[stop-color:var(--color-blue)]" />
          <stop offset="0.8" className="[stop-color:var(--color-blue)]" stopOpacity="0.75" />
          <stop offset="1" className="[stop-color:var(--color-blue)]" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line {...line} stroke="currentColor" className="text-line" />
      <line {...line} stroke={`url(#${id})`} className="draw" />
    </svg>
  );
}

// Processo, as a go / no-go sequence: three phases bracket five stages on one
// track. A diamond marks each phase gate; every stage names the project where
// its decision is in the code. Horizontal from lg (subgrid keeps the evidence
// rows aligned across columns), vertical below.
export function Method() {
  return (
    <section
      id="metodo"
      data-station="03"
      data-station-label="Processo"
      aria-labelledby="metodo-title"
      className="section-y relative border-t border-line-faint"
    >
      <div className="container-x">
        <SectionHeader
          id="metodo-title"
          index="03"
          label="Processo"
          meta="diagnóstico → arquitetura → entrega"
          statement="Do diagnóstico à entrega, com a prova de onde cada decisão aparece."
          lead="Três fases, cinco estágios. Cada estágio aponta onde a decisão aparece, num case ou na experiência: sem palavras de efeito, só o que dá para conferir."
        />

        <div data-draw="scrub" data-start="top 78%" data-end="bottom 72%" className="relative mt-16 lg:mt-24">
          {/* lg: sits on the node row = phase header (h-9) + node offset (mt-6) + half a node, minus half the svg */}
          <div aria-hidden className="pointer-events-none absolute -right-6 left-[7px] top-[calc(3.75rem+6px)] hidden h-[3px] lg:block">
            <Track axis="x" />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[6px] w-[3px] lg:hidden">
            <Track axis="y" />
          </div>

          <ol className="relative grid grid-cols-1 gap-y-14 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0 xl:gap-x-8">
            {phases.map((p) => (
              <li
                key={p.name}
                style={{ "--span": p.steps.length } as React.CSSProperties}
                className="grid gap-y-10 lg:col-span-(--span) lg:row-span-5 lg:grid-cols-subgrid lg:grid-rows-subgrid lg:gap-y-0"
              >
                {/* phase: a tick across the track on phones, a drafting bracket over its stages from lg */}
                <div className="grid grid-cols-[15px_minmax(0,1fr)] items-center gap-x-5 lg:col-span-full lg:flex lg:h-9 lg:flex-col lg:items-stretch lg:justify-between">
                  <span aria-hidden className="h-px bg-line-strong lg:hidden" />
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="label text-[0.75rem] text-ink-muted">{p.name}</h3>
                    <span className="whitespace-nowrap font-mono text-[0.6875rem] text-ink-faint tabular">
                      {/* the word drops where a one-stage phase column is too narrow for it */}
                      <span className="lg:max-xl:hidden">{p.steps.length > 1 ? "estágios" : "estágio"} </span>
                      {range(p.steps)}
                    </span>
                  </div>
                  <span aria-hidden className="hidden h-2 border-x border-t border-line-strong lg:block" />
                </div>

                <ol className="grid gap-y-12 lg:col-span-full lg:row-span-4 lg:grid-cols-subgrid lg:grid-rows-subgrid lg:gap-y-0">
                  {p.steps.map((s, i) => (
                    <li
                      key={s.id}
                      className="grid grid-cols-[15px_minmax(0,1fr)] gap-x-5 lg:row-span-4 lg:grid-cols-[minmax(0,1fr)] lg:grid-rows-subgrid lg:gap-x-0"
                    >
                      {/* node: the phase gate is a decision diamond, the stages after it are stations */}
                      <span aria-hidden className="relative z-10 row-span-3 mt-1 grid size-[15px] place-items-center lg:row-span-1 lg:mt-6">
                        {i === 0 ? (
                          <span className="grid size-[11px] rotate-45 place-items-center rounded-[1px] border border-blue/80 bg-bg shadow-[0_0_0_4px_var(--color-bg)]">
                            <span className="size-1 bg-blue" />
                          </span>
                        ) : (
                          <span className="grid size-[15px] place-items-center rounded-full border border-blue/80 bg-bg shadow-[0_0_0_4px_var(--color-bg)]">
                            <span className="size-[5px] rounded-full bg-blue" />
                          </span>
                        )}
                      </span>

                      <div className="col-start-2 lg:col-start-1 lg:mt-6">
                        <h4 className="display text-[clamp(1.5rem,2.1vw,1.9rem)] text-ink [--wdth:100]">{s.verb}</h4>
                        <p className="mt-2.5 font-mono text-[0.72rem] text-ink-faint tabular">
                          <span className="text-blue">{pad(s.n)}</span> · <span lang="en">{s.title.toLowerCase()}</span>
                        </p>
                      </div>

                      <p className="col-start-2 mt-3 text-pretty text-[0.9375rem] leading-7 text-ink-muted lg:col-start-1 lg:mt-4">{s.text}</p>

                      <div className="col-start-2 mt-6 border-t border-line pt-4 lg:col-start-1 lg:mt-8">
                        <p className="font-mono text-[0.72rem] text-blue">
                          <span aria-hidden>↳ </span>
                          <span className="sr-only">Onde aparece: </span>
                          {s.evidence.project}
                        </p>
                        <p className="mt-1.5 text-pretty text-[0.8125rem] leading-6 text-ink">{s.evidence.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </div>

        {/* legend: what the two node shapes on the track mean */}
        <p aria-hidden className="label mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 lg:justify-end">
          <span className="inline-flex items-center gap-2.5">
            <span className="size-[7px] rotate-45 border border-blue/80" />
            portão go / no-go
          </span>
          <span className="inline-flex items-center gap-2.5">
            <span className="size-2 rounded-full border border-blue/80" />
            estágio
          </span>
        </p>
      </div>
    </section>
  );
}

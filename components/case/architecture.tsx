import { FlowPlayer, FlowProvider, FlowSteps } from "@/components/diagrams/flow";
import { SystemGraph } from "@/components/diagrams/system-graph";
import type { Locale } from "@/lib/i18n";
import type { Point, Project } from "@/lib/projects";

const COPY = {
  en: { map: "System map", layers: "Layers", graphLabel: (title: string) => `${title} architecture` },
  pt: { map: "Mapa do sistema", layers: "Camadas", graphLabel: (title: string) => `Arquitetura de ${title}` },
} as const;

// The summary, the system map with its flow player, then the layers as a stack
// and the data flow as numbered steps (they light up while the flow plays).
// Violet and Tektur are the technical layer's voice; lime stays for what acts
// and what I built.
export function Architecture({ project: p, locale = "en" }: { project: Project; locale?: Locale }) {
  const t = COPY[locale];
  const a = p.architecture;
  const titleId = `${p.slug}-map`;
  return (
    <>
      <p data-reveal className="max-w-[62ch] text-pretty text-[clamp(1.0625rem,1.3vw,1.1875rem)] leading-[1.7] text-ink-muted">
        {a.summary}
      </p>

      <FlowProvider steps={a.flow} hops={a.graph?.steps}>
        {a.graph ? (
          <figure data-reveal aria-labelledby={titleId} className="mt-12 border border-line-strong bg-surface">
            <FlowPlayer
              titleId={titleId}
              steps={a.flow}
              title={
                <>
                  {t.map}
                  <span className="max-sm:hidden"> · {p.title}</span>
                </>
              }
            />
            {/* from 1280px the map fits without scrolling sideways (its min width is 940px) */}
            <div className="px-4 pb-5 pt-6 sm:px-6 lg:px-8 lg:pt-8 xl:px-5">
              <SystemGraph graph={a.graph} title={t.graphLabel(p.title)} />
            </div>
          </figure>
        ) : null}

        <div className="mt-[clamp(3rem,6vw,4.5rem)] grid gap-14 xl:grid-cols-2 xl:gap-x-12">
          <Layers layers={a.layers} title={t.layers} />
          <FlowSteps steps={a.flow} />
        </div>
      </FlowProvider>
    </>
  );
}

// The system as stacked slabs, joined by a violet spine from marker to marker.
function Layers({ layers, title }: { layers: Point[]; title: string }) {
  return (
    <div>
      <h3 className="t-label">{title}</h3>
      <ol data-stagger className="mt-6">
        {layers.map((l, i) => (
          <li key={l.title} className="relative grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4 pb-3 last:pb-0">
            {i < layers.length - 1 ? (
              <span aria-hidden className="absolute -bottom-3.5 left-[13.5px] top-[2.625rem] w-px bg-violet" />
            ) : null}
            <span
              aria-hidden
              className="relative mt-3.5 grid size-7 place-items-center border border-violet-soft/70 bg-black font-mono text-[0.625rem] tabular text-ink-muted"
            >
              L{i + 1}
            </span>
            <div className="border border-line bg-surface px-5 py-4 transition-colors duration-300 hover:border-line-strong">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="font-tech text-[0.9375rem] font-semibold uppercase tracking-[0.05em] text-ink">{l.title}</h4>
                {l.where ? <p className="t-label">{l.where}</p> : null}
              </div>
              <p className="mt-2 text-[0.9375rem] leading-[1.65] text-ink-muted">{l.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

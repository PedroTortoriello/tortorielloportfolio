import { SectionHeader } from "@/components/ui/section-header";
import { TechLogo } from "@/components/ui/tech-logo";
import { Glyph } from "@/components/ui/icons";
import { stack, type StackDomain, type Tech } from "@/lib/data";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// Below lg the tooltip opens above the item and ignores the pointer (touch has
// no hover). From lg it opens beside the item, with a hover bridge, so it never
// covers its neighbours and the pointer can rest on it (WCAG 1.4.13).
const SIDE = {
  right: "lg:left-[calc(100%+6px)] lg:right-auto lg:before:-left-2",
  left: "lg:right-[calc(100%+6px)] lg:left-auto lg:before:-right-2",
};

function TechItem({
  domain,
  t,
  roomy = false,
  tipAlign = "",
  side = "right",
}: {
  domain: string;
  t: Tech;
  roomy?: boolean;
  tipAlign?: string;
  side?: keyof typeof SIDE;
}) {
  const tip = `tip-${domain}-${t.name.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <li className="group/tech relative">
      <button
        type="button"
        aria-describedby={tip}
        className={`flex w-full items-center gap-3 rounded-lg px-2.5 text-left text-sm text-ink-muted outline-none transition-colors duration-200 hover:bg-elevated hover:text-ink focus-visible:bg-elevated focus-visible:text-ink focus-visible:ring-1 focus-visible:ring-blue ${roomy ? "py-2.5" : "py-2"}`}
      >
        <span className="grid size-6 shrink-0 place-items-center">
          {t.icon ? (
            <TechLogo src={t.icon} alt="" className="size-[1.05rem] opacity-70 transition-opacity group-hover/tech:opacity-100" />
          ) : t.glyph ? (
            <Glyph name={t.glyph} className="size-[1.05rem] text-ink-muted" />
          ) : null}
        </span>
        <span className="truncate">{t.name}</span>
      </button>
      <span
        id={tip}
        role="tooltip"
        className={`invisible absolute bottom-[calc(100%+6px)] left-2 z-30 w-64 max-w-[calc(100vw-3rem)] translate-y-1 rounded-lg border border-line-strong bg-raised px-3.5 py-3 text-left opacity-0 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.8)] transition-[opacity,transform] duration-200 max-lg:pointer-events-none group-hover/tech:visible group-hover/tech:translate-y-0 group-hover/tech:opacity-100 group-focus-within/tech:visible group-focus-within/tech:translate-y-0 group-focus-within/tech:opacity-100 lg:bottom-auto lg:top-0 lg:before:absolute lg:before:inset-y-0 lg:before:w-2 lg:before:content-[''] ${tipAlign} ${SIDE[side]}`}
      >
        <span className="block text-[0.8rem] leading-5 text-ink">{t.use}</span>
        <span className="mt-2 block font-mono text-[0.64rem] text-blue">em: {t.where.join(" · ")}</span>
      </span>
    </li>
  );
}

function Panel({
  domain,
  layer,
  className = "",
  wide = false,
  tipAlign = "",
  side = "right",
}: {
  side?: keyof typeof SIDE;
  domain: StackDomain;
  layer: string;
  className?: string;
  wide?: boolean;
  tipAlign?: string;
}) {
  return (
    <div
      id={`stack-${domain.id}`}
      className={`stack-panel edge-light rounded-xl border border-line bg-surface/80 transition-colors duration-300 hover:border-line-strong ${className}`}
    >
      <div className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-3.5">
        <div className="min-w-0">
          <h3 className="text-[0.95rem] font-medium text-ink">{domain.title}</h3>
          <p className="mt-0.5 text-[0.75rem] text-ink-faint">{domain.role}</p>
        </div>
        <span className="font-mono text-[0.64rem] text-ink-faint tabular">{layer}</span>
      </div>
      <ul className={`grid p-1.5 ${wide ? "sm:grid-cols-2" : ""}`}>
        {domain.items.map((t) => (
          <TechItem key={t.name} domain={domain.id} t={t} tipAlign={tipAlign} side={side} />
        ))}
      </ul>
    </div>
  );
}

// A connector between layers. Brightens when either neighbour is hovered.
function Conn({ dir, className = "" }: { dir: "h" | "v"; className?: string }) {
  return (
    <div aria-hidden className={`conn relative grid place-items-center ${className}`}>
      <span className={`conn-line bg-line-strong transition-colors duration-300 ${dir === "h" ? "h-px w-full" : "h-full w-px"}`} />
      <span className={`conn-dot absolute size-1 rounded-full bg-cyan ${dir === "h" ? "conn-h" : "conn-v"}`} />
    </div>
  );
}

export function Stack() {
  const [fe, api, be, db, auto, infra] = ["frontend", "apis", "backend", "data", "automation", "infra"].map((id) => stack.find((s) => s.id === id)!);
  return (
    <section id="stack" aria-labelledby="stack-title" className="section-y relative border-t border-line-faint">
      <div className="container-x">
        <SectionHeader
          id="stack-title"
          index="03"
          label="Technology stack"
          meta="6 domínios"
          statement="Ferramentas organizadas pelo papel que cumprem num sistema rodando."
          lead="Sem barras de porcentagem. Passe o cursor (ou o foco) em uma tecnologia para ver como eu uso e em quais projetos."
        />

        <div data-reveal className="stack-grid mt-16 lg:mt-24">
          {/* request path: frontend → apis → backend → data */}
          <div className="grid-cols-1 grid gap-0 lg:grid-cols-[1fr_2.25rem_1fr_2.25rem_1fr_2.25rem_1fr]">
            <Panel domain={fe} layer="L1" />
            <Conn dir="h" className="hidden lg:grid" />
            <Conn dir="v" className="h-6 lg:hidden" />
            <Panel domain={api} layer="L2" />
            <Conn dir="h" className="hidden lg:grid" />
            <Conn dir="v" className="h-6 lg:hidden" />
            <Panel domain={be} layer="L3" />
            <Conn dir="h" className="hidden lg:grid" />
            <Conn dir="v" className="h-6 lg:hidden" />
            <Panel domain={db} layer="L4" side="left" />
          </div>

          {/* automation hangs off backend and data */}
          <div className="grid-cols-1 grid lg:grid-cols-[1fr_2.25rem_1fr_2.25rem_1fr_2.25rem_1fr]">
            <div className="hidden lg:col-span-3 lg:block" />
            <div className="lg:col-span-4 lg:col-start-4">
              <div className="grid h-8 grid-cols-2" aria-hidden>
                <Conn dir="v" className="h-8" />
                <Conn dir="v" className="h-8" />
              </div>
              <Panel domain={auto} layer="L5 · async" wide side="left" />
            </div>
          </div>

          {/* infrastructure: the base everything runs on */}
          <Conn dir="v" className="mx-auto h-8" />
          <div
            className="stack-panel edge-light rounded-xl border border-line bg-surface/80 transition-colors duration-300 hover:border-line-strong"
            id={`stack-${infra.id}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-4 py-3.5">
              <div>
                <h3 className="text-[0.95rem] font-medium text-ink">{infra.title}</h3>
                <p className="mt-0.5 text-[0.75rem] text-ink-faint">{infra.role}</p>
              </div>
              <span className="font-mono text-[0.64rem] text-ink-faint">L0 · base</span>
            </div>
            <ul className="grid grid-cols-2 p-1.5 sm:grid-cols-3 lg:grid-cols-6">
              {infra.items.map((t, i) => (
                <TechItem
                  key={t.name}
                  domain={infra.id}
                  t={t}
                  roomy
                  tipAlign={`${i % 2 ? "max-sm:left-auto max-sm:right-2" : ""} ${i % 3 === 2 ? "sm:max-lg:left-auto sm:max-lg:right-2" : ""}`}
                  side={i >= 3 ? "left" : "right"}
                />
              ))}
            </ul>
          </div>
          <p className="mt-6 text-[0.78rem] text-ink-faint" style={d(200)}>
            L1 → L4: o caminho de uma requisição · L5: o que roda sem ninguém clicar · L0: onde tudo isso roda
          </p>
        </div>
      </div>
    </section>
  );
}

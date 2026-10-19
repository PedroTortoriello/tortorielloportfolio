import { Console } from "@/components/ui/console";
import { SectionHeader } from "@/components/ui/section-header";
import { stack, type StackDomain } from "@/lib/data";
import { LayerPicker } from "./stack-map";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
// The L1 → L4 stagger only exists where the path is one row (lg). Stacked on
// phones, each layer enters on its own and must not wait for the ones above.
const lgD = (ms: number) => ({ "--dl": `${ms}ms` }) as React.CSSProperties;
const LG_D = "lg:[--d:var(--dl)]";

const layer = (id: string) => stack.find((s) => s.id === id)!;

// Console's head is a single row. Here the layer code and its role sentence
// stack (and may wrap), so both stay readable in the ~200–280px path consoles.
const HEAD =
  "[&>.console-head]:flex-col [&>.console-head]:items-start [&>.console-head]:justify-center [&>.console-head]:gap-1 [&>.console-head]:py-2.5 [&>.console-head>*]:ml-0 [&>.console-head>*]:max-w-full [&>.console-head>*]:whitespace-normal";

// On lg the four path consoles join the map's first three rows (head · list ·
// readout) through subgrid, so heads, lists and readouts line up across the path.
const SUB = "lg:row-span-3 lg:grid lg:grid-rows-subgrid";

function Layer({
  code,
  domain,
  place,
  cols,
  delay = 0,
  path = false,
}: {
  code: string;
  domain: StackDomain;
  place: string;
  cols: string;
  delay?: number;
  path?: boolean;
}) {
  return (
    <div data-power style={lgD(delay)} className={`${LG_D} ${place} ${path ? SUB : ""}`}>
      <Console
        label={
          <span role="heading" aria-level={3}>
            <span className="text-blue">{code}</span>{" "}
            <span aria-hidden className="text-line-strong">
              ·
            </span>{" "}
            <span className="text-ink">{domain.title}</span>
          </span>
        }
        status={<span className="block font-sans text-[0.8125rem] normal-case leading-snug tracking-normal text-ink-muted">{domain.role}</span>}
        className={`${HEAD} ${path ? SUB : ""}`}
        bodyClassName={path ? "lg:row-span-2 lg:grid lg:grid-rows-subgrid" : ""}
      >
        <LayerPicker title={domain.title} items={domain.items} cols={cols} />
      </Console>
    </div>
  );
}

// A connector, horizontal by default (callers rotate it). Solid = sync and is
// drawn in by data-draw; dashed = async and fades in (a dash pattern can't be
// stroke-drawn). The blue chevron is the line head. The packet only runs while
// the map is on screen (data-loop on the map).
function Wire({ len, async = false, className = "" }: { len: number; async?: boolean; className?: string }) {
  return (
    <span className={`relative block h-[9px] ${className}`} style={{ width: len }}>
      <svg width={len} height="9" viewBox={`0 0 ${len} 9`} fill="none" className="absolute inset-0 overflow-visible">
        <line x1="0" y1="4.5" x2={len - 1} y2="4.5" className={`stroke-line-strong ${async ? "edge-async fade-edge" : "draw"}`} />
        <path d={`M${len - 5} 1.5 ${len - 1} 4.5 ${len - 5} 7.5`} className="fade-edge stroke-blue/80" />
      </svg>
      <span className={`conn-dot conn-h absolute size-1 rounded-full bg-cyan ${async ? "[animation-duration:3.8s]" : ""}`} />
    </span>
  );
}

// Request-path connector: vertical between stacked consoles, horizontal in the
// 40px gutter on lg, centred on the head row.
function PathWire({ place, delay }: { place: string; delay: number }) {
  return (
    <div aria-hidden data-draw style={lgD(delay)} className={`${LG_D} grid h-10 place-items-center lg:row-start-1 lg:h-auto lg:self-center ${place}`}>
      <Wire len={40} className="rotate-90 lg:rotate-0" />
    </div>
  );
}

function AsyncWire({ label = false, className = "" }: { label?: boolean; className?: string }) {
  return (
    <div className={`relative grid h-12 place-items-center ${className}`}>
      <Wire len={48} async className="rotate-90" />
      {label ? <span className="hud absolute left-[calc(50%+14px)] top-1/2 -translate-y-1/2">async</span> : null}
    </div>
  );
}

const KEY = [
  { code: "L1 → L4", text: "o caminho de uma requisição", line: "sync" },
  { code: "L5", text: "o que roda sem ninguém clicar", line: "async" },
  { code: "L0", text: "onde tudo isso roda", line: "base" },
] as const;

function Legend({ className = "" }: { className?: string }) {
  return (
    <ul aria-label="Legenda do mapa" className={`grid gap-2.5 ${className}`}>
      {KEY.map((k) => (
        <li key={k.code} className="flex items-center gap-3 text-[0.8125rem] leading-5 text-ink-muted">
          <svg aria-hidden width="28" height="9" viewBox="0 0 28 9" fill="none" className="shrink-0 overflow-visible">
            {k.line === "base" ? (
              <>
                <path d="M0 4.5h28" className="stroke-line-strong" />
                <path d="M0.5 1v7M27.5 1v7" className="stroke-blue/70" />
              </>
            ) : (
              <>
                <line x1="0" y1="4.5" x2="27" y2="4.5" className={`stroke-line-strong ${k.line === "async" ? "edge-async" : ""}`} />
                <path d="M23 1.5 27 4.5 23 7.5" className="stroke-blue/80" />
              </>
            )}
          </svg>
          <span className="w-[4.5rem] shrink-0 font-mono text-[0.8125rem] text-ink">{k.code}</span>
          <span>{k.text}</span>
        </li>
      ))}
    </ul>
  );
}

// Station map of the stack. L1 → L4 is the path a request takes (a row with
// connectors on lg, a column below), L5 hangs off backend and data as the async
// branch, and L0 sits under a datum line as the base everything runs on.
export function Stack() {
  const [fe, api, be, db, auto, infra] = ["frontend", "apis", "backend", "data", "automation", "infra"].map(layer);
  const pathCols = "lg:grid-cols-1";

  return (
    <section id="stack" data-station="05" data-station-label="Stack" aria-labelledby="stack-title" className="section-y relative border-t border-line-faint">
      <div className="container-x">
        <SectionHeader
          id="stack-title"
          index="05"
          label="Stack"
          meta="6 domínios"
          statement="Ferramentas organizadas pelo papel que cumprem num sistema rodando."
          lead="Sem barras de porcentagem. Escolha uma tecnologia para ler como eu uso e onde."
        />

        <div data-loop className="relative isolate mt-16 grid grid-cols-1 lg:mt-24 lg:grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr]">
          {/* the drafting sheet the map is plotted on */}
          <div
            aria-hidden
            className="drafting-grid pointer-events-none absolute -inset-x-4 -inset-y-10 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black_20%,transparent_80%)]"
          />

          {/* first on phones (how to read the map); the bottom-left key on lg */}
          <Legend className="mb-10 lg:col-span-3 lg:col-start-1 lg:row-start-5 lg:mb-0 lg:self-end" />

          {/* request path */}
          <Layer path code="L1" domain={fe} cols={pathCols} place="lg:col-start-1 lg:row-start-1" />
          <PathWire place="lg:col-start-2" delay={90} />
          <Layer path code="L2" domain={api} cols={pathCols} place="lg:col-start-3 lg:row-start-1" delay={140} />
          <PathWire place="lg:col-start-4" delay={230} />
          <Layer path code="L3" domain={be} cols={pathCols} place="lg:col-start-5 lg:row-start-1" delay={280} />
          <PathWire place="lg:col-start-6" delay={370} />
          <Layer path code="L4" domain={db} cols={pathCols} place="lg:col-start-7 lg:row-start-1" delay={420} />

          {/* async branch: off data on phones, off backend and data on lg */}
          <div aria-hidden data-draw className="lg:hidden">
            <AsyncWire label />
          </div>
          <div aria-hidden data-draw style={d(560)} className="hidden lg:col-span-3 lg:col-start-5 lg:row-start-4 lg:grid lg:grid-cols-subgrid">
            <AsyncWire label />
            <AsyncWire className="col-start-3" />
          </div>
          <Layer code="L5" domain={auto} cols="lg:grid-cols-2" place="lg:col-span-3 lg:col-start-5 lg:row-start-5" />

          {/* datum: a construction line that overshoots the map; L0 sits under it */}
          <div aria-hidden className="relative h-12 lg:col-span-full lg:row-start-6 lg:h-14">
            <span data-reveal="rule" className="absolute -inset-x-3 top-1/2 h-px bg-line-strong sm:-inset-x-6" />
            <span className="absolute -left-3 top-1/2 h-3 w-px -translate-y-1/2 bg-blue/70 sm:-left-6" />
            <span className="absolute -right-3 top-1/2 h-3 w-px -translate-y-1/2 bg-blue/70 sm:-right-6" />
          </div>
          <Layer code="L0" domain={infra} cols="lg:grid-cols-6" place="lg:col-span-full lg:row-start-7" />
        </div>
      </div>
    </section>
  );
}

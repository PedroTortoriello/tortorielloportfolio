"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { useMotionOk } from "@/lib/use-motion-ok";
import type { EdgeStyle, Graph, GraphNode } from "@/lib/projects";
import { TRAVEL, useFlow } from "./flow";
import { H, LIFT, edgePath, layout, stepLinks } from "./geometry";

const COPY = {
  en: {
    legend: "Legend",
    sync: "sync",
    async: "async · queue · cron",
    external: "external",
    mine: "built by me",
    mineTag: "mine",
    builtByMe: "Built by me.",
    hint: "Hover, tap or Tab through the nodes to see what each one does.",
    scroll: "Scroll sideways for the whole system →",
    tap: "built by me · tap a node to see its role",
    connections: (title: string) => `Connections in ${title}:`,
    to: "to",
    style: { sync: "synchronous", async: "asynchronous", external: "external integration" },
  },
  pt: {
    legend: "Legenda",
    sync: "síncrono",
    async: "assíncrono · fila · cron",
    external: "externo",
    mine: "feito por mim",
    mineTag: "meu",
    builtByMe: "Feito por mim.",
    hint: "Passe o cursor, toque ou navegue com Tab pelos nós para ver o que cada um faz.",
    scroll: "Role para o lado para ver o sistema inteiro →",
    tap: "feito por mim · toque em um nó para ver o que ele faz",
    connections: (title: string) => `Conexões (${title}):`,
    to: "para",
    style: { sync: "síncrona", async: "assíncrona", external: "integração externa" },
  },
} as const;

type Copy = (typeof COPY)[keyof typeof COPY];

// V4 on black: white hairlines draw the construction, lime marks what is lit
// (and what I built), violet carries the packets of the technical layer.
const STRUCTURE = "rgb(255 255 255 / 0.14)";
const EDGE = "#6e6e6e";
const LIT = "#c2f55c";
const PACKET = "#a98cff";
const HALO = "#0b0b0c"; // the console's surface, stroked behind edge labels

const tone: Record<NonNullable<GraphNode["tone"]>, string> = {
  client: "#a6a6a6",
  core: "#f3f3ef",
  service: "#a98cff",
  data: "#6e1bff",
  external: "#7f7f7f",
  job: "#a6a6a6",
};

// One line vocabulary: solid sync · dashed async (queue, cron) · dotted external.
const dash: Record<EdgeStyle, { strokeDasharray?: string; strokeLinecap?: "round" }> = {
  sync: {},
  async: { strokeDasharray: "6 5" },
  external: { strokeDasharray: "1.5 4.5", strokeLinecap: "round" },
};

function Ring() {
  return (
    <span aria-hidden className="size-3 shrink-0 rounded-[3px] border border-accent bg-accent/15 shadow-[0_0_0_2px_var(--color-bg)]" />
  );
}

function Legend({ copy, className = "" }: { copy: Copy; className?: string }) {
  const sample = (style: EdgeStyle) => (
    <svg width="28" height="6" aria-hidden className="shrink-0">
      <line x1="1" y1="3" x2="27" y2="3" stroke={EDGE} strokeWidth="1.5" {...dash[style]} />
    </svg>
  );
  return (
    <ul
      aria-label={copy.legend}
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6875rem] text-ink-faint ${className}`}
    >
      <li className="inline-flex items-center gap-2">
        {sample("sync")}
        {copy.sync}
      </li>
      <li className="inline-flex items-center gap-2">
        {sample("async")}
        {copy.async}
      </li>
      <li className="inline-flex items-center gap-2">
        {sample("external")}
        {copy.external}
      </li>
      <li className="inline-flex items-center gap-2.5">
        <Ring />
        {copy.mine}
      </li>
    </ul>
  );
}

type Props = { graph: Graph; title: string };

// Architecture console. Hover, focus or tap a node: its direct edges light up
// in lime, the rest of the system recedes and the caption says what the node
// does. Lime ring = the part I built. Edges draw in (MotionRoot, data-draw)
// through a mask, so dashed and dotted lines keep their vocabulary; violet
// packets travel only while the graph is on screen. Inside a FlowProvider,
// the playing step lights the nodes and edges it names and a lime packet walks
// them in order (hover still wins while the pointer is on a node). Phones get
// the same system as a pipeline of layers, one per lane.
export function SystemGraph({ graph, title }: Props) {
  const tiers = graph.tiers;
  const uid = useId().replace(/[^\w-]/g, "");
  const [active, setActive] = useState<string | null>(null);
  const [seen, setSeen] = useState(false);
  const motionOk = useMotionOk();
  const svgRef = useRef<SVGSVGElement>(null);
  const packetRef = useRef<SVGGElement>(null);
  const flow = useFlow();
  // not `t`: the phone list below names each tier `t`
  const copy = COPY[useLocale()];
  const step = flow?.step ?? -1;
  const engaged = step >= 0;

  const { byId, boxes, paths, labels, view, steps } = useMemo(() => {
    const byId = Object.fromEntries(graph.nodes.map((n) => [n.id, n]));
    const boxes = layout(graph.nodes);
    const paths: string[] = [];
    const labels: (string | null)[] = [];
    let top = -28;
    for (const e of graph.edges) {
      const [a, b, A, B] = [byId[e.from], byId[e.to], boxes[e.from], boxes[e.to]];
      paths.push(edgePath(a, b, A, B, e.arc));
      // a leftward edge carries its label on the reversed path, so it never reads upside down
      const back = e.arc ? B.cx < A.cx : b.x - a.x <= -40;
      labels.push(back && e.label ? edgePath(b, a, B, A, e.arc) : null);
      if (e.arc) top = Math.min(top, Math.min(A.y, B.y) - 0.75 * LIFT - 22);
    }
    const xs = [...Object.values(boxes).flatMap((b) => [b.x, b.x + b.w]), ...graph.tiers.map((t) => t.x)];
    const x = Math.floor(Math.min(...xs)) - 16;
    const y = Math.floor(top);
    const view = { x, y, w: Math.ceil(Math.max(...xs)) + 16 - x, h: graph.height + 48 - y };
    const steps = graph.steps?.map((hops) => (hops.length ? stepLinks(graph, hops) : null)) ?? [];
    return { byId, boxes, paths, labels, view, steps };
  }, [graph]);

  const flowLit = engaged ? (steps[step] ?? null) : null;
  const hoverLit = useMemo(() => {
    if (!active) return null;
    const ids = new Set([active]);
    const edges = new Set<number>();
    graph.edges.forEach((e, i) => {
      if (e.from === active || e.to === active) {
        ids.add(e.from);
        ids.add(e.to);
        edges.add(i);
      }
    });
    return { ids, edges };
  }, [active, graph]);
  const lit = hoverLit ?? flowLit;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting));
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  // SMIL packets: run only while the graph is on screen and no flow step owns it.
  useEffect(() => {
    const svg = svgRef.current;
    if (seen && !engaged) svg?.unpauseAnimations?.();
    else svg?.pauseAnimations?.();
  }, [seen, engaged]);

  // The flow's clock places the step packet: one edge per TRAVEL ms, eased, in the hop's direction.
  useEffect(() => {
    if (!flow) return;
    const drawn = matchMedia("(width >= 48rem)"); // md: below it the map is a list and the svg is hidden
    flow.setDraw((i, ms, animate) => {
      const g = packetRef.current;
      const svg = svgRef.current;
      if (!g || !svg) return;
      const k = Math.floor(ms / TRAVEL);
      const hop = steps[i]?.walk[k];
      const path = hop ? (svg.getElementById(`${uid}-e${hop.edge}`) as SVGPathElement | null) : null;
      if (!animate || !hop || !path || !drawn.matches) {
        g.setAttribute("opacity", "0");
        return;
      }
      const p = ms / TRAVEL - k;
      const t = p < 0.5 ? 4 * p * p * p : 1 - (2 - 2 * p) ** 3 / 2;
      const at = path.getPointAtLength(path.getTotalLength() * (hop.reverse ? 1 - t : t));
      g.setAttribute("transform", `translate(${at.x} ${at.y})`);
      g.setAttribute("opacity", String(Math.min(1, p * 8, (1 - p) * 8)));
    });
    return () => flow.setDraw(null);
  }, [flow, steps, uid]);

  const axis = graph.height + 14;
  const lanes = graph.lanes ?? [{ y: -Infinity, label: "" }];

  return (
    <div>
      {/* tablet / desktop: the graph itself; scrolls inside its console when narrow */}
      <div className="hidden md:block">
        <div className="overflow-x-auto overscroll-x-contain">
          <div data-draw className="min-w-[940px]">
            <svg
              ref={svgRef}
              viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
              className="block h-auto w-full"
              role="group"
              aria-label={title}
            >
              <defs>
                {(
                  [
                    ["a", EDGE],
                    ["ah", LIT],
                  ] as const
                ).map(([k, c]) => (
                  <marker
                    key={k}
                    id={`${uid}-${k}`}
                    viewBox="0 0 8 8"
                    refX="7"
                    refY="4"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path
                      d="M0.6,0.8 L7,4 L0.6,7.2"
                      fill="none"
                      stroke={c}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </marker>
                ))}
                {/* each edge is revealed by a solid stroke drawn in its mask */}
                {paths.map((p, i) => (
                  <mask key={i} id={`${uid}-m${i}`} maskUnits="userSpaceOnUse" x={view.x} y={view.y} width={view.w} height={view.h}>
                    <path d={p} fill="none" stroke="#fff" strokeWidth={18} className="draw" />
                  </mask>
                ))}
                {labels.map((d, i) => (d ? <path key={i} id={`${uid}-l${i}`} d={d} /> : null))}
              </defs>

              {/* construction: tier guides that overshoot, a datum axis, tier names, lanes */}
              <g aria-hidden>
                {tiers.map((t) => (
                  <line key={t.x} x1={t.x} x2={t.x} y1={-22} y2={axis + 6} stroke={STRUCTURE} strokeOpacity={0.6} className="draw" />
                ))}
                <line x1={view.x + 6} x2={view.x + view.w - 6} y1={axis} y2={axis} stroke={STRUCTURE} className="draw" />
                {tiers.map((t) => (
                  <text
                    key={t.x}
                    x={t.x}
                    y={axis + 22}
                    textAnchor="middle"
                    className="fill-ink-muted font-mono text-[10px] uppercase tracking-[0.14em]"
                  >
                    {t.name}
                  </text>
                ))}
                {graph.lanes?.map((l, i) => (
                  <g key={l.y}>
                    {i ? <line x1={view.x + 6} x2={view.x + view.w - 6} y1={l.y} y2={l.y} stroke={STRUCTURE} className="draw" /> : null}
                    <text x={view.x + 10} y={l.y + 16} className="fill-ink-muted font-mono text-[10px] uppercase tracking-[0.14em]">
                      {l.label}
                    </text>
                  </g>
                ))}
              </g>

              {/* edges: solid sync · dashed async · dotted external */}
              <g aria-hidden>
                {graph.edges.map((e, i) => {
                  const on = lit?.edges.has(i) ?? false;
                  const dim = lit && !on;
                  return (
                    <g key={i} className={`transition-opacity duration-300 ${dim ? "opacity-15" : ""}`}>
                      <g mask={`url(#${uid}-m${i})`}>
                        <path
                          id={`${uid}-e${i}`}
                          d={paths[i]}
                          fill="none"
                          stroke={on ? LIT : EDGE}
                          strokeWidth={on ? 1.6 : 1.15}
                          {...dash[e.style]}
                          className="transition-[stroke] duration-300"
                          markerEnd={`url(#${uid}-${on ? "ah" : "a"})`}
                        />
                        {motionOk ? (
                          <circle className="motion-only" r={2.4} fill={on ? LIT : PACKET} opacity={dim || engaged ? 0 : 1}>
                            <animateMotion
                              dur={`${2.6 + (i % 4) * 0.5}s`}
                              begin={`${1.6 + ((i * 0.37) % 2.4)}s`}
                              repeatCount="indefinite"
                              path={paths[i]}
                            />
                          </circle>
                        ) : null}
                      </g>
                      {e.label ? (
                        <text dy={-7} stroke={HALO} strokeWidth={3} paintOrder="stroke" className="fill-ink-muted font-mono text-[10px]">
                          <textPath href={`#${uid}-${labels[i] ? "l" : "e"}${i}`} startOffset="50%" textAnchor="middle">
                            {e.label}
                          </textPath>
                        </text>
                      ) : null}
                    </g>
                  );
                })}
              </g>

              {/* the playing step's packet; FlowProvider's clock moves it */}
              {flow ? (
                <g ref={packetRef} aria-hidden opacity={0} className="motion-only pointer-events-none">
                  <circle r={7} fill={LIT} opacity={0.18} />
                  <circle r={3.2} fill={LIT} />
                </g>
              ) : null}

              {/* nodes */}
              {graph.nodes.map((n) => {
                const b = boxes[n.id];
                const on = active ? active === n.id : !!flowLit?.ids.has(n.id);
                const dim = lit && !lit.ids.has(n.id);
                return (
                  <g
                    key={n.id}
                    tabIndex={0}
                    role="img"
                    aria-label={`${n.label}${n.sub ? `, ${n.sub}` : ""}.${n.detail ? ` ${n.detail}` : ""}${n.mine ? ` ${copy.builtByMe}` : ""}`}
                    onMouseEnter={() => setActive(n.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(n.id)}
                    onBlur={() => setActive(null)}
                    className={`cursor-default transition-opacity duration-300 ${dim ? "opacity-30" : ""}`}
                  >
                    {n.mine ? (
                      <rect
                        x={b.x - 4}
                        y={b.y - 4}
                        width={b.w + 8}
                        height={H + 8}
                        rx={3}
                        fill="none"
                        stroke={LIT}
                        strokeOpacity={on ? 0.9 : 0.4}
                        className="transition-[stroke-opacity] duration-300"
                      />
                    ) : null}
                    <rect
                      x={b.x}
                      y={b.y}
                      width={b.w}
                      height={H}
                      rx={2}
                      fill={on ? "#1b1b1d" : n.mine ? "rgb(194 245 92 / 0.06)" : "#131314"}
                      stroke={n.mine ? LIT : on ? "#f3f3ef" : "rgb(255 255 255 / 0.24)"}
                      strokeWidth={n.mine ? 1.25 : 1}
                      className="transition-[fill,stroke] duration-300"
                    />
                    <rect x={b.x + 12} y={n.y - 11} width={5} height={5} rx={1} fill={tone[n.tone ?? "service"]} />
                    <text x={b.x + 22} y={n.y - 4} className="fill-ink font-sans text-[12.5px] font-semibold">
                      {n.label}
                    </text>
                    {n.sub ? (
                      <text x={b.x + 12} y={n.y + 13} className="fill-ink-muted font-mono text-[9.5px]">
                        {n.sub}
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-faint xl:hidden">{copy.scroll}</p>
        <div className="mt-5 grid gap-x-10 gap-y-4 border-t border-line pt-4 lg:grid-cols-[minmax(0,1fr)_auto]">
          {/* every caption shares one cell: the tallest sets the height, so hovering never shifts the page */}
          <div aria-hidden className="grid max-w-2xl text-sm leading-6 [&>*]:[grid-area:1/1]">
            <p className={active ? "invisible" : "text-ink-muted"}>{copy.hint}</p>
            {graph.nodes.map((n) => (
              <p key={n.id} className={active === n.id ? "" : "invisible"}>
                <span className="font-medium text-ink">{n.label}</span>
                {n.mine ? (
                  <span className="ml-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent">{copy.mine}</span>
                ) : null}
                <span className="block text-ink-muted">{n.detail}</span>
              </p>
            ))}
          </div>
          <Legend copy={copy} className="lg:max-w-[22rem] lg:justify-end" />
        </div>
      </div>

      {/* phone: the same system as a pipeline of layers (one per lane); tap a node for its role */}
      <div className="md:hidden">
        {lanes.map((lane, li) => {
          const end = lanes[li + 1]?.y ?? Infinity;
          const groups = tiers
            .map((t) => ({
              t,
              items: graph.nodes.filter((n) => n.y >= lane.y && n.y < end && Math.abs(n.x - t.x) < 60).sort((a, b) => a.y - b.y),
            }))
            .filter((g) => g.items.length);
          return (
            <div key={lane.y} className={li ? "mt-10" : undefined}>
              {lane.label ? <p className="t-label mb-5 text-ink-muted">{lane.label}</p> : null}
              {/* the rail sits beside the list: an <ol> may only hold <li> */}
              <div className="relative">
                <span aria-hidden className="absolute bottom-4 left-[7px] top-2 w-px bg-line-strong" />
                <ol aria-label={lane.label ? `${title}: ${lane.label}` : title}>
                  {groups.map(({ t, items }, ti) => (
                    <li key={t.x} className="relative pb-8 pl-8 last:pb-0">
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 grid size-[15px] place-items-center rounded-[2px] border border-line-strong bg-bg"
                      >
                        <span className="size-[5px] rounded-full bg-violet-soft" />
                      </span>
                      <p className="t-label pt-0.5">
                        <span className="tabular text-ink">{String(ti + 1).padStart(2, "0")}</span> · {t.name}
                      </p>
                      <ul className="mt-3.5 grid gap-2.5">
                        {items.map((n) => {
                          const open = active === n.id;
                          const now = !!flowLit?.ids.has(n.id);
                          const detailId = `${uid}-d-${n.id}`;
                          const look = now
                            ? `bg-raised ${n.mine ? "border-accent" : "border-ink"}`
                            : n.mine
                              ? "border-accent/60 bg-accent/[0.05]"
                              : "border-line bg-elevated";
                          return (
                            <li
                              key={n.id}
                              className={`rounded-[2px] border transition-[opacity,border-color,background-color] duration-300 ${look} ${
                                flowLit && !now ? "opacity-40" : ""
                              }`}
                            >
                              <button
                                type="button"
                                aria-expanded={open}
                                aria-controls={n.detail ? detailId : undefined}
                                onClick={() => setActive(open ? null : n.id)}
                                className="flex min-h-12 w-full items-start gap-3 rounded-[2px] px-3.5 py-3 text-left"
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="block text-[0.9375rem] font-medium leading-5 text-ink">{n.label}</span>
                                  {n.sub ? (
                                    <span className="mt-1 block font-mono text-[0.8125rem] leading-5 text-ink-muted">{n.sub}</span>
                                  ) : null}
                                </span>
                                {n.mine ? (
                                  <span className="t-label mt-1 text-accent">
                                    <span aria-hidden>{copy.mineTag}</span>
                                    <span className="sr-only">{copy.mine}</span>
                                  </span>
                                ) : null}
                                <Plus
                                  aria-hidden
                                  strokeWidth={1.75}
                                  className={`mt-0.5 size-4 shrink-0 transition-transform duration-300 ${open ? "rotate-45 text-accent" : "text-ink-faint"}`}
                                />
                              </button>
                              {n.detail ? (
                                <p
                                  id={detailId}
                                  hidden={!open}
                                  className="border-t border-line-faint px-3.5 pb-3.5 pt-3 text-[0.875rem] leading-6 text-ink-muted"
                                >
                                  {n.detail}
                                </p>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          );
        })}
        <p className="mt-7 flex items-center gap-2.5 text-[0.8125rem] leading-5 text-ink-muted">
          <Ring />
          {copy.tap}
        </p>
      </div>

      {/* the edges, for screen readers */}
      <div className="sr-only">
        <p>{copy.connections(title)}</p>
        <ul>
          {graph.edges.map((e, i) => (
            <li key={i}>
              {byId[e.from].label} {copy.to} {byId[e.to].label}: {copy.style[e.style]}
              {e.label ? `, ${e.label}` : ""}.
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

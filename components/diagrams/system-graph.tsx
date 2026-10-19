"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useMotionOk } from "@/lib/use-motion-ok";
import type { EdgeStyle, Graph, GraphEdge, GraphNode } from "@/lib/projects";

const H = 50; // node height
const W = 136; // default node width
const SUB_CH = 0.6 * 9.5; // Geist Mono: every glyph is 0.6em; sub-labels are 9.5px
const LABEL_CH = 7; // ≈ Geist Medium advance at 12.5px

// V2 palette: structure for construction, one light (blue) and ink. No green here.
const STRUCTURE = "#244561";
const EDGE = "#4a78a0";
const BLUE = "#5e9eff";
const BLUE_BRIGHT = "#8dbaff";

const tone: Record<NonNullable<GraphNode["tone"]>, string> = {
  client: "#a3afbf",
  core: BLUE,
  service: BLUE_BRIGHT,
  data: "#e8edf4",
  external: "#7c8aa0",
  job: EDGE,
};

const styleName: Record<EdgeStyle, string> = {
  sync: "síncrono",
  async: "assíncrono",
  external: "integração externa",
};

type Box = { x: number; y: number; w: number; cx: number };

// Nodes widen to fit their labels. The outer columns grow outward, so a long
// sub-label never crowds the next column.
function layout(nodes: GraphNode[]) {
  const xs = nodes.map((n) => n.x);
  const left = Math.min(...xs);
  const right = Math.max(...xs);
  const boxes: Record<string, Box> = {};
  for (const n of nodes) {
    const base = n.w ?? W;
    const need = Math.ceil(Math.max(32 + n.label.length * LABEL_CH, n.sub ? 22 + n.sub.length * SUB_CH : 0));
    const w = Math.max(base, need);
    const grow = w - base;
    const x = n.x - base / 2 - (n.x === left ? grow : n.x === right ? 0 : grow / 2);
    boxes[n.id] = { x, y: n.y - H / 2, w, cx: x + w / 2 };
  }
  return boxes;
}

function edgePath(a: GraphNode, b: GraphNode, A: Box, B: Box) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) < 40) {
    // same column: leave from the bottom/top edge
    const down = dy > 0;
    const y1 = down ? A.y + H : A.y;
    const y2 = down ? B.y : B.y + H;
    const my = (y1 + y2) / 2;
    return `M${A.cx},${y1} C${A.cx},${my} ${B.cx},${my} ${B.cx},${y2}`;
  }
  const right = dx > 0;
  const x1 = right ? A.x + A.w : A.x;
  const x2 = right ? B.x : B.x + B.w;
  const mx = (x1 + x2) / 2;
  return `M${x1},${a.y} C${mx},${a.y} ${mx},${b.y} ${x2},${b.y}`;
}

function Ring() {
  return (
    <span
      aria-hidden
      className="size-3 shrink-0 rounded-[3px] border border-blue bg-blue/15 shadow-[0_0_0_2px_var(--color-bg),0_0_0_3px_rgb(94_158_255/0.5)]"
    />
  );
}

export function Legend({ className = "" }: { className?: string }) {
  const sample = (style: EdgeStyle) => (
    <svg width="28" height="6" aria-hidden className="shrink-0">
      <line x1="1" y1="3" x2="27" y2="3" stroke={EDGE} strokeWidth="1.5" className={`edge-${style}`} />
    </svg>
  );
  return (
    <ul aria-label="Legenda" className={`flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6875rem] text-ink-faint ${className}`}>
      <li className="inline-flex items-center gap-2">
        {sample("sync")}
        síncrono
      </li>
      <li className="inline-flex items-center gap-2">
        {sample("async")}
        assíncrono · fila · cron
      </li>
      <li className="inline-flex items-center gap-2">
        {sample("external")}
        integração externa
      </li>
      <li className="inline-flex items-center gap-2.5">
        <Ring />
        construído por mim
      </li>
    </ul>
  );
}

type Props = {
  graph: Graph;
  title: string;
  tiers: { x: number; name: string }[];
  hint?: string;
};

// Architecture console. Hover, focus or tap a node: its direct edges light up
// in blue, the rest of the system recedes and the caption says what the node
// does. Blue ring = the part I built. Edges draw in (MotionRoot, data-draw)
// through a mask, so dashed and dotted lines keep their vocabulary; packets
// travel only while the graph is on screen. Phones get the same system as a
// pipeline of layers.
export function SystemGraph({ graph, title, tiers, hint = "Passe o cursor, toque ou navegue com Tab pelos nós." }: Props) {
  const uid = useId().replace(/[^\w-]/g, "");
  const [active, setActive] = useState<string | null>(null);
  const motionOk = useMotionOk();
  const svgRef = useRef<SVGSVGElement>(null);

  const { byId, boxes, paths, view } = useMemo(() => {
    const byId = Object.fromEntries(graph.nodes.map((n) => [n.id, n]));
    const boxes = layout(graph.nodes);
    const paths = graph.edges.map((e) => edgePath(byId[e.from], byId[e.to], boxes[e.from], boxes[e.to]));
    const xs = [...Object.values(boxes).flatMap((b) => [b.x, b.x + b.w]), ...tiers.map((t) => t.x)];
    const x = Math.floor(Math.min(...xs)) - 16;
    const view = { x, y: -28, w: Math.ceil(Math.max(...xs)) + 16 - x, h: graph.height + 76 };
    return { byId, boxes, paths, view };
  }, [graph, tiers]);

  const linked = useMemo(() => {
    if (!active) return null;
    const ids = new Set([active]);
    const edges = new Set<GraphEdge>();
    for (const e of graph.edges)
      if (e.from === active || e.to === active) {
        ids.add(e.from);
        ids.add(e.to);
        edges.add(e);
      }
    return { ids, edges };
  }, [active, graph]);

  // SMIL packets: run only while the graph is on screen.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) svg.unpauseAnimations?.();
      else svg.pauseAnimations?.();
    });
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  const axis = graph.height + 14;

  return (
    <div>
      {/* tablet / desktop: the graph itself; scrolls inside its console when narrow */}
      <div className="hidden md:block">
        <div className="overflow-x-auto overscroll-x-contain">
          <div data-draw className="min-w-[860px]">
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
                    ["ah", BLUE],
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
                    <path d="M0.6,0.8 L7,4 L0.6,7.2" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </marker>
                ))}
                {/* each edge is revealed by a solid stroke drawn in its mask */}
                {paths.map((p, i) => (
                  <mask key={i} id={`${uid}-m${i}`} maskUnits="userSpaceOnUse" x={view.x} y={view.y} width={view.w} height={view.h}>
                    <path d={p} fill="none" stroke="#fff" strokeWidth={18} className="draw" />
                  </mask>
                ))}
              </defs>

              {/* construction: tier guides that overshoot, a datum axis, tier names */}
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
                    className="fade-edge fill-ink-faint font-mono text-[10px] uppercase tracking-[0.14em]"
                  >
                    {t.name}
                  </text>
                ))}
              </g>

              {/* edges: solid sync · dashed async · dotted external */}
              <g aria-hidden>
                {graph.edges.map((e, i) => {
                  const on = linked?.edges.has(e) ?? false;
                  const dim = linked && !on;
                  return (
                    <g key={i} className={`transition-opacity duration-300 ${dim ? "opacity-15" : ""}`}>
                      <g mask={`url(#${uid}-m${i})`}>
                        <path
                          id={`${uid}-e${i}`}
                          d={paths[i]}
                          fill="none"
                          stroke={on ? BLUE : EDGE}
                          strokeWidth={on ? 1.6 : 1.15}
                          className={`edge-${e.style} transition-[stroke] duration-300`}
                          markerEnd={`url(#${uid}-${on ? "ah" : "a"})`}
                        />
                        {motionOk ? (
                          <circle className="motion-only" r={2.4} fill={e.style === "sync" ? BLUE : BLUE_BRIGHT} opacity={dim ? 0 : 1}>
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
                        <text dy={-7} className="fade-edge fill-ink-faint font-mono text-[10px]">
                          <textPath href={`#${uid}-e${i}`} startOffset="50%" textAnchor="middle">
                            {e.label}
                          </textPath>
                        </text>
                      ) : null}
                    </g>
                  );
                })}
              </g>

              {/* nodes */}
              {graph.nodes.map((n) => {
                const b = boxes[n.id];
                const on = active === n.id;
                const dim = linked && !linked.ids.has(n.id);
                return (
                  <g
                    key={n.id}
                    tabIndex={0}
                    role="img"
                    aria-label={`${n.label}${n.sub ? `, ${n.sub}` : ""}.${n.detail ? ` ${n.detail}` : ""}${n.mine ? " Construído por mim." : ""}`}
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
                        rx={9}
                        fill="none"
                        stroke={BLUE}
                        strokeOpacity={on ? 0.85 : 0.4}
                        className="transition-[stroke-opacity] duration-300"
                      />
                    ) : null}
                    <rect
                      x={b.x}
                      y={b.y}
                      width={b.w}
                      height={H}
                      rx={6}
                      fill={on ? "#1b2939" : n.mine ? "#122039" : "#111925"}
                      stroke={n.mine ? BLUE : on ? BLUE_BRIGHT : STRUCTURE}
                      strokeWidth={n.mine ? 1.25 : 1}
                      className="transition-[fill,stroke] duration-300"
                    />
                    <rect x={b.x + 12} y={n.y - 11} width={5} height={5} rx={1} fill={tone[n.tone ?? "service"]} />
                    <text x={b.x + 22} y={n.y - 4} className="fill-ink text-[12.5px] font-medium">
                      {n.label}
                    </text>
                    {n.sub ? (
                      <text x={b.x + 12} y={n.y + 13} className="fill-ink-faint font-mono text-[9.5px]">
                        {n.sub}
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <p className="hud mt-3 lg:hidden">arraste para ver o sistema inteiro →</p>
        <div className="mt-5 grid gap-x-10 gap-y-4 border-t border-line pt-4 lg:grid-cols-[minmax(0,1fr)_auto]">
          {/* every caption shares one cell: the tallest sets the height, so hovering never shifts the page */}
          <div aria-hidden className="grid max-w-2xl text-sm leading-6 [&>*]:[grid-area:1/1]">
            <p className={active ? "invisible" : "text-ink-faint"}>{hint}</p>
            {graph.nodes.map((n) => (
              <p key={n.id} className={active === n.id ? "" : "invisible"}>
                <span className="font-medium text-ink">{n.label}</span>
                {n.mine ? <span className="ml-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-blue">construído por mim</span> : null}
                <span className="block text-ink-muted">{n.detail}</span>
              </p>
            ))}
          </div>
          <Legend className="lg:max-w-[27rem] lg:justify-end" />
        </div>
      </div>

      {/* phone: the same system as a pipeline of layers; tap a node for its role */}
      <div data-loop className="md:hidden">
        {/* rail and packet sit beside the list: an <ol> may only hold <li> */}
        <div className="relative">
          <span aria-hidden className="absolute bottom-4 left-[7px] top-2 w-px bg-structure" />
          <span
            aria-hidden
            className="flow-pulse motion-only absolute left-[5px] size-[5px] rounded-full bg-blue-bright shadow-[0_0_8px_rgb(141_186_255/0.75)]"
          />
          <ol aria-label={title}>
            {tiers.map((t, ti) => {
              const items = graph.nodes.filter((n) => Math.abs(n.x - t.x) < 60).sort((a, b) => a.y - b.y);
              return (
                <li key={t.x} className="relative pb-8 pl-8 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 grid size-[15px] place-items-center rounded-[4px] border border-line-strong bg-bg"
                  >
                    <span className="size-[5px] rounded-full bg-blue" />
                  </span>
                  <p className="hud pt-0.5">
                    <span className="text-blue tabular">{String(ti + 1).padStart(2, "0")}</span> · {t.name}
                  </p>
                  <ul className="mt-3.5 grid gap-2.5">
                    {items.map((n) => {
                      const open = active === n.id;
                      const detailId = `${uid}-d-${n.id}`;
                      return (
                        <li
                          key={n.id}
                          className={`rounded-[6px] border transition-colors duration-300 ${
                            n.mine ? "border-blue/70 bg-blue/[0.06] shadow-[0_0_0_3px_rgb(94_158_255/0.12)]" : "border-line bg-surface"
                          }`}
                        >
                          <button
                            type="button"
                            aria-expanded={open}
                            aria-controls={n.detail ? detailId : undefined}
                            onClick={() => setActive(open ? null : n.id)}
                            className="flex min-h-12 w-full items-start gap-3 rounded-[6px] px-3.5 py-3 text-left"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block text-[0.9375rem] font-medium leading-5 text-ink">{n.label}</span>
                              {n.sub ? <span className="mt-1 block font-mono text-[0.8125rem] leading-5 text-ink-faint">{n.sub}</span> : null}
                            </span>
                            {n.mine ? (
                              <span className="hud mt-1 text-blue">
                                <span aria-hidden>meu</span>
                                <span className="sr-only">construído por mim</span>
                              </span>
                            ) : null}
                            <Plus
                              aria-hidden
                              strokeWidth={1.75}
                              className={`mt-0.5 size-4 shrink-0 transition-transform duration-300 ${open ? "rotate-45 text-blue" : "text-ink-faint"}`}
                            />
                          </button>
                          {n.detail ? (
                            <p id={detailId} hidden={!open} className="border-t border-line-faint px-3.5 pb-3.5 pt-3 text-[0.875rem] leading-6 text-ink-muted">
                              {n.detail}
                            </p>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="mt-7 flex items-center gap-2.5 text-[0.8125rem] leading-5 text-ink-faint">
          <Ring />
          construído por mim · toque num nó para ver o papel dele
        </p>
      </div>

      {/* the edges, for screen readers */}
      <div className="sr-only">
        <p>Conexões de {title}:</p>
        <ul>
          {graph.edges.map((e, i) => (
            <li key={i}>
              {byId[e.from].label} para {byId[e.to].label}: {styleName[e.style]}
              {e.label ? `, ${e.label}` : ""}.
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

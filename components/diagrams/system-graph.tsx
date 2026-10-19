"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useMotionOk } from "@/lib/use-motion-ok";
import type { Graph, GraphEdge, GraphNode } from "@/lib/projects";

const H = 50; // node height
const W = 136; // default node width

const tone: Record<NonNullable<GraphNode["tone"]>, string> = {
  client: "#929dad",
  core: "#4388ff",
  service: "#82aaff",
  data: "#a9c8ff",
  external: "#7a8596",
  job: "#46d9ff",
};

function box(n: GraphNode) {
  const w = n.w ?? W;
  return { x: n.x - w / 2, y: n.y - H / 2, w, h: H };
}

function edgePath(a: GraphNode, b: GraphNode) {
  const A = box(a);
  const B = box(b);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) < 40) {
    // vertical
    const down = dy > 0;
    const x1 = a.x;
    const y1 = down ? A.y + A.h : A.y;
    const x2 = b.x;
    const y2 = down ? B.y : B.y + B.h;
    const my = (y1 + y2) / 2;
    return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
  }
  const right = dx > 0;
  const x1 = right ? A.x + A.w : A.x;
  const x2 = right ? B.x : B.x + B.w;
  const mx = (x1 + x2) / 2;
  return `M${x1},${a.y} C${mx},${a.y} ${mx},${b.y} ${x2},${b.y}`;
}

export function Legend({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.68rem] text-ink-faint ${className}`}>
      <span className="inline-flex items-center gap-2">
        <svg width="26" height="6" aria-hidden>
          <line x1="0" y1="3" x2="26" y2="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        síncrono
      </span>
      <span className="inline-flex items-center gap-2">
        <svg width="26" height="6" aria-hidden>
          <line x1="0" y1="3" x2="26" y2="3" stroke="currentColor" strokeWidth="1.5" className="edge-async" />
        </svg>
        assíncrono · fila · cron
      </span>
      <span className="inline-flex items-center gap-2">
        <svg width="26" height="6" aria-hidden>
          <line x1="1" y1="3" x2="26" y2="3" stroke="currentColor" strokeWidth="1.5" className="edge-external" />
        </svg>
        integração externa
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="size-2.5 rounded-[3px] border border-blue bg-blue/20" aria-hidden />
        construído por mim
      </span>
    </div>
  );
}

type Props = {
  graph: Graph;
  title: string;
  tiers: { x: number; name: string }[];
  hint?: string;
};

export function SystemGraph({ graph, title, tiers, hint = "Passe o cursor ou navegue com Tab pelos nós." }: Props) {
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState<string | null>(null);
  const motionOk = useMotionOk();
  const svgRef = useRef<SVGSVGElement>(null);
  const byId = useMemo(() => Object.fromEntries(graph.nodes.map((n) => [n.id, n])), [graph]);

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

  const activeNode = active ? byId[active] : null;

  return (
    <div>
      {/* desktop / tablet: the real graph */}
      <div className="hidden md:block" data-reveal>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${graph.width} ${graph.height}`}
          className="h-auto w-full overflow-visible"
          role="group"
          aria-label={title}
        >
          <defs>
            <marker id={`arrow-${uid}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0.5 L7,4 L0,7.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </marker>
            <radialGradient id={`glow-${uid}`}>
              <stop offset="0" stopColor="#46d9ff" stopOpacity="0.9" />
              <stop offset="1" stopColor="#46d9ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* tier guides */}
          {tiers.map((t) => (
            <g key={t.x} aria-hidden>
              <line x1={t.x} y1={-6} x2={t.x} y2={graph.height + 6} stroke="rgb(148 163 184 / 0.07)" strokeDasharray="2 6" />
              <text x={t.x} y={graph.height + 26} textAnchor="middle" className="fill-ink-faint font-mono text-[10px] uppercase tracking-[0.12em]">
                {t.name}
              </text>
            </g>
          ))}

          {/* edges */}
          {graph.edges.map((e, i) => {
            const a = byId[e.from];
            const b = byId[e.to];
            const d = edgePath(a, b);
            const on = linked?.edges.has(e);
            const dim = linked && !on;
            return (
              <g key={i} className={`transition-opacity duration-300 ${dim ? "opacity-15" : "opacity-100"}`} style={{ color: on ? "#4388ff" : "rgb(148 163 184 / 0.45)" }}>
                <path
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={on ? 1.6 : 1.2}
                  className={`${e.style === "sync" ? "draw" : "fade-edge"} edge-${e.style}`}
                  style={{ "--len": 420, "--dd": `${200 + i * 60}ms` } as React.CSSProperties}
                  markerEnd={`url(#arrow-${uid})`}
                  pathLength={e.style === "sync" ? 420 : undefined}
                />
                {e.label ? (
                  <text className="fill-ink-faint font-mono text-[9.5px]" dy={-6}>
                    <textPath href={`#p-${uid}-${i}`} startOffset="50%" textAnchor="middle">
                      {e.label}
                    </textPath>
                  </text>
                ) : null}
                <path id={`p-${uid}-${i}`} d={d} fill="none" stroke="none" />
                {motionOk && (
                  <circle r={2.6} fill={e.style === "sync" ? "#6fa3ff" : "#46d9ff"} opacity={dim ? 0 : 0.95}>
                    <animateMotion dur={`${2.4 + (i % 4) * 0.5}s`} begin={`${(i * 0.37) % 2.4}s`} repeatCount="indefinite" path={d} />
                  </circle>
                )}
              </g>
            );
          })}

          {/* nodes */}
          {graph.nodes.map((n) => {
            const b = box(n);
            const on = active === n.id;
            const dim = linked && !linked.ids.has(n.id);
            return (
              <g
                key={n.id}
                tabIndex={0}
                role="img"
                aria-label={`${n.label}${n.sub ? `, ${n.sub}` : ""}${n.detail ? `. ${n.detail}` : ""}${n.mine ? ". Construído por mim." : ""}`}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                className={`cursor-default outline-none transition-opacity duration-300 ${dim ? "opacity-25" : "opacity-100"} [&:focus-visible>rect:first-of-type]:stroke-blue`}
              >
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx={9}
                  fill={on ? "#16203a" : "#0d1118"}
                  stroke={n.mine ? "#4388ff" : on ? "rgb(148 163 184 / 0.5)" : "rgb(148 163 184 / 0.22)"}
                  strokeWidth={n.mine ? 1.3 : 1}
                  className="transition-[fill,stroke] duration-300"
                />
                {n.mine ? <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={9} fill="#4388ff" opacity={0.07} /> : null}
                <circle cx={b.x + 14} cy={n.y - 7} r={3} fill={tone[n.tone ?? "service"]} />
                <text x={b.x + 24} y={n.y - 3} className="fill-ink text-[12.5px] font-medium">
                  {n.label}
                </text>
                {n.sub ? (
                  <text x={b.x + 14} y={n.y + 14} className="fill-ink-faint font-mono text-[9.5px]">
                    {n.sub}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>

        <div className="grid-cols-1 mt-10 grid min-h-[4.5rem] gap-3 border-t border-line pt-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
          <p className="max-w-xl text-sm leading-6 text-ink-muted">
            {activeNode ? (
              <>
                <span className="font-medium text-ink">{activeNode.label}</span>
                {activeNode.mine ? <span className="ml-2 font-mono text-[0.68rem] text-blue">construído por mim</span> : null}
                <span className="block">{activeNode.detail}</span>
              </>
            ) : (
              <span className="text-ink-faint">{hint}</span>
            )}
          </p>
          <Legend className="lg:max-w-[26rem] lg:justify-end" />
        </div>
      </div>

      {/* phone: the same system as an ordered stack of layers */}
      <ol className="md:hidden" aria-label={title} data-reveal>
        {tiers.map((t, ti) => {
          const items = graph.nodes.filter((n) => Math.abs(n.x - t.x) < 60);
          return (
            <li key={t.x} className="relative pb-6 pl-7 last:pb-0">
              {ti < tiers.length - 1 ? <span aria-hidden className="absolute left-[7px] top-2 h-full w-px bg-line" /> : null}
              <span aria-hidden className="absolute left-0 top-1 grid size-[15px] place-items-center rounded-[4px] border border-line-strong bg-surface">
                <span className="size-1.5 rounded-full bg-cyan/80" />
              </span>
              <p className="hud">
                {String(ti + 1).padStart(2, "0")} · {t.name}
              </p>
              <ul className="mt-3 grid gap-2">
                {items.map((n) => (
                  <li
                    key={n.id}
                    className={`rounded-lg border px-3.5 py-2.5 ${n.mine ? "border-blue/60 bg-blue/[0.06]" : "border-line bg-surface"}`}
                  >
                    <p className="flex items-center justify-between gap-3 text-sm font-medium text-ink">
                      {n.label}
                      {n.mine ? <span className="font-mono text-[0.62rem] font-normal text-blue">meu</span> : null}
                    </p>
                    {n.sub ? <p className="mt-0.5 font-mono text-[0.68rem] text-ink-faint">{n.sub}</p> : null}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
        <li className="pt-6">
          <Legend />
        </li>
      </ol>
    </div>
  );
}

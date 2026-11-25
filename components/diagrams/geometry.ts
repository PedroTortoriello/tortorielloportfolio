// Geometry of the system map, shared by the component and its data check
// (node components/diagrams/check-graphs.mjs), so both measure the same drawing.
import type { Graph, GraphNode, Hop } from "@/lib/projects";

export const H = 50; // node height
const W = 136; // default node width
const SUB_CH = 0.6 * 9.5; // Geist Mono: every glyph is 0.6em; sub-labels are 9.5px
const LABEL_CH = 7; // ≈ Inter Tight semibold advance at 12.5px
export const LIFT = 56; // how far a return arc's handles rise above its nodes

export type Box = { x: number; y: number; w: number; cx: number };

// Nodes widen to fit their labels. The outer columns grow outward, so a long
// sub-label never crowds the next column.
export function layout(nodes: GraphNode[]) {
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

// Same column: bottom to top. A return arc (arc: true) leaves the top and lands
// on the top, over everything between. Otherwise side to side, either way.
export function edgePath(a: GraphNode, b: GraphNode, A: Box, B: Box, arc = false) {
  if (arc) return `M${A.cx},${A.y} C${A.cx},${A.y - LIFT} ${B.cx},${B.y - LIFT} ${B.cx},${B.y}`;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) < 40) {
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

// What one flow step lights: every node a hop names, and every edge a hop walks,
// in either direction (a reply travels an edge backwards). Order is kept for the packet.
export function stepLinks(graph: Graph, hops: Hop[]) {
  const ids = new Set<string>();
  const edges = new Set<number>();
  const walk: { edge: number; reverse: boolean }[] = [];
  for (const h of hops) {
    ids.add(h.from);
    if (!h.to) continue;
    ids.add(h.to);
    const fwd = graph.edges.findIndex((e) => e.from === h.from && e.to === h.to);
    const edge = fwd >= 0 ? fwd : graph.edges.findIndex((e) => e.from === h.to && e.to === h.from);
    if (edge < 0) continue; // check-graphs.mjs reports it
    edges.add(edge);
    walk.push({ edge, reverse: fwd < 0 });
  }
  return { ids, edges, walk };
}

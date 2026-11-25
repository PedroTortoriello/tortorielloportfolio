// Checks every system map in lib/projects.ts. Run: node components/diagrams/check-graphs.mjs
// (Node 24 strips the TS types.) Ids and flow steps resolve, no two nodes overlap, no edge
// crosses a node it does not join, and every edge label fits its edge. Labels widen their
// nodes, so the maps are checked again with the Portuguese labels (lib/i18n/pt).
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { localize } from "../../lib/i18n/paths.ts";
import { projects } from "../../lib/projects.ts";
import { H, edgePath, layout, stepLinks } from "./geometry.ts";

const ptDir = new URL("../../lib/i18n/pt/", import.meta.url);
const pt = Object.assign({}, ...readdirSync(ptDir).map((f) => JSON.parse(readFileSync(new URL(f, ptDir), "utf8"))));
const locales = { en: projects, pt: localize(projects, "projects", pt) };

const point = (d, t) => {
  const [x0, y0, x1, y1, x2, y2, x3, y3] = d.match(/-?[\d.]+/g).map(Number);
  const u = 1 - t;
  const f = (a, b, c, e) => u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * e;
  return [f(x0, x1, x2, x3), f(y0, y1, y2, y3)];
};
const inside = ([x, y], b, m) => x > b.x - m && x < b.x + b.w + m && y > b.y - m && y < b.y + H + m;

let maps = 0;
for (const [locale, list] of Object.entries(locales))
  for (const p of list) {
    const g = p.architecture.graph;
    if (!g) continue;
    maps++;
    const at = (msg) => `${locale} ${p.slug}: ${msg}`;
    const byId = Object.fromEntries(g.nodes.map((n) => [n.id, n]));
    const boxes = layout(g.nodes);
    assert.equal(Object.keys(byId).length, g.nodes.length, at("duplicate node id"));

    for (const n of g.nodes)
      assert.ok(
        g.tiers.some((t) => Math.abs(n.x - t.x) < 60),
        at(`${n.id} sits under no tier`),
      );
    for (const [i, a] of g.nodes.entries())
      for (const b of g.nodes.slice(i + 1)) {
        const A = boxes[a.id];
        const B = boxes[b.id];
        const apart = A.x + A.w + 12 < B.x || B.x + B.w + 12 < A.x || A.y + H + 12 < B.y || B.y + H + 12 < A.y;
        assert.ok(apart, at(`${a.id} and ${b.id} overlap`));
      }

    for (const e of g.edges) {
      const a = byId[e.from];
      const b = byId[e.to];
      assert.ok(a && b, at(`edge ${e.from} → ${e.to} names an unknown node`));
      const d = edgePath(a, b, boxes[e.from], boxes[e.to], e.arc);
      let len = 0;
      let prev = point(d, 0);
      for (let s = 1; s <= 60; s++) {
        const q = point(d, s / 60);
        len += Math.hypot(q[0] - prev[0], q[1] - prev[1]);
        prev = q;
        if (s < 2 || s > 58) continue;
        for (const n of g.nodes)
          if (n.id !== e.from && n.id !== e.to) assert.ok(!inside(q, boxes[n.id], 6), at(`${e.from} → ${e.to} runs through ${n.id}`));
      }
      if (e.label) assert.ok(len >= e.label.length * 6 + 20, at(`label "${e.label}" is longer than its edge`));
    }

    if (g.steps) {
      assert.equal(g.steps.length, p.architecture.flow.length, at("one step per flow line"));
      g.steps.forEach((hops, i) => {
        for (const h of hops) for (const id of [h.from, h.to]) if (id) assert.ok(byId[id], at(`step ${i + 1} names unknown ${id}`));
        const walked = hops.filter((h) => h.to).length;
        assert.equal(stepLinks(g, hops).walk.length, walked, at(`step ${i + 1} walks an edge the map does not have`));
      });
    }
    if (g.lanes)
      assert.ok(
        g.nodes.every((n) => n.y > g.lanes[0].y),
        at("a node above the first lane"),
      );
  }

assert.ok(maps > 0, "no system maps found");
console.log(`system maps ok: ${maps} (${Object.keys(locales).join(", ")})`);

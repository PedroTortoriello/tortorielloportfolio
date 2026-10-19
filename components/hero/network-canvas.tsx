"use client";

import { useEffect, useRef } from "react";

// A layered service graph (client → edge → api → workers → data) drawn on
// canvas, with data pulses travelling left to right and nodes that light up
// near the cursor. Pauses offscreen; static under reduced motion.

type N = { x: number; y: number; tier: number; label?: string; ring: boolean };
type E = { a: number; b: number };
type P = { path: number[]; seg: number; t: number; speed: number };

const TIERS = [0.44, 0.57, 0.7, 0.83, 0.955];
const COUNTS = [3, 4, 5, 4, 3];
const LABELS: Record<string, string> = {
  "0-1": "client",
  "1-0": "edge",
  "1-3": "gateway",
  "2-1": "api",
  "2-3": "auth",
  "3-0": "worker",
  "3-2": "queue",
  "4-1": "postgres",
  "4-2": "webhook",
};

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

function bez(a: N, b: N, t: number) {
  const mx = (a.x + b.x) / 2;
  const u = 1 - t;
  // cubic with horizontal tangents: p0=a, p1=(mx,a.y), p2=(mx,b.y), p3=b
  const x = u * u * u * a.x + 3 * u * u * t * mx + 3 * u * t * t * mx + t * t * t * b.x;
  const y = u * u * u * a.y + 3 * u * u * t * a.y + 3 * u * t * t * b.y + t * t * t * b.y;
  return [x, y] as const;
}

export function NetworkCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const stage = canvas.closest("section") ?? canvas.parentElement!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Canvas cannot read CSS variables in ctx.font: resolve the family once.
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "ui-monospace, monospace";

    // roundRect is missing in Safari < 16: fall back to a plain rect.
    const box = (x: number, y: number, bw: number, bh: number, r: number) =>
      ctx.roundRect ? ctx.roundRect(x, y, bw, bh, r) : ctx.rect(x, y, bw, bh);

    let w = 0;
    let h = 0;
    let nodes: N[] = [];
    let edges: E[] = [];
    let out: number[][] = [];
    let pulses: P[] = [];
    let raf = 0;
    let visible = true;
    let start = performance.now();
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = rng(7);
      const narrow = w < 768;
      nodes = [];
      const tiers = narrow ? [0.12, 0.34, 0.56, 0.78, 0.95] : TIERS;
      tiers.forEach((tx, tier) => {
        const n = COUNTS[tier];
        const top = narrow ? 0.62 : 0.14;
        const bottom = narrow ? 0.97 : 0.86;
        for (let i = 0; i < n; i++) {
          const fy = top + ((i + 0.5) / n) * (bottom - top);
          nodes.push({
            x: w * tx + (rand() - 0.5) * 26,
            y: h * fy + (rand() - 0.5) * 30,
            tier,
            label: narrow ? undefined : LABELS[`${tier}-${i}`],
            ring: rand() > 0.62,
          });
        }
      });
      edges = [];
      const byTier = (t: number) => nodes.map((n, i) => [n, i] as const).filter(([n]) => n.tier === t);
      for (let t = 0; t < tiers.length - 1; t++) {
        const next = byTier(t + 1);
        for (const [n, i] of byTier(t)) {
          const sorted = [...next].sort((p, q) => Math.abs(p[0].y - n.y) - Math.abs(q[0].y - n.y));
          edges.push({ a: i, b: sorted[0][1] });
          if (rand() > 0.35) edges.push({ a: i, b: sorted[1][1] });
        }
        // every node in the next tier needs an input
        for (const [m, j] of next) {
          if (!edges.some((e) => e.b === j)) {
            const prev = byTier(t).sort((p, q) => Math.abs(p[0].y - m.y) - Math.abs(q[0].y - m.y));
            edges.push({ a: prev[0][1], b: j });
          }
        }
      }
      out = nodes.map((_, i) => edges.map((e, k) => (e.a === i ? k : -1)).filter((k) => k >= 0));
      pulses = [];
    };

    const spawn = (): P => {
      const firsts = nodes.map((n, i) => (n.tier === 0 ? i : -1)).filter((i) => i >= 0);
      let at = firsts[Math.floor(Math.random() * firsts.length)];
      const path: number[] = [];
      while (out[at]?.length) {
        const k = out[at][Math.floor(Math.random() * out[at].length)];
        path.push(k);
        at = edges[k].b;
      }
      return { path, seg: 0, t: 0, speed: 0.55 + Math.random() * 0.35 };
    };

    const draw = (now: number) => {
      const intro = reduce ? 1 : Math.min(1, (now - start) / 1600);
      ctx.clearRect(0, 0, w, h);

      // edges
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const near = Math.min(Math.hypot(a.x - mouse.x, a.y - mouse.y), Math.hypot(b.x - mouse.x, b.y - mouse.y));
        const glow = Math.max(0, 1 - near / 220);
        ctx.strokeStyle = glow > 0 ? `rgba(67,136,255,${0.12 + glow * 0.35})` : "rgba(148,163,184,0.11)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const steps = 24;
        const lim = Math.max(1, Math.round(steps * Math.min(1, intro * 1.4 - a.tier * 0.12)));
        if (intro * 1.4 - a.tier * 0.12 <= 0) continue;
        for (let s = 0; s <= lim; s++) {
          const [x, y] = bez(a, b, s / steps);
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // pulses
      if (!reduce && intro >= 1) {
        while (pulses.length < 9) pulses.push(spawn());
        for (const p of pulses) {
          const e = edges[p.path[p.seg]];
          if (!e) continue;
          const a = nodes[e.a];
          const b = nodes[e.b];
          for (let k = 7; k >= 0; k--) {
            const tt = p.t - k * 0.035;
            if (tt < 0) continue;
            const [x, y] = bez(a, b, tt);
            ctx.fillStyle = `rgba(70,217,255,${(1 - k / 8) * 0.75})`;
            ctx.beginPath();
            ctx.arc(x, y, k === 0 ? 1.8 : 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
          p.t += 0.012 * p.speed;
          if (p.t >= 1) {
            p.t = 0;
            p.seg++;
          }
        }
        pulses = pulses.filter((p) => p.seg < p.path.length);
      }

      // nodes + labels
      ctx.font = `10px ${mono}`;
      for (const n of nodes) {
        const appear = Math.min(1, Math.max(0, intro * 1.6 - n.tier * 0.15));
        if (appear <= 0) continue;
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const glow = Math.max(0, 1 - d / 200);
        const base = 0.38 + glow * 0.6;
        ctx.globalAlpha = appear;
        ctx.fillStyle = glow > 0.05 ? `rgba(110,165,255,${base})` : `rgba(148,163,184,${base})`;
        ctx.beginPath();
        box(n.x - 2.5, n.y - 2.5, 5, 5, 1.2);
        ctx.fill();
        if (n.ring) {
          ctx.strokeStyle = `rgba(148,163,184,${0.18 + glow * 0.4})`;
          ctx.beginPath();
          box(n.x - 6.5, n.y - 6.5, 13, 13, 3);
          ctx.stroke();
        }
        if (n.label) {
          ctx.fillStyle = `rgba(146,157,173,${0.32 + glow * 0.5})`;
          ctx.fillText(n.label, n.x + 10, n.y - 8);
        }
        ctx.globalAlpha = 1;
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = visible && !reduce ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf && visible && !reduce && !document.hidden) raf = requestAnimationFrame(loop);
    };

    build();
    if (reduce) draw(performance.now());
    else kick();

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);

    const onVis = () => (document.hidden ? (cancelAnimationFrame(raf), (raf = 0)) : kick());
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (reduce) draw(performance.now());
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    stage.addEventListener("pointermove", onMove as EventListener, { passive: true });
    stage.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      stage.removeEventListener("pointermove", onMove as EventListener);
      stage.removeEventListener("pointerleave", onLeave);
      start = 0;
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}

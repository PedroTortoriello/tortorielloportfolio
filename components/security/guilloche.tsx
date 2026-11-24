import type { CSSProperties } from "react";
import s from "./advocacia.module.css";

// Security-print vocabulary for the advocacia route, drawn from curves the way
// engravers cut guilloché: one modulated ring, repeated with a small rotation
// so the copies weave. Everything is server-rendered SVG; motion is CSS.

const f = (v: number) => (Math.round(v * 10) / 10).toString().replace(/^(-?)0\./, "$1.");

// r(t) = R + a·sin(n·t + phase), as a relative path (small markup).
export function ring(R: number, a: number, n: number, phase = 0) {
  const N = n * 16;
  let d = "";
  let px = 0;
  let py = 0;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const r = R + a * Math.sin(n * t + phase);
    const x = Math.round(r * Math.cos(t) * 10) / 10;
    const y = Math.round(r * Math.sin(t) * 10) / 10;
    d += i === 0 ? `M${f(x)} ${f(y)}` : `l${f(x - px)} ${f(y - py)}`;
    px = x;
    py = y;
  }
  return `${d}z`;
}

// FNV-1a: a stable integer per office, mixed with its city's coordinates.
export function params(seed: string, lat: number, lon: number) {
  let h = 2166136261;
  for (const c of seed) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  h >>>= 0;
  const la = Math.floor(Math.abs(lat) * 10);
  const lo = Math.floor(Math.abs(lon) * 10);
  return {
    n1: 9 + (la % 7),
    k1: 14 + (h % 9),
    a1: 5 + (lo % 5),
    n2: 5 + (lo % 5),
    k2: 9 + ((h >>> 8) % 6),
    m: 3 + ((h >>> 16) % 4),
  };
}

type RosetteProps = {
  seed: string;
  lat: number;
  lon: number;
  className?: string;
  /** "hero" draws on load, "doc" draws as it scrolls into view; omitted = static. */
  draw?: "hero" | "doc";
  /** Fewer copies for small marks, where dense lines would fill in. */
  dense?: boolean;
  /** SVG id prefix, when the same rosette appears twice on a page. */
  id?: string;
};

export function Rosette({ seed, lat, lon, className = "", draw, dense = true, id = `ros-${seed}` }: RosetteProps) {
  const p = params(seed, lat, lon);
  const k1 = dense ? p.k1 : 6;
  const k2 = dense ? p.k2 : 4;
  const drawClass = draw === "hero" ? s.drawHero : draw === "doc" ? s.drawDoc : "";
  return (
    <svg
      viewBox="-100 -100 200 200"
      fill="none"
      aria-hidden
      className={`${s.rosette} ${drawClass} ${className}`}
      style={{ "--latent": `${180 / p.n1}deg` } as CSSProperties}
    >
      <defs>
        <path id={`${id}-o`} d={ring(76, p.a1, p.n1)} pathLength={1} vectorEffect="non-scaling-stroke" />
        <path id={`${id}-i`} d={ring(47, p.a1 * 0.85, p.n2, Math.PI / 2)} pathLength={1} vectorEffect="non-scaling-stroke" />
      </defs>
      <circle r={95} pathLength={1} stroke="var(--color-structure)" vectorEffect="non-scaling-stroke" />
      <circle r={91.5} pathLength={1} stroke="var(--color-structure)" vectorEffect="non-scaling-stroke" />
      <g className={s.latent} stroke="var(--color-structure)">
        {Array.from({ length: k1 }, (_, i) => (
          <use key={i} href={`#${id}-o`} transform={`rotate(${f((i * 360) / p.n1 / k1)})`} />
        ))}
      </g>
      <g stroke="var(--color-accent)">
        {Array.from({ length: k2 }, (_, i) => (
          <use key={i} href={`#${id}-i`} transform={`rotate(${f((i * 360) / p.n2 / k2)})`} />
        ))}
      </g>
      <path d={ring(14, 11, p.m)} pathLength={1} stroke="var(--color-accent)" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// A border strip of interlaced waves (the frame of a certificate).
export function WaveBand({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg width="100%" height="22" aria-hidden className={className}>
      <defs>
        <pattern id={id} width="28" height="22" patternUnits="userSpaceOnUse">
          <path d="M0 11C7 2 7 2 14 11S21 20 28 11" stroke="var(--color-structure)" strokeWidth=".8" fill="none" />
          <path d="M0 11C7 20 7 20 14 11S21 2 28 11" stroke="var(--color-accent)" strokeWidth=".8" fill="none" />
          <path d="M0 4.5C7 1 7 1 14 4.5S21 8 28 4.5M0 17.5C7 21 7 21 14 17.5S21 14 28 17.5" stroke="var(--color-structure)" strokeWidth=".5" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="22" fill={`url(#${id})`} />
    </svg>
  );
}

// The denomination numeral, filled with engraved lines like a banknote's.
export function Denomination({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 640 430" aria-hidden className={`${s.denomination} w-full`}>
      <defs>
        <pattern id="denominacao-linhas" width="36" height="7" patternUnits="userSpaceOnUse">
          <path d="M0 3.5Q9 .5 18 3.5T36 3.5" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" />
        </pattern>
      </defs>
      {/* textLength fits any two-digit value inside the plate */}
      <text
        x="320"
        y="392"
        textAnchor="middle"
        fontSize="470"
        textLength={String(value).length > 1 ? 470 : undefined}
        lengthAdjust="spacingAndGlyphs"
        fill="url(#denominacao-linhas)"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        className={s.numeral}
      >
        {value}
      </text>
    </svg>
  );
}

// Microprint: a line of text too small to copy, read as a rule.
export function Microtext({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p aria-hidden className={`${s.micro} ${className}`}>
      {Array.from({ length: 10 }, () => text).join(" · ")}
    </p>
  );
}

// A passport-style machine-readable zone (44 characters a line).
export function Mrz({ lines, className = "" }: { lines: string[]; className?: string }) {
  const pad = (l: string) => `${l}${"<".repeat(44)}`.slice(0, 44);
  return (
    <div aria-hidden className={`${s.mrz} ${className}`}>
      {lines.map((l) => (
        <p key={l}>{pad(l)}</p>
      ))}
    </div>
  );
}

// Status overprinted on the document, double-ruled like a printed mark.
export function Mark({ children, tone }: { children: string; tone: "valid" | "pending" }) {
  return <span className={`${s.mark} ${tone === "valid" ? s.markValid : s.markPending}`}>{children}</span>;
}

// Simple Icons "WhatsApp" (CC0).
export function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

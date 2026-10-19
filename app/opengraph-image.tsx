import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Pedro Tortoriello — Software Engineer · Full Stack Development & Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "node_modules/geist/dist/fonts", file));

// V2 palette: field, structure, the one light, ink.
const C = { bg: "#080B10", surface: "#111925", structure: "#244561", blue: "#5E9EFF", bright: "#8DBAFF", ink: "#E8EDF4", muted: "#A3AFBF", faint: "#7C8AA0" };

// Drafting sheet in miniature: 120px major grid, two datum lines that cross
// at the trajectory's last node, and the trajectory itself.
const majorX = Array.from({ length: 11 }, (_, i) => i * 120);
const majorY = Array.from({ length: 6 }, (_, i) => i * 120);
const NODE = [1104, 176] as const;
const TRAJ = `M 560 690 C 800 630 930 480 1000 360 S 1078 214 ${NODE[0]} ${NODE[1]}`;

export default async function OpengraphImage() {
  const [bold, medium, mono] = await Promise.all([
    font("geist-sans/Geist-Bold.ttf"),
    font("geist-sans/Geist-Medium.ttf"),
    font("geist-mono/GeistMono-Regular.ttf"),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 80px",
          backgroundColor: C.bg,
          color: C.ink,
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <linearGradient id="traj" x1="560" y1="0" x2="1104" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={C.structure} stopOpacity="0" />
              <stop offset="0.45" stopColor={C.structure} />
              <stop offset="0.8" stopColor={C.blue} />
              <stop offset="1" stopColor={C.bright} />
            </linearGradient>
            <radialGradient id="light" cx="0.92" cy="0.28" r="0.62">
              <stop offset="0" stopColor={C.blue} stopOpacity="0.16" />
              <stop offset="1" stopColor={C.blue} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="fade" cx="0.84" cy="0.3" r="0.7">
              <stop offset="0" stopColor={C.bg} stopOpacity="0" />
              <stop offset="1" stopColor={C.bg} stopOpacity="0.94" />
            </radialGradient>
          </defs>
          {majorX.map((x) => (
            <line key={`x${x}`} x1={x} y1="0" x2={x} y2="630" stroke={C.structure} strokeOpacity="0.45" />
          ))}
          {majorY.map((y) => (
            <line key={`y${y}`} x1="0" y1={y} x2="1200" y2={y} stroke={C.structure} strokeOpacity="0.45" />
          ))}
          <rect width="1200" height="630" fill="url(#fade)" />
          <rect width="1200" height="630" fill="url(#light)" />
          {/* datums through the node, overshooting the sheet */}
          <line x1="0" y1={NODE[1]} x2="1200" y2={NODE[1]} stroke={C.structure} strokeOpacity="0.8" />
          <line x1={NODE[0]} y1="0" x2={NODE[0]} y2="630" stroke={C.structure} strokeOpacity="0.8" />
          <path d={TRAJ} fill="none" stroke="#355C7E" strokeWidth="8" strokeDasharray="1 23" strokeOpacity="0.6" />
          <path d={TRAJ} fill="none" stroke="url(#traj)" strokeWidth="2.4" />
          <circle cx={NODE[0]} cy={NODE[1]} r="11" fill={C.bg} stroke={C.blue} strokeWidth="2" />
          <circle cx={NODE[0]} cy={NODE[1]} r="4" fill={C.bright} />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "GeistMono", fontSize: 19, letterSpacing: "0.12em", color: C.faint }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 6,
              border: `1.5px solid ${C.structure}`,
              backgroundColor: C.surface,
              color: C.ink,
              fontSize: 17,
              letterSpacing: "0.04em",
            }}
          >
            PT
          </div>
          <span>SALTO, SP · BRASIL</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 880 }}>
          <div style={{ fontWeight: 700, fontSize: 70, letterSpacing: "-0.04em", lineHeight: 1 }}>Engenharia de software.</div>
          <div style={{ fontWeight: 700, fontSize: 70, letterSpacing: "-0.04em", lineHeight: 1.02, color: C.muted, marginTop: 6 }}>
            Sistemas que resolvem problemas reais.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 18, fontSize: 24 }}>
          <span style={{ fontWeight: 500, color: C.ink }}>Pedro Tortoriello</span>
          <span style={{ color: C.structure }}>/</span>
          <span style={{ fontWeight: 500, color: C.muted }}>Software Engineer ·</span>
          <span style={{ fontWeight: 500, color: C.bright }}>Full Stack Development & Automation</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: bold, weight: 700 },
        { name: "Geist", data: medium, weight: 500 },
        { name: "GeistMono", data: mono, weight: 400 },
      ],
    },
  );
}

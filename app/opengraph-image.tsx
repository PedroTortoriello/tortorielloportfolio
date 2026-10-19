import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Pedro Tortoriello — Software Engineer · Full Stack Development & Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "node_modules/geist/dist/fonts", file));

export default async function OpengraphImage() {
  const [sans, mono] = await Promise.all([font("geist-sans/Geist-Medium.ttf"), font("geist-mono/GeistMono-Regular.ttf")]);
  const nodes = [
    [820, 150],
    [930, 230],
    [1040, 160],
    [900, 360],
    [1060, 330],
    [980, 470],
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#07090d",
          backgroundImage: "radial-gradient(circle at 82% 18%, rgba(67,136,255,0.30), rgba(7,9,13,0) 55%)",
          color: "#f2f5fa",
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
          {nodes.slice(0, -1).map(([x, y], i) => (
            <line key={i} x1={x} y1={y} x2={nodes[i + 1][0]} y2={nodes[i + 1][1]} stroke="rgba(148,163,184,0.25)" strokeWidth="1" />
          ))}
          {nodes.map(([x, y], i) => (
            <rect key={i} x={x - 4} y={y - 4} width="8" height="8" rx="2" fill={i % 2 ? "#46d9ff" : "#4388ff"} />
          ))}
        </svg>
        <div style={{ display: "flex", fontFamily: "GeistMono", fontSize: 22, color: "#929dad" }}>
          <span style={{ color: "#65e6a5" }}>pedro@portfolio</span>
          <span>:~$ whoami</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, letterSpacing: "-0.045em", lineHeight: 1 }}>Engenharia de software.</div>
          <div style={{ fontSize: 76, letterSpacing: "-0.045em", lineHeight: 1.05, color: "#929dad" }}>
            Sistemas que resolvem problemas reais.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "GeistMono", fontSize: 22, color: "#929dad" }}>
          <span style={{ color: "#f2f5fa" }}>Pedro Tortoriello</span>
          <span>Software Engineer · Full Stack Development & Automation</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: sans, weight: 500 },
        { name: "GeistMono", data: mono, weight: 400 },
      ],
    },
  );
}

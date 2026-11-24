import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { params, ring } from "@/components/security/guilloche";

export const alt = "Pedro Tortoriello — Software Engineer · Full Stack Development & Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "node_modules/geist/dist/fonts", file));

// V3 palette: security paper, cédula green, the one bordô ink, ink.
const C = { paper: "#E4EBE5", plate: "#EEF3EF", green: "#1F6B5E", bordo: "#7A1424", ink: "#141A22", muted: "#3C4750", faint: "#5B6670" };

// The same rosette math as the site (components/security/guilloche.tsx),
// written out as rotated copies because the OG renderer has no <use>.
const p = params("identidade", -23.5505, -46.6333);
const outer = ring(76, p.a1, p.n1);
const inner = ring(47, p.a1 * 0.85, p.n2, Math.PI / 2);
const wave = (y: number, flip: boolean) => {
  let d = `M0 ${y}`;
  for (let x = 0; x < 1200; x += 28) d += ` C${x + 7} ${y + (flip ? 9 : -9)} ${x + 7} ${y + (flip ? 9 : -9)} ${x + 14} ${y} S${x + 21} ${y + (flip ? -9 : 9)} ${x + 28} ${y}`;
  return d;
};

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
          padding: "78px 80px 70px",
          backgroundColor: C.paper,
          color: C.ink,
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          {/* certificate borders: interlaced green and bordô waves */}
          {[22, 608].map((y) => (
            <g key={y}>
              <path d={wave(y, false)} fill="none" stroke={C.green} strokeWidth="1.2" />
              <path d={wave(y, true)} fill="none" stroke={C.bordo} strokeWidth="1.2" />
            </g>
          ))}
          {/* the seal, at the right of the sheet */}
          <g transform="translate(1048 300) scale(1.72)">
            <circle r="95" fill="none" stroke={C.green} strokeWidth="0.5" />
            <circle r="91.5" fill="none" stroke={C.green} strokeWidth="0.5" />
            {Array.from({ length: p.k1 }, (_, i) => (
              <path key={`o${i}`} d={outer} fill="none" stroke={C.green} strokeWidth="0.32" transform={`rotate(${(i * 360) / p.n1 / p.k1})`} />
            ))}
            {Array.from({ length: p.k2 }, (_, i) => (
              <path key={`i${i}`} d={inner} fill="none" stroke={C.bordo} strokeWidth="0.32" transform={`rotate(${(i * 360) / p.n2 / p.k2})`} />
            ))}
            <path d={ring(14, 11, p.m)} fill="none" stroke={C.bordo} strokeWidth="0.5" />
          </g>
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "GeistMono", fontSize: 19, letterSpacing: "0.14em", color: C.bordo }}>
          REGISTRO PROFISSIONAL · SÃO PAULO · BRASIL
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div style={{ fontWeight: 700, fontSize: 68, letterSpacing: "-0.035em", lineHeight: 1 }}>Engenharia de software.</div>
          <div style={{ fontWeight: 700, fontSize: 68, letterSpacing: "-0.035em", lineHeight: 1.02, color: C.bordo, marginTop: 6 }}>
            Sistemas que resolvem problemas reais.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, fontSize: 24 }}>
            <span style={{ fontWeight: 500, color: C.ink }}>Pedro Tortoriello</span>
            <span style={{ color: C.green }}>/</span>
            <span style={{ fontWeight: 500, color: C.muted }}>Software Engineer · Full Stack Development & Automation</span>
          </div>
          <div style={{ display: "flex", fontFamily: "GeistMono", fontSize: 17, letterSpacing: "0.12em", color: C.faint }}>
            IDBRAGABRIEL&lt;DE&lt;FREITAS&lt;TORTORIELLO&lt;&lt;PEDRO&lt;&lt;
          </div>
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

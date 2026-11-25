import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, profile } from "@/lib/data";

export const alt = "Pedro Tortoriello — Software Engineer · Full Stack & Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "node_modules/geist/dist/fonts", file));

// The first screen as a card: black, the orb's silhouette (its rim, halo and
// two film ribbons, drawn with gradients since the OG renderer has no WebGL),
// the headline over it, and the corner lines.
export default async function OpengraphImage() {
  const [light, medium, mono] = await Promise.all([
    font("geist-sans/Geist-Light.ttf"),
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
          padding: "44px 56px",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        {/* halo, rim, film ribbons, glass */}
        <div
          style={{
            position: "absolute",
            left: 360,
            top: 75,
            width: 480,
            height: 480,
            borderRadius: 9999,
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(4,5,16,1) 0%, rgba(6,8,26,1) 58%, rgba(60,80,255,0.55) 68%, rgba(170,190,255,0.75) 70.5%, rgba(40,50,200,0.25) 72%, rgba(0,0,0,0) 74%)",
            boxShadow: "0 0 120px 20px rgba(48,60,230,0.28)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 500,
            top: 120,
            width: 300,
            height: 120,
            borderRadius: 9999,
            backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(214,92,255,0.55) 0%, rgba(0,0,0,0) 70%)",
            transform: "rotate(-24deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 400,
            top: 380,
            width: 300,
            height: 100,
            borderRadius: 9999,
            backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(70,230,255,0.45) 0%, rgba(0,0,0,0) 70%)",
            transform: "rotate(-18deg)",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 500, letterSpacing: "0.16em" }}>
          <span>PT®</span>
          <span style={{ display: "flex", gap: 34, fontSize: 14 }}>
            <span>WORK</span>
            <span>INTRO</span>
            <span>SKILLS</span>
            <span>CONTACT</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontWeight: 300, fontSize: 70, lineHeight: 1.08, letterSpacing: "-0.025em" }}>
          <span>{hero.headline[0]}</span>
          <span>{hero.headline[1]}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontFamily: "GeistMono", fontSize: 15, letterSpacing: "0.14em" }}>
          <span>{profile.name.toUpperCase()} · FULL STACK ENGINEER</span>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 9, height: 9, borderRadius: 9999, backgroundColor: "#c2f55c" }} />
            BRAZIL · WORKING WORLDWIDE
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: light, weight: 300 },
        { name: "Geist", data: medium, weight: 500 },
        { name: "GeistMono", data: mono, weight: 400 },
      ],
    },
  );
}

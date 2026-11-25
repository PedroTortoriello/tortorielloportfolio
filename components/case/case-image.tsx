import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { content, projectIn, type Locale } from "@/lib/i18n";
import { isLive } from "@/lib/projects";
import { statusIn } from "./case-blocks";

const COPY = {
  en: {
    alt: "A case study by Pedro Tortoriello: the project's title, category, role and stack on a black panel over its rendered cover",
    label: "Case study",
    category: "Category",
    role: "Role",
  },
  pt: {
    alt: "Um estudo de caso de Pedro Tortoriello: o título, a categoria, o papel e a stack do projeto num painel preto sobre a sua capa renderizada",
    label: "Estudo de caso",
    category: "Categoria",
    role: "Papel",
  },
} as const;

// For the routes' `alt` export (app/work/[slug]/opengraph-image.tsx and its /pt twin).
export const caseImageAlt = (locale: Locale) => COPY[locale].alt;

const read = (path: string) => readFile(join(process.cwd(), path));
const font = (file: string) => read(`node_modules/geist/dist/fonts/${file}`);

const SIZE = { width: 1200, height: 630 };
const INNER = 552; // the panel's text width
const mono = { fontFamily: "GeistMono", fontSize: 15, letterSpacing: "0.1em" } as const;

// A case as a link preview, in the work wall's voice: the cover is the fog wall
// and a black panel hangs on it with the index, the two-tone title, category,
// role (co-authorship stays labelled), four stack pills and the name.
// Satori decodes PNG, JPEG, GIF and SVG, not WebP, so the covers have JPEG copies in
// app/work/[slug]/_og/ (see README); both locales draw from them.
export async function caseImage(locale: Locale, slug: string) {
  const p = projectIn(locale, slug);
  if (!p) notFound();
  const t = COPY[locale];
  const { profile } = content(locale);

  const [cover, bold, medium, regular] = await Promise.all([
    read(`app/work/[slug]/_og/${p.slug}.jpg`),
    font("geist-sans/Geist-Bold.ttf"),
    font("geist-sans/Geist-Medium.ttf"),
    font("geist-mono/GeistMono-Regular.ttf"),
  ]);

  const [first, ...rest] = p.title.toUpperCase().split(" ");
  const lines = [`//${first}`, rest.join(" ")].filter(Boolean);
  // ponytail: sized by character count (Geist Bold caps run 0.54–0.65em at this tracking); measure glyphs if a title ever overflows.
  const titleSize = Math.min(84, Math.floor(INNER / (Math.max(...lines.map((l) => l.length)) * 0.66)));

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: "#d9dadb", fontFamily: "Geist" }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img */}
      <img
        src={`data:image/jpeg;base64,${cover.toString("base64")}`}
        alt=""
        width={1200}
        height={800}
        style={{ position: "absolute", left: 0, top: -85 }}
      />

      <div
        style={{
          position: "absolute",
          left: 48,
          top: 48,
          bottom: 48,
          width: INNER + 88,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px 44px",
          backgroundColor: "#000",
          color: "#f3f3ef",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", ...mono, letterSpacing: "0.14em" }}>
          <span style={{ display: "flex", gap: 18 }}>
            <span>{`[${p.index}]`}</span>
            <span style={{ color: "#a6a6a6" }}>{t.label.toUpperCase()}</span>
          </span>
          <span style={{ color: "#7f7f7f" }}>{p.year}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: 700,
              fontSize: titleSize,
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
            }}
          >
            {lines.map((l, i) => (
              <span key={l} style={{ color: i ? "#8a8a8a" : "#f3f3ef", whiteSpace: "nowrap" }}>
                {l}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 30, ...mono }}>
            {[
              [t.category, p.category],
              [t.role, p.role],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex" }}>
                <span style={{ width: 120, flexShrink: 0, color: "#7f7f7f" }}>{k.toUpperCase()}</span>
                <span style={{ flex: 1 }}>{v.toUpperCase()}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 26 }}>
            {p.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 32,
                  padding: "0 14px",
                  border: "1px solid rgba(255,255,255,0.24)",
                  borderRadius: 9999,
                  ...mono,
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  color: "#a6a6a6",
                }}
              >
                {s.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 500, fontSize: 16, letterSpacing: "0.16em" }}>{`${profile.name.toUpperCase()}®`}</span>
          {isLive(p.status) ? (
            <span style={{ display: "flex", alignItems: "center", gap: 10, ...mono, fontSize: 14, letterSpacing: "0.14em" }}>
              <span style={{ width: 9, height: 9, borderRadius: 9999, backgroundColor: "#c2f55c" }} />
              {statusIn(locale, p.status).toUpperCase()}
            </span>
          ) : null}
        </div>
      </div>
    </div>,
    {
      ...SIZE,
      fonts: [
        { name: "Geist", data: bold, weight: 700 },
        { name: "Geist", data: medium, weight: 500 },
        { name: "GeistMono", data: regular, weight: 400 },
      ],
    },
  );
}

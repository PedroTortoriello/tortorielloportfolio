import type { Metadata } from "next";
import { Stage } from "@/components/hero/stage";
import { Work } from "@/components/sections/work";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Recommendations } from "@/components/sections/recommendations";
import { OG_LOCALE, content } from "@/lib/i18n";

const title = "Pedro Tortoriello — Engenheiro de Software · Full Stack & Automação";
const description =
  "Engenheiro de software que constrói aplicações escaláveis, sistemas de automação inteligente e experiências digitais de alto desempenho. Baseado no Brasil, atuando no mundo todo.";

// A page-level openGraph replaces the layout's, so the card is restated: the root one
// (app/opengraph-image.tsx, the English first screen) until a Portuguese card exists.
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/pt", languages: { en: "/", "pt-BR": "/pt" } },
  openGraph: {
    type: "website",
    locale: OG_LOCALE.pt,
    siteName: content("pt").profile.name,
    url: "/pt",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, type: "image/png", alt: title }],
  },
};

// The home page in Portuguese: the same sections as app/page.tsx (keep the two in step).
export default function HomePt() {
  return (
    <>
      <Stage locale="pt" />
      <Work locale="pt" />
      <Skills locale="pt" />
      <Experience locale="pt" />
      <Recommendations locale="pt" />
      <Contact locale="pt" />
    </>
  );
}

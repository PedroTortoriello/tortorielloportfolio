// Short muted loops of the live products, by case slug. scripts/clips/record.mjs records them from each
// case's public URL in headless Chrome: nothing signed in, nothing typed, the page scrolled down and
// back up (12 s). The poster is the clip's first frame; the alt describes that frame. A case without an
// entry keeps its rendered cover (finance-platform: its public URL opens on a sign-in screen).
import type { Locale } from "@/lib/i18n/locale";

export type Clip = { webm?: string; mp4?: string; poster: string; alt: Record<Locale, string> };

const clip = (slug: string, alt: Record<Locale, string>): Clip => ({
  webm: `/work/clips/${slug}.webm`,
  mp4: `/work/clips/${slug}.mp4`,
  poster: `/work/clips/${slug}.webp`,
  alt,
});

export const videos: Partial<Record<string, Clip>> = {
  cadenceflow: clip("cadenceflow", {
    en: "The public home page of cadenceflow.pro, with the product's dashboard shown on a laptop",
    pt: "A página inicial pública do cadenceflow.pro, com o painel do produto exibido em um notebook",
  }),
  "legal-intelligence": clip("legal-intelligence", {
    en: "The public home page of RitoTech at ritotech.vercel.app, with an illustrative court notice shown on a phone",
    pt: "A página inicial pública do RitoTech, em ritotech.vercel.app, com uma intimação ilustrativa exibida em um celular",
  }),
  "automation-infrastructure": clip("automation-infrastructure", {
    en: "The public home page of Núcleo at nucleoaut.vercel.app, with an illustrative case screen",
    pt: "A página inicial pública do Núcleo, em nucleoaut.vercel.app, com uma tela de caso ilustrativa",
  }),
};

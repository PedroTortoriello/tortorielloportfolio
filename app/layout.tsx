import type { Metadata, Viewport } from "next";
// First: Tailwind declares the cascade layer order (theme, base, components,
// utilities). A component CSS module imported before it would declare
// "components" first and let the base reset win over every component class.
import "./globals.css";
import localFont from "next/font/local";
import { Anybody, Big_Shoulders_Stencil, Instrument_Serif, Inter_Tight, Outfit, Tektur } from "next/font/google";
import { Providers } from "@/components/ui/providers";
import { MotionRoot } from "@/components/motion/motion-root";
import { PortfolioOnly } from "@/components/site/portfolio-only";
import { SiteHeader } from "@/components/site/header";
import { Dock } from "@/components/site/dock";
import { SiteFooter } from "@/components/site/footer";
import { SkipLink } from "@/components/site/skip-link";
import { CommandPalette } from "@/components/fx/command-palette";
import { Terminal } from "@/components/fx/terminal";
import { Ask } from "@/components/fx/ask";
import { SoundFx } from "@/components/fx/sound-fx";
import { profile } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

// The machine's voice (labels, indices, the dock): a latin + arrows subset of the geist
// package's GeistMono-Variable.woff2, 71 KB down to 33 KB, wght axis kept. Rebuild with
// pyftsubset (see README) if mono text ever needs other scripts. adjustFontFallback off,
// as geist's own loader does: the fallback stays the ui-monospace stack.
const geistMono = localFont({
  src: "./fonts/GeistMono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  adjustFontFallback: false,
});

// Each section speaks in its reference's voice; the first three are on the
// first screen and preload, the rest load when a section needs them.
// Inter Tight: body, UI and the work wall. Outfit: the hero and the intro.
const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--ff-inter",
  display: "swap",
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--ff-outfit",
  display: "swap",
});
// Tektur and Big Shoulders Stencil: the skills wall and the dock.
const tektur = Tektur({
  subsets: ["latin"],
  variable: "--ff-tektur",
  display: "swap",
  preload: false,
});
// next/font has no metric overrides for this face, so no size-adjusted fallback is generated for it.
const stencil = Big_Shoulders_Stencil({
  subsets: ["latin"],
  variable: "--ff-stencil",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
// Anybody (wide, italic) and Instrument Serif: the contact finale.
const anybody = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  variable: "--ff-anybody",
  display: "swap",
  preload: false,
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--ff-instrument",
  display: "swap",
  preload: false,
});

const fonts = [
  geistMono.variable,
  inter.variable,
  outfit.variable,
  tektur.variable,
  stencil.variable,
  anybody.variable,
  instrument.variable,
].join(" ");

const title = "Pedro Tortoriello — Software Engineer · Full Stack & Automation";
const description =
  "Software engineer building scalable applications, intelligent automation systems and high-performance digital experiences. Based in Brazil, working worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s — Pedro Tortoriello" },
  description,
  keywords: [
    "Pedro Tortoriello",
    "software engineer",
    "full stack engineer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "automation",
    "n8n",
    "AI integrations",
    "SaaS",
    "remote",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  // the English home and its Portuguese version (pages that set their own alternates replace this)
  alternates: { canonical: "/", languages: { en: "/", "pt-BR": "/pt" } },
  openGraph: { type: "website", locale: "en_US", siteName: profile.name },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

// Before anything else: Portuguese routes (/pt, /pt/*, /landing-pages) get lang="pt-BR", and a
// visitor who paused motion (the header's toggle) gets html.still back. The opening plays on every
// full load of a home page, "/" or "/pt" (Pedro, 2026-11-24; client-side navigation never replays it),
// without a hash, when motion is allowed and not paused, on a connection that is not slow or saving data,
// and never for crawlers or automated audits. Two timers guard the page: if the
// opening has not started 3s in (slow device, failed script) the hero shows at
// once; at 16s of visible time it shows whatever happened (the opening runs ~7s). "pt:intro-end"
// tells the opening to stop.
const HEAD_SCRIPT = `(function(){var d=document.documentElement,w=window;d.classList.add('js');try{
var p=location.pathname;if(p==='/pt'||p.indexOf('/pt/')===0||p.indexOf('/landing-pages')===0)d.lang='pt-BR';
var still=false;try{still=!!localStorage.getItem('pt-still')}catch(e){}if(still)d.classList.add('still');
${process.env.NODE_ENV !== "production" ? "if(/[?&]intro\\b/.test(location.search)){d.classList.add('intro');w.__ptIntroForce=true;return}" : ""}
var c=navigator.connection;
if(!still&&(p==='/'||p==='/pt'||p==='/pt/')&&!location.hash&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!navigator.webdriver&&!/bot|crawl|spider|slurp|lighthouse|headless|pagespeed/i.test(navigator.userAgent)&&!(c&&(c.saveData||/2g|3g/.test(c.effectiveType||'')))){
d.classList.add('intro');
var end=function(){if(d.classList.contains('intro')){d.classList.remove('intro');d.classList.add('intro-done');w.dispatchEvent(new Event('pt:intro-end'))}};
setTimeout(function(){if(!w.__ptIntro)end()},3000);
setTimeout(function f(){if(document.hidden)return setTimeout(f,1000);end()},16000)}
}catch(e){}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.fullName,
  jobTitle: `${profile.role} · ${profile.focus}`,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Centro Universitário Facens",
  },
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "REST APIs",
    "PostgreSQL",
    "Supabase",
    "n8n",
    "Workflow automation",
    "AI integrations",
  ],
  sameAs: [profile.linkedin, profile.github],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fonts} suppressHydrationWarning>
      <head>
        {/* Before first paint: opt into motion (without JS everything stays visible), and decide
            whether the opening plays (components/hero/opening.tsx). */}
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <SkipLink />
        <Providers>
          <PortfolioOnly>
            <SiteHeader />
          </PortfolioOnly>
          <main id="content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <PortfolioOnly>
            <SiteFooter />
            <Dock />
            {/* overlays opened by keyboard or lib/events.ts, and the sound layer */}
            <CommandPalette />
            <Terminal />
            <Ask />
            <SoundFx />
          </PortfolioOnly>
        </Providers>
        <MotionRoot />
      </body>
    </html>
  );
}

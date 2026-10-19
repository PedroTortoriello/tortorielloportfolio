import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Hubot_Sans } from "next/font/google";
import { Providers } from "@/components/ui/providers";
import { ClientEffects } from "@/components/ui/client-effects";
import { MotionRoot } from "@/components/motion/motion-root";
import { MissionRail } from "@/components/chrome/mission-rail";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { profile } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// GitHub's engineering face, opened up on its width axis for the wall titles.
const hubot = Hubot_Sans({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-hubot", display: "swap" });

const title = "Pedro Tortoriello | Software Engineer · Full Stack Development & Automation";
const description =
  "Software Engineer full stack: aplicações web, APIs, integrações e automações com TypeScript, React, Next.js e Node.js. Cases de engenharia, experiência e stack.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | Pedro Tortoriello" },
  description,
  keywords: [
    "Pedro Tortoriello",
    "software engineer",
    "desenvolvedor full stack",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "APIs",
    "integrações",
    "automação",
    "SaaS",
    "landing pages",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  // No title/description/url here: Next fills them per route from each page's own metadata.
  openGraph: { type: "website", locale: "pt_BR", siteName: profile.name },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#080b10",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.fullName,
  jobTitle: `${profile.role} · ${profile.focus}`,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressRegion: "SP", addressCountry: "BR" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Centro Universitário Facens" },
  knowsAbout: ["TypeScript", "React", "Next.js", "Node.js", "APIs REST", "PostgreSQL", "Automação de processos", "SaaS"],
  sameAs: [profile.linkedin, profile.github],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable} ${hubot.variable}`} suppressHydrationWarning>
      <head>
        {/* Opt into motion only when JS runs: without it, everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://cdn.simpleicons.org" crossOrigin="anonymous" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[6px] focus:bg-blue focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-blue"
        >
          Pular para o conteúdo
        </a>
        <Providers>
          <SiteHeader />
          <MissionRail />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </Providers>
        <ClientEffects />
        <MotionRoot />
      </body>
    </html>
  );
}

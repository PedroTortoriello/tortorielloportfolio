import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "@/components/ui/providers";
import "./globals.css";

// Update to the production domain before deploy.
const SITE_URL = "https://pedrotortoriello.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pedro Tortoriello | IA, Automação e Desenvolvimento de Software",
    template: "%s | Pedro Tortoriello",
  },
  description:
    "Especialista em IA aplicada, automação de processos e desenvolvimento full stack. Construo SaaS, sistemas sob medida e automações que escalam negócios.",
  keywords: [
    "inteligência artificial",
    "automação de processos",
    "agentes de IA",
    "n8n",
    "make",
    "zapier",
    "desenvolvedor full stack",
    "saas",
    "next.js",
    "react",
    "consultor de automação",
    "Pedro Tortoriello",
  ],
  authors: [{ name: "Pedro Tortoriello" }],
  creator: "Pedro Tortoriello",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Pedro Tortoriello",
    title: "Pedro Tortoriello | IA, Automação e Desenvolvimento de Software",
    description:
      "Automações inteligentes e sistemas que escalam o seu negócio. IA aplicada, automação de processos e desenvolvimento full stack.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedro Tortoriello | IA, Automação e Software",
    description:
      "Automações inteligentes e sistemas que escalam o seu negócio.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1011",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pedro Tortoriello",
  jobTitle: "AI & Automation Specialist · Full Stack Developer",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressCountry: "BR",
  },
  knowsAbout: [
    "Inteligência Artificial",
    "Automação de Processos",
    "Desenvolvimento de Software",
    "SaaS",
    "Next.js",
    "n8n",
  ],
  sameAs: ["https://wa.me/5511942716215"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.simpleicons.org" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
        >
          Pular para o conteúdo
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

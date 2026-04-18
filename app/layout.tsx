import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro Tortoriello | Engenheiro de Software Full Stack",
  description:
    "Portfolio profissional de Pedro Tortoriello, engenheiro de software full stack focado em SaaS, sistemas sob medida, automacao e produtos digitais em producao.",
  keywords: [
    "engenheiro de software",
    "desenvolvedor full stack",
    "next.js",
    "react",
    "node.js",
    "automacao",
    "saas",
    "ia",
  ],
  openGraph: {
    title: "Pedro Tortoriello | Engenheiro de Software Full Stack",
    description:
      "SaaS, sistemas sob medida, automacao e produtos digitais em producao.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}

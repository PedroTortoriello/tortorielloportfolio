import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.example"), // Mude para seu domínio
  title: "Pedro Tortoriello | Engenheiro de Software",
  description:
    "Engenheiro de Software com 5 anos de experiência. Especialista em desenvolvimento Full Stack, SaaS escaláveis, integrações de IA e automação.",
  keywords: [
    "engenheiro de software",
    "desenvolvedor full stack",
    "next.js",
    "react",
    "node.js",
    "automação",
    "saas",
    "ia",
  ],
  openGraph: {
    title: "Pedro Tortoriello | Engenheiro de Software",
    description:
      "Arquitetura escalável, interfaces sofisticadas e execução técnica de alto nível.",
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
      <body className={`${manrope.variable} ${sora.variable} antialiased bg-[#030303] text-zinc-300 selection:bg-zinc-800 selection:text-zinc-100`}>
        {children}
      </body>
    </html>
  );
}
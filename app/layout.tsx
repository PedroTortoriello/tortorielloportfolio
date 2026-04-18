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
  title: "Pedro Tortoriello | Engenheiro de Software Full Stack",
  description:
    "Portfolio de Pedro Tortoriello, engenheiro de software full stack focado em SaaS, sistemas sob medida, automacao e produtos digitais de alta performance.",
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
      "SaaS, sistemas sob medida, automacao e produtos digitais de alta performance.",
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
      <body className={`${manrope.variable} ${sora.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

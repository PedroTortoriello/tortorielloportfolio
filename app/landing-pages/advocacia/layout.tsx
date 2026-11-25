import "./paper.css";
import { Archivo, Source_Serif_4 } from "next/font/google";

// This route keeps the V3 typefaces; they load only here.
const archivo = Archivo({ subsets: ["latin", "latin-ext"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin", "latin-ext"], axes: ["opsz"], style: ["normal", "italic"], variable: "--font-doc", display: "swap" });

export default function AdvocaciaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="pt-BR" className={`paper ${archivo.variable} ${serif.variable}`}>
      {children}
    </div>
  );
}

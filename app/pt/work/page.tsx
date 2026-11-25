import type { Metadata, ResolvingMetadata } from "next";
import { WorkIndex } from "@/components/work/work-index";
import { OG_LOCALE, content } from "@/lib/i18n";

const { profile, projects, archive } = content("pt");
const title = "Projetos";
const description = `${projects.length} estudos de caso e um arquivo com mais ${archive.length} sistemas de Pedro Tortoriello: produtos SaaS, automação, pipelines de IA e plataformas de clientes, com as suas stacks e links públicos.`;

export async function generateMetadata(_: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  // openGraph replaces the inherited one whole, so the inherited link image is carried over
  const images = (await parent).openGraph?.images;
  return {
    title,
    description,
    alternates: { canonical: "/pt/work", languages: { en: "/work", "pt-BR": "/pt/work" } },
    openGraph: {
      type: "website",
      locale: OG_LOCALE.pt,
      siteName: profile.name,
      url: "/pt/work",
      title: `${title} — ${profile.name}`,
      description,
      images,
    },
  };
}

// The same index as /work (components/work/work-index.tsx), in Portuguese.
export default function WorkPagePt() {
  return <WorkIndex locale="pt" />;
}

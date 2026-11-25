import type { Metadata } from "next";
import { WorkIndex } from "@/components/work/work-index";
import { archive, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: `${projects.length} case studies and an archive of ${archive.length} more systems by Pedro Tortoriello: SaaS products, automation, AI pipelines and client platforms, with their stacks and public links.`,
  alternates: { canonical: "/work", languages: { en: "/work", "pt-BR": "/pt/work" } },
};

// The UI lives in components/work/work-index.tsx; /pt/work renders the same index in Portuguese.
export default function WorkPage() {
  return <WorkIndex />;
}

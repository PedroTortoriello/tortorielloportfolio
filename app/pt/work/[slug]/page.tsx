import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage, caseMetadata } from "@/components/case/case-page";
import { projectIn } from "@/lib/i18n";
import { projects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

// The same four cases as /work/[slug]; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return caseMetadata("pt", projectIn("pt", (await params).slug));
}

// The case in Portuguese: the same page as /work/[slug] (components/case/case-page.tsx).
export default async function CaseRoutePt({ params }: Props) {
  const p = projectIn("pt", (await params).slug);
  if (!p) notFound();
  return <CasePage project={p} locale="pt" />;
}

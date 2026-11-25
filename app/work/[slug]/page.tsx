import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage, caseMetadata } from "@/components/case/case-page";
import { projectIn } from "@/lib/i18n";
import { projects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

// The four cases are known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return caseMetadata("en", projectIn("en", (await params).slug));
}

// The UI lives in components/case/case-page.tsx; /pt/work/[slug] renders the same case in Portuguese.
export default async function CaseRoute({ params }: Props) {
  const p = projectIn("en", (await params).slug);
  if (!p) notFound();
  return <CasePage project={p} />;
}

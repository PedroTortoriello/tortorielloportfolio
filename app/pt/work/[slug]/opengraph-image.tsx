import { caseImage, caseImageAlt } from "@/components/case/case-image";
import { projects } from "@/lib/projects";

export const alt = caseImageAlt("pt");
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The case's link card in Portuguese, rendered at build for the four cases.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseImagePt({ params }: { params: Promise<{ slug: string }> }) {
  return caseImage("pt", (await params).slug);
}

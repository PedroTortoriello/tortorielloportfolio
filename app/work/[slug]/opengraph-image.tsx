import { caseImage, caseImageAlt } from "@/components/case/case-image";
import { projects } from "@/lib/projects";

export const alt = caseImageAlt("en");
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// One card per case, rendered at build. The drawing is components/case/case-image.tsx,
// shared with /pt/work/[slug]/opengraph-image.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseImage({ params }: { params: Promise<{ slug: string }> }) {
  return caseImage("en", (await params).slug);
}

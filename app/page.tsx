import type { Metadata } from "next";
import { Stage } from "@/components/hero/stage";
import { Work } from "@/components/sections/work";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Recommendations } from "@/components/sections/recommendations";

// The rest of the home page's metadata is the layout's; hreflang points at the Portuguese twin.
export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { en: "/", "pt-BR": "/pt" } },
};

// Hero and intro share one stage (the orb stays while the intro arrives);
// then the work wall, the skills wall, the journey and the finale.
// app/pt/page.tsx renders the same sections with locale="pt": keep the two in step.
export default function Home() {
  return (
    <>
      <Stage />
      <Work />
      <Skills />
      <Experience />
      <Recommendations />
      <Contact />
    </>
  );
}

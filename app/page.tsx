import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/sections/projects";
import { Journey } from "@/components/sections/journey";
import { Stack } from "@/components/sections/stack";
import { Method } from "@/components/sections/method";
import { LandingPagesTeaser } from "@/components/sections/landing-pages-teaser";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Journey />
      <Stack />
      <Method />
      <LandingPagesTeaser />
      <Contact />
    </>
  );
}

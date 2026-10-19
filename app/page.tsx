import { Hero } from "@/components/hero/hero";
import { Projects } from "@/components/sections/projects";
import { Journey } from "@/components/sections/journey";
import { Method } from "@/components/sections/method";
import { Principles } from "@/components/sections/principles";
import { Stack } from "@/components/sections/stack";
import { LandingPagesTeaser } from "@/components/sections/landing-pages-teaser";
import { Contact } from "@/components/sections/contact";
import { MissionLine } from "@/components/chrome/mission-line";

export default function Home() {
  return (
    <>
      <Hero />
      {/* the stations the mission line runs through; Contact receives it */}
      <div className="relative">
        <MissionLine />
        <Projects />
        <Journey />
        <Method />
        <Principles />
        <Stack />
        <LandingPagesTeaser />
      </div>
      <Contact />
    </>
  );
}

import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { LogoStrip } from "@/components/sections/logo-strip";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { Process } from "@/components/sections/process";
import { Results } from "@/components/sections/results";
import { Faq } from "@/components/sections/faq";
import { CtaFinal } from "@/components/sections/cta";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <LogoStrip />
        <Services />
        <About />
        <Projects />
        <TechStack />
        <Process />
        <Results />
        <Faq />
        <CtaFinal />
      </main>
      <SiteFooter />
    </>
  );
}

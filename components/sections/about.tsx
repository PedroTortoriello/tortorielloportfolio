import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { differentiators, profile, qualities } from "@/lib/data";

export function About() {
  return (
    <section id="sobre" className="border-t border-border">
      <div className="container-page grid gap-14 py-[clamp(6rem,11vw,9rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <SectionHeading
            kicker="Sobre"
            title="Engenheiro de produto que pensa no negócio antes do código."
            lead={profile.summary}
          />

          <Reveal className="mt-10 border-t border-border">
            {differentiators.map((item) => (
              <div key={item.title} className="border-b border-border py-6">
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-2">
          <div className="panel overflow-hidden">
            <div className="relative aspect-4/3 w-full border-b border-border">
              <Image
                src={profile.aboutImage}
                alt="Ambiente de trabalho com código em tela durante o desenvolvimento de um sistema."
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-3 p-5">
              <span className="grid size-9 place-items-center rounded-md border border-border-strong font-mono text-xs">
                {profile.initials}
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{profile.name}</p>
                <p className="text-xs text-ink-faint">{profile.location}</p>
              </div>
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {qualities.map((q) => (
              <li
                key={q}
                className="rounded-md border border-border px-3 py-1.5 text-sm text-ink-muted"
              >
                {q}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

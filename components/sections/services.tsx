import { Boxes, Brain, Check, LayoutTemplate, Workflow, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/data";

const icons: Record<string, LucideIcon> = { Brain, Workflow, Boxes, LayoutTemplate };

export function Services() {
  return (
    <section id="servicos" className="border-t border-border">
      <div className="container-page py-[clamp(6rem,11vw,9rem)]">
      <SectionHeading
        kicker="Serviços"
        title="IA, automação e software trabalhando a favor do seu negócio."
        lead="São quatro frentes, e a maioria dos projetos combina mais de uma: um sistema que automatiza e usa IA, ou uma operação que precisa de diagnóstico antes de crescer."
      />

      <Reveal className="mt-14 border-t border-border">
        {services.map((service) => {
          const Icon = icons[service.icon] ?? Boxes;
          return (
            <div
              key={service.title}
              className="grid gap-6 border-b border-border py-9 lg:grid-cols-[1fr_1.05fr] lg:gap-14"
            >
              <div className="flex gap-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-border text-ink-muted">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink">{service.title}</h3>
                  <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-ink-muted">
                    {service.summary}
                  </p>
                </div>
              </div>

              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-2.5 text-sm text-ink-muted">
                    <Check className="size-4 shrink-0 text-ink-faint" aria-hidden />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Reveal>
      </div>
    </section>
  );
}

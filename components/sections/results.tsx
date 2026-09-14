import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { results } from "@/lib/data";

export function Results() {
  return (
    <section id="resultados" className="border-t border-border">
      <div className="container-page py-[clamp(6rem,11vw,9rem)]">
      <SectionHeading
        kicker="Resultados"
        title="O que esses projetos entregam, na prática."
        lead="O valor aparece quando a operação fica mais simples, o atendimento responde sozinho e a gestão enxerga tudo em um lugar só."
      />

      <Reveal className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
        {results.map((item) => (
          <div key={item.label} className="flex flex-col bg-bg-2 p-7 sm:p-8">
            <p className="font-mono text-2xl font-semibold leading-none tracking-tight text-ink tabular-nums sm:text-3xl">
              {item.metric}
            </p>
            <p className="mt-3 text-sm font-medium text-ink">{item.label}</p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-muted">{item.text}</p>
          </div>
        ))}
      </Reveal>
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { process as steps } from "@/lib/data";

export function Process() {
  return (
    <section id="processo" className="border-t border-border">
      <div className="container-page grid gap-14 py-[clamp(6rem,11vw,9rem)] lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            kicker="Processo"
            title="Do diagnóstico à escala, com método."
            lead="Um caminho previsível para sair de uma operação manual e chegar a um produto que funciona sozinho e continua evoluindo."
          />
        </div>

        <Reveal as="div">
          <ol className="border-t border-border">
            {steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[auto_1fr] gap-6 border-b border-border py-7">
                <span className="font-mono text-sm text-ink-faint tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-lg text-pretty text-sm leading-relaxed text-ink-muted">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

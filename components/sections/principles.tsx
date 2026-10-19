import { SectionHeader } from "@/components/ui/section-header";
import { principles } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");

// Princípios as flight rules: decided before the pressure arrives. An authored
// list, not cards: hairline rows, a mono rule index, the title set large, the
// rule in prose and where it shows in code. Hover lights the index and draws
// the row's hairline in blue.
export function Principles() {
  return (
    <section
      id="principios"
      data-station="04"
      data-station-label="Princípios"
      aria-labelledby="principios-title"
      className="section-y relative border-t border-line-faint"
    >
      <div className="container-x">
        <SectionHeader
          id="principios-title"
          index="04"
          label="Princípios"
          meta={`flight rules · ${pad(principles.length)}`}
          statement="Regras decididas antes da pressão chegar."
          lead="Princípios de engenharia que atravessam os projetos. Cada regra aponta onde ela aparece: num case ou na experiência."
        />

        <ol data-stagger className="mt-16 border-t border-line lg:mt-24">
          {principles.map((p, i) => (
            <li
              key={p.id}
              className="group relative grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-4 border-b border-line py-8 lg:grid-cols-[7rem_minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-x-10 lg:py-10"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-blue/70 transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
              <p className="col-start-2 row-start-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-faint tabular transition-colors duration-300 group-hover:text-blue lg:col-start-1">
                regra {pad(i + 1)}
              </p>
              <h3 className="col-start-1 row-start-1 display text-[clamp(1.5rem,2.6vw,2.4rem)] text-ink [--wdth:100] lg:col-start-2">
                {p.title}
              </h3>
              <div className="col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1">
                <p className="text-pretty text-base leading-7 text-ink-muted">{p.rule}</p>
                <p className="mt-3 font-mono text-[0.75rem] leading-5 text-blue">
                  <span aria-hidden>↳ </span>
                  <span className="sr-only">Onde aparece: </span>
                  {p.where}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

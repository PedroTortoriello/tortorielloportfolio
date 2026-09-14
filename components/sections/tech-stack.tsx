import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TechLogo } from "@/components/ui/tech-logo";
import { technologies, type Technology } from "@/lib/data";

const order = ["IA & Automação", "Frontend", "Backend", "Dados", "Infra & Cloud"];

const grouped = technologies.reduce<Record<string, Technology[]>>((acc, t) => {
  (acc[t.category] ??= []).push(t);
  return acc;
}, {});

const categories = order.filter((c) => grouped[c]?.length);

export function TechStack() {
  return (
    <section id="stack" className="border-t border-border">
      <div className="container-page py-[clamp(6rem,11vw,9rem)]">
      <SectionHeading
        kicker="Stack"
        title="Ferramentas escolhidas pelo que entregam em produção."
        lead="Da interface ao banco de dados, da automação à infraestrutura. IA e automação aparecem primeiro porque é onde está o maior ganho hoje."
      />

      <Reveal className="mt-14 border-t border-border">
        {categories.map((category) => (
          <div key={category} className="grid gap-5 border-b border-border py-8 lg:grid-cols-[200px_1fr] lg:gap-10">
            <div>
              <h3 className="text-sm font-semibold text-ink">{category}</h3>
              <p className="mt-1 font-mono text-xs text-ink-faint">{grouped[category].length} ferramentas</p>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {grouped[category].map((t) => (
                <li
                  key={t.name}
                  title={t.detail}
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3.5 py-3 transition-colors duration-200 hover:border-border-strong"
                >
                  <TechLogo src={t.logo} alt={t.name} className="size-5 shrink-0 opacity-80" />
                  <span className="truncate text-sm text-ink">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
      </div>
    </section>
  );
}

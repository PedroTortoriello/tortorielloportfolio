import { Bot, Database, MessageSquare, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { metrics, profile } from "@/lib/data";

const flow = [
  { icon: MessageSquare, title: "Mensagem recebida", note: "WhatsApp ou formulário" },
  { icon: Bot, title: "Agente de IA responde", note: "qualifica e entende" },
  { icon: Database, title: "Atualiza o sistema", note: "CRM e banco de dados" },
  { icon: Workflow, title: "Dispara a próxima ação", note: "automação em sequência" },
];

export function Hero() {
  return (
    <section id="top">
      <div className="container-page grid items-center gap-12 pt-32 pb-16 md:pt-40 md:pb-24 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
        <div>
          <p className="kicker">{profile.role}</p>

          <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.5rem,5.6vw,4.6rem)] font-medium leading-[1.03] tracking-[-0.03em] text-ink">
            {profile.headline}
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
            {profile.subheadline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={profile.whatsapp} external>
              Agendar reunião
            </Button>
            <Button href="#projetos" variant="secondary" withArrow>
              Ver projetos
            </Button>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-7">
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-3xl font-medium tracking-tight text-ink tabular-nums sm:text-4xl">
                  {m.value}
                </dt>
                <dd className="mt-1.5 text-sm text-ink-muted">{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Receded structural footnote to the headline — flush, no box */}
        <div className="mt-2 border-t border-border pt-8 lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
          <div className="flex items-center justify-between">
            <p className="kicker">Fluxo de automação</p>
            <span className="font-mono text-xs text-ink-faint">exemplo</span>
          </div>

          <ol className="mt-5 border-t border-border">
            {flow.map((node, i) => (
              <li key={node.title} className="flex items-center gap-4 border-b border-border py-3.5">
                <span className="w-5 shrink-0 font-mono text-xs text-ink-faint tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <node.icon className="size-4 shrink-0 text-ink-muted" aria-hidden />
                <span className="min-w-0">
                  <span className="block text-sm text-ink">{node.title}</span>
                  <span className="block text-xs text-ink-faint">{node.note}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight, FileText, MapPin, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { CopyButton } from "@/components/ui/copy-button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { profile } from "@/lib/data";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const channels = [
  { k: "linkedin", label: "linkedin.com/in/pedro-tortoriello", href: profile.linkedin, Icon: LinkedinIcon },
  { k: "github", label: `github.com/${profile.githubHandle}`, href: profile.github, Icon: GithubIcon },
];

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="section-y relative overflow-hidden border-t border-line-faint">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(800px_420px_at_85%_100%,rgb(67_136_255/0.12),transparent_65%)]" />
      <div className="container-x">
        <SectionHeader
          id="contato-title"
          index="06"
          label="Contact"
          meta="pt-BR · en"
          statement="Vamos construir algo que funcione em produção."
          lead="Para vagas, projetos ou uma conversa técnica. E-mail, LinkedIn e GitHub são os caminhos mais rápidos."
        />

        <div className="mt-16 border-t border-line lg:mt-24">
          <div data-reveal className="grid-cols-1 grid gap-4 border-b border-line py-7 sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-8">
            <p className="label">e-mail</p>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex min-w-0 items-center gap-3 text-[clamp(1.35rem,3.6vw,2.6rem)] font-medium tracking-[-0.035em] text-ink transition-colors hover:text-blue"
            >
              <span className="truncate">{profile.email}</span>
              <ArrowUpRight aria-hidden className="size-6 shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue" />
            </a>
            <CopyButton value={profile.email} label="Copiar e-mail" />
          </div>
          {channels.map((c, i) => (
            <div key={c.k} data-reveal style={d(80 + i * 60)} className="grid-cols-1 grid gap-3 border-b border-line py-6 sm:grid-cols-[8rem_1fr] sm:items-center sm:gap-8">
              <p className="label">{c.k}</p>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-w-0 items-center gap-3 text-[clamp(1.1rem,2.2vw,1.6rem)] font-medium tracking-[-0.025em] text-ink-muted transition-colors hover:text-ink"
              >
                <c.Icon className="size-5 shrink-0 text-ink-faint transition-colors group-hover:text-blue" />
                <span className="truncate">{c.label}</span>
                <ArrowUpRight aria-hidden className="size-5 shrink-0 text-ink-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          ))}
          <div data-reveal style={d(220)} className="flex flex-wrap items-center gap-x-8 gap-y-3 py-6 text-sm text-ink-muted">
            <a href={profile.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-ink">
              <FileText aria-hidden className="size-4 text-ink-faint" /> Currículo (PDF)
            </a>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-ink">
              <MessageCircle aria-hidden className="size-4 text-ink-faint" /> WhatsApp · {profile.whatsappLabel}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden className="size-4 text-ink-faint" /> {profile.location} · {profile.availability.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight, FileText, Mail, MessageCircle } from "lucide-react";
import { LocalTime } from "@/components/hero/local-time";
import { Button } from "@/components/ui/button";
import { Console, LiveDot } from "@/components/ui/console";
import { CopyButton } from "@/components/ui/copy-button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Rosette } from "@/components/security/guilloche";
import { profile } from "@/lib/data";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const channels = [
  { name: "LinkedIn", value: bare(profile.linkedin), href: profile.linkedin, Icon: LinkedinIcon },
  { name: "GitHub", value: bare(profile.github), href: profile.github, Icon: GithubIcon },
  { name: "Currículo (PDF)", value: profile.cv.slice(1), href: profile.cv, Icon: FileText },
  { name: "WhatsApp", value: profile.whatsappLabel, href: profile.whatsapp, Icon: MessageCircle },
];

// Station 07, the closing document: the security thread that ran the whole page
// ends on a seal, "canal aberto", and the page's last word is an invitation.
// Same furniture as SectionHeader (ruler, index), but the statement is the
// largest on the page after the front wall.
export function Contact() {
  return (
    <section
      id="contato"
      data-station="07"
      data-station-label="Contato"
      aria-labelledby="contato-title"
      className="section-y relative isolate flex flex-col justify-center overflow-hidden border-t border-line-faint lg:min-h-[100svh]"
    >
      {/* the guilloché ground returns behind the closing document */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="drafting-grid absolute inset-0 [mask-image:radial-gradient(ellipse_68%_62%_at_80%_34%,black_8%,transparent_74%)]" />
      </div>

      <div className="container-x">
        <div className="flex items-end gap-4">
          <span aria-hidden data-reveal="rule" className="ruler min-w-6 flex-1" />
          <span className="hud hidden shrink-0 md:block">pt-BR · en</span>
        </div>
        {/* arrival: the security thread ends on the series' closing seal */}
        <div aria-hidden className="mt-6 flex items-center gap-4">
          <span className="h-[3px] flex-1 bg-[repeating-linear-gradient(to_right,rgb(122_20_36/0.36)_0_18px,transparent_18px_34px)]" />
          <Rosette seed="contato" lat={-23.5505} lon={-46.6333} draw="doc" className="size-24 shrink-0" />
        </div>

        <h2
          id="contato-title"
          data-title
          className="display mt-8 text-[clamp(2.75rem,6.2vw,6rem)] text-ink [--wdth:112] lg:mt-10"
        >
          Vamos colocar o próximo sistema <span className="text-accent-deep">no ar.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div data-reveal style={d(120)} className="lg:col-span-5 lg:pr-8">
            {/* index beside the statement, never above it (same as SectionHeader) */}
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted">
              <span className="tabular text-accent">07</span>
              <span aria-hidden className="text-line-strong">
                {"  —  "}
              </span>
              Contato
            </p>
            <p className="mt-4 max-w-md text-pretty text-[1.0625rem] leading-8 text-ink-muted">
              Para vagas, projetos ou uma conversa técnica. E-mail, LinkedIn e GitHub são os caminhos mais rápidos.
            </p>
            <Button
              href={`mailto:${profile.email}`}
              arrow="right"
              icon={<Mail aria-hidden className="size-4" strokeWidth={1.75} />}
              className="mt-8 w-full sm:w-auto"
            >
              Enviar e-mail
            </Button>
            <dl className="mt-10 grid gap-3 border-t border-line pt-5 text-[0.875rem]">
              <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-3">
                <dt className="hud">local</dt>
                <dd className="text-ink-muted">{profile.location}</dd>
              </div>
              <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-3">
                <dt className="hud">atuação</dt>
                <dd className="text-ink-muted">
                  <LiveDot>{profile.availability}</LiveDot>
                </dd>
              </div>
            </dl>
          </div>

          <div data-power className="lg:col-span-7">
            <Console
              label="canais diretos"
              status={
                <span className="text-ink-faint">
                  hora local <LocalTime /> BRT
                </span>
              }
            >
              <div className="p-5 sm:p-6">
                <p className="hud">E-mail</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
                  <a
                    href={`mailto:${profile.email}`}
                    className="group inline-flex min-w-0 items-center gap-3 font-ui text-[clamp(1.25rem,5.4vw,2.4rem)] font-[680] leading-tight tracking-[-0.02em] text-ink transition-colors [font-variation-settings:'wdth'_106] hover:text-accent"
                  >
                    <span className="[overflow-wrap:anywhere]">{profile.email}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="hidden size-6 shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent sm:block"
                    />
                  </a>
                  <CopyButton value={profile.email} label="Copiar e-mail" />
                </div>
              </div>
              <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-2">
                {channels.map((c, i) => (
                  <li key={c.name} className={`border-line ${i > 0 ? "border-t" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${i % 2 ? "sm:border-l" : ""}`}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex min-h-[5.5rem] flex-col justify-between gap-3 p-5 transition-colors duration-200 hover:bg-elevated/60 sm:p-6"
                    >
                      <span className="flex items-center gap-2.5">
                        <c.Icon aria-hidden className="size-4 shrink-0 text-ink-faint transition-colors group-hover:text-accent" />
                        <span className="hud">{c.name}</span>
                        <ArrowUpRight
                          aria-hidden
                          className="ml-auto size-4 shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </span>
                      <span className="truncate text-[0.9375rem] text-ink">{c.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Console>
          </div>
        </div>
      </div>
    </section>
  );
}

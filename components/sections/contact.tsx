import { ArrowUpRight, FileText, Mail, MessageCircle } from "lucide-react";
import { LocalTime } from "@/components/hero/local-time";
import { Button } from "@/components/ui/button";
import { Console, LiveDot } from "@/components/ui/console";
import { CopyButton } from "@/components/ui/copy-button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { profile } from "@/lib/data";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const channels = [
  { name: "LinkedIn", value: bare(profile.linkedin), href: profile.linkedin, Icon: LinkedinIcon },
  { name: "GitHub", value: bare(profile.github), href: profile.github, Icon: GithubIcon },
  { name: "Currículo (PDF)", value: profile.cv.slice(1), href: profile.cv, Icon: FileText },
  { name: "WhatsApp", value: profile.whatsappLabel, href: profile.whatsapp, Icon: MessageCircle },
];

// The landing approach. Drawn 1:1 in px (viewBox height = band height) and
// anchored to the right, so the node always sits on the band's right edge;
// narrow screens crop the cruise segment, wide ones let it run in from the
// page edge (overflow visible, clipped by the section).
const APPROACH = "M 0 14 H 880 C 1190 14 1250 100 1520 100 H 1592";

// Station 07, the closing frame: the trajectory that ran the whole page lands
// on its last node, "canal aberto", and the page's last word is an invitation.
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
      {/* the front wall's drafting grid returns, lit from where the line lands */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="drafting-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_68%_62%_at_80%_34%,black_8%,transparent_74%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(820px_520px_at_88%_30%,rgb(94_158_255/0.1),transparent_66%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x">
        <div className="flex items-end gap-4">
          <span aria-hidden data-reveal="rule" className="ruler min-w-6 flex-1" />
          <span className="hud hidden shrink-0 md:block">pt-BR · en</span>
        </div>
        {/* arrival: the line is drawn by the scroll and closes on the node */}
        <div aria-hidden data-draw="scrub" data-start="top 90%" data-end="top 40%" className="relative mt-6 h-28">
          <svg viewBox="0 0 1600 112" preserveAspectRatio="xMaxYMid slice" className="absolute inset-0 size-full overflow-visible">
            <defs>
              <linearGradient id="ct-traj" x1="0" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#244561" stopOpacity="0" />
                <stop offset="0.42" stopColor="#244561" stopOpacity="0.9" />
                <stop offset="0.8" stopColor="#5e9eff" stopOpacity="0.95" />
                <stop offset="1" stopColor="#8dbaff" />
              </linearGradient>
            </defs>
            {/* construction: the node's vertical datum overshoots the band */}
            <line x1="1592" x2="1592" y1="-28" y2="140" stroke="#244561" strokeDasharray="2 5" />
            <path d={APPROACH} fill="none" stroke="#355c7e" strokeWidth="7" strokeDasharray="1 23" strokeOpacity="0.5" />
            <path d={APPROACH} className="draw" fill="none" stroke="url(#ct-traj)" strokeWidth="1.4" />
          </svg>
          <span className="hud absolute right-7 top-[78px] text-blue-bright">canal aberto</span>
          <span className="absolute right-0 top-[92px] size-4 rounded-full shadow-[0_0_18px_3px_rgb(94_158_255/0.45)]" />
          <svg viewBox="0 0 16 16" className="absolute right-0 top-[92px] size-4 overflow-visible">
            <circle cx="8" cy="8" r="7" className="draw" fill="#080b10" stroke="#5e9eff" strokeWidth="1.2" />
            <circle cx="8" cy="8" r="2.5" fill="#8dbaff" />
          </svg>
        </div>

        <h2
          id="contato-title"
          data-title
          className="display mt-8 text-[clamp(2.75rem,6.2vw,6rem)] text-ink [--wdth:112] lg:mt-10"
        >
          Vamos colocar o próximo sistema <span className="text-blue-bright">no ar.</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div data-reveal style={d(120)} className="lg:col-span-5 lg:pr-8">
            {/* index beside the statement, never above it (same as SectionHeader) */}
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted">
              <span className="tabular text-blue">07</span>
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
                    className="group inline-flex min-w-0 items-center gap-3 text-[clamp(1.25rem,5.4vw,2.4rem)] font-medium leading-tight tracking-[-0.03em] text-ink transition-colors hover:text-blue"
                  >
                    <span className="[overflow-wrap:anywhere]">{profile.email}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="hidden size-6 shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue sm:block"
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
                        <c.Icon aria-hidden className="size-4 shrink-0 text-ink-faint transition-colors group-hover:text-blue" />
                        <span className="hud">{c.name}</span>
                        <ArrowUpRight
                          aria-hidden
                          className="ml-auto size-4 shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue"
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

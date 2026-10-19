import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { nav, profile } from "@/lib/data";
import { niches } from "@/lib/landing-pages";

// Links are 40px tall on touch layouts, compact from lg up.
const link = "inline-flex min-h-10 items-center text-[0.875rem] text-ink-muted transition-colors hover:text-ink lg:min-h-0";

// The page's index plate: the stations in running order (same two-digit
// indices as the rail), the landing-page niches and the direct channels.
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid grid-cols-1 gap-x-8 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" className="group inline-flex items-center gap-3" aria-label={`${profile.name}, início`}>
            <span className="relative grid size-8 shrink-0 place-items-center rounded-[5px] border border-line-strong bg-surface font-mono text-[0.6875rem] font-medium tracking-[0.04em] text-ink transition-colors group-hover:border-blue/70">
              {profile.initials}
              <span aria-hidden className="absolute -right-[3px] -top-[3px] size-[5px] rounded-full bg-blue shadow-[0_0_8px_rgb(94_158_255/0.9)]" />
            </span>
            <span className="text-sm font-medium tracking-[-0.01em] text-ink">{profile.name}</span>
          </Link>
          <p className="mt-5 max-w-xs text-pretty text-sm leading-6 text-ink-muted">
            {profile.role} · {profile.focus}. Aplicações web, APIs e automações em produção.
          </p>
        </div>

        <nav aria-label="Seções" className="lg:col-span-2">
          <p className="label">Seções</p>
          <ol className="mt-3 grid grid-cols-2 gap-x-6 sm:grid-cols-1 lg:mt-4 lg:gap-y-2.5">
            {nav.map((n, i) => (
              <li key={n.id}>
                <Link href={n.href} className={`group gap-3 ${link}`}>
                  <span className="font-mono text-[0.6875rem] tabular text-ink-faint transition-colors group-hover:text-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="lg:col-span-3">
          <p className="label">Contato</p>
          <ul className="mt-3 grid lg:mt-4 lg:gap-y-2.5">
            <li>
              <a href={`mailto:${profile.email}`} className={link}>
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={link}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className={link}>
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.cv} target="_blank" rel="noreferrer" className={link}>
                Currículo (PDF)
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Landing pages por nicho" className="sm:col-span-2 lg:col-span-3">
          <p className="label">Landing pages</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:mt-4 lg:grid-cols-1 lg:gap-y-2.5">
            {niches.map((n) => (
              <li key={n.slug}>
                <Link href={`/landing-pages/${n.slug}`} className={link}>
                  {n.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-[0.8125rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p>
            © {new Date().getFullYear()} {profile.fullName}
          </p>
          <p>Next.js · TypeScript · Tailwind CSS · GSAP · Motion</p>
          <Link href="/#top" className="inline-flex min-h-10 items-center gap-1.5 self-start transition-colors hover:text-ink sm:self-auto">
            <ArrowUp aria-hidden className="size-3.5" /> topo
          </Link>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { nav, profile } from "@/lib/data";
import { niches } from "@/lib/landing-pages";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="grid-cols-1 container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-lg border border-line-strong bg-surface font-mono text-[0.7rem] text-ink">
              {profile.initials}
            </span>
            <span className="text-sm font-medium text-ink">{profile.name}</span>
          </Link>
          <p className="mt-5 max-w-xs text-pretty text-sm leading-6 text-ink-muted">
            {profile.role} · {profile.focus}. Aplicações web, APIs e automações em produção.
          </p>
        </div>

        <nav aria-label="Seções" className="md:col-span-2">
          <p className="label">seções</p>
          <ul className="mt-4 grid gap-2.5">
            {nav.map((n) => (
              <li key={n.id}>
                <Link href={n.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Landing pages por nicho" className="md:col-span-3">
          <p className="label">landing pages</p>
          <ul className="mt-4 grid gap-2.5">
            {niches.map((n) => (
              <li key={n.slug}>
                <Link href={`/landing-pages/${n.slug}`} className="text-sm text-ink-muted transition-colors hover:text-ink">
                  {n.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label">contato</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="text-ink-muted transition-colors hover:text-ink">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-ink-muted transition-colors hover:text-ink">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-ink-muted transition-colors hover:text-ink">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.cv} target="_blank" rel="noreferrer" className="text-ink-muted transition-colors hover:text-ink">
                Currículo (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.75rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.fullName}
          </p>
          <p>Next.js · TypeScript · Tailwind CSS · Motion</p>
          <Link href="/#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
            <ArrowUp aria-hidden className="size-3.5" /> topo
          </Link>
        </div>
      </div>
    </footer>
  );
}

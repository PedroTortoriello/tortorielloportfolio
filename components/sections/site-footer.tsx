import Link from "next/link";
import { nav, profile } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link href="#top" className="flex items-center gap-2.5 text-sm font-semibold">
            <span className="grid size-7 place-items-center rounded-md border border-border-strong font-mono text-xs">
              {profile.initials}
            </span>
            Pedro Tortoriello
          </Link>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-muted">
            IA aplicada, automação de processos e desenvolvimento full stack para negócios
            que precisam operar com mais controle.
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <nav aria-label="Rodapé">
            <p className="font-mono text-xs text-ink-faint">Navegação</p>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs text-ink-faint">Contato</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  WhatsApp · {profile.whatsappLabel}
                </Link>
              </li>
              <li className="text-sm text-ink-muted">{profile.location}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. Todos os direitos reservados.</p>
          <p className="font-mono">Construído com Next.js · Tailwind · Motion</p>
        </div>
      </div>
    </footer>
  );
}

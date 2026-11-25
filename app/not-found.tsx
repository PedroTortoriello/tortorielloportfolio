"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/client";
import { HTML_LANG, localePath } from "@/lib/i18n/locale";

const COPY = {
  en: {
    title: "Not found",
    label: "Error 404",
    word: "LOST",
    text: "This page drifted out of orbit. The work, the case studies and a way to reach me are one step back.",
    home: "Back to the start",
    work: "All work",
  },
  pt: {
    title: "Página não encontrada",
    label: "Erro 404",
    word: "SUMIU",
    text: "Esta página saiu de órbita. Os projetos, os estudos de caso e um jeito de falar comigo estão a um passo daqui.",
    home: "Voltar ao início",
    work: "Todos os projetos",
  },
} as const;

// A wrong address, in the site's own voice and the visitor's language (decided by the path:
// /pt/... is Portuguese): the skills wall's display face, one lime way back. A client component
// for the path, so React 19's <title> names the page; Next marks a 404 noindex on its own.
export default function NotFound() {
  const locale = useLocale();
  const t = COPY[locale];

  return (
    <section
      lang={HTML_LANG[locale]}
      aria-labelledby="nf-title"
      className="container-x flex min-h-svh flex-col justify-center pb-32 pt-[var(--header-h)]"
    >
      <title>{`${t.title} — Pedro Tortoriello`}</title>
      <p className="t-label t-bracket">{t.label}</p>
      <h1 id="nf-title" className="mt-6 font-tech text-[clamp(4.5rem,16vw,13rem)] font-black leading-[0.82] tracking-[-0.02em] text-ink">
        {t.word}
        <span className="text-violet">.</span>
      </h1>
      <p className="mt-8 max-w-[32rem] text-pretty text-lg leading-relaxed text-ink-muted">{t.text}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href={localePath(locale, "/")}
          className="inline-flex min-h-12 items-center bg-accent px-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-on-accent transition-colors hover:bg-accent-deep"
        >
          {t.home}
        </Link>
        <Link
          href={localePath(locale, "/work")}
          className="inline-flex min-h-12 items-center border border-line-strong px-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {t.work}
        </Link>
      </div>
    </section>
  );
}

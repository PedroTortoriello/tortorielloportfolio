"use client";

import { useLocale } from "@/lib/i18n/client";
import { HTML_LANG } from "@/lib/i18n/locale";

const COPY = {
  en: { skip: "Skip to content" },
  pt: { skip: "Pular para o conteúdo" },
} as const;

// The first stop for keyboard users, in the page's language (marked, since the landing-page
// area around it is Portuguese while this stays English there).
export function SkipLink() {
  const locale = useLocale();
  return (
    <a
      lang={HTML_LANG[locale]}
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
    >
      {COPY[locale].skip}
    </a>
  );
}

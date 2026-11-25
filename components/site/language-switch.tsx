"use client";

import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { switchTo } from "@/lib/commands";
import { HTML_LANG, LOCALES, localeOf, localePath } from "@/lib/i18n/locale";

const COPY = {
  en: { label: "Language" },
  pt: { label: "Idioma" },
} as const;

// Each language names itself, in its own language.
const NAME = { en: "English", pt: "Português" } as const;

// EN / PT: the page being read, in either language, at the same section (switchTo in
// lib/commands.ts, shared with the palette and the terminal). `link` styles both links; the
// current one carries aria-current="page" and stays put. The landing-page area is in
// Portuguese only, so it has nothing to switch.
export function LanguageSwitch({ className = "", link = "" }: { className?: string; link?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname.startsWith("/landing-pages")) return null;
  const current = localeOf(pathname);

  return (
    <div role="group" aria-label={COPY[current].label} className={`flex items-center ${className}`}>
      {LOCALES.map((l, i) => (
        <Fragment key={l}>
          {i ? <span aria-hidden>/</span> : null}
          <a
            href={localePath(l, pathname)}
            hrefLang={HTML_LANG[l]}
            lang={HTML_LANG[l]}
            aria-current={l === current ? "page" : undefined}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // a new tab or window is the browser's
              e.preventDefault();
              if (l !== current) switchTo(l, (href) => router.push(href));
            }}
            className={link}
          >
            {l.toUpperCase()}
            <span className="sr-only"> {NAME[l]}</span>
          </a>
        </Fragment>
      ))}
    </div>
  );
}

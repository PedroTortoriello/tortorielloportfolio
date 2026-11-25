"use client";

import { BackToTop } from "@/components/contact/back-to-top";
import { PaletteButton } from "@/components/fx/command-palette";
import { LanguageSwitch } from "@/components/site/language-switch";
import { LocalTime } from "@/components/site/local-time";
import { HTML_LANG, content } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n/client";

const COPY = {
  en: { tagline: "Software engineer · Builder · Problem solver" },
  pt: { tagline: "Engenheiro de software · Construtor · Solucionador de problemas" },
} as const;

// The site's last lines, on every page. Same charcoal and grain as the contact
// finale, so the home page flows straight into it: the name set like the
// finale's headline, the role in the machine's voice, the local clock, the
// language switch. The bottom padding is the dock's parking spot, so it never
// covers a control. A client component: the layout renders it, and only the
// address knows the language.
export function SiteFooter() {
  const locale = useLocale();
  const { profile } = content(locale);
  const year = new Date().getFullYear();

  return (
    <footer lang={HTML_LANG[locale]} className="grain bg-charcoal">
      <div className="px-[var(--gutter)] pb-[calc(7rem+env(safe-area-inset-bottom))] pt-6">
        <div className="flex flex-col gap-3 border-t border-line pt-8 sm:pt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <p className="font-wide text-[clamp(1.25rem,3vw,2.4rem)] font-extrabold uppercase italic leading-none tracking-[-0.02em] text-ink [font-variation-settings:'wdth'_140]">
            {profile.name}
            <span className="ml-0.5 align-super text-[0.42em]">®</span>
          </p>
          <p className="t-label">{COPY[locale].tagline}</p>
        </div>

        <div className="t-label mt-6 grid grid-cols-2 items-center gap-x-6 sm:mt-8 md:grid-cols-3">
          <div className="flex items-center gap-x-5">
            {/* a visit in a later year than the build differs from the static markup, harmlessly */}
            <p suppressHydrationWarning>© {year}</p>
            <LanguageSwitch
              className="gap-x-1"
              link="inline-flex min-h-11 items-center px-1 transition-colors duration-300 hover:text-accent aria-[current=page]:text-ink"
            />
          </div>
          <p className="flex items-center justify-end gap-2 md:justify-center">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {profile.city} <LocalTime />
          </p>
          {/* the command palette's way in (and its shortcut), beside the way back up */}
          <div className="col-span-2 flex items-center justify-between gap-6 md:col-span-1 md:justify-end">
            <PaletteButton />
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

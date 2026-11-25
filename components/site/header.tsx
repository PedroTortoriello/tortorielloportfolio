"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { HTML_LANG, content, localePath } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n/client";
import { scrollToId } from "@/lib/motion";
import { isStill, onStillChange, toggleStill } from "@/lib/still";
import { useActiveSection } from "@/lib/use-active-section";
import { SoundToggle } from "@/components/fx/sound-toggle";
import { LanguageSwitch } from "@/components/site/language-switch";

const COPY = {
  en: { home: "home", primary: "Primary", pause: "Pause motion", paused: "Motion paused" },
  pt: { home: "início", primary: "Principal", pause: "Pausar movimento", paused: "Movimento pausado" },
} as const;

// Watch every section, so a link only lights while its own section is in view
// (Experience has no header link and turns them all off). The ids are the same in both languages.
const ids = content("en").dock.map((d) => d.id);

// A plain click scrolls in place; with a modifier the browser does its own thing (new tab, window).
const plain = (e: React.MouseEvent) => !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);

// The reference's corners: the mark top-left, four small links top-right.
// Difference blending keeps it legible over black, the fog wall and lime alike.
export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const { nav, profile } = content(locale);
  const t = COPY[locale];
  const onHome = pathname === "/" || pathname === "/pt";
  const active = useActiveSection(ids, onHome);
  // "Pause motion" (WCAG 2.2.2): lib/still.ts
  const still = useSyncExternalStore(onStillChange, isStill, () => false);

  return (
    <header
      lang={HTML_LANG[locale]}
      data-intro-hide
      className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference"
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link
          href={localePath(locale, "/")}
          onClick={(e) => {
            if (onHome && plain(e) && scrollToId("top")) e.preventDefault();
          }}
          aria-label={`${profile.initials}, ${profile.name}, ${t.home}`}
          className="pointer-events-auto -m-2 p-2 font-geo text-[0.95rem] font-semibold tracking-[0.14em]"
        >
          PT
          <span className="ml-0.5 align-super text-[0.55em] font-medium tracking-normal">®</span>
        </Link>

        <div className="pointer-events-auto flex items-center gap-x-2.5 min-[360px]:gap-x-3.5 min-[400px]:gap-x-5 sm:gap-x-9">
          <nav aria-label={t.primary}>
            <ul className="flex items-center gap-x-2.5 min-[360px]:gap-x-3.5 min-[400px]:gap-x-5 sm:gap-x-9">
              {nav.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    {/* A plain anchor on purpose: from another page the browser loads "/#id" itself.
                        Next 16.2's client cache appends a new hash to a cached URL that already
                        has one ("/#skills#contact"). On the home page the click scrolls instead. */}
                    <a
                      href={localePath(locale, item.href)}
                      onClick={(e) => {
                        if (onHome && plain(e) && scrollToId(item.id)) e.preventDefault();
                      }}
                      aria-current={isActive ? "location" : undefined}
                      className="group relative block py-3 font-geo text-[0.6875rem] font-medium uppercase tracking-[0.16em] sm:text-[0.75rem]"
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 bottom-2 h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-out)] ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* From 640px: below it the row is at its width limit, and the footer always has the switch. */}
          <LanguageSwitch
            className="hidden gap-x-2 font-geo text-[0.75rem] font-medium uppercase tracking-[0.16em] sm:flex"
            link="relative block py-3 after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[var(--ease-out)] hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
          />

          {/* The name stays fixed and aria-pressed carries the state; the glyph shows the
              media convention (pause while things move, play once they are still). */}
          <button
            type="button"
            aria-pressed={still}
            aria-label={t.pause}
            title={still ? t.paused : t.pause}
            onClick={toggleStill}
            className="group relative -mx-2 grid place-items-center px-2 py-3"
          >
            <svg aria-hidden viewBox="0 0 12 12" className="size-3 fill-current">
              {still ? <path d="M3 1.5v9l7.5-4.5z" /> : <path d="M2.5 1.5h2.25v9H2.5zM7.25 1.5H9.5v9H7.25z" />}
            </svg>
            <span
              aria-hidden
              className="absolute inset-x-2 bottom-2 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-x-100"
            />
          </button>
          <SoundToggle />
        </div>
      </div>
    </header>
  );
}

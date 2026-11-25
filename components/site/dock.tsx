"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { m } from "motion/react";
import { HTML_LANG, content, localePath } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n/client";
import { EASE_OUT, scrollToId } from "@/lib/motion";
import { useActiveSection } from "@/lib/use-active-section";
import { DockGlyph } from "./dock-glyph";

const COPY = {
  en: { label: "Sections" },
  pt: { label: "Seções" },
} as const;

// the same in both languages
const ids = content("en").dock.map((d) => d.id);

// The floating dock from the skills reference: a violet cartridge with
// bracket ears, white line glyphs, and a black well that sits inside the
// bar under the active section. It stays out of the hero and slides up
// once the hero is mostly gone; off the home page it is always there.
export function Dock() {
  const pathname = usePathname();
  const locale = useLocale();
  const { dock } = content(locale);
  const onHome = pathname === "/" || pathname === "/pt";
  const active = useActiveSection(ids, onHome);
  const [heroGone, setHeroGone] = useState(false);
  // Escape hides the hover labels until the pointer or focus moves to an item again (WCAG 1.4.13)
  const [hush, setHush] = useState(false);
  const shown = !onHome || heroGone;

  useEffect(() => {
    if (!onHome) return;
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setHeroGone(e.intersectionRatio < 0.4), {
      threshold: [0, 0.4, 1],
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setHush(true);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const current = onHome ? active : localePath("en", pathname).startsWith("/work") ? "work" : "";

  return (
    <m.nav
      lang={HTML_LANG[locale]}
      aria-label={COPY[locale].label}
      initial={false}
      animate={{ y: shown ? 0 : 120, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      inert={!shown}
      className="pointer-events-none fixed inset-x-0 bottom-[max(0.875rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4"
    >
      <div className="dock pointer-events-auto relative rounded-full bg-violet px-2 shadow-[0_18px_50px_-12px_rgb(110_27_255/0.65),inset_0_1px_0_rgb(255_255_255/0.25)] sm:px-3">
        {/* bracket ears at both ends */}
        <span
          aria-hidden
          className="absolute -left-[7px] top-1/2 h-[54%] w-[5px] -translate-y-1/2 rounded-l-full border-y-2 border-l-2 border-violet-soft/80"
        />
        <span
          aria-hidden
          className="absolute -right-[7px] top-1/2 h-[54%] w-[5px] -translate-y-1/2 rounded-r-full border-y-2 border-r-2 border-violet-soft/80"
        />
        <ul className="flex items-center">
          <li
            aria-hidden
            className="hidden h-14 w-11 place-items-center font-tech text-[1.05rem] font-extrabold tracking-[-0.02em] text-white min-[420px]:grid sm:h-16 sm:w-14"
          >
            PT
          </li>
          {dock.map((item) => {
            const isActive = current === item.id;
            // Section links are plain anchors: off the home page the browser loads "/#id" ("/pt#id")
            // itself (Next 16.2's client cache would append the hash to a cached "/#…").
            const Anchor = item.id === "top" ? Link : "a";
            return (
              <li key={item.id} className="relative">
                <Anchor
                  href={localePath(locale, item.id === "top" ? "/" : `/#${item.id}`)}
                  onClick={(e: React.MouseEvent) => {
                    // a modified click (new tab, window) is the browser's to handle
                    const plain = !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);
                    if (onHome && plain && scrollToId(item.id)) e.preventDefault();
                  }}
                  onPointerEnter={() => setHush(false)}
                  onFocus={() => setHush(false)}
                  aria-label={item.label}
                  aria-current={isActive ? "location" : undefined}
                  className="group relative grid h-14 w-11 place-items-center text-white outline-offset-[-4px] sm:h-16 sm:w-14"
                >
                  {isActive ? (
                    <m.span
                      layoutId="dock-well"
                      aria-hidden
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-x-0.5 inset-y-1.5 rounded-full bg-black shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)] sm:inset-x-1 sm:inset-y-2"
                    />
                  ) : null}
                  <DockGlyph
                    name={item.icon}
                    className="relative size-[1.375rem] transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:scale-110 sm:size-6"
                  />
                  {/* The label can be hovered itself: while shown it takes the pointer, and its
                      ::after bridges the gap down to the item, so moving onto it keeps it open. */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-black px-2.5 py-1 font-tech text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white opacity-0 shadow-[0_0_0_1px_rgb(255_255_255/0.12)] transition-[opacity,transform] duration-300 after:absolute after:inset-x-0 after:top-full after:h-4 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ${
                      hush ? "hidden" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </Anchor>
              </li>
            );
          })}
        </ul>
      </div>
    </m.nav>
  );
}

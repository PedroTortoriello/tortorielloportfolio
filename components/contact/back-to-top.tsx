"use client";

import { ArrowUp } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { scrollToId } from "@/lib/motion";

const LABEL = { en: "Back to top", pt: "Voltar ao topo" } as const;

// Smooth through Lenis when JS runs, on any page; without JS the #top fragment
// still lands at the top (browsers treat it as the start of any document).
// Focus moves to the page content so the next Tab starts from the top.
export function BackToTop({ className = "" }: { className?: string }) {
  const label = LABEL[useLocale()];
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        scrollToId("top"); // also moves focus to the page content
      }}
      className={`group inline-flex min-h-11 items-center gap-2 transition-colors duration-300 hover:text-accent ${className}`}
    >
      {label}
      <ArrowUp
        aria-hidden
        strokeWidth={1.75}
        className="size-3.5 transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5"
      />
    </a>
  );
}

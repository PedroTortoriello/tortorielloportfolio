"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Routes that own their own visual world draw their own chrome.
// ponytail: one hardcoded route; move the portfolio into a route group with its own layout if a second world appears.
const OWN_WORLD = new Set(["/landing-pages/advocacia"]);

export function PortfolioOnly({ children }: { children: ReactNode }) {
  const path = usePathname()?.replace(/\/$/, "") ?? "";
  return OWN_WORLD.has(path) ? null : children;
}

"use client";

// For client components (header, dock, overlays, players): the locale of the current route.
import { usePathname } from "next/navigation";
import { localeOf, type Locale } from "./locale";

export const useLocale = (): Locale => localeOf(usePathname());

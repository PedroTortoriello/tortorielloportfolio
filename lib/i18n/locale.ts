// The locale basics, with no imports: safe in server components, client components and the
// <head> logic alike. lib/i18n/index.ts re-exports these next to content(); client components
// get useLocale() from lib/i18n/client.ts (usePathname cannot be imported by server modules).
export type Locale = "en" | "pt";
export const LOCALES: readonly Locale[] = ["en", "pt"];

// <html lang>, Open Graph and hreflang codes per locale.
export const HTML_LANG: Record<Locale, string> = { en: "en", pt: "pt-BR" };
export const OG_LOCALE: Record<Locale, string> = { en: "en_US", pt: "pt_BR" };

// "/pt", "/pt/work/x" -> "pt"; everything else -> "en".
export const localeOf = (pathname: string | null | undefined): Locale =>
  pathname === "/pt" || pathname?.startsWith("/pt/") || pathname?.startsWith("/pt#") ? "pt" : "en";

// The same address in a locale: localePath("pt", "/work#x") -> "/pt/work#x",
// localePath("pt", "/#work") -> "/pt#work", localePath("en", "/pt/work") -> "/work".
export function localePath(locale: Locale, path: string) {
  const bare = path.replace(/^\/pt(?=$|[/#?])/, "") || "/";
  const en = bare.startsWith("/") ? bare : `/${bare}`;
  if (locale === "en") return en;
  if (en === "/") return "/pt";
  return en.startsWith("/#") || en.startsWith("/?") ? `/pt${en.slice(1)}` : `/pt${en}`;
}

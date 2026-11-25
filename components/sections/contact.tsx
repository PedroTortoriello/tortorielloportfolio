import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Orbit } from "@/components/contact/orbit";
import { Tickets } from "@/components/contact/tickets";
import s from "@/components/contact/contact.module.css";
import { AskLauncher } from "@/components/fx/ask-dialog";
import { CopyButton } from "@/components/ui/copy-button";
import { content, type Locale } from "@/lib/i18n";
import { askEnabled } from "@/lib/knowledge";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// The headline is one text node per line; the trailing spaces keep the accessible name whole.
const COPY = {
  en: {
    kicker: "Get in touch",
    headline: ["Let’s build ", "something ", "extraordinary."],
    emailPedro: "Email Pedro",
    move: "Your move:",
    invite: "Have an ambitious idea, a complex problem or an interesting opportunity?",
    inviteEnd: "Let’s make it happen.",
    email: "Email",
    cv: "Download résumé",
    pdfLang: "EN", // the language code of a PDF in this page's language (profile.cvLang / cvPtLang)
    pdfIn: (lang: string) => ` (PDF in ${lang === "PT-BR" ? "Portuguese" : lang})`,
    newTab: " (opens in a new tab)",
    copy: "Copy email address",
    credit: "Built in Brazil, shipped worldwide.",
  },
  pt: {
    kicker: "Entre em contato",
    headline: ["Vamos construir ", "algo ", "extraordinário."],
    emailPedro: "Enviar e-mail para o Pedro",
    move: "Sua vez:",
    invite: "Tem uma ideia ambiciosa, um problema complexo ou uma oportunidade interessante?",
    inviteEnd: "Vamos fazer acontecer.",
    email: "E-mail",
    cv: "Baixar currículo",
    pdfLang: "PT-BR",
    pdfIn: (lang: string) => ` (PDF em ${lang === "EN" ? "inglês" : lang})`,
    newTab: " (abre em nova aba)",
    copy: "Copiar endereço de e-mail",
    credit: "Construído no Brasil, entregue no mundo todo.",
  },
} as const;

// The finale (ref4): a charcoal stage lit green from the top-left corner, an
// orbit, the widest words on the page with lime tickets tossed over them, a
// large outline arrow that writes to Pedro, and the ways to reach him.
export function Contact({ locale = "en" }: { locale?: Locale }) {
  const { profile } = content(locale);
  const t = COPY[locale];
  const year = new Date().getFullYear();
  // Where a visitor goes from here. On phones Email and the résumé take a full
  // row, the two profiles share one. Each page offers the résumé in its own language
  // (profile.cvPt on Portuguese), with a language badge only when the PDF's differs.
  const cv = locale === "pt" ? { href: profile.cvPt, lang: profile.cvPtLang } : { href: profile.cv, lang: profile.cvLang };
  const channels = [
    { label: t.email, href: `mailto:${profile.email}`, wide: true },
    { label: "LinkedIn", href: profile.linkedin, external: true },
    { label: "GitHub", href: profile.github, external: true },
    { label: t.cv, href: cv.href, download: true, lang: cv.lang === t.pdfLang ? undefined : cv.lang, wide: true },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      data-cursor-field
      className={`grain relative overflow-clip bg-charcoal ${s.glow}`}
    >
      <div className="flex flex-col items-center px-[var(--gutter)] pb-[clamp(5.5rem,8vw,7.5rem)] pt-[clamp(4.5rem,8vw,7rem)] text-center">
        <Orbit />
        <p
          data-reveal
          className="mt-[clamp(1.75rem,4vw,3.5rem)] font-wide text-[0.8125rem] font-bold italic text-ink [font-variation-settings:'wdth'_125] sm:text-[0.875rem]"
        >
          {t.kicker}
        </p>

        <div className="relative mt-[clamp(1.5rem,3.5vw,3rem)] flex w-full justify-center">
          {/* the headline's size lives here, so the tickets can be sized in its em */}
          <div className="relative w-fit text-[9.4vw] sm:text-[length:min(6.6vw,7.75rem)]">
            <h2
              id="contact-title"
              data-split="lines"
              className={`${s.headline} whitespace-nowrap text-center font-wide font-extrabold italic leading-[0.95] tracking-[-0.02em] text-ink [font-variation-settings:'wdth'_110] sm:[font-variation-settings:'wdth'_140]`}
            >
              {t.headline[0]}
              <br />
              {t.headline[1]}
              <br />
              {t.headline[2]}
            </h2>
            <Tickets />
          </div>

          {/* beside the middle line, as in the reference; no room for it under lg */}
          <div data-reveal style={d(400)} className="absolute inset-y-0 right-0 my-auto hidden h-fit lg:block">
            <a href={`mailto:${profile.email}`} aria-label={t.emailPedro} data-magnetic="0.35" className="group block p-2 text-ink/85">
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                className="w-[clamp(4rem,6.2vw,7rem)] transition-[translate,color] duration-500 ease-[var(--ease-out)] group-hover:translate-x-3 group-hover:text-accent group-focus-visible:translate-x-3 group-focus-visible:text-accent"
              >
                <path
                  d="M2 45H78.9L50.9 17.1L58 10L98 50L58 90L50.9 82.9L78.9 55H2Z"
                  strokeWidth="1.25"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </a>
          </div>
        </div>

        <div
          data-reveal
          style={d(120)}
          className="mt-[clamp(2.75rem,5vw,4rem)] flex flex-col items-center gap-2.5 sm:flex-row sm:items-baseline sm:gap-6 sm:text-left"
        >
          <p className="shrink-0 font-wide text-[0.75rem] font-bold italic text-ink [font-variation-settings:'wdth'_125] sm:text-[0.8125rem]">
            {t.move}
          </p>
          <p className="max-w-[15em] text-balance font-serif text-[clamp(1.35rem,2vw,1.9rem)] italic leading-[1.12] text-ink">
            {t.invite} <span className="block">{t.inviteEnd}</span>
          </p>
        </div>

        <ul
          data-stagger
          style={d(200)}
          className="mt-[clamp(2rem,3.5vw,3rem)] grid w-full max-w-[24rem] grid-cols-2 gap-2.5 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:justify-center"
        >
          {channels.map((c) => (
            <li key={c.label} className={c.wide ? "col-span-2" : undefined}>
              <a
                href={c.href}
                data-magnetic="0.25"
                download={c.download}
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className={`group ${s.pill} relative isolate flex h-11 items-center justify-center overflow-hidden rounded-full border border-accent px-5 font-wide text-[0.875rem] font-medium text-accent [font-variation-settings:'wdth'_110] sm:text-[0.9375rem]`}
              >
                {/* the fill rises from the bottom, its crown flattening as it lands */}
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-[101%] rounded-[50%_50%_0_0/70%_70%_0_0] bg-accent transition-[translate,border-radius] duration-[600ms] ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:rounded-none group-focus-visible:translate-y-0 group-focus-visible:rounded-none"
                />
                {/* shifted by half the arrow's slot, so the label sits centred until the arrow slides in */}
                <span className="relative inline-flex translate-x-[0.675em] items-center gap-1.5 transition-[translate,color] duration-500 ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:text-on-accent group-focus-visible:translate-x-0 group-focus-visible:text-on-accent">
                  {c.label}
                  {c.lang ? (
                    <>
                      <span
                        aria-hidden
                        className="rounded-full border border-current px-1.5 py-0.5 font-mono text-[0.5625rem] leading-none tracking-[0.08em]"
                      >
                        {c.lang}
                      </span>
                      <span className="sr-only">{t.pdfIn(c.lang)}</span>
                    </>
                  ) : null}
                  {c.external ? <span className="sr-only">{t.newTab}</span> : null}
                  <ArrowUpRight
                    aria-hidden
                    strokeWidth={1.75}
                    className="size-[0.95em] -translate-x-1 opacity-0 transition-[translate,opacity] duration-500 ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div data-reveal style={d(260)} className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <p className="t-label">{profile.email}</p>
          <CopyButton value={profile.email} label={t.copy} />
        </div>

        {/* "Ask the portfolio" (components/fx/ask-dialog.tsx), only where its key is configured */}
        {askEnabled() ? (
          <div data-reveal style={d(320)} className="mt-1">
            <AskLauncher />
          </div>
        ) : null}
      </div>

      {/* the reference's left edge: small print set sideways, a lime seal under it
          (from lg, where the tickets off the left edge can't drift into it) */}
      <div
        data-reveal
        style={d(200)}
        className="absolute bottom-[clamp(5.5rem,8vw,7.5rem)] left-[var(--gutter)] hidden flex-col items-center gap-4 lg:flex"
      >
        <p className="rotate-180 font-wide text-[0.6875rem] font-bold leading-[1.5] text-ink [font-variation-settings:'wdth'_125] [writing-mode:vertical-rl]">
          © {year} {profile.name}.
          <br />
          {t.credit}
        </p>
        <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" className="size-6 text-accent">
          <circle cx="12" cy="12" r="11.25" strokeWidth="1" />
          <path d="M12 5.5v13M5.5 12h13M7.4 7.4l9.2 9.2M16.6 7.4l-9.2 9.2" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}

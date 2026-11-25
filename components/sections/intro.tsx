import Image from "next/image";
import { content, type Locale } from "@/lib/i18n";

// `accent` is the statement's one italic word; it must occur once in its second sentence.
const COPY = {
  en: {
    label: "Intro",
    accent: "engineer",
    since: "Since",
    mode: "Mode",
    remote: "Remote-first",
    works: "Works in",
    languages: "English · Portuguese",
  },
  pt: {
    label: "Intro",
    accent: "projeto",
    since: "Desde",
    mode: "Modelo",
    remote: "Remoto por padrão",
    works: "Idiomas",
    languages: "Inglês · Português",
  },
} as const;

// The intro continues the hero's scene rather than opening a new one: no
// profile card, the statement lights up word by word as the orb steps aside,
// and the portrait only appears when the cursor rests on the name.
export function Intro({ locale = "en" }: { locale?: Locale }) {
  const { hero, intro, profile } = content(locale);
  const t = COPY[locale];
  const facts = [
    { k: t.since, v: String(profile.since) },
    { k: t.mode, v: t.remote },
    { k: "Base", v: "São Paulo · UTC−3" },
    { k: t.works, v: t.languages },
  ];
  // "I don't just build software." / "I engineer solutions that move businesses forward."
  const [first, second] = intro.statement.split(/(?<=\.)\s+/);
  const [before, after] = second.split(t.accent);
  const [lead, rest] = intro.body.split(profile.name);

  return (
    <section id="intro" aria-labelledby="intro-title" className="relative z-10">
      <div className="container-x grid min-h-[125svh] grid-cols-1 content-center gap-y-14 py-[16svh] lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-7">
          <p data-reveal className="t-label flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="t-bracket text-ink">{t.label}</span>
            <span>{hero.support.join(" ")}</span>
          </p>
          <h2
            id="intro-title"
            data-scrub-words
            className="mt-8 text-pretty font-geo text-[clamp(2.1rem,4.7vw,4.7rem)] font-[350] leading-[1.06] tracking-[-0.022em] text-white"
          >
            <span className="block">{first}</span>{" "}
            <span className="block">
              {before}
              <em className="font-serif text-[1.1em] font-normal italic leading-none tracking-[-0.005em] text-white">{t.accent}</em>
              {after}
            </span>
          </h2>
        </div>

        <div className="lg:col-span-5 lg:col-start-2">
          <p data-reveal className="max-w-[34rem] text-pretty text-[1.0625rem] leading-[1.75] text-ink-muted sm:text-lg">
            {lead}
            <span
              data-chip-area
              className="relative inline-block text-ink underline decoration-line-strong decoration-1 underline-offset-[0.3em]"
            >
              {profile.name}
              <span data-chip aria-hidden className="pointer-events-none invisible absolute left-0 top-0 z-20 w-36 opacity-0">
                <span className="block -translate-y-[72%] translate-x-[34%] rotate-[-4deg] overflow-hidden border border-line-strong bg-surface shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)]">
                  <Image
                    src="/profile/pedro-tortoriello.jpg"
                    alt=""
                    width={288}
                    height={360}
                    sizes="144px"
                    className="h-auto w-full grayscale contrast-[1.15]"
                  />
                </span>
              </span>
            </span>
            {rest}
          </p>

          <dl
            data-stagger
            className="mt-12 grid max-w-[44rem] grid-cols-2 border-t border-line sm:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-4"
          >
            {facts.map((f) => (
              <div key={f.k} className="border-b border-line py-4 pr-4 sm:border-b-0 lg:border-b 2xl:border-b-0">
                <dt className="t-label">{f.k}</dt>
                <dd className="mt-2 font-geo text-[0.9375rem] text-ink sm:whitespace-nowrap">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

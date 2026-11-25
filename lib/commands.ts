// The registry the command palette (components/fx/command-palette.tsx) and the terminal
// (components/fx/terminal.tsx) share: where each thing is, what each action does, and the
// terminal's commands, in the visitor's language. Every label and every line of output comes
// from content(locale) (lib/data.ts and lib/projects.ts); nothing here says more than they do.
import { useCallback, useRef } from "react";
import { statusIn } from "@/components/case/case-blocks";
import { content, localePath, type Locale } from "@/lib/i18n";
import { openUI } from "@/lib/events";
import { scrollToId } from "@/lib/motion";
import { isSoundOn, playCue, toggleSound } from "@/lib/sound";
import { isStill, toggleStill } from "@/lib/still";

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const COPY = {
  en: {
    allWork: "All work",
    landingPages: "Landing pages",
    landingHint: "/landing-pages · PT-BR",
    coDeveloped: "Co-developed",
    copyEmail: "Copy email",
    copied: (email: string) => `Copied ${email}`,
    mailApp: "Opening your mail app",
    cv: "Download CV",
    cvHint: (lang: string) => `PDF · ${lang}`,
    cvDone: (lang: string) => `Downloading the CV (${lang})`,
    github: "Open GitHub",
    linkedin: "Open LinkedIn",
    opening: (url: string) => `Opening ${host(url)}`,
    lang: "View in Portuguese",
    pause: "Pause motion",
    resume: "Resume motion",
    motion: (still: boolean) => (still ? "Motion paused" : "Motion on"),
    soundOn: "Turn sound on",
    soundOff: "Turn sound off",
    sound: (on: boolean) => `Sound ${on ? "on" : "off"}`,
    terminal: "Open terminal",
    ask: "Ask the portfolio",
    // what else the palette's search matches
    kw: {
      top: "start hero",
      intro: "about me",
      work: "projects cases portfolio",
      skills: "stack technologies tools",
      experience: "career jobs roles",
      contact: "email hire reach",
      allWork: "projects archive index",
      landing: "lp sites niches portuguese",
      email: "contact mail address",
      cv: "resume résumé curriculum pdf",
      github: "code repositories",
      linkedin: "profile",
      lang: "language portuguese português idioma pt-br translate",
      motion: "animation pause still",
      sound: "audio mute cues",
      terminal: "console shell cli command line",
      ask: "chat question ai assistant",
    },
    term: {
      help: [
        ["help", "this list"],
        ["whoami", "who built this site"],
        ["ls", "the sections of the page"],
        ["ls work", "the case studies"],
        ["cat stack", "the skills"],
        ["cat experience", "roles and dates"],
        ["open <name>", "a section, a case, github, linkedin or cv"],
        ["contact", "where to reach me"],
        ["sudo hire-me", "try it"],
        ["motion on|off", "pause or resume the motion"],
        ["sound on|off", "the sound cues"],
        ["lang pt|en", "read the site in Portuguese or English"],
        ["clear", "clear the screen"],
        ["exit", "close the terminal (Esc works too)"],
      ],
      who: { name: "name", role: "role", base: "base", since: "since" },
      channels: { email: "email", linkedin: "linkedin", github: "github" },
      readCase: "Read one: open 001, or type open and press Tab for the names.",
      contactMore: "open linkedin, open github or open cv.",
      hire: (email: string) => ["Permission granted. The next step is a human one:", `write to ${email}, or type open contact.`],
      sudoOnly: "sudo: only hire-me runs as root here.",
      notFound: (cmd: string) => `${cmd}: command not found. Type help.`,
      noDir: (arg: string) => `ls: ${arg}: no such directory. Try ls or ls work.`,
      noFile: (arg: string) => `cat: ${arg ? `${arg}: no such file. ` : ""}Try cat stack or cat experience.`,
      openWhat: "open: what? Try open work, open 001 or open github.",
      noTarget: (arg: string) => `open: ${arg}: not found. Type open and press Tab for the names.`,
      usage: (form: string) => `usage: ${form}`,
      langHere: "Already in English.",
      langOnlyPt: "lang: the landing-page area is in Portuguese only.",
      going: (href: string) => `→ ${href}`,
    },
  },
  pt: {
    allWork: "Todos os projetos",
    landingPages: "Landing pages",
    landingHint: "/landing-pages · PT-BR",
    coDeveloped: "Em coautoria",
    copyEmail: "Copiar e-mail",
    copied: (email: string) => `Copiado: ${email}`,
    mailApp: "Abrindo seu app de e-mail",
    cv: "Baixar currículo",
    cvHint: (lang: string) => `PDF · ${lang}`,
    cvDone: (lang: string) => `Baixando o currículo (${lang})`,
    github: "Abrir GitHub",
    linkedin: "Abrir LinkedIn",
    opening: (url: string) => `Abrindo ${host(url)}`,
    lang: "Ver em inglês",
    pause: "Pausar movimento",
    resume: "Retomar movimento",
    motion: (still: boolean) => (still ? "Movimento pausado" : "Movimento ligado"),
    soundOn: "Ligar o som",
    soundOff: "Desligar o som",
    sound: (on: boolean) => `Som ${on ? "ligado" : "desligado"}`,
    terminal: "Abrir terminal",
    ask: "Pergunte ao portfólio",
    kw: {
      top: "começo topo hero home",
      intro: "sobre mim apresentação about",
      work: "cases portfólio trabalho work",
      skills: "stack tecnologias ferramentas habilidades",
      experience: "carreira empregos cargos",
      contact: "e-mail email contratar falar",
      allWork: "projetos arquivo índice",
      landing: "lp sites nichos português",
      email: "contato endereço email",
      cv: "currículo cv resume pdf",
      github: "código repositórios",
      linkedin: "perfil",
      lang: "idioma língua inglês english language traduzir",
      motion: "animação pausar parar",
      sound: "áudio mudo silenciar",
      terminal: "console shell cli linha de comando",
      ask: "chat pergunta ia assistente",
    },
    term: {
      help: [
        ["help", "esta lista"],
        ["whoami", "quem fez este site"],
        ["ls", "as seções da página"],
        ["ls work", "os estudos de caso"],
        ["cat stack", "as skills"],
        ["cat experience", "cargos e datas"],
        ["open <nome>", "uma seção, um case, github, linkedin ou cv"],
        ["contact", "onde me encontrar"],
        ["sudo hire-me", "experimente"],
        ["motion on|off", "pausa ou retoma o movimento"],
        ["sound on|off", "os efeitos sonoros"],
        ["lang pt|en", "o site em português ou em inglês"],
        ["clear", "limpa a tela"],
        ["exit", "fecha o terminal (Esc também fecha)"],
      ],
      who: { name: "nome", role: "cargo", base: "base", since: "desde" },
      channels: { email: "e-mail", linkedin: "linkedin", github: "github" },
      readCase: "Para ler um: open 001, ou digite open e aperte Tab para ver os nomes.",
      contactMore: "open linkedin, open github ou open cv.",
      hire: (email: string) => ["Permissão concedida. O próximo passo é humano:", `escreva para ${email} ou digite open contato.`],
      sudoOnly: "sudo: aqui só hire-me roda como root.",
      notFound: (cmd: string) => `${cmd}: comando não encontrado. Digite help.`,
      noDir: (arg: string) => `ls: ${arg}: diretório não encontrado. Tente ls ou ls work.`,
      noFile: (arg: string) => `cat: ${arg ? `${arg}: arquivo não encontrado. ` : ""}Tente cat stack ou cat experience.`,
      openWhat: "open: o quê? Tente open projetos, open 001 ou open github.",
      noTarget: (arg: string) => `open: ${arg}: não encontrado. Digite open e aperte Tab para ver os nomes.`,
      usage: (form: string) => `uso: ${form}`,
      langHere: "Já está em português.",
      langOnlyPt: "lang: a área de landing pages é só em português.",
      going: (href: string) => `→ ${href}`,
    },
  },
} as const;

export type Push = (href: string) => void;
export type Group = "sections" | "work" | "pages" | "actions";

export type Command = {
  id: string; // unique; also the name the terminal's `open` takes
  group: Group;
  label: string;
  hint?: string; // the palette's right-hand detail
  index?: string; // a case's [001]
  href?: string; // set on the ones that navigate
  keywords: string;
  run: (push: Push) => string | void | Promise<string>; // a string confirms what happened
};

// Lowercase without accents, so "experiencia" finds "Experiência" (palette search, terminal names).
export const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

// Sections scroll in place when their page is open ("/" or "/pt"). Elsewhere a link with a hash
// loads in full, as the header's plain anchors do (Next 16.2's client cache appends a new hash to
// a cached URL that already has one).
function go(href: string, push: Push) {
  const [path, hash] = href.split("#");
  const id = hash ?? (localePath("en", path) === "/" ? "top" : "");
  if (id && location.pathname === path && scrollToId(id)) return;
  if (hash) location.assign(href);
  else push(href);
}

// The landing-page area has one language, so it has no other version to switch to.
const switchable = () => !location.pathname.startsWith("/landing-pages");

// The page being read, in the other language, at the same section (the hash goes along).
export const switchTo = (locale: Locale, push: Push) => go(localePath(locale, location.pathname + location.hash), push);

async function copyEmail(email: string, t: (typeof COPY)[Locale]) {
  try {
    await navigator.clipboard.writeText(email);
    return t.copied(email);
  } catch {
    location.href = `mailto:${email}`; // the contact section's copy button falls back the same way
    return t.mailApp;
  }
}

function download(href: string) {
  const a = Object.assign(document.createElement("a"), { href, download: "" });
  document.body.append(a);
  a.click();
  a.remove();
}

function external(url: string, t: (typeof COPY)[Locale]) {
  window.open(url, "_blank", "noopener,noreferrer");
  return t.opening(url);
}

// Built when asked, so the toggles' labels follow the current state.
export function commands(locale: Locale): Command[] {
  const t = COPY[locale];
  const { dock, profile, projects } = content(locale);
  // each page offers the résumé in its own language
  const cv = locale === "pt" ? { href: profile.cvPt, lang: profile.cvPtLang } : { href: profile.cv, lang: profile.cvLang };
  const other: Locale = locale === "pt" ? "en" : "pt";
  const to = (id: string, group: Group, label: string, path: string, keywords: string, extra?: Partial<Command>): Command => {
    const href = path.startsWith("/landing-pages") ? path : localePath(locale, path);
    return { id, group, label, href, hint: href, keywords, run: (push) => go(href, push), ...extra };
  };

  return [
    ...dock.map((d) => to(fold(d.label), "sections", d.label, d.id === "top" ? "/" : `/#${d.id}`, t.kw[d.id])),
    // the cards label co-authored work by its note; so do the palette and `ls work`
    ...projects.map((p) =>
      to(p.slug, "work", p.title, `/work/${p.slug}`, [p.slug, p.index, p.category, ...p.tags, p.product ?? ""].join(" "), {
        index: p.index,
        hint: p.note ? `${statusIn(locale, p.status)} · ${t.coDeveloped}` : statusIn(locale, p.status),
      }),
    ),
    to("all-work", "pages", t.allWork, "/work", t.kw.allWork),
    to("landing-pages", "pages", t.landingPages, "/landing-pages", t.kw.landing, { hint: t.landingHint }),
    { id: "copy-email", group: "actions", label: t.copyEmail, hint: profile.email, keywords: t.kw.email, run: () => copyEmail(profile.email, t) },
    {
      id: "cv",
      group: "actions",
      label: t.cv,
      hint: t.cvHint(cv.lang),
      keywords: t.kw.cv,
      run: () => {
        download(cv.href);
        return t.cvDone(cv.lang);
      },
    },
    { id: "github", group: "actions", label: t.github, hint: profile.githubHandle, keywords: t.kw.github, run: () => external(profile.github, t) },
    {
      id: "linkedin",
      group: "actions",
      label: t.linkedin,
      hint: profile.linkedinHandle,
      keywords: t.kw.linkedin,
      run: () => external(profile.linkedin, t),
    },
    ...(typeof location !== "undefined" && switchable()
      ? [
          {
            id: "lang",
            group: "actions" as const,
            label: t.lang,
            hint: localePath(other, location.pathname),
            keywords: t.kw.lang,
            run: (push: Push) => switchTo(other, push),
          },
        ]
      : []),
    {
      id: "motion",
      group: "actions",
      label: isStill() ? t.resume : t.pause,
      keywords: t.kw.motion,
      run: () => {
        toggleStill();
        return t.motion(isStill());
      },
    },
    {
      id: "sound",
      group: "actions",
      label: isSoundOn() ? t.soundOff : t.soundOn,
      keywords: t.kw.sound,
      run: () => {
        toggleSound();
        return t.sound(isSoundOn());
      },
    },
    { id: "terminal", group: "actions", label: t.terminal, hint: "`", keywords: t.kw.terminal, run: () => void openUI("terminal") },
    // AskDialog sets html[data-ask] only when the chat is configured
    ...(typeof document !== "undefined" && document.documentElement.hasAttribute("data-ask")
      ? [{ id: "ask", group: "actions" as const, label: t.ask, keywords: t.kw.ask, run: () => void openUI("ask") }]
      : []),
  ];
}

// ---- The terminal ---------------------------------------------------------

// A line, or key/value rows.
export type Out = string | readonly (readonly [string, string])[];
export type Run = { out: Out[]; clear?: boolean; exit?: boolean; go?: () => void }; // go runs once the terminal has closed

const NAMES = ["help", "whoami", "ls", "cat", "open", "contact", "sudo", "motion", "sound", "lang", "clear", "exit"];

// What `open` takes: the sections, the cases (by name or index) and three of the actions.
const openable = (locale: Locale) =>
  commands(locale).filter((c) => c.group === "sections" || c.group === "work" || ["github", "linkedin", "cv"].includes(c.id));

const argsOf = (cmd: string, locale: Locale): string[] => {
  switch (cmd) {
    case "ls":
      return ["work"];
    case "cat":
      return ["stack", "experience"];
    case "open":
      return openable(locale).map((c) => c.id);
    case "sudo":
      return ["hire-me"];
    case "motion":
    case "sound":
      return ["on", "off"];
    case "lang":
      return ["pt", "en"];
    default:
      return [];
  }
};

export function exec(line: string, push: Push, locale: Locale): Run {
  const [cmd = "", ...rest] = fold(line.trim()).split(/\s+/);
  const arg = rest.join(" ");
  const t = COPY[locale].term;
  const { dock, experience, intro, profile, projects, skills } = content(locale);
  const say = COPY[locale];

  switch (cmd) {
    case "":
      return { out: [] };
    case "help":
      return { out: [t.help] };
    case "whoami":
      return {
        out: [
          [
            [t.who.name, profile.name],
            [t.who.role, `${profile.role} · ${profile.focus}`],
            [t.who.base, `${profile.city}, ${profile.country}`],
            [t.who.since, String(profile.since)],
          ],
          intro.body,
        ],
      };
    case "ls":
      if (!arg) return { out: [dock.map((d) => fold(d.label)).join("  ")] };
      if (arg === "work")
        return {
          out: [
            projects.map(
              (p) => [p.index, [p.title, statusIn(locale, p.status), p.note ? say.coDeveloped : ""].filter(Boolean).join(" · ")] as const,
            ),
            t.readCase,
          ],
        };
      return { out: [t.noDir(arg)] };
    case "cat":
      if (arg === "stack") return { out: [skills.map((g) => [g.title, g.items.join(", ")] as const)] };
      if (arg === "experience") return { out: [experience.map((e) => [e.period, `${e.company} · ${e.role}`] as const)] };
      return { out: [t.noFile(arg)] };
    case "open": {
      if (!arg) return { out: [t.openWhat] };
      const c = openable(locale).find((c) => c.id === arg || c.index === arg);
      if (!c) return { out: [t.noTarget(arg)] };
      if (c.href) return { out: [t.going(c.href)], go: () => void c.run(push) };
      const said = c.run(push); // github, linkedin, cv: right now, inside the keypress, so the new tab is allowed
      return { out: typeof said === "string" ? [said] : [] };
    }
    case "contact":
      return {
        out: [
          [
            [t.channels.email, profile.email],
            [t.channels.linkedin, profile.linkedinHandle],
            [t.channels.github, profile.githubHandle],
          ],
          t.contactMore,
        ],
      };
    case "sudo":
      return { out: arg === "hire-me" ? [...t.hire(profile.email)] : [t.sudoOnly] };
    case "motion":
      if (arg !== "on" && arg !== "off") return { out: [t.usage(`${cmd} on|off`)] };
      if ((arg === "off") !== isStill()) toggleStill();
      return { out: [say.motion(isStill())] };
    case "sound":
      if (arg !== "on" && arg !== "off") return { out: [t.usage(`${cmd} on|off`)] };
      if ((arg === "on") !== isSoundOn()) toggleSound();
      return { out: [say.sound(isSoundOn())] }; // the state it is really in, whatever toggleSound did
    case "lang": {
      if (!switchable()) return { out: [t.langOnlyPt] };
      if (arg !== "pt" && arg !== "en") return { out: [t.usage("lang pt|en")] };
      if (arg === locale) return { out: [t.langHere] };
      return { out: [t.going(localePath(arg, location.pathname))], go: () => switchTo(arg, push) };
    }
    case "clear":
      return { out: [], clear: true };
    case "exit":
      return { out: [], exit: true };
    default:
      return { out: [t.notFound(cmd)] };
  }
}

// Tab: completes the command, then its argument. Several matches extend to what they share;
// when that adds nothing, they come back as options to list.
export function complete(line: string, locale: Locale): { line: string; options: string[] } {
  const words = fold(line.trimStart()).split(/\s+/);
  const word = words[words.length - 1];
  const pool = words.length === 1 ? NAMES : words.length === 2 ? argsOf(words[0], locale) : [];
  const hits = pool.filter((w) => w.startsWith(word));
  if (!hits.length) return { line, options: [] };
  let common = hits[0];
  for (const h of hits) while (!h.startsWith(common)) common = common.slice(0, -1);
  return {
    line: (words.length === 2 ? `${words[0]} ` : "") + common + (hits.length === 1 ? " " : ""),
    options: hits.length > 1 && common === word ? hits : [],
  };
}

// ---- Shared by both overlays -----------------------------------------------

// Another dialog is open, or the opening still plays: shortcuts wait.
export const busy = () =>
  document.documentElement.classList.contains("intro") ||
  Array.from(document.querySelectorAll('dialog[open], [aria-modal="true"]')).some((el) => el.getClientRects().length > 0);

// A one-key shortcut ("/", "`") counts only outside text fields, without modifiers, once.
export function isFreeKey(e: KeyboardEvent) {
  const t = e.target instanceof HTMLElement ? e.target : null;
  const typing = !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
  return !typing && !e.metaKey && !e.ctrlKey && !e.altKey && !e.repeat && !e.isComposing && !busy();
}

// A native modal <dialog>: the page behind is inert (focus stays inside), Escape closes it and
// focus goes back to where it was. Spread `dialog` on it; its class list carries .pt-overlay
// (app/globals.css holds the page still).
export function useModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);
  const pressed = useRef(false);

  const show = useCallback(() => {
    const d = ref.current;
    if (!d || d.open) return false;
    opener.current = document.activeElement;
    d.showModal();
    playCue("open");
    return true;
  }, []);

  // Synchronous: focus is back on the opener before a command that scrolls or moves focus runs.
  const hide = useCallback(() => ref.current?.close(), []);

  const dialog = {
    ref,
    "data-lenis-prevent": true, // Lenis leaves the wheel to the dialog
    // The backdrop (the dialog's own box around the panel) closes on a press that starts and ends
    // there; a text selection dragged out of the panel ends there too, and must not close it.
    onPointerDown: (e: React.PointerEvent) => {
      pressed.current = e.target === e.currentTarget;
    },
    onClick: (e: React.MouseEvent) => {
      if (pressed.current && e.target === e.currentTarget) hide();
    },
    // Every close lands here, Escape included.
    onClose: () => {
      playCue("close");
      // browsers hand focus back on close; this covers one that does not
      if (document.activeElement === document.body && opener.current instanceof HTMLElement) opener.current.focus({ preventScroll: true });
    },
  };

  return { ref, show, hide, dialog };
}

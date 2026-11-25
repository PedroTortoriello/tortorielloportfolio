"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { busy, commands, fold, isFreeKey, useModal, type Command, type Group } from "@/lib/commands";
import { onUI, openUI } from "@/lib/events";
import { useLocale } from "@/lib/i18n/client";

const COPY = {
  en: {
    label: "Command palette",
    input: "Search commands",
    placeholder: "Search sections, work and actions",
    list: "Commands",
    close: "Close",
    esc: "Esc",
    groups: { sections: "Sections", work: "Work", pages: "Pages", actions: "Actions" },
    empty: (q: string) => `Nothing matches “${q}”.`,
    count: (n: number) => `${n} ${n === 1 ? "result" : "results"}`,
    keys: { move: "↑↓", run: "Enter" },
    move: "Move",
    run: "Open",
    button: "Commands",
    shortcut: { apple: "⌘K", other: "Ctrl K" },
  },
  pt: {
    label: "Paleta de comandos",
    input: "Buscar comandos",
    placeholder: "Busque seções, projetos e ações",
    list: "Comandos",
    close: "Fechar",
    esc: "Esc",
    groups: { sections: "Seções", work: "Projetos", pages: "Páginas", actions: "Ações" },
    empty: (q: string) => `Nenhum resultado para “${q}”.`,
    count: (n: number) => `${n} ${n === 1 ? "resultado" : "resultados"}`,
    keys: { move: "↑↓", run: "Enter" },
    move: "Navegar",
    run: "Abrir",
    button: "Comandos",
    shortcut: { apple: "⌘K", other: "Ctrl K" },
  },
} as const;

const LIST = "pt-palette-list";
const optionId = (c: Command) => `${LIST}-${c.id}`;

// Fuzzy, label first: its start, a word start, anywhere, the keywords, then its letters in order.
// Case and accents never count (lib/commands.ts fold).
function rank(q: string, c: Command) {
  const l = fold(c.label);
  if (l.startsWith(q)) return 5;
  if (l.includes(` ${q}`)) return 4;
  if (l.includes(q)) return 3;
  if (fold(c.keywords).includes(q) || fold(c.hint ?? "").includes(q)) return 2;
  let at = 0;
  for (const ch of q) if ((at = l.indexOf(ch, at) + 1) === 0) return 0;
  return 1;
}

// Ranked, then grouped: a group sits where its best match ranks, its items in rank order.
function search(all: Command[], query: string) {
  const q = fold(query.trim());
  const hits = q
    ? all
        .map((c) => ({ c, r: rank(q, c) }))
        .filter((h) => h.r > 0)
        .sort((a, b) => b.r - a.r)
        .map((h) => h.c)
    : all;
  const groups = new Map<Group, Command[]>();
  for (const c of hits) groups.set(c.group, [...(groups.get(c.group) ?? []), c]);
  return { groups: [...groups], flat: [...groups.values()].flat() };
}

// Cmd/Ctrl+K, "/" or openUI("palette"): search every section, case and action.
// A combobox over a listbox (aria-activedescendant), in a native modal <dialog>.
export function CommandPalette() {
  const router = useRouter();
  const locale = useLocale();
  const t = COPY[locale];
  const { ref, show, hide, dialog } = useModal();
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [all, setAll] = useState<Command[]>([]);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState({ text: "", on: false });
  const timer = useRef<number>(undefined);
  const { groups, flat } = useMemo(() => search(all, query), [all, query]);
  const current = flat[active];

  const openPalette = useCallback(() => {
    if (!show()) return;
    setAll(commands(locale));
    setQuery("");
    setActive(0);
    input.current?.focus();
  }, [show, locale]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K") && !e.altKey && !e.shiftKey && !e.repeat) {
        if (ref.current?.open) hide();
        else if (!busy()) openPalette();
        else return;
        e.preventDefault();
      } else if (e.key === "/" && isFreeKey(e)) {
        e.preventDefault(); // or the "/" lands in the field
        openPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    const off = onUI("palette", openPalette);
    return () => {
      window.removeEventListener("keydown", onKey);
      off();
    };
  }, [ref, hide, openPalette]);

  // the first row brings its group heading back into view; any other just has to be visible
  useEffect(() => {
    if (active === 0) list.current?.scrollTo({ top: 0 });
    else if (current) document.getElementById(optionId(current))?.scrollIntoView({ block: "nearest" });
  }, [active, current]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const say = (text: string) => {
    setToast({ text, on: true });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast((shown) => ({ ...shown, on: false })), 2400);
  };

  // Close first: focus goes back, then a command that scrolls or moves focus has the last word.
  const choose = (c: Command) => {
    hide();
    void Promise.resolve(c.run((href) => router.push(href))).then((text) => text && say(text));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = flat.length;
      if (n) setActive((a) => (a + (e.key === "ArrowDown" ? 1 : -1) + n) % n);
    } else if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (current) choose(current);
    }
  };

  return (
    <>
      <dialog
        {...dialog}
        aria-label={t.label}
        className="pt-overlay m-0 size-full max-h-none max-w-none bg-transparent p-4 pt-[max(1rem,env(safe-area-inset-top))] text-ink backdrop:bg-[rgb(0_0_0/0.7)] backdrop:animate-[fade_200ms_ease-out] open:flex open:flex-col open:items-center motion-reduce:backdrop:animate-none sm:pt-[12vh]"
      >
        <div className="flex max-h-[min(34rem,100%)] w-full max-w-[40rem] animate-[pt-pop_220ms_var(--ease-out)_both] flex-col border border-line-strong bg-[rgb(8_8_9/0.88)] shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_40px_120px_-30px_rgb(0_0_0/0.95)] backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-line py-2 pl-4 pr-2">
            <span aria-hidden className="font-mono text-[0.8125rem] text-ink-faint">
              {"//"}
            </span>
            <input
              ref={input}
              role="combobox"
              aria-label={t.input}
              aria-expanded={flat.length > 0}
              aria-controls={LIST}
              aria-autocomplete="list"
              aria-activedescendant={current ? optionId(current) : undefined}
              placeholder={t.placeholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              className="h-11 min-w-0 flex-1 bg-transparent px-1 text-base text-ink placeholder:text-ink-faint"
            />
            <button
              type="button"
              onClick={hide}
              aria-label={t.close}
              className="t-label grid min-h-11 place-items-center px-3 transition-colors duration-200 hover:text-accent"
            >
              {t.esc}
            </button>
          </div>

          <div
            ref={list}
            id={LIST}
            role="listbox"
            aria-label={t.list}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2"
          >
            {groups.map(([g, items]) => (
              // mousedown would take focus off the input; the click still runs the option
              <div key={g} role="group" aria-labelledby={`${LIST}-group-${g}`} onMouseDown={(e) => e.preventDefault()}>
                <p id={`${LIST}-group-${g}`} role="presentation" className="t-label px-5 pb-1.5 pt-3">
                  {t.groups[g]}
                </p>
                {items.map((c) => {
                  const i = flat.indexOf(c);
                  const on = i === active;
                  return (
                    <div
                      key={c.id}
                      id={optionId(c)}
                      role="option"
                      aria-selected={on}
                      onPointerMove={() => !on && setActive(i)}
                      onClick={() => choose(c)}
                      className={`mx-2 flex min-h-11 cursor-pointer items-center gap-3 px-3 py-2 ${on ? "bg-accent text-on-accent" : "text-ink"}`}
                    >
                      {c.index ? (
                        <span
                          className={`t-bracket tabular shrink-0 font-mono text-[0.6875rem] tracking-[0.14em] ${on ? "" : "text-ink-faint"}`}
                        >
                          {c.index}
                        </span>
                      ) : null}
                      <span className="min-w-0 flex-1 truncate text-[0.9375rem]">{c.label}</span>
                      {c.hint ? (
                        <span
                          className={`min-w-0 max-w-[50%] truncate font-mono text-[0.6875rem] tracking-[0.06em] ${on ? "text-on-accent/70" : "text-ink-faint"}`}
                        >
                          {c.hint}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {flat.length ? null : <p className="px-5 pb-10 pt-6 text-center text-[0.9375rem] text-ink-muted">{t.empty(query.trim())}</p>}

          <div onMouseDown={(e) => e.preventDefault()} className="t-label flex items-center gap-5 border-t border-line px-4 py-3">
            <span className="pointer-coarse:hidden">
              <kbd className="text-ink-muted">{t.keys.move}</kbd> {t.move}
            </span>
            <span className="pointer-coarse:hidden">
              <kbd className="text-ink-muted">{t.keys.run}</kbd> {t.run}
            </span>
            <span aria-live="polite" className="tabular ml-auto">
              {t.count(flat.length)}
            </span>
          </div>
        </div>
      </dialog>

      {/* what a command did (copied, paused, downloading), seen and heard after the palette closes */}
      <p
        role="status"
        className={`pointer-events-none fixed inset-x-0 top-[calc(var(--header-h)+0.5rem)] z-[80] mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center gap-2.5 rounded-full border border-line-strong bg-black px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-opacity duration-300 ${
          toast.on ? "opacity-100" : "opacity-0"
        }`}
      >
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
        {toast.text}
      </p>
    </>
  );
}

const APPLE = /Mac|iPhone|iPad|iPod/;
const never = () => () => {};

// The footer's way in, with the shortcut this platform uses (⌘K on Apple, Ctrl K elsewhere).
export function PaletteButton({ className = "" }: { className?: string }) {
  const t = COPY[useLocale()];
  // null on the server and while hydrating, so the markup matches; then the platform
  const apple = useSyncExternalStore(
    never,
    () => APPLE.test(navigator.platform || navigator.userAgent),
    () => null,
  );

  return (
    <button
      type="button"
      onClick={() => openUI("palette")}
      aria-keyshortcuts={apple === null ? undefined : apple ? "Meta+K" : "Control+K"}
      className={`group inline-flex min-h-11 items-center gap-2.5 transition-colors duration-300 hover:text-accent ${className}`}
    >
      {t.button}
      {apple === null ? null : (
        <kbd
          aria-hidden
          className="inline-flex h-6 items-center rounded-full border border-line-strong px-2 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-muted transition-colors duration-300 group-hover:border-accent group-hover:text-accent pointer-coarse:hidden"
        >
          {apple ? t.shortcut.apple : t.shortcut.other}
        </kbd>
      )}
    </button>
  );
}

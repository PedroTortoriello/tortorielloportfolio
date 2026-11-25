"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { complete, exec, isFreeKey, useModal, type Out } from "@/lib/commands";
import { onUI } from "@/lib/events";
import { useLocale } from "@/lib/i18n/client";
import { playCue } from "@/lib/sound";

const COPY = {
  en: {
    label: "Terminal",
    title: "pedro@portfolio: ~",
    prompt: "pedro@portfolio:~$",
    input: "Command",
    output: "Output",
    close: "Close the terminal",
    esc: "Esc",
    welcome: "Type help for the commands. Tab completes, ↑ ↓ walk the history, Esc closes.",
  },
  pt: {
    label: "Terminal",
    title: "pedro@portfolio: ~",
    prompt: "pedro@portfolio:~$",
    input: "Comando",
    output: "Saída",
    close: "Fechar o terminal",
    esc: "Esc",
    welcome: "Digite help para ver os comandos. Tab completa, ↑ ↓ percorrem o histórico, Esc fecha.",
  },
} as const;

// The welcome line is printed in the language of the moment, so it follows a language switch.
type Entry = { id: number; i: number; cmd?: string; out?: Out; welcome?: true };

// One echoed command or one block of output. New output prints line by line (CSS delays,
// so reduced motion and html.still show it at once through the global rules).
function Line({ e, print, t }: { e: Entry; print: boolean; t: (typeof COPY)[keyof typeof COPY] }) {
  const anim = print ? "animate-[fade_240ms_var(--ease-out)_both]" : "";
  const style = print ? { animationDelay: `${e.i * 40}ms` } : undefined;
  if (e.cmd !== undefined)
    return (
      <p className="break-words text-ink">
        <span aria-hidden className="text-accent">
          {t.prompt}
        </span>{" "}
        {e.cmd}
      </p>
    );
  if (e.welcome || typeof e.out === "string")
    return (
      <p style={style} className={`${anim} whitespace-pre-wrap break-words`}>
        {e.welcome ? t.welcome : e.out}
      </p>
    );
  return (
    <dl style={style} className={`${anim} grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4`}>
      {e.out?.map(([k, v], j) => (
        <Fragment key={j}>
          <dt className="text-ink">{k}</dt>
          <dd className="break-words">{v}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

// The easter egg: the key under Esc (` or ~ on US keyboards) or openUI("terminal") opens a
// small shell over the site. Its commands and every word they print live in lib/commands.ts.
export function Terminal() {
  const router = useRouter();
  const locale = useLocale();
  const t = COPY[locale];
  const { show, hide, dialog } = useModal();
  const input = useRef<HTMLInputElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const [log, setLog] = useState<Entry[]>([{ id: 0, i: 0, welcome: true }]);
  const [fresh, setFresh] = useState(0); // entries from this id on print in; reopening never replays the old ones
  const [line, setLine] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [at, setAt] = useState(-1); // the history entry on the line; -1 is a new line

  useEffect(() => {
    const open = () => {
      if (!show()) return;
      setFresh(nextId.current);
      input.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      // A dead key (US-International, German) would compose into the first letter typed, so it stays out.
      const consoleKey = e.key === "`" || e.key === "~" || (e.code === "Backquote" && e.key !== "Dead");
      if (consoleKey && isFreeKey(e)) {
        e.preventDefault(); // or the key lands in the prompt
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    const off = onUI("terminal", open);
    return () => {
      window.removeEventListener("keydown", onKey);
      off();
    };
  }, [show]);

  // the prompt stays in view as output arrives
  useEffect(() => {
    const el = screen.current;
    el?.scrollTo({ top: el.scrollHeight });
  }, [log]);

  const print = (entries: Omit<Entry, "id" | "i">[]) => {
    const batch = entries.map((e, i) => ({ ...e, id: nextId.current++, i }));
    setLog((l) => [...l, ...batch].slice(-200));
  };

  const run = () => {
    const cmd = line.trim();
    const r = exec(cmd, (href) => router.push(href), locale);
    setLine("");
    setAt(-1);
    if (cmd && cmd !== hist[hist.length - 1]) setHist((h) => [...h, cmd]);
    playCue("click");
    if (r.clear) setLog([]);
    else print([{ cmd }, ...r.out.map((out) => ({ out }))]);
    if (r.exit || r.go) {
      hide(); // focus goes back first, then the command scrolls or navigates
      r.go?.();
    }
  };

  // ↑ walks back through the history, ↓ forward and out to a fresh line.
  const walk = (up: boolean) => {
    if (up && hist.length) {
      const n = at < 0 ? hist.length - 1 : Math.max(0, at - 1);
      setAt(n);
      setLine(hist[n]);
    } else if (!up && at >= 0) {
      const n = at + 1 < hist.length ? at + 1 : -1;
      setAt(n);
      setLine(n < 0 ? "" : hist[n]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      run();
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      walk(e.key === "ArrowUp");
    } else if (e.key === "Tab" && !e.shiftKey && line.trim()) {
      // on an empty line Tab moves focus as usual (to the close button)
      e.preventDefault();
      const r = complete(line, locale);
      setLine(r.line);
      if (r.options.length) print([{ cmd: line }, { out: r.options.join("  ") }]);
    }
  };

  return (
    <dialog
      {...dialog}
      aria-label={t.label}
      className="pt-overlay m-0 size-full max-h-none max-w-none bg-transparent p-4 pt-[max(1rem,env(safe-area-inset-top))] text-ink backdrop:bg-[rgb(0_0_0/0.6)] backdrop:animate-[fade_200ms_ease-out] open:flex open:flex-col open:items-center motion-reduce:backdrop:animate-none sm:pt-[12vh]"
    >
      <div
        onClick={(e) => {
          // a click on the screen hands the keyboard back to the prompt, unless it selected text
          if (!(e.target as Element).closest("button") && getSelection()?.isCollapsed !== false)
            input.current?.focus({ preventScroll: true });
        }}
        className="flex h-[min(27rem,52svh)] w-full max-w-[44rem] animate-[pt-pop_220ms_var(--ease-out)_both] flex-col border border-line-strong bg-black font-mono text-[0.75rem] leading-[1.7] text-ink-muted shadow-[0_40px_120px_-30px_rgb(0_0_0/0.95)] sm:h-[min(30rem,70svh)] sm:text-[0.8125rem]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line pl-4 pr-1">
          <p className="t-label flex min-w-0 items-center gap-2.5">
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
            <span className="truncate">{t.title}</span>
          </p>
          <button
            type="button"
            onClick={hide}
            aria-label={t.close}
            className="t-label grid min-h-11 place-items-center px-3 transition-colors duration-200 hover:text-accent"
          >
            {t.esc}
          </button>
        </div>

        <div ref={screen} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3">
          <div role="log" aria-label={t.output}>
            {log.map((e) => (
              <Line key={e.id} e={e} t={t} print={e.id >= fresh && e.i > 0} />
            ))}
          </div>
          <div className="flex items-baseline gap-2">
            <span aria-hidden className="shrink-0 text-accent">
              {t.prompt}
            </span>
            {/* 16px on touch screens, or iOS zooms in on focus */}
            <input
              ref={input}
              value={line}
              onChange={(e) => setLine(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label={t.input}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              className="min-w-0 flex-1 bg-transparent text-ink pointer-coarse:text-base"
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}

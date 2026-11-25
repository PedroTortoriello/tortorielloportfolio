"use client";

import { ArrowRight, Square, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { LIMITS, type AskEnd, type AskEvent, type Turn } from "@/app/api/ask/guard";
import { profile } from "@/lib/data";
import { onUI, openUI } from "@/lib/events";
import { useLocale } from "@/lib/i18n/client";
import { playCue } from "@/lib/sound";
import s from "./ask-dialog.module.css";

const COPY = {
  en: {
    launcher: "Ask the portfolio",
    launcherNote: "AI · answers from this site",
    title: "Ask the portfolio",
    byline: "Claude · this site only",
    close: "Close",
    intro: "Questions about Pedro’s work, stack or experience, answered from what this site says.",
    try: "Try one",
    suggestions: ["What did Pedro build on CadenceFlow?", "Where is he working now?", "Which projects use AI, and how?"],
    you: "You",
    site: "Portfolio",
    pending: "Reading the site",
    inputLabel: "Your question",
    placeholder: "Ask about Pedro’s work…",
    ask: "Ask",
    stop: "Stop",
    note: "Answers come only from this site’s content and may be incomplete.",
    email: "Email Pedro",
    status: {
      cut: "The answer was cut short.",
      stopped: "Stopped.",
      refusal: "That one can’t be answered here. Ask about Pedro’s work, skills or experience.",
      busy: "The assistant is busy right now. Try again in a moment.",
      limited: "That’s the question limit for now. Try again in a few minutes, or email Pedro.",
      invalid: "That question couldn’t be sent. Try rephrasing it.",
      error: "Something went wrong. Try again, or email Pedro.",
    },
  },
  pt: {
    launcher: "Pergunte ao portfólio",
    launcherNote: "IA · respostas a partir deste site",
    title: "Pergunte ao portfólio",
    byline: "Claude · só este site",
    close: "Fechar",
    intro: "Perguntas sobre o trabalho, o stack ou a experiência do Pedro, respondidas com o que este site diz.",
    try: "Experimente uma",
    suggestions: ["O que o Pedro construiu no CadenceFlow?", "Onde ele trabalha agora?", "Quais projetos usam IA, e como?"],
    you: "Você",
    site: "Portfólio",
    pending: "Lendo o site",
    inputLabel: "Sua pergunta",
    placeholder: "Pergunte sobre o trabalho do Pedro…",
    ask: "Perguntar",
    stop: "Parar",
    note: "As respostas vêm só do conteúdo deste site e podem estar incompletas.",
    email: "Enviar e-mail para o Pedro",
    status: {
      cut: "A resposta foi interrompida antes do fim.",
      stopped: "Interrompida.",
      refusal: "Essa não dá para responder aqui. Pergunte sobre o trabalho, as skills ou a experiência do Pedro.",
      busy: "O assistente está ocupado agora. Tente de novo em instantes.",
      limited: "Esse é o limite de perguntas por enquanto. Tente de novo em alguns minutos ou envie um e-mail para o Pedro.",
      invalid: "Não foi possível enviar essa pergunta. Tente reformulá-la.",
      error: "Algo deu errado. Tente de novo ou envie um e-mail para o Pedro.",
    },
  },
} as const;

type Status = AskEnd | "streaming" | "stopped" | "limited" | "invalid";
type Exchange = { q: string; a: string; status: Status };

// The last three answered exchanges ride along as context, each answer clipped to the
// route's per-turn limit (app/api/ask/guard.ts).
const context = (log: Exchange[]) =>
  log
    .filter((x) => x.a.trim() && (x.status === "ok" || x.status === "cut" || x.status === "stopped"))
    .slice(-3)
    .flatMap((x): Turn[] => [
      { role: "user", content: x.q },
      { role: "assistant", content: x.a.trim().slice(0, LIMITS.chars) },
    ]);

// Typing on a fine pointer; on touch the answer area takes focus, so no keyboard covers it.
const focusNext = (input: HTMLElement | null, log: HTMLElement | null) =>
  (matchMedia("(pointer: fine)").matches ? input : log)?.focus({ preventScroll: true });

// The contact finale's way in (components/sections/contact.tsx), set like its small italic labels.
export function AskLauncher() {
  const t = COPY[useLocale()];
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3">
      <button
        type="button"
        onClick={() => openUI("ask")}
        className="group inline-flex min-h-11 items-center gap-2 font-wide text-[0.875rem] font-bold italic text-ink [font-variation-settings:'wdth'_125]"
      >
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-out)] group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">
          {t.launcher}
        </span>
        <ArrowRight
          aria-hidden
          strokeWidth={1.75}
          className="size-4 text-accent transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1 group-focus-visible:translate-x-1"
        />
      </button>
      <span className="t-label">{t.launcherNote}</span>
    </div>
  );
}

// A native modal <dialog>: it keeps focus inside, closes on Escape and sits above
// everything. Opened by the launcher, the palette and the terminal (lib/events.ts).
export function AskDialog() {
  const t = COPY[useLocale()];
  const notes: Partial<Record<Status, string>> = t.status;
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<Exchange[]>([]);
  const [draft, setDraft] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const id = useId();
  const busy = log.at(-1)?.status === "streaming";

  // html[data-ask] tells the palette and the terminal the chat is available on this build.
  useEffect(() => {
    const html = document.documentElement;
    html.dataset.ask = "";
    const off = onUI("ask", () => setOpen(true));
    return () => {
      off();
      delete html.dataset.ask;
      request.current?.abort();
    };
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!open || !d) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!d.open) d.showModal();
    focusNext(input.current, scroller.current);
    playCue("open");
    return () => {
      if (d.open) d.close();
      playCue("close");
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [open]);

  // Follow the answer as it streams, unless the visitor scrolled up to read.
  useEffect(() => {
    const el = scroller.current;
    const last = log.at(-1);
    if (!el || !last) return;
    if ((last.status === "streaming" && !last.a) || el.scrollHeight - el.scrollTop - el.clientHeight < 120) el.scrollTop = el.scrollHeight;
  }, [log]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const history = context(log);
    const ctrl = new AbortController();
    request.current = ctrl;
    setLog((l) => [...l, { q, a: "", status: "streaming" }]);
    setDraft("");
    playCue("click");
    // every change lands on the newest exchange (no new one starts while it streams)
    const patch = (fn: (x: Exchange) => Partial<Exchange>) => setLog((l) => l.map((x, i) => (i === l.length - 1 ? { ...x, ...fn(x) } : x)));
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...history, { role: "user", content: q }] }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const status = res.status === 429 ? "limited" : res.status === 400 || res.status === 413 ? "invalid" : "error";
        return patch(() => ({ status }));
      }
      // NDJSON: one AskEvent per line; a chunk can end mid-line
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      let end: Status = "error"; // a stream that stops without saying how it ended was cut off
      let rest = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        const lines = (rest + value).split("\n");
        rest = lines.pop() ?? "";
        for (const line of lines) {
          if (!line) continue;
          const event = JSON.parse(line) as AskEvent;
          if (event.type === "text") patch((x) => ({ a: x.a + event.text }));
          else end = event.status;
        }
      }
      // a refusal can land after part of an answer: none of it stands
      patch((x) => ({ status: end, a: end === "refusal" ? "" : x.a }));
    } catch {
      patch(() => ({ status: ctrl.signal.aborted ? "stopped" : "error" }));
    } finally {
      if (request.current === ctrl) request.current = null;
    }
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby={`${id}-title`}
      aria-modal="true"
      data-lenis-prevent
      onClose={() => setOpen(false)}
      // the backdrop is the dialog itself; the panel inside covers the rest
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      // pt-overlay: the page behind holds still and keeps its width (app/globals.css, shared with the palette)
      className={`pt-overlay ${s.dialog} m-auto h-[min(42rem,calc(100dvh-2rem))] max-h-none w-[min(42rem,calc(100%-2rem))] max-w-none overflow-hidden border border-line-strong bg-surface p-0 text-ink`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-line py-1 pl-5 pr-1.5 sm:pl-7">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 id={`${id}-title`} className="t-label t-bracket text-ink">
              {t.title}
            </h2>
            <p className="t-label">{t.byline}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.close}
            className="grid size-11 shrink-0 place-items-center text-ink-muted transition-colors duration-300 hover:text-accent"
          >
            <X aria-hidden strokeWidth={1.75} className="size-[1.125rem]" />
          </button>
        </div>

        <div
          ref={scroller}
          role="log"
          aria-live="polite"
          aria-busy={busy}
          tabIndex={-1}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7 sm:py-7"
        >
          {log.length === 0 ? (
            <>
              <p className="max-w-[34em] text-pretty text-[1rem] leading-[1.65] text-ink-muted sm:text-[1.0625rem]">{t.intro}</p>
              <p className="t-label mt-8">{t.try}</p>
              <ul className="mt-3 grid gap-2">
                {t.suggestions.map((q, i) => (
                  <li key={q}>
                    <button
                      type="button"
                      onClick={() => {
                        ask(q);
                        focusNext(input.current, scroller.current);
                      }}
                      className="group flex min-h-12 w-full items-center gap-4 border border-line px-4 py-3 text-left text-[0.9375rem] leading-snug text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
                    >
                      <span aria-hidden className="t-label tabular transition-colors duration-300 group-hover:text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{q}</span>
                      <ArrowRight
                        aria-hidden
                        strokeWidth={1.75}
                        className="size-4 shrink-0 text-ink-faint transition-[translate,color] duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ol className="divide-y divide-line-faint">
              {log.map((x, i) => (
                <li key={i} className="py-7 first:pt-0 last:pb-0">
                  <p className="t-label">{t.you}</p>
                  <p className="mt-2 text-pretty text-[1rem] font-medium leading-[1.5] text-ink wrap-break-word">{x.q}</p>
                  <p className="t-label mt-5 flex items-center gap-2">
                    {x.status === "streaming" ? <span aria-hidden className="size-1.5 rounded-full bg-accent" /> : null}
                    {t.site}
                  </p>
                  {/* wrap-break-word: a long URL in an answer wraps instead of scrolling the log sideways */}
                  {x.a || x.status === "streaming" ? (
                    <p className="mt-2 whitespace-pre-wrap text-pretty text-[0.9375rem] leading-[1.7] text-ink/90 wrap-break-word sm:text-base">
                      {x.a || (x.status === "streaming" ? <span className="t-label">{t.pending}</span> : null)}
                      {x.status === "streaming" ? <span aria-hidden className={s.caret} /> : null}
                    </p>
                  ) : null}
                  {notes[x.status] ? (
                    <p className="mt-2 text-pretty text-[0.9375rem] leading-[1.6] text-ink-muted">{notes[x.status]}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!busy) ask(draft);
          }}
          className="border-t border-line px-3 pb-2 pt-3 sm:px-4"
        >
          <div className="flex gap-2">
            <label htmlFor={`${id}-q`} className="sr-only">
              {t.inputLabel}
            </label>
            <input
              ref={input}
              id={`${id}-q`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={LIMITS.chars}
              autoComplete="off"
              enterKeyHint="send"
              placeholder={t.placeholder}
              className="h-12 min-w-0 flex-1 border border-line-strong bg-transparent px-4 text-[1rem] text-ink placeholder:text-ink-faint"
            />
            {/* one button that turns into Stop while an answer streams, so focus never drops */}
            <button
              type={busy ? "button" : "submit"}
              onClick={busy ? () => request.current?.abort() : undefined}
              className={`inline-flex h-12 shrink-0 select-none items-center gap-2 px-4 font-mono text-[0.75rem] uppercase tracking-[0.14em] transition-[background-color,border-color,color,scale] duration-300 ease-[var(--ease-out)] active:scale-[0.98] sm:px-5 ${
                busy
                  ? "border border-line-strong text-ink hover:border-accent hover:text-accent"
                  : "bg-accent text-on-accent hover:bg-accent-deep"
              }`}
            >
              {busy ? t.stop : t.ask}
              {busy ? <Square aria-hidden className="size-3 fill-current" /> : <ArrowRight aria-hidden className="size-4" />}
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-4 px-1">
            <p className="t-label py-2">{t.note}</p>
            <a
              href={`mailto:${profile.email}`}
              className="t-label inline-flex min-h-11 items-center text-ink-muted transition-colors duration-300 hover:text-accent"
            >
              {t.email}
            </a>
          </div>
        </form>
      </div>
    </dialog>
  );
}

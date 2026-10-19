"use client";

import { useEffect, useState } from "react";
import { Window } from "@/components/ui/window";
import { terminalScript } from "@/lib/data";

type Line = (typeof terminalScript)[number];

function Prompt() {
  return (
    <span aria-hidden>
      <span className="text-green">pedro@portfolio</span>
      <span className="text-ink-faint">:</span>
      <span className="text-blue">~</span>
      <span className="text-ink-faint">$ </span>
    </span>
  );
}

function Json({ text }: { text: string }) {
  // "  "key": value," → key in type colour, strings amber, numbers/booleans tinted
  const parts = text.split(/("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|(\b\d+\b|\btrue\b|\bfalse\b)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (/^".*"\s*:$/.test(p)) return <span key={i} className="text-sx-type">{p}</span>;
        if (/^".*"$/.test(p)) return <span key={i} className="text-sx-str">{p}</span>;
        if (/^(\d+|true|false)$/.test(p)) return <span key={i} className="text-sx-num">{p}</span>;
        return <span key={i} className="text-sx-punct">{p}</span>;
      })}
    </>
  );
}

function Caret() {
  return <span aria-hidden className="ml-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] animate-blink bg-blue/90" />;
}

function render(line: Line, partial?: string) {
  if (line.kind === "cmd")
    return (
      <>
        <Prompt />
        <span className="text-ink">{partial ?? line.text}</span>
      </>
    );
  if (line.kind === "json") return <Json text={line.text} />;
  return <span className="text-ink">{line.text}</span>;
}

// Types a short, honest session. It never executes anything.
export function Terminal({ className = "" }: { className?: string }) {
  const total = terminalScript.length;
  const [live, setLive] = useState(false);
  const [row, setRow] = useState<number>(total);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));

    (async () => {
      setLive(true);
      setRow(0);
      setChars(0);
      await wait(1100);
      for (let i = 0; i < total; i++) {
        if (cancelled) return;
        const line = terminalScript[i];
        setRow(i);
        if (line.kind === "cmd") {
          for (let c = 0; c <= line.text.length; c++) {
            if (cancelled) return;
            setChars(c);
            await wait(38 + Math.random() * 46);
          }
          await wait(260);
        } else {
          setChars(line.text.length);
          await wait(line.kind === "json" ? 70 : 180);
        }
      }
      setRow(total);
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [total]);

  const done = row >= total;

  return (
    <Window
      className={className}
      label="Terminal ilustrativo"
      title={
        <>
          <span className="text-ink-faint">pedro@portfolio</span> <span className="text-ink-faint/60">—</span> ~
        </>
      }
      meta="zsh"
      status={
        <>
          <span className="inline-flex items-center gap-1.5">
            <span className={`size-1.5 rounded-full ${done ? "bg-green" : "bg-blue"}`} />
            sessão 01
          </span>
          <span>focus.json</span>
          <span className={`ml-auto ${done ? "text-green" : ""}`}>{done ? "exit 0" : "running"}</span>
        </>
      }
      bodyClassName="px-4 py-4 sm:px-5"
    >
      <p className="sr-only">
        whoami: Pedro Tortoriello, Software Engineer. focus.json: Full Stack Development & Automation; stack
        TypeScript, React, Next.js e Node.js; construo SaaS, APIs, integrações e automações; desde 2021; atuação remota.
      </p>
      <div aria-hidden className={`term min-h-[15rem] overflow-x-auto font-mono text-[0.74rem] leading-[1.75] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${live ? "is-live" : ""}`}>
        {terminalScript.map((line, i) => {
          if (live && i > row) return null;
          const typing = live && i === row && line.kind === "cmd";
          return (
            <div key={i} className={`t-pending whitespace-pre ${line.kind === "cmd" && i > 0 ? "mt-2" : ""}`}>
              {render(line, typing ? line.text.slice(0, chars) : undefined)}
              {typing ? <Caret /> : null}
            </div>
          );
        })}
        {(done || !live) && (
          <div className="t-pending mt-2">
            <Prompt />
            <Caret />
          </div>
        )}
      </div>
    </Window>
  );
}

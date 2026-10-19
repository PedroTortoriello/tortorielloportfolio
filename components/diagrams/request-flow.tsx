// Núcleo: the life of one real request, and the events it leaves behind.
// Route, middlewares and event names are taken from the repository.

type Step = { k: string; v: string; d: string; ok?: boolean };

const sync: Step[] = [
  { k: "POST", v: "/api/contracts/:id/send", d: "SPA React → API, Bearer JWT" },
  { k: "requireAuth", v: "JWT → organizationId, papel", d: "o tenant vem do token, nunca do body" },
  { k: "requireRole", v: "OWNER · ADMIN · MANAGER · MEMBER", d: "VIEWER só lê" },
  { k: "validate", v: "params + body · Zod", d: "schema importado de @gc/shared" },
  { k: "controller → service → repository", v: "Prisma", d: "o contrato é buscado com o organizationId do token antes de qualquer escrita" },
  { k: "emitStandalone(…)", v: "contract.sent", d: "evento gravado no outbox depois do envio do e-mail" },
  { k: "200", v: "OK", d: "resposta ao front", ok: true },
];

const async: Step[] = [
  { k: "pg_cron", v: "/api/cron/tick", d: "segredo comparado com timingSafeEqual" },
  { k: "claimBatch()", v: "FOR UPDATE SKIP LOCKED", d: "lote reivindicado sem disputa entre workers" },
  {
    k: "automação",
    v: "contract.signed → create_charge_pix",
    d: "emit(tx, …) grava a assinatura e o evento na mesma transação; a run é idempotente por evento e por passo",
  },
  { k: "Mercado Pago", v: "webhook · x-signature", d: "HMAC validado e status reconciliado" },
  { k: "emit", v: "payment.paid", d: "falhou? backoff exponencial, DLQ após 5" },
];

// One rail of the trace. The packet runs only while the console is on screen
// (data-loop); each step prints with a bloom when the block enters (data-print).
function Rail({ title, style, steps }: { title: string; style: "sync" | "async"; steps: Step[] }) {
  const solid = style === "sync";
  return (
    <div className="min-w-0">
      <p className="hud flex items-center gap-2.5">
        <svg width="24" height="6" aria-hidden className={`shrink-0 ${solid ? "text-blue" : "text-blue-bright"}`}>
          <line x1="0" y1="3" x2="24" y2="3" stroke="currentColor" strokeWidth="1.5" className={`edge-${style}`} />
        </svg>
        {title}
      </p>
      {/* rail and packet live beside the list: an <ol> may only hold <li> */}
      <div className="relative mt-5 pl-7">
        <span
          aria-hidden
          className={`absolute bottom-3 left-[6px] top-2 border-l ${solid ? "border-blue/45" : "border-dashed border-blue-bright/40"}`}
        />
        <span
          aria-hidden
          className={`flow-pulse motion-only absolute left-[4px] size-[5px] rounded-full ${
            solid ? "bg-blue shadow-[0_0_8px_rgb(94_158_255/0.75)]" : "bg-blue-bright shadow-[0_0_8px_rgb(141_186_255/0.75)]"
          }`}
        />
        <ol>
          {steps.map((s, i) => (
            <li key={s.k + s.v} data-line className="relative pb-5 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[25px] top-[0.42rem] size-[7px] rounded-[1.5px] border ${
                  s.ok ? "border-green bg-green/30" : i === 0 ? "border-blue bg-blue/30" : "border-line-strong bg-surface"
                }`}
              />
              <p className="break-words font-mono text-[0.8125rem] leading-6">
                <span className={s.ok ? "text-green" : "text-sx-fn"}>{s.k}</span> <span className="text-sx-str">{s.v}</span>
              </p>
              <p className="mt-0.5 text-pretty text-[0.8125rem] leading-[1.5] text-ink-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function RequestFlow({ className = "" }: { className?: string }) {
  return (
    <div data-loop data-print style={{ "--d": "350ms" } as React.CSSProperties} className={`grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 ${className}`}>
      <Rail title="request · síncrono" style="sync" steps={sync} />
      <Rail title="eventos · assíncrono" style="async" steps={async} />
    </div>
  );
}

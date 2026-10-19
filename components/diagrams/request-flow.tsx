// Núcleo: the life of one real request, and the events it leaves behind.
// Route, middlewares and event names are taken from the repository.

const sync = [
  { k: "POST", v: "/api/contracts/:id/send", d: "SPA React → API, Bearer JWT" },
  { k: "requireAuth", v: "JWT → organizationId, papel", d: "o tenant vem do token, nunca do body" },
  { k: "requireRole", v: "OWNER · ADMIN · MANAGER · MEMBER", d: "VIEWER só lê" },
  { k: "validate", v: "params + body · Zod", d: "schema importado de @gc/shared" },
  { k: "controller → service → repository", v: "Prisma", d: "o contrato é buscado com o organizationId do token antes de qualquer escrita" },
  { k: "emitStandalone(…)", v: "contract.sent", d: "evento gravado no outbox depois do envio do e-mail" },
  { k: "200", v: "OK", d: "resposta ao front", ok: true },
];

const async = [
  { k: "pg_cron", v: "/api/cron/tick", d: "segredo comparado com timingSafeEqual" },
  { k: "claimBatch()", v: "FOR UPDATE SKIP LOCKED", d: "lote reivindicado sem disputa entre workers" },
  { k: "automação", v: "contract.signed → create_charge_pix", d: "emit(tx, …) grava a assinatura e o evento na mesma transação; a run é idempotente por evento e por passo" },
  { k: "Mercado Pago", v: "webhook · x-signature", d: "HMAC validado e status reconciliado" },
  { k: "emit", v: "payment.paid", d: "falhou? backoff exponencial, DLQ após 5" },
];

function Rail({
  title,
  style,
  steps,
  pulse,
}: {
  title: string;
  style: "sync" | "async";
  steps: { k: string; v: string; d: string; ok?: boolean }[];
  pulse: string;
}) {
  return (
    <div>
      <p className="hud flex items-center gap-2">
        <svg width="22" height="6" aria-hidden className="text-ink-faint">
          <line x1="0" y1="3" x2="22" y2="3" stroke="currentColor" strokeWidth="1.5" className={`edge-${style}`} />
        </svg>
        {title}
      </p>
      <ol className="relative mt-5 pl-6">
        <span
          aria-hidden
          className={`absolute bottom-3 left-[5px] top-3 w-0 border-l ${style === "sync" ? "border-solid border-blue/45" : "border-dashed border-cyan/45"}`}
        />
        <span aria-hidden className="flow-pulse absolute left-[3px] top-3 size-[5px] rounded-full" style={{ background: pulse, boxShadow: `0 0 12px 2px ${pulse}` }} />
        {steps.map((s) => (
          <li key={s.k + s.v} className="relative pb-4 last:pb-0">
            <span aria-hidden className="absolute -left-[22px] top-[0.45rem] size-[7px] rounded-[2px] border border-line-strong bg-surface" />
            <p className="font-mono text-[0.76rem] leading-6">
              <span className={s.ok ? "text-green" : "text-sx-fn"}>{s.k}</span> <span className="text-sx-str">{s.v}</span>
            </p>
            <p className="text-[0.78rem] leading-5 text-ink-faint">{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RequestFlow() {
  return (
    <div data-reveal className="grid-cols-1 grid gap-10 sm:grid-cols-2 sm:gap-8">
      <Rail title="request · síncrono" style="sync" steps={sync} pulse="#4388ff" />
      <Rail title="eventos · assíncrono" style="async" steps={async} pulse="#46d9ff" />
    </div>
  );
}

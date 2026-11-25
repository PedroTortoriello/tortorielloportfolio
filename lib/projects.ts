// Featured work and the archive. Every statement was checked against the
// project's own repository or Pedro's CV; co-authored work is labelled as such.
// Never a metric, a user count or a result that the code cannot show.

export type EdgeStyle = "sync" | "async" | "external";

export type GraphNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w?: number;
  tone?: "client" | "core" | "service" | "data" | "external" | "job";
  mine?: boolean;
  detail?: string;
};

export type GraphEdge = {
  from: string;
  to: string;
  style: EdgeStyle;
  label?: string;
  arc?: boolean; // a return path, drawn over the top of the map
};

// One hop of a flow step: a node it names (no `to`), or an edge it walks from → to
// (an edge walked backwards is a reply). Ids sit under from/to, which i18n skips.
export type Hop = { from: string; to?: string };

export type Graph = {
  height: number;
  nodes: GraphNode[];
  edges: GraphEdge[];
  tiers: { x: number; name: string }[]; // column names along the axis, left to right
  lanes?: { y: number; label: string }[]; // a composite case: one band per system, from y down
  steps?: Hop[][]; // steps[i] is what architecture.flow[i] says it touches, in order
};

export type ProjectLink = { label: string; href: string };

// "Live", "Live · PWA", "In production" get the lime dot (the work card and the case).
export const isLive = (status: string) => /^(Live|In production)/.test(status);

// A parameter written in the project's code or docs. Never a live metric.
export type Readout = { k: string; v: string };

export type Point = {
  title: string;
  detail: string;
  where?: string; // the piece of a composite case it belongs to ("Núcleo", "Agente SDR")
};

// One piece of a composite case, and whose it is.
export type Part = { name: string; role: string; text: string };

export type Project = {
  slug: string;
  index: string; // "001"
  title: string;
  category: string; // "SaaS / Automation / AI"
  tags: string[]; // the card's outline pills
  summary: string; // one line for the card
  year: string;
  role: string; // authorship, honest
  status: string; // "Live", "Private", "Pilot"…
  links: ProjectLink[];
  cover: { src: string; alt: string }; // generated in-house (scripts/imagery), never stock
  // the case study
  overview: string;
  problem: string;
  architecture: {
    summary: string;
    layers: Point[];
    flow: string[];
    graph?: Graph;
  };
  decisions: Point[];
  challenges: Point[];
  implementation: string[];
  stack: string[];
  results: string[];
  readouts: Readout[];
  note?: string; // co-authorship note, shown wherever the project is
  // What the card has no room for, shown near the top of the case.
  product?: string; // the name it ships under, when the card title is descriptive
  mine?: string[]; // co-developed work: the parts I built, so the rest is never credited to me
  parts?: Part[]; // a composite case: each piece and whose it is
  notes?: Point[]; // authorship, what production runs, and what a word on the card means here
};

export const projects: Project[] = [
  {
    slug: "cadenceflow",
    index: "001",
    title: "CadenceFlow",
    category: "SaaS / Automation / AI",
    tags: ["SaaS", "Automation", "AI"],
    summary:
      "A multi-tenant sales automation platform combining prospecting, intelligent workflows, CRM integrations and AI-powered communication.",
    year: "2026",
    role: "Co-developer · full stack",
    status: "Live",
    links: [{ label: "cadenceflow.pro", href: "https://cadenceflow.pro" }],
    cover: {
      src: "/work/cadenceflow.webp",
      alt: "Rendered artwork for CadenceFlow: rings of light pulsing in sequence through a pale fog",
    },
    note: "Co-developed: another engineer at the agency started the product in February 2026; I joined as co-developer in June 2026.",
    mine: [
      "The LinkedIn module on Unipile: one outbox per account with idempotent enqueue, the invite-safety rules, burst control and a circuit breaker. He later extended it; since October 2026 the invite cap runs on his v2 table, with my function as the fallback.",
      "Official WhatsApp as a Meta Tech Provider: Embedded Signup, Cloud API send and receive, encrypted token custody and the signed Meta webhook.",
      "Team seats and permissions: roles read from the database, per-author scoping, optional per-member quotas and the middleware route-rule table.",
      "Email signal quality: the scanner classifier behind human open counts, and bounce diagnosis read from the raw delivery report.",
      "Deploy safety: hardlink build snapshots with scripted rollback, the staging health gate on /api/health and an explicit pg pool with timeouts.",
      "Metering and access: per-plan AI credits with idempotent debits, and the MCP client login with an entitlement check on every request.",
    ],
    notes: [
      {
        title: "The rest of the product",
        detail:
          "The co-developer wrote most of it: the cadence executor, lead generator, qualifier, automations, CRM adapter, the n8n trial-funnel hook, the SDR agent v2 and, later, the LinkedIn v2 invite engine. We both edited the cadence executor heavily.",
      },
      {
        title: "In production",
        detail:
          "Live at cadenceflow.pro, with the app at app.cadenceflow.pro. My commits under my own name run from June to October 2026; the private repository was still receiving commits in November 2026.",
      },
      {
        title: "CRM integrations",
        detail:
          "One CRM adapter today, for FunnelsFlow, the agency's own CRM. The other outlets are HMAC-signed outgoing webhooks, Google Sheets, Google Calendar and legacy Chatwoot.",
      },
    ],
    overview:
      "CadenceFlow is a multi-tenant B2B prospecting platform in production. It builds lead lists, qualifies them by crawling company sites and summarizing them with an LLM, and runs email, WhatsApp and LinkedIn cadences with a reply inbox and plan-based billing. Another agency engineer started it in February 2026; I joined as co-developer in June 2026 and created the LinkedIn module (which he later extended), the official WhatsApp integration, team seats and permissions, the email open and bounce accuracy work, and deploy safety.",
    problem:
      "B2B sales teams need to build lists, qualify leads and reach them by email, WhatsApp and LinkedIn without burning domains, numbers and profiles, and without spreading the process across disconnected tools. Each channel punishes excess in its own way, and on LinkedIn the penalty lands on a salesperson's personal profile. Security scanners and mail privacy proxies also open emails before people do, so the open rates teams steer by are misleading.",
    architecture: {
      summary:
        "One Next.js 16 codebase serves the React 19 UI and over 500 API route files. It runs as three PM2 processes behind Nginx, with least_conn balancing and failover. PostgreSQL, through Prisma 7, holds the tenant data and doubles as the queue: the LinkedIn outbox is a table, and Meta webhook deliveries are deduplicated by a unique key. The server crontab calls the /api/cron routes. Email, WhatsApp, LinkedIn, LLM and billing providers sit at the edge.",
      layers: [
        {
          title: "Edge",
          detail:
            "Nginx upstream with least_conn across three PM2 processes. max_fails and fail_timeout take a failing instance out of rotation, and proxy_next_upstream retries the request on the next one.",
        },
        {
          title: "Application",
          detail:
            "Next.js 16 App Router monolith: the React 19 UI plus over 500 API route files. Middleware checks the session and, for seat members, a pure route-rule table before any write.",
        },
        {
          title: "Jobs",
          detail:
            "The server crontab calls /api/cron/* (cadences, LinkedIn, IMAP sync, reconciliation): 46 handlers, a few of them one-off jobs, all behind a fail-closed, constant-time secret check. Long cadence runs send a heartbeat, so a dead run stops blocking the next one.",
        },
        {
          title: "Data and queues",
          detail:
            "PostgreSQL via Prisma 7 and the pg adapter: 126 models and 102 hand-written additive migrations. LinkedInOutbox is a durable per-account queue with a unique dedupeKey; WhatsAppWebhookEvent records each Meta delivery under a unique key to drop redeliveries.",
        },
        {
          title: "Channels",
          detail:
            "Nodemailer and ImapFlow for email. WhatsApp runs on the Meta Cloud API plus QR gateways (Z-API, WAHA, Evolution). LinkedIn runs on Unipile: outgoing actions go through the per-account outbox dispatcher, while reads (search, profiles, posts, network import) and warm-up's invitation accepts call it directly.",
        },
        {
          title: "AI, billing and MCP",
          detail:
            "OpenAI, called over HTTPS with platform keys, handles qualification, personalization and reply classification, with Gemini as an alternative provider; the Anthropic SDK powers the SDR agent v2. AI credits are allotted per plan. Stripe and Asaas handle billing, and a separate MCP server exposes account operations.",
        },
      ],
      flow: [
        "Lead generators and automations pull companies and contacts from Google Maps, Google Search, the CNPJ registry and Apollo into deduplicated lists.",
        "The qualifier crawls each site, up to 8 internal pages, for emails and phones and writes an LLM summary.",
        "Leads join a cadence; the cron-driven executor picks the next step and can personalize it with an LLM.",
        "Sends respect per-mailbox and per-number daily limits; LinkedIn actions wait in the account's outbox for quota and send window.",
        "Replies arrive through IMAP sync and provider webhooks, stop the cadence and are classified by an LLM.",
        "Outcomes go out through the CRM adapter, Google Sheets and HMAC-signed outgoing webhooks.",
      ],
      graph: {
        height: 440,
        tiers: [
          { x: 70, name: "Client" },
          { x: 250, name: "Edge · ops" },
          { x: 450, name: "Core" },
          { x: 670, name: "Services" },
          { x: 890, name: "Integrations" },
        ],
        nodes: [
          {
            id: "web",
            label: "Web app",
            sub: "React 19",
            x: 70,
            y: 60,
            tone: "client",
            detail: "The product UI, served by the same Next.js codebase.",
          },
          {
            id: "nginx",
            label: "Nginx",
            sub: "least_conn · failover",
            x: 250,
            y: 60,
            tone: "core",
            detail:
              "Balances three PM2 processes. max_fails takes a failing one out of rotation, and proxy_next_upstream retries the request on the next.",
          },
          {
            id: "cron",
            label: "Crontab",
            sub: "/api/cron/* · secret",
            x: 250,
            y: 220,
            tone: "job",
            detail:
              "The server crontab calls /api/cron/* (cadences, LinkedIn, IMAP sync, reconciliation): 46 handlers, a few of them one-off jobs, all behind a fail-closed, constant-time secret check.",
          },
          {
            id: "deploy",
            label: "Deploy safety",
            sub: "rollback · health gate",
            x: 250,
            y: 380,
            tone: "job",
            mine: true,
            detail:
              "Each deploy snapshots .next with hardlinks before replacing it; rollback swaps the builds, restarts PM2 and smoke-tests the login route. Staging waits on /api/health and rolls back on failure.",
          },
          {
            id: "rules",
            label: "Seats & roles",
            sub: "middleware · roles from DB",
            x: 450,
            y: 60,
            tone: "core",
            mine: true,
            detail:
              "For seat members, the middleware checks a route-rule table before any write; an unlisted seat write requires MEMBER. Gated routes read roles from the database, not from the seven-day JWT.",
          },
          {
            id: "app",
            label: "Next.js ×3",
            sub: "UI + 500+ API routes",
            x: 450,
            y: 220,
            w: 150,
            tone: "core",
            detail: "One Next.js 16 App Router monolith, the React 19 UI and over 500 API route files, run as three PM2 processes.",
          },
          {
            id: "db",
            label: "PostgreSQL",
            sub: "Prisma 7 · queues in tables",
            x: 450,
            y: 380,
            w: 150,
            tone: "data",
            detail:
              "126 models and 102 hand-written additive migrations. The LinkedIn outbox is a table with a unique dedupeKey; Meta webhook deliveries are deduplicated under a unique key.",
          },
          {
            id: "tracking",
            label: "Opens & bounces",
            sub: "scanner filter · DSN parser",
            x: 670,
            y: 40,
            tone: "service",
            mine: true,
            detail:
              "Hits within 30 s (open) or 120 s (click) of the send, and Gmail and Apple prefetch agents, count as scanner hits; open reports read humanOpenCount. Bounces are parsed from the raw delivery report into six buckets that drive blacklist and stop decisions.",
          },
          {
            id: "cadence",
            label: "Cadence executor",
            sub: "cron-driven steps",
            x: 670,
            y: 130,
            tone: "service",
            detail:
              "Picks each lead's next step, keeps to per-mailbox and per-number daily limits and can personalize a step with an LLM. Mostly the co-developer's work; we both edited it heavily.",
          },
          {
            id: "linkedin",
            label: "LinkedIn outbox",
            sub: "per-account queue · quota",
            x: 670,
            y: 310,
            tone: "service",
            mine: true,
            detail:
              "Campaigns, warm-up, cadences and manual use all enqueue an intent; one dispatcher per account drains it toward Unipile within quota and send window. Since October 2026 the weekly invite cap comes from the co-developer's v2 table, with my function as the fallback.",
          },
          {
            id: "qualifier",
            label: "Qualifier",
            sub: "HTTP crawl + LLM summary",
            x: 670,
            y: 400,
            tone: "service",
            detail:
              "Fetches up to 8 internal pages of each site over plain HTTP for emails and phones, then writes an LLM summary. Puppeteer belongs to the CNPJ extractor, not to the qualifier.",
          },
          {
            id: "email",
            label: "SMTP · IMAP",
            sub: "Nodemailer · ImapFlow",
            x: 890,
            y: 40,
            tone: "external",
            detail: "Email leaves through Nodemailer; replies and bounces come back through IMAP sync.",
          },
          {
            id: "whatsapp",
            label: "WhatsApp Official",
            sub: "Meta Cloud API · signed webhook",
            x: 890,
            y: 130,
            tone: "external",
            mine: true,
            detail:
              "Meta Tech Provider integration: Embedded Signup, Cloud API send and receive routed by phone_number_id, key-versioned AES-256-GCM tokens, and a webhook that checks X-Hub-Signature-256, records each event under a unique key and acknowledges at once.",
          },
          {
            id: "unipile",
            label: "Unipile",
            sub: "LinkedIn provider",
            x: 890,
            y: 220,
            tone: "external",
            detail:
              "Outgoing LinkedIn actions reach it through the outbox dispatcher. Reads (search, profiles, posts, network import) and warm-up's invitation accepts call it directly.",
          },
          {
            id: "llm",
            label: "LLMs",
            sub: "OpenAI · Gemini · Anthropic",
            x: 890,
            y: 400,
            tone: "external",
            detail:
              "OpenAI over HTTPS with platform keys for qualification, personalization and reply classification; Gemini as an alternative provider; the Anthropic SDK for the SDR agent v2. AI credits are allotted per plan.",
          },
        ],
        edges: [
          { from: "web", to: "nginx", style: "sync" },
          { from: "nginx", to: "rules", style: "sync" },
          { from: "rules", to: "app", style: "sync" },
          { from: "app", to: "db", style: "sync", label: "Prisma" },
          { from: "cron", to: "app", style: "async" },
          { from: "deploy", to: "app", style: "async" },
          { from: "app", to: "cadence", style: "async" },
          { from: "app", to: "linkedin", style: "async", label: "enqueue" },
          { from: "app", to: "qualifier", style: "async" },
          { from: "app", to: "unipile", style: "external", label: "reads" },
          { from: "cadence", to: "email", style: "external" },
          { from: "cadence", to: "whatsapp", style: "external" },
          { from: "email", to: "tracking", style: "external" },
          {
            from: "linkedin",
            to: "unipile",
            style: "external",
            label: "outgoing",
          },
          { from: "qualifier", to: "llm", style: "external" },
        ],
        // Only what each flow line names: the CRM adapter, Sheets and webhooks of step 6 are
        // not on the map, so that step lights the app alone.
        steps: [
          [{ from: "app", to: "db" }],
          [{ from: "qualifier", to: "llm" }],
          [{ from: "cron", to: "app" }, { from: "app", to: "cadence" }, { from: "llm" }],
          [
            { from: "cadence", to: "email" },
            { from: "cadence", to: "whatsapp" },
            { from: "app", to: "linkedin" },
            { from: "linkedin", to: "unipile" },
          ],
          [{ from: "email", to: "cadence" }, { from: "whatsapp", to: "cadence" }, { from: "llm" }],
          [{ from: "app" }],
        ],
      },
    },
    decisions: [
      {
        title: "One outbox per LinkedIn account",
        detail:
          "Outgoing actions from campaigns, warm-up, cadences and manual use all enqueue an intent, and one dispatcher per account drains it toward Unipile. Two engines that each kept to their own cap had together gone past the account's safe invite budget, so quota has to belong to the account.",
      },
      {
        title: "Invite ceiling derived, not configured",
        detail:
          "The weekly cap was a pure, unit-tested function of acceptance rate (only invites at least three days old count) and lifetime volume, clamped to 50–200, minus a reserve for the seller's manual use. Usage is a COUNT over the outbox, never an incremented counter. Since October 2026 production uses the co-developer's v2 maturity table (60 to 200 a week), with this function as the fallback.",
      },
      {
        title: "Roles read from the database, not the JWT",
        detail:
          "Sessions are seven-day JWTs, so roles baked into the token could stay valid for a week after revocation. Gated routes do one indexed membership lookup instead. A middleware table makes any unlisted seat write require MEMBER, so new routes start closed.",
      },
      {
        title: "Persist, acknowledge, then process",
        detail:
          "The Meta webhook verifies X-Hub-Signature-256 over the raw body, records each event under a unique dedupe key, returns 200 at once and processes in Next.js after(). The dedupe row lives in Postgres rather than memory, so it survives restarts and a Meta redelivery hits the unique constraint. The row holds no payload, so retries are not built yet; the code plans pg-boss for them.",
      },
      {
        title: "Undo a deploy by swapping builds",
        detail:
          "An environment flag cannot revert compiled chunks, so the deploy snapshots .next with hardlinks (cp -al, no extra disk space) before replacing it. Rollback swaps the directories, restarts PM2 and smoke-tests a POST to the login route, which exercises Prisma.",
      },
    ],
    challenges: [
      {
        title: "Security scanners counted as readers",
        detail:
          "Safe Links and Proofpoint open links in a real browser seconds after sending, before the person sees the email. Hits within 30 s (open) or 120 s (click) of the send, and Gmail and Apple prefetch agents, are labelled scanner hits. A backfilled humanOpenCount column switched every open report at once, history included; clicks still count scans.",
      },
      {
        title: "Deploys that passed checks while broken",
        detail:
          "The login page returned 200 even with Prisma broken, so the checks passed. Staging deploys now wait on /api/health, which runs a raw query and a findFirst to catch a stale client or a missing column. On failure they roll back and keep the failed build for diagnosis.",
      },
      {
        title: "Forged lead replies on unsigned callbacks",
        detail:
          "Z-API does not sign callbacks, so a forged POST could stop cadences and open CRM deals. An origin proof checks that the body's instanceId matches the credential named in the URL, or the only credential holding that instance. It ships in a log-only measure mode, with an env switch to reject with 401. The dedicated Meta webhook rejects any event without a valid HMAC.",
      },
      {
        title: "Requests hanging past the proxy timeout",
        detail:
          "With pg defaults, a query waiting for a pooled connection could wait forever, outlasting Nginx's 120 s limit and causing intermittent 502/504s. Now an explicit pool (15 per process, three processes) with an 8 s connection timeout and a 90 s statement timeout limits every wait.",
      },
    ],
    implementation: [
      "LinkedIn module on Unipile: a LinkedInOutbox table as the single per-account queue, idempotent enqueue on a unique dedupeKey and an optimistic PENDING-to-SENT claim before each provider call. It also adds burst control after backlogs and a circuit breaker after three consecutive errors.",
      "Official WhatsApp as a Meta Tech Provider: Embedded Signup onboarding, Cloud API send and receive routed by phone_number_id, Meta tokens under key-versioned AES-256-GCM, and one signed webhook that also accepts legacy clients' own app secrets.",
      "Team seats: members act under the owner's userId while actorId keeps their identity. Each role gets a few broad capabilities, per-author scoping compiles into createdByMemberId filters, and a member can get a monthly quota inside the account's limits.",
      "Email signal quality: the isScannerHit classifier feeds humanOpenCount. A DSN parser reads the raw RFC 822 source, extracts the status code and diagnostic, and sorts bounces into six buckets that drive blacklist and stop decisions.",
      "Deploy safety: a hardlink build snapshot with scripted rollback, a Prisma schema guard that regenerates the client when the schema changes, the staging health gate on /api/health, and an explicit pg pool with connection and statement timeouts.",
      "Metering and access: per-plan AI credits with idempotent debits (the usage row is written first under a unique key), and MCP client login against the app's own credentials, with an entitlement check repeated on every request.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma 7",
      "PostgreSQL",
      "Nginx",
      "PM2",
      "Meta Cloud API",
      "Unipile",
      "Nodemailer",
      "ImapFlow",
      "Puppeteer",
      "OpenAI API",
      "Gemini API",
      "Anthropic SDK",
      "Stripe",
      "Asaas",
      "MCP",
    ],
    results: [
      "Live at cadenceflow.pro (checked 24 November 2026).",
      "A 126-model Prisma schema with 102 versioned SQL migrations, written by hand under an additive-only rule (db:push is blocked).",
      "292 assertion-based *.test.ts files under saas/src and 135 scripts/check-*.ts, without a test framework; npm run check chains 177 of the 220 check:* scripts.",
    ],
    readouts: [
      { k: "instances", v: "3 × PM2 · Nginx least_conn" },
      { k: "queues", v: "inside Postgres" },
      { k: "Meta webhook", v: "X-Hub-Signature-256" },
      { k: "deploy", v: "build rollback in seconds" },
    ],
  },
  {
    slug: "finance-platform",
    index: "002",
    title: "Finance Platform",
    category: "Fintech / Full Stack / Product Engineering",
    tags: ["Fintech", "Full Stack", "Product"],
    summary:
      "A personal finance platform designed to help users organize expenses, manage financial goals, analyze scenarios and make better financial decisions.",
    year: "2026",
    role: "Solo · product and engineering",
    status: "Live · PWA",
    links: [
      {
        label: "moneyflow-pedro.vercel.app",
        href: "https://moneyflow-pedro.vercel.app",
      },
    ],
    cover: {
      src: "/work/finance-platform.webp",
      alt: "Rendered artwork for the finance platform: glass discs rising in a curve through a pale fog",
    },
    product: "MyWay (codebase MoneyFlow)",
    notes: [
      {
        title: "In production",
        detail:
          "Live as an installable web app, and not sold yet: a subscription plan is documented, but no plan or billing code exists. Connecting a bank and the Claude chat are limited to allowlisted accounts. My own account has synced through Meu Pluggy since 26 October 2026, and the landing page lists the assistant as coming soon.",
      },
    ],
    overview:
      "MyWay (codebase: MoneyFlow) is a personal finance app for planning the month ahead: it tracks expenses, goals and bills and lets the user test scenarios before money moves. It targets Brazilians paid as salaried employees (CLT), as micro-entrepreneurs (MEI) or both, and pairs a manual ledger (bank sync through Open Finance is limited to allowlisted accounts) with savings pots, a three-scenario forecast, a loan simulator and a task planner. It is one TypeScript codebase on Expo and Supabase, shipped as an installable web app.",
    problem:
      "The product brief frames MyWay as a month planner rather than an expense tracker: the question is how much will be left on the 30th once salary after INSS and income tax, bills, the card bill and expected client payments are counted. For someone who is both an employee and a micro-entrepreneur, the same money can be counted twice: once as business revenue and again when it moves to the personal account. Bank feeds add noise: Pluggy's transaction ids change when a card bill closes, bill payments and third-party Pix arrive with the wrong category, and a refunded Pix looks like income.",
    architecture: {
      summary:
        "The UI, Zustand stores and pure TypeScript domain modules live in one Expo Router codebase (React Native with react-native-web). Its static web export runs on Vercel as an installable PWA. Supabase provides Auth, Postgres with row-level security on every table, and Deno Edge Functions for bank sync, Web Push and a Claude chat. pg_cron calls the sync and push functions through pg_net, authenticating with a secret kept in Supabase Vault.",
      layers: [
        {
          title: "Client",
          detail:
            "Expo (the expo 54 package) with Expo Router 4, React Native 0.77 and react-native-web. Zustand stores write optimistically (the finance store with local ids), cache state in AsyncStorage and reload data older than a minute when the app regains focus. Failed loads retry after 5, 15 and 45 seconds.",
        },
        {
          title: "Domain logic",
          detail:
            "Pure TypeScript modules cover balance, month summary, scenarios, amortization, CLT payroll, the MEI cap and reconciliation. Screens, alerts and the chat context call the same functions, and 28 node:assert self-check scripts test them.",
        },
        {
          title: "Database",
          detail:
            "Supabase Postgres with 20 tables, all with RLS enabled. Owner policies check auth.uid(); three service-role-only tables have no policies at all. The jsonb settings columns on profiles carry shape CHECK constraints, and the schema is a base file plus 19 idempotent migrations.",
        },
        {
          title: "Bank ingestion",
          detail:
            "The sync-pluggy Edge Function reads Pluggy accounts, transactions, card bills and investments and classifies them in a pure mapper. It writes through security-definer RPCs (apply_bank_sync, apply_investments_sync) that only the service role may execute.",
        },
        {
          title: "Jobs and push",
          detail:
            "pg_cron calls the sync-pluggy and notify Edge Functions through pg_net with a bearer secret read from Vault (every 2 hours and every 5 minutes); a third job deletes notification_log rows older than 60 days each day. Each notice key is claimed in notification_log before VAPID Web Push sends it, and released after a transient failure.",
        },
        {
          title: "Assistant",
          detail:
            "The chat Edge Function calls Claude with a cached system prompt, a JSON finance summary and two tools that only propose changes. Access requires a row in chat_users. Without an account, a local keyword engine answers instead.",
        },
      ],
      flow: [
        "pg_cron (every 2 hours) or the Sync button on the app's bank screen calls the sync-pluggy Edge Function, authenticated by the Vault secret or the user's JWT.",
        "The function reads accounts, transactions (12 months on the first run, then at least 90 days), card bills and investments from Pluggy.",
        "A pure mapper classifies each movement: transfers between the user's own tax IDs, MEI income, paired Pix refunds, merchant keys and installments.",
        "apply_bank_sync upserts on the providerId-based key in one SQL transaction, applies learned merchant rules without overriding locked categories, deletes in-window rows the bank no longer returns and recomputes the balance once.",
        "The client loads its rows under RLS, and pure functions derive the balance, month summary, due items and 'Chegou?' matches.",
        "The Futuro tab projects month-end balances in three scenarios, and the notify function pushes due bills, task reminders, a daily digest and incoming money.",
      ],
      // Solo build: every part in the repo is mine; the providers are not.
      graph: {
        height: 400,
        tiers: [
          { x: 80, name: "Client · clock" },
          { x: 340, name: "Edge Functions" },
          { x: 600, name: "Postgres" },
          { x: 860, name: "Providers" },
        ],
        nodes: [
          {
            id: "cron",
            label: "pg_cron",
            sub: "pg_net · Vault secret",
            x: 80,
            y: 40,
            tone: "job",
            mine: true,
            detail:
              "Three jobs defined in SQL: bank sync every 2 hours and push rules every 5 minutes, both called through pg_net with a bearer secret read from Vault, and a daily cleanup of notification_log rows older than 60 days.",
          },
          {
            id: "pwa",
            label: "MyWay PWA",
            sub: "Expo Router · RN Web",
            x: 80,
            y: 200,
            tone: "client",
            mine: true,
            detail:
              "Expo Router and React Native with react-native-web, exported as a static installable PWA on Vercel. Zustand stores write optimistically, cache in AsyncStorage and reload data older than a minute when the app regains focus.",
          },
          {
            id: "domain",
            label: "Domain modules",
            sub: "pure TS · 28 self-checks",
            x: 80,
            y: 360,
            tone: "core",
            mine: true,
            detail:
              "Pure TypeScript for balance, month summary, scenarios, amortization, CLT payroll, the MEI cap and reconciliation. Screens, alerts and the chat context call the same functions, and 28 node:assert scripts test them.",
          },
          {
            id: "notify",
            label: "notify",
            sub: "Edge Function · Web Push",
            x: 340,
            y: 40,
            tone: "service",
            mine: true,
            detail:
              "Pushes due bills, task reminders, a daily digest and incoming money. Each notice key is claimed in notification_log before VAPID Web Push sends it, and released after a transient failure.",
          },
          {
            id: "sync",
            label: "sync-pluggy",
            sub: "Edge Function · pure mapper",
            x: 340,
            y: 130,
            tone: "service",
            mine: true,
            detail:
              "Reads Pluggy accounts, transactions, card bills and investments, classifies every movement in a pure mapper and writes through security-definer RPCs that only the service role may execute.",
          },
          {
            id: "chat",
            label: "chat",
            sub: "Edge Function · Claude",
            x: 340,
            y: 300,
            tone: "service",
            mine: true,
            detail:
              "Calls Claude with a cached system prompt, a JSON finance summary and two tools that only propose changes. Access requires a row in chat_users; without an account, a local keyword engine answers instead.",
          },
          {
            id: "db",
            label: "Postgres",
            sub: "RLS on all 20 tables",
            x: 600,
            y: 200,
            tone: "data",
            mine: true,
            detail:
              "Supabase Postgres from a base schema plus 19 idempotent migrations. Owner policies check auth.uid(); three service-role-only tables have no policies at all. apply_bank_sync writes an account, its transactions and its card bills in one SQL transaction.",
          },
          {
            id: "push",
            label: "Web Push",
            sub: "VAPID",
            x: 860,
            y: 40,
            tone: "external",
            detail: "Browser push through VAPID; the app's service worker only handles push.",
          },
          {
            id: "pluggy",
            label: "Pluggy",
            sub: "Open Finance API",
            x: 860,
            y: 130,
            tone: "external",
            detail:
              "Accounts, transactions, card bills and investments. Bank sync is limited to allowlisted accounts: a new bank connection requires open_finance_allowed().",
          },
          {
            id: "claude",
            label: "Claude API",
            sub: "tools only propose",
            x: 860,
            y: 300,
            tone: "external",
            detail:
              "Its two tools only return proposals: the app shows a confirmation card, applies accepted changes through the same store actions as the UI and refuses bulk edits above 200 rows.",
          },
        ],
        edges: [
          { from: "cron", to: "notify", style: "async", label: "every 5 min" },
          { from: "cron", to: "sync", style: "async", label: "every 2 h" },
          { from: "pwa", to: "sync", style: "sync", label: "Sync · JWT" },
          { from: "pwa", to: "db", style: "sync", label: "RLS" },
          { from: "pwa", to: "chat", style: "sync" },
          { from: "pwa", to: "domain", style: "sync" },
          { from: "notify", to: "db", style: "sync" },
          { from: "notify", to: "push", style: "external" },
          { from: "sync", to: "db", style: "sync" },
          { from: "sync", to: "pluggy", style: "external", label: "reads" },
          { from: "chat", to: "claude", style: "external" },
        ],
        steps: [
          [
            { from: "cron", to: "sync" },
            { from: "pwa", to: "sync" },
          ],
          [
            { from: "sync", to: "pluggy" },
            { from: "pluggy", to: "sync" },
          ],
          [{ from: "sync" }],
          [{ from: "sync", to: "db" }],
          [
            { from: "db", to: "pwa" },
            { from: "pwa", to: "domain" },
          ],
          [
            { from: "pwa", to: "domain" },
            { from: "notify", to: "push" },
          ],
        ],
      },
    },
    decisions: [
      {
        title: "Bank writes through guarded RPCs",
        detail:
          "apply_bank_sync writes one account, its transactions and its card bills in a single SQL transaction; investments go through apply_investments_sync. EXECUTE on both is revoked from public, anon and authenticated and granted only to service_role. A transaction-local flag makes the per-row balance trigger skip during the batch, and the balance is recomputed once at the end.",
      },
      {
        title: "Key on the bank's id, never delete on empty reads",
        detail:
          "Pluggy's transaction id changes when a card bill closes, so the unique key is the bank's providerId (Pluggy's id only as a fallback) plus the installment number. In-window rows the bank no longer returns are deleted, but only when the read is non-empty: an empty read from expired consent deletes nothing.",
      },
      {
        title: "Store configuration, compute the rest",
        detail:
          "profiles keeps salary, MEI, fixed expenses, yearly goals, the simulation and onboarding answers as jsonb columns with shape CHECK constraints. Payslips, MEI revenue, projections and due items are computed from them, and the app and the push rules import the same due-date module, so screens, the chat summary and notifications use the same calculations.",
      },
      {
        title: "Integer cents in projections",
        detail:
          "The scenario simulator and the SAC/Price tables add up in integer cents. The last installment absorbs the rounding residue so the debt ends at exactly zero, and annual rates are converted by compound equivalence, not by dividing by 12.",
      },
      {
        title: "The model proposes, the user confirms",
        detail:
          "Claude's two tools only return proposals. The app shows a confirmation card and applies accepted changes through the same store actions as the UI. It refuses bulk edits above 200 rows and asks for a narrower filter.",
      },
    ],
    challenges: [
      {
        title: "One person, two tax IDs",
        detail:
          "The sync stores each account holder's tax ID. Money between the user's own IDs becomes a transfer; the one exception is an incoming payment from their own CNPJ into a CPF account, which counts as personal 'mei' income. With a business (PJ) bank connection, which only allowlisted accounts can create, lib/scope.ts builds personal, MEI and combined views and turns the owner's withdrawal on the PJ side into a transfer, so it is not counted twice.",
      },
      {
        title: "Bank data that rewrites itself",
        detail:
          "Besides the stable key, the sync window widens to cover gaps of up to 12 months, and a refunded Pix is paired with its original (same direction, amount and counterparty name) so both become transfers. Accounts that vanish after a consent renewal hand their history and bills to the single remaining account of the same type in that connection.",
      },
      {
        title: "Matching plans to the statement",
        detail:
          "'Chegou?' pairs planned entries with bank movements within date windows that differ for income and expenses, allowing 1% on the amount. It ranks name matches first and pairs one-to-one, auto-confirming only exact, name-matching pairs with no rival. Confirmations can be undone.",
      },
      {
        title: "Gating Open Finance per account",
        detail:
          "The sync uses project-level aggregator credentials, so letting any account insert a bank connection would let a new account pull bank data that is not its own. Inserts now require open_finance_allowed(), a security-definer check against an allowlist, and a column-level grant lets clients update only the scope column.",
      },
    ],
    implementation: [
      "Available balance: with a personal bank account linked, it is the balance of personal bank accounts (PJ excluded) plus synced savings boxes. Otherwise it is the manual ledger, optionally anchored on the balance entered during onboarding, minus savings pots, goal contributions and paid bills.",
      "Goals and savings: goals have a target, a deadline and an active, paused or completed status. Scheduled deposits to savings pots leave the balance without counting as spending, and yearly goals compute the monthly amount needed by the deadline.",
      "Futuro tab: conservative, realistic and optimistic projections, depending on how certain each income is (certain, probable, maybe), starting from real months. A goal check shows the month the goal is reached, the shortfall and the extra needed per month. Saved per account.",
      "Financing simulator: SAC and Price tables with MIP and DFI insurance, admin fees, prepayments that shorten the term or lower the installment, financed IOF under Decree 6.306/2007, and CET solved by bisection.",
      "Brazilian income rules: an estimated CLT payslip from the 2026 INSS and IRRF tables, with 13th salary and a business-day pay calendar. MEI revenue is tracked against the yearly cap, prorated by opening month, with the DAS due on the 20th or the next business day.",
      "Expense analysis in pure functions: monthly subscription detection (median gap of 25–35 days, amount within ±35%), installment grouping, duplicate-charge alerts, per-category limits that warn at 80%, and merchant rules learned when the user recategorizes a bank transaction.",
    ],
    stack: [
      "TypeScript",
      "React",
      "React Native",
      "Expo",
      "Expo Router",
      "react-native-web",
      "Zustand",
      "Supabase",
      "PostgreSQL",
      "PL/pgSQL",
      "Row-Level Security",
      "Deno Edge Functions",
      "pg_cron",
      "pg_net",
      "Supabase Vault",
      "Pluggy Open Finance API",
      "Web Push (VAPID)",
      "Claude API",
      "date-fns",
      "dnd-kit",
      "Vercel",
      "PWA",
    ],
    results: [
      "Live at moneyflow-pedro.vercel.app, with the landing page at /lp/ (checked 24 November 2026).",
      "A Postgres schema of 20 tables, all with row-level security enabled, built from a base schema plus 19 versioned, idempotent SQL migrations.",
      "4 Edge Functions in the repo (chat, notify, sync-pluggy and the disabled sync-pierre) and 3 pg_cron jobs defined in SQL: bank sync every 2 hours, push rules every 5 minutes, daily log cleanup.",
      "28 node:assert self-check scripts covering balance, scenarios, amortization, CLT, MEI, reconciliation, push rules and bank mapping.",
      "An installable PWA with a standalone web manifest, a maskable icon and a service worker that only handles push.",
    ],
    readouts: [
      { k: "isolation", v: "RLS on all 20 tables" },
      { k: "bank sync", v: "pg_cron every 2 h, 90-day window" },
      { k: "dedupe key", v: "bank providerId + installment" },
      { k: "scenarios", v: "3, by income certainty" },
    ],
  },
  {
    slug: "legal-intelligence",
    index: "003",
    title: "Legal Intelligence",
    category: "Legaltech / AI / Automation",
    tags: ["Legaltech", "AI", "Automation"],
    summary:
      "An intelligent legal workflow platform designed for court-case tracking, daily updates, deadline organization, document generation and AI-assisted analysis.",
    year: "2026",
    role: "Solo · full stack",
    status: "Live",
    links: [{ label: "ritotech.vercel.app", href: "https://ritotech.vercel.app" }],
    cover: {
      src: "/work/legal-intelligence.webp",
      alt: "Rendered artwork for the legal platform: monolithic slabs read by a thin scanning light",
    },
    product: "RitoTech",
    notes: [
      {
        title: "Authorship",
        detail: "Solo build, started from an empty folder on 4 November 2026.",
      },
      {
        title: "In production",
        detail:
          "The web app runs on Vercel (gru1); the worker runs outside Vercel, on a provisional VPS since 12 November 2026. As of that date production ran the DJEN integration only. The Escavador sync and the AI explanations are implemented and tested (Escavador against mocked responses), but nothing shows them running in production.",
      },
      {
        title: "Deadlines",
        detail:
          "It never calculates deadlines. Its AI prompt tells the model to quote any deadline text verbatim from the source, and the daily sheet lists the review dates that lawyers set on tasks, flagging overdue ones.",
      },
      {
        title: "Documents",
        detail:
          "Its documents are the daily sheet as a PDF, a print view and copied text, plus a summary email with a link. It does not draft legal documents.",
      },
    ],
    overview:
      "RitoTech is a multi-tenant SaaS that tracks a Brazilian law firm's cases and delivers a daily sheet of what changed. A separate worker reads the national court gazette (DJEN) by the office's bar registration (OAB) and case numbers. It can also pull full case activity from the paid Escavador API and have an LLM (Claude by default) explain each new movement in a schema-validated structure, under a prompt that forbids computing deadlines or inventing decisions. Paid queries and AI calls are costed and checked against a monthly budget the office sets.",
    problem:
      "Lawyers start the day checking courts case by case to see what moved, and an intimation missed in the official gazette can mean a lost deadline. The free national gazette carries only official communications. Full case activity sits behind a paid API, so complete coverage is billed per query. Software that paraphrases court text also cannot be allowed to invent a deadline or a decision.",
    architecture: {
      summary:
        "A Next.js 16 web app and a separate Node worker share one Supabase Postgres database, which also serves as the job queue. Screens enqueue long-running work. The worker claims jobs with FOR UPDATE SKIP LOCKED, calls DJEN, Escavador and the AI provider, and writes results that the app reads under row-level security scoped to each office.",
      layers: [
        {
          title: "Web app",
          detail:
            "Next.js 16 App Router with Server Actions and route handlers. The Supabase Auth session lives in cookies, and a proxy rewrites '/' to the sales page for signed-out visitors. Every in-app Server Action checks the user's minimum role, and the browser never queries Supabase directly.",
        },
        {
          title: "Database",
          detail:
            "Supabase Postgres with 8 versioned migrations. RLS is enabled on every table, with office-scoped policies built on user_org_ids(). Audit triggers record field-level diffs, and AES-256-GCM-encrypted API keys sit in a column the app role cannot select.",
        },
        {
          title: "Job queue",
          detail:
            "A sync_jobs table with a partial unique index on dedupe_key for idempotency, ordering by priority then run_at, and exponential backoff with jitter. Jobs whose lock has not been renewed for 10 minutes go back to the queue, unless they have used up their attempts.",
        },
        {
          title: "Worker",
          detail:
            "One Node process bundled with esbuild that runs one job at a time to stay light on 1 vCPU. Its jobs are DJEN sync, Escavador sync and polling, AI analysis, the daily sheet, sharing and retention cleanup. A scheduler checks every minute what is due in each office's time zone.",
        },
        {
          title: "Integrations",
          detail:
            "The DJEN public API (reads rate-limit headers, pauses 60 s on HTTP 429), Escavador API v2 (cost read per call from the Creditos-Utilizados header), and either the Anthropic SDK or any OpenAI-compatible /chat/completions endpoint.",
        },
        {
          title: "Hosting",
          detail:
            "The web app runs on Vercel (gru1). The repo also includes a Docker Compose stack (web, worker, Caddy TLS, memory limits) sized for a 1 vCPU / 4 GB VPS, plus a script that runs the worker as a Windows scheduled task with a DPAPI-encrypted config. Optional Healthchecks.io pings alert when the worker, the DJEN sweep or the daily sheet stops reporting.",
        },
      ],
      flow: [
        "The scheduler enqueues a DJEN sweep for each office every few hours (6 by default), deduplicated by key.",
        "The worker queries DJEN by each active OAB and each tracked case number. It stores each communication once under its official hash and records every source that matched it.",
        "A publication addressed to one of the office's OABs registers an unknown case automatically (on by default). A new publication on a tracked case queues an Escavador refresh, unless the case is set to manual or no Escavador token is configured.",
        "New movements are deduplicated across sources and queued for AI. Only movements from clients with a signed AI consent reach the model.",
        "The model returns a schema-validated analysis (category, priority, impact, suggested action and any deadline text quoted from the source). The analysis is cached by input hash and costed per call.",
        "At the configured hour (07:30 by default), the worker freezes an immutable sheet ordered by priority. It includes the open tasks whose review date is due and any alert about gaps in the DJEN capture.",
        "Lawyers read the sheet as a full-screen feed, a PDF or copied text, share a summary by email, and turn items into assigned tasks.",
      ],
      // Solo build: every part in the repo is mine; the gazette, the APIs and the mail are not.
      graph: {
        height: 420,
        tiers: [
          { x: 70, name: "Client" },
          { x: 290, name: "Web app · Vercel" },
          { x: 510, name: "Postgres" },
          { x: 730, name: "Worker · VPS" },
          { x: 950, name: "Providers" },
        ],
        nodes: [
          {
            id: "ui",
            label: "Web UI",
            sub: "feed · PDF · print view",
            x: 70,
            y: 200,
            tone: "client",
            mine: true,
            detail:
              "The daily sheet as a full-screen feed with J/K navigation, a PDF built on the server, a print view and copied text. The browser never queries Supabase directly.",
          },
          {
            id: "web",
            label: "Next.js 16",
            sub: "Server Actions · gru1",
            x: 290,
            y: 200,
            tone: "core",
            mine: true,
            detail:
              "App Router with Server Actions and route handlers; the Supabase Auth session lives in cookies. Every in-app Server Action checks the user's minimum role, and screens enqueue long-running work.",
          },
          {
            id: "db",
            label: "Postgres",
            sub: "RLS per office",
            x: 510,
            y: 110,
            tone: "data",
            mine: true,
            detail:
              "Supabase Postgres with 8 versioned migrations. RLS on every table, with office-scoped policies built on user_org_ids(); audit triggers record field-level diffs, and encrypted API keys sit in a column the app role cannot select.",
          },
          {
            id: "queue",
            label: "Job queue",
            sub: "sync_jobs · SKIP LOCKED",
            x: 510,
            y: 290,
            tone: "data",
            mine: true,
            detail:
              "A table in the same database. A partial unique index on dedupe_key makes enqueueing idempotent; jobs run by priority then run_at and back off exponentially with jitter, and a job whose lock has not been renewed for 10 minutes goes back to the queue.",
          },
          {
            id: "worker",
            label: "Worker",
            sub: "Node · one job at a time",
            x: 730,
            y: 200,
            tone: "service",
            mine: true,
            detail:
              "One Node process bundled with esbuild, claiming jobs with FOR UPDATE SKIP LOCKED: DJEN sync, Escavador sync and polling, AI analysis, the daily sheet, sharing and retention cleanup.",
          },
          {
            id: "scheduler",
            label: "Scheduler",
            sub: "every minute · per office",
            x: 730,
            y: 380,
            tone: "job",
            mine: true,
            detail:
              "Part of the worker: every minute it checks what is due in each office's time zone, such as the DJEN sweep (every 6 hours by default) and the daily sheet (07:30 by default).",
          },
          {
            id: "djen",
            label: "DJEN",
            sub: "national gazette · public API",
            x: 950,
            y: 50,
            tone: "external",
            detail:
              "The free national court gazette, read by OAB and case number: 100 items per page, a 3.5-second minimum gap between calls and a 60-second pause on HTTP 429.",
          },
          {
            id: "escavador",
            label: "Escavador v2",
            sub: "paid · cost per call",
            x: 950,
            y: 150,
            tone: "external",
            detail:
              "Full case activity behind a paid API, its cost read from the Creditos-Utilizados header. Implemented and tested against mocked responses; nothing shows it running in production.",
          },
          {
            id: "llm",
            label: "LLM provider",
            sub: "Claude · OpenAI-compatible",
            x: 950,
            y: 250,
            tone: "external",
            detail:
              "The Anthropic SDK with structured output, or any OpenAI-compatible /chat/completions endpoint checked against the same schema. The AI explanations are implemented and tested; nothing shows them running in production.",
          },
          {
            id: "email",
            label: "Email",
            sub: "Nodemailer · summary",
            x: 950,
            y: 350,
            tone: "external",
            detail: "A summary email with a link to the sheet, for office members.",
          },
        ],
        edges: [
          { from: "ui", to: "web", style: "sync" },
          { from: "web", to: "db", style: "sync", label: "RLS" },
          { from: "web", to: "queue", style: "async", label: "enqueue" },
          { from: "worker", to: "db", style: "sync", label: "results" },
          { from: "worker", to: "queue", style: "sync", label: "claim" },
          { from: "scheduler", to: "queue", style: "async", label: "enqueue" },
          { from: "worker", to: "djen", style: "external" },
          { from: "worker", to: "escavador", style: "external" },
          { from: "worker", to: "llm", style: "external" },
          { from: "worker", to: "email", style: "external" },
        ],
        steps: [
          [{ from: "scheduler", to: "queue" }],
          [
            { from: "worker", to: "djen" },
            { from: "djen", to: "worker" },
            { from: "worker", to: "db" },
          ],
          [
            { from: "worker", to: "db" },
            { from: "worker", to: "queue" },
          ],
          [
            { from: "worker", to: "queue" },
            { from: "queue", to: "worker" },
            { from: "worker", to: "llm" },
          ],
          [
            { from: "llm", to: "worker" },
            { from: "worker", to: "db" },
          ],
          [{ from: "worker", to: "db" }],
          [
            { from: "db", to: "web" },
            { from: "web", to: "ui" },
            { from: "worker", to: "email" },
          ],
        ],
      },
    },
    decisions: [
      {
        title: "Postgres as the queue",
        detail:
          "No Redis. A partial unique index on dedupe_key makes enqueueing idempotent, and FOR UPDATE SKIP LOCKED stops two workers from claiming the same job. The whole system runs on one database and is sized for a 1 vCPU / 4 GB VPS, with memory limits set in docker-compose.yml.",
      },
      {
        title: "Quote deadlines, never compute them",
        detail:
          "The system prompt forbids date arithmetic and forbids asserting that a deadline is running. When the text names a deadline, the model must copy the literal excerpt into prazo_mencionado. Lawyers set review dates on tasks, and each daily sheet lists the open ones due by that day (up to 50), flagging overdue ones.",
      },
      {
        title: "Immutable, versioned daily sheets",
        detail:
          "Each sheet item stores a JSON snapshot, and each period starts where the previous one ended. Regenerating creates the next version and keeps the old one, so reprocessing a movement never rewrites what a lawyer already read.",
      },
      {
        title: "Budget check before paid work",
        detail:
          "Escavador cost comes from the Creditos-Utilizados header, and AI cost from token usage priced per model. Before an automatic Escavador sync, the worker adds the 30-day average cost of the calls it will make to the month's spend and skips the sync if the total would cross the limit, unless the office allows overruns. AI analysis stops once spend passes the limit, and AI costs count in reais only once the office sets a dollar rate. Alerts fire once a month at 70, 85 and 100%.",
      },
      {
        title: "Consent and data minimization before AI",
        detail:
          "Movements from clients without a signed AI consent stay blocked (CFOAB Recommendation 001/2024). The case context sent to the model gives class, subject, area, court and instance, and leaves out party names. Identical inputs reuse a cached analysis at no cost.",
      },
    ],
    challenges: [
      {
        title: "A failed capture must never read as 'no news'",
        detail:
          "The DJEN query window advances only when every query succeeds. Three consecutive remote failures, confirmed by a lightweight ping, trip a circuit breaker, and the scheduler retries in an hour. Meanwhile the sheet shows 'capture incomplete' with the last complete query time.",
      },
      {
        title: "Deduplicating sources without hiding an intimation",
        detail:
          "The same publication can arrive from DJEN and from Escavador under different titles. A copy is set aside as a duplicate only when its normalized text is identical and the dates are within five days, because PROJUDI intimations to plaintiff and defendant can differ by one word. A visible duplicate beats a hidden deadline.",
      },
      {
        title: "The DJEN 10,000-result ceiling",
        detail:
          "Past the cap, the API stops returning pages and the rest would disappear without an error. searchAll halves the date range recursively until each slice fits. A single day still above the cap fails visibly and keeps the window from advancing.",
      },
      {
        title: "A year of history without flooding the sheet",
        detail:
          "Registering an OAB imports 12 months in 30-day windows. Anything older than seven days (the default) is stored as history: it shows on the case timeline but stays out of the sheet, the AI queue and paid Escavador calls.",
      },
    ],
    implementation: [
      "DJEN adapter, checked against the official Swagger: 100 items per page, a 3.5-second minimum gap between calls, a 60-second pause on HTTP 429 and no IP rotation. While parsing it removes NUL bytes and repairs lone surrogates, so one malformed item cannot block a sweep.",
      "Escavador v2 adapter: built from the official v2 docs and tested against mocked responses. It requests an asynchronous court refresh and polls its status at growing intervals, and it paginates movements by cursor, stopping at the first page that holds a known movement id. It checks the host, so the bearer token never follows a pagination link to another domain.",
      "AI layer with two providers: Anthropic structured output (zod schema, low effort where the model supports it, prompt caching) or any OpenAI-compatible endpoint validated against the same schema. Refusal, auth, rate-limit and invalid-output errors map to typed errors, and analyses are cached by a SHA-256 key over prompt version, model and input.",
      "Daily sheet: a full-screen feed with J/K navigation, a server-side PDF built with pdfkit (no headless browser), a print view and copied text, plus a summary email with a link for office members. Items are inserted in batches of 1,000 to stay under Postgres's parameter limit.",
      "Security: per-office RLS, a minimum-role check in every in-app Server Action, audit triggers, encrypted credentials, and CSP and HSTS in production. In-memory rate limits cover logins, manual refreshes, AI reprocessing and downloads. Court documents are proxied on demand and never stored.",
      "Tests: 97 Vitest cases across five files. The database suites boot embedded Postgres (PGlite) with the real migrations and a minimal Supabase auth stub. Together they cover RLS isolation, queue locking, DJEN, Escavador, AI caching, consent and sheet snapshots, with the external APIs mocked.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase Auth",
      "PostgreSQL (RLS)",
      "postgres.js",
      "Anthropic SDK (Claude)",
      "OpenAI-compatible API",
      "Zod",
      "pdfkit",
      "unpdf",
      "Nodemailer",
      "Tailwind CSS 4",
      "Vitest",
      "PGlite",
      "esbuild",
      "Docker Compose",
      "Caddy",
      "Vercel",
      "DJEN API",
      "Escavador API v2",
    ],
    results: [
      "Live at ritotech.vercel.app (checked 24 November 2026).",
      "8 versioned SQL migrations in supabase/migrations.",
      "97 Vitest test cases; the database tests run the real migrations on embedded Postgres (PGlite).",
      "Deployment files in the repo: a Dockerfile, Docker Compose (web, worker, Caddy) and install, update and backup scripts.",
    ],
    readouts: [
      { k: "queue", v: "Postgres + SKIP LOCKED" },
      { k: "isolation", v: "RLS per office" },
      { k: "AI output", v: "12-field zod schema" },
      { k: "budget alerts", v: "70 / 85 / 100%" },
    ],
  },
  {
    slug: "automation-infrastructure",
    index: "004",
    title: "Automation Infrastructure",
    category: "Backend / Integrations / Systems",
    tags: ["Backend", "Integrations", "Systems"],
    summary: "Advanced automation workflows connecting multiple business platforms, APIs, databases and communication services.",
    year: "2025 — 2026",
    role: "Own product, co-developed product and in-house automation work",
    status: "In production",
    links: [
      { label: "nucleoaut.vercel.app", href: "https://nucleoaut.vercel.app" },
      { label: "sdr.cadenceflow.pro", href: "https://sdr.cadenceflow.pro" },
    ],
    cover: {
      src: "/work/automation-infrastructure.webp",
      alt: "Rendered artwork for automation infrastructure: a lattice of nodes joined by threads of light",
    },
    parts: [
      {
        name: "Núcleo",
        role: "My own project",
        text: "The event and automation engine this case is built around; architecture and code are mine. Its repository holds two snapshot commits, so the before-and-after stories below come from code comments and migration notes, not from commit history.",
      },
      {
        name: "Agente SDR",
        role: "Co-developed · my parts only",
        text: "Another engineer owns the production baseline and most of the code: the original conversation and AI engines, the triager, campaigns, deploy, the CRM mirror-webhook delivery and its retry cron. Mine: the CadenceFlow WhatsApp ingress, the outbound router, the conversation-event contract, the handoff SLA queue and the single-run cron lock.",
      },
      {
        name: "1 Call Closers",
        role: "2025 role · CV only",
        text: "A remote role (California, January to September 2025): n8n, Zapier and Make integrations over REST APIs for sales, scheduling and operational metrics reporting. No repository or public code stands behind it.",
      },
    ],
    notes: [
      {
        title: "Where n8n fits",
        detail:
          "The code in this case is TypeScript. The n8n work comes from the 1 Call Closers role and from landing pages that post leads to n8n webhooks; no n8n workflow export in the repositories is attributed to me.",
      },
      {
        title: "Where Supabase fits",
        detail:
          "Núcleo uses it as hosted Postgres plus pg_cron and pg_net scheduling, with its own JWT auth. Agente SDR runs on its own schema in a PostgreSQL database it shares with CadenceFlow.",
      },
      {
        title: "In production",
        detail:
          "Núcleo is live at nucleoaut.vercel.app and Agente SDR runs at sdr.cadenceflow.pro. Núcleo's pg_cron schedule exists as runbook SQL; nothing in the repo records it as applied.",
      },
    ],
    overview:
      "Integration work built around one goal: an automation may wait, retry or fail loudly, but it should not silently lose an event or act on it twice. The core is Núcleo's event engine, a transactional outbox on Supabase Postgres drained by a worker behind an HTTP endpoint that a pg_cron schedule, defined in the runbook, calls. Around it sit my parts of Agente SDR (WhatsApp ingress, one outbound router, a conversation event contract) and the n8n, Zapier and Make integrations from my 2025 role at 1 Call Closers, which have no public code.",
    problem:
      "Small service firms and sales teams run on events that cross systems: a contract is signed, a PIX payment clears, a lead replies on WhatsApp. Wired by hand or with fire-and-forget calls, those hand-offs fail quietly: a crash between two writes loses the event, a redelivered webhook triggers a second reply, and a send skipped by a stale guard leaves a reply in the database that never reaches the lead. Serverless time limits and provider outages add their own failure modes.",
    architecture: {
      summary:
        "State changes commit together with their event in a Postgres outbox. A worker claims due events with FOR UPDATE SKIP LOCKED and runs the matching 'when X, do Y' automations, recording every step. On Vercel, a Supabase pg_cron schedule defined in the runbook calls a secret-protected /api/cron/tick to drive it. In Agente SDR, an authenticated ingress deduplicates and answers before processing, and free-text WhatsApp replies leave through one outbound router.",
      layers: [
        {
          title: "Producers",
          where: "Núcleo",
          detail:
            "Domain writes (contract.signed, payment.paid, payment.expired) call emit(tx, ...) inside the same Prisma transaction, with an idempotencyKey built from a domain id. A duplicate key (P2002) is ignored, so a replayed write does not publish twice.",
        },
        {
          title: "Outbox on Supabase Postgres",
          where: "Núcleo",
          detail:
            "OutboxEvent rows move PENDING → PROCESSING → DONE. A failure puts the row back in PENDING with a later availableAt, and the fifth failure marks it DEAD. lockedAt lets a reaper recover rows orphaned by a crash, and an index on (status, availableAt) serves the claim.",
        },
        {
          title: "Clock",
          where: "Núcleo",
          detail:
            "The CRON.md runbook has Supabase pg_cron post through pg_net to /api/cron/tick on three schedules: every minute it drains the outbox and expires stale PIX charges, every five minutes it reconciles payments with the gateway, and once a day it runs deadlines, expiring contracts and proposals, recurring automations and monthly charges. Locally the same functions run on setInterval.",
        },
        {
          title: "Automation engine",
          where: "Núcleo",
          detail:
            "Automations read as sentences, not node graphs: one trigger, AND/OR conditions, ordered steps. Runs and step results are stored per event, and a health view groups failures by error over 30 days. A dry-run executes steps without sending, charging or writing.",
        },
        {
          title: "Channel ingress",
          where: "Agente SDR",
          detail:
            "CadenceFlow, which owns the Meta webhook, relays WhatsApp messages with an internal token. The route checks the token, drops repeats inside 60 s, answers 200 and hands the message to the conversation engine, which serializes work per conversation.",
        },
        {
          title: "Outbound router and event contract",
          where: "Agente SDR",
          detail:
            "sendLeadText picks Chatwoot or CadenceFlow and returns a classified result; sendLeadTemplate sends approved templates through CadenceFlow, pinned to the official number. One conversation-event contract has eight types, and four of them (deal_created, meeting_scheduled, handed_off, not_interested) go to the client's CRM mirror webhook for email and LinkedIn. WhatsApp keeps the engine's inline sync to avoid duplicates.",
        },
        {
          title: "Edge capture",
          where: "Landing pages",
          detail:
            "18 landing pages in my catalogue send leads to n8n webhooks. On CODA Inventory, WhatsApp CTAs post the lead with navigator.sendBeacon, form-encoded to avoid a CORS preflight, before opening WhatsApp. They fall back to a keepalive fetch and keep PII out of the dataLayer.",
        },
      ],
      flow: [
        "In Núcleo, a client signs: the signature row, the contract status and a contract.signed event commit in one transaction.",
        "pg_cron calls /api/cron/tick; the worker requeues stale PROCESSING rows and claims up to 20 due events with SKIP LOCKED.",
        "The engine checks the plan gate, loads active automations for the event, evaluates conditions and upserts one run per automation and event.",
        "In the contract-signed recipe, steps run in order (open the project, create the PIX charge, email the client, tag the client, notify the team); finished steps are skipped on any re-run.",
        "A failing step marks the run FAILED and rethrows; the event retries with backoff doubling from 30 s (capped at 1 h) and turns DEAD after five attempts.",
        "Payment confirmation arrives by signed Mercado Pago webhook or the five-minute reconciliation, and markPaid emits payment.paid for the next automation.",
      ],
      // Two systems, one lane each. Núcleo is all mine. In Agente SDR only my listed parts
      // carry the ring (ingress, router, event contract); the engine and the CRM delivery are
      // the other engineer's. The landing pages and the 1 Call Closers work have no node.
      graph: {
        height: 460,
        tiers: [
          { x: 70, name: "Sources" },
          { x: 290, name: "Ingress" },
          { x: 510, name: "Core" },
          { x: 730, name: "Dispatch" },
          { x: 950, name: "Outputs" },
        ],
        lanes: [
          { y: 0, label: "Núcleo · my own project" },
          { y: 272, label: "Agente SDR · co-developed · my parts only" },
        ],
        nodes: [
          {
            id: "api",
            label: "Núcleo API",
            sub: "Express on Vercel",
            x: 290,
            y: 40,
            tone: "core",
            mine: true,
            detail:
              "The Express API moved to Vercel without rewriting routes: a catch-all function serves createApp(). Mercado Pago notifications are verified here by HMAC-SHA256 over the id, request-id and ts manifest.",
          },
          {
            id: "domain",
            label: "Domain writes",
            sub: "emit(tx) · one transaction",
            x: 510,
            y: 40,
            tone: "core",
            mine: true,
            detail:
              "contract.signed, payment.paid and payment.expired are emitted inside the same Prisma transaction as the state change, with an idempotencyKey built from a domain id; a duplicate key is ignored.",
          },
          {
            id: "outbox",
            label: "Outbox",
            sub: "OutboxEvent · Postgres",
            x: 510,
            y: 130,
            tone: "data",
            mine: true,
            detail:
              "OutboxEvent rows on Supabase Postgres move PENDING → PROCESSING → DONE. A failure returns the row to PENDING with a later availableAt, the fifth marks it DEAD, and a reaper recovers rows orphaned by a crash.",
          },
          {
            id: "cron",
            label: "pg_cron",
            sub: "runbook · pg_net",
            x: 70,
            y: 220,
            tone: "job",
            mine: true,
            detail:
              "The CRON.md runbook has Supabase pg_cron post through pg_net to /api/cron/tick every minute, every five minutes and once a day. It exists as runbook SQL; nothing in the repo records it as applied.",
          },
          {
            id: "tick",
            label: "Worker",
            sub: "/api/cron/tick",
            x: 290,
            y: 220,
            tone: "service",
            mine: true,
            detail:
              "Secret-protected (timingSafeEqual, and a 404 without CRON_SECRET). It requeues rows held in PROCESSING for more than five minutes and claims up to 20 due events with FOR UPDATE SKIP LOCKED.",
          },
          {
            id: "engine",
            label: "Automation engine",
            sub: "trigger · conditions · steps",
            x: 730,
            y: 220,
            tone: "service",
            mine: true,
            detail:
              "Automations read as sentences: one trigger, AND/OR conditions, ordered steps. One run per automation and event, finished steps skipped on any re-run, and a dry-run that executes steps without sending, charging or writing.",
          },
          {
            id: "mp",
            label: "Mercado Pago",
            sub: "PIX · boleto · HMAC",
            x: 950,
            y: 40,
            tone: "external",
            detail:
              "PIX and boleto charges. A five-minute job polls up to 50 pending charges past the webhook window; the code notes that the webhook's signed field names still need confirming against the sandbox.",
          },
          {
            id: "notify",
            label: "Email · WhatsApp",
            sub: "Cloud API · Evolution",
            x: 950,
            y: 220,
            tone: "external",
            detail: "Two of the engine's 14 action types: email, and WhatsApp through the Meta Cloud API or Evolution API.",
          },
          {
            id: "cf",
            label: "CadenceFlow",
            sub: "owns the Meta webhook",
            x: 70,
            y: 330,
            tone: "external",
            detail: "Relays WhatsApp messages to Agente SDR with an internal token.",
          },
          {
            id: "ingress",
            label: "WhatsApp ingress",
            sub: "token · 60 s dedup",
            x: 290,
            y: 330,
            tone: "core",
            mine: true,
            detail:
              "Compares SHA-256 digests of the internal token in constant time, drops an identical message from the same conversation within 60 s, answers 200 and hands the message to the conversation engine.",
          },
          {
            id: "convo",
            label: "Conversation engine",
            sub: "per conversation",
            x: 510,
            y: 330,
            tone: "service",
            detail:
              "Serializes work per conversation. The original conversation and AI engines are the other engineer's, as are the triager and campaigns.",
          },
          {
            id: "router",
            label: "Outbound router",
            sub: "sendLeadText · classified",
            x: 730,
            y: 330,
            tone: "service",
            mine: true,
            detail:
              "About nine copies of the send logic became sendLeadText: it picks Chatwoot or CadenceFlow and returns success or a classified error with a retryable flag. sendLeadTemplate sends approved templates through CadenceFlow, pinned to the official number.",
          },
          {
            id: "contract",
            label: "Event contract",
            sub: "8 types · 4 to the CRM",
            x: 730,
            y: 420,
            tone: "core",
            mine: true,
            detail:
              "One conversation-event contract with eight types; deal_created, meeting_scheduled, handed_off and not_interested go to the client's CRM mirror webhook for email and LinkedIn. WhatsApp keeps the engine's inline sync to avoid duplicates.",
          },
          {
            id: "send",
            label: "Send channels",
            sub: "Chatwoot · CadenceFlow",
            x: 950,
            y: 330,
            tone: "external",
            detail: "Chatwoot keeps precedence, so tenants already on Chatwoot stay on the same channel.",
          },
          {
            id: "crm",
            label: "Client CRM",
            sub: "mirror webhook",
            x: 950,
            y: 420,
            tone: "external",
            detail: "The client's CRM mirror webhook. Its delivery and retry cron are the other engineer's work.",
          },
        ],
        edges: [
          { from: "api", to: "domain", style: "sync" },
          { from: "domain", to: "outbox", style: "sync" },
          { from: "cron", to: "tick", style: "async", label: "pg_net" },
          { from: "tick", to: "outbox", style: "sync", label: "claim" },
          { from: "tick", to: "engine", style: "sync" },
          { from: "engine", to: "mp", style: "external", label: "PIX charge" },
          { from: "engine", to: "notify", style: "external" },
          { from: "mp", to: "api", style: "external", label: "signed webhook", arc: true },
          { from: "cf", to: "ingress", style: "external" },
          { from: "ingress", to: "convo", style: "async" },
          { from: "convo", to: "router", style: "sync" },
          { from: "router", to: "send", style: "external" },
          { from: "convo", to: "contract", style: "sync" },
          { from: "contract", to: "crm", style: "external" },
        ],
        steps: [
          [
            { from: "api", to: "domain" },
            { from: "domain", to: "outbox" },
          ],
          [
            { from: "cron", to: "tick" },
            { from: "tick", to: "outbox" },
          ],
          [{ from: "tick", to: "engine" }],
          [
            { from: "engine", to: "mp" },
            { from: "engine", to: "notify" },
          ],
          [
            { from: "engine", to: "tick" },
            { from: "tick", to: "outbox" },
          ],
          [{ from: "mp", to: "api" }, { from: "api", to: "domain" }, { from: "domain", to: "outbox" }, { from: "tick" }],
        ],
      },
    },
    decisions: [
      {
        title: "A Postgres outbox instead of a broker",
        where: "Núcleo",
        detail:
          "Events are written in the same transaction as the state change and claimed with FOR UPDATE SKIP LOCKED. A crash cannot commit 'contract signed' without the event that triggers the charge, and overlapping invocations never claim the same row. The code defers BullMQ or SQS until volume requires it.",
      },
      {
        title: "Idempotency per event and per step",
        where: "Núcleo",
        detail:
          "A unique (automationId, outboxEventId) turns run creation into an upsert, and steps already marked SUCCESS or SKIPPED are skipped on replay. That made it safe for the engine to rethrow failures into backoff and the dead-letter state.",
      },
      {
        title: "An external clock for serverless",
        where: "Núcleo",
        detail:
          "On Vercel a setInterval dies with the response, so the runbook has Supabase pg_cron call /api/cron/tick through pg_net. The secret is compared with timingSafeEqual, and without CRON_SECRET configured the route answers 404 rather than run open.",
      },
      {
        title: "Authenticate, deduplicate, then answer",
        where: "Agente SDR",
        detail:
          "The ingress compares SHA-256 digests of the internal token in constant time. It drops an identical message from the same conversation within 60 s, returns 200 and processes in the background. Its documented ceiling: the same text sent twice inside 60 s is dropped; the upgrade is a unique provider message id.",
      },
      {
        title: "One outbound router with explicit results",
        where: "Agente SDR",
        detail:
          "About nine copies of the send logic became sendLeadText. It returns success or a classified error with a retryable flag instead of skipping in silence. Chatwoot keeps precedence, so tenants already on Chatwoot stay on the same channel.",
      },
    ],
    challenges: [
      {
        title: "Retries that resent, failures marked done",
        where: "Núcleo",
        detail:
          "Each reprocess created a new run, so the step check found nothing and email and WhatsApp went out again. Meanwhile the engine swallowed step errors and the worker marked the event DONE. A unique (automationId, outboxEventId), upserted runs and a rethrow fixed both. engine.check.ts asserts the contract on a replica of the step loop.",
      },
      {
        title: "A 60-second function ceiling",
        where: "Núcleo",
        detail:
          "The daily sweep covered every organization in one request and could be killed mid-run, leaving the month's charges unbilled. The daily scans now share a 45 s budget, stop starting new work when it runs out and report truncado. Monthly charges are selected as due or overdue with a once-a-month guard, so a charge cut off by the budget goes out on a later run, and only once. Exact-date scans cut off by the budget are not resumed.",
      },
      {
        title: "Telling a refusal from an outage",
        where: "Agente SDR",
        detail:
          "The revive cron, created by the other engineer, resent the same text every five minutes for up to 24 hours, even to leads who had opted out. The cause: CadenceFlow's refusal codes only reached a log line. They now map to local actions: close the conversation and record the opt-out, or flag the number. Definitive refusals stop retries, and a 20 s timeout is recorded as unconfirmed rather than failed.",
      },
      {
        title: "Handoffs nobody was told about",
        where: "Agente SDR",
        detail:
          "Conversations stayed HANDED_OFF after a person replied, and the only signal was a counter on a screen. The fix: a handoffAt column with a backfill migration (marked in the repo as not yet applied) and a wait clock built from the last lead and human messages, feeding a cron route documented for weekdays at 9:00. Past a 4-hour SLA it sends the account owner a WhatsApp alert, or logs the queue when the tenant has no notification channel.",
      },
    ],
    implementation: [
      "Núcleo event bus: emit(tx) writes OutboxEvent rows inside Prisma transactions, and the worker claims 20 at a time with UPDATE ... WHERE id IN (SELECT ... FOR UPDATE SKIP LOCKED) RETURNING. A reaper requeues rows held in PROCESSING for more than five minutes.",
      "Núcleo automation engine: a catalog of 22 events (17 with a live producer; the rest are shown as unavailable) and 14 action types, among them email, WhatsApp (Meta Cloud API or Evolution API), PIX and boleto via Mercado Pago, NFS-e, tasks, projects and an outbound webhook with a 10 s timeout. The scheduler skips any recurring automation with a charge step that would fan out over more than 50 contracts, and the preview flags it.",
      "Núcleo on serverless: the Express API moved to Vercel without rewriting routes. A catch-all function serves createApp(), and the four in-process jobs became tick, reconcile and daily sets behind /api/cron/tick. The runbook checks net._http_response rather than cron status alone.",
      "Núcleo payments: Mercado Pago notifications are verified by HMAC-SHA256 over the id, request-id and ts manifest (the code notes its field names still need confirming against the sandbox). markPaid transitions once under concurrent deliveries and emits payment.paid in the same transaction, and a five-minute job polls the gateway for up to 50 pending charges past the webhook window.",
      "Agente SDR, my parts: the CadenceFlow WhatsApp ingress, the outbound router (sendLeadText, plus sendLeadTemplate for approved templates outside the 24-hour window), the conversation event contract, the handoff SLA queue, and a single-run lock now used by five crontab-driven cron routes.",
      "1 Call Closers (2025, CV only): designed and implemented n8n, Zapier and Make integrations over REST APIs for sales, scheduling and operational metrics reporting.",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "Express",
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Supabase pg_cron · pg_net",
      "Vercel Functions",
      "REST APIs",
      "Webhooks",
      "WhatsApp Cloud API",
      "Evolution API",
      "Mercado Pago",
      "Chatwoot",
      "n8n",
      "Zapier",
      "Make",
      "Zod",
      "GitHub Actions",
    ],
    results: [
      "Núcleo live at nucleoaut.vercel.app.",
      "Agente SDR in production at sdr.cadenceflow.pro (co-developed).",
      "29 versioned SQL migrations in Núcleo, including run idempotency and indexes for the periodic jobs.",
      "36 node:assert self-check files in the Núcleo monorepo, run by npm run check in a GitHub Actions workflow on push; engine.check.ts asserts the idempotency contract.",
      "Test files I wrote in Agente SDR for the outbound router, transport error classification, cron lock and handoff queue, run by npm test (tsx --test).",
    ],
    readouts: [
      { k: "outbox claim", v: "SKIP LOCKED · 20 per batch" },
      { k: "retries", v: "30 s doubling, 1 h cap · DEAD at 5" },
      { k: "clock", v: "pg_cron → /api/cron/tick · 45 s daily budget" },
      { k: "ingress", v: "token check · 60 s dedup · 200, then async" },
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export type ArchiveEntry = {
  title: string;
  kind: string;
  text: string;
  stack: string;
  year?: string;
  links: ProjectLink[];
  note?: string;
};

export const archive: ArchiveEntry[] = [
  {
    title: "Noivar",
    kind: "SaaS product · solo",
    text: "Wedding websites with Pix gifts that go 100% to the couple, and a site drafted by AI from the couple's brief. Publishing is gated by a Postgres trigger until payment is confirmed; row-level security isolates each couple.",
    stack: "Next.js 16 · Supabase · PostgreSQL · Claude API · Mercado Pago · Vitest",
    links: [
      { label: "noivar.vercel.app", href: "https://noivar.vercel.app" },
      {
        label: "Code · early prototype",
        href: "https://github.com/PedroTortoriello/wedding-invitations-saas",
      },
    ],
  },
  {
    title: "Sócrates",
    kind: "Conversational diagnosis",
    text: "Assistant for Espaço Maiêutica: eight questions as a conversation, hints along the way and a bundle of solutions with a 7-day plan. A deterministic rules engine, no generative AI, and tests that check every on-screen text against the client's document.",
    stack: "Vite · React 19 · TypeScript · Postgres · Playwright",
    links: [{ label: "Web", href: "https://socrates-espaco-maieutica.vercel.app" }],
  },
  {
    title: "Entrelinhas",
    kind: "An exam as a game",
    text: "Final exam for a strategic management course at Fatec Indaiatuba: 24 items in 4 blocks, a time limit enforced on the server and an answer key that never reaches the browser (the build fails if it does). Teacher panel with the class list, extra time and CSV export.",
    stack: "Vite · React 19 · TypeScript · Vercel Functions · Postgres",
    links: [{ label: "Web", href: "https://entrelinhas-avaliacao.vercel.app" }],
  },
  {
    title: "My Grace Journey",
    kind: "Cross-platform app",
    text: "A devotional app with an AI mentor: iOS, Android and web from one codebase, plan limits enforced on the server and idempotent payment webhooks.",
    stack: "React Native · Expo · Supabase Edge Functions · Gemini · Stripe · Asaas",
    links: [
      { label: "Web", href: "https://mygracejourney.vercel.app" },
      {
        label: "Code",
        href: "https://github.com/PedroTortoriello/my-grace-journey",
      },
    ],
  },
  {
    title: "Case Sistema",
    kind: "Multi-company back office",
    text: "A back office for foreign trade with separate finance and operations domains, role-based access, an audit trail and NFS-e invoicing against Brazil's national sandbox.",
    stack: "Next.js 16 · Node.js · Supabase · PostgreSQL",
    links: [
      {
        label: "Code",
        href: "https://github.com/PedroTortoriello/case-sistema",
      },
    ],
  },
  {
    title: "OneContabil",
    kind: "Vertical SaaS",
    text: "A system for accounting firms: each client is registered by company tax ID alone and sends documents through a unique link, with no login.",
    stack: "Next.js 15 · Prisma · PostgreSQL · next-safe-action",
    links: [{ label: "onecontabil.online", href: "https://onecontabil.online" }],
  },
  {
    title: "JobHunter AI",
    kind: "AI pipeline",
    text: "Collects job posts through connectors behind one interface (LinkedIn and Indeed only with official credentials), deduplicates on three keys guaranteed by the database, computes a deterministic match and guards the AI against prompt injection.",
    stack: "Next.js 16 · Prisma · Anthropic SDK · Zod · Docker",
    links: [],
    note: "Private code",
  },
  {
    title: "SpeakerMatch",
    kind: "B2B marketplace",
    text: "A marketplace for corporate speakers with areas for companies, speakers and admins, and real-time messaging.",
    stack: "Next.js 16 · Supabase Realtime · Tailwind CSS v4",
    links: [
      {
        label: "Code",
        href: "https://github.com/PedroTortoriello/speakermatch",
      },
    ],
  },
  {
    title: "Virei chefe na logística",
    kind: "PWA · training",
    text: "The assessment game for a leadership training course: works offline and resumes the session exactly where it left off, with an instructor panel, a projector-mode QR code and a certificate drawn on Canvas.",
    stack: "Vite · React 19 · TypeScript · Vercel Functions · Postgres",
    links: [{ label: "Web", href: "https://chefe-na-logistica.vercel.app" }],
  },
  {
    title: "Synfau",
    kind: "Subscription platform",
    text: "A digital atlas of animal anatomy with a catalogue by animal and body system, Stripe subscription checkout with a webhook and a subscriber area.",
    stack: "Vite · React · TypeScript · Supabase · Stripe",
    links: [{ label: "synfau.com", href: "https://synfau.com" }],
  },
  {
    title: "SaudeFácil Municipal",
    kind: "Pilot · public health",
    text: "A citizen app, REST API and admin panel for a municipal public health network, at pilot stage.",
    stack: "Expo · Express · Prisma · Vite + React",
    links: [{ label: "Web", href: "https://saudefacil-municipal-web.vercel.app" }],
  },
];

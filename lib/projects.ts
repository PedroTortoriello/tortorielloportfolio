// Engineering cases. Every statement was checked against the project's own
// repository; co-authored work is labelled as such.

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
  bend?: number;
};

export type Graph = {
  width: number;
  height: number;
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export type ProjectLink = { label: string; href: string; kind: "live" | "code" };

export type Project = {
  slug: string;
  index: string;
  title: string;
  kind: string;
  role: string;
  year: string;
  tagline: string;
  problem: string;
  solution: string;
  contribution: string[];
  stack: string[];
  links: ProjectLink[];
  note?: string;
};

export const cadenceflow: Project & { graph: Graph } = {
  slug: "cadenceflow",
  index: "01",
  title: "CadenceFlow",
  kind: "Plataforma SaaS B2B",
  role: "Co-desenvolvedor full stack",
  year: "2026",
  tagline: "Prospecção B2B multicanal com qualificação por IA, em produção.",
  problem:
    "Times comerciais B2B precisam montar listas, qualificar e abordar leads por e-mail, WhatsApp e LinkedIn sem queimar domínios, números e perfis, e sem espalhar o processo por ferramentas desconectadas.",
  solution:
    "Uma plataforma multi-tenant que reúne geração de leads, qualificação com scraping e LLM, cadências multicanal com limites por conta, inbox de respostas e cobrança por plano. O app roda em três instâncias atrás do Nginx; o trabalho assíncrono roda em rotas de cron e em filas no próprio Postgres.",
  contribution: [
    "Criei o módulo LinkedIn: uma fila (outbox) única por conta e um motor de segurança que deriva o teto semanal de convites da taxa de aceite.",
    "Integrei o WhatsApp Oficial (Meta Cloud API) com prova de origem no webhook de entrada, para impedir respostas de lead forjadas.",
    "Desenvolvi assentos de equipe com permissões por papel consultadas no banco a cada rota sensível, para que a revogação valha na hora.",
    "Separei abertura humana de varredura de scanners (Safe Links, Proofpoint, Apple MPP) no rastreio de e-mail e extraí o motivo real de cada bounce do DSN.",
    "Coloquei rollback do build em segundos e um portão de saúde no staging.",
  ],
  note: "Produto feito em dupla: ele foi iniciado por outro engenheiro da agência, e eu entrei como co-desenvolvedor em junho de 2026.",
  stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Nginx · PM2", "Meta Cloud API", "Stripe · Asaas", "LLMs"],
  links: [{ label: "cadenceflow.pro", href: "https://cadenceflow.pro", kind: "live" }],
  graph: {
    width: 1000,
    height: 420,
    nodes: [
      { id: "web", label: "Web app", sub: "React 19", x: 70, y: 100, tone: "client", detail: "Interface do produto servida pelo próprio Next.js." },
      { id: "nginx", label: "Nginx", sub: "least_conn · failover", x: 245, y: 100, tone: "core", detail: "Proxy reverso que distribui entre três instâncias e faz failover." },
      { id: "app", label: "Next.js ×3", sub: "UI + rotas de API", x: 440, y: 100, w: 150, tone: "core", detail: "Monolito Next.js 16 em três processos PM2." },
      { id: "cron", label: "Crontab", sub: "/api/cron/*", x: 245, y: 300, tone: "job", detail: "O crontab do servidor chama as rotas de cron com segredo comparado em tempo constante." },
      { id: "db", label: "PostgreSQL", sub: "Prisma · filas no banco", x: 440, y: 300, w: 150, tone: "data", detail: "Banco compartilhado; tabelas como LinkedInOutbox funcionam como fila." },
      { id: "cadence", label: "Cadências", sub: "passos por dia", x: 640, y: 50, tone: "service", detail: "Executor de cadências com orçamento diário por caixa e parada ao responder." },
      { id: "linkedin", label: "Outbox LinkedIn", sub: "cota · janela · breaker", x: 640, y: 175, w: 158, tone: "service", mine: true, detail: "Fila única por conta. O teto semanal é uma função pura da taxa de aceite." },
      { id: "qualifier", label: "Qualificador", sub: "scraping + LLM", x: 640, y: 300, tone: "service", detail: "Geração e qualificação de leads com Puppeteer e LLM." },
      { id: "email", label: "SMTP · IMAP", sub: "envio · DSN", x: 860, y: 40, tone: "external", detail: "Envio por Nodemailer e sincronização de respostas por IMAP. Minha parte: o rastreio que separa abertura humana de scanner e o motivo do bounce lido do DSN." },
      { id: "whatsapp", label: "WhatsApp", sub: "Meta Cloud API", x: 860, y: 140, tone: "external", mine: true, detail: "Webhook de entrada com assinatura X-Hub-Signature-256 conferida." },
      { id: "unipile", label: "Unipile", sub: "LinkedIn", x: 860, y: 240, tone: "external", detail: "Provedor do LinkedIn; só o despachante do outbox fala com ele." },
      { id: "llm", label: "LLMs", sub: "Gemini · OpenAI · Claude", x: 860, y: 340, tone: "external", detail: "Qualificação, resumos e personalização, com créditos de IA por plano." },
    ],
    edges: [
      { from: "web", to: "nginx", style: "sync", label: "HTTPS" },
      { from: "nginx", to: "app", style: "sync" },
      { from: "app", to: "db", style: "sync", label: "Prisma" },
      { from: "cron", to: "app", style: "async", label: "CRON_SECRET" },
      { from: "app", to: "cadence", style: "async" },
      { from: "app", to: "qualifier", style: "async" },
      { from: "cadence", to: "linkedin", style: "async", label: "enfileira" },
      { from: "linkedin", to: "db", style: "async" },
      { from: "cadence", to: "email", style: "external" },
      { from: "cadence", to: "whatsapp", style: "external" },
      { from: "linkedin", to: "unipile", style: "external" },
      { from: "qualifier", to: "llm", style: "external" },
    ],
  },
};

export const noivar: Project = {
  slug: "noivar",
  index: "02",
  title: "Noivar",
  kind: "Produto SaaS",
  role: "Produto completo · solo",
  year: "2026",
  tagline: "Sites de casamento com presentes via Pix, e um site montado por IA a partir do briefing do casal.",
  problem:
    "Casais querem um site bonito para a data, a confirmação de presença e os presentes, num link só. As alternativas têm cara de template ou ficam com parte do dinheiro dos presentes.",
  solution:
    "Uma plataforma Next.js 16 com Supabase: o casal escolhe um modelo editorial, edita o conteúdo e paga uma taxa única para publicar. O site é renderizado no servidor pelo slug, e os presentes em Pix vão 100% para a chave do próprio casal.",
  contribution: [
    "Escrevi o gerador Pix BR Code/EMV sem biblioteca: campos TLV, GUI br.gov.bcb.pix, moeda 986, txid e CRC16-CCITT, testado contra uma implementação de referência.",
    "Levei a regra “só publica depois de pagar” para o banco: um trigger no Postgres e RLS isolando cada casal, em 18 migrations versionadas.",
    "Criei o site feito pela IA: o Claude recebe o briefing e até 12 fotos e devolve um rascunho tipado via JSON Schema, com limite de uso por casamento e por rede.",
    "Integrei a taxa de publicação pela AbacatePay, com webhook verificado em tempo constante, e os presentes no cartão pelo Mercado Pago do próprio casal via OAuth, com tokens cifrados em AES-256-GCM.",
  ],
  stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL · RLS", "Claude API", "Mercado Pago", "Vitest", "Vercel"],
  links: [
    { label: "noivar.vercel.app", href: "https://noivar.vercel.app", kind: "live" },
    { label: "Código · protótipo inicial", href: "https://github.com/PedroFTortoriello/wedding-invitations-saas", kind: "code" },
  ],
};

export const nucleo: Project = {
  slug: "nucleo",
  index: "03",
  title: "Núcleo",
  kind: "Plataforma & API",
  role: "Projeto próprio · arquitetura e desenvolvimento",
  year: "2026",
  tagline: "Proposta, contrato, assinatura, cobrança e projeto num só fluxo, movido a eventos.",
  problem:
    "Em empresas de serviço pequenas, o dono faz a ponte manual entre planilha, WhatsApp, gateway de pagamento e contador. O contrato assinado não vira cobrança sozinho, e cada etapa vive numa ferramenta diferente.",
  solution:
    "Uma plataforma multi-tenant em que cada mudança de estado publica um evento: a proposta aceita gera o contrato, a assinatura por link com OTP dispara a cobrança PIX/boleto, e automações “quando X, faça Y” mandam e-mail e WhatsApp e criam tarefas.",
  contribution: [
    "Desenhei o monorepo: API Express em camadas Repository → Service → Controller, SPA React por feature e um pacote de contratos Zod compartilhado entre API e front.",
    "Construí o motor de automações sobre um outbox transacional: claim com FOR UPDATE SKIP LOCKED, backoff exponencial, DLQ após cinco tentativas e idempotência por evento e por passo.",
    "Adaptei a API para serverless: os setInterval deram lugar a /api/cron/tick, chamado pelo pg_cron do Supabase, com orçamento de tempo dentro do limite da função.",
    "Implementei refresh token opaco e rotacionado (reuso revoga todas as sessões), RBAC com cinco papéis e gate de plano calculado no servidor.",
  ],
  stack: ["TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "Zod", "React + Vite", "Mercado Pago", "GitHub Actions", "Vercel"],
  links: [{ label: "nucleoaut.vercel.app", href: "https://nucleoaut.vercel.app", kind: "live" }],
};

export const sdr: Project & { graph: Graph } = {
  slug: "agente-sdr",
  index: "04",
  title: "Agente SDR",
  kind: "Automação com IA",
  role: "Co-desenvolvedor",
  year: "2026",
  tagline: "Um agente de IA que atende leads por WhatsApp, e-mail e LinkedIn, qualifica, marca reunião e chama um humano na hora certa.",
  problem:
    "As cadências geram respostas em vários canais, e cada uma precisa ser atendida na hora: qualificar, propor horário, registrar no CRM e chamar um humano quando for o caso. Contas novas da Cloud API da Meta não tinham porta de entrada.",
  solution:
    "Webhooks autenticados recebem as mensagens; um motor de conversa resolve o tenant e o agente e roda um loop de tools no LLM: agendar reunião, transferir, atualizar o CRM e agendar follow-up. Um roteador único decide o canal de saída.",
  contribution: [
    "Criei a porta de entrada do WhatsApp Oficial: token comparado em tempo constante, dedup de reentrega e resposta 200 imediata com processamento em segundo plano.",
    "Troquei cerca de nove blocos de envio duplicados por um roteador único de saída, que escolhe o transporte e usa template fora da janela de 24h.",
    "Implementei os canais de e-mail e LinkedIn reaproveitando o motor de IA, com detector conservador de antispam e modo de aprovação manual.",
    "Defini o contrato único de eventos de conversa e a fila de handoff com SLA, para nenhuma conversa ficar esquecida com um humano.",
  ],
  note: "Produto feito em dupla: a base em produção e a maior parte do código (motor de conversa original, motor de IA, triador, campanhas e deploy) são de outro engenheiro. Minha parte está listada acima.",
  stack: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "OpenAI · Anthropic", "Google Calendar API", "WhatsApp Cloud API", "node:test", "Nginx · PM2"],
  links: [{ label: "sdr.cadenceflow.pro", href: "https://sdr.cadenceflow.pro", kind: "live" }],
  graph: {
    width: 1000,
    height: 380,
    nodes: [
      { id: "lead", label: "Lead responde", sub: "WhatsApp · e-mail · LinkedIn", x: 84, y: 190, w: 164, tone: "client", detail: "A resposta chega pelo canal em que a cadência abordou o lead." },
      { id: "ingress", label: "Webhook de entrada", sub: "token · dedup 60s", x: 270, y: 190, w: 150, tone: "core", mine: true, detail: "Responde 200 na hora e processa em segundo plano." },
      { id: "engine", label: "Motor de conversa", sub: "tenant · agente · cota", x: 470, y: 190, w: 150, tone: "core", detail: "Serializa por conversa e escolhe o agente: cadência, triador ou padrão." },
      { id: "llm", label: "LLM + tools", sub: "OpenAI · Anthropic", x: 470, y: 60, w: 150, tone: "external", detail: "Loop de tools: o modelo decide qual ação executar." },
      { id: "calendar", label: "schedule_meeting", sub: "Google Calendar", x: 700, y: 40, w: 150, tone: "external", detail: "Agenda com checagem de conflito e feriado." },
      { id: "crm", label: "Eventos → CRM", sub: "contrato de eventos", x: 700, y: 135, w: 150, tone: "service", mine: true, detail: "Contrato único de eventos (lead_replied, qualified, meeting_scheduled, handed_off) traduzido para o webhook espelho do CRM do cliente." },
      { id: "handoff", label: "handoff", sub: "fila com SLA", x: 700, y: 230, w: 150, tone: "service", mine: true, detail: "O relógio zera quando um humano responde; um cron alerta atrasos." },
      { id: "cron", label: "Crons", sub: "follow-up · trava única", x: 470, y: 320, w: 150, tone: "job", detail: "Crons do produto: follow-ups, campanhas e qualificação. Minha parte: a trava de execução única e o alerta de handoff." },
      { id: "router", label: "Roteador de saída", sub: "janela 24h · template", x: 900, y: 190, w: 150, tone: "core", mine: true, detail: "Um único ponto de envio escolhe Chatwoot ou CadenceFlow." },
    ],
    edges: [
      { from: "lead", to: "ingress", style: "external" },
      { from: "ingress", to: "engine", style: "async" },
      { from: "engine", to: "llm", style: "sync", label: "chat + tools" },
      { from: "llm", to: "calendar", style: "external" },
      { from: "engine", to: "crm", style: "sync" },
      { from: "llm", to: "handoff", style: "sync" },
      { from: "cron", to: "engine", style: "async" },
      { from: "engine", to: "router", style: "sync", label: "resposta" },
    ],
  },
};

export const featured = [cadenceflow, noivar, nucleo, sdr] as const;

export type IndexEntry = {
  title: string;
  kind: string;
  text: string;
  stack: string;
  links: ProjectLink[];
  note?: string;
};

export const moreProjects: IndexEntry[] = [
  {
    title: "My Grace Journey",
    kind: "App multiplataforma",
    text: "App devocional com mentor de IA: iOS, Android e web a partir de um código-base, limites por plano aplicados no servidor e webhooks de pagamento idempotentes.",
    stack: "React Native · Expo · Supabase Edge Functions · Gemini · Stripe · Asaas",
    links: [
      { label: "Web", href: "https://mygracejourney.vercel.app", kind: "live" },
      { label: "Código", href: "https://github.com/PedroFTortoriello/my-grace-journey", kind: "code" },
    ],
  },
  {
    title: "Case Sistema",
    kind: "Backoffice multiempresa",
    text: "Backoffice para comércio exterior com domínios Financeiro e Operacional separados, RBAC, trilha de auditoria e NFS-e no ambiente nacional de homologação.",
    stack: "Next.js 16 · Node.js · Supabase · PostgreSQL",
    links: [{ label: "Código", href: "https://github.com/PedroFTortoriello/case-sistema", kind: "code" }],
  },
  {
    title: "OneContabil",
    kind: "SaaS vertical",
    text: "Sistema para escritórios contábeis: o cliente é cadastrado só pelo CNPJ e envia documentos por um link único, sem precisar de login.",
    stack: "Next.js 15 · Prisma · PostgreSQL · next-safe-action",
    links: [{ label: "onecontabil.online", href: "https://onecontabil.online", kind: "live" }],
  },
  {
    title: "JobHunter AI",
    kind: "Pipeline com IA",
    text: "Coleta vagas por conectores com interface comum (LinkedIn e Indeed só com credencial oficial), deduplica em três chaves com garantia no banco, calcula um match determinístico e protege a IA contra prompt injection.",
    stack: "Next.js 16 · Prisma · Anthropic SDK · Zod · Docker",
    links: [],
    note: "Código privado",
  },
  {
    title: "SpeakerMatch",
    kind: "Marketplace B2B",
    text: "Marketplace de palestrantes corporativos com áreas para empresa, palestrante e admin, e mensagens em tempo real.",
    stack: "Next.js 16 · Supabase Realtime · Tailwind CSS v4",
    links: [{ label: "Código", href: "https://github.com/PedroFTortoriello/speakermatch", kind: "code" }],
  },
  {
    title: "OrionLeads",
    kind: "SaaS · coautoria",
    text: "Prospecção B2B: desenvolvi a cobrança por assinatura, o motor de campanhas por e-mail e WhatsApp e as automações agendadas de captação.",
    stack: "Next.js · TypeScript · Prisma · PostgreSQL",
    links: [{ label: "orion-leads.vercel.app", href: "https://orion-leads.vercel.app/login", kind: "live" }],
  },
  {
    title: "Virei chefe na logística",
    kind: "PWA · treinamento",
    text: "Jogo de avaliação de um treinamento de liderança: funciona offline e retoma a sessão no ponto exato, com painel do instrutor, QR Code em modo projeção e certificado desenhado em Canvas.",
    stack: "Vite · React 19 · TypeScript · Vercel Functions · Postgres",
    links: [{ label: "Web", href: "https://chefe-na-logistica.vercel.app", kind: "live" }],
  },
  {
    title: "Synfau",
    kind: "Plataforma por assinatura",
    text: "Atlas digital de anatomia animal com catálogo por animal e sistema, checkout de assinatura via Stripe com webhook e área do assinante.",
    stack: "Vite · React · TypeScript · Supabase · Stripe",
    links: [{ label: "synfau.com", href: "https://synfau.com", kind: "live" }],
  },
  {
    title: "SaudeFácil Municipal",
    kind: "Piloto · saúde pública",
    text: "App do cidadão, API REST e painel administrativo para a rede pública de saúde, em estágio de piloto.",
    stack: "Expo · Express · Prisma · Vite + React",
    links: [{ label: "Web", href: "https://saudefacil-municipal-web.vercel.app", kind: "live" }],
  },
];

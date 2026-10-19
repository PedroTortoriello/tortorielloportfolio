// Everything on the page comes from Pedro's CV or from the project repositories.
// Nothing here is a metric or claim that cannot be traced back to one of them.

export const profile = {
  name: "Pedro Tortoriello",
  fullName: "Pedro Gabriel de Freitas Tortoriello",
  initials: "PT",
  role: "Software Engineer",
  focus: "Full Stack Development & Automation",
  location: "Salto, SP · Brasil",
  availability: "Disponível para atuação 100% remota",
  since: 2021,
  email: "pedrooofreitas@gmail.com",
  linkedin: "https://www.linkedin.com/in/pedro-tortoriello/",
  github: "https://github.com/PedroFTortoriello",
  githubHandle: "PedroFTortoriello",
  whatsapp: "https://wa.me/5511942716215",
  whatsappLabel: "+55 11 94271-6215",
  cv: "/cv-pedro-tortoriello.pdf",
  headline: ["Engenharia de software.", "Sistemas que resolvem problemas reais."],
  description:
    "Desenvolvo aplicações web, APIs e automações que conectam tecnologia, processos e resultados.",
} as const;

export const nav = [
  { id: "projetos", href: "/#projetos", label: "Projetos" },
  { id: "jornada", href: "/#jornada", label: "Jornada" },
  { id: "stack", href: "/#stack", label: "Stack" },
  { id: "metodo", href: "/#metodo", label: "Método" },
  { id: "landing-pages", href: "/#landing-pages", label: "LPs" },
  { id: "contato", href: "/#contato", label: "Contato" },
] as const;

export const specialties = [
  {
    icon: "layers",
    title: "Full Stack Development",
    note: "Interface, API e banco no mesmo raciocínio",
  },
  {
    icon: "plug",
    title: "APIs & Integrations",
    note: "Contratos, webhooks e serviços de terceiros",
  },
  {
    icon: "workflow",
    title: "Automation Engineering",
    note: "Workers, crons, filas e agentes de IA",
  },
  {
    icon: "boxes",
    title: "SaaS Development",
    note: "Multi-tenant, planos, cobrança e permissões",
  },
] as const;

// Hero terminal: a short, honest session. It types; it does not execute anything.
export const terminalScript = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "Pedro Tortoriello — Software Engineer" },
  { kind: "cmd", text: "cat focus.json" },
  { kind: "json", text: "{" },
  { kind: "json", text: '  "role": "Full Stack Development & Automation",' },
  { kind: "json", text: '  "stack": ["TypeScript", "React", "Next.js", "Node.js"],' },
  { kind: "json", text: '  "builds": ["SaaS", "APIs", "integrações", "automações"],' },
  { kind: "json", text: '  "since": 2021' },
  { kind: "json", text: "}" },
] as const;

export type Experience = {
  id: string;
  lane: "products" | "company";
  period: string;
  company: string;
  role: string;
  place: string;
  summary: string;
  details: string[];
  systems: string[];
  tech: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    id: "freelance",
    lane: "products",
    period: "2021 — atual",
    company: "Freelance e produtos próprios",
    role: "Desenvolvedor Full Stack",
    place: "Autônomo · Remoto",
    current: true,
    summary:
      "Aplicações web sob demanda para clientes e produtos próprios, do levantamento de requisitos e do desenho da arquitetura até a publicação, a documentação e o suporte pós-entrega.",
    details: [
      "Produtos próprios em React, Next.js e TypeScript: backoffice e SaaS com controle de acesso por perfil na interface e na API, pagamentos (Pix, Stripe) e IA aplicada.",
      "Biblioteca de componentes compartilhados em React e TypeScript (Tailwind CSS e Radix UI), reutilizada entre os produtos para padronizar a interface.",
      "Testes automatizados dos fluxos críticos com Jest e React Testing Library (unidade e componentes) e Cypress (ponta a ponta).",
      "Código e documentação técnica no GitHub, com escopo, estágio de maturidade e limitações de cada sistema descritos de forma explícita.",
    ],
    systems: ["SaaS multi-tenant", "Backoffice", "Pagamentos", "IA aplicada"],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "Jest", "Cypress"],
  },
  {
    id: "addon",
    lane: "company",
    period: "set/2025 — fev/2026",
    company: "Addon Software",
    role: "Desenvolvedor de Software",
    place: "Remoto · Brasil",
    summary:
      "Funcionalidades end-to-end da plataforma com TypeScript, Node.js e APIs REST, em um time altamente colaborativo.",
    details: [
      "Desenvolvi e mantive funcionalidades end-to-end da plataforma com TypeScript, Node.js e APIs REST.",
      "Traduzi, com stakeholders e o time, requisitos de negócio e de produto em soluções técnicas, com documentação de escopo e das entregas.",
      "Sustentei o produto em produção: análise de logs, troubleshooting e correção de incidentes, priorizados por criticidade e impacto no usuário.",
      "Elevei a manutenibilidade da arquitetura com refatoração contínua e code review em Git/GitHub.",
    ],
    systems: ["Plataforma web", "Sustentação em produção"],
    tech: ["TypeScript", "Node.js", "APIs REST", "Git"],
  },
  {
    id: "1callclosers",
    lane: "company",
    period: "jan/2025 — set/2025",
    company: "1 Call Closers",
    role: "Desenvolvedor de Software",
    place: "Califórnia, EUA · Remoto",
    summary:
      "Aplicações web e automações entre plataformas para uma empresa da Califórnia, em time 100% remoto e distribuído.",
    details: [
      "Desenvolvi aplicações web com Next.js, React, TypeScript e Node.js, consumindo APIs REST integradas a sistemas de terceiros.",
      "Projetei e implementei automações e integrações (n8n, Zapier e Make) via APIs REST, eliminando tarefas manuais em vendas, agendamento e apuração de métricas operacionais.",
      "Comunicação escrita e reuniões em inglês, com rotina ágil de entregas.",
    ],
    systems: ["Aplicações web", "Automação de vendas e agenda"],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "n8n", "Zapier", "Make"],
  },
  {
    id: "four",
    lane: "company",
    period: "dez/2023 — dez/2024",
    company: "Four Tecnologia",
    role: "Estagiário de Desenvolvimento",
    place: "Indaiatuba, SP",
    summary:
      "Interfaces web responsivas e serviços de back-end, com integrações entre sistemas corporativos.",
    details: [
      "Desenvolvi interfaces responsivas com React, Next.js e Tailwind CSS, e serviços de back-end com Node.js, MongoDB e APIs REST.",
      "Implementei integrações entre sistemas corporativos, participando da validação, dos testes e da sustentação.",
      "Cerimônias e fluxo ágil (Scrum/Kanban), com versionamento e code review no GitHub.",
    ],
    systems: ["Sistemas corporativos", "Integrações"],
    tech: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
  },
];

export const education = {
  course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
  school: "FACENS — Centro Universitário Facens",
  place: "Sorocaba, SP",
  status: "Concluído",
  languages: "Português nativo · Inglês intermediário · Espanhol básico",
} as const;

// Stack: grouped by the role each area plays in a running system.
// `use` is only written when a project or the CV confirms it.
export type Tech = {
  name: string;
  icon?: string; // simpleicons slug or local path
  glyph?: "webhook" | "rest" | "cron" | "key" | "cloud" | "test";
  use: string;
  where: string[];
};

export type StackDomain = {
  id: string;
  title: string;
  role: string;
  items: Tech[];
};

const si = (slug: string) => `https://cdn.simpleicons.org/${slug}/ffffff`;

export const stack: StackDomain[] = [
  {
    id: "frontend",
    title: "Frontend",
    role: "onde a pessoa usa o sistema",
    items: [
      { name: "React", icon: si("react"), use: "Base das interfaces web dos projetos, próprios e em dupla.", where: ["Noivar", "Núcleo", "CadenceFlow"] },
      { name: "Next.js", icon: si("nextdotjs"), use: "App Router com Server Components, Server Actions e render por slug com SEO.", where: ["Noivar", "CadenceFlow", "Agente SDR"] },
      { name: "TypeScript", icon: si("typescript"), use: "Tipagem de ponta a ponta, do schema ao componente.", where: ["Todos os projetos"] },
      { name: "Tailwind CSS", icon: si("tailwindcss"), use: "Design tokens e interfaces responsivas.", where: ["Noivar", "CadenceFlow", "Núcleo"] },
      { name: "Radix UI", icon: si("radixui"), use: "Primitivos acessíveis da minha biblioteca de componentes.", where: ["Núcleo", "Freelance"] },
      { name: "React Native", icon: si("expo"), use: "Um código-base Expo para iOS, Android e web.", where: ["My Grace Journey"] },
    ],
  },
  {
    id: "apis",
    title: "APIs & Integrations",
    role: "como os sistemas conversam",
    items: [
      { name: "REST APIs", glyph: "rest", use: "Rotas validadas por schema, com autenticação e papel por rota (Núcleo); funcionalidades end-to-end com Node.js e APIs REST (Addon).", where: ["Núcleo", "Addon Software"] },
      { name: "Webhooks", glyph: "webhook", use: "Assinatura HMAC, comparação em tempo constante e idempotência.", where: ["Noivar", "Núcleo", "Agente SDR"] },
      { name: "WhatsApp Cloud API", icon: si("whatsapp"), use: "Prova de origem no webhook de entrada da Meta (CadenceFlow), entrada via CadenceFlow com token interno (Agente SDR) e envio por organização (Núcleo).", where: ["CadenceFlow", "Agente SDR", "Núcleo"] },
      { name: "Mercado Pago", icon: si("mercadopago"), use: "PIX, boleto e assinatura com reconciliação de pendentes (Núcleo); cartão via OAuth na conta do próprio casal (Noivar).", where: ["Núcleo", "Noivar"] },
      { name: "Stripe", icon: si("stripe"), use: "Checkout e webhooks de assinatura verificados.", where: ["My Grace Journey", "CadenceFlow"] },
      { name: "Pix BR Code", icon: si("pix"), use: "Payload EMV montado no próprio app, com CRC16.", where: ["Noivar"] },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    role: "onde a regra de negócio vive",
    items: [
      { name: "Node.js", icon: si("nodedotjs"), use: "APIs, workers e rotas de cron.", where: ["Núcleo", "CadenceFlow", "Agente SDR"] },
      { name: "Express", icon: si("express"), use: "API em camadas Repository → Service → Controller.", where: ["Núcleo"] },
      { name: "Prisma", icon: si("prisma"), use: "ORM tipado com queries escopadas por tenant: organização no Núcleo, usuário no JobHunter AI.", where: ["Núcleo", "CadenceFlow", "JobHunter AI"] },
      { name: "Zod", icon: si("zod"), use: "Contratos compartilhados entre API e front; validação da saída da IA.", where: ["Núcleo", "JobHunter AI"] },
      { name: "JWT", icon: si("jsonwebtokens"), use: "Access token com papel e organização e refresh opaco rotacionado (Núcleo); JWT em cookie httpOnly (JobHunter AI).", where: ["Núcleo", "JobHunter AI"] },
    ],
  },
  {
    id: "data",
    title: "Databases",
    role: "onde o estado é garantido",
    items: [
      { name: "PostgreSQL", icon: si("postgresql"), use: "Constraints, triggers e filas com FOR UPDATE SKIP LOCKED.", where: ["Núcleo", "Noivar", "CadenceFlow"] },
      { name: "Supabase", icon: si("supabase"), use: "Auth, Storage, RLS e Edge Functions.", where: ["Noivar", "My Grace Journey"] },
      { name: "MongoDB", icon: si("mongodb"), use: "Serviços de back-end com Node.js.", where: ["Four Tecnologia"] },
    ],
  },
  {
    id: "automation",
    title: "Automation",
    role: "o que roda sem ninguém clicar",
    items: [
      { name: "Workers & crons", glyph: "cron", use: "Outbox transacional, pg_cron e trava de execução única.", where: ["Núcleo", "Agente SDR"] },
      { name: "n8n", icon: si("n8n"), use: "Automações entre plataformas via APIs REST.", where: ["1 Call Closers"] },
      { name: "Zapier · Make", icon: si("zapier"), use: "Integrações em vendas, agendamento e métricas operacionais.", where: ["1 Call Closers"] },
      { name: "Claude API", icon: si("anthropic"), use: "Saída estruturada com JSON Schema e prompt caching.", where: ["Noivar", "JobHunter AI"] },
      { name: "OpenAI", icon: "/logos/openai.svg", use: "Redação e revisão de cláusulas de contrato.", where: ["Núcleo"] },
      { name: "Gemini", icon: si("googlegemini"), use: "Mentor e devocionais gerados em modo JSON.", where: ["My Grace Journey"] },
    ],
  },
  {
    id: "infra",
    title: "Infrastructure & Deployment",
    role: "onde tudo isso roda",
    items: [
      { name: "Vercel", icon: si("vercel"), use: "Deploy, Cron e funções serverless.", where: ["Noivar", "Núcleo", "My Grace Journey"] },
      { name: "Nginx · PM2", icon: si("nginx"), use: "Três instâncias PM2 atrás do Nginx; deploy com rollback de build.", where: ["CadenceFlow"] },
      { name: "Docker", icon: si("docker"), use: "Build multi-stage e compose com Postgres, app e worker.", where: ["JobHunter AI"] },
      { name: "GitHub Actions", icon: si("githubactions"), use: "Typecheck, self-checks e build no CI.", where: ["Núcleo"] },
      { name: "AWS · GCP", glyph: "cloud", use: "Execução em nuvem de serviços distribuídos.", where: ["Experiência (CV)"] },
      { name: "Testes", glyph: "test", use: "Vitest, Jest, React Testing Library e Cypress nos fluxos críticos.", where: ["Noivar", "JobHunter AI", "Freelance"] },
    ],
  },
];

export type MethodStep = {
  id: string;
  title: string;
  verb: string;
  text: string;
  evidence: { project: string; text: string };
  concepts: string[];
};

export const method: MethodStep[] = [
  {
    id: "understand",
    title: "Understand",
    verb: "Entender",
    text: "Começo pelo problema de negócio: quem usa, qual fluxo dói e o que precisa ser verdade em produção. Isso vira escopo e documentação que o time consegue adotar.",
    evidence: {
      project: "Addon Software",
      text: "Requisitos de negócio e de produto traduzidos em soluções técnicas, com documentação de escopo e entregas.",
    },
    concepts: ["Requisitos → escopo", "Documentação técnica"],
  },
  {
    id: "architect",
    title: "Architect",
    verb: "Arquitetar",
    text: "Separo responsabilidades e fixo contratos antes de implementar: camadas claras, schemas compartilhados e fronteiras explícitas entre serviços.",
    evidence: {
      project: "Núcleo",
      text: "Repository → Service → Controller, com schemas Zod compartilhados entre a API e o front.",
    },
    concepts: ["Separação de responsabilidades", "Contratos bem definidos"],
  },
  {
    id: "build",
    title: "Build",
    verb: "Construir",
    text: "Coloco as regras críticas onde ninguém consegue contorná-las: no servidor e no banco, não só na interface.",
    evidence: {
      project: "Noivar",
      text: "Um trigger no Postgres impede publicar sem pagamento confirmado; RLS isola os dados de cada casal.",
    },
    concepts: ["Regras no servidor", "Manutenibilidade"],
  },
  {
    id: "integrate",
    title: "Integrate",
    verb: "Integrar",
    text: "Integração é onde sistemas quebram. Valido a origem, trato reentregas e falhas, e centralizo os pontos de saída.",
    evidence: {
      project: "Núcleo",
      text: "Outbox transacional com backoff exponencial, dead letter queue e idempotência por evento e por passo.",
    },
    concepts: ["Integração entre serviços", "Tratamento de erros"],
  },
  {
    id: "deliver",
    title: "Deliver",
    verb: "Entregar",
    text: "Entrego com rede de segurança: typecheck e checks no CI, deploy reversível e sustentação guiada por logs.",
    evidence: {
      project: "CadenceFlow",
      text: "Rollback do build em segundos e portão de saúde no staging com rollback automático.",
    },
    concepts: ["Automação de processos", "Performance e escala quando aplicável"],
  },
];

// Illustrative only: rendered with an explicit "demonstração" label.
export const buildDemo = [
  { kind: "cmd", text: "npm run build" },
  { kind: "dim", text: "> next build" },
  { kind: "ok", text: "Compiled successfully" },
  { kind: "ok", text: "Linting and checking validity of types" },
  { kind: "ok", text: "Collecting page data" },
  { kind: "ok", text: "Generating static pages" },
  { kind: "dim", text: "○ (Static)  prerendered as static content" },
] as const;

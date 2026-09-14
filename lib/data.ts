export const profile = {
  name: "Pedro Tortoriello",
  initials: "PT",
  role: "AI & Automation Specialist · Full Stack Developer",
  roles: [
    "Full Stack Developer",
    "AI & Automation Specialist",
    "SaaS Builder",
    "Consultor de Automação",
  ],
  location: "São Paulo, Brasil",
  whatsapp: "https://wa.me/5511942716215",
  whatsappLabel: "+55 11 94271-6215",
  availability: "Disponível para novos projetos",

  headline: "Automações inteligentes e sistemas que escalam o seu negócio.",
  subheadline:
    "Especialista em IA aplicada, automação de processos e desenvolvimento full stack. Tiro o trabalho manual do caminho e entrego produtos digitais que rodam sozinhos.",

  summary:
    "Atuo do diagnóstico à publicação: desenho fluxos, modelo dados, desenvolvo interfaces, APIs e automações, e conecto IA onde ela gera resultado real. O foco nunca é o código pelo código, é a operação que passa a funcionar com mais controle.",

  heroImage:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=85",
  aboutImage:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
} as const;

export const metrics = [
  { value: "20+", label: "sistemas e websites em produção" },
  { value: "5 anos", label: "construindo produtos digitais" },
] as const;

// Qualitative differentiators shown beside the metrics (not faux-numbers).
export const qualities = [
  "Comunicação direta",
  "IA e automação no núcleo",
] as const;

export const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#processo", label: "Processo" },
  { href: "#stack", label: "Stack" },
] as const;

export const services = [
  {
    icon: "Brain",
    title: "Inteligência Artificial",
    summary:
      "Agentes e atendimento com IA que respondem, qualificam e executam tarefas dentro da sua operação, integrados aos seus dados e canais.",
    capabilities: [
      "Agentes de IA sob medida",
      "Atendimento e suporte automatizado",
      "Chatbots integrados ao WhatsApp",
      "IA aplicada a processos de negócio",
    ],
  },
  {
    icon: "Workflow",
    title: "Automação de Processos",
    summary:
      "Fluxos que conectam suas ferramentas e eliminam trabalho manual repetitivo, do lead ao faturamento, sem planilha no meio do caminho.",
    capabilities: [
      "Workflows em n8n, Make e Zapier",
      "Integrações entre sistemas e APIs",
      "Sincronização de dados e CRMs",
      "Disparos e rotinas automáticas",
    ],
  },
  {
    icon: "Boxes",
    title: "Desenvolvimento de Software",
    summary:
      "SaaS, sistemas web e APIs construídos para durar: arquitetura limpa, performance e interfaces que as pessoas conseguem usar de verdade.",
    capabilities: [
      "Plataformas SaaS do zero",
      "Sistemas web sob medida",
      "APIs e integrações robustas",
      "Dashboards e painéis operacionais",
    ],
  },
  {
    icon: "LayoutTemplate",
    title: "Websites e Landing Pages",
    summary:
      "Sites institucionais e landing pages de alta conversão: rápidos, responsivos e construídos para posicionar a marca e gerar contato qualificado.",
    capabilities: [
      "Sites institucionais sob medida",
      "Landing pages focadas em conversão",
      "SEO técnico e performance",
      "Design responsivo e acessível",
    ],
  },
] as const;

export const differentiators = [
  {
    title: "Diagnóstico antes da execução",
    text: "Cada decisão técnica parte do negócio, do fluxo operacional e do objetivo real. Não desenvolvo no escuro.",
  },
  {
    title: "Arquitetura preparada para evolução",
    text: "Front-end, back-end e dados estruturados para reduzir retrabalho, facilitar manutenção e crescer sem reescrever tudo.",
  },
  {
    title: "Entrega ponta a ponta",
    text: "Do diagnóstico ao deploy: interfaces responsivas, APIs consistentes, automações e IA funcionando em produção.",
  },
] as const;

export const projects = [
  {
    slug: "orion-leads",
    group: "SaaS",
    title: "OrionLeads",
    category: "Prospecção B2B com IA",
    year: "2026",
    outcome: "Motor comercial com CRM, automações e WhatsApp para gerar pipeline previsível.",
    description:
      "Plataforma de prospecção B2B criada para estruturar captação recorrente, organizar cadências e dar visibilidade real ao pipeline comercial.",
    details:
      "Concentra base de leads, campanhas, automações e acompanhamento operacional em uma interface pensada para times que precisam escalar sem perder controle.",
    modules: ["Cadências", "Pipeline CRM", "WhatsApp", "Campanhas"],
    tags: ["B2B Sales", "CRM", "Automação", "WhatsApp"],
    url: "https://orion-leads.vercel.app/",
  },
  {
    slug: "exo-clinic",
    group: "SaaS",
    title: "Exo Clinic",
    category: "SaaS para clínicas e consultórios",
    year: "2026",
    outcome: "Agenda, pacientes, financeiro e rotina clínica unificados, com IA no atendimento.",
    description:
      "SaaS para clínicas e consultórios com operação unificada de agendamentos, pacientes, equipe, procedimentos e financeiro.",
    details:
      "Reduz a dependência de controles dispersos e entrega uma experiência mais confiável para recepção, profissionais e gestão, com apoio de automações e IA.",
    modules: ["Agenda clínica", "CRM de pacientes", "Financeiro", "Agente de IA"],
    tags: ["Saúde", "Agenda", "Financeiro", "WhatsApp"],
    url: "https://exo-clinic.exocompany.com.br/login",
  },
  {
    slug: "exo-barber",
    group: "SaaS",
    title: "BarberFlow",
    category: "SaaS para barbearias",
    year: "2026",
    outcome: "Agenda, clientes, caixa e recorrência organizados em um fluxo único.",
    description:
      "SaaS para barbearias desenhado para centralizar agendamentos, relacionamento com clientes, serviços, comissões e fechamento diário.",
    details:
      "Combina agenda online, CRM, financeiro e automações via WhatsApp para profissionalizar a operação e reduzir falhas no dia a dia.",
    modules: ["Agenda online", "CRM de clientes", "Financeiro", "Agente de IA"],
    tags: ["Barbearia", "Agenda", "Financeiro", "WhatsApp"],
    url: "https://exo-barber.exocompany.com.br/",
  },
  {
    slug: "bc-distributor",
    group: "Site",
    title: "B&C Distribution Center",
    category: "Distribuição atacadista de cosméticos",
    year: "2026",
    outcome: "Presença institucional B2B orientada a catálogo atacadista e contato comercial direto.",
    description:
      "Website para distribuidora de beauty supply e body care com apresentação de marcas, posicionamento internacional e caminho claro para contato comercial.",
    details:
      "Reforça credibilidade B2B, organiza o portfólio de marcas e aproxima revendedores e compradores com navegação objetiva e mensagem comercial direta.",
    modules: ["Portfólio", "Atacado", "Contato", "Presença B2B"],
    tags: ["React", "Vite", "B2B", "Wholesale"],
    url: "https://bcdistributor.vercel.app/",
  },
  {
    slug: "achei-studios",
    group: "Marketplace",
    title: "Achei Studios",
    category: "Marketplace para locação audiovisual",
    year: "2026",
    outcome: "Descoberta e locação de estúdios, equipamentos e serviços criativos em uma só plataforma.",
    description:
      "Marketplace do setor audiovisual para conectar demanda a estúdios, equipamentos e serviços criativos com uma busca mais direta.",
    details:
      "Organiza a oferta, reduz fricção na descoberta e prepara a plataforma para crescimento de inventário, geolocalização e operação multi-perfil.",
    modules: ["Busca", "Estúdios", "Equipamentos", "Perfis"],
    tags: ["Marketplace", "Audiovisual", "Locação", "Geolocalização"],
    url: "https://acheistudios.com",
  },
  {
    slug: "lucinei-m-campos",
    group: "Site",
    title: "Lucinei M. Campos",
    category: "Autoridade literária e agenda escolar",
    year: "2026",
    outcome: "Presença autoral que organiza obra, agenda de visitas e relacionamento com leitores e escolas.",
    description:
      "Site oficial para escritor e professor com foco em consolidar autoridade, apresentar livros e facilitar convites para eventos e visitas escolares.",
    details:
      "Equilibra posicionamento pessoal, catálogo editorial e contato institucional para aproximar leitores, escolas e organizadores com mais clareza.",
    modules: ["Livros", "Eventos", "Blog", "Contato"],
    tags: ["Autoridade", "Livros", "Eventos", "SEO"],
    url: "https://lucineimcampos.vercel.app/",
  },
] as const;

export const results = [
  {
    metric: "3 SaaS",
    label: "em produção e uso real",
    text: "OrionLeads, Exo Clinic e BarberFlow: plataformas completas com agenda, CRM, financeiro e IA operando no dia a dia de empresas reais.",
  },
  {
    metric: "1 sistema",
    label: "no lugar de planilhas e apps soltos",
    text: "Processos que viviam espalhados em WhatsApp, planilhas e cadernos passam a rodar dentro de um único sistema com automação e visibilidade.",
  },
  {
    metric: "24/7",
    label: "atendimento com IA que qualifica e responde",
    text: "Agentes de IA integrados ao WhatsApp respondem, qualificam e encaminham, reduzindo trabalho manual da equipe sem perder o tom do negócio.",
  },
] as const;

const technologyIcon = (slug: string, color = "ffffff") =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

export type Technology = {
  name: string;
  category: string;
  logo: string;
  detail: string;
};

export const technologies: Technology[] = [
  // IA & Automação (em destaque para o posicionamento)
  {
    name: "OpenAI",
    category: "IA & Automação",
    logo: "/logos/openai.svg",
    detail: "Modelos de linguagem para agentes, atendimento e geração de conteúdo.",
  },
  {
    name: "Claude",
    category: "IA & Automação",
    logo: technologyIcon("claude"),
    detail: "IA da Anthropic aplicada a raciocínio, agentes e automações complexas.",
  },
  {
    name: "n8n",
    category: "IA & Automação",
    logo: technologyIcon("n8n", "EA4B71"),
    detail: "Orquestração de automações e integração entre sistemas e IA.",
  },
  {
    name: "Make",
    category: "IA & Automação",
    logo: technologyIcon("make"),
    detail: "Automação visual de fluxos de trabalho entre plataformas.",
  },
  {
    name: "Zapier",
    category: "IA & Automação",
    logo: technologyIcon("zapier", "FF4A00"),
    detail: "Integração rápida entre centenas de ferramentas SaaS.",
  },

  // Frontend
  {
    name: "Next.js",
    category: "Frontend",
    logo: technologyIcon("nextdotjs"),
    detail: "Aplicações React com SSR, rotas e performance de borda.",
  },
  {
    name: "React",
    category: "Frontend",
    logo: technologyIcon("react", "61DAFB"),
    detail: "Interfaces modernas com componentes reutilizáveis.",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    logo: technologyIcon("typescript", "3178C6"),
    detail: "Tipagem estática para código seguro e escalável.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    logo: technologyIcon("tailwindcss", "06B6D4"),
    detail: "Estilização consistente para interfaces modernas.",
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    logo: technologyIcon("nodedotjs", "5FA04E"),
    detail: "APIs e serviços escaláveis em JavaScript/TypeScript.",
  },
  {
    name: "Express",
    category: "Backend",
    logo: technologyIcon("express"),
    detail: "Framework minimalista para APIs e serviços backend.",
  },
  {
    name: "REST APIs",
    category: "Backend",
    logo: technologyIcon("openapiinitiative", "6BA539"),
    detail: "APIs robustas e integrações entre sistemas.",
  },
  {
    name: "Prisma",
    category: "Backend",
    logo: technologyIcon("prisma"),
    detail: "ORM com tipagem forte sobre TypeScript.",
  },

  // Dados
  {
    name: "PostgreSQL",
    category: "Dados",
    logo: technologyIcon("postgresql", "4169E1"),
    detail: "Banco relacional robusto para sistemas e SaaS.",
  },
  {
    name: "Supabase",
    category: "Dados",
    logo: technologyIcon("supabase", "3FCF8E"),
    detail: "Backend com auth, storage e realtime.",
  },
  {
    name: "MongoDB",
    category: "Dados",
    logo: technologyIcon("mongodb", "47A248"),
    detail: "Banco NoSQL flexível, orientado a documentos.",
  },
  {
    name: "Redis",
    category: "Dados",
    logo: technologyIcon("redis", "FF4438"),
    detail: "Cache em memória e filas para automação.",
  },
  {
    name: "Firebase",
    category: "Dados",
    logo: technologyIcon("firebase", "FFCA28"),
    detail: "Banco NoSQL e sincronização em tempo real.",
  },

  // Infra & Cloud
  {
    name: "AWS",
    category: "Infra & Cloud",
    logo: "/logos/aws.svg",
    detail: "Infraestrutura escalável e serviços em nuvem.",
  },
  {
    name: "Vercel",
    category: "Infra & Cloud",
    logo: technologyIcon("vercel"),
    detail: "Deploy contínuo e edge otimizado para Next.js.",
  },
  {
    name: "Docker",
    category: "Infra & Cloud",
    logo: technologyIcon("docker", "2496ED"),
    detail: "Containerização para ambientes consistentes.",
  },
  {
    name: "Git",
    category: "Infra & Cloud",
    logo: technologyIcon("git", "F05032"),
    detail: "Versionamento e colaboração.",
  },
] as const;

export const process = [
  {
    title: "Descoberta",
    text: "Entendo o negócio, a operação e onde está o gargalo real antes de propor qualquer solução.",
  },
  {
    title: "Planejamento",
    text: "Defino escopo, fluxos e arquitetura de dados, com prioridades claras e entregáveis mensuráveis.",
  },
  {
    title: "Desenvolvimento",
    text: "Construo interfaces, APIs e a base do sistema com código limpo, tipado e preparado para crescer.",
  },
  {
    title: "Automação & IA",
    text: "Conecto ferramentas, automatizo o trabalho repetitivo e aplico IA onde ela gera resultado direto.",
  },
  {
    title: "Entrega",
    text: "Valido em produção, ajusto com base no uso real e publico com performance e responsividade.",
  },
  {
    title: "Escala",
    text: "Acompanho a evolução: novos módulos, otimizações e ajustes conforme a operação cresce.",
  },
] as const;

export const faq = [
  {
    q: "Você atende projetos do zero ou também melhora sistemas que já existem?",
    a: "Os dois. Construo produtos do zero (SaaS, sistemas, automações) e também entro em sistemas existentes para corrigir gargalos, integrar IA e preparar a arquitetura para escalar.",
  },
  {
    q: "Que tipo de automação você costuma implementar?",
    a: "Desde atendimento com IA no WhatsApp e qualificação de leads até integrações entre CRM, financeiro e ferramentas internas usando n8n, Make, Zapier e APIs sob medida. O objetivo é tirar o trabalho manual repetitivo da equipe.",
  },
  {
    q: "Como a IA entra nos projetos, na prática?",
    a: "Sempre conectada a um resultado: um agente que responde e qualifica clientes, um fluxo que classifica e encaminha demandas, ou geração de conteúdo e relatórios. Tudo integrado aos seus dados e canais, com um objetivo claro.",
  },
  {
    q: "Trabalha com empresas de fora de São Paulo?",
    a: "Sim. O trabalho é remoto e a comunicação acontece por WhatsApp e reuniões online, do diagnóstico à entrega.",
  },
  {
    q: "Como começa um projeto?",
    a: "Com uma conversa curta para entender o cenário. A partir daí eu monto um diagnóstico, proponho escopo e seguimos para o planejamento. É só chamar no WhatsApp.",
  },
] as const;

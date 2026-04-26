export const profile = {
  name: "Pedro Tortoriello",
  initials: "PT",
  role: "Engenheiro de Software Full Stack",
  location: "São Paulo, Brasil",
  whatsapp: "https://wa.me/5511942716215",
  availability: "Disponível para novos projetos sob avaliação técnica e escopo definido",

  headline:
    "Sistemas, SaaS e automações para negócios que precisam operar com mais controle.",

  summary:
    "Atuo do diagnóstico à publicação: desenho fluxos, modelo dados, desenvolvo interfaces, APIs e automações para transformar processos dispersos em produtos digitais estáveis, mensuráveis e prontos para crescer.",

  heroImage:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=85",

  aboutImage:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",

stats: [
    { value: "5 anos", label: "engenharia de produtos digitais" },
    { value: "20+", label: "sistemas e SaaS em produção" },
    { value: "End-to-end", label: "arquitetura, APIs e automação" }
  ],

  proof: [
    "Sistemas com agenda, financeiro, dashboards e operação diária",
    "Sites institucionais orientados a posicionamento e geração de contato qualificado",
    "Integrações com APIs, automações e bases estruturadas para evolução",
  ],
} as const;

export const differentiators = [
  {
    title: "Diagnóstico antes da execução",
    text:
      "Cada decisão técnica parte do entendimento do negócio, fluxo operacional e objetivos reais. Não desenvolvo no escuro.",
  },
  {
    title: "Arquitetura preparada para evolução",
    text:
      "Estruturo front-end, back-end e dados para reduzir retrabalho, facilitar manutenção e permitir crescimento contínuo.",
  },
  {
    title: "Entrega com critério técnico",
    text:
      "Interfaces responsivas, APIs consistentes e sistemas performáticos com foco em usabilidade, confiabilidade e clareza.",
  },
] as const;

export const projects = [
  {
    slug: "orion-leads",
    group: "Sistemas",
    title: "OrionLeads",
    category: "Prospecção B2B com IA",
    year: "2026",
    outcome: "Motor comercial com CRM, automações e WhatsApp para geração de pipeline",
    description:
      "Plataforma de prospecção B2B criada para estruturar captação recorrente, organizar cadências e dar visibilidade real ao pipeline comercial.",
    details:
      "O produto concentra base de leads, campanhas, automações e acompanhamento operacional em uma interface pensada para times que precisam escalar sem perder controle.",
    modules: ["Cadências", "Pipeline CRM", "WhatsApp", "Campanhas"],
    tags: ["B2B Sales", "CRM", "Automação", "WhatsApp"],
    url: "https://orion-leads.vercel.app/",
  },
  {
    slug: "exo-clinic",
    group: "Sistemas",
    title: "Exo Clinic",
    category: "SaaS para clínicas e consultórios",
    year: "2026",
    outcome: "Agenda, pacientes, financeiro e rotina clínica centralizados em um único sistema",
    description:
      "SaaS para clínicas e consultórios com operação unificada de agendamentos, pacientes, equipe, procedimentos e financeiro.",
    details:
      "A solução reduz dependência de controles dispersos e entrega uma experiência mais confiável para recepção, profissionais e gestão, com apoio de automações e IA no atendimento.",
    modules: ["Agenda clínica", "CRM de pacientes", "Financeiro", "Agente de IA"],
    tags: ["Saúde", "Agenda", "Financeiro", "WhatsApp"],
    url: "https://exo-clinic.exocompany.com.br/login",
  },
  {
    slug: "exo-barber",
    group: "Sistemas",
    title: "BarberFlow",
    category: "SaaS para barbearias",
    year: "2026",
    outcome: "Agenda, clientes, caixa e recorrência organizados em um fluxo único",
    description:
      "SaaS para barbearias desenhado para centralizar agendamentos, relacionamento com clientes, serviços, comissões e fechamento diário.",
    details:
      "A plataforma combina agenda online, CRM, financeiro e automações via WhatsApp para profissionalizar a operação e reduzir falhas no dia a dia.",
    modules: ["Agenda online", "CRM de clientes", "Financeiro", "Agente de IA"],
    tags: ["Barbearia", "Agenda", "Financeiro", "WhatsApp"],
    url: "https://exo-barber.exocompany.com.br/",
  },
  {
    slug: "bc-distributor",
    group: "Sites",
    title: "B&C Distribution Center",
    category: "Distribuição atacadista de cosméticos",
    year: "2026",
    outcome: "Presença institucional orientada a catálogo atacadista e contato comercial direto",
    description:
      "Website para distribuidora de beauty supply e body care com apresentação de marcas, posicionamento internacional e caminho claro para contato comercial.",
    details:
      "A estrutura reforça credibilidade B2B, organiza o portfólio de marcas e aproxima revendedores e compradores por meio de navegação objetiva e mensagem comercial direta.",
    modules: ["Portfólio", "Atacado", "Contato", "Presença B2B"],
    tags: ["React", "Vite", "B2B", "Wholesale"],
    url: "https://bcdistributor.vercel.app/",
  },
  {
    slug: "achei-studios",
    group: "Aplicativos",
    title: "Achei Studios",
    category: "Marketplace para locação audiovisual",
    year: "2026",
    outcome: "Descoberta e locação de estúdios, equipamentos e serviços criativos em uma única plataforma",
    description:
      "Marketplace voltado ao setor audiovisual para conectar demanda a estúdios, equipamentos e serviços criativos com uma experiência de busca mais direta.",
    details:
      "O projeto organiza a oferta, reduz fricção na descoberta e prepara a plataforma para crescimento de inventário, geolocalização e operação multi-perfil.",
    modules: ["Busca", "Estúdios", "Equipamentos", "Perfis"],
    tags: ["Marketplace", "Audiovisual", "Locação", "Geolocalização"],
    url: "https://acheistudios.com",
  },
  // {
  //   slug: "experts-marketing",
  //   group: "Sites",
  //   title: "Comunidade de Experts",
  //   category: "Comunidade de marketing e IA",
  //   year: "2026",
  //   outcome: "Landing page com proposta clara, prova de valor e CTA direto para entrada na comunidade",
  //   description:
  //     "Página de captação para uma comunidade gratuita de marketing digital e inteligência artificial, com narrativa orientada a clareza, pertencimento e conversão.",
  //   details:
  //     "A estrutura organiza promessa, diferenciais, dinâmica da comunidade e perguntas frequentes para reduzir ruído e conduzir o usuário à ação com mais confiança.",
  //   modules: ["Proposta de valor", "Benefícios", "FAQ", "Captação"],
  //   tags: ["Landing Page", "Comunidade", "CRO", "Conversão"],
  //   url: "https://expertsmarketingdigital-landingpage.vercel.app/",
  // },
  {
    slug: "lucinei-m-campos",
    group: "Sites",
    title: "Lucinei M. Campos",
    category: "Autoridade literária e agenda escolar",
    year: "2026",
    outcome: "Presença autoral que organiza obra, agenda de visitas e relacionamento com leitores e escolas",
    description:
      "Site oficial para escritor e professor com foco em consolidar autoridade, apresentar livros e facilitar convites para eventos, palestras e visitas escolares.",
    details:
      "A experiência equilibra posicionamento pessoal, catálogo editorial e contato institucional para aproximar leitores, escolas e organizadores com mais clareza.",
    modules: ["Livros", "Eventos", "Blog", "Contato"],
    tags: ["Autoridade", "Livros", "Eventos", "SEO"],
    url: "https://lucineimcampos.vercel.app/",
  },
] as const;

const technologyIcon = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

export const technologies = [
  // Frontend
  {
    name: "Next.js",
    category: "Frontend",
    logo: technologyIcon("nextdotjs", "000000"),
    detail: "Arquitetura moderna com SSR, rotas e aplicações escaláveis.",
  },
  {
    name: "React",
    category: "Frontend",
    logo: technologyIcon("react", "61DAFB"),
    detail: "Construção de interfaces modernas com componentes reutilizáveis.",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    logo: technologyIcon("typescript", "3178C6"),
    detail: "Tipagem estática para aplicações mais seguras e escaláveis.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    logo: technologyIcon("tailwindcss", "06B6D4"),
    detail: "Estilização rápida e consistente para interfaces modernas.",
  },

  // Mobile
  {
    name: "Flutter",
    category: "Mobile",
    logo: technologyIcon("flutter", "02569B"),
    detail: "Desenvolvimento mobile multiplataforma com performance e consistência visual.",
  },
  {
    name: "React Native",
    category: "Mobile",
    logo: technologyIcon("react", "61DAFB"),
    detail: "Aplicações mobile nativas com base em React e arquitetura reutilizável.",
  },

  // Backend
  {
    name: "TypeScript",
    category: "Backend",
    logo: technologyIcon("typescript", "3178C6"),
    detail: "Tipagem estática que traz segurança, previsibilidade e escalabilidade ao código.",
  },
  {
    name: "JavaScript",
    category: "Backend",
    logo: technologyIcon("javascript", "F7DF1E"),
    detail: "Linguagem base para toda a lógica dinâmica, do servidor à interface.",
  },
  {
    name: "Node.js",
    category: "Backend",
    logo: technologyIcon("nodedotjs", "5FA04E"),
    detail: "Construção de APIs e serviços escaláveis.",
  },
  {
    name: "Express",
    category: "Backend",
    logo: technologyIcon("express", "ffffff"), // No dark mode, o logo do Express fica melhor branco
    detail: "Framework minimalista para APIs e serviços backend.",
  },
  {
    name: "REST APIs",
    category: "Backend",
    logo: technologyIcon("openapiinitiative", "6BA539"),
    detail: "Desenvolvimento de APIs robustas e integrações entre sistemas.",
  },
// Database
  {
    name: "PostgreSQL",
    category: "Database",
    logo: technologyIcon("postgresql", "4169E1"),
    detail: "Banco relacional robusto para sistemas e SaaS.",
  },
  {
    name: "Supabase",
    category: "Database",
    logo: technologyIcon("supabase", "3FCF8E"),
    detail: "Backend completo com autenticação, storage e realtime.",
  },  
  {
    name: "MongoDB",
    category: "Database",
    logo: technologyIcon("mongodb", "47A248"),
    detail: "Banco de dados NoSQL flexível e orientado a documentos.",
  },
  {
    name: "Redis",
    category: "Database",
    logo: technologyIcon("redis", "DC382D"),
    detail: "Armazenamento em memória para cache estruturado e filas de automação.",
  },
  {
    name: "MySQL",
    category: "Database",
    logo: technologyIcon("mysql", "4479A1"),
    detail: "Banco de dados relacional clássico, rápido e de alta compatibilidade.",
  },
  {
    name: "Prisma ORM",
    category: "Database",
    logo: technologyIcon("prisma", "2D3748"),
    detail: "Comunicação com o banco de dados baseada em tipagem forte com TypeScript.",
  },
  {
    name: "Firebase",
    category: "Database",
    logo: technologyIcon("firebase", "FFCA28"),
    detail: "Ecossistema Google com banco NoSQL e sincronização em tempo real.",
  },

  // Automation
  {
    name: "n8n",
    category: "Automation",
    logo: technologyIcon("n8n", "EA4B71"),
    detail: "Automação de processos e integração entre sistemas.",
  },
  {
    name: "Zapier",
    category: "Automation",
    logo: technologyIcon("zapier", "FF4A00"),
    detail: "Automação de workflows e integração entre plataformas.",
  },
  {
    name: "APIs & Integrations",
    category: "Automation",
    logo: technologyIcon("postman", "FF6C37"),
    detail: "Integração entre sistemas, SaaS e serviços externos.",
  },
  {
    name: "Make",
    category: "Automation",
    logo: technologyIcon("make", "ffffff"), // Ajustado para branco para destacar no dark mode
    detail: "Integração visual de sistemas e automação de fluxos de trabalho.",
  },

  // Infra & DevOps
  {
    name: "Docker",
    category: "Infra & DevOps",
    logo: technologyIcon("docker", "2496ED"),
    detail: "Containerização para garantir consistência e isolamento entre ambientes.",
  },
  {
    name: "Vercel",
    category: "Infra & DevOps",
    logo: technologyIcon("vercel", "ffffff"),
    detail: "Deploy contínuo e infraestrutura de borda (edge) otimizada para Next.js.",
  },

  // Cloud
  {
    name: "AWS",
    category: "Cloud",
     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    detail: "Infraestrutura escalável e serviços cloud.",
  },

  // Tools
  {
    name: "Git",
    category: "Tools",
    logo: technologyIcon("git", "F05032"),
    detail: "Controle de versão e colaboração em projetos.",
  },
  {
    name: "GitHub",
    category: "Tools",
    logo: technologyIcon("github", "181717"),
    detail: "Gerenciamento de código e colaboração em projetos.",
  },
  {
    name: "Postman",
    category: "Tools",
    logo: technologyIcon("postman", "FF6C37"),
    detail: "Desenvolvimento, teste e documentação de rotas de APIs REST.",
  },
  {
    name: "Figma",
    category: "Design",
    logo: technologyIcon("figma", "F24E1E"),
    detail: "Prototipação e design de interfaces.",
  },
] as const;

export const process = [
  {
    title: "Diagnóstico",
    text:
      "Entendimento profundo do negócio, público, operação e pontos de melhoria antes de definir qualquer solução.",
  },
  {
    title: "Arquitetura",
    text:
      "Definição de fluxos, estrutura de dados e componentes para garantir consistência e escalabilidade.",
  },
  {
    title: "Entrega",
    text:
      "Desenvolvimento, validação e publicação com foco em performance, responsividade e funcionamento real.",
  },
] as const;

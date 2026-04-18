export const profile = {
  name: "Pedro Tortoriello",
  initials: "PT",
  role: "Engenheiro de Software Full Stack",
  location: "São Paulo, Brasil",
  whatsapp: "https://wa.me/5511942716215",
  availability: "Disponível para novos projetos sob avaliação técnica e escopo definido",

  headline:
    "Desenvolvimento de sistemas e SaaS com foco em performance, automação e crescimento real.",

  summary:
    "Projeto e desenvolvo sistemas, APIs, interfaces e automações com foco em clareza operacional, estabilidade e evolução contínua do produto. Minha atuação vai além da implementação técnica: estruturo soluções que organizam processos, reduzem fricção e suportam o crescimento do negócio.",

  heroImage:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=85",

  aboutImage:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",

  stats: [
    { value: "5 anos", label: "de experiência em produtos digitais" },
    { value: "8+", label: "projetos publicados em produção" },
    { value: "Full stack", label: "arquitetura, APIs e automação" },
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
    title: "Orion Leads",
    category: "Prospecção B2B",
    year: "2026",
    outcome: "Processo comercial estruturado e previsível",
    description:
      "Ferramenta de prospecção B2B focada em padronização comercial, leitura de funil e priorização de oportunidades.",
    details:
      "Ajuda equipes comerciais a qualificar leads, acompanhar etapas e atuar com maior previsibilidade.",
    tags: ["React", "Automation", "B2B", "Sales Ops"],
    url: "https://orion-leads.vercel.app/",
  },
  {
    slug: "exo-clinic",
    group: "Sistemas",
    title: "Exo Clinic",
    category: "SaaS para saúde",
    year: "2026",
    outcome: "Agenda, pacientes e financeiro centralizados em um único fluxo",
    description:
      "Plataforma para clínicas e consultórios com gestão completa de agenda, pacientes, equipe, procedimentos e financeiro.",
    details:
      "A solução centraliza a operação administrativa e oferece uma experiência objetiva para recepção, profissionais e gestores.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Dashboards"],
    url: "https://exo-clinic.exocompany.com.br/login",
  },
  {
    slug: "exo-barber",
    group: "Sistemas",
    title: "Exo Barber",
    category: "Gestão para barbearias",
    year: "2026",
    outcome: "Controle completo de agenda, caixa e equipe",
    description:
      "Sistema de gestão para barbearias com acompanhamento centralizado da operação e desempenho.",
    details:
      "Organiza indicadores essenciais e elimina a dependência de controles manuais ou planilhas.",
    tags: ["React", "TypeScript", "Supabase", "Analytics"],
    url: "https://exo-barber.exocompany.com.br/",
  },
  {
    slug: "bc-distributor",
    group: "Sites",
    title: "BC Distributor",
    category: "Distribuição B2B",
    year: "2026",
    outcome: "Presença digital orientada a vendas em volume",
    description:
      "Site institucional com foco em catálogo, atacado e contato comercial.",
    details:
      "Organiza produtos e facilita consultas comerciais para compras em volume.",
    tags: ["Next.js", "E-commerce", "Performance", "B2B"],
    url: "https://bcdistributor.vercel.app/",
  },
  {
    slug: "achei-studios",
    group: "Sites",
    title: "Achei Studios",
    category: "Marketplace audiovisual",
    year: "2026",
    outcome: "Busca estruturada de estúdios e recursos",
    description:
      "Marketplace para encontrar estúdios, equipamentos e espaços audiovisuais.",
    details:
      "Experiência focada em descoberta rápida, organização de inventário e expansão futura.",
    tags: ["Frontend", "Marketplace", "UX", "Branding"],
    url: "https://acheistudios.com",
  },
  {
    slug: "experts-marketing",
    group: "Sites",
    title: "Experts Marketing",
    category: "Landing page",
    year: "2026",
    outcome: "Apresentação clara e geração de contato",
    description:
      "Landing page para comunidade de marketing digital e IA.",
    details:
      "Estrutura direta com foco em leitura rápida, entendimento e ação.",
    tags: ["Landing Page", "CRO", "React", "Performance"],
    url: "https://expertsmarketingdigital-landingpage.vercel.app/",
  },
  {
    slug: "lucinei-m-campos",
    group: "Sites",
    title: "Lucinei M. Campos",
    category: "Autoridade literária",
    year: "2026",
    outcome: "Organização de obra, eventos e contato",
    description:
      "Site institucional para escritor com foco em conteúdo e relacionamento.",
    details:
      "Facilita o contato com escolas, leitores e organizadores.",
    tags: ["Website", "SEO", "Conteúdo", "Vercel"],
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
    name: "Node.js",
    category: "Backend",
    logo: technologyIcon("nodedotjs", "5FA04E"),
    detail: "Construção de APIs e serviços escaláveis.",
  },
  {
    name: "Express",
    category: "Backend",
    logo: technologyIcon("express", "000000"),
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

  // Cloud
  {
    name: "Vercel",
    category: "Cloud",
    logo: technologyIcon("vercel", "000000"),
    detail: "Deploy e infraestrutura para aplicações modernas.",
  },
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

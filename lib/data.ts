export const profile = {
  name: "Pedro Tortoriello",
  initials: "PT",
  role: "Engenheiro de Software Full Stack",
  location: "Sao Paulo, Brasil",
  email: "pedrooofreitas@gmail.com",
  whatsapp: "https://wa.me/5511942716215",
  availability: "Projetos seletivos, SaaS e sistemas sob medida",
  headline: "Construo produtos digitais que parecem premium e operam como software serio.",
  summary:
    "Atuo do posicionamento ao deploy: interface, arquitetura, automacao, APIs e performance. O foco e transformar ideias em sistemas claros, escalaveis e prontos para vender.",
  heroImage:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=85",
  aboutImage:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
  stats: [
    { value: "5 anos", label: "entregando produtos digitais" },
    { value: "8+", label: "projetos publicados" },
    { value: "Full stack", label: "produto, API e automacao" },
  ],
  proof: [
    "Sistemas com agenda, financeiro, dashboards e operacao diaria",
    "Landing pages e sites pensados para captacao e autoridade",
    "Integrações com APIs, automacoes e bases prontas para escala",
  ],
} as const;

export const differentiators = [
  {
    title: "Produto antes de tela",
    text: "Cada decisao visual precisa sustentar conversao, confianca e clareza operacional.",
  },
  {
    title: "Arquitetura que aguenta evolucao",
    text: "Estruturo front-end, back-end e dados para crescer sem virar retrabalho a cada nova feature.",
  },
  {
    title: "Execucao com acabamento",
    text: "Entrego interfaces rapidas, responsivas e consistentes, com movimento usado apenas onde aumenta percepcao de valor.",
  },
] as const;

export const projects = [
  {
    slug: "exo-clinic",
    group: "Sistemas",
    title: "Exo Clinic",
    category: "SaaS para saude",
    year: "2026",
    outcome: "Agenda, pacientes e financeiro em uma unica operacao",
    description:
      "Plataforma para clinicas e consultorios com gestao de agenda, pacientes, equipe, procedimentos e financeiro.",
    details:
      "O produto reduz processos manuais e concentra a rotina da clinica em uma experiencia rapida para recepcao, medicos e administradores.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Dashboards"],
    image:
      "https://image.thum.io/get/width/900/crop/600/noanimate/https://exo-clinic.exocompany.com.br/login",
    icon: "https://www.google.com/s2/favicons?domain=exo-clinic.exocompany.com.br&sz=128",
    url: "https://exo-clinic.exocompany.com.br/login",
  },
  {
    slug: "exo-barber",
    group: "Sistemas",
    title: "Exo Barber",
    category: "Gestao para barbearias",
    year: "2026",
    outcome: "Leitura rapida de caixa, equipe e indicadores",
    description:
      "Dashboard de gestao para barbearias com acompanhamento centralizado do negocio, profissionais e desempenho.",
    details:
      "A solucao ajuda donos de barbearia a entender rotina, agenda e margem com menos planilhas e mais visibilidade.",
    tags: ["React", "TypeScript", "Supabase", "Analytics"],
    image:
      "https://image.thum.io/get/width/900/crop/600/noanimate/https://exo-barber.exocompany.com.br",
    icon: "https://www.google.com/s2/favicons?domain=exo-barber.exocompany.com.br&sz=128",
    url: "https://exo-barber.exocompany.com.br/",
  },
  {
    slug: "orion-leads",
    group: "Sistemas",
    title: "Orion Leads",
    category: "Prospeccao B2B",
    year: "2026",
    outcome: "Automacao comercial com posicionamento de produto",
    description:
      "Ferramenta para prospeccao B2B com foco em escala comercial, leitura de funil e acao rapida.",
    details:
      "O projeto comunica velocidade, confianca e ganho operacional para empresas que precisam vender com mais previsibilidade.",
    tags: ["React", "Automation", "B2B", "Sales Ops"],
    image:
      "https://image.thum.io/get/width/900/crop/600/noanimate/https://orion-leads.vercel.app",
    icon: "https://www.google.com/s2/favicons?domain=orion-leads.vercel.app&sz=128",
    url: "https://orion-leads.vercel.app/",
  },
  {
    slug: "bc-distributor",
    group: "Sites",
    title: "BC Distributor",
    category: "Wholesale beauty",
    year: "2026",
    outcome: "Catalogo B2B com navegacao mais comercial",
    description:
      "Presenca digital para distribuidora de beauty supply, orientada a catalogo, atacado e conversao.",
    details:
      "O site organiza descoberta, produtos e contato comercial com uma experiencia mais forte para compras em volume.",
    tags: ["Next.js", "E-commerce", "Performance", "B2B"],
    image:
      "https://image.thum.io/get/width/900/crop/600/noanimate/https://bcdistributor.vercel.app",
    icon: "https://www.google.com/s2/favicons?domain=bcdistributor.vercel.app&sz=128",
    url: "https://bcdistributor.vercel.app/",
  },
  {
    slug: "achei-studios",
    group: "Sites",
    title: "Achei Studios",
    category: "Marketplace audiovisual",
    year: "2026",
    outcome: "Descoberta de estudios, sets e recursos de producao",
    description:
      "Marketplace para encontrar equipamentos, estudios de fotografia, sets, podcasts e recursos audiovisuais.",
    details:
      "A experiencia foi pensada para descoberta rapida, leitura clara do inventario e expansao futura de categorias.",
    tags: ["Frontend", "Motion", "Marketplace", "Branding"],
    image:
      "https://image.thum.io/get/width/900/crop/600/noanimate/https://acheistudios.com",
    icon: "https://www.google.com/s2/favicons?domain=acheistudios.com&sz=128",
    url: "https://acheistudios.com",
  },
  {
    slug: "experts-marketing",
    group: "Sites",
    title: "Experts Marketing",
    category: "Landing page",
    year: "2026",
    outcome: "Entrada clara para comunidade e conteudo pratico",
    description:
      "Landing page para comunidade de marketing digital, IA e crescimento com jornada simples de conversao.",
    details:
      "A pagina organiza proposta, ritmo de leitura e chamada para acao para trafego frio e mobile.",
    tags: ["Landing Page", "CRO", "React", "Performance"],
    image:
      "https://image.thum.io/get/width/900/crop/600/noanimate/https://expertsmarketingdigital-landingpage.vercel.app",
    icon: "https://www.google.com/s2/favicons?domain=expertsmarketingdigital-landingpage.vercel.app&sz=128",
    url: "https://expertsmarketingdigital-landingpage.vercel.app/",
  },
  {
    slug: "lucinei-m-campos",
    group: "Sites",
    title: "Lucinei M. Campos",
    category: "Autoridade literaria",
    year: "2026",
    outcome: "Livros, eventos, blog e contato institucional",
    description:
      "Site oficial para escritor e professor, com foco em obra, eventos escolares, blog e relacionamento institucional.",
    details:
      "A presenca digital conecta leitores, escolas e organizadores com uma narrativa editorial mais organizada.",
    tags: ["Website", "SEO", "Conteudo", "Vercel"],
    image:
      "https://image.thum.io/get/width/900/crop/600/noanimate/https://lucineimcampos.vercel.app",
    icon: "https://www.google.com/s2/favicons?domain=lucineimcampos.vercel.app&sz=128",
    url: "https://lucineimcampos.vercel.app/",
  },
] as const;

export const technologies = [
  {
    name: "Next.js",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    detail: "App Router, performance, SSR e arquitetura de produto.",
  },
  {
    name: "React",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    detail: "Interfaces ricas, estados complexos e componentes reutilizaveis.",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    detail: "Base mais segura para times, features e manutencao.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    detail: "Design system rapido sem abrir mao de consistencia.",
  },
  {
    name: "Node.js",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    detail: "APIs, integracoes e regras de negocio prontas para escala.",
  },
  {
    name: "PostgreSQL",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    detail: "Modelagem de dados confiavel para SaaS e dashboards.",
  },
  {
    name: "Supabase",
    category: "Backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    detail: "Autenticacao, dados em tempo real e backoffice rapido.",
  },
  {
    name: "Automation",
    category: "Operacao",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
    detail: "Fluxos com APIs, dados e IA para reduzir trabalho manual.",
  },
  {
    name: "Figma",
    category: "Design",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    detail: "Prototipacao, direcao visual e sistemas de componentes.",
  },
] as const;

export const process = [
  {
    title: "Diagnostico",
    text: "Mapeio oferta, publico, operacao e pontos de atrito antes de propor qualquer tela.",
  },
  {
    title: "Arquitetura",
    text: "Defino fluxos, dados, componentes e integracoes para evitar retrabalho no meio do projeto.",
  },
  {
    title: "Entrega",
    text: "Implemento, valido responsividade, performance, SEO tecnico e caminho de conversao.",
  },
] as const;

export const differentiators = [
  "Transformo interface em percepção de valor imediato.",
  "Projeto jornadas que combinam clareza, autoridade e conversão.",
  "Uno direção visual, performance e execução técnica no mesmo padrão.",
] as const;

export const projects = [
  {
    slug: "exo-clinic",
    type: "system",
    title: "Exo Clinic",
    category: "SaaS & Healthcare",
    description:
      "SaaS para clínicas e consultórios com agenda, pacientes, equipe, procedimentos e financeiro em uma operação unificada.",
    summary:
      "Uma operação clínica centralizada em uma interface mais confiável, limpa e preparada para reduzir fricção no dia a dia da equipe.",
    metrics: ["Agenda", "Pacientes", "Financeiro"],
    tags: ["Next.js", "Node.js", "Arquitetura SaaS", "Dashboards"],
    accent:
      "from-[rgba(0,194,122,0.22)] via-[rgba(212,175,55,0.08)] to-transparent",
    challenge:
      "Clinicas sofriam com processos manuais fragmentados, risco de perda de dados e sistemas legados que deixavam a operacao lenta.",
    solution:
      "Desenvolvi uma arquitetura moderna focada em UX rapida para medicos e recepcionistas, com leitura de dados em tempo real e fluxos protegidos.",
    stack: ["Next.js", "Node.js", "Tailwind", "PostgreSQL"],
    impact: [
      "Reducao drastica no tempo de agendamento e onboarding",
      "Gestao de dados de pacientes unificada e segura",
      "Percepcao de alto valor tecnologico pelos usuarios da clinica",
    ],
    url: "https://exo-clinic.exocompany.com.br/login",
    status: "live",
  },
  {
    slug: "exo-barber",
    type: "system",
    title: "Exo Barber Dashboard",
    category: "Barbershop Management",
    description:
      "Dashboard de gestão para barbearias com foco em operação, leitura rápida de desempenho e acompanhamento centralizado do negócio.",
    summary:
      "Um painel operacional pensado para acompanhar fluxo de caixa, performance da equipe e indicadores do negócio com leitura direta.",
    metrics: ["Gestao", "Equipe", "Indicadores"],
    tags: ["React", "Supabase", "Analytics", "SaaS"],
    accent:
      "from-[rgba(212,175,55,0.18)] via-[rgba(0,194,122,0.08)] to-transparent",
    challenge:
      "A falta de visibilidade sobre as metricas diarias impedia donos de barbearias de tomarem decisoes taticas baseadas em dados reais.",
    solution:
      "Criei paineis interativos de leitura rapida, destacando gargalos na operacao, picos de atendimento e faturamento de forma instantanea.",
    stack: ["React", "TypeScript", "Supabase", "Tailwind"],
    impact: [
      "Leitura de margem de lucro acelerada",
      "Otimizacao no controle de agendas dos profissionais",
      "Interface fluida que reduz a curva de aprendizado",
    ],
    url: "https://exo-barber.exocompany.com.br/",
    status: "live",
  },
  {
    slug: "orion-leads",
    type: "system",
    title: "Orion Leads",
    category: "B2B Prospecting Platform",
    description:
      "Plataforma de prospecção B2B com automação comercial e posicionamento voltado para aumento de vendas com IA.",
    summary:
      "Uma ferramenta comercial desenhada para colocar a prospecção em piloto automático e escalar fechamentos com mais previsibilidade.",
    metrics: ["Prospeccao", "Automacao", "Escala"],
    tags: ["React", "Automation", "B2B", "Sales Ops"],
    accent:
      "from-[rgba(212,175,55,0.22)] via-[rgba(241,209,122,0.08)] to-transparent",
    challenge:
      "O produto precisava transmitir velocidade comercial e confianca operacional sem parecer uma ferramenta genérica.",
    solution:
      "A interface foi desenhada para reforcar foco em performance comercial, clareza de acao e leitura mais objetiva do processo de prospeccao.",
    stack: ["React", "Automation", "API Integration", "Motion"],
    impact: [
      "Posicionamento mais forte para vendas B2B",
      "Narrativa clara de automacao comercial",
      "Percepcao de produto mais maduro e escalavel",
    ],
    url: "https://orion-leads.vercel.app/",
    status: "live",
  },
  {
    slug: "synfau",
    type: "system",
    title: "Synfau",
    category: "Web Application",
    description:
      "Aplicacao web em construcao com base pensada para crescimento, modularidade e novas integracoes.",
    summary:
      "Uma fundacao de produto desenhada para crescer com consistencia, mantendo espaco para evolucao funcional e expansao tecnica.",
    metrics: ["Arquitetura", "Escala", "Em dev"],
    tags: ["Next.js", "Full Stack", "Arquitetura", "Vercel"],
    accent:
      "from-[rgba(0,194,122,0.16)] via-[rgba(212,175,55,0.08)] to-transparent",
    challenge:
      "Projetar a base de um sistema robusto que precisa ser rapido agora e flexivel para os requisitos do futuro.",
    solution:
      "Aplicacao de padroes de engenharia de software rigorosos, preparando o terreno com Next.js para renderizacao hibrida.",
    stack: ["Next.js", "TypeScript", "Frontend Engineering", "Vercel"],
    impact: [
      "Reducao de debito tecnico antes mesmo do lancamento",
      "Ambiente preparado para iteracoes ageis",
    ],
    url: "https://synfau.vercel.app/",
    status: "development",
  },
  {
    slug: "bc-distributor",
    type: "website",
    title: "BC Distributor",
    category: "Wholesale Beauty Website",
    description:
      "Plataforma wholesale para distribuição de beauty supply, orientada a catálogo, navegação comercial e conversão em contexto B2B.",
    summary:
      "Uma experiencia de atacado digital criada para sustentar catalogo, navegacao comercial e percepcao de marca mais forte no segmento de beleza.",
    metrics: ["Catalogo", "B2B", "Performance"],
    tags: ["Next.js", "E-commerce", "API", "Performance"],
    accent:
      "from-[rgba(0,194,122,0.18)] via-[rgba(212,175,55,0.1)] to-transparent",
    challenge:
      "O catalogo antigo era pesado e nao transmitia o posicionamento premium exigido para compras em grande volume.",
    solution:
      "Refiz o ecossistema focando em carregamento rapido e interfaces sofisticadas, otimizando o fluxo de pedido atacadista.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Payment Integration"],
    impact: [
      "Aumento significativo na taxa de conversao",
      "Navegacao fluida mesmo em dispositivos moveis",
      "Estetica alinhada ao alto padrao do nicho de beleza",
    ],
    url: "https://bcdistributor.vercel.app/",
    status: "live",
  },
  {
    slug: "achei-studios",
    type: "website",
    title: "Achei Studios",
    category: "Audiovisual Marketplace",
    description:
      "Marketplace do audiovisual para encontrar equipamentos, estúdios de fotografia, sets, podcasts e outros recursos de produção.",
    summary:
      "Uma plataforma de descoberta para o mercado audiovisual, conectando estrutura, espaco e recursos de producao em uma unica experiencia digital.",
    metrics: ["Marketplace", "Descoberta", "Branding"],
    tags: ["Frontend", "Motion", "Marketplace", "Branding"],
    accent:
      "from-[rgba(212,175,55,0.18)] via-[rgba(0,194,122,0.1)] to-transparent",
    challenge:
      "A proposta precisava comunicar variedade e posicionamento sem perder clareza de navegacao.",
    solution:
      "Estruturei a experiencia para priorizar descoberta, percepcao de marca e leitura limpa dos recursos disponiveis.",
    stack: ["React", "Motion", "Tailwind", "Frontend Architecture"],
    impact: [
      "Posicionamento mais forte para o mercado audiovisual",
      "Experiencia de exploracao mais fluida",
      "Base visual preparada para expansao de inventario",
    ],
    url: "https://acheistudios.com",
    status: "live",
  },
  {
    slug: "experts-marketing",
    type: "website",
    title: "Experts Marketing",
    category: "Community Landing Page",
    description:
      "Landing page para comunidade de marketing digital, IA e crescimento, com proposta de entrada simples, troca real e direção prática.",
    summary:
      "Uma pagina construida para tornar o aprendizado no digital mais leve, confiavel e organizado desde o primeiro contato.",
    metrics: ["Comunidade", "Conversao", "Mobile"],
    tags: ["Landing Page", "CRO", "Performance", "React"],
    accent:
      "from-[rgba(0,194,122,0.22)] via-[rgba(241,209,122,0.08)] to-transparent",
    challenge:
      "A pagina precisava acolher, organizar a proposta e ainda converter com rapidez em trafego frio.",
    solution:
      "Trabalhei copy, ritmo e interface para criar uma experiencia simples de entrar, clara de entender e forte na proposta de valor.",
    stack: ["React", "Tailwind CSS", "Optimization", "Vercel"],
    impact: [
      "Leitura de proposta de valor clara e sem distracoes",
      "Performance consistente para campanhas",
      "Experiencia mais confiavel do começo ao fim",
    ],
    url: "https://expertsmarketingdigital-landingpage.vercel.app/",
    status: "live",
  },
  // {
  //   slug: "dr-jefferson-neves",
  //   type: "website",
  //   title: "Dr. Jefferson Neves",
  //   category: "Medical Authority Website",
  //   description:
  //     "Presença digital para odontologia com foco em cuidado, estética, confiança e captação de pacientes em Joinville/SC.",
  //   summary:
  //     "Uma experiencia que traduz cuidado clinico, exigencia estetica e confianca em uma jornada digital mais humana e convincente.",
  //   metrics: ["Autoridade", "SEO local", "Confianca"],
  //   tags: ["Next.js", "Healthcare", "SEO", "UI/UX"],
  //   accent:
  //     "from-[rgba(212,175,55,0.16)] via-[rgba(0,194,122,0.08)] to-transparent",
  //   challenge:
  //     "Transmitir excelencia medica no ambiente digital, superando templates genericos que nao geram autoridade.",
  //   solution:
  //     "Desenvolvi uma interface sobria e elegante, focada em prova social, tratamento estético e facilidade de agendamento.",
  //   stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  //   impact: [
  //     "Posicionamento digital premium em saude",
  //     "Estrutura otimizada para buscas locais",
  //   ],
  //   url: "https://drjeffersoneves.vercel.app/",
  //   status: "development",
  // },
  {
    slug: "lucinei-m-campos",
    type: "website",
    title: "Lucinei M. Campos",
    category: "Literary Authority Website",
    description:
      "Site oficial para escritor e professor, com foco em livros, trajetoria autoral, eventos escolares, blog e contato institucional.",
    summary:
      "Uma presenca digital literaria criada para conectar obra, autoridade pedagogica e convites para escolas, feiras e projetos culturais.",
    metrics: ["Livros", "Eventos", "Blog"],
    tags: ["Website Institucional", "SEO", "Content Strategy", "Vercel"],
    accent:
      "from-[rgba(212,175,55,0.2)] via-[rgba(0,194,122,0.08)] to-transparent",
    challenge:
      "Organizar a presenca publica de um autor independente sem reduzir sua trajetoria a uma pagina estatica ou a um catalogo simples de livros.",
    solution:
      "Estruturei uma experiencia editorial com navegacao clara, destaque para obras, eventos, blog e pontos de contato para aproximar leitores, escolas e organizadores.",
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    impact: [
      "Narrativa autoral mais clara para leitores e instituicoes",
      "Fluxo direto para conhecer livros, eventos e visitas escolares",
      "Base institucional preparada para SEO e conteudo recorrente",
    ],
    url: "https://lucineimcampos.vercel.app/",
    status: "live",
  },
] as const;

export const technologies = [
  {
    name: "Next.js",
    category: "Core",
    level: 95,
    detail: "Arquitetura moderna, App Router e performance real.",
  },
  {
    name: "React",
    category: "Core",
    level: 94,
    detail: "Interfaces complexas com alto controle de estado e fluidez.",
  },
  {
    name: "TypeScript",
    category: "Production",
    level: 92,
    detail: "Base segura para produtos serios e evolutivos.",
  },
  {
    name: "Tailwind",
    category: "Advanced",
    level: 90,
    detail: "Velocidade visual sem perder acabamento de alto padrao.",
  },
  {
    name: "Motion",
    category: "Interaction",
    level: 88,
    detail: "Microinteracoes, storytelling e ritmo cinematografico.",
  },
  {
    name: "Node.js",
    category: "Production",
    level: 86,
    detail: "Backends e integracoes preparados para escala.",
  },
  {
    name: "Automation",
    category: "Automation",
    level: 84,
    detail: "Fluxos inteligentes com foco em ganho operacional.",
  },
  {
    name: "Figma",
    category: "Interface",
    level: 89,
    detail: "Sistemas visuais e prototipacao de alta fidelidade.",
  },
] as const;

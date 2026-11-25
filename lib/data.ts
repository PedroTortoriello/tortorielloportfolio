// Everything on the page comes from Pedro's CV, his own words for this site, or
// the project repositories. Nothing here is a metric or claim that cannot be
// traced back to one of them.

export const profile = {
  name: "Pedro Tortoriello",
  fullName: "Pedro Gabriel de Freitas Tortoriello",
  initials: "PT",
  role: "Software Engineer",
  focus: "Full Stack Development & Automation",
  country: "Brazil",
  city: "São Paulo",
  timeZone: "America/Sao_Paulo",
  since: 2021,
  email: "pedrooofreitas@gmail.com",
  linkedin: "https://www.linkedin.com/in/pedro-tortoriello/",
  linkedinHandle: "in/pedro-tortoriello",
  github: "https://github.com/PedroTortoriello",
  githubHandle: "PedroTortoriello",
  whatsapp: "https://wa.me/5511942716215",
  whatsappLabel: "+55 11 94271-6215",
  // The résumé is printed from /cv (scripts/cv-pdf.mjs), so it always matches this file.
  // The older Portuguese PDF (no Bradesco or Maximum roles yet) is kept for the Portuguese site.
  cv: "/cv-pedro-tortoriello-en.pdf",
  cvLang: "EN",
  cvPt: "/cv-pedro-tortoriello.pdf",
  cvPtLang: "PT-BR",
  // The CV's opening lines, built only from claims made elsewhere on the site (intro, experience).
  summary:
    "Software engineer building scalable applications, intelligent automation systems and high-performance digital experiences: web apps, APIs, integrations, automations and applied AI. Since 2021: client work and my own products, then teams in Brazil and remote roles with US-based teams, working in English.",
} as const;

export const hero = {
  headline: ["The future doesn't happen", "to us. We engineer it."],
  support: ["Building intelligent systems.", "Engineering digital experiences."],
  left: ["Full Stack Engineer", "Software Architecture"],
  right: "Brazil · Working worldwide",
} as const;

export const intro = {
  statement: "I don't just build software. I engineer solutions that move businesses forward.",
  body: "I'm Pedro Tortoriello, a software engineer focused on building scalable applications, intelligent automation systems and high-performance digital experiences.",
} as const;

// Header navigation (the reference's top-right links).
export const nav = [
  { id: "work", href: "/#work", label: "Work" },
  { id: "intro", href: "/#intro", label: "Intro" },
  { id: "skills", href: "/#skills", label: "Skills" },
  { id: "contact", href: "/#contact", label: "Contact" },
] as const;

// The floating dock walks the whole page, in page order.
export const dock = [
  { id: "top", label: "Home", icon: "home" },
  { id: "intro", label: "Intro", icon: "user" },
  { id: "work", label: "Work", icon: "cubes" },
  { id: "skills", label: "Skills", icon: "tools" },
  { id: "experience", label: "Experience", icon: "path" },
  { id: "contact", label: "Contact", icon: "signal" },
] as const;

export type DockIcon = (typeof dock)[number]["icon"];

export type SkillGroup = { index: string; title: string; items: string[] };

export const skills: SkillGroup[] = [
  // Pedro's English CV (Nov 2026) plus the Bradesco Private Bank stack he named (NestJS, Java, Spring Boot, microservices).
  {
    index: "01",
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "React Native",
      "Tailwind CSS",
      "HTML / CSS",
      "Design Systems",
      "Jest · Cypress",
    ],
  },
  {
    index: "02",
    title: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Java",
      "Spring Boot",
      "Python",
      "REST · GraphQL",
      "Microservices",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "System Architecture",
    ],
  },
  {
    index: "03",
    title: "Automation & AI",
    items: ["n8n", "Make", "Zapier", "OpenAI API", "AI Agents", "AI Integrations", "Webhooks", "Workflow Engineering"],
  },
  {
    index: "04",
    title: "Infrastructure",
    items: [
      "AWS",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD · GitHub Actions",
      "Vercel",
      "Redis",
      "Git",
      "Database Design",
    ],
  },
];

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  start: number;
  place: string;
  remote: boolean;
  usTeam?: boolean;
  current?: boolean;
  // optional: a role with nothing verified to say yet shows only its title, place and dates
  summary?: string;
  tech?: string[];
};

// Dates and responsibilities from the CV; titles as Pedro states them for this site
// (seniority updated by Pedro on 2026-11-24: Four intern, 1 Call Closers and Addon mid-level, Maximum senior; on 2026-11-25 Bradesco became the engineer title and Maximum the developer one).
// Bradesco Private Bank and Maximum Marketing are newer than the CV: Pedro gave their
// titles, start months (October and May 2026) and places on 2026-11-24. Maximum's
// summary repeats only what the CadenceFlow and automation cases already verify.
// Bradesco's summary and stack come from the role's job description, which Pedro
// shared the same day (its key responsibilities and required tools, not the nice-to-haves),
// plus Java, Spring Boot and microservices, which Pedro added.
export const experience: Experience[] = [
  {
    id: "bradesco",
    company: "Bradesco Private Bank",
    role: "Senior Software Engineer",
    period: "2026 — Now",
    start: 2026,
    place: "Remote · Miami, US",
    remote: true,
    usTeam: true,
    current: true,
    summary:
      "The bank's middleware platform: designing and maintaining scalable microservices in Node.js (NestJS) and Java (Spring Boot), REST APIs secured with OAuth2, JWT and OIDC, and messaging between services, with code review and troubleshooting. Working in English with the bank's team.",
    tech: ["Node.js", "NestJS", "Java", "Spring Boot", "Microservices", "TypeScript", "React", "Docker", "OAuth2 / OIDC"],
  },
  {
    id: "maximum",
    company: "Maximum Marketing",
    role: "Senior Software Developer",
    period: "2026 — Now",
    start: 2026,
    place: "Remote · Brazil",
    remote: true,
    current: true,
    summary:
      "Co-developer of the agency's own products: CadenceFlow, a multi-tenant prospecting platform (the LinkedIn module, the official WhatsApp integration, team seats and permissions), and Agente SDR, its SDR agent (my parts: the WhatsApp ingress and the outbound router). Landing pages and sites for the agency's clients, too.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Meta Cloud API", "Astro"],
  },
  {
    id: "addon",
    company: "Addon Software",
    role: "Mid-level Software Engineer",
    period: "2025 — 2026",
    start: 2025,
    place: "Remote · Brazil",
    remote: true,
    summary:
      "End-to-end platform features in TypeScript, Node.js and REST APIs. Business and product requirements turned into technical scope with the team, production support through log analysis, troubleshooting and incident fixes, and continuous refactoring under code review.",
    tech: ["TypeScript", "Node.js", "REST APIs", "Git"],
  },
  {
    id: "1callclosers",
    company: "1 Call Closers / V Shred",
    role: "Mid-level Software Engineer",
    period: "2025",
    start: 2025,
    place: "Remote · California, US",
    remote: true,
    usTeam: true,
    summary:
      "Web applications in Next.js, React, TypeScript and Node.js on top of third-party REST APIs, and automations across platforms with n8n, Zapier and Make that removed manual work from sales, scheduling and operational reporting. A fully remote, distributed US team, working in English.",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "n8n", "Zapier", "Make"],
  },
  {
    id: "four",
    company: "Four",
    role: "Software Development Intern",
    period: "2023 — 2024",
    start: 2023,
    place: "Indaiatuba · Brazil",
    remote: false,
    summary:
      "Responsive interfaces in React, Next.js and Tailwind CSS, back-end services in Node.js, MongoDB and REST APIs, and integrations between corporate systems, from validation and testing to support. Scrum and Kanban, with code review on GitHub.",
    tech: ["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
  },
  {
    id: "independent",
    company: "Independent Engineering",
    role: "Full Stack Development & Digital Products",
    period: "2021 — Now",
    start: 2021,
    place: "Remote · Worldwide",
    remote: true,
    current: true,
    summary:
      "Web applications for clients and my own products, from requirements and architecture to release, documentation and post-launch support: SaaS and back-office interfaces, role-based access in the UI and the API, payments, applied AI and a shared component library.",
    tech: ["React", "Next.js", "TypeScript", "Supabase", "Stripe", "AI"],
  },
];

export const education = {
  course: "Systems Analysis and Development",
  school: "FACENS · Centro Universitário Facens",
  place: "Sorocaba · Brazil",
} as const;

export type Recommendation = {
  quote: string;
  name: string;
  role: string;
  company: string;
  relation: string; // as LinkedIn states it ("managed Pedro directly")
  date?: string;
  url?: string; // the recommendation or the recommender's profile
  lang?: string; // the quote's language when it is not English ("pt-BR"); it is never translated
};

// Recommendations, pasted word for word from Pedro's LinkedIn. Never invented, edited or
// paraphrased. The section renders nothing while this is empty.
export const recommendations: Recommendation[] = [];

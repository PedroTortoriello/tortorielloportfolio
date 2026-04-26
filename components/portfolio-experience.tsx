import Link from "next/link";

import {
  differentiators,
  process as deliveryProcess,
  profile,
  projects,
  technologies,
} from "@/lib/data";

type Project = (typeof projects)[number];
type Technology = (typeof technologies)[number];

const heroStats = [
  { value: profile.stats[0].value, label: "experiência aplicada" },
  { value: profile.stats[1].value, label: "projetos publicados" },
  { value: profile.stats[2].value, label: "produto, dados e automação" },
  { value: "SP / BR", label: "base operacional" },
];

const marqueeItems = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "SaaS",
  "IA & Automação",
  "Scraping",
  "Supabase",
  "Tailwind CSS",
  "B2B Leads",
  "Performance",
  "Arquitetura",
];

const groupedTechnologies = technologies.reduce<Record<string, Technology[]>>(
  (accumulator, technology) => {
    if (!accumulator[technology.category]) {
      accumulator[technology.category] = [];
    }

    accumulator[technology.category].push(technology);
    return accumulator;
  },
  {},
);

const featuredProject = projects[0];
const secondaryProjects = projects.slice(1, 7);

const proofHighlights = [
  {
    title: "Produtos em operação real",
    text: profile.proof[0],
  },
  {
    title: "Presença digital com intenção comercial",
    text: profile.proof[1],
  },
  {
    title: "Integrações e evolução contínua",
    text: profile.proof[2],
  },
  {
    title: "Entrega ponta a ponta",
    text: profile.summary,
  },
];

const projectAccents = [
  "from-sky-500/20 via-sky-500/10 to-transparent",
  "from-violet-500/20 via-violet-500/10 to-transparent",
  "from-cyan-500/20 via-cyan-500/10 to-transparent",
  "from-fuchsia-500/20 via-fuchsia-500/10 to-transparent",
  "from-indigo-500/20 via-indigo-500/10 to-transparent",
  "from-blue-500/20 via-blue-500/10 to-transparent",
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)] shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-[image:var(--brand-gradient)]" />
      {children}
    </div>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex w-full items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <Link
            href="#hero"
            className="group flex items-center gap-2 text-sm font-extrabold tracking-[-0.05em] text-[var(--foreground)]"
          >
            <span className="transition-colors duration-200 group-hover:text-[var(--muted-foreground)]">
              PT
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[image:var(--brand-gradient)]" />
          </Link>

          <nav className="hidden items-center gap-1 text-sm text-[var(--muted-foreground)] md:flex">
            {[
              { href: "#experiencia", label: "Experiência" },
              { href: "#projetos", label: "Projetos" },
              { href: "#stack", label: "Skills" },
              { href: "#contato", label: "Contato" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 transition-colors duration-200 hover:bg-[var(--surface-strong)] hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#contato"
            className="hidden rounded-full bg-[image:var(--brand-gradient)] px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(56,189,248,0.2)] transition-transform duration-200 hover:scale-[1.02] md:inline-flex"
          >
            Fale comigo
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-20"
    >
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />
      <div className="hero-grid absolute inset-0 opacity-60" />

      <div className="relative mx-auto w-full max-w-5xl text-center">
        <div className="animate-fade-up">
          <SectionEyebrow>Engenharia de Software & Automação</SectionEyebrow>
        </div>

        <div className="mt-8 animate-fade-up [animation-delay:120ms]">
          <h1 className="text-[clamp(3.2rem,8vw,6.1rem)] font-extrabold leading-[0.98] tracking-[-0.06em] text-[var(--foreground)]">
            Pedro{" "}
            <span className="bg-[image:var(--brand-gradient)] bg-clip-text text-transparent">
              Tortoriello
            </span>
          </h1>
        </div>

        <p className="mt-5 animate-fade-up text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted-foreground)] [animation-delay:220ms]">
          {profile.role}
        </p>

        <p className="mx-auto mt-8 max-w-3xl animate-fade-up text-lg leading-8 text-[var(--muted-foreground)] [animation-delay:320ms] md:text-xl">
          {profile.summary} <span className="text-[var(--foreground)]">Não é o código. São as decisões.</span>
        </p>

        <div className="mt-10 flex animate-fade-up flex-wrap items-center justify-center gap-3 [animation-delay:420ms]">
          <Link
            href="#projetos"
            className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--brand-gradient)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(56,189,248,0.2)] transition-transform duration-200 hover:scale-[1.02]"
          >
            Ver projetos
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          <Link
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/5 px-6 py-3.5 text-sm font-medium text-[var(--foreground)] shadow-[0_14px_34px_rgba(0,0,0,0.4)] transition-colors duration-200 hover:bg-white/10"
          >
            Conversar no WhatsApp
          </Link>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl animate-fade-up grid-cols-2 gap-6 [animation-delay:520ms] md:grid-cols-4">
          {heroStats.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="text-2xl font-extrabold tracking-[-0.05em] text-[var(--foreground)]">
                {item.value}
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-[-3rem] left-1/2 hidden -translate-x-1/2 md:block">
          <div className="scroll-indicator h-12 w-px bg-[linear-gradient(to_bottom,transparent,var(--primary),transparent)]" />
        </div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden border-y border-[var(--border)] bg-black/20 py-5 backdrop-blur">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--background)] to-transparent" />

      <div className="marquee-track flex min-w-max items-center gap-10">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-3 text-sm text-[var(--muted-foreground)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--border-strong)]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="experiencia" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="section-card p-8 md:p-10">
            <SectionEyebrow>Experiência</SectionEyebrow>

            <h2 className="mt-6 max-w-2xl text-3xl font-extrabold tracking-[-0.05em] text-[var(--foreground)] md:text-5xl">
              Arquitetura sólida, automação inteligente e foco em conversão B2B.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] md:text-lg">
              {profile.headline} Com vivência profunda nos ecossistemas React e Node.js, construo sistemas que não apenas funcionam, mas escalam. O objetivo final é sempre resolver problemas complexos com eficiência: seja estruturando dados, integrando fluxos operacionais ou desenhando interfaces de alta performance.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {proofHighlights.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.3)]"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                    0{index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <article className="section-card p-8">
              <SectionEyebrow>Como eu trabalho</SectionEyebrow>

              <div className="mt-6 space-y-5">
                {deliveryProcess.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-[1.5rem] border border-[var(--border)] bg-white/5 p-5"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-strong)] text-sm font-semibold text-[var(--primary)]">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="section-card relative overflow-hidden p-8">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-sky-500/20 via-violet-500/10 to-transparent" />
              <SectionEyebrow>Diferenciais</SectionEyebrow>

              <div className="mt-6 space-y-5">
                {differentiators.map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-[var(--border)] bg-white/5 p-5">
                    <h3 className="text-base font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="section-card relative overflow-hidden p-8 md:p-10">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-sky-500/20 via-violet-500/15 to-transparent" />

      <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <SectionEyebrow>Projeto em Destaque</SectionEyebrow>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
            <span className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1">
              {project.group}
            </span>
            <span>{project.category}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />
            <span>{project.year}</span>
          </div>

          <h3 className="mt-5 text-3xl font-extrabold tracking-[-0.05em] text-[var(--foreground)] md:text-4xl">
            {project.title}
          </h3>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] md:text-lg">
            {project.description}
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">
            {project.details}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1.5 text-xs font-medium text-[var(--muted-foreground)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_20px_44px_rgba(0,0,0,0.4)]">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
            Impacto
          </div>
          <p className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            {project.outcome}
          </p>

          <div className="mt-8 space-y-3">
            {project.modules.map((moduleName) => (
              <div
                key={moduleName}
                className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/5 px-4 py-3 text-sm text-[var(--muted-foreground)]"
              >
                <span className="h-2 w-2 rounded-full bg-[image:var(--brand-gradient)]" />
                {moduleName}
              </div>
            ))}
          </div>

          <Link
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[image:var(--brand-gradient)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(56,189,248,0.2)] transition-transform duration-200 hover:scale-[1.02]"
          >
            Acessar projeto
            <span>↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({
  project,
  accent,
}: {
  project: Project;
  accent: string;
}) {
  return (
    <Link
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="section-card group relative overflow-hidden p-7 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${accent}`} />

      <div className="relative">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
          <span>{project.group}</span>
          <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />
          <span>{project.year}</span>
        </div>

        <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-[var(--foreground)]">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
          {project.outcome}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-xs text-[var(--muted-foreground)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
          Ver detalhes
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProjectsSection() {
  return (
    <section id="projetos" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="max-w-3xl">
          <SectionEyebrow>Projetos</SectionEyebrow>
          <h2 className="mt-6 text-3xl font-extrabold tracking-[-0.05em] text-[var(--foreground)] md:text-5xl">
            Sistemas modulares, produtos SaaS e automações em operação.
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--muted-foreground)] md:text-lg">
            Do desenvolvimento de plataformas de emissão fiscal à engenharia de agentes de IA para atendimento corporativo, o foco do meu trabalho é estruturar soluções técnicas que destravam o crescimento do negócio.
          </p>
        </div>

        <FeaturedProject project={featuredProject} />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {secondaryProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              accent={projectAccents[index % projectAccents.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionEyebrow>Skills</SectionEyebrow>
          <h2 className="mt-6 text-3xl font-extrabold tracking-[-0.05em] text-[var(--foreground)] md:text-5xl">
            Tecnologias orientadas a performance, escala e integração.
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--muted-foreground)] md:text-lg">
            Utilizo ferramentas modernas para garantir entregas ponta a ponta. Desde a construção de interfaces fluídas com Next.js até a estruturação de fluxos de scraping e automação para prospecção B2B de alto volume.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(groupedTechnologies).map(([category, items]) => (
            <article key={category} className="section-card p-7">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">
                  {category}
                </h3>
                <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                  {items.length} itens
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {items.map((item) => (
                  <span
                    key={item.name}
                    className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-2 text-sm text-[var(--muted-foreground)]"
                    title={item.detail}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contato" className="px-6 pt-10 pb-24 md:pb-28">
      <div className="mx-auto max-w-5xl">
        <div className="section-card relative overflow-hidden p-8 text-center md:p-12">
          <div className="absolute left-[-4rem] top-[-3rem] h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute bottom-[-5rem] right-[-3rem] h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative">
            <SectionEyebrow>Contato</SectionEyebrow>

            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold tracking-[-0.05em] text-[var(--foreground)] md:text-5xl">
              Pronto para escalar a operação técnica do seu negócio?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] md:text-lg">
              Seja para estruturar uma nova arquitetura de software, desenvolver um SaaS do zero, ou automatizar a operação e a captação de leads da sua empresa, vamos conversar sobre como posso agregar valor ao seu projeto.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[image:var(--brand-gradient)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(56,189,248,0.2)] transition-transform duration-200 hover:scale-[1.02]"
              >
                Iniciar conversa no WhatsApp
                <span>↗</span>
              </Link>

              <Link
                href="#hero"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/5 px-6 py-3.5 text-sm font-medium text-[var(--foreground)] shadow-[0_14px_34px_rgba(0,0,0,0.4)] transition-colors duration-200 hover:bg-white/10"
              >
                Voltar ao topo
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--muted-foreground)]">
              <span className="rounded-full border border-[var(--border)] bg-white/5 px-4 py-2">
                {profile.location}
              </span>
              <span className="rounded-full border border-[var(--border)] bg-white/5 px-4 py-2">
                {profile.availability}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PortfolioExperience() {
  return (
    <main className="relative min-h-screen overflow-hidden text-[var(--foreground)]">
      <div className="pointer-events-none fixed left-[-8rem] top-[-8rem] z-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-10rem] right-[-8rem] z-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      <Header />

      <div className="relative z-10">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ProjectsSection />
        <StackSection />
        <ContactSection />

        <footer className="border-t border-[var(--border)] px-6 py-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[var(--muted-foreground)] md:flex-row md:items-center md:justify-between">
            <p>{profile.name} • Portfólio</p>
            <p>{profile.location}</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
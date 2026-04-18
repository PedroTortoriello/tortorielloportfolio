"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";

import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import {
  differentiators,
  process as deliveryProcess,
  profile,
  projects,
  technologies,
} from "@/lib/data";

type Project = (typeof projects)[number];
type Technology = (typeof technologies)[number];

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Contato", href: "#contato" },
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase text-[var(--accent)]">
      {children}
    </p>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[rgba(4,6,6,0.84)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="#home"
          className="text-sm font-bold text-[var(--text-primary)]"
          aria-label="Voltar ao inicio"
        >
          {profile.initials}
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={`mailto:${profile.email}`}
          className="hidden rounded-lg border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:inline-flex"
        >
          Briefing
        </Link>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="rounded-lg border border-[var(--border-soft)] px-3 py-2 text-sm text-[var(--text-primary)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          Menu
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          className="border-t border-[var(--border-soft)] bg-[rgba(4,6,6,0.96)] px-5 py-4 md:hidden"
          aria-label="Principal mobile"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-[var(--text-secondary)] hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[74svh] overflow-hidden border-b border-[var(--border-soft)]"
    >
      <img
        src={profile.heroImage}
        alt="Ambiente de trabalho com codigo em tela"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,6,6,0.94)_0%,rgba(4,6,6,0.8)_48%,rgba(4,6,6,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,6,0.16),rgba(4,6,6,0.92))]" />

      <div className="relative z-10 mx-auto flex min-h-[74svh] w-full max-w-7xl items-center px-5 py-16 md:px-8">
        <div className="max-w-4xl">
          <Reveal>
            <SectionLabel>Portfolio de engenharia</SectionLabel>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-[var(--text-primary)] md:text-6xl lg:text-7xl">
              {profile.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
              {profile.summary}
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#projetos">Ver projetos</MagneticButton>
            <MagneticButton href="#contato" variant="secondary">
              Falar sobre meu projeto
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="border-b border-[var(--border-soft)] bg-[var(--bg-secondary)]">
      <div className="mx-auto grid max-w-7xl gap-px px-5 py-6 md:grid-cols-3 md:px-8">
        {profile.stats.map((item) => (
          <Reveal key={item.label}>
            <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] p-5">
              <p className="font-heading text-2xl font-semibold text-[var(--text-primary)]">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {item.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" className="border-b border-[var(--border-soft)] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-lg border border-[var(--border-soft)] bg-[var(--surface)]">
            <img
              src={profile.aboutImage}
              alt="Codigo sendo desenvolvido em notebook"
              className="h-80 w-full object-cover md:h-[520px]"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>Sobre</SectionLabel>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl">
              Software com visual forte, base tecnica limpa e foco em negocio.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-base leading-8 text-[var(--text-secondary)]">
              Meu trabalho combina desenvolvimento full stack, design de produto
              e automacao para criar ativos digitais que melhoram vendas,
              operacao e percepcao de marca.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4">
            {differentiators.map((item, index) => (
              <Reveal key={item.title} delay={0.12 + index * 0.06}>
                <div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] p-5">
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.26}>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {profile.proof.map((item) => (
                <p
                  key={item}
                  className="rounded-lg border border-[var(--border-soft)] bg-black/20 p-4 text-sm leading-7 text-[var(--text-secondary)]"
                >
                  {item}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.04} className="h-full">
      <article className="group h-full overflow-hidden rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)]">
        <Link
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="flex h-full flex-col"
          aria-label={`Abrir ${project.title}`}
        >
          <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border-soft)] bg-[var(--bg-secondary)]">
            <img
              src={project.image}
              alt={`Preview do projeto ${project.title}`}
              className="h-full w-full object-cover opacity-88 transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,6,0.05),rgba(4,6,6,0.72))]" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white p-2">
                <img
                  src={project.icon}
                  alt=""
                  className="h-full w-full object-contain"
                  aria-hidden="true"
                />
              </span>
              <span className="rounded-lg border border-white/16 bg-black/48 px-3 py-2 text-xs font-semibold text-white backdrop-blur">
                {project.year}
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-semibold uppercase text-[var(--accent)]">
              {project.category}
            </p>
            <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight text-[var(--text-primary)]">
              {project.title}
            </h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-[var(--text-primary)]">
              {project.outcome}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {project.description}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
              {project.details}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[var(--border-soft)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="mt-6 inline-flex text-sm font-semibold text-[var(--accent)]">
              Abrir projeto
            </span>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}

function ProjectsSection() {
  const [activeGroup, setActiveGroup] = useState<"Todos" | Project["group"]>(
    "Todos",
  );

  const groups = useMemo(
    () => ["Todos", ...Array.from(new Set(projects.map((project) => project.group)))] as const,
    [],
  );

  const visibleProjects = useMemo(
    () =>
      activeGroup === "Todos"
        ? projects
        : projects.filter((project) => project.group === activeGroup),
    [activeGroup],
  );

  return (
    <section id="projetos" className="border-b border-[var(--border-soft)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionLabel>Projetos selecionados</SectionLabel>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="max-w-3xl font-heading text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl">
                Sistemas e presencas digitais com resultado claro.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                A vitrine agora mostra o que cada entrega resolve, quais
                tecnologias sustentam o projeto e como acessar o produto final.
              </p>
            </div>
            <div className="flex gap-2">
              {groups.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setActiveGroup(group)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    activeGroup === group
                      ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                      : "border-[var(--border-soft)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnologyCard({ item }: { item: Technology }) {
  return (
    <Reveal className="h-full">
      <div className="h-full rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent-2)]">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border-soft)] bg-white p-2">
            <img src={item.logo} alt="" className="h-full w-full object-contain" />
          </span>
          <div>
            <h3 className="font-semibold text-[var(--text-primary)]">{item.name}</h3>
            <p className="text-xs text-[var(--accent-2)]">{item.category}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
          {item.detail}
        </p>
      </div>
    </Reveal>
  );
}

function StackSection() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(technologies.map((item) => item.category)))],
    [],
  );
  const visibleTechnologies = useMemo(
    () =>
      activeCategory === "Todos"
        ? technologies
        : technologies.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <section id="stack" className="border-b border-[var(--border-soft)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionLabel>Stack</SectionLabel>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="max-w-3xl font-heading text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl">
                Ferramentas escolhidas para velocidade, confianca e escala.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                A stack combina front-end moderno, dados, APIs e automacao para
                sair da vitrine e virar operacao.
              </p>
            </div>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === category
                      ? "border-[var(--accent-2)] bg-[var(--accent-2)] text-black"
                      : "border-[var(--border-soft)] text-[var(--text-secondary)] hover:border-[var(--accent-2)] hover:text-[var(--accent-2)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTechnologies.map((item) => (
            <TechnologyCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="border-b border-[var(--border-soft)] bg-[var(--bg-secondary)] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionLabel>Metodo</SectionLabel>
          <h2 className="max-w-3xl font-heading text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl">
            Clareza antes, engenharia durante, validacao antes de publicar.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {deliveryProcess.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="h-full rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] p-6">
                <p className="font-heading text-4xl font-semibold text-[var(--accent)]">
                  0{index + 1}
                </p>
                <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contato" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="grid gap-8 border-y border-[var(--border-soft)] py-12 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <SectionLabel>Contato</SectionLabel>
              <h2 className="max-w-3xl font-heading text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl">
                Vamos transformar sua ideia em um produto que vende melhor e
                opera melhor.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                {profile.availability}. Envie o contexto, objetivo e prazo para
                eu avaliar o melhor caminho.
              </p>
            </div>
            <div className="grid min-w-[240px] gap-3">
              <Link
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-[var(--accent)] px-5 py-3 text-center text-sm font-bold text-black transition-colors hover:bg-[var(--accent-strong)]"
              >
                Conversar no WhatsApp
              </Link>
              <Link
                href={`mailto:${profile.email}`}
                className="rounded-lg border border-[var(--border-strong)] px-5 py-3 text-center text-sm font-bold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-2)] hover:text-[var(--accent-2)]"
              >
                Enviar briefing por e-mail
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PortfolioExperience() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />
      <Hero />
      <ProofStrip />
      <AboutSection />
      <ProjectsSection />
      <StackSection />
      <ProcessSection />
      <ContactSection />
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-[var(--border-soft)] px-5 py-8 md:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
          <p>{profile.name} | {profile.role}</p>
          <p>{profile.location}</p>
        </div>
      </motion.footer>
    </main>
  );
}

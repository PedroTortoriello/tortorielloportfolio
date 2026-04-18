"use client";

import Link from "next/link";
import Image from "next/image";
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
          aria-label="Voltar ao início"
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
          href={profile.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-lg border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:inline-flex"
        >
          WhatsApp
        </Link>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="rounded-lg border border-[var(--border-soft)] px-3 py-2 text-sm text-[var(--text-primary)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Abrir menu"
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
                className="rounded-lg px-3 py-3 text-sm text-[var(--text-secondary)] transition-colors hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
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
      <Image
        src={profile.heroImage}
        alt="Ambiente de trabalho com código em tela"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,6,6,0.94)_0%,rgba(4,6,6,0.8)_48%,rgba(4,6,6,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,6,0.16),rgba(4,6,6,0.92))]" />

      <div className="relative z-10 mx-auto flex min-h-[74svh] w-full max-w-7xl items-center px-5 py-16 md:px-8">
        <div className="max-w-4xl">
          <Reveal>
            <SectionLabel>Portfólio profissional</SectionLabel>
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
            <MagneticButton href="#projetos">Conhecer projetos</MagneticButton>
            <MagneticButton href="#contato" variant="secondary">
              Solicitar avaliação
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
          <div className="relative h-80 overflow-hidden rounded-lg border border-[var(--border-soft)] bg-[var(--surface)] md:h-[520px]">
            <Image
              src={profile.aboutImage}
              alt="Código sendo desenvolvido em notebook"
              fill
              unoptimized
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>Sobre</SectionLabel>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl">
              Engenharia de software com clareza técnica, consistência visual e
              foco operacional.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 text-base leading-8 text-[var(--text-secondary)]">
              Meu trabalho combina desenvolvimento full stack, design de produto
              e automação para criar ativos digitais estáveis, objetivos e
              preparados para demandas reais de operação.
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

const projectAccents = ["#26f5a2", "#56d8ff", "#ff5f6d", "#f2c94c"] as const;

function getProjectAccent(index: number) {
  return projectAccents[index % projectAccents.length];
}

function getProjectCode(project: Project) {
  return project.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function ProjectPreview({ project, index }: { project: Project; index: number }) {
  const accent = getProjectAccent(index);
  const code = getProjectCode(project);

  return (
    <div
      className="relative min-h-[360px] overflow-hidden border-t border-[var(--border-soft)] bg-black/20 p-5 lg:border-l lg:border-t-0"
      style={{
        background: `linear-gradient(135deg, ${accent}18, rgba(255,255,255,0.035))`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-35" />

      <div className="relative flex h-full min-h-[320px] flex-col rounded-lg border border-white/12 bg-[rgba(4,6,6,0.62)]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f6d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f2c94c]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#26f5a2]" />
          </div>
          <span className="text-xs font-semibold text-[var(--text-muted)]">
            {project.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <p
              className="font-heading text-6xl font-semibold leading-none md:text-7xl"
              style={{ color: accent }}
            >
              {code}
            </p>
            <p className="mt-4 text-sm font-semibold uppercase text-[var(--text-secondary)]">
              {project.group} / {project.category}
            </p>
          </div>

          <div className="mt-10 grid gap-3">
            {project.tags.slice(0, 4).map((tag, tagIndex) => (
              <div key={tag} className="grid grid-cols-[6.5rem_1fr] items-center gap-3">
                <span className="truncate text-xs text-[var(--text-muted)]">{tag}</span>
                <span className="h-2 overflow-hidden rounded-md bg-white/10">
                  <span
                    className="block h-full rounded-md"
                    style={{
                      width: `${82 - tagIndex * 10}%`,
                      backgroundColor: accent,
                    }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const accent = getProjectAccent(index);

  return (
    <Reveal className="mt-12">
      <article className="overflow-hidden rounded-lg border border-[var(--border-soft)] bg-[rgba(255,255,255,0.035)]">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex min-h-[360px] flex-col justify-between p-6 md:p-8">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase"
                  style={{ borderColor: `${accent}66`, color: accent }}
                >
                  Case em destaque
                </span>
                <span className="text-sm text-[var(--text-muted)]">
                  {project.year} / {project.category}
                </span>
              </div>

              <h3 className="mt-8 max-w-3xl font-heading text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[var(--text-primary)]">
                {project.outcome}
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] md:text-base md:leading-8">
                {project.description}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                {project.details}
              </p>
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[var(--border-soft)] bg-black/20 px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-[var(--accent-strong)]"
                aria-label={`Acessar ${project.title}`}
              >
                Acessar projeto
              </Link>
            </div>
          </div>

          <ProjectPreview project={project} index={index} />
        </div>
      </article>
    </Reveal>
  );
}

function ProjectListItem({ project, index }: { project: Project; index: number }) {
  const accent = getProjectAccent(index);

  return (
    <Reveal delay={index * 0.04}>
      <Link
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className={`group grid gap-5 py-6 transition-colors md:grid-cols-[4rem_1fr_auto] md:items-center ${
          index === 1 ? "" : "border-t border-[var(--border-soft)]"
        }`}
        aria-label={`Acessar ${project.title}`}
      >
        <span
          className="flex h-12 w-12 items-center justify-center rounded-lg border text-xs font-semibold"
          style={{ borderColor: `${accent}66`, color: accent }}
        >
          0{index + 1}
        </span>

        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-[var(--text-muted)]">
            <span>{project.group}</span>
            <span className="text-[var(--border-strong)]">/</span>
            <span>{project.category}</span>
          </div>
          <h3 className="mt-2 font-heading text-2xl font-semibold leading-tight text-[var(--text-primary)]">
            {project.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
            {project.outcome}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--border-soft)] px-2.5 py-1 text-xs text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <span className="inline-flex text-sm font-semibold text-[var(--accent)] transition-transform group-hover:translate-x-1">
          Acessar
        </span>
      </Link>
    </Reveal>
  );
}

function ProjectsSection() {
  const [activeGroup, setActiveGroup] = useState<"Todos" | Project["group"]>(
    "Todos",
  );

  const groups = useMemo<Array<"Todos" | Project["group"]>>(
    () => ["Todos", ...Array.from(new Set(projects.map((project) => project.group)))],
    [],
  );

  const visibleProjects = useMemo(
    () =>
      activeGroup === "Todos"
        ? projects
        : projects.filter((project) => project.group === activeGroup),
    [activeGroup],
  );

  const featuredProject = visibleProjects[0];
  const secondaryProjects = visibleProjects.slice(1);

  return (
    <section id="projetos" className="border-b border-[var(--border-soft)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionLabel>Projetos selecionados</SectionLabel>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="max-w-3xl font-heading text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl">
                Cases organizados por escopo, entrega e impacto operacional.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                Uma leitura mais direta sobre o que foi construído, qual
                problema o projeto resolve e quais tecnologias sustentam a
                entrega em produção.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
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
                  <span className="ml-2 opacity-70">
                    {group === "Todos"
                      ? projects.length
                      : projects.filter((project) => project.group === group).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {featuredProject ? (
          <>
            <FeaturedProject project={featuredProject} index={0} />

            {secondaryProjects.length > 0 ? (
              <div className="mt-6 rounded-lg border border-[var(--border-soft)] bg-[rgba(255,255,255,0.03)] px-5 md:px-6">
                {secondaryProjects.map((project, index) => (
                  <ProjectListItem
                    key={project.slug}
                    project={project}
                    index={index + 1}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : null}
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
            <Image
              src={item.logo}
              alt={item.name}
              width={40}
              height={40}
              unoptimized
              className="h-full w-full object-contain"
            />
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
                Tecnologias escolhidas para estabilidade, desempenho e evolução.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                A stack combina front-end moderno, dados, APIs e automação para
                sustentar produtos digitais em ambiente de produção.
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
          <SectionLabel>Processo</SectionLabel>
          <h2 className="max-w-3xl font-heading text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl">
            Diagnóstico, arquitetura e validação antes da publicação.
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
                Vamos avaliar o seu projeto com clareza técnica e escopo definido.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                {profile.availability}. Envie contexto, objetivo e prazo para uma
                análise inicial do melhor caminho de desenvolvimento.
              </p>
            </div>

            <div className="grid min-w-[240px] gap-3">
              <Link
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-[var(--accent)] px-5 py-3 text-center text-sm font-bold text-black transition-colors hover:bg-[var(--accent-strong)]"
              >
                Iniciar contato
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
          <p>
            {profile.name} | {profile.role}
          </p>
          <p>{profile.location}</p>
        </div>
      </motion.footer>
    </main>
  );
}

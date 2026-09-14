import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/data";

type Project = (typeof projects)[number];

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <div className="panel grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-faint">
          <span className="rounded border border-border-strong px-2 py-0.5 text-ink-muted">Destaque</span>
          <span>{project.group}</span>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
        </div>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-ink">{project.title}</h3>
        <p className="mt-1.5 text-sm text-ink-faint">{project.category}</p>
        <p className="mt-5 text-pretty leading-relaxed text-ink-muted">{project.description}</p>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-muted">{project.details}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded border border-border px-2.5 py-1 text-xs text-ink-muted">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
        >
          Abrir projeto
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      </div>

      <div className="lg:border-l lg:border-border lg:pl-14">
        <p className="kicker">No produto</p>
        <p className="mt-3 text-lg leading-relaxed text-ink">{project.outcome}</p>
        <ul className="mt-7 grid grid-cols-2 border-t border-border">
          {project.modules.map((m, i) => (
            <li
              key={m}
              className={`flex items-baseline gap-2.5 border-b border-border py-3 text-sm text-ink-muted ${
                i % 2 === 0 ? "pr-4" : "pl-4"
              }`}
            >
              <span className="font-mono text-xs text-ink-faint tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-xs text-ink-faint">{hostOf(project.url)}</p>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="panel group relative flex h-full flex-col p-6 transition-colors duration-200 hover:border-border-strong">
      <div className="flex items-center justify-between font-mono text-xs text-ink-faint">
        <span>{project.group}</span>
        <span>{project.year}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{project.title}</h3>
      <p className="mt-1.5 text-sm text-ink-faint">{project.category}</p>
      <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-ink-muted">{project.outcome}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded border border-border px-2 py-0.5 text-[0.7rem] text-ink-muted">
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent after:absolute after:inset-0"
        aria-label={`Abrir ${project.title}`}
      >
        Ver projeto
        <ArrowUpRight className="size-4" aria-hidden />
      </a>
    </article>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projetos" className="border-t border-border">
      <div className="container-page py-[clamp(6rem,11vw,9rem)]">
        <SectionHeading
          kicker="Projetos"
          title="Sistemas, SaaS e automações em operação real."
          lead="Plataformas que pessoas usam todos os dias para agendar, vender, atender e operar. Cada uma resolve um problema concreto de negócio, do CRM com IA à gestão completa de uma clínica."
        />

        <Reveal className="mt-14 space-y-6">
          <FeaturedProject project={featured} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

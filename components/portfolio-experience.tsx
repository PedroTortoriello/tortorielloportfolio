"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { MotionValue } from "motion/react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { differentiators, projects, technologies } from "@/lib/data";

type Project = (typeof projects)[number];
type Technology = (typeof technologies)[number];

const heroHighlights = ["alto padrao", "controle", "presenca", "fluidez"];
const signaturePillars = ["Clarity", "Rhythm", "Presence", "Craft"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-secondary)] backdrop-blur-xl">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgba(0,194,122,0.45)]" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--green-primary)] shadow-[0_0_10px_rgba(0,194,122,0.6)]" />
      </span>
      {children}
    </span>
  );
}

function IntelligentCursor({
  x,
  y,
  active,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  active: boolean;
}) {
  const smoothX = useSpring(x, { stiffness: 260, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 260, damping: 30 });

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden w-px rounded-full bg-[linear-gradient(180deg,rgba(241,209,122,0),rgba(241,209,122,0.95),rgba(0,194,122,0))] md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scaleY: active ? 2.4 : 1.45,
          height: active ? 72 : 44,
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[91] hidden h-2 w-2 rounded-full bg-[var(--gold-soft)] shadow-[0_0_14px_rgba(241,209,122,0.7)] md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scale: active ? 0.55 : 0.9,
        }}
      />
    </>
  );
}

function HeroSignaturePanel() {
  return (
    <Reveal delay={0.2} className="relative">
      <div className="relative mx-auto max-w-[540px] overflow-hidden rounded-[34px] border border-[var(--border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_28%),radial-gradient(circle_at_80%_16%,rgba(0,194,122,0.12),transparent_22%)]" />
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,15,12,0.96),rgba(7,8,7,0.96))]">
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-4 text-[10px] uppercase tracking-[0.26em] text-[var(--text-secondary)]">
            <span>Private interface</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-3 py-1 text-[var(--gold-soft)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold-soft)] shadow-[0_0_10px_rgba(241,209,122,0.6)]" />
              curated
            </span>
          </div>

          <div className="relative h-[560px] overflow-hidden p-6">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-[38%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(212,175,55,0.16)]" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-[38%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(0,194,122,0.18)]" />
            <motion.div animate={{ opacity: [0.28, 0.62, 0.28], scale: [1, 1.08, 1] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }} className="absolute left-1/2 top-[38%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.28),rgba(0,194,122,0.16),transparent)] blur-2xl" />

            {[{ label: "Brand", top: "14%", left: "10%" }, { label: "Product", top: "19%", right: "10%" }, { label: "Motion", bottom: "31%", left: "12%" }, { label: "Value", bottom: "25%", right: "11%" }].map((item, index) => (
              <motion.div key={item.label} animate={{ y: [0, -8, 0] }} transition={{ duration: 4.8 + index * 0.45, repeat: Infinity, ease: "easeInOut" }} className="absolute rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-primary)] backdrop-blur-md" style={item}>
                {item.label}
              </motion.div>
            ))}

            <div className="absolute inset-x-6 bottom-6 space-y-4">
              <div className="rounded-[26px] border border-[var(--border-strong)] bg-white/[0.045] p-5 backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--gold-soft)]">Signature layer</p>
                <h3 className="mt-3 font-heading text-[28px] leading-none text-[var(--text-primary)]">Precision with presence.</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                  Interfaces desenhadas para parecerem mais valiosas, mais claras e mais confiantes sem forcar uma estetica de IA.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[["Clarity", "96"], ["Rhythm", "93"], ["Depth", "90"]].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/8 bg-black/18 p-3">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">{label}</p>
                      <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-[var(--border-soft)] bg-[rgba(18,20,18,0.72)] p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">
                  <span>Design pillars</span>
                  <span className="text-[var(--green-secondary)]">refined</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {signaturePillars.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--text-primary)]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, index, focused, onHover, onLeave, onSelect }: { project: Project; index: number; focused: boolean; onHover: () => void; onLeave: () => void; onSelect: () => void }) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.article onHoverStart={onHover} onHoverEnd={onLeave} onFocus={onHover} onBlur={onLeave} whileHover={{ y: -8, scale: 1.01 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} data-cursor="interactive" className={`group relative flex h-full flex-col overflow-hidden rounded-[30px] border p-6 transition-[border-color,box-shadow,transform,background] duration-500 ${focused ? "border-[rgba(212,175,55,0.24)] bg-[rgba(255,255,255,0.06)] shadow-[0_24px_80px_rgba(0,0,0,0.24)]" : "border-[var(--border-soft)] bg-white/[0.035]"}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-80`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.04),rgba(5,5,5,0.42))]" />

        <button type="button" onClick={onSelect} className="relative block text-left" data-cursor="interactive">
          <div className="relative h-52 overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
            <motion.div animate={{ y: focused ? -12 : 0 }} transition={{ duration: 0.5 }} className="absolute inset-5 grid grid-cols-[1.2fr_0.8fr] gap-3">
              <div className="rounded-[20px] border border-white/8 bg-[rgba(7,11,8,0.72)] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-2 w-20 rounded-full bg-white/12" />
                  <span className="rounded-full bg-[rgba(0,194,122,0.12)] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--green-secondary)]">{project.status}</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-white/10" />
                  <div className="h-2 w-4/5 rounded-full bg-white/10" />
                  <div className="h-2 w-3/5 rounded-full bg-[rgba(212,175,55,0.7)]" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-20 rounded-[18px] border border-white/8 bg-black/20" />
                <div className="h-16 rounded-[18px] border border-white/8 bg-[rgba(255,255,255,0.06)]" />
              </div>
            </motion.div>
          </div>

          <div className="relative mt-6 flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gold-soft)]">{project.category}</p>
                <h3 className="mt-3 font-heading text-[28px] leading-none text-[var(--text-primary)]">{project.title}</h3>
              </div>
              <span className="rounded-full border border-white/8 bg-white/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">{project.type}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{project.description}</p>

            <motion.div animate={{ height: focused ? "auto" : 0, opacity: focused ? 1 : 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
              <div className="mt-5 rounded-[22px] border border-white/8 bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--green-secondary)]">Expanded view</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-primary)]">{project.summary}</p>
              </div>
            </motion.div>
          </div>
        </button>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {project.metrics.map((item) => (
            <span key={item} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-[var(--text-primary)]">{item}</span>
          ))}
        </div>

        <div className="relative mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={onSelect} className="rounded-full border border-[var(--border-soft)] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors hover:bg-white/[0.08]" data-cursor="interactive">Ver detalhes</button>
          <Link href={project.url} target="_blank" rel="noreferrer" className="rounded-full border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold-soft)] transition-colors hover:bg-[rgba(212,175,55,0.14)]" data-cursor="interactive">Abrir site</Link>
        </div>
      </motion.article>
    </Reveal>
  );
}
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(4,4,4,0.58)] p-4 backdrop-blur-lg">
          <motion.button type="button" className="absolute inset-0" onClick={onClose} aria-label="Fechar projeto" />
          <motion.div initial={{ y: 36, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 24, opacity: 0, scale: 0.98 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[36px] border border-[var(--border-strong)] bg-[linear-gradient(180deg,rgba(10,12,10,0.98),rgba(5,5,5,0.98))] shadow-[0_30px_160px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-5 md:px-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--gold-soft)]">{project.category}</p>
                <h3 className="mt-2 font-heading text-2xl text-[var(--text-primary)] md:text-3xl">{project.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <Link href={project.url} target="_blank" rel="noreferrer" className="rounded-full border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold-soft)]" data-cursor="interactive">Abrir site</Link>
                <button type="button" onClick={onClose} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]" data-cursor="interactive">Fechar</button>
              </div>
            </div>

            <div className="overflow-y-auto px-6 py-6 md:px-8 md:py-8">
              <div className={`rounded-[30px] border border-white/8 bg-gradient-to-br ${project.accent} p-[1px]`}>
                <div className="rounded-[29px] bg-[linear-gradient(180deg,rgba(8,10,8,0.96),rgba(6,7,6,0.96))] p-6 md:p-8">
                  <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                    <div>
                      <p className="text-sm leading-8 text-[var(--text-primary)]">{project.summary}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1">
                      {project.metrics.map((metric) => (
                        <div key={metric} className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
                          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">Impact</p>
                          <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{metric}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {[["Overview", project.description], ["Problema", project.challenge], ["Solucao", project.solution]].map(([title, text]) => (
                  <div key={title} className="rounded-[26px] border border-white/8 bg-white/[0.03] p-6">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--green-secondary)]">{title}</p>
                    <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">{text}</p>
                  </div>
                ))}
                <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold-soft)]">Stack</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full border border-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--text-primary)]">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold-soft)]">Impacto percebido</p>
                  <div className="mt-4 space-y-3">
                    {project.impact.map((item) => (
                      <div key={item} className="rounded-[18px] border border-white/8 bg-black/20 px-4 py-3 text-sm text-[var(--text-secondary)]">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function StackModule({ item, focused, onHover, onLeave }: { item: Technology; focused: boolean; onHover: () => void; onLeave: () => void }) {
  return (
    <Reveal>
      <motion.div onHoverStart={onHover} onHoverEnd={onLeave} onFocus={onHover} onBlur={onLeave} whileHover={{ y: -6 }} data-cursor="interactive" className={`group rounded-[26px] border p-5 transition-all duration-400 ${focused ? "border-[rgba(0,194,122,0.24)] bg-[rgba(255,255,255,0.06)] shadow-[0_18px_60px_rgba(0,0,0,0.2)]" : "border-[var(--border-soft)] bg-white/[0.035]"}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/25">
              <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle,rgba(0,194,122,0.18),transparent_68%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative text-sm font-semibold text-[var(--text-primary)]">{item.name.slice(0, 2).toUpperCase()}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">{item.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[var(--gold-soft)]">{item.category}</p>
            </div>
          </div>
          <span className="rounded-full border border-white/8 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">level {item.level}</span>
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{item.detail}</p>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
            <span>Dominio</span>
            <span>{item.level}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/8">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.level}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="h-full rounded-full bg-[linear-gradient(90deg,rgba(0,194,122,0.95),rgba(212,175,55,0.9))]" />
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

function ProjectsBlock({ title, description, items, focusedSurface, setFocusedSurface, setSelectedProject }: { title: string; description: string; items: Project[]; focusedSurface: string | null; setFocusedSurface: (value: string | null) => void; setSelectedProject: (value: Project) => void }) {
  return (
    <div className="mt-14">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h3 className="font-heading text-3xl tracking-[-0.04em] text-[var(--text-primary)] md:text-4xl">{title}</h3>
        <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">{description}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {items.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} focused={focusedSurface === project.slug} onHover={() => setFocusedSurface(project.slug)} onLeave={() => setFocusedSurface(null)} onSelect={() => setSelectedProject(project)} />
        ))}
      </div>
    </div>
  );
}
export function PortfolioExperience() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const textX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const textY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 22 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 22 });
  const radialMask = useMotionTemplate`radial-gradient(520px circle at ${glowX}px ${glowY}px, rgba(0,194,122,0.12), rgba(212,175,55,0.06), transparent 78%)`;
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -90]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.97]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroOffsetX = useTransform(textX, [0, 1600], [-10, 10]);
  const heroOffsetY = useTransform(textY, [0, 900], [-8, 8]);

  const [highlightIndex, setHighlightIndex] = useState(0);
  const [cursorActive, setCursorActive] = useState(false);
  const [focusedSurface, setFocusedSurface] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHighlightIndex((current) => (current + 1) % heroHighlights.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  const focusDim = useMemo(() => Boolean(focusedSurface || selectedProject), [focusedSurface, selectedProject]);
  const systems = projects.filter((project) => project.type === "system");
  const websites = projects.filter((project) => project.type === "website");

  return (
    <>
      <IntelligentCursor x={mouseX} y={mouseY} active={cursorActive || focusDim} />
      <main
        className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[rgba(0,194,122,0.28)] selection:text-white"
        onMouseMove={(event) => {
          mouseX.set(event.clientX);
          mouseY.set(event.clientY);
          const target = event.target as HTMLElement | null;
          setCursorActive(Boolean(target?.closest("[data-cursor='interactive'], [data-cursor='magnetic']")));
        }}
      >
        <motion.div className="pointer-events-none fixed inset-0 z-10 hidden md:block" style={{ background: radialMask }} />
        <motion.div animate={{ opacity: focusDim ? 0.12 : 0 }} className="pointer-events-none fixed inset-0 z-30 bg-[rgba(7,7,6,0.1)] backdrop-blur-[0.5px]" />
        <motion.div style={{ y: gridY }} className="pointer-events-none absolute inset-x-0 top-0 h-[1200px] opacity-50">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(circle_at_center,black,transparent_84%)]" />
        </motion.div>
        <div className="pointer-events-none absolute left-[-10%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-[rgba(0,194,122,0.18)] blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[8%] right-[-8%] h-[24rem] w-[24rem] rounded-full bg-[rgba(212,175,55,0.14)] blur-[120px]" />

        <header className="sticky top-0 z-40 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <div className="absolute inset-0 bg-[rgba(5,5,5,0.72)] backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_70%,transparent)]" />
          <Link href="#home" className="relative z-10 text-sm font-semibold uppercase tracking-[0.32em] text-[var(--text-primary)]" data-cursor="interactive">PEDRO</Link>
          <nav className="relative z-10 hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)] md:flex">
            {[["Sobre", "#sobre"], ["Projetos", "#projetos"], ["Stack", "#stack"], ["Contato", "#contato"]].map(([label, href]) => (
              <Link key={label} href={href} data-cursor="interactive" className="transition-colors duration-300 hover:text-[var(--text-primary)]">{label}</Link>
            ))}
          </nav>
        </header>

        <section id="home" className="relative z-20 mx-auto grid min-h-[calc(100vh-76px)] w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-10 md:grid-cols-[1.04fr_0.96fr] md:px-10 md:pb-28">
          <motion.div style={{ y: heroY, scale: heroScale }} className="relative">
            <Reveal><SectionLabel>Frontend engineer + digital positioning</SectionLabel></Reveal>
            <Reveal delay={0.06}>
              <motion.h1 style={{ x: heroOffsetX, y: heroOffsetY }} className="mt-8 max-w-5xl font-heading text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-[var(--text-primary)] md:text-[5.3rem] lg:text-[6.1rem]">
                Produtos digitais com
                <span className="block text-[var(--text-primary)]">presenca, precisao e</span>
                <span className="relative mt-2 block min-h-[1.05em] text-transparent">
                  <AnimatePresence mode="wait">
                    <motion.span key={heroHighlights[highlightIndex]} initial={{ opacity: 0, filter: "blur(12px)", y: 14 }} animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} exit={{ opacity: 0, filter: "blur(10px)", y: -12 }} transition={{ duration: 0.45 }} className="absolute inset-0 bg-[linear-gradient(90deg,var(--green-primary),var(--gold-soft),var(--gold-primary))] bg-clip-text">
                      {heroHighlights[highlightIndex]}.
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h1>
            </Reveal>
            <Reveal delay={0.12}><p className="mt-8 max-w-2xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">Eu refino produtos para que parecam inevitavelmente superiores: mais claros, mais sofisticados e mais valiosos desde os primeiros segundos de uso.</p></Reveal>
            <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href="#projetos">Ver projetos</MagneticButton>
              <MagneticButton href="#contato" variant="secondary">Falar por email</MagneticButton>
            </Reveal>
            <Reveal delay={0.24} className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
              {[["Percepcao", "premium-first"], ["Resposta", "fluida e imediata"], ["Entrega", "orientada a valor"]].map(([label, value]) => (
                <div key={label} className="rounded-[22px] border border-[var(--border-soft)] bg-white/[0.035] p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">{label}</p>
                  <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">{value}</p>
                </div>
              ))}
            </Reveal>
          </motion.div>

          <HeroSignaturePanel />
        </section>

        <section id="sobre" className="relative z-20 mx-auto max-w-7xl px-6 py-24 md:px-10">
          <Reveal><SectionLabel>Sobre</SectionLabel></Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal delay={0.08}>
              <h2 className="max-w-4xl font-heading text-4xl leading-[1.02] tracking-[-0.05em] text-[var(--text-primary)] md:text-[4.2rem]">
                Nao e sobre fazer algo bonito.
                <span className="block text-[var(--text-secondary)]">E sobre fazer o usuario sentir dominio, confianca e valor.</span>
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">Minha atuacao fica entre branding, interface e engenharia. Quando esses tres niveis se alinham, o produto ganha forca comercial, percepcao de maturidade e uma presenca dificil de confundir com solucoes comuns.</p>
            </Reveal>
            <div className="space-y-4">
              {differentiators.map((item, index) => (
                <Reveal key={item} delay={0.14 + index * 0.08}>
                  <motion.div whileHover={{ x: 6 }} data-cursor="interactive" className="rounded-[24px] border border-[var(--border-soft)] bg-white/[0.035] p-5 transition-colors hover:border-[rgba(212,175,55,0.16)] hover:bg-white/[0.05]">
                    <p className="text-sm leading-7 text-[var(--text-primary)]">{item}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projetos" className="relative z-20 mx-auto max-w-7xl px-6 py-24 md:px-10">
          <Reveal><SectionLabel>Projetos</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-3xl font-heading text-4xl leading-[1.02] tracking-[-0.05em] text-[var(--text-primary)] md:text-[4.4rem]">Agora separados entre sistemas e websites, com acesso direto ao que esta no ar.</h2>
              <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">Cada card permite abrir o projeto publicado ou aprofundar no case. A leitura fica mais clara e a navegacao mais util.</p>
            </div>
          </Reveal>

          <ProjectsBlock title="Sistemas" description="Produtos, dashboards e plataformas com foco em operacao, processos e ganho de eficiencia." items={systems} focusedSurface={focusedSurface} setFocusedSurface={setFocusedSurface} setSelectedProject={setSelectedProject} />
          <ProjectsBlock title="Websites" description="Presencas digitais, paginas comerciais e experiencias de marca orientadas a posicionamento, clareza e conversao." items={websites} focusedSurface={focusedSurface} setFocusedSurface={setFocusedSurface} setSelectedProject={setSelectedProject} />
        </section>

        <section id="stack" className="relative z-20 mx-auto max-w-7xl px-6 py-24 md:px-10">
          <Reveal><SectionLabel>Stack</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-3xl font-heading text-4xl leading-[1.02] tracking-[-0.05em] text-[var(--text-primary)] md:text-[4.1rem]">Cada tecnologia aparece como modulo de sistema, nao como lista de logos.</h2>
              <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">Dominio visual, categoria e nivel deixam claro onde a execucao e estrutural, avancada ou voltada para producao.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((item) => (
              <StackModule key={item.name} item={item} focused={focusedSurface === item.name} onHover={() => setFocusedSurface(item.name)} onLeave={() => setFocusedSurface(null)} />
            ))}
          </div>
        </section>

        <section id="contato" className="relative z-20 mx-auto max-w-7xl px-6 py-24 pb-32 md:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-[38px] border border-[var(--border-strong)] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 shadow-[0_26px_100px_rgba(0,0,0,0.42)] md:p-12">
              <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-[rgba(0,194,122,0.16)] blur-[100px]" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[rgba(212,175,55,0.14)] blur-[100px]" />
              <div className="relative">
                <SectionLabel>Contato</SectionLabel>
                <div className="mt-8 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <h2 className="max-w-3xl font-heading text-4xl leading-[1.02] tracking-[-0.05em] text-[var(--text-primary)] md:text-[4rem]">Se seu produto precisa transmitir mais valor, eu entro para calibrar isso.</h2>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">Disponivel para projetos seletivos em interface premium, front-end de alto padrao e experiencias digitais que precisem parecer tecnicamente maduras e comercialmente fortes.</p>
                  </div>
                  <div className="flex min-w-[240px] flex-col gap-3">
                    <Link href="https://wa.me/5500000000000" data-cursor="interactive" className="rounded-full border border-[rgba(212,175,55,0.22)] bg-[linear-gradient(135deg,rgba(241,209,122,0.96),rgba(212,175,55,0.9))] px-6 py-3 text-center text-sm font-semibold text-[#11110d] shadow-[0_12px_40px_rgba(212,175,55,0.2)] transition-transform duration-300 hover:scale-[1.015] active:scale-[0.985]">WhatsApp</Link>
                    <Link href="mailto:pedro@seuportfolio.dev" data-cursor="interactive" className="rounded-full border border-[var(--border-soft)] bg-white/[0.03] px-6 py-3 text-center text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-white/[0.05]">pedro@seuportfolio.dev</Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

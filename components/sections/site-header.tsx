"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileText, Menu, X } from "lucide-react";
import { nav, profile } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [spy, setSpy] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Off the home page the active tab comes from the route, not from scroll-spy.
  const active = onHome ? spy : pathname.startsWith("/landing-pages") ? "landing-pages" : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the active tab follows the section in the middle of the screen.
  useEffect(() => {
    if (!onHome) return;
    const els = nav.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSpy(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const top = document.getElementById("top");
    const ioTop = new IntersectionObserver(([e]) => e.isIntersecting && setSpy(""), { rootMargin: "-45% 0px -50% 0px" });
    if (top) ioTop.observe(top);
    return () => {
      io.disconnect();
      ioTop.disconnect();
    };
  }, [onHome]);

  // Close on navigation and when the viewport grows past the mobile breakpoint,
  // so the scroll lock can never outlive the menu.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const outside = [document.getElementById("conteudo"), document.querySelector("footer")];
    outside.forEach((el) => el?.setAttribute("inert", ""));
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      outside.forEach((el) => el?.removeAttribute("inert"));
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const crumb = nav.find((n) => n.id === active)?.id;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open ? "border-line bg-bg" : scrolled ? "border-line bg-bg/80 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label={`${profile.name}, início`}>
          <span className="relative grid size-8 shrink-0 place-items-center rounded-lg border border-line-strong bg-surface font-mono text-[0.7rem] font-medium text-ink transition-colors group-hover:border-blue/60">
            {profile.initials}
            <span className="absolute -right-px -top-px size-1.5 rounded-full bg-blue" aria-hidden />
          </span>
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="text-sm font-medium tracking-[-0.01em] text-ink">{profile.name}</span>
            <span className="hidden truncate font-mono text-[0.68rem] text-ink-faint xl:inline">
              ~/{crumb ?? "portfolio"}
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative block rounded-md px-3 py-2 text-[0.84rem] transition-colors duration-200 ${
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-[13px] h-[2px] rounded-full bg-blue"
                      transition={{ duration: 0.45, ease: EASE }}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center gap-2 rounded-lg border border-line-strong px-3.5 text-[0.82rem] text-ink transition-colors hover:border-blue/60 hover:bg-elevated sm:inline-flex"
          >
            <FileText aria-hidden className="size-3.5 text-ink-muted" />
            Currículo
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid size-9 place-items-center rounded-lg border border-line text-ink md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg md:hidden"
          >
            <ul className="container-x py-3">
              {nav.map((item, i) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line py-3.5 text-base text-ink-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                    <span className="font-mono text-[0.66rem] text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-fill text-sm font-medium text-white"
                >
                  <FileText aria-hidden className="size-4" />
                  Ver currículo
                </a>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

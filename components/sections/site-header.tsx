"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileText, Menu, X } from "lucide-react";
import { nav, profile } from "@/lib/data";
import { EASE_OUT } from "@/lib/motion";
import { useActiveStation } from "@/lib/stations";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const station = useActiveStation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Off the home page the active tab comes from the route, not from the scroll.
  const active = onHome ? station : pathname.startsWith("/landing-pages") ? "landing-pages" : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on navigation and when the viewport grows past the menu breakpoint,
  // so the scroll lock can never outlive the menu.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
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
          <span className="relative grid size-8 shrink-0 place-items-center rounded-[5px] border border-line-strong bg-surface font-mono text-[0.6875rem] font-medium tracking-[0.04em] text-ink transition-colors group-hover:border-blue/70">
            {profile.initials}
            <span className="absolute -right-[3px] -top-[3px] size-[5px] rounded-full bg-blue shadow-[0_0_8px_rgb(94_158_255/0.9)]" aria-hidden />
          </span>
          <span className="flex min-w-0 items-baseline gap-2.5">
            <span className="text-sm font-medium tracking-[-0.01em] text-ink">{profile.name}</span>
            <span className="hidden truncate font-mono text-[0.6875rem] text-ink-faint xl:inline">~/{crumb ?? "portfolio"}</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative block px-3 py-2 text-[0.8125rem] transition-colors duration-200 ${isActive ? "text-ink" : "text-ink-muted hover:text-ink"}`}
                  >
                    {item.label}
                  </Link>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-blue shadow-[0_0_10px_rgb(94_158_255/0.8)]"
                      transition={{ duration: 0.45, ease: EASE_OUT }}
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
            className="hidden h-9 items-center gap-2 rounded-[5px] border border-line-strong px-3.5 text-[0.8125rem] text-ink transition-colors hover:border-blue/70 hover:bg-elevated sm:inline-flex"
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
            className="grid size-9 place-items-center rounded-[5px] border border-line text-ink lg:hidden"
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
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg lg:hidden"
          >
            <ul className="container-x py-3">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "location" : undefined}
                    className={`flex items-center justify-between border-b border-line py-4 text-lg tracking-[-0.01em] transition-colors hover:text-ink ${
                      active === item.id ? "text-ink" : "text-ink-muted"
                    }`}
                  >
                    {item.label}
                    <span className="font-mono text-[0.6875rem] text-ink-faint tabular">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </motion.li>
              ))}
              <li className="pt-5">
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center gap-2 rounded-[6px] bg-blue text-sm font-medium text-on-blue"
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

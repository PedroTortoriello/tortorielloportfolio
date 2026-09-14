"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE_OUT } from "@/lib/motion";
import { faq } from "@/lib/data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-border">
      <div className="container-page py-[clamp(6rem,11vw,9rem)]">
      <SectionHeading
        align="center"
        kicker="Dúvidas"
        title="Perguntas frequentes"
        lead="O essencial antes da nossa conversa. Qualquer outra dúvida, é só chamar no WhatsApp."
      />

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-border border-t border-border">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <h3>
                <button
                  type="button"
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-medium text-ink">{item.q}</span>
                  <Plus
                    aria-hidden
                    className={`size-5 shrink-0 text-ink-muted transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-9 text-pretty text-sm leading-relaxed text-ink-muted">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

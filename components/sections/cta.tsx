import { MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/lib/data";

export function CtaFinal() {
  return (
    <section id="contato" className="border-t border-border">
      <div className="container-page py-[clamp(6rem,11vw,9rem)]">
        <Reveal className="panel px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <p className="kicker">Contato</p>
            <h2 className="mt-4 text-balance text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl sm:leading-[1.05]">
              Pronto para automatizar e organizar a sua operação?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
              Me conte o cenário em uma mensagem. Eu retorno com um diagnóstico inicial e os
              próximos passos, sem compromisso.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href={profile.whatsapp} external>
                Agendar reunião
              </Button>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
              >
                <MessageCircle className="size-4 text-ink-muted" aria-hidden />
                {profile.whatsappLabel}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-ink-faint" aria-hidden />
                {profile.location}
              </span>
              <span>{profile.availability}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

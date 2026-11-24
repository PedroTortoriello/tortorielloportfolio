import Image from "next/image";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mrz, Rosette, WaveBand } from "@/components/security/guilloche";
import { profile, specialties } from "@/lib/data";
import { LocalTime } from "./local-time";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const commit = process.env.NEXT_PUBLIC_COMMIT ?? "local";

// MRZ text: uppercase A-Z, digits and "<" only, as on a passport.
const mrz = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "<");

// Printed fields of the identity document. Only real values: the CV's facts,
// the local time in São Paulo and the commit of this build.
function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <dt className="label">{label}</dt>
      <dd className="mt-1 text-[0.9375rem] leading-snug text-ink">{children}</dd>
    </div>
  );
}

// The opening: Pedro's identity document. The name, role and proposal read
// first; the document beside them carries the portrait, the fields and an MRZ.
export function Hero() {
  const [given, ...rest] = profile.fullName.split(" ");
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      data-station="00"
      data-station-label="Início"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="container-x grid flex-1 grid-cols-1 items-center gap-12 pt-28 pb-12 lg:grid-cols-12 lg:gap-10 lg:pt-24">
        <div data-exit="0.08" className="lg:col-span-7">
          <h1 id="hero-title" className="display text-[clamp(3rem,6.6vw,6rem)] text-ink [--wdth:125]">
            <span className="mask-line">
              <span style={d(120)}>Pedro</span>
            </span>
            <span className="mask-line">
              <span style={d(230)}>Tortoriello</span>
            </span>
          </h1>
          <p className="enter mt-8 font-ui text-[clamp(1.05rem,1.5vw,1.25rem)] font-[620] tracking-[-0.01em] text-ink [font-variation-settings:'wdth'_104]" style={d(420)}>
            {profile.role} <span className="text-line-strong">/</span> <span className="text-accent">{profile.focus}</span>
          </p>
          <p className="enter mt-4 max-w-[34rem] text-pretty text-[clamp(1.0625rem,1.35vw,1.1875rem)] leading-[1.6] text-ink-muted" style={d(520)}>
            {profile.description}
          </p>
          <div className="enter mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(640)}>
            <Button href="#projetos" arrow="down">
              Explorar projetos
            </Button>
            <Button href={profile.cv} external variant="secondary" icon={<FileText aria-hidden className="size-4" />}>
              Ver currículo
            </Button>
          </div>
        </div>

        {/* the identity document */}
        <div data-exit="0.2" className="lg:col-span-5 lg:flex lg:justify-end">
          <figure aria-label={`Documento de identidade profissional de ${profile.name}`} className="console ticks enter-window w-full max-w-[30rem] overflow-hidden" style={d(380)}>
            <WaveBand id="identidade-topo" />
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
              <span className="label text-ink-muted">Registro profissional</span>
              <span className="hud text-accent">{profile.location}</span>
            </div>

            <div className="grid grid-cols-[minmax(0,8.5rem)_1fr] gap-5 p-4 sm:grid-cols-[minmax(0,10rem)_1fr] sm:p-5">
              <div className="relative">
                {/* the photo in a guilloché-framed plate */}
                <div className="guilloche-frame border border-line-strong p-[9px]">
                <div className="power-on relative aspect-[4/5] overflow-hidden border border-line-strong bg-raised" style={d(520)}>
                  <Image
                    src="/profile/pedro-tortoriello.jpg"
                    alt="Retrato de Pedro Tortoriello de braços cruzados, com um avião de pequeno porte ao fundo"
                    fill
                    priority
                    sizes="(min-width: 640px) 160px, 136px"
                    className="object-cover"
                  />
                </div>
                </div>
                {/* the seal pressed over the photo's corner, as on an ID */}
                <Rosette seed="identidade" lat={-23.5505} lon={-46.6333} draw="hero" dense={false} className="absolute -bottom-4 -left-4 size-16" />
              </div>
              <dl className="grid grid-cols-2 content-start gap-x-4 gap-y-3.5">
                <Field label="Nome" wide>
                  {profile.fullName}
                </Field>
                <Field label="Função" wide>
                  {profile.role}
                </Field>
                <Field label="Desde">
                  <span className="font-mono text-[0.875rem]">{profile.since}</span>
                </Field>
                <Field label="Hora local">
                  <span className="font-mono text-[0.875rem]">
                    <LocalTime /> BRT
                  </span>
                </Field>
                <Field label="Atuação" wide>
                  {profile.availability.replace("Disponível para atuação ", "")}
                </Field>
              </dl>
            </div>

            <div className="border-t border-line px-4 py-3 sm:px-5">
              {/* 44 characters a line, sized to fit the card from 320px up */}
              <Mrz
                lines={[`IDBRA${mrz(rest.join(" "))}<<${mrz(given)}`, `${mrz(profile.role)}<<SP<<${profile.since}<<${mrz(commit)}`]}
                className="text-[clamp(0.5625rem,2.55vw,0.75rem)] tracking-[0.06em]"
              />
            </div>
          </figure>
        </div>
      </div>

      {/* the four specialties, under the document's wave rule */}
      <div className="container-x pb-10 lg:pb-12">
        <span aria-hidden className="ruler rail-draw block" style={d(900)} />
        <ol aria-label="Especialidades" className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-x-8">
          {specialties.map((s, i) => (
            <li key={s.title} className="enter" style={d(1000 + i * 140)}>
              <p className="font-ui text-[1rem] font-[640] tracking-[-0.01em] text-ink [font-variation-settings:'wdth'_104]">{s.title}</p>
              <p className="mt-1 text-[0.9375rem] leading-snug text-ink-muted">{s.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

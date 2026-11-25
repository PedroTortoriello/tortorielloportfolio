import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import s from "@/components/security/advocacia.module.css";
import { Denomination, Mark, Microtext, Mrz, Rosette, WaveBand, WhatsAppIcon } from "@/components/security/guilloche";
import { IPhone } from "@/components/ui/iphone";
import { coordenadas, documentos, serial, situacao, type Documento } from "@/lib/advocacia";
import { profile } from "@/lib/data";
import { shot } from "@/lib/landing-pages";
import { SITE_URL } from "@/lib/site";

// The site's world ("Papel de segurança") at its most direct: a page for law
// offices, with its own focused header (components/site/portfolio-only.tsx
// hides the portfolio's recruiter navigation here).

const total = documentos.length;
const destaque = documentos.slice(0, 4);
const serie = documentos.slice(4);

const whatsapp = `${profile.whatsapp}?text=${encodeURIComponent(
  "Olá, Pedro! Vi o portfólio de sites para advocacia e quero conversar sobre o site do meu escritório.",
)}`;
const email = `mailto:${profile.email}?subject=${encodeURIComponent("Site para escritório de advocacia")}`;
const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const title = "Sites para escritórios de advocacia";
const description = `${total} sites de advocacia com identidade própria, texto dentro do Provimento 205/2021 da OAB e contato pelo WhatsApp. Por ${profile.name}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/landing-pages/advocacia" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: profile.name,
    title: `${title} | ${profile.name}`,
    description,
    url: `${SITE_URL}/landing-pages/advocacia`,
    images: [{ url: shot(documentos[0].slug, "desktop"), width: 1440, height: 900 }],
  },
};

export const viewport: Viewport = { themeColor: "#e4ebe5", colorScheme: "light" };

const tone = (d: Documento) => (d.preview || d.kind === "Redesign" ? "pending" : "valid");

export default function AdvocaciaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    url: `${SITE_URL}/landing-pages/advocacia`,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: documentos.map((d) => ({ "@type": "ListItem", position: d.serie, name: d.name, url: d.url })),
    },
  };

  return (
    <div className={`${s.world} pb-20 md:pb-0`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="container-x flex min-h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Rosette seed="marca" lat={-23.55} lon={-46.63} dense={false} className="size-9" />
          <span className="leading-tight">
            <span className={`${s.title} block text-[0.9375rem]`}>Pedro Tortoriello</span>
            <span className="block text-[0.8125rem] italic text-(--tinta-2)">Sites para advocacia</span>
          </span>
        </Link>
        <nav aria-label="Contato" className="flex items-center gap-6">
          <Link href="/" className={`${s.textLink} hidden text-[0.875rem] sm:inline`}>
            Portfólio completo
          </Link>
          <a href={whatsapp} target="_blank" rel="noreferrer" className={`${s.secondary} hidden md:inline-flex`}>
            <WhatsAppIcon />
            WhatsApp
          </a>
        </nav>
      </header>

      {/* ---------- The document: first viewport ---------- */}
      <section aria-labelledby="titulo" className="relative">
        <WaveBand id="onda-topo" />
        <div className="container-x grid grid-cols-1 items-center gap-x-10 gap-y-12 py-14 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-12 lg:py-10">
          <div className="lg:col-span-7">
            <h1 id="titulo" className={`${s.display} max-w-[14ch] text-[clamp(2.75rem,6.2vw,5.6rem)] text-(--bordo)`}>
              Sites para escritórios de advocacia
            </h1>
            <p className={`${s.lead} mt-8 max-w-[36rem]`}>
              Identidade própria para cada escritório, texto dentro do Provimento 205/2021 da OAB e contato direto pelo WhatsApp.
            </p>
            <p className="mt-4 max-w-[36rem] text-[1.0625rem] leading-7 text-(--tinta-2)">
              No modelo site e sistema, o escritório também ganha um painel que lê as intimações do dia e uma Área do Cliente.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a href={whatsapp} target="_blank" rel="noreferrer" className={s.primary}>
                <WhatsAppIcon className="size-[1.125rem]" />
                Conversar pelo WhatsApp
              </a>
              <a href="#registro" className={s.textLink}>
                Ver os {total} escritórios
              </a>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[34rem] lg:col-span-5">
            <Rosette
              seed="denominacao"
              lat={-23.5505}
              lon={-46.6333}
              draw="hero"
              className="absolute top-[38%] left-1/2 -z-10 w-[94%] -translate-x-1/2 -translate-y-1/2 opacity-70"
            />
            <Denomination value={total} />
            {/* printed on a paper knock-out, clear of the guilloché band */}
            <figcaption className="mt-10 text-center text-[0.9375rem] italic leading-6 text-(--tinta-2)">
              <span className="bg-(--papel) px-2 [box-decoration-break:clone]">
                sites de advocacia publicados ou em aprovação,
                <br />
                de Gurupi (TO) a Gramado (RS)
              </span>
            </figcaption>
          </figure>
        </div>
        <div className="container-x pb-4">
          <Mrz lines={["P<BRASITES<PARA<ESCRITORIOS<DE<ADVOCACIA", `TORTORIELLO<<PEDRO<<SAO<PAULO<SP<<${String(total).padStart(3, "0")}`]} />
        </div>
        <WaveBand id="onda-base" />
      </section>

      {/* ---------- Register ---------- */}
      <section id="registro" aria-labelledby="registro-titulo" className="container-x scroll-mt-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
          <h2 id="registro-titulo" className={`${s.display} text-[clamp(2.25rem,4.4vw,3.75rem)] lg:col-span-6`}>
            Os {total} escritórios da série
          </h2>
          <p className="max-w-[34rem] text-[1.0625rem] leading-7 text-(--tinta-2) lg:col-span-5 lg:col-start-8">
            Cada site é um documento numerado, com cidade e situação. Os quatro primeiros abrem em página inteira; os outros seguem em formato compacto.
          </p>
        </div>
        <table className="mt-12 w-full border-collapse text-left">
          <thead>
            <tr className={`${s.field} border-b border-(--fio-forte) text-(--tinta-3)`}>
              <th scope="col" className="w-[4.5rem] py-3 pr-4 font-[inherit]">
                Nº
              </th>
              <th scope="col" className="py-3 pr-4 font-[inherit]">
                Escritório
              </th>
              <th scope="col" className="hidden py-3 pr-4 font-[inherit] md:table-cell">
                Cidade
              </th>
              <th scope="col" className="hidden py-3 pr-4 font-[inherit] lg:table-cell">
                Tipo
              </th>
              <th scope="col" className="hidden py-3 font-[inherit] sm:table-cell">
                Situação
              </th>
            </tr>
          </thead>
          <tbody>
            {documentos.map((d) => (
              <tr key={d.slug} className="border-b border-(--fio) align-baseline">
                <td className={`${s.serial} py-4 pr-4 text-[0.8125rem] text-(--bordo)`}>{String(d.serie).padStart(2, "0")}</td>
                <td className="py-4 pr-4">
                  <a href={`#${d.slug}`} className={`${s.title} text-[1.0625rem] underline decoration-(--fio-forte) underline-offset-4 hover:decoration-(--bordo)`}>
                    {d.name}
                  </a>
                  <span className="mt-1 block text-[0.875rem] text-(--tinta-2) md:hidden">{d.city}</span>
                  <span className="mt-2 block sm:hidden">
                    <Mark tone={tone(d)}>{situacao(d)}</Mark>
                  </span>
                </td>
                <td className="hidden py-4 pr-4 text-[0.9375rem] text-(--tinta-2) md:table-cell">{d.city}</td>
                <td className="hidden py-4 pr-4 text-[0.9375rem] italic text-(--tinta-2) lg:table-cell">{d.kind}</td>
                <td className="hidden py-4 sm:table-cell">
                  <Mark tone={tone(d)}>{situacao(d)}</Mark>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ---------- The documents ---------- */}
      <div className={`${s.series} container-x lg:pl-24`}>
        {destaque.map((d) => (
          <Plate key={d.slug} d={d} />
        ))}

        <section aria-labelledby="serie-titulo" className="border-t border-(--fio-forte) pt-20 pb-8">
          <div className="grid grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-12 lg:items-end">
            <h2 id="serie-titulo" className={`${s.display} text-[clamp(2rem,3.6vw,3rem)] lg:col-span-6`}>
              Mais {serie.length} escritórios
            </h2>
            <p className="max-w-[32rem] text-[1.0625rem] leading-7 text-(--tinta-2) lg:col-span-5 lg:col-start-8">
              Sites de advogadas e advogados de Gramado a Gurupi; cinco deles no modelo site e sistema.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2">
            {serie.map((d) => (
              <Compact key={d.slug} d={d} />
            ))}
          </div>
        </section>
      </div>

      {/* ---------- What every site carries ---------- */}
      <section aria-labelledby="clausulas-titulo" className="container-x py-24 lg:py-32">
        <WaveBand id="onda-clausulas" className="mb-16" />
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
          <h2 id="clausulas-titulo" className={`${s.display} text-[clamp(2.25rem,4.4vw,3.75rem)] lg:col-span-5`}>
            O que vem em cada site
          </h2>
          <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:col-span-7">
            {clausulas.map((c) => (
              <div key={c.termo} className="border-t border-(--fio-forte) py-6">
                <dt className={`${s.title} flex gap-2 text-[1.1875rem]`}>
                  <span aria-hidden className="font-[family-name:var(--font-doc)] text-(--bordo)">
                    §
                  </span>
                  {c.termo}
                </dt>
                <dd className="mt-3 pl-5 text-[1rem] leading-7 text-(--tinta-2)">{c.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Nº 13, reserved ---------- */}
      <section aria-labelledby="fecho-titulo" className="relative overflow-hidden border-y border-(--fio-forte) bg-(--papel-claro)">
        <WaveBand id="onda-fecho" />
        <div className="container-x grid grid-cols-1 items-center gap-x-10 gap-y-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="relative mx-auto w-full max-w-[22rem] lg:col-span-4">
            <Rosette seed="reservado" lat={-23.5505} lon={-46.6333} draw="doc" className="w-full opacity-80" />
            <p className={`${s.serial} absolute inset-0 grid place-items-center text-center text-(--bordo)`}>
              {/* a round paper knock-out inside the inner ring: covers the core, never cuts the ring */}
              <span className="grid aspect-square w-[42%] place-items-center rounded-full bg-(--papel-claro)">
                <span>
                  <span className={`${s.numeral} block text-[clamp(1.5rem,2.8vw,2.25rem)] leading-none`}>Nº {total + 1}</span>
                  <span className="mt-1.5 block text-[0.6875rem] tracking-[0.16em]">RESERVADO</span>
                </span>
              </span>
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="fecho-titulo" className={`${s.display} max-w-[18ch] text-[clamp(2.25rem,4.6vw,4rem)] text-(--bordo)`}>
              O próximo documento da série pode ser o do seu escritório.
            </h2>
            <p className={`${s.lead} mt-7 max-w-[34rem] text-(--tinta-2)`}>
              Conte em que área o escritório atua e em que cidade. A conversa começa pelo WhatsApp, sem formulário.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href={whatsapp} target="_blank" rel="noreferrer" className={s.primary}>
                <WhatsAppIcon className="size-[1.125rem]" />
                Conversar pelo WhatsApp
              </a>
              <a href={email} className={s.secondary}>
                <Mail aria-hidden className="size-4" strokeWidth={1.75} />
                Escrever por e-mail
              </a>
            </div>
          </div>
        </div>
        <WaveBand id="onda-fecho-base" />
      </section>

      <footer className="container-x flex flex-col gap-4 py-10 text-[0.875rem] text-(--tinta-2) sm:flex-row sm:items-center sm:justify-between">
        <p>{profile.name} · sites e sistemas para escritórios de advocacia · São Paulo, SP</p>
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/" className={s.textLink}>
            Portfólio completo
          </Link>
          <a href={whatsapp} target="_blank" rel="noreferrer" className={s.textLink}>
            {profile.whatsappLabel}
          </a>
        </p>
      </footer>
      <Microtext text={`${profile.name} sites para advocacia`} className="pb-3 text-center" />

      <div className={s.phoneBar}>
        <a href={whatsapp} target="_blank" rel="noreferrer" className={`${s.primary} w-full`}>
          <WhatsAppIcon className="size-[1.125rem]" />
          Conversar pelo WhatsApp
        </a>
      </div>
    </div>
  );
}

const clausulas = [
  { termo: "Identidade própria", texto: "Direção de arte tirada do lugar e da área do escritório, não de um modelo pronto." },
  { termo: "Dentro das regras da OAB", texto: "Texto informativo, sem promessa de resultado e sem depoimentos de clientes, como pede o Provimento 205/2021." },
  { termo: "Contato que funciona", texto: "Botões de WhatsApp com a mensagem pronta para cada assunto, no celular e no computador." },
  { termo: "Encontrado na sua cidade", texto: "Os dados do escritório organizados para as buscas do Google na sua região." },
  { termo: "Painel de intimações", texto: "No modelo site e sistema, um painel que lê as intimações do dia publicadas em nome do advogado." },
  { termo: "Área do Cliente", texto: "No modelo site e sistema, o cliente acompanha os próprios processos sem ligar para o escritório." },
];

function Facts({ d }: { d: Documento }) {
  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.9375rem] text-(--tinta-2)">
      <span className={`${s.serial} text-[0.8125rem] text-(--bordo)`}>{serial(d.serie, total)}</span>
      <span aria-hidden>·</span>
      <span>{d.city}</span>
      <span aria-hidden>·</span>
      <span className="italic">{d.kind}</span>
      <Mark tone={tone(d)}>{situacao(d)}</Mark>
    </p>
  );
}

function Visit({ d }: { d: Documento }) {
  return (
    <a href={d.url} target="_blank" rel="noreferrer" className={s.secondary} aria-label={`Visitar o site de ${d.name} (abre em nova aba)`}>
      Visitar o site
      <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
    </a>
  );
}

// A full plate: the four strongest offices.
function Plate({ d }: { d: Documento }) {
  return (
    <article
      id={d.slug}
      aria-labelledby={`${d.slug}-nome`}
      className={`${s.doc} relative grid scroll-mt-6 grid-cols-1 gap-x-12 gap-y-10 border-t border-(--fio-forte) py-20 lg:grid-cols-12 lg:py-24`}
    >
      <span aria-hidden className={`${s.window} ${s.serial}`}>
        {serial(d.serie, total)}
      </span>

      <div className="relative pr-10 pb-10 sm:pr-16 lg:col-span-7 lg:self-start">
        <a href={d.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden className="block">
          <div className={s.plate}>
            <Image src={shot(d.slug, "desktop")} alt="" width={1440} height={900} sizes="(min-width: 1024px) 640px, 90vw" className="h-auto w-full" />
          </div>
        </a>
        <IPhone src={shot(d.slug, "mobile")} url={d.url} sizes="150px" className="absolute right-0 bottom-0 w-[25%] max-w-[9.5rem] min-w-[6.25rem]" />
        <p className={`${s.serial} mt-3 text-[0.75rem] text-(--tinta-3)`}>{host(d.url)}</p>
      </div>

      <div className="lg:col-span-5">
        <h2 id={`${d.slug}-nome`} className={`${s.display} text-[clamp(2rem,3.4vw,2.875rem)]`}>
          {d.name}
        </h2>
        <Facts d={d} />
        {d.areas ? <p className="mt-3 text-[1rem] italic text-(--verde)">{d.areas}</p> : null}
        <p className="mt-6 text-[1.0625rem] leading-7">{d.resumo}</p>
        <h3 className={`${s.field} mt-8 text-(--tinta-3)`}>O que o escritório recebeu</h3>
        <ul className={`${s.clauses} mt-3 grid gap-2.5 border-t border-(--fio) pt-4 text-[0.9375rem] leading-6 text-(--tinta-2)`}>
          {d.recebe.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        {d.note ? <p className="mt-5 text-[0.875rem] italic leading-6 text-(--tinta-3)">{d.note}</p> : null}
        {/* The office's own rosette seals the document beside its action. */}
        <div className="mt-8 flex items-center justify-between gap-6">
          <Visit d={d} />
          <Rosette seed={d.slug} lat={d.lat} lon={d.lon} draw="doc" className="size-28 shrink-0" />
        </div>
      </div>

      <p
        aria-hidden
        className={`${s.serial} min-w-0 overflow-hidden border-t border-(--fio) pt-3 text-[0.6875rem] tracking-[0.14em] whitespace-nowrap text-(--tinta-3) uppercase lg:col-span-12`}
      >
        {[d.city, coordenadas(d.lat, d.lon), d.kind, d.areas, situacao(d), host(d.url), `${profile.name} · advocacia`].filter(Boolean).join("  ·  ")}
      </p>
    </article>
  );
}

// The compact series.
function Compact({ d }: { d: Documento }) {
  return (
    <article id={d.slug} aria-labelledby={`${d.slug}-nome`} className={`${s.doc} relative min-w-0 scroll-mt-6`}>
      <a href={d.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden className="block">
        <div className={s.plate}>
          <Image src={shot(d.slug, "desktop")} alt="" width={1440} height={900} sizes="(min-width: 768px) 560px, 90vw" className="h-auto w-full" />
        </div>
      </a>
      <div className="mt-7 flex items-start justify-between gap-6">
        <h3 id={`${d.slug}-nome`} className={`${s.title} text-[clamp(1.5rem,2.3vw,1.875rem)]`}>
          {d.name}
        </h3>
        <Rosette seed={d.slug} lat={d.lat} lon={d.lon} draw="doc" className="size-16 shrink-0 opacity-80" />
      </div>
      <Facts d={d} />
      {d.areas ? <p className="mt-3 text-[1rem] italic text-(--verde)">{d.areas}</p> : null}
      <p className="mt-5 text-[1rem] leading-7">{d.resumo}</p>
      <ul className={`${s.clauses} mt-5 grid gap-2 text-[0.9375rem] leading-6 text-(--tinta-2)`}>
        {d.recebe.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      {d.note ? <p className="mt-4 text-[0.875rem] italic leading-6 text-(--tinta-3)">{d.note}</p> : null}
      <div className="mt-7">
        <Visit d={d} />
      </div>
    </article>
  );
}

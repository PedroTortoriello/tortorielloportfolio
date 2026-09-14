import { TechLogo } from "@/components/ui/tech-logo";
import { technologies } from "@/lib/data";

const featured = [
  "OpenAI", "Claude", "n8n", "Make", "Zapier",
  "Next.js", "React", "Node.js", "Supabase", "AWS",
];

const items = featured
  .map((name) => technologies.find((t) => t.name === name))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

export function LogoStrip() {
  return (
    <section aria-label="Tecnologias e plataformas" className="border-t border-border">
      <div className="container-page py-10">
        <p className="kicker text-center">Tecnologias e plataformas que utilizo</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
          {items.map((t) => (
            <li key={t.name} className="flex items-center gap-2.5 opacity-65">
              <TechLogo src={t.logo} alt={t.name} className="size-5" />
              <span className="text-sm text-ink-muted">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

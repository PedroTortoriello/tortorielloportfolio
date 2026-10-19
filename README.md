# Portfolio · Pedro Tortoriello

Portfólio de **Pedro Tortoriello — Software Engineer | Full Stack Development & Automation**.
Direção visual "Technical Elegance": o site é um ambiente de engenharia em sessão (terminal, editor,
grafos de arquitetura, ciclo de requisição, linha do tempo em formato de git graph, pipeline de CI),
mostrando trabalho real.

## Stack

Next.js 16 (App Router, tudo estático) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Geist.
Sem bibliotecas de gráficos: diagramas em SVG, fundo do hero em `<canvas>`, highlight de código próprio
(server-side, zero JS).

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero, cases de engenharia, jornada, stack, método, landing pages, contato |
| `/landing-pages` | Índice de todas as LPs por nicho |
| `/landing-pages/[nicho]` | Página estática por nicho (`generateStaticParams`), com metadata e JSON-LD próprios |
| `/opengraph-image`, `/sitemap.xml`, `/robots.txt`, `/icon.svg` | SEO técnico |

## Onde editar o conteúdo

Todo o conteúdo vem de arquivos de dados. **Regra:** nada além do que o currículo e os repositórios confirmam.

- `lib/data.ts`: perfil, navegação, especialidades, script do terminal, experiência (do CV), formação,
  stack por domínio (com o uso confirmado e onde aparece) e o método.
- `lib/projects.ts`: os quatro cases (com grafos de arquitetura) e a lista "Também construí".
  Trabalho feito em dupla fica marcado em `role` e `note`.
- `lib/landing-pages.ts`: nichos e LPs. Para adicionar uma LP: inclua o item com `niche` igual ao `slug`
  de um nicho e salve os prints em `public/lps/<slug>-desktop.jpg` (1440×900) e
  `public/lps/<slug>-mobile.jpg` (390×844 @2x). Um nicho novo gera a rota sozinho no próximo build.
- `public/cv-pedro-tortoriello.pdf`: currículo aberto pelo botão "Ver currículo".

## Rodar

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run build   # build de produção (gera as rotas estáticas)
npm run lint    # ESLint
npx tsc --noEmit
node scripts/check-pix.ts   # self-check do gerador BR Code usado no case Noivar
```

## Deploy

Defina `NEXT_PUBLIC_SITE_URL` com o domínio final (usado em canonical, Open Graph, sitemap e JSON-LD).
Na Vercel, sem a variável, usa a URL de produção do projeto; fora dela o build avisa e cai em
`http://localhost:3000`. O domínio `pedrotortoriello.com` ainda não está registrado.

## Acessibilidade e movimento

Conteúdo visível sem JavaScript (o movimento só é ativado quando o JS roda), navegação por teclado
nos diagramas e tooltips, e `prefers-reduced-motion` respeitado em todas as animações (canvas, pulsos,
terminal e revelações).

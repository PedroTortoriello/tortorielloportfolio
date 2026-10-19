# Portfolio · Pedro Tortoriello

Portfólio de **Pedro Tortoriello — Software Engineer | Full Stack Development & Automation**.

**V2 · Control Room.** O site é uma sala de controle para os sistemas que o Pedro colocou no ar: a primeira dobra é a
"parede frontal" (nome, especialidade, proposta, o retrato do Pedro num console e a trajetória que se desenha), cada case é um
console com captura real do produto, arquitetura e parâmetros lidos do código, e uma única linha de trajetória (o trilho
fixo à esquerda e a barra de progresso) acompanha a rolagem pela página inteira.

## Stack

Next.js 16 (App Router, tudo estático) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText,
DrawSVG) · Motion · Geist, Geist Mono e Hubot Sans. Sem bibliotecas de gráficos: diagramas em SVG, highlight de código
próprio (server-side, zero JS). Sem Three.js: nenhuma cena 3D traria ganho real sobre SVG aqui.

## Sistema de motion

Cada efeito tem um dono só (`lib/motion.ts` define durações e curvas):

| Camada | Responsável | Onde |
| --- | --- | --- |
| Entrada da primeira dobra | CSS (keyframes com `--d`) | `components/hero/*`, `app/globals.css` |
| Tudo que depende da rolagem | GSAP + ScrollTrigger, carregado sob demanda | `components/motion/motion-root.tsx`, `components/chrome/mission-rail.tsx` |
| Estado de componentes | Motion (`motion/react`) | menu, sublinhado da navegação |
| Hover, foco, pressionar | CSS | componentes |

As seções não importam GSAP: elas declaram a intenção com atributos (`data-reveal`, `data-stagger`, `data-title`,
`data-draw`, `data-print`, `data-power`, `data-parallax`, `data-exit`, `data-loop`) e o `MotionRoot` liga tudo. O HTML
renderizado já é o estado final: sem JavaScript, com `prefers-reduced-motion` ou na impressão, todo o conteúdo aparece.

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Parede frontal, projetos, experiência, processo, princípios, stack, landing pages, contato |
| `/landing-pages` | Índice de todas as LPs por nicho |
| `/landing-pages/[nicho]` | Página estática por nicho (`generateStaticParams`), com metadata e JSON-LD próprios |
| `/landing-pages/[nicho]/[lp]` | Página de cada LP |
| `/opengraph-image`, `/sitemap.xml`, `/robots.txt`, `/icon.svg` | SEO técnico |

## Onde editar o conteúdo

Todo o conteúdo vem de arquivos de dados. **Regra:** nada além do que o currículo e os repositórios confirmam.

- `lib/data.ts`: perfil, navegação, especialidades, experiência (do CV), formação, stack por
  domínio (com o uso confirmado e onde aparece), o processo e os princípios.
- `lib/projects.ts`: os quatro cases (problema, solução, contribuição, parâmetros do código em `readouts`, capturas em
  `shot`, grafos de arquitetura) e a lista "Também construí". Trabalho feito em dupla fica marcado em `role` e `note`.
- `public/projects/<case>/`: capturas reais das páginas públicas de cada produto (desktop 1440×900, celular 390×844 @2x).
  As cores da barra de status do iPhone vêm de `lib/shot-tones.ts`.
- `lib/landing-pages.ts`: nichos e LPs. Para adicionar uma LP: inclua o item com `niche` igual ao `slug` de um nicho e
  salve os prints em `public/lps/<slug>-desktop.jpg` (1440×900) e `public/lps/<slug>-mobile.jpg` (390×844 @2x).
- `public/profile/pedro-tortoriello.jpg`: retrato da primeira dobra (foto enviada pelo Pedro, recortada em 4:5 e tratada
  só em cor e contraste, sem retoque).
- `public/cv-pedro-tortoriello.pdf`: currículo aberto pelo botão "Ver currículo".

Os indicadores da primeira dobra só mostram valores reais: a hora local de São Paulo, o ano de início e o commit do build
(`VERCEL_GIT_COMMIT_SHA` na Vercel, `git rev-parse` localmente).

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

Conteúdo visível sem JavaScript, navegação por teclado em diagramas e no mapa de stack, foco visível em tudo, e
`prefers-reduced-motion` respeitado em todas as animações (a página mostra o estado final, sem deslocamentos).

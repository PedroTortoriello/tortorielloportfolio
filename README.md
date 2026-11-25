# Portfolio · Pedro Tortoriello

Portfólio de **Pedro Tortoriello — Software Engineer | Full Stack Development & Automation**, em inglês, para atuação remota no Brasil e fora.

**V4 · Cinematic** (novembro de 2026). Cada seção segue uma das quatro referências escolhidas pelo Pedro:

| Seção | Referência | O que tem |
| --- | --- | --- |
| Hero + Intro | esfera holográfica | Orb em WebGL (bolha de sabão: película iridescente, aro azul, halo) atrás da manchete; a intro chega com o orb se afastando e as palavras acendendo com a rolagem |
| Work | painel preto sobre parede clara | Parede de névoa com formas líquidas pretas, painel "//PRECISION DRIVEN PROJECTS", quatro cases com capas renderizadas |
| Skills | "SKILLS." + dock violeta | Tektur e Big Shoulders Stencil, quatro colunas, dock flutuante com ícones próprios |
| Experience | (sem referência) | Livro-razão editorial, ponte de fuso São Paulo ↔ Califórnia |
| Contact | itálico largo + tickets lima | Anybody itálico largo, tickets que seguem o cursor, Instrument Serif |

## Stack

Next.js 16 (App Router, tudo estático) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText, DrawSVG) ·
Lenis · Motion · WebGL puro no orb (sem Three.js: um shader de fragmento num triângulo de tela cheia bastou e pesa quase nada).
Fontes (next/font, auto-hospedadas): Inter Tight, Outfit, Geist Mono, Tektur, Big Shoulders Stencil, Anybody, Instrument Serif;
só as três da primeira dobra fazem preload.
Geist Mono é um subset (latin + setas) do arquivo variável do pacote `geist`, em `app/fonts/GeistMono-latin.woff2` (71 KB → 33 KB).
Para refazer, se algum texto mono precisar de outros caracteres:
`python -m fontTools.subset node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2 --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2212" --layout-features="*" --flavor=woff2 --output-file=app/fonts/GeistMono-latin.woff2`

## Sistema de motion

| Camada | Responsável | Onde |
| --- | --- | --- |
| Entrada da primeira dobra | CSS (keyframes com `--d`) | `components/hero/*`, `app/globals.css` |
| Rolagem suave | Lenis, lido pelo ScrollTrigger (desligado com movimento reduzido) | `components/motion/motion-root.tsx` |
| Tudo que depende da rolagem ou do cursor | GSAP, carregado sob demanda | `components/motion/motion-root.tsx`, `components/hero/stage-motion.tsx` |
| Orb | WebGL, pausa fora da tela e com a aba oculta; um quadro parado com movimento reduzido | `components/hero/orb.tsx` |
| Abertura "The Origin" | Timeline GSAP que conduz o mesmo orb (semente de luz, enxame de partículas, esfera, onda, nome) até o hero; 1ª visita da sessão, pulável | `components/hero/opening.tsx`, `lib/intro.ts` |
| Estado de componentes | Motion (`motion/react`) | dock, botão de copiar |

As seções declaram a intenção com atributos (`data-reveal`, `data-stagger`, `data-split`, `data-scrub-words`, `data-mask`,
`data-parallax`, `data-magnetic`, `data-cursor-field` + `data-depth`, `data-chip-area` + `data-chip`) e o `MotionRoot` liga tudo.
O HTML renderizado já é o estado final: sem JavaScript, com `prefers-reduced-motion` ou na impressão, todo o conteúdo aparece.

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero, intro, work, skills, experience, recommendations (só com recomendações cadastradas), contact |
| `/work` | Índice: os quatro cases e o arquivo de outros projetos |
| `/work/[slug]` | Estudo de caso (visão geral, problema, arquitetura, decisões, desafios, implementação, tecnologias, resultados) |
| `/work/[slug]/opengraph-image` | Imagem de link de cada case (capa, índice, título, categoria, papel, stack), gerada no build |
| `/cv` | Currículo em inglês para imprimir (A4, uma coluna, `noindex`); é a fonte do PDF |
| `/landing-pages`, `/landing-pages/[nicho]`, `/landing-pages/[nicho]/[lp]` | Área de LPs em português, no sistema escuro |
| `/landing-pages/advocacia` | Mundo próprio (V3 "Papel de segurança"), com tokens e fontes isolados em `app/landing-pages/advocacia/` |
| `/opengraph-image`, `/sitemap.xml`, `/robots.txt`, `/icon.svg` | SEO técnico |

## Onde editar o conteúdo

**Regra:** nada além do que o currículo e os repositórios confirmam. Trabalho em dupla fica marcado (`role`, `note`).

- `lib/data.ts`: perfil (inclui o resumo do currículo), manchetes do hero e da intro, navegação, dock, skills, experiência,
  formação e `recommendations`.
- `recommendations` (em `lib/data.ts`): recomendações do LinkedIn coladas palavra por palavra, com nome, cargo, empresa,
  relação (como o LinkedIn escreve) e, se houver, data, link e `lang` (o idioma da citação quando não for inglês, como
  `"pt-BR"`: ela nunca é traduzida). Nunca resumir, editar nem inventar. Com a lista vazia a seção não aparece; com uma ou
  mais, ela entra entre Experience e Contact.
- `lib/projects.ts`: os quatro cases (campos do card e do estudo de caso) e o arquivo (`archive`). O conteúdo dos cases foi
  extraído dos repositórios de cada produto e conferido afirmação por afirmação.
- `public/work/`: capas dos cases e a parede da seção Work, renderizadas pelo laboratório abaixo (nada de banco de imagens).
- `lib/landing-pages.ts`: nichos e LPs (prints em `public/lps/`).
- `public/cv-pedro-tortoriello-en.pdf`: o currículo do site (inglês), impresso da rota `/cv` a partir de `lib/data.ts` e
  `lib/projects.ts`. Mudou o conteúdo? Gere de novo (abaixo). `public/cv-pedro-tortoriello.pdf` é o antigo, em português,
  guardado como `profile.cvPt` para o site em português (ainda sem Bradesco e Maximum, e com o GitHub antigo).

## Currículo (PDF)

Com o servidor de desenvolvimento rodando:

```bash
node scripts/cv-pdf.mjs                              # imprime http://localhost:3311/cv
node scripts/cv-pdf.mjs http://localhost:3000/cv     # outra porta, ou o /cv publicado
```

O script abre o Chrome headless (`CHROME_PATH` troca o executável) com um perfil temporário e grava
`public/cv-pedro-tortoriello-en.pdf`. A página define A4 e margens (`@page`), esconde cabeçalho, rodapé e dock na
impressão e usa os cortes estáticos de Geist e Geist Mono: o Chrome embute fonte variável como Type 3, que parte dos
sistemas de recrutamento (ATS) lê mal; as estáticas entram como TrueType com o mapa de texto. Sem telefone, de propósito.
Os links do portfólio e de cada case só aparecem quando a URL do site é pública: impresso de `localhost`, o PDF sai sem
eles; impresso do domínio publicado (ou com `NEXT_PUBLIC_SITE_URL` definido no servidor local), sai com eles.

## Imagens de link dos cases

`app/work/[slug]/opengraph-image.tsx` desenha 1200×630 por case, no build. O renderizador (Satori) não lê WebP, então
cada capa tem uma cópia JPEG em `app/work/[slug]/_og/`. Se uma capa mudar, refaça as cópias:

```bash
node -e "for (const s of ['cadenceflow','finance-platform','legal-intelligence','automation-infrastructure']) require('sharp')('public/work/'+s+'.webp').resize(1200,800).jpeg({quality:80,mozjpeg:true}).toFile('app/work/[slug]/_og/'+s+'.jpg')"
```

(`sharp` já vem com o Next.) Um case novo precisa da sua cópia também.

## Imagens (laboratório)

As capas são cenas em ray marching (um shader por cena) renderizadas no navegador e salvas em WebP:

```bash
node scripts/imagery/serve.mjs   # abre http://localhost:3399
```

No console da página: `start("cadenceflow")` (ou `finance-platform`, `legal-intelligence`, `automation-infrastructure`, `wall`),
`status()` até terminar, e `save("cadenceflow")` grava em `public/work/`. As cenas ficam em `scripts/imagery/lab.html`.

## Rodar

```bash
npm install
npm run dev
```

A abertura toca uma vez por sessão do navegador. Para vê-la de novo em desenvolvimento, abra `http://localhost:3000/?intro`
(no console, `window.__opening.pause().progress(.5)` navega pela timeline). Se uma mudança no `app/globals.css` não aparecer
no `next dev`, pare o servidor, apague `.next` e suba de novo: o Turbopack às vezes serve o CSS global antigo.

## Scripts

```bash
npm run build   # build de produção (gera as rotas estáticas)
npm run lint    # ESLint
npx tsc --noEmit
```

## Deploy

Defina `NEXT_PUBLIC_SITE_URL` com o domínio final (usado em canonical, Open Graph, sitemap e JSON-LD).
Na Vercel, sem a variável, usa a URL de produção do projeto; fora dela o build avisa e cai em `http://localhost:3000`.

Tudo que carrega o endereço do site sai de `lib/site.ts`: o `metadataBase` do layout (canonicals, `og:url` e as imagens
de link), `app/sitemap.ts`, `app/robots.ts`, os JSON-LD e os links do `/cv`. Trocar de domínio não muda código.

### Domínio próprio

1. Compre o domínio (Registro.br para `.com.br`; qualquer registrador para `.com`).
2. Vercel → projeto **tortorielloportfolio** → Settings → Domains → Add: o domínio raiz e o `www`, um redirecionando
   para o outro (a tela oferece; deixe o raiz como principal).
3. No registrador, crie os registros DNS que essa tela mostrar (A no raiz, CNAME no `www`) ou aponte os nameservers
   para a Vercel. Espere "Valid Configuration" e o certificado HTTPS.
4. Settings → Environment Variables: `NEXT_PUBLIC_SITE_URL` = `https://seudominio.com` (sem barra no fim), em Production.
5. Faça um novo deploy (Deployments → Redeploy, ou `vercel deploy --prod`): a variável entra no build, não em runtime.
6. Confira no domínio novo: `canonical` e `og:url` no código-fonte de `/` e de um case, `og:image` apontando para o
   domínio, `/sitemap.xml` e `/robots.txt`.
7. Gere o currículo a partir do domínio (`node scripts/cv-pdf.mjs https://seudominio.com/cv`), para o PDF trazer os
   links do portfólio, e publique de novo. Por fim, troque o site no LinkedIn e no GitHub.

## Acessibilidade e movimento

Conteúdo visível sem JavaScript, navegação por teclado (link para pular ao conteúdo, foco lima visível em tudo),
`prefers-reduced-motion` respeitado em todas as animações (sem rolagem suave, sem scrub, orb parado) e contraste AA.
O botão de pausa no cabeçalho (WCAG 2.2.2) liga `html.still`: as animações em loop param, o orb congela no quadro atual,
a abertura não toca, e a escolha fica salva (`localStorage` `pt-still`, restaurada pelo script do `<head>`).

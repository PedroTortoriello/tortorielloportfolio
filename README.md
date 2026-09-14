# Portfolio Pedro Tortoriello

Portfolio profissional desenvolvido para apresentar a atuação de Pedro Tortoriello como Engenheiro de Software Full Stack, com foco em sistemas SaaS, automações, integrações, produtos digitais e soluções web sob medida.

O projeto foi construído com Next.js, React, TypeScript e Tailwind CSS, trazendo uma experiência visual moderna, responsiva e orientada à conversão, com seções para posicionamento profissional, diferenciais, projetos, stack técnica e contato direto via WhatsApp.

## Visão geral

Este portfolio funciona como uma vitrine comercial e técnica. A proposta é comunicar experiência, especialidades e projetos de forma clara para empresas, clientes e parceiros que buscam desenvolvimento de sistemas, SaaS, automações e aplicações web.

Entre os destaques estão:

- Hero section com posicionamento profissional e chamadas para ação.
- Navegação fixa com links internos para as principais seções.
- Marquee animado com tecnologias e áreas de atuação.
- Seção de experiência com prova de valor e diferenciais.
- Lista de projetos com cards, tags, resultados e links externos.
- Stack técnica agrupada por categoria.
- CTA final para contato via WhatsApp.
- Layout responsivo com identidade visual dark, gradientes e animações sutis.

## Tecnologias

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Motion](https://motion.dev/)
- [ESLint](https://eslint.org/)

## Estrutura do projeto

```txt
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── magnetic-button.tsx
│   ├── portfolio-experience.tsx
│   └── reveal.tsx
├── lib/
│   └── data.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Como rodar localmente

Clone o repositório e instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```txt
http://localhost:3000
```

## Scripts disponíveis

```bash
npm run dev
```

Executa o projeto em modo de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run start
```

Executa a aplicação após o build.

```bash
npm run lint
```

Executa a verificação de lint do projeto.

## Personalização

As principais informações do portfolio ficam centralizadas em:

```txt
lib/data.ts
```

Nesse arquivo é possível alterar:

- Nome, cargo, localização e link de contato.
- Headline e resumo profissional.
- Estatísticas exibidas na hero section.
- Diferenciais e processo de trabalho.
- Projetos, categorias, resultados, módulos, tags e URLs.
- Tecnologias exibidas na seção de stack.

## Deploy

O projeto pode ser publicado facilmente na [Vercel](https://vercel.com/), plataforma recomendada para aplicações Next.js.

Fluxo sugerido:

1. Subir o projeto para um repositório no GitHub.
2. Importar o repositório na Vercel.
3. Manter o framework como Next.js.
4. Executar o deploy.

## Autor

Desenvolvido por Pedro Tortoriello.

- LinkedIn: [pedro-tortoriello](https://www.linkedin.com/in/pedro-tortoriello/)
- Portfolio: projeto pessoal de apresentação profissional

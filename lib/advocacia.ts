import { landingPages, type LandingPage } from "@/lib/landing-pages";

// The advocacia route speaks to lawyers, not recruiters: the same facts as
// lib/landing-pages.ts, rewritten as what the office received. Nothing here
// may go beyond those entries. Coordinates are the city centre (public data)
// and seed each office's guilloché, so no two documents share a rosette.

type Dossie = {
  slug: string;
  areas?: string;
  resumo: string;
  recebe: string[];
  lat: number;
  lon: number;
};

// Order is curatorial: the four strongest open the series as full plates.
const dossies: Dossie[] = [
  {
    slug: "farchi-advocacia",
    areas: "Dez áreas do Direito",
    resumo:
      "Site do escritório com Portal do Cliente: quem contrata acompanha o próprio processo sem precisar ligar, e o primeiro contato chega por formulário ou WhatsApp.",
    recebe: [
      "Portal do Cliente para acompanhar os processos, com acesso protegido",
      "Avisos automáticos por WhatsApp e e-mail",
      "Abertura em 3D, com luz e partículas, na primeira tela",
      "Dados do escritório organizados para as buscas do Google",
    ],
    lat: -22.7253,
    lon: -47.6492,
  },
  {
    slug: "guimaraes-pereira-advocacia",
    areas: "Direito Empresarial e Internacional",
    resumo:
      "Proposta de site e sistema para um escritório na Savassi. A direção Meridiano põe Belo Horizonte no mapa: o retrato do advogado num círculo de latão, com o anel das coordenadas girando em volta.",
    recebe: [
      "Textos do site antigo reescritos em tom informativo, sem promessa de resultado",
      "Uma área de atuação nova, tirada dos 96 processos publicados em nome do advogado",
      "Marca, ícones e imagem de compartilhamento feitos para o escritório",
      "Painel testado com os dados reais da OAB: 28 clientes identificados nas intimações dos últimos 180 dias",
    ],
    lat: -19.9167,
    lon: -43.9345,
  },
  {
    slug: "ferraz-leao",
    areas: "Direito Tributário e Societário",
    resumo:
      "Site institucional e editorial de uma boutique de advocacia tributária e societária fundada em 1999 em São Paulo. O acervo de publicações do escritório virou uma biblioteca técnica, organizada por tema, norma citada e vigência.",
    recebe: [
      "45 publicações migradas do site antigo, com busca e filtros por tema e por norma citada",
      "Cada endereço antigo leva direto à publicação nova, sem perder o que já estava no Google",
      "Textos institucionais ajustados ao Provimento 205/2021, com cada ajuste explicado ao escritório",
      "Setores atendidos, sem nomes de clientes, como pede o Código de Ética",
    ],
    lat: -23.5505,
    lon: -46.6333,
  },
  {
    slug: "wmt-advogados",
    areas: "Três sócias, três áreas",
    resumo:
      "Redesign do site de um escritório no Rio conduzido por três sócias: cada uma aparece na primeira tela com a sua área, e o contato vai direto ao WhatsApp.",
    recebe: [
      "Diagnóstico do site antigo: e-mail de contato errado, blog vazio e descrições trocadas no Google",
      "Credibilidade pela formação e pelas publicações das sócias, sem depoimentos, como pede o Provimento 205/2021",
      "11 páginas, cada área com título e descrição próprios para o Google",
    ],
    lat: -22.9068,
    lon: -43.1729,
  },
  {
    slug: "guilherme-pretto-advocacia",
    resumo:
      "Página única com o escritório, as áreas de atuação, a experiência e a localização; o agendamento abre o WhatsApp com a mensagem pronta.",
    recebe: [
      "Botões de WhatsApp com mensagem pronta para cada assunto",
      "Preparado para as buscas de Gramado e região",
      "Imagem própria para quando o link é compartilhado",
    ],
    lat: -29.3787,
    lon: -50.874,
  },
  {
    slug: "helberte-sena-advocacia",
    areas: "Direito Civil, Família e Penal",
    resumo:
      "Site e sistema com a direção de arte Azulejo, tirada dos painéis de azulejo e das abóbadas da Pampulha, em Belo Horizonte.",
    recebe: [
      "Parede de azulejos que viram em onda, com arcos que revelam as fotos",
      "Versão de celular revista no próprio telefone: cerca de 20% mais curta e contato sempre à mão",
      "Painel com as intimações do DJEN pela OAB/MG e Área do Cliente com acesso por link",
    ],
    lat: -19.8516,
    lon: -43.9706,
  },
  {
    slug: "couto-rosa-donega-advocacia",
    areas: "Família e Sucessões, Cível e Trabalhista",
    resumo:
      "Site de um advogado de Franca com a prática concentrada em Família e Sucessões. Tudo o que o site afirma tem fonte pública, e o contato fica a um toque no celular.",
    recebe: [
      "Nome, OAB e CNPJ conferidos na Receita e nas publicações do DJEN",
      "Áreas escolhidas a partir dos processos públicos do advogado, sem mostrar nenhum processo ou cliente",
      "Barra fixa no celular com WhatsApp, ligar e salvar contato",
      "Estante de volumes de Direito como grafismo próprio, que sobe ao abrir a página",
    ],
    lat: -20.5386,
    lon: -47.4008,
  },
  {
    slug: "noel-nunes-advogados",
    areas: "Direito Empresarial e Imobiliário",
    resumo:
      "Site, identidade visual e sistema do escritório. Foi o primeiro do modelo site e sistema: além do site, o escritório ganhou um painel que lê as intimações do dia e uma Área do Cliente.",
    recebe: [
      "Identidade visual completa: monograma NN, cores, tipografia, ícones e posts",
      "Painel com as intimações do DJEN e os andamentos do DataJud, só de fontes públicas e gratuitas",
      "Área do Cliente sem cadastro: o link enviado pelo WhatsApp abre os processos, confirmados pelo CPF ou CNPJ",
    ],
    lat: -25.4284,
    lon: -49.2733,
  },
  {
    slug: "viviane-braga-advocacia",
    resumo:
      "Landing page de uma advogada em estilo de revista: capa em azul-marinho, o retrato dela numa moldura em arco e títulos com palavras em itálico dourado.",
    recebe: [
      "Contato que nunca leva a um destino inválido: sem WhatsApp confirmado, o botão abre o e-mail com a mensagem pronta",
      "Política de Privacidade e Termos de Uso",
      "Textos e dados já no HTML, prontos para o Google",
    ],
    lat: -22.7829,
    lon: -43.4296,
  },
  {
    slug: "martins-domingos-advocacia",
    areas: "Direito do Consumidor e Civil",
    resumo:
      "Site e sistema com a direção Território: o cerrado visto da chapada, com céu claro, uma linha de horizonte e a terra de laterita, e o nome cortado pelo horizonte.",
    recebe: [
      "Assinatura da marca com o nome cortado pelo horizonte",
      "Endereço residencial do CNPJ fora do site, por privacidade",
      "Agenda do painel no fuso de Roraima, onde correm os processos do advogado",
    ],
    lat: -11.7292,
    lon: -49.0686,
  },
  {
    slug: "jorge-fernandes-advocacia",
    resumo:
      "Site e sistema do escritório de uma advogada, com o nome dela escrito letra a letra na primeira tela. O conteúdo veio de fontes públicas, sem dado inventado.",
    recebe: [
      "Abertura com o nome escrito à mão, que continua legível para o Google e para leitores de tela",
      "Agenda do painel conferida com as 344 publicações reais em nome dela",
      "Rotina diária às 6h com as intimações",
    ],
    lat: -23.5446,
    lon: -47.4388,
  },
  {
    slug: "caroline-almeida-martins",
    resumo:
      "Landing page de apresentação de uma advogada; o formulário confere cada campo e envia a mensagem já formatada pelo WhatsApp.",
    recebe: [
      "Formulário que conversa pelo WhatsApp, sem custo de servidor",
      "Dados da advogada organizados para o Google",
      "Entradas suaves conforme a página rola",
    ],
    lat: -23.5505,
    lon: -46.6333,
  },
  {
    slug: "julio-lessa-advocacia",
    areas: "Direito Previdenciário",
    resumo:
      "Site e sistema de um advogado previdenciário, com pedidos no INSS, ações na Justiça Federal e atendimento online em todo o Brasil. O monograma JL foi redesenhado a partir do logo que ele já usava.",
    recebe: [
      "Abertura com o monograma escrito à pena",
      "Painel e Área do Cliente no mesmo projeto do site",
      "Resumo por e-mail, todo dia às 6h, das intimações do dia anterior",
    ],
    lat: -23.5425,
    lon: -46.3108,
  },
  {
    slug: "julie-pesseti-advocacia",
    resumo:
      "Site da marca pessoal de uma advogada, em página única: em segundos o visitante entende quem ela é e em que atua, e fala com ela pelo WhatsApp.",
    recebe: [
      "Trocar o telefone uma vez atualiza o site inteiro",
      "O site não vai ao ar sem o número da OAB",
      "Aviso de privacidade próprio",
    ],
    lat: -23.5617,
    lon: -46.6559,
  },
];

export type Documento = LandingPage & Dossie & { serie: number };

export const documentos: Documento[] = dossies.map((d, i) => {
  const lp = landingPages.find((p) => p.slug === d.slug);
  if (!lp) throw new Error(`advocacia: ${d.slug} is not in lib/landing-pages.ts`);
  return { ...lp, ...d, serie: i + 1 };
});

// Every advocacia entry in the shared list must have a dossiê here, or the
// route would silently drop a published site.
const missing = landingPages.filter((p) => p.niche === "advocacia" && !dossies.some((d) => d.slug === p.slug));
if (missing.length) throw new Error(`advocacia: no dossiê for ${missing.map((p) => p.slug).join(", ")}`);

export const serial = (n: number, total = documentos.length) => `Nº ${String(n).padStart(2, "0")}/${String(total).padStart(2, "0")}`;

// 22.7253 S 47.6492 W -> 22°44′S 47°39′O (city level, as printed on the document).
export const coordenadas = (lat: number, lon: number) => {
  const dm = (v: number) => {
    const a = Math.abs(v);
    const deg = Math.floor(a);
    const min = Math.round((a - deg) * 60);
    return `${deg}°${String(min).padStart(2, "0")}′`;
  };
  return `${dm(lat)}${lat < 0 ? "S" : "N"} ${dm(lon)}${lon < 0 ? "O" : "L"}`;
};

// Both advocacia redesigns are proposals (their notes say the office domain still serves the old site).
export const situacao = (d: LandingPage) => (d.kind === "Redesign" ? "Proposta de redesign" : d.preview ? "Prévia em aprovação" : "Publicado");

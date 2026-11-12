export type CategoryId =
  | "camisas"
  | "camisetas"
  | "calcas"
  | "blazers"
  | "jaquetas"
  | "calcados"
  | "acessorios";

export type Category = {
  id: CategoryId;
  label: string;
  blurb: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: CategoryId;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  description: string;
  details: string[];
  badge?: string;
  featured?: boolean;
};

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  {
    id: "camisas",
    label: "Camisas",
    blurb: "Oxford, linho e popeline com colarinho limpo.",
    image: img("photo-1602810318383-e386cc2a3ccf", 900),
  },
  {
    id: "camisetas",
    label: "Camisetas",
    blurb: "Malha pesada, caimento quieto.",
    image: img("photo-1583743814966-8936f5b7be1a", 900),
  },
  {
    id: "calcas",
    label: "Calças",
    blurb: "Alfaiataria, chino e denim reto.",
    image: img("photo-1473966968600-fa801b869a1a", 900),
  },
  {
    id: "blazers",
    label: "Blazers",
    blurb: "Estrutura leve para o dia inteiro.",
    image: img("photo-1593032465175-481ac7f401a0", 900),
  },
  {
    id: "jaquetas",
    label: "Jaquetas",
    blurb: "Couro, lã e nylon com presença.",
    image: img("photo-1539533018447-63fcce2678e3", 900),
  },
  {
    id: "calcados",
    label: "Calçados",
    blurb: "Couro que acompanha o passo.",
    image: img("photo-1533867617858-e7b97e060509", 900),
  },
  {
    id: "acessorios",
    label: "Acessórios",
    blurb: "Poucos objetos, bem escolhidos.",
    image: img("photo-1524805444758-089113d48a6d", 900),
  },
];

export const products: Product[] = [
  {
    id: "oxford-areia",
    name: "Camisa Oxford Areia",
    price: 289,
    category: "camisas",
    colors: [
      { name: "Areia", hex: "#d8c7a8" },
      { name: "Branco", hex: "#f4f1ea" },
      { name: "Azul céu", hex: "#8eacc4" },
    ],
    sizes: ["PP", "P", "M", "G", "GG"],
    images: [
      img("photo-1602810318383-e386cc2a3ccf"),
      img("photo-1598033129183-c4f50c736f10"),
    ],
    description:
      "Oxford de algodão com trama fechada e caimento ligeiramente solto. O colarinho button-down segura o dia sem parecer formal demais.",
    details: [
      "100% algodão oxford, 140 g/m²",
      "Corte regular contemporâneo",
      "Botões de madrepérola",
      "Feita para usar por dentro ou por fora",
    ],
    badge: "Essencial",
    featured: true,
  },
  {
    id: "linho-branco",
    name: "Camisa Linho Branco",
    price: 349,
    category: "camisas",
    colors: [
      { name: "Branco", hex: "#f7f4ee" },
      { name: "Areia", hex: "#cbb892" },
    ],
    sizes: ["P", "M", "G", "GG"],
    images: [
      img("photo-1596755094514-f87e34085b2c"),
      img("photo-1603252109303-2751441dd157"),
    ],
    description:
      "Linho europeu lavado, com a ruga que faz parte da peça. Leve o bastante para o calor e estruturada o bastante para um jantar.",
    details: [
      "100% linho",
      "Gola aberta, sem entretela dura",
      "Punho simples",
      "Lavagem fria e secar à sombra",
    ],
    badge: "Novo",
  },
  {
    id: "popeline-marinho",
    name: "Camisa Popeline Marinho",
    price: 309,
    category: "camisas",
    colors: [
      { name: "Marinho", hex: "#1c2a44" },
      { name: "Branco", hex: "#f3f0ea" },
    ],
    sizes: ["PP", "P", "M", "G", "GG"],
    images: [
      img("photo-1594938298603-c8148c4dae35"),
      img("photo-1620012253295-c15cc3e65df4"),
    ],
    description:
      "Popeline fina com brilho seco. A cor marinho some e aparece conforme a luz — a camisa de reunião que também atravessa a noite.",
    details: ["Algodão popeline de fio longo", "Corte slim suave", "Barra curva"],
  },
  {
    id: "heavy-preta",
    name: "Camiseta Heavy Preta",
    price: 169,
    category: "camisetas",
    colors: [
      { name: "Preto", hex: "#161513" },
      { name: "Off-white", hex: "#ece6da" },
      { name: "Oliva", hex: "#5c6248" },
    ],
    sizes: ["P", "M", "G", "GG"],
    images: [
      img("photo-1583743814966-8936f5b7be1a"),
      img("photo-1521572163474-6864f9cf17ab"),
    ],
    description:
      "Malha de 240 g que não marca e não torce. Gola reforçada, ombro no lugar, comprimento que cobre o cinto.",
    details: [
      "100% algodão penteado",
      "Gola com fita de reforço",
      "Pré-encolhida",
      "Caimento reto",
    ],
    featured: true,
    badge: "Essencial",
  },
  {
    id: "oversized-mescla",
    name: "Camiseta Oversized Mescla",
    price: 189,
    category: "camisetas",
    colors: [
      { name: "Mescla", hex: "#b7b3ae" },
      { name: "Preto", hex: "#1a1916" },
    ],
    sizes: ["M", "G", "GG"],
    images: [img("photo-1576566588028-4147f3842f27"), img("photo-1562157873-818bc0726f68")],
    description:
      "Ombro caído na medida certa, manga que termina no osso. Uma peça de volume baixo para usar com alfaiataria.",
    details: ["Algodão e elastano", "Gola canelada baixa", "Barra reta"],
    badge: "Novo",
  },
  {
    id: "polo-pima",
    name: "Polo Malha Pima",
    price: 239,
    category: "camisetas",
    colors: [
      { name: "Cru", hex: "#e6dcc8" },
      { name: "Marinho", hex: "#243044" },
      { name: "Verde musgo", hex: "#3e5344" },
    ],
    sizes: ["P", "M", "G", "GG"],
    images: [img("photo-1586363104862-3a5e2ab60d99"), img("photo-1622445275463-afa2ab738c34")],
    description:
      "Pima de toque frio, com gola que não abre depois de lavar. O meio-termo entre camiseta e camisa.",
    details: ["100% algodão pima", "Dois botões de madrepérola", "Corte regular"],
  },
  {
    id: "alfaiataria-carvao",
    name: "Calça Alfaiataria Carvão",
    price: 449,
    category: "calcas",
    colors: [
      { name: "Carvão", hex: "#3a3936" },
      { name: "Preto", hex: "#171614" },
      { name: "Bege", hex: "#c4b49a" },
    ],
    sizes: ["38", "40", "42", "44", "46", "48"],
    images: [
      img("photo-1473966968600-fa801b869a1a"),
      img("photo-1594938291221-94f18cbb5660"),
    ],
    description:
      "Lã fria com vinco marcado e cós confortável. Pregas suaves, barra para sapato social ou tênis branco.",
    details: [
      "Lã fria com elastano",
      "Cós com ajuste interno",
      "Bolso faca e bolso relógio",
      "Barra aberta para ajuste",
    ],
    featured: true,
    badge: "Assinatura",
  },
  {
    id: "chino-areia",
    name: "Calça Chino Areia",
    price: 379,
    category: "calcas",
    colors: [
      { name: "Areia", hex: "#cbb892" },
      { name: "Oliva", hex: "#6a7056" },
      { name: "Marinho", hex: "#243044" },
    ],
    sizes: ["38", "40", "42", "44", "46"],
    images: [img("photo-1624378439575-d8705ad7ae80"), img("photo-1506629082955-511b1aa562c8")],
    description:
      "Sarja compacta que não infla no joelho. O areia é a cor que conversa com quase tudo do guarda-roupa.",
    details: ["Algodão sarja", "Corte reto", "Cós médio"],
  },
  {
    id: "jeans-indigo",
    name: "Jeans Straight Indigo",
    price: 419,
    category: "calcas",
    colors: [
      { name: "Índigo", hex: "#2c3e66" },
      { name: "Índigo claro", hex: "#6d7fa3" },
    ],
    sizes: ["38", "40", "42", "44", "46", "48"],
    images: [img("photo-1542272604-787c3835535d"), img("photo-1541099649105-f69ad21f3246")],
    description:
      "Denim japonês de 13 oz, lavagem crua suave. Perna reta, sem skinny e sem flare — o corte que fica.",
    details: ["100% algodão denim", "Botão de metal escovado", "Costura contrastante discreta"],
    badge: "Novo",
  },
  {
    id: "blazer-preto",
    name: "Blazer Estruturado Preto",
    price: 920,
    category: "blazers",
    colors: [
      { name: "Preto", hex: "#141311" },
      { name: "Marinho", hex: "#1b2740" },
    ],
    sizes: ["46", "48", "50", "52", "54"],
    images: [
      img("photo-1593032465175-481ac7f401a0"),
      img("photo-1507679799987-c73779587ccf"),
    ],
    description:
      "Ombro natural, lapela estreita e um só botão. Funciona com camiseta heavy tão bem quanto com oxford.",
    details: [
      "Lã e mohair",
      "Forro de cupro",
      "Bolsos tesoura",
      "Entretela leve no ombro",
    ],
    featured: true,
    badge: "Assinatura",
  },
  {
    id: "blazer-oliva",
    name: "Blazer Linho Oliva",
    price: 860,
    category: "blazers",
    colors: [
      { name: "Oliva", hex: "#5d6450" },
      { name: "Areia", hex: "#c9b89a" },
    ],
    sizes: ["46", "48", "50", "52", "54"],
    images: [img("photo-1617137968427-85924c800a22"), img("photo-1490578474895-699cd4e2cf59")],
    description:
      "Linho misturado que respira. A cor oliva baixa o volume da alfaiataria e sobe o caráter.",
    details: ["Linho e algodão", "Sem forro", "Dois botões", "Meia-estação"],
    badge: "Edição limitada",
  },
  {
    id: "couro-preto",
    name: "Jaqueta Couro Preto",
    price: 1380,
    category: "jaquetas",
    colors: [{ name: "Preto", hex: "#121110" }],
    sizes: ["P", "M", "G", "GG"],
    images: [img("photo-1551028719-00167b16eac5"), img("photo-1520975661595-6453be3f7070")],
    description:
      "Couro bovino de flor corrigida, macio desde o primeiro dia. Zíper limpo, bolsos que não estufam.",
    details: ["Couro bovino", "Forro de viscose", "Zíper YKK", "Corte levemente curto"],
    featured: true,
    badge: "Ícone",
  },
  {
    id: "sobretudo-camel",
    name: "Sobretudo Lã Camel",
    price: 1590,
    category: "jaquetas",
    colors: [
      { name: "Camel", hex: "#b08968" },
      { name: "Carvão", hex: "#3c3a36" },
    ],
    sizes: ["P", "M", "G", "GG"],
    images: [img("photo-1539533018447-63fcce2678e3"), img("photo-1487222477894-8943e31ef7b2")],
    description:
      "Lã dupla face que cai como uma coluna. Comprimento no joelho, gola que sobe sem cachecol.",
    details: ["80% lã, 20% cashmere", "Fechamento oculto", "Bolsos internos", "Ombro sem enchimento"],
    badge: "Edição limitada",
  },
  {
    id: "bomber-nylon",
    name: "Bomber Nylon Técnico",
    price: 690,
    category: "jaquetas",
    colors: [
      { name: "Preto", hex: "#1a1916" },
      { name: "Oliva", hex: "#4e5644" },
    ],
    sizes: ["P", "M", "G", "GG"],
    images: [img("photo-1591047139829-d91aecb6caea"), img("photo-1544022613-e87ca75a784a")],
    description:
      "Nylon mate, punho justo e um volume contido. A jaqueta de deslocamento — da chuva fina ao fim da tarde.",
    details: ["Nylon resistente à água", "Forro acolchoado fino", "Bolsos zip", "Capuz oculto"],
    badge: "Novo",
  },
  {
    id: "tenis-branco",
    name: "Tênis Couro Branco",
    price: 720,
    category: "calcados",
    colors: [
      { name: "Branco", hex: "#f3f0ea" },
      { name: "Off-white", hex: "#e4dccb" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    images: [img("photo-1549298916-b41d501d3772"), img("photo-1542291026-7eec264c27ff")],
    description:
      "Cabedal de couro liso, sola de borracha baixa. Branco que combina com carvão, índigo e linho.",
    details: ["Couro bovino", "Palmilha removível", "Sola vulcanizada", "Feito para o dia inteiro"],
    featured: true,
  },
  {
    id: "loafer-marrom",
    name: "Loafer Couro Marrom",
    price: 640,
    category: "calcados",
    colors: [
      { name: "Marrom", hex: "#6b4423" },
      { name: "Preto", hex: "#1a1816" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    images: [img("photo-1533867617858-e7b97e060509"), img("photo-1614252235316-8c857d38b5f4")],
    description:
      "Loafer de construção blake, salto baixo. O sapato que substitui o tênis quando o convite pede mais.",
    details: ["Couro anilina", "Solado de couro", "Palmilha de couro", "Sem fivela"],
  },
  {
    id: "relogio-aco",
    name: "Relógio Aço Escovado",
    price: 980,
    category: "acessorios",
    colors: [
      { name: "Aço", hex: "#c5c7c4" },
      { name: "Aço negro", hex: "#2a2c2e" },
    ],
    sizes: ["Único"],
    images: [img("photo-1524805444758-089113d48a6d"), img("photo-1524592094714-0f0654e20314")],
    description:
      "Caixa de 38 mm, mostrador limpo, pulseira que não brilha demais. Hora legível, presença baixa.",
    details: ["Aço 316L", "Vidro safira", "Resistente a respingos", "Pulseira 20 mm"],
    badge: "Objeto",
  },
  {
    id: "cinto-vegetal",
    name: "Cinto Couro Vegetal",
    price: 240,
    category: "acessorios",
    colors: [
      { name: "Caramelo", hex: "#8a5a32" },
      { name: "Preto", hex: "#1c1b19" },
    ],
    sizes: ["85", "90", "95", "100", "105"],
    images: [img("photo-1553062407-98eeb64c6a62"), img("photo-1624222247344-550fb60583dc")],
    description:
      "Tira de 3 cm em couro curtido ao vegetal. Fivela de aço escovado, sem logo à vista.",
    details: ["Couro vegetal", "Fivela de aço", "Largura 3 cm"],
  },
  {
    id: "messenger",
    name: "Bolsa Messenger",
    price: 560,
    category: "acessorios",
    colors: [
      { name: "Tabaco", hex: "#6a4a32" },
      { name: "Preto", hex: "#171614" },
    ],
    sizes: ["Único"],
    images: [img("photo-1548036328-c9fa89d128fa"), img("photo-1473188588951-666fce8e7c68")],
    description:
      "Cabe um notebook de 14\", um livro e quase nada mais. Alça ajustável, fecho magnético silencioso.",
    details: ["Couro e lona encerada", "Compartimento acolchoado", "Alça de ombro", "Peso leve"],
    badge: "Novo",
  },
];

export const lookbook = [
  {
    title: "Manhã de escritório",
    text: "Blazer preto, camiseta heavy e calça carvão. O terno sem a gravata.",
    image: img("photo-1507679799987-c73779587ccf", 1600),
  },
  {
    title: "Meio-dia claro",
    text: "Linho branco e chino areia. Menos camada, o mesmo corte.",
    image: img("photo-1516826957135-700dedea698c", 1600),
  },
  {
    title: "Fim de tarde",
    text: "Sobretudo camel sobre oxford. A cidade esfria, a silhueta fica.",
    image: img("photo-1487222477894-8943e31ef7b2", 1600),
  },
  {
    title: "Noite curta",
    text: "Couro preto, jeans índigo, loafer. Pouca cor, muito contorno.",
    image: img("photo-1490578474895-699cd4e2cf59", 1600),
  },
];

export const categoryLabel = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.label ?? id;

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const FREE_SHIPPING = 499;

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export const OFFICIAL_LOGO_URL =
  'https://i.postimg.cc/52MR5XTd/Whats-App-Image-2026-10-19-at-17-22-18.jpg';

export const OFFICIAL_WATERMARK_URL =
  'https://i.postimg.cc/ZnzJrbSZ/Logotipo-Imobiliario-Dourado-Elegante.png';

export type PropertyCategory = 'Minha Casa Minha Vida' | 'Alto Padrão';
export type PropertyStatus = 'Na Planta' | 'Em Construção' | 'Pronto para Morar';

export interface PropertyTechnicalSpecs {
  bathrooms: string;
  suites: string;
  condoFee: string;
  deliveryForecast: string;
  financingType: string;
  flooringAndFinish: string;
  securityFeatures: string;
  amenities: string[];
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  builder: string;
  category: PropertyCategory;
  priceLabel: string;
  priceValue: number;
  location: string;
  highlight: string;
  description: string;
  bedrooms: string;
  parking: string;
  area: string;
  status: PropertyStatus;
  images: string[];
  watermarked: boolean;
  featured: boolean;
  specs?: PropertyTechnicalSpecs;
}

export interface SiteConfig {
  whatsapp: string;
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  address: string;
  creci: string;
  email: string;
}

export const INITIAL_SITE_CONFIG: SiteConfig = {
  whatsapp: '5535997164518',
  instagram: 'https://instagram.com/imobiliariafonsecaecandido',
  facebook: 'https://facebook.com/imobiliariafonsecaecandido',
  youtube: 'https://youtube.com/@imobiliariafonsecaecandido',
  tiktok: 'https://tiktok.com/@fonsecaecandido',
  address: 'Av. Principal Sul de Minas, Edifício Prime — Atendimento Exclusivo com Hora Marcada',
  creci: 'CRECI/MG Jurídico — Consultoria Credenciada Caixa & Alto Padrão',
  email: 'contato@fonsecaecandido.com.br',
};

export const BANNED_LOGO_SLIDE_URLS = new Set<string>([
  'https://i.postimg.cc/T2gjVt6P/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-0.jpg',
  'https://i.postimg.cc/QN1gQf3V/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-1.jpg',
  'https://i.postimg.cc/1Rw0GvQ9/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-29.jpg',
  'https://i.postimg.cc/xjMGv62f/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-30.jpg',
  'https://i.ibb.co/KxtPrS9b/Open-Vital-Construtora-imagens-0.jpg',
  'https://i.ibb.co/vx29TrSc/Open-Vital-Construtora-imagens-6.jpg',
  'https://i.ibb.co/YBxcMHSM/Open-Vital-Construtora-imagens-31.jpg',
  'https://i.postimg.cc/9FXpcy6B/Whats-App-Image-2026-10-19-at-16-26-37.jpg',
]);

export const SEED_PROPERTIES: Property[] = [
  {
    id: 'parque-1453-vital-construtora',
    slug: 'parque-1453-vital-construtora',
    title: 'Residencial Parque 1453',
    builder: 'Vital Construtora',
    category: 'Minha Casa Minha Vida',
    priceLabel: 'R$ 235.000,00',
    priceValue: 235000,
    location: 'Vetor de Expansão Valorizado • Acesso Rápido ao Centro',
    highlight: 'Apartamento na planta, entrada facilitada em até 60x, subsídio Caixa e lazer de clube.',
    description:
      'O Residencial Parque 1453 eleva o padrão do programa Minha Casa Minha Vida com projeto arquitetônico moderno, torres com elevador, varanda integrada à sala de dois ambientes e ventilação cruzada. O condomínio oferece lazer completo entregue mobiliado e decorado, portaria com controle de acesso biométrico, áreas verdes preservadas e baixo custo condominial. Ideal tanto para conquista do primeiro imóvel com uso do FGTS quanto para investidores buscando alta liquidez.',
    bedrooms: '2 Dormitórios',
    parking: '1 Vaga Privativa',
    area: '48,5 m² a 52 m²',
    status: 'Na Planta',
    watermarked: true,
    featured: true,
    specs: {
      bathrooms: '1 Banheiro Social c/ Ventilação Natural',
      suites: 'Planta Inteligente Reversível',
      condoFee: 'Taxa Estimada R$ 220/mês',
      deliveryForecast: 'Entrega Garantida Caixa • 24 Meses',
      financingType: 'Minha Casa Minha Vida (Subsídio + FGTS)',
      flooringAndFinish: 'Cerâmica retificada extra, bancadas em granito e esquadrias em alumínio branco',
      securityFeatures: 'Guarita blindada 24h, circuito CFTV HD, cerca elétrica perimetral e acesso por tag',
      amenities: [
        'Piscina Adulto e Infantil com Solarium',
        'Salão de Festas Gourmet Climatizado',
        'Espaço Churrasqueira Coberto',
        'Academia ao Ar Livre & Fitness',
        'Playground Infantil Seguro',
        'Pet Place Cercado',
        'Bicicletário Coberto',
        'Horta Comunitária & Pomar',
      ],
    },
    images: [
      'https://i.postimg.cc/Rh57rHc1/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-6.jpg',
      'https://i.postimg.cc/5yBwf23H/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-7.jpg',
      'https://i.postimg.cc/Fz5ytLjg/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-8.jpg',
      'https://i.postimg.cc/wMXh9jVm/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-2.jpg',
      'https://i.postimg.cc/hvL9Ktr9/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-3.jpg',
      'https://i.postimg.cc/cCRQdLmf/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-4.jpg',
      'https://i.postimg.cc/qqs8pvLc/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-5.jpg',
      'https://i.postimg.cc/wM8XKmhQ/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-9.jpg',
      'https://i.postimg.cc/kMKNQTmV/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-10.jpg',
      'https://i.postimg.cc/7P013KkG/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-11.jpg',
      'https://i.postimg.cc/KcB7P023/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-12.jpg',
      'https://i.postimg.cc/QN1gQf37/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-13.jpg',
      'https://i.postimg.cc/L4Lktxpz/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-14.jpg',
      'https://i.postimg.cc/7P013Kk3/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-15.jpg',
      'https://i.postimg.cc/G3GPFXCP/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-16.jpg',
      'https://i.postimg.cc/7P013KkV/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-17.jpg',
      'https://i.postimg.cc/2jhdQ0D0/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-18.jpg',
      'https://i.postimg.cc/xjMGv62s/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-19.jpg',
      'https://i.postimg.cc/wMXh9jVk/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-20.jpg',
      'https://i.postimg.cc/QCQpjdbS/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-21.jpg',
      'https://i.postimg.cc/fycxMRKC/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-22.jpg',
      'https://i.postimg.cc/kGQx7gcj/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-23.jpg',
      'https://i.postimg.cc/7h3gqZVW/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-24.jpg',
      'https://i.postimg.cc/QCQpjdbz/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-25.jpg',
      'https://i.postimg.cc/PJWmd54c/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-26.jpg',
      'https://i.postimg.cc/1XGpy3H2/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-27.jpg',
      'https://i.postimg.cc/C5Gjwx7T/Apresentac-ºa-ao-Parque-1453-Vital-Construtora-imagens-28.jpg',
    ],
  },
  {
    id: 'residencial-reserva-dos-ipes',
    slug: 'residencial-reserva-dos-ipes',
    title: 'Residencial Reserva dos Ipês',
    builder: 'Vital Construtora • Linha Open',
    category: 'Minha Casa Minha Vida',
    priceLabel: 'R$ 235.000,00',
    priceValue: 235000,
    location: 'Bairro Planejado • Próximo a Parques, Escolas e Supermercados',
    highlight: 'Subsídio do governo federal, acabamento diferenciado e área de lazer completa para a família.',
    description:
      'O Residencial Reserva dos Ipês combina o conforto de um condomínio clube fechado com as condições imbatíveis do programa Minha Casa Minha Vida. As unidades contam com planta funcional de 2 quartos, sala integrada, cozinha estilo americana com área de serviço isolada e excelente incidência solar. A infraestrutura de lazer inclui piscina, área gourmet com churrasqueira, espaço kids, quadra recreativa e paisagismo nativo.',
    bedrooms: '2 Dormitórios Amplos',
    parking: '1 Vaga Demarcada',
    area: '50,4 m² Privativos',
    status: 'Em Construção',
    watermarked: true,
    featured: true,
    specs: {
      bathrooms: '1 Banheiro com Acabamento Cerâmico Total',
      suites: 'Opção de Planta Garden Térreo',
      condoFee: 'Taxa Estimada R$ 210/mês',
      deliveryForecast: 'Obras Aceleradas • Garantia Caixa',
      financingType: 'Minha Casa Minha Vida • Taxa Reduzida',
      flooringAndFinish: 'Piso laminado nos quartos, porcelanato nas áreas molhadas e louças Celite/Deca',
      securityFeatures: 'Portaria 24h com controle de pedestres e veículos, iluminação em LED e câmeras',
      amenities: [
        'Complexo Aquático com Deck Molhado',
        'Espaço Gourmet com Forno de Pizza e Churrasqueira',
        'Salão de Festas Integrado',
        'Espaço Kids & Brinquedoteca',
        'Quadra Poliesportiva Iluminada',
        'Coworking & Sala de Estudos',
        'Minimercado Autônomo 24h no Condomínio',
        'Bosque Privativo de Ipês',
      ],
    },
    images: [
      'https://i.ibb.co/TBfKMLVK/Open-Vital-Construtora-imagens-3.jpg',
      'https://i.ibb.co/4nb5rcwV/Open-Vital-Construtora-imagens-2.jpg',
      'https://i.ibb.co/S77rJP3M/Open-Vital-Construtora-imagens-9.jpg',
      'https://i.ibb.co/4qd8pQB/Open-Vital-Construtora-imagens-10.jpg',
      'https://i.ibb.co/QjxLjQ1g/Open-Vital-Construtora-imagens-1.jpg',
      'https://i.ibb.co/s98KGF2X/Open-Vital-Construtora-imagens-4.jpg',
      'https://i.ibb.co/tPbPVV88/Open-Vital-Construtora-imagens-5.jpg',
      'https://i.ibb.co/1YMSsd69/Open-Vital-Construtora-imagens-7.jpg',
      'https://i.ibb.co/rGNZjCxL/Open-Vital-Construtora-imagens-8.jpg',
      'https://i.ibb.co/5WFMyCTK/Open-Vital-Construtora-imagens-11.jpg',
      'https://i.ibb.co/hJBBF1sp/Open-Vital-Construtora-imagens-12.jpg',
      'https://i.ibb.co/Q7tZxBdr/Open-Vital-Construtora-imagens-13.jpg',
      'https://i.ibb.co/nNf5ptP4/Open-Vital-Construtora-imagens-14.jpg',
      'https://i.ibb.co/ZRHcjjyH/Open-Vital-Construtora-imagens-15.jpg',
      'https://i.ibb.co/jvTR3Z5B/Open-Vital-Construtora-imagens-16.jpg',
      'https://i.ibb.co/tTsLHjxF/Open-Vital-Construtora-imagens-17.jpg',
      'https://i.ibb.co/prXgm7Y9/Open-Vital-Construtora-imagens-18.jpg',
      'https://i.ibb.co/tMwC7DTt/Open-Vital-Construtora-imagens-19.jpg',
      'https://i.ibb.co/FRKr9k3/Open-Vital-Construtora-imagens-20.jpg',
      'https://i.ibb.co/4njfLWvn/Open-Vital-Construtora-imagens-21.jpg',
      'https://i.ibb.co/6JbRfkLS/Open-Vital-Construtora-imagens-22.jpg',
      'https://i.ibb.co/M5xTfQdK/Open-Vital-Construtora-imagens-23.jpg',
      'https://i.ibb.co/prjFjn4m/Open-Vital-Construtora-imagens-24.jpg',
      'https://i.ibb.co/SwQzL24j/Open-Vital-Construtora-imagens-25.jpg',
      'https://i.ibb.co/b9wdb6t/Open-Vital-Construtora-imagens-26.jpg',
      'https://i.ibb.co/tMf2ntf1/Open-Vital-Construtora-imagens-27.jpg',
      'https://i.ibb.co/dJQFqT5m/Open-Vital-Construtora-imagens-28.jpg',
      'https://i.ibb.co/8L8WR3yW/Open-Vital-Construtora-imagens-29.jpg',
      'https://i.ibb.co/NdySZYQs/Open-Vital-Construtora-imagens-30.jpg',
    ],
  },
  {
    id: 'villa-royale-mansion',
    slug: 'villa-royale-mansion',
    title: 'Villa Royale Mansion',
    builder: 'Fonseca & Cândido Private Collection',
    category: 'Alto Padrão',
    priceLabel: 'A partir de R$ 1.850.000,00',
    priceValue: 1850000,
    location: 'Condomínio Fechado de Alto Luxo • Segurança Armada 24h',
    highlight: 'Arquitetura neoclássica imponente, acabamento em mármore importado e área gourmet com piscina aquecida.',
    description:
      'A Villa Royale Mansion representa o equilíbrio perfeito entre a arquitetura clássica europeia e a engenharia contemporânea. Com fachada imponente de pé-direito duplo, porta pivotante em madeira maciça de 5,5 metros, living para 3 ambientes integrado à varanda gourmet e piscina aquecida revestida em pedra Hijau. Suíte master com closet senhor e senhora, banheira de imersão freestanding e persianas motorizadas.',
    bedrooms: '4 Suítes Plenas',
    parking: '4 Vagas (2 Cobertas)',
    area: '380 m² Construídos | Lote 520 m²',
    status: 'Pronto para Morar',
    watermarked: true,
    featured: true,
    specs: {
      bathrooms: '6 Banheiros + Lavabo Esculpido em Onix',
      suites: '4 Suítes (1 Master com Closet Duplo e Hidromassagem)',
      condoFee: 'Condomínio Clube R$ 680/mês',
      deliveryForecast: 'Pronto para Morar • Habite-se Emitido',
      financingType: 'Financiamento Prime SBPE / Estuda Permuta até 35%',
      flooringAndFinish: 'Porcelanato Grande Formato 120x120, Mármore Travertino Romano e Assoalho Cumaru',
      securityFeatures: 'Condomínio fechado com ronda motorizada 24h, biometria facial e fechadura digital Yale',
      amenities: [
        'Piscina Privativa Aquecida com Cascata e Iluminação RGB',
        'Área Gourmet com Churrasqueira a Gás/Carvão em Inox',
        'Suíte Master com Varanda Panorâmica Privativa',
        'Infraestrutura Completa para Ar-Condicionado Inverter',
        'Sistema de Aquecimento Solar Pressurizado Boiler 600L',
        'Paisagismo Tropical Adulto com Irrigação Automatizada',
        'Escritório Privativo (Home Office Acústico) no Térreo',
        'Preparação para Carregador de Veículo Elétrico (Wallbox)',
      ],
    },
    images: [
      'https://i.postimg.cc/YCnD5dj1/Whats-App-Image-2026-10-19-at-16-26-30.jpg',
      'https://i.postimg.cc/P53VgSNb/Whats-App-Image-2026-10-19-at-16-26-31.jpg',
      'https://i.postimg.cc/L8CQcxhf/Whats-App-Image-2026-10-19-at-16-26-32.jpg',
      'https://i.postimg.cc/P53VgSNY/Whats-App-Image-2026-10-19-at-16-26-34.jpg',
      'https://i.postimg.cc/FKYCN0Jf/Whats-App-Image-2026-10-19-at-16-26-36.jpg',
    ],
  },
  {
    id: 'horizon-diamond-residence',
    slug: 'horizon-diamond-residence',
    title: 'Horizon Diamond Residence',
    builder: 'Diamond Signature Arquitetura',
    category: 'Alto Padrão',
    priceLabel: 'A partir de R$ 2.400.000,00',
    priceValue: 2400000,
    location: 'Mirante Nobre • Vista Panorâmica Definitiva para o Vale',
    highlight: 'Design biofílico contemporâneo, vista panorâmica permanente, automação residencial total.',
    description:
      'Assinada por renomado escritório de arquitetura contemporânea, a Horizon Diamond Residence projeta-se sobre o mirante com balanços estruturais em concreto aparente, brises em madeira nobre e esquadrias minimalistas piso-teto. Possui adega climatizada para 180 rótulos, lareira ecológica no living, cozinha em ilha com bancada em quartzo Calacatta, piscina em borda infinita e automação completa de áudio, vídeo, iluminação e climatização.',
    bedrooms: '4 Suítes com Closet',
    parking: '4 Vagas + Tomada EV',
    area: '450 m² Privativos | Lote 640 m²',
    status: 'Pronto para Morar',
    watermarked: true,
    featured: true,
    specs: {
      bathrooms: '6 Banheiros com Metais Dourados Escovados Deca Red Gold',
      suites: '4 Suítes com Persianas Automatizadas e Varanda',
      condoFee: 'Condomínio Reserva R$ 790/mês',
      deliveryForecast: 'Pronto para Morar • Documentação 100% Cristalina',
      financingType: 'Crédito Imobiliário Personalité / Direto com Proprietário',
      flooringAndFinish: 'Lastras de Porcelanato 120x240, Madeira Cumaru Certificada e Pedra Moledo Natural',
      securityFeatures: 'Acesso por reconhecimento facial, câmeras IP com IA perimetral e bunker de segurança',
      amenities: [
        'Piscina de Borda Infinita com Spa Hidromassagem Integrado',
        'Adega Climatizada em Vidro Temperado e Iluminação Indireta',
        'Automação Completa Savant / Alexa (Luz, Som, Cortinas e Clima)',
        'Usina Fotovoltaica Instalada (Geração de 1.100 kWh/mês)',
        'Sauna Úmida revestida em pastilhas com acesso direto à piscina',
        'Espaço Fogo de Chão (Fire Pit) no Mirante Externo',
        'Cozinha Gourmet com Ilha Central e Coifa Embutida',
        'Cinema Home Theater com Isolamento Acústico Profissional',
      ],
    },
    images: [
      'https://i.postimg.cc/YCnD5dj1/Whats-App-Image-2026-10-19-at-16-26-30.jpg',
      'https://i.postimg.cc/dtW93LF8/Whats-App-Image-2026-10-19-at-16-26-39.jpg',
      'https://i.postimg.cc/3JLZNdhp/Whats-App-Image-2026-10-19-at-16-26-41.jpg',
      'https://i.postimg.cc/xTsP8cQM/Whats-App-Image-2026-10-19-at-16-26-43.jpg',
      'https://i.postimg.cc/9FxB0r2P/Whats-App-Image-2026-10-19-at-16-26-45.jpg',
      'https://i.postimg.cc/9FxB0r2b/Whats-App-Image-2026-10-19-at-16-26-46.jpg',
      'https://i.postimg.cc/NfNxF5td/Whats-App-Image-2026-10-19-at-16-26-48.jpg',
      'https://i.postimg.cc/Qx6qCHD4/Whats-App-Image-2026-10-19-at-16-26-49.jpg',
      'https://i.postimg.cc/YqXx0h7D/Whats-App-Image-2026-10-19-at-16-26-53.jpg',
      'https://i.postimg.cc/Pr6MJPhn/Whats-App-Image-2026-10-19-at-16-26-55.jpg',
      'https://i.postimg.cc/8PybcjDV/Whats-App-Image-2026-10-19-at-16-26-56.jpg',
      'https://i.postimg.cc/15WKXfPQ/Whats-App-Image-2026-10-19-at-16-26-58.jpg',
      'https://i.postimg.cc/g2nHZmc7/Whats-App-Image-2026-10-19-at-16-26-59.jpg',
      'https://i.postimg.cc/cLrBn04q/Whats-App-Image-2026-10-19-at-16-27-01.jpg',
      'https://i.postimg.cc/GmHxydhn/Whats-App-Image-2026-10-19-at-16-27-03.jpg',
      'https://i.postimg.cc/fRJf9DTN/Whats-App-Image-2026-10-19-at-16-27-05.jpg',
      'https://i.postimg.cc/GmHxydhR/Whats-App-Image-2026-10-19-at-16-27-06.jpg',
      'https://i.postimg.cc/2SV7Zr8j/Whats-App-Image-2026-10-19-at-16-27-08.jpg',
      'https://i.postimg.cc/fRJf9DTJ/Whats-App-Image-2026-10-19-at-16-27-09.jpg',
      'https://i.postimg.cc/0yb0wP2z/Whats-App-Image-2026-10-19-at-16-27-10.jpg',
      'https://i.postimg.cc/9QrY7CF4/Whats-App-Image-2026-10-19-at-16-27-12.jpg',
      'https://i.postimg.cc/W1C6mCh1/Whats-App-Image-2026-10-19-at-16-27-13.jpg',
      'https://i.postimg.cc/wTxV9DC5/Whats-App-Image-2026-10-19-at-16-27-15.jpg',
      'https://i.postimg.cc/xTjR9Lw3/Whats-App-Image-2026-10-19-at-16-27-16.jpg',
      'https://i.postimg.cc/TY29Tnzq/Whats-App-Image-2026-10-19-at-16-27-17.jpg',
    ],
  },
  {
    id: 'maison-lumina-tower',
    slug: 'maison-lumina-tower',
    title: 'Maison Lumina Tower',
    builder: 'Lumina Incorporações Internacionais',
    category: 'Alto Padrão',
    priceLabel: 'A partir de R$ 3.100.000,00',
    priceValue: 3100000,
    location: 'Eixo Jardins • Boulevard Nobre Exclusivo',
    highlight: 'Luxo absoluto um por andar, pé-direito duplo de 5,8m e lazer resort particular.',
    description:
      'Maison Lumina Tower redefine o conceito de mansão vertical. Com apenas uma unidade por pavimento e hall social privativo com controle biométrico no elevador, apresenta living de pé-direito duplo com cortina de vidro acústica, terraço gourmet com churrasqueira a carvão e piscina privativa no apartamento. O condomínio dispõe de infraestrutura digna de resort 5 estrelas.',
    bedrooms: '4 Suítes Presidenciais',
    parking: '5 Vagas + Box Privativo',
    area: '520 m² Privativos',
    status: 'Em Construção',
    watermarked: true,
    featured: true,
    specs: {
      bathrooms: '7 Banheiros (Suíte Master com Banheiro Sr. e Sra. em Mármore Carrara)',
      suites: '4 Suítes Presidenciais com Isolamento Acústico Duplo',
      condoFee: 'Taxa Condominial Estimada R$ 1.450/mês',
      deliveryForecast: 'Entrega Prevista Outubro/2027',
      financingType: 'Fluxo de Obra Personalizado Direto ou Financiamento Bancário',
      flooringAndFinish: 'Mármore Branco Paraná, Madeira Tauari maciça e vidros laminados refletivos Low-E',
      securityFeatures: 'Eclusa blindada nível III-A para veículos e pedestres, gerador 100% para áreas comuns e privativas',
      amenities: [
        'Elevador Social Privativo com Biometria e Senha',
        'Piscina Coberta Aquecida com Raia Oficial de 25 Metros',
        'Quadra de Tênis Oficial de Saibro Coberta',
        'Wellness Center: Spa, Massagem, Sauna Seca e Úmida',
        'Academia Technogym Completa com Studio Pilates',
        'Wine Bar & Cave Privativa Climatizada por Unidade',
        'Porte-Cochère com Serviço de Concierge Internacional',
        'Vagas de Garagem com Ponto de Recarga Rápida Individual',
      ],
    },
    images: [
      'https://i.postimg.cc/28PV0D7Z/Whats-App-Image-2026-10-19-at-16-06-57.jpg',
      'https://i.postimg.cc/VLTb2Mmm/Whats-App-Image-2026-10-19-at-16-07-06.jpg',
      'https://i.postimg.cc/X7hytF4j/Whats-App-Image-2026-10-19-at-16-07-08.jpg',
      'https://i.postimg.cc/wT3mWFKD/Whats-App-Image-2026-10-19-at-16-07-10.jpg',
      'https://i.postimg.cc/BQtKhNWH/Whats-App-Image-2026-10-19-at-16-07-11.jpg',
      'https://i.postimg.cc/bNdt6LXQ/Whats-App-Image-2026-10-19-at-16-07-13.jpg',
      'https://i.postimg.cc/qMg3mQfX/Whats-App-Image-2026-10-19-at-16-07-14.jpg',
      'https://i.postimg.cc/3JWvL9Mb/Whats-App-Image-2026-10-19-at-16-07-16.jpg',
      'https://i.postimg.cc/02rwtZgX/Whats-App-Image-2026-10-19-at-16-07-18.jpg',
      'https://i.postimg.cc/m2hHdVx5/Whats-App-Image-2026-10-19-at-16-07-19.jpg',
      'https://i.postimg.cc/qMg3mQfY/Whats-App-Image-2026-10-19-at-16-07-21.jpg',
      'https://i.postimg.cc/CLdqvJyW/Whats-App-Image-2026-10-19-at-16-07-23.jpg',
      'https://i.postimg.cc/Kv4M9QX6/Whats-App-Image-2026-10-19-at-16-07-25.jpg',
      'https://i.postimg.cc/TYhDkQMM/Whats-App-Image-2026-10-19-at-16-07-26.jpg',
      'https://i.postimg.cc/5NjCPpdc/Whats-App-Image-2026-10-19-at-16-07-28.jpg',
      'https://i.postimg.cc/rFbt7WcH/Whats-App-Image-2026-10-19-at-16-07-29.jpg',
      'https://i.postimg.cc/7YcTj7Dc/Whats-App-Image-2026-10-19-at-16-07-32.jpg',
      'https://i.postimg.cc/J4gBSJmv/Whats-App-Image-2026-10-19-at-16-07-35.jpg',
      'https://i.postimg.cc/DyDbRsFR/Whats-App-Image-2026-10-19-at-16-07-38.jpg',
      'https://i.postimg.cc/TYSWBmGZ/Whats-App-Image-2026-10-19-at-16-07-40.jpg',
      'https://i.postimg.cc/28JBgvrp/Whats-App-Image-2026-10-19-at-16-07-41.jpg',
      'https://i.postimg.cc/TYSWBmfv/Whats-App-Image-2026-10-19-at-16-07-42.jpg',
      'https://i.postimg.cc/FsqJwcN5/Whats-App-Image-2026-10-19-at-16-07-44.jpg',
      'https://i.postimg.cc/CLtf9DSg/Whats-App-Image-2026-10-19-at-16-07-45.jpg',
      'https://i.postimg.cc/5NGFDvbJ/Whats-App-Image-2026-10-19-at-16-07-47.jpg',
      'https://i.postimg.cc/m2qFKMBR/Whats-App-Image-2026-10-19-at-16-07-48.jpg',
    ],
  },
  {
    id: 'the-grand-palace',
    slug: 'the-grand-palace',
    title: 'The Grand Palace',
    builder: 'Palace Royal Estates',
    category: 'Alto Padrão',
    priceLabel: 'A partir de R$ 4.200.000,00',
    priceValue: 4200000,
    location: 'Colina Imperial • Reserva Exclusiva de Ultraluxo',
    highlight: 'Mansão contemporânea com vista 360°, garagem galeria para superesportivos e máxima privacidade.',
    description:
      'O ápice do mercado imobiliário de ultraluxo da Imobiliária Fonseca e Cândido. The Grand Palace é uma propriedade singular implantada em lote de topo de colina com vista 360° indevassável. Conta com elevador privativo atendendo os 3 pavimentos, piscina suspensa em concreto armado com borda infinita e visor de acrílico, garagem subterrânea estilo galeria climatizada para 6 veículos, spa completo e suíte master de 110 m².',
    bedrooms: '5 Suítes Master',
    parking: '6 Vagas Galeria',
    area: '680 m² Construídos | Lote 1.050 m²',
    status: 'Pronto para Morar',
    watermarked: true,
    featured: true,
    specs: {
      bathrooms: '8 Banheiros Revestidos em Pedras Naturais Exóticas',
      suites: '5 Suítes Master (Suíte Presidencial de 110 m² com Sala Íntima)',
      condoFee: 'Condomínio Imperial R$ 1.290/mês',
      deliveryForecast: 'Pronto para Morar • Entrega Imediata',
      financingType: 'Atendimento Private Wealth / Condições Sob Consulta',
      flooringAndFinish: 'Travertino Romano Bruto e Polido, Nogueira Americana e Esquadrias Schüco',
      securityFeatures: 'Segurança armada 24h no condomínio, monitoramento térmico e sala segura privativa',
      amenities: [
        'Elevador Panorâmico Privativo para os 3 Pavimentos',
        'Garagem Galeria Subterrânea com Iluminação Cênica para 6 Carros',
        'Piscina Suspensa Aquecida com Borda Infinita e Bar Molhado',
        'Espaço Gourmet Completo com Parrilla Argentina e Adega para 300 Garrafas',
        'Suíte Master de 110 m² com Duplo Closet Iluminado e Spa Particular',
        'Heliponto Homologado no Condomínio Exclusivo',
        'Dependência Completa de Colaboradores Isolada',
        'Automação Total Crestron & Sistema de Som Invisível JBL Architectural',
      ],
    },
    images: [
      'https://i.postimg.cc/28PV0D7Z/Whats-App-Image-2026-10-19-at-16-06-57.jpg',
      'https://i.postimg.cc/jdGLMb4N/Whats-App-Image-2026-10-19-at-16-06-58.jpg',
      'https://i.postimg.cc/bNKsmh9n/Whats-App-Image-2026-10-19-at-16-06-59.jpg',
      'https://i.postimg.cc/c4VrFSBK/Whats-App-Image-2026-10-19-at-16-07-00.jpg',
      'https://i.postimg.cc/4NrmWgQH/Whats-App-Image-2026-10-19-at-16-07-02.jpg',
      'https://i.postimg.cc/NfW5dckK/Whats-App-Image-2026-10-19-at-16-07-03.jpg',
      'https://i.postimg.cc/zX9VxrFb/Whats-App-Image-2026-10-19-at-16-07-04.jpg',
    ],
  },
];

export function normalizePropertyImages(property: Property): Property {
  const seedMatch = SEED_PROPERTIES.find(
    (s) => s.id === property.id || s.slug === property.slug
  );
  const filteredImages = (property.images || []).filter(
    (img) => !BANNED_LOGO_SLIDE_URLS.has(img)
  );

  if (seedMatch) {
    const primaryFacade = seedMatch.images[0];
    const rest = filteredImages.filter((img) => img !== primaryFacade);
    return {
      ...seedMatch,
      ...property,
      title:
        property.title === 'Parque 1453 (Vital Construtora)'
          ? 'Residencial Parque 1453'
          : property.title,
      specs: property.specs || seedMatch.specs,
      images: [primaryFacade, ...rest],
    };
  }

  return {
    ...property,
    images: filteredImages.length > 0 ? filteredImages : property.images,
  };
}


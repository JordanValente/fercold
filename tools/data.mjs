// Fercold — dados do site. Editar aqui e correr `npm run build`.
export const SITE = {
  url: process.env.SITE_URL || 'https://www.fercold.pt',
  name: 'Fercold',
  legalName: 'Fercold - Comércio de Equipamentos de Refrigeração, Unipessoal, Lda.',
  shop: 'https://www.fercold.pt/loja-online',
  b2b: 'https://www.b2b.fercold.pt/parceiros/login.php',
  email: 'comercial@fercold.pt',
  phone: '+351 212 434 724',
  phoneHref: '+351212434724',
  mobile: '+351 939 351 302',
  mobileHref: '+351939351302',
  address: {
    street: 'Rua do Bom Pastor, Lote 8, Loja',
    area: 'Bairro dos Fetais',
    postal: '2680-136',
    city: 'Camarate',
    region: 'Lisboa',
    country: 'PT',
  },
  maps: 'https://www.google.com/maps/search/?api=1&query=Fercold+Rua+do+Bom+Pastor+Lote+8+Camarate',
};

export const CATEGORIES = [
  {
    slug: 'climatizacao',
    shop: 'climatizacao',
    name: 'Climatização',
    title: 'Ar condicionado, bombas de calor e aquecimento',
    lead: 'Mono split, multi-split e VRF, bombas de calor ar-água, fan-coils, desumidificadores e recuperadores de calor das marcas que os instaladores pedem.',
    tree: [
      ['Ar Condicionado', ['Mono Split Mural', 'Cassete', 'Chão/Teto', 'Consola de Chão', 'De Condutas', 'Multi-Split interiores', 'Multi-Split exteriores', 'Sistema VRF']],
      ['Aquecimento', ['Bombas Circuladoras', 'Depósitos de Inércia']],
      ['Ar Condicionado Portátil', ['Com Bomba de Calor', 'Só Frio']],
      ['Desumidificadores', ['Desumidificadores Portáteis']],
      ['Fan-Coils', ['Motor Ventilador', 'Válvulas e Actuadores']],
      ['Recuperadores de Calor', []],
    ],
    examples: ['Daikin Perfera mural FTXM35R 12.000 BTU', 'Daikin multi-split exterior 3MXM52A', 'Gree Versati III monobloco MB 14', 'Gree Versati III split SP 8', 'Toyotomi desumidificador TD-C100', 'Therca depósito de inércia inox 100 L'],
    brands: ['Daikin', 'Mitsubishi Electric', 'Gree', 'LG', 'Panasonic', 'Daitsu', 'Toyotomi', 'WATTS'],
    faq: [
      ['Vendem ar condicionado Daikin, Gree e Mitsubishi Electric?', 'Sim. Temos equipamentos mono split, multi-split e VRF destas e de outras marcas, além de bombas de calor ar-água como a gama Gree Versati III.'],
      ['Entregam equipamentos de climatização em todo o país?', 'Entregamos em 24 horas em Portugal Continental. As ilhas não estão incluídas neste prazo.'],
    ],
  },
  {
    slug: 'refrigeracao',
    shop: 'refrigeracao',
    name: 'Refrigeração',
    title: 'Compressores, gás refrigerante e componentes de frio',
    lead: 'Compressores herméticos e scroll, unidades condensadoras, fluido refrigerante, filtros secadores, pressostatos, válvulas e ventiladores para câmaras e balcões frigoríficos.',
    tree: [
      ['Compressores Frigoríficos', ['Herméticos de Pistão', 'Scroll']],
      ['Unidades Condensadoras', ['Herméticas', 'Semi-Herméticas']],
      ['Fluido Refrigerante', ['Tipo HFC', 'Tipo HCFC', 'Garrafas', 'Acessórios']],
      ['Filtros Secadores', ['Cobre', 'SAE', 'ODS', 'Carga para filtros']],
      ['Pressostatos', ['Mini', 'Alta', 'Baixa', 'Duplos Alta/Baixa', 'Tubos Capilares']],
      ['Termostatos e Termómetros', ['Termostatos Digitais', 'Termostatos Analógicos', 'Termómetros']],
      ['Válvulas', ['Válvulas de Expansão', 'Válvulas Eléctricas', 'Bobines', 'Visores de Líquido']],
      ['Ventilação de Frio', ['Motores Ventiladores', 'Ventiladores Axiais', 'Ventiladores Centrífugos', 'Ventilador Tangencial']],
      ['Óleo', ['Óleo POE']],
      ['Ferragens para Câmaras e Balcões', []],
    ],
    examples: ['Copeland compressor scroll ZR40K3E-TFD', 'Cubigel compressor GL90AA R134a', 'EBM ventilador centrífugo R2E175', 'Fluido refrigerante R134a', 'Ventilador axial Ø400 mm aspirante'],
    brands: ['Copeland', 'Embraco', 'Cubigel', "L'Unité Hermétique", 'Danfoss', 'Castel', 'Carel', 'EBM', 'Elitech'],
    faq: [
      ['Que gases refrigerantes têm disponíveis?', 'Temos fluidos do tipo HFC e HCFC, garrafas e acessórios. Contacte-nos para confirmar o gás e a capacidade de garrafa que precisa.'],
      ['Posso encomendar um compressor por referência?', 'Sim. Envie-nos a referência do compressor ou da unidade e confirmamos a disponibilidade e o equivalente, se necessário.'],
    ],
  },
  {
    slug: 'ferramenta',
    shop: 'ferramenta',
    name: 'Ferramenta',
    title: 'Ferramenta para frigoristas e técnicos AVAC',
    lead: 'Manómetros, bombas de vácuo, abocardadores, estações de recuperação, detectores de fugas, soldadura e instrumentos de medição para trabalhar com precisão.',
    tree: [
      ['Manómetros e Mangueiras', ['Conjuntos Analógicos', 'Kits', 'Manómetros', 'Vacuómetros', 'Mangueiras', 'Acessórios']],
      ['Bombas de Vácuo', ['Bombas de Vácuo', 'Acessórios']],
      ['Abocardadores e Expansores', ['Excêntrico', 'Universal', 'Abocardador + Expansor', 'Expansores de Golpe', 'Tipo Alicate']],
      ['Tubo', ['Corta Tubos', 'Dobra Tubos', 'Escariadores']],
      ['Detectores de Fugas', ['Electrónicos', 'Espuma']],
      ['Soldadura', ['Conjuntos', 'Garrafas e Recargas', 'Reguladores', 'Solda e Decapante', 'Protector de Calor']],
      ['Azoto e Acessórios', ['Garrafas', 'Reguladores', 'Recargas', 'Mangueira']],
      ['Instrumentos de Medição', ['Multímetros', 'Pinça Amperimétrica', 'Comprovador de Avarias', 'Termómetros', 'Balanças']],
      ['Estação de Recuperação', []],
      ['Uso Geral', ['Alicates', 'Chaves Dinamométricas', 'Chaves de Válvulas', 'Malas de Ferramentas', 'Escadas e Escadotes', 'Elevadores']],
    ],
    examples: ['Super-Ego conjunto de manómetros 2 vias', 'Super-Ego abocardador excêntrico 1/4"–3/4"', 'Abocardador CT-275', 'Conjunto de soldadura oxi-butano B2', 'Rothenberger reflector de chama 65 mm', 'Wigam Lock-Valve 5/16" SAE'],
    brands: ['Super-Ego', 'Rothenberger', 'Wigam', 'Refco', 'Testo', 'Fieldpiece', 'TIF', 'Value', 'Imperial', 'Extech', 'Kewtech'],
    faq: [
      ['Têm bombas de vácuo e manómetros digitais?', 'Sim. Temos bombas de vácuo, conjuntos de manómetros analógicos e kits de marcas como Value, Refco, Testo e Fieldpiece.'],
    ],
  },
  {
    slug: 'instalacao-avac',
    shop: 'instalacao-avac',
    name: 'Instalação AVAC',
    title: 'Material de instalação AVAC',
    lead: 'Tubo de cobre isolado, acessórios de cobre e latão, bombas de condensados, suportes, calha técnica, fixação, selantes e produtos de limpeza para cada obra.',
    tree: [
      ['Tubagem', ['Tubo de Cobre Isolado', 'Tubo de Cobre', 'Kronos Pipe Flexível', 'Acessórios de Cobre', 'Acessórios de Latão', 'Válvulas de Serviço']],
      ['Bombas de Condensados', ['Com Depósito', 'Sem Depósito', 'Evaporador de Condensados', 'Tubo e Acessórios']],
      ['Suportes', ['Suportes de Parede', 'Suporte de Telhado', 'Base de Pavimento', 'Sinoblocos', 'Tapete Anti-Vibração']],
      ['Calha Técnica', ['Calha', 'Acessórios']],
      ['Fixação', ['Abraçadeiras', 'Buchas', 'Parafusos', 'Varão Roscado', 'Perfil Perfurado']],
      ['Selantes e Isolamento', ['Espuma Poliuretano', 'Silicones Neutros', 'Lã Mineral', 'Fitas Adesivas e PVC']],
      ['Limpeza e Desinfeção', ['Detergentes', 'Desinfectantes', 'Estações de Lavagem', 'Limpeza de Tubagem']],
      ['Diagnóstico de Circuito', ['Sela Fugas', 'Corante', 'Analisadores de Acidez']],
      ['Esgoto e PVC', ['Tubo de Esgoto', 'Tubo PVC', 'Acessórios']],
      ['Caixas de Pré-Instalação', []],
    ],
    examples: ['Tubo de cobre isolado', 'Bomba de condensados Sauermann', 'Errecom detergente para evaporadores', 'Errecom máquina de lavagem alta pressão', 'Fita tela branca 50 mm × 50 m', 'Tê de cobre FxFxF'],
    brands: ['Sauermann', 'Errecom', 'Kronos Pipe', 'Wipcool', 'Solbequi', 'Heller'],
    faq: [
      ['Vendem tubo de cobre isolado a rolo?', 'Sim. Temos tubo de cobre isolado e não isolado em várias medidas, além de curvas, uniões, reduções e porcas de latão.'],
    ],
  },
  {
    slug: 'ventilacao',
    shop: 'ventilacao',
    name: 'Ventilação',
    title: 'Ventilação, condutas e extracção',
    lead: 'Caixas de ventilação, ventiladores in-line, condutas flexíveis e spiro, grelhas, difusores, cortinas de ar e extractores domésticos.',
    tree: [
      ['Caixas de Ventilação', ['Com Motor']],
      ['Ventiladores In-Line', ['Carcaça ABS', 'Carcaça Chapa', 'Acessórios']],
      ['Conduta Flexível de Alumínio', ['Isolada', 'Não Isolada', 'Com Revestimento PVC']],
      ['Conduta Spiro', ['Abraçadeiras', 'Golas', "OG's"]],
      ['Grelhas e Difusores', ['Lineares com Registo', 'Lineares sem Registo', 'De Porta', 'De Sobrepressão']],
      ['Cortinas de Ar', ['Só Ventilação']],
      ['Extractores Domésticos', ['Extractor Axial', 'Bocas de Extracção']],
      ['Isolamentos', []],
    ],
    examples: ['Caixa de ventilação BD-ERP 19/19', 'Tecna cortina de ar 200 cm', 'VENTS extractor axial 125 DK', 'Conduta flexível Ø356 mm 10 m', 'Abraçadeira com borracha para spiro Ø125'],
    brands: ['Tecna', 'Ventiplus', 'VENTS', 'EBM', 'Euro Motors Italy'],
    faq: [],
  },
  {
    slug: 'material-electrico',
    shop: 'material-electrico',
    name: 'Material Eléctrico',
    title: 'Material eléctrico para instalações de frio e clima',
    lead: 'Cabo eléctrico, tubo anelado com cabo, condensadores de arranque e de trabalho, terminais, fichas, tomadas e extensões.',
    tree: [
      ['Cabo Eléctrico', ['Cabo', 'Tubo Anelado com Cabo']],
      ['Condensadores', ['De Arranque', 'De Trabalho', 'Mini']],
      ['Terminais', ['Terminais Eléctricos', 'Alicate de Cravar']],
      ['Tubo', ['Tubo Anelado com Guia', 'Tubo VD e Acessórios']],
      ['Ligações', ['Fichas e Tomadas', 'Extensões', 'Guias de Electricista']],
      ['Diversos', ['Pasta Térmica', 'Lanternas']],
    ],
    examples: ['Condensador de trabalho 1,5 µF 450 V', 'Tubo anelado 20 mm com cabo 5G1,5', 'Enrolador trifásico 5×2,5 mm² 25 m', 'Ficha macho 2P+T 16 A'],
    brands: ['Efapel', 'ElectroTools'],
    faq: [],
  },
  {
    slug: 'equipamentos-hoteleiros',
    shop: 'equipamentos-hoteleiros',
    name: 'Equipamentos Hoteleiros',
    title: 'Equipamentos hoteleiros e de frio comercial',
    lead: 'Arcas horizontais, hottes de cozinha por medida e componentes para restauração e hotelaria.',
    tree: [
      ['Hottes de Cozinha por Medida', []],
      ['Arcas e Frio Comercial', []],
      ['Interruptores de Corte', []],
    ],
    examples: ['Meireles arca horizontal MFA100W', 'Indesit arca horizontal OS 1A 400', 'Interruptor de corte 16 A'],
    brands: ['Meireles', 'Indesit'],
    faq: [],
  },
  {
    slug: 'fotovoltaicos',
    shop: 'fotovoltaicos',
    name: 'Fotovoltaicos',
    title: 'Painéis solares, inversores e estruturas',
    lead: 'Módulos fotovoltaicos, micro-inversores e inversores, estruturas de telhado e conectores para autoconsumo.',
    tree: [
      ['Painéis / Módulos Fotovoltaicos', []],
      ['Micro-Inversores', []],
      ['Estruturas', []],
      ['Terminais para Inversores', []],
    ],
    examples: ['Envertech micro-inversor EVT300', 'Solis inversor 3 kW Wi-Fi', 'Estrutura PV de telhado C38', 'Conector fêmea Envertech'],
    brands: ['Solis', 'Envertech', 'Eurener'],
    faq: [],
  },
];

export const BRANDS = ['Daikin', 'Mitsubishi Electric', 'Gree', 'LG', 'Panasonic', 'Daitsu', 'Toyotomi', 'Copeland', 'Embraco', 'Cubigel', 'Danfoss', 'Carel', 'Castel', 'EBM', 'Errecom', 'Sauermann', 'Elitech', 'Testo', 'Fieldpiece', 'Refco', 'Rothenberger', 'Super-Ego', 'Wigam', 'Value', 'TIF', 'Grundfos', 'WATTS', 'Wipcool', 'Tecna', 'Efapel', 'Kewtech', 'Extech'];

export const FAQ = [
  ['Onde fica a loja da Fercold?', 'Estamos na Rua do Bom Pastor, Lote 8, Loja, Bairro dos Fetais, 2680-136 Camarate, a poucos minutos de Lisboa e do aeroporto.'],
  ['Qual é o prazo de entrega?', 'Entregamos em 24 horas em Portugal Continental. Para as ilhas, contacte-nos para saber prazo e custo.'],
  ['Abrem ao sábado?', 'Sim, estamos abertos ao sábado de manhã, até às 12:30.'],
  ['Sou instalador. Têm condições para profissionais?', 'Sim. A área profissional dá acesso a preços e condições para empresas e técnicos. Peça o seu acesso na área B2B ou fale connosco.'],
  ['Não encontro o produto que procuro. O que faço?', 'Ligue, envie email ou mande a referência. Se não estiver no catálogo online, procuramos o produto ou um equivalente junto dos nossos fornecedores.'],
  ['Que formas de pagamento aceitam?', 'Aceitamos vários métodos de pagamento seguro na loja online e no balcão. Confirme as opções disponíveis no momento da encomenda.'],
];

// Repris de la page d'accueil actuelle de fercold.pt (produits en vedette + marques affichées).
// Les images sont servies par le CDN actuel du site (bo8.onlinebiz.pt).
const CDN = 'https://bo8.onlinebiz.pt/fercold-comercio-de-equipamentos-de-refrigera--o-unipessoal--lda/_files/fercold-comercio-de-equipamentos-de-refrigera-o-unipessoal-lda-';
const P = 'https://www.fercold.pt/loja-online/';

export const FEATURED = [
  { ref: 'FI013', brand: '', cat: 'instalacao-avac', name: 'Fita Tela Branca 50 mm × 50 m', img: CDN + '9dca9d8afa-AXRFQ20200808123043.jpg', url: P + 'instalacao-avac/fitas-adesivas-e-pvc/fita-tela-branca-50mm-x-50mt-40975' },
  { ref: 'PL006', brand: 'Errecom', cat: 'instalacao-avac', name: 'Detergente Concentrado Acid Ultra 250 ml', img: CDN + 'errecom-acid-ultra-250ml-XHIQZ20220208111019.png', img2: CDN + 'acidultra-erreecom-2-OAWI020220208111037.png', url: P + 'instalacao-avac/limpeza-e-desinfecao/detergente/errecom-detergente-concentrado-acid-ultra-emb-250ml-43488' },
  { ref: 'PL007', brand: 'Errecom', cat: 'instalacao-avac', name: 'Detergente Concentrado Alkaline Ultra 250 ml', img: CDN + 'errecom-alkaline-ultra-250ml-655x655-BYOAQ20220208113408.png', img2: CDN + 'alkaline-ultra-erreecom-2-655x655-HKZBA20220208113418.png', url: P + 'instalacao-avac/limpeza-e-desinfecao/detergente/errecom-detergente-concentrado-alkaline-ultra-emb-250ml-43489' },
  { ref: 'PL008', brand: 'Errecom', cat: 'instalacao-avac', name: 'Detergente para Evaporadores Evo Ultra 250 ml', img: CDN + 'errecom-evo-ultra-250ml-655x655-G5AZN20220208113620.png', url: P + 'instalacao-avac/limpeza-e-desinfecao/detergente/errecom-detergente-para-evaporadores-concentrado-evo-ultra-emb-250ml-43490' },
  { ref: 'RF115', brand: 'Elitech', cat: 'refrigeracao', name: 'Termóstato Digital 1 Relé 230 V ECS-961 Neo', img: CDN + 'unnamed-RV4N920200617102935.jpg', url: P + 'refrigeracao/termostatos-e-termometros/termostatos-digitais/elitech-termostato-digital-1-rele-220v-ecs-961-neo-40768' },
  { ref: '1500002865', brand: '', cat: 'ferramenta', name: 'Abocardador com Expansor CT-275', img: CDN + 'flaring-and-swaging-set-500x500-MB76A20200924140453.jpg', url: P + 'ferramenta/abocardadores/abocardador-expansor-/abocardador-c-expansor-mod-ct-275-40972' },
  { ref: 'TP072', brand: 'Sauermann', cat: 'instalacao-avac', name: 'Bomba de Condensados SI-27', img: CDN + 'si27-T1RMG20200706150706.jpg', url: P + 'instalacao-avac/bombas-de-condensados/sauermann-bomba-de-condensados-mod-si-27-40903' },
  { ref: '1000123', brand: '', cat: 'instalacao-avac', name: 'Tubo de Cobre Isolado 3/4" × 0,8 mm (rolo 25 m)', img: CDN + 'download-AWFTJ20200314121557.jpg', url: P + 'instalacao-avac/tubulacao-e-acessorios-/tubo-de-cobre/tubo-de-cobre-isolado/tubo-de-cobre-isolado-3-4x08mm-rolo-25mts-40852' },
  { ref: 'VP1050.01', brand: 'Errecom', cat: 'instalacao-avac', name: 'Máquina de Limpeza Portátil de Alta Pressão R-Jet Gun', img: CDN + 'jet-gun-erreecom-2-655x655-LPBGH20220208161628.png', url: P + 'instalacao-avac/limpeza-e-desinfecao/estacoes-de-lavagem/errecom-maquina-de-limpeza-portatil-de-alta-pressao-para-sistemas-ac-r-jet-gun-43487' },
];

export const BRAND_LOGOS = [
  { name: 'Errecom', img: CDN + 'images-OHMPB20220207161849.png', w: 310, h: 90, note: 'Química para AC e refrigeração' },
  { name: 'Toyotomi', img: CDN + '10728248-154d-4b5d-902a-65aeaedb2fb5-6GSYO20211228162619.jpg', w: 514, h: 171, note: 'Ar condicionado e desumidificação' },
];

export const GREE_BANNER = { img: CDN + 'banner-corpo-gree-1920x500-GBPKH20210707142550.gif', w: 1920, h: 500 };

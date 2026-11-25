// Gerador estático Fercold — sem dependências. `node build.mjs` → dist/
import { mkdirSync, writeFileSync, cpSync, rmSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { SITE, CATEGORIES, BRANDS, FAQ } from './src/data.mjs';

const OUT = 'dist';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('public', OUT, { recursive: true });

const css = readFileSync('public/assets/styles.css');
const v = createHash('md5').update(css).update(readFileSync('public/assets/app.js')).digest('hex').slice(0, 8);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const u = (p) => `${SITE.base}${p}`;
const abs = (p) => `${SITE.url}${p}`;
const shopUrl = (c) => `${SITE.shop}/${c.shop}`;
const year = new Date().getFullYear();

const ORG_ID = `${SITE.url}/#loja`;
const business = {
  '@type': ['Store', 'LocalBusiness'],
  '@id': ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url + '/',
  logo: abs('/assets/logo.svg'),
  image: abs('/assets/og.png'),
  email: SITE.email,
  telephone: SITE.phone,
  priceRange: '€€',
  description: 'Distribuidor de equipamentos de refrigeração, climatização, ventilação, material AVAC, ferramenta e fotovoltaico em Camarate, Lisboa. Entrega em 24 h em Portugal Continental.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${SITE.address.street}, ${SITE.address.area}`,
    postalCode: SITE.address.postal,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  contactPoint: [
    { '@type': 'ContactPoint', telephone: SITE.phone, contactType: 'sales', availableLanguage: ['pt'] },
    { '@type': 'ContactPoint', telephone: SITE.mobile, contactType: 'customer service', availableLanguage: ['pt'] },
  ],
  areaServed: { '@type': 'Country', name: 'Portugal' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Catálogo Fercold',
    itemListElement: CATEGORIES.map((c) => ({ '@type': 'OfferCatalog', name: c.name, url: abs(`/${c.slug}/`) })),
  },
};

const faqLd = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
const crumbsLd = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
});

const icon = {
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="m20 20-4-4" stroke="currentColor" stroke-width="2"/></svg>',
};

function header(active) {
  const links = CATEGORIES.map(
    (c) => `<li><a href="${u(`/${c.slug}/`)}"${active === c.slug ? ' aria-current="page"' : ''}>${c.name}</a></li>`
  ).join('');
  return `<a class="skip" href="#conteudo">Saltar para o conteúdo</a>
<div class="topbar"><div class="wrap topbar__in">
  <p>Não encontra o que procura? <a href="tel:${SITE.mobileHref}">Ligue ${SITE.mobile.replace('+351 ', '')}</a> ou escreva para <a href="mailto:${SITE.email}">${SITE.email}</a></p>
  <ul class="topbar__links">
    <li><a href="${u('/sobre-nos/')}">Sobre nós</a></li>
    <li><a href="${u('/contactos/')}">Contactos</a></li>
    <li><a class="topbar__b2b" href="${SITE.b2b}" rel="noopener">Área profissional</a></li>
  </ul>
</div></div>
<header class="hdr" data-hdr>
  <div class="wrap hdr__in">
    <a class="logo" href="${u('/')}" aria-label="Fercold — página inicial">${logoSvg()}</a>
    <nav class="nav" aria-label="Principal">
      <button class="nav__toggle" aria-expanded="false" aria-controls="menu" data-menu-btn><span></span><span class="sr">Menu</span></button>
      <div class="nav__panel" id="menu" data-menu>
        <ul class="nav__cats">${links}</ul>
        <ul class="nav__aux">
          <li class="m-only"><a href="${u('/sobre-nos/')}"${active === 'sobre' ? ' aria-current="page"' : ''}>Sobre nós</a></li>
          <li class="m-only"><a href="${u('/contactos/')}"${active === 'contactos' ? ' aria-current="page"' : ''}>Contactos</a></li>
          <li><a class="btn btn--copper btn--sm" href="${SITE.shop}" rel="noopener">Loja online</a></li>
        </ul>
      </div>
    </nav>
  </div>
</header>`;
}

function logoSvg() {
  return `<svg class="logo__svg" viewBox="0 0 170 36" role="img" aria-hidden="true">
  <g class="logo__flake" fill="none" stroke-width="3.2" stroke-linecap="round">
    <path d="M18 3v30M5 10.5l26 15M5 25.5l26-15"/>
    <path d="M18 3l-3.5 3.5M18 3l3.5 3.5M18 33l-3.5-3.5M18 33l3.5-3.5"/>
  </g>
  <circle cx="18" cy="18" r="4.2" class="logo__dot"/>
  <text x="42" y="26.5" class="logo__word">fercold</text>
</svg>`;
}

function footer() {
  const cats = CATEGORIES.map((c) => `<li><a href="${u(`/${c.slug}/`)}">${c.name}</a></li>`).join('');
  return `<footer class="ftr">
  <div class="wrap ftr__grid">
    <div class="ftr__brand">
      <a class="logo logo--inv" href="${u('/')}" aria-label="Fercold">${logoSvg()}</a>
      <p>Refrigeração, climatização e AVAC para profissionais e particulares, a partir de Camarate.</p>
      <address>
        ${SITE.address.street}<br>${SITE.address.area}<br>${SITE.address.postal} ${SITE.address.city}
      </address>
    </div>
    <nav aria-label="Catálogo"><h2>Catálogo</h2><ul>${cats}</ul></nav>
    <nav aria-label="Empresa"><h2>Empresa</h2><ul>
      <li><a href="${u('/sobre-nos/')}">Sobre nós</a></li>
      <li><a href="${u('/contactos/')}">Contactos</a></li>
      <li><a href="${SITE.shop}" rel="noopener">Loja online</a></li>
      <li><a href="${SITE.url}/promocoes" rel="noopener">Promoções</a></li>
      <li><a href="${SITE.url}/catalogos" rel="noopener">Catálogos</a></li>
      <li><a href="${SITE.b2b}" rel="noopener">Área profissional</a></li>
    </ul></nav>
    <nav aria-label="Informação legal"><h2>Legal</h2><ul>
      <li><a href="${SITE.url}/termos">Termos e condições</a></li>
      <li><a href="${SITE.url}/politica-de-privacidade">Privacidade</a></li>
      <li><a href="${SITE.url}/politica-de-cookies">Cookies</a></li>
      <li><a href="${SITE.url}/ral">Resolução alternativa de litígios</a></li>
      <li><a href="https://www.livroreclamacoes.pt" rel="noopener">Livro de reclamações</a></li>
    </ul></nav>
  </div>
  <div class="wrap ftr__base">
    <p>© ${year} ${esc(SITE.legalName)}</p>
    <p><a href="tel:${SITE.phoneHref}">${SITE.phone}</a> <span aria-hidden="true">/</span> <a href="mailto:${SITE.email}">${SITE.email}</a></p>
  </div>
</footer>`;
}

function page({ path, title, desc, body, active, ld = [], ogType = 'website' }) {
  const graph = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': `${SITE.url}/#site`, url: SITE.url + '/', name: SITE.name, inLanguage: 'pt-PT', publisher: { '@id': ORG_ID } },
    business,
    { '@type': 'WebPage', '@id': abs(path) + '#pagina', url: abs(path), name: title, description: desc, inLanguage: 'pt-PT', isPartOf: { '@id': `${SITE.url}/#site` }, about: { '@id': ORG_ID } },
    ...ld,
  ] };
  return `<!doctype html>
<html lang="pt-PT">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${abs(path)}">
<link rel="alternate" hreflang="pt-PT" href="${abs(path)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0d2a3f">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="pt_PT">
<meta property="og:site_name" content="Fercold">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${abs(path)}">
<meta property="og:image" content="${abs('/assets/og.png')}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="geo.region" content="PT-11"><meta name="geo.placename" content="Camarate">
<link rel="icon" href="${u('/assets/favicon.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${u('/assets/apple-touch-icon.png')}">
<link rel="manifest" href="${u('/site.webmanifest')}">
<link rel="preload" href="${u('/assets/fonts/archivo-var.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${u('/assets/styles.css')}?v=${v}">
<script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body>
${header(active)}
<main id="conteudo">
${body}
</main>
${footer()}
<script src="${u('/assets/app.js')}?v=${v}" defer></script>
</body>
</html>`;
}

/* ---------- blocos ---------- */

function cycleSvg() {
  // Ciclo frigorífico real: compressor → condensador → expansão → evaporador → compressor
  return `<figure class="cycle" aria-labelledby="cycle-cap">
<svg viewBox="-10 0 590 500" role="img" aria-labelledby="cycle-title cycle-desc">
  <title id="cycle-title">Ciclo de refrigeração</title>
  <desc id="cycle-desc">O compressor envia o fluido em alta pressão para o condensador, passa pela válvula de expansão e volta frio pelo evaporador.</desc>
  <defs>
    <linearGradient id="g-copper" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d88a4f"/><stop offset=".5" stop-color="#b5652f"/><stop offset="1" stop-color="#7f4120"/>
    </linearGradient>
    <linearGradient id="g-ice" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#cfeef7"/><stop offset="1" stop-color="#7cc4dc"/>
    </linearGradient>
    <pattern id="frost" width="22" height="22" patternUnits="userSpaceOnUse">
      <path d="M11 3v16M4 7l14 8M4 15l14-8" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".9"/>
    </pattern>
  </defs>

  <!-- lado de alta pressão (quente) -->
  <path id="hot" class="pipe pipe--hot" pathLength="1"
    d="M120 380 V150 Q120 100 170 100 H200 l16-28 l16 56 l16-56 l16 56 l16-56 l16 56 l16-56 l16 28 H420 Q450 100 450 130 V180"/>
  <path class="pipe-shine" pathLength="1"
    d="M120 380 V150 Q120 100 170 100 H200 l16-28 l16 56 l16-56 l16 56 l16-56 l16 56 l16-56 l16 28 H420 Q450 100 450 130 V180"/>
  <!-- lado de baixa pressão (frio) -->
  <path id="cold" class="pipe pipe--cold" pathLength="1"
    d="M450 230 V380 Q450 420 410 420 H380 l-16 28 l-16 -56 l-16 56 l-16 -56 l-16 56 l-16 -56 l-16 56 l-16 -28 H180 Q150 420 150 410"/>
  <path class="frost" pathLength="1" stroke="url(#frost)"
    d="M380 420 l-16 28 l-16 -56 l-16 56 l-16 -56 l-16 56 l-16 -56 l-16 56 l-16 -28"/>

  <!-- fluxo -->
  <g class="flow">
    <circle r="5" fill="#ffd3ad"><animateMotion dur="3.2s" repeatCount="indefinite" rotate="auto"><mpath href="#hot"/></animateMotion></circle>
    <circle r="5" fill="#ffd3ad"><animateMotion dur="3.2s" begin="-1.6s" repeatCount="indefinite"><mpath href="#hot"/></animateMotion></circle>
    <circle r="5" fill="#ffffff"><animateMotion dur="3.2s" repeatCount="indefinite"><mpath href="#cold"/></animateMotion></circle>
    <circle r="5" fill="#ffffff"><animateMotion dur="3.2s" begin="-1.6s" repeatCount="indefinite"><mpath href="#cold"/></animateMotion></circle>
  </g>

  <!-- componentes -->
  <g class="part part--comp" transform="translate(96 360)">
    <rect width="78" height="96" rx="38" />
    <rect x="18" y="30" width="42" height="6" rx="3" class="part__line"/>
    <rect x="18" y="44" width="42" height="6" rx="3" class="part__line"/>
  </g>
  <g class="part part--valve" transform="translate(426 176)">
    <rect width="48" height="58" rx="10"/>
    <path d="M10 29h28M24 12v34" class="part__x"/>
  </g>

  <g class="tags">
    <text x="120" y="478" text-anchor="middle">Compressor</text>
    <text x="296" y="56" text-anchor="middle">Condensador</text>
    <text x="488" y="212">Expansão</text>
    <text x="296" y="486" text-anchor="middle">Evaporador</text>
    <text x="64" y="245" class="tags__p" transform="rotate(-90 64 245)" text-anchor="middle">alta pressão</text>
    <text x="512" y="320" class="tags__p tags__p--cold" transform="rotate(90 512 320)" text-anchor="middle">baixa pressão</text>
  </g>
</svg>
<figcaption id="cycle-cap">Do compressor ao evaporador: temos cada peça do circuito.</figcaption>
</figure>`;
}

function catIndex() {
  return CATEGORIES.map((c) => {
    const subs = c.tree.map(([n]) => `<li>${esc(n)}</li>`).join('');
    return `<li class="cat">
  <a class="cat__link" href="${u(`/${c.slug}/`)}">
    <h3 class="cat__name">${c.name}</h3>
    <p class="cat__lead">${esc(c.lead)}</p>
    <ul class="cat__subs" aria-label="Famílias de ${esc(c.name)}">${subs}</ul>
    <span class="cat__go">Ver ${c.name.toLowerCase()} ${icon.arrow}</span>
  </a>
</li>`;
  }).join('');
}

function faqBlock(items, heading = 'Perguntas frequentes') {
  if (!items.length) return '';
  return `<section class="sec faq" aria-labelledby="faq-h">
  <div class="wrap faq__in">
    <h2 id="faq-h" class="h2">${heading}</h2>
    <div class="faq__list">
      ${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
    </div>
  </div>
</section>`;
}

function visitBlock() {
  return `<section class="sec visit" aria-labelledby="visit-h">
  <div class="wrap visit__in">
    <div>
      <h2 id="visit-h" class="h2">Passe pelo balcão em Camarate</h2>
      <p class="visit__lead">Traga a referência, a peça avariada ou só a dúvida. Ajudamos a encontrar o equivalente certo.</p>
      <dl class="visit__dl">
        <div><dt>Morada</dt><dd><a href="${SITE.maps}" rel="noopener">${SITE.address.street}, ${SITE.address.area}<br>${SITE.address.postal} ${SITE.address.city}</a></dd></div>
        <div><dt>Telefone</dt><dd><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></dd></div>
        <div><dt>Telemóvel</dt><dd><a href="tel:${SITE.mobileHref}">${SITE.mobile}</a></dd></div>
        <div><dt>Email</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></div>
        <div><dt>Sábado</dt><dd>Aberto até às 12:30</dd></div>
      </dl>
      <div class="actions">
        <a class="btn btn--copper" href="${SITE.maps}" rel="noopener">Abrir no mapa</a>
        <a class="btn btn--ghost" href="tel:${SITE.phoneHref}">${icon.phone} Ligar agora</a>
      </div>
    </div>
    <a class="visit__map" href="${SITE.maps}" rel="noopener" aria-label="Ver a localização da Fercold no mapa">
      <svg viewBox="0 0 400 320" aria-hidden="true">
        <rect width="400" height="320" style="fill:var(--frost-2)"/>
        <path d="M-10 230 C80 200 150 260 240 220 S360 140 420 160" class="map__road map__road--big"/>
        <path d="M60 -10 C90 90 120 150 170 330" class="map__road"/>
        <path d="M250 -10 C240 80 280 160 330 330" class="map__road"/>
        <path d="M-10 90 C120 110 260 70 420 100" class="map__road"/>
        <path d="M300 0 L420 0 L420 70 L330 60 Z" class="map__area"/>
        <text x="390" y="30" text-anchor="end" class="map__lbl">Aeroporto</text>
        <text x="20" y="300" class="map__lbl">Lisboa ↓</text>
        <g transform="translate(206 150)">
          <circle r="34" class="map__pulse"/>
          <circle r="12" style="fill:var(--copper)"/>
          <circle r="4.5" fill="#fff"/>
        </g>
        <text x="230" y="128" class="map__lbl map__lbl--b">Fercold</text>
      </svg>
    </a>
  </div>
</section>`;
}

/* ---------- páginas ---------- */
const pages = [];

// Início
pages.push({
  path: '/',
  file: 'index.html',
  title: 'Fercold | Refrigeração, ar condicionado e AVAC em Lisboa',
  desc: 'Refrigeração, climatização, ventilação, ferramenta e material AVAC em Camarate, Lisboa. Daikin, Gree, Copeland e +40 marcas. Entrega 24 h no continente.',
  ld: [faqLd(FAQ)],
  body: `
<section class="hero">
  <div class="wrap hero__in">
    <div class="hero__txt">
      <h1 class="hero__h"><span class="l">Tudo o que o circuito</span> <span class="l">frigorífico pede.</span></h1>
      <p class="hero__lead">Refrigeração, ar condicionado, ventilação e material de instalação AVAC para técnicos e empresas. Balcão em Camarate e entrega em 24 horas em Portugal Continental.</p>
      <form class="finder" role="search" action="${u('/pesquisa/')}" data-finder>
        <label for="q" class="sr">Pesquisar no catálogo</label>
        ${icon.search}
        <input id="q" name="q" type="search" placeholder="Compressor, manómetro, tubo de cobre…" autocomplete="off" aria-controls="finder-res" aria-autocomplete="list">
        <button class="btn btn--copper" type="submit">Pesquisar</button>
        <ul class="finder__res" id="finder-res" role="listbox" hidden></ul>
      </form>
      <p class="hero__quick">Mais procurados:
        <a href="${u('/climatizacao/')}">Ar condicionado</a>
        <a href="${u('/refrigeracao/')}">Gás refrigerante</a>
        <a href="${u('/instalacao-avac/')}">Tubo de cobre</a>
        <a href="${u('/ferramenta/')}">Bombas de vácuo</a>
      </p>
    </div>
    ${cycleSvg()}
  </div>
</section>

<section class="facts" aria-label="Porque escolher a Fercold">
  <ul class="wrap facts__in">
    <li><strong>24 h</strong><span>Entrega em Portugal Continental</span></li>
    <li><strong>+40 marcas</strong><span>Daikin, Gree, Copeland, Danfoss, Testo…</span></li>
    <li><strong>Sábado</strong><span>Balcão aberto até às 12:30</span></li>
    <li><strong>B2B</strong><span>Preços e condições para profissionais</span></li>
  </ul>
</section>

<section class="sec cats" aria-labelledby="cats-h">
  <div class="wrap">
    <div class="sec__head">
      <h2 id="cats-h" class="h2">Catálogo por área</h2>
      <p>Oito áreas, das peças de reposição aos equipamentos completos. Escolha a sua para ver todas as famílias.</p>
    </div>
    <ul class="cats__list">${catIndex()}</ul>
  </div>
</section>

<section class="sec how" aria-labelledby="how-h">
  <div class="wrap">
    <h2 id="how-h" class="h2">Da referência à obra</h2>
    <ol class="how__steps">
      <li><h3>Encontre ou pergunte</h3><p>Pesquise na loja online ou envie-nos a referência, a foto da chapa de características ou a peça.</p></li>
      <li><h3>Confirmamos e encomenda</h3><p>Validamos compatibilidade e stock. Paga online com segurança ou ao balcão.</p></li>
      <li><h3>Levante ou receba</h3><p>Leve na hora em Camarate ou receba em 24 horas em qualquer ponto do continente.</p></li>
    </ol>
  </div>
</section>

<section class="sec brands" aria-labelledby="brands-h">
  <div class="wrap">
    <h2 id="brands-h" class="h2">Marcas com que trabalhamos</h2>
    <ul class="brands__list">${BRANDS.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
  </div>
</section>

<section class="pro" aria-labelledby="pro-h">
  <div class="wrap pro__in">
    <div>
      <h2 id="pro-h" class="h2 h2--inv">Instalador, frigorista ou empresa de manutenção?</h2>
      <p>Na área profissional vê os seus preços, encomenda mais rápido e acompanha o histórico de compras.</p>
    </div>
    <div class="actions">
      <a class="btn btn--ice" href="${SITE.b2b}" rel="noopener">Entrar na área profissional</a>
      <a class="btn btn--ghost-inv" href="mailto:${SITE.email}?subject=Pedido%20de%20acesso%20B2B">Pedir acesso</a>
    </div>
  </div>
</section>

${faqBlock(FAQ)}
${visitBlock()}
`,
});

// Categorias
for (const c of CATEGORIES) {
  const tree = c.tree.map(([n, subs]) => `<li class="fam">
    <h3>${esc(n)}</h3>
    ${subs.length ? `<ul>${subs.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
  </li>`).join('');
  const others = CATEGORIES.filter((o) => o.slug !== c.slug).map((o) => `<li><a href="${u(`/${o.slug}/`)}">${o.name}</a></li>`).join('');
  pages.push({
    path: `/${c.slug}/`,
    file: `${c.slug}/index.html`,
    active: c.slug,
    title: `${c.title} | Fercold`,
    desc: `${c.title}: ${c.brands.slice(0, 3).join(', ')} e mais marcas. Balcão em Camarate (Lisboa) e entrega em 24 h no continente.`,
    ld: [
      crumbsLd([['Início', '/'], [c.name, `/${c.slug}/`]]),
      { '@type': 'CollectionPage', name: c.title, url: abs(`/${c.slug}/`), mainEntity: { '@type': 'ItemList', itemListElement: c.tree.map(([n], i) => ({ '@type': 'ListItem', position: i + 1, name: n })) } },
      ...(c.faq.length ? [faqLd(c.faq)] : []),
    ],
    body: `
<section class="chero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Localização"><ol><li><a href="${u('/')}">Início</a></li><li aria-current="page">${c.name}</li></ol></nav>
    <h1 class="chero__h">${c.name}</h1>
    <p class="chero__sub">${esc(c.title)}</p>
    <p class="chero__lead">${esc(c.lead)}</p>
    <div class="actions">
      <a class="btn btn--copper" href="${shopUrl(c)}" rel="noopener">Comprar ${c.name.toLowerCase()} na loja</a>
      <a class="btn btn--ghost" href="tel:${SITE.phoneHref}">${icon.phone} Pedir orçamento</a>
    </div>
  </div>
</section>
<section class="sec" aria-labelledby="fam-h">
  <div class="wrap">
    <div class="sec__head"><h2 id="fam-h" class="h2">Famílias de produto</h2><p>${c.tree.length} famílias disponíveis na loja online.</p></div>
    <ul class="fams">${tree}</ul>
  </div>
</section>
<section class="sec sec--tint" aria-labelledby="ex-h">
  <div class="wrap split">
    <div>
      <h2 id="ex-h" class="h2">Exemplos do catálogo</h2>
      <ul class="examples">${c.examples.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="h2">Marcas</h2>
      <ul class="chips">${c.brands.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      <p class="note">Procura outra marca ou um equivalente? <a href="mailto:${SITE.email}?subject=${encodeURIComponent(c.name)}">Envie-nos a referência</a>.</p>
    </div>
  </div>
</section>
${faqBlock(c.faq, `Perguntas sobre ${c.name.toLowerCase()}`)}
<section class="sec more" aria-labelledby="more-h">
  <div class="wrap"><h2 id="more-h" class="h2">Outras áreas</h2><ul class="more__list">${others}</ul></div>
</section>
${visitBlock()}
`,
  });
}

// Sobre nós
pages.push({
  path: '/sobre-nos/',
  file: 'sobre-nos/index.html',
  active: 'sobre',
  title: 'Sobre a Fercold | Refrigeração e AVAC em Camarate',
  desc: 'Distribuidor de refrigeração, climatização, ventilação e fotovoltaico em Camarate, com aconselhamento técnico e entrega em 24 h no continente.',
  ld: [crumbsLd([['Início', '/'], ['Sobre nós', '/sobre-nos/']])],
  body: `
<section class="chero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Localização"><ol><li><a href="${u('/')}">Início</a></li><li aria-current="page">Sobre nós</li></ol></nav>
    <h1 class="chero__h">Sobre nós</h1>
    <p class="chero__sub">Uma casa de frio feita por quem conhece a obra.</p>
  </div>
</section>
<section class="sec">
  <div class="wrap prose">
    <p>A Fercold é uma empresa portuguesa de comércio de equipamentos de refrigeração, sediada em Camarate. Fornecemos refrigeração, climatização, ventilação, aquecimento e sistemas fotovoltaicos, além de todo o material de instalação AVAC, material eléctrico, ferramenta e peças de reposição.</p>
    <p>Queremos ser a referência do sector pela qualidade, pela segurança e pela relação que construímos com clientes e fornecedores. Por isso apostamos em soluções técnicas ajustadas a cada cliente e numa equipa com experiência no terreno.</p>
    <h2 class="h2">O que nos distingue</h2>
    <ul class="ticks">
      <li>Preços competitivos e condições para profissionais</li>
      <li>Entrega em 24 horas em Portugal Continental</li>
      <li>Aconselhamento técnico personalizado, ao balcão ou por telefone</li>
      <li>Balcão aberto também ao sábado, até às 12:30</li>
    </ul>
  </div>
</section>
${visitBlock()}
`,
});

// Contactos
pages.push({
  path: '/contactos/',
  file: 'contactos/index.html',
  active: 'contactos',
  title: 'Contactos Fercold — Camarate, telefone e email',
  desc: `Fale com a Fercold: ${SITE.phone}, ${SITE.mobile} ou ${SITE.email}. Loja na Rua do Bom Pastor, Lote 8, Camarate. Aberto ao sábado até às 12:30.`,
  ld: [crumbsLd([['Início', '/'], ['Contactos', '/contactos/']]), { '@type': 'ContactPage', url: abs('/contactos/'), name: 'Contactos Fercold' }],
  body: `
<section class="chero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Localização"><ol><li><a href="${u('/')}">Início</a></li><li aria-current="page">Contactos</li></ol></nav>
    <h1 class="chero__h">Contactos</h1>
    <p class="chero__sub">Uma referência, uma foto ou uma dúvida: respondemos depressa.</p>
  </div>
</section>
<section class="sec">
  <div class="wrap contact">
    <form class="cform" action="mailto:${SITE.email}" method="post" enctype="text/plain" data-cform>
      <h2 class="h2">Pedir orçamento ou informação</h2>
      <div class="cform__row">
        <label>Nome<input name="nome" required autocomplete="name"></label>
        <label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label>
      </div>
      <label>Email<input name="email" type="email" required autocomplete="email"></label>
      <label>Assunto
        <select name="assunto">
          <option>Orçamento</option><option>Disponibilidade de produto</option><option>Acesso à área profissional</option><option>Outro</option>
        </select>
      </label>
      <label>Mensagem<textarea name="mensagem" rows="5" required placeholder="Referência, quantidade, prazo…"></textarea></label>
      <button class="btn btn--copper" type="submit">Enviar pedido</button>
      <p class="note" data-cform-msg aria-live="polite"></p>
    </form>
  </div>
</section>
${visitBlock()}
`,
});

// Pesquisa (client-side, índice do catálogo)
pages.push({
  path: '/pesquisa/',
  file: 'pesquisa/index.html',
  title: 'Pesquisar no catálogo — Fercold',
  desc: 'Pesquise famílias de produto no catálogo Fercold.',
  noindex: true,
  body: `
<section class="chero"><div class="wrap">
  <h1 class="chero__h">Pesquisa</h1>
  <form class="finder finder--page" role="search" data-finder data-finder-page>
    <label for="q2" class="sr">Pesquisar no catálogo</label>${icon.search}
    <input id="q2" name="q" type="search" placeholder="O que procura?">
    <button class="btn btn--copper" type="submit">Pesquisar</button>
  </form>
</div></section>
<section class="sec"><div class="wrap"><ul class="results" data-results></ul>
<p class="note" data-results-empty hidden>Não encontrámos essa família no catálogo. <a href="${SITE.shop}" rel="noopener">Procure na loja online</a> ou <a href="tel:${SITE.phoneHref}">ligue-nos</a>: arranjamos o produto ou um equivalente.</p>
</div></section>`,
});

// 404
pages.push({
  path: '/404.html', file: '404.html', noindex: true,
  title: 'Página não encontrada — Fercold',
  desc: 'Esta página não existe.',
  body: `<section class="chero"><div class="wrap"><h1 class="chero__h">Esta página não existe</h1><p class="chero__lead">O endereço pode ter mudado. Volte ao início ou escolha uma área do catálogo.</p><div class="actions"><a class="btn btn--copper" href="${u('/')}">Voltar ao início</a></div></div></section>
<section class="sec"><div class="wrap"><ul class="more__list">${CATEGORIES.map((o) => `<li><a href="${u(`/${o.slug}/`)}">${o.name}</a></li>`).join('')}</ul></div></section>`,
});

for (const p of pages) {
  let html = page(p);
  if (p.noindex) html = html.replace('index, follow, max-image-preview:large', 'noindex, follow');
  const f = `${OUT}/${p.file}`;
  mkdirSync(f.split('/').slice(0, -1).join('/'), { recursive: true });
  writeFileSync(f, html);
}

// índice de pesquisa
const idx = [];
for (const c of CATEGORIES) {
  idx.push({ t: c.name, d: c.title, u: u(`/${c.slug}/`) });
  for (const [n, subs] of c.tree) {
    idx.push({ t: n, d: c.name, u: u(`/${c.slug}/`) });
    for (const s of subs) idx.push({ t: s, d: `${c.name} › ${n}`, u: u(`/${c.slug}/`) });
  }
  for (const e of c.examples) idx.push({ t: e, d: c.name, u: u(`/${c.slug}/`) });
}
for (const b of BRANDS) {
  const c = CATEGORIES.find((c) => c.brands.includes(b));
  if (c) idx.push({ t: b, d: `Marca em ${c.name}`, u: u(`/${c.slug}/`) });
}
writeFileSync(`${OUT}/assets/search.json`, JSON.stringify(idx));

// sitemap + robots
const today = new Date().toISOString().slice(0, 10);
writeFileSync(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${p.path === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`);
writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\nDisallow: /pesquisa/\n\nSitemap: ${abs('/sitemap.xml')}\n`);
writeFileSync(`${OUT}/.nojekyll`, '');
console.log(`✓ ${pages.length} páginas geradas em ${OUT}/`);

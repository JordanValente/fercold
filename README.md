# Fercold — novo site

Refonte complète de [fercold.pt](https://www.fercold.pt) : site vitrine statique, ultra-rapide, pensé pour le SEO local (Lisbonne / Camarate) et pour les pros du froid et de la clim.

## Ce qui change par rapport au site actuel

| Actuel | Nouveau |
|---|---|
| Meta « Conteúdo em construção », blog vide | Title + description uniques par page, rédigés pour les recherches réelles |
| Aucune donnée structurée | JSON-LD : `Store`/`LocalBusiness`, `WebSite`, `BreadcrumbList`, `FAQPage`, `CollectionPage` |
| Liens du footer cassés (renvoient à l'accueil) | Maillage interne complet entre les 8 univers |
| Pas de sitemap exploitable | `sitemap.xml`, `robots.txt`, canonical, `hreflang pt-PT`, Open Graph |
| Pages catégories = simple listing | 1 page d'atterrissage SEO par univers (familles, exemples, marques, FAQ) |
| Polices / scripts tiers | Police Archivo auto-hébergée (RGPD), 0 dépendance JS, moins de 5 Ko de JS |

## Design

Système « cuivre & glace » : le cuivre des tuyauteries, le bleu glacé du côté froid du circuit. Pièce maîtresse : le **cycle frigorifique animé** du hero (compresseur → condenseur → détendeur → évaporateur), qui se dessine au chargement puis givre. Typo unique : Archivo variable (axe de largeur poussé à 125 % pour les titres). Animations désactivées si `prefers-reduced-motion`.

## Architecture

```
fercold/
├── index.html                    Accueil
├── climatizacao/index.html       Pages univers (1 dossier = 1 URL propre)
├── refrigeracao/index.html
├── ferramenta/index.html
├── instalacao-avac/index.html
├── ventilacao/index.html
├── material-electrico/index.html
├── equipamentos-hoteleiros/index.html
├── fotovoltaicos/index.html
├── sobre-nos/index.html          À propos
├── contactos/index.html          Contact + formulaire de demande de devis
├── pesquisa/index.html           Résultats de recherche (noindex)
├── 404.html
├── assets/
│   ├── css/style.css             Tout le design (variables, composants, responsive)
│   ├── js/main.js                Menu mobile, recherche instantanée, formulaire
│   ├── fonts/archivo-var.woff2   Police auto-hébergée
│   ├── img/                      Logo, favicon, image de partage (og.png)
│   └── data/search.json          Index de recherche du catalogue
├── sitemap.xml · robots.txt · site.webmanifest
└── tools/
    ├── data.mjs                  CONTENU : catégories, familles, marques, FAQ, coordonnées
    └── build.mjs                 Génère les pages HTML ci-dessus à partir de data.mjs
```

Le site est du **HTML/CSS/JS pur** : il se dépose tel quel sur n'importe quel hébergement (O2switch, FTP, GitHub Pages, Netlify…). Tous les liens sont relatifs, il marche aussi dans un sous-dossier.

Les boutons « Comprar » renvoient vers la boutique actuelle (`/loja-online/...`) et l'espace B2B existant : le site se branche devant le e-commerce sans le casser.

## Modifier le site

- **Texte, catégories, marques, FAQ, téléphone…** → éditer `tools/data.mjs`, puis `npm run build` (régénère tous les `index.html`, le sitemap et l'index de recherche).
- **Design** → `assets/css/style.css` (pas besoin de rebuild).
- **Aperçu local** → `npm run dev` puis http://localhost:4321

## Déploiement

Le workflow `.github/workflows/pages.yml` publie la racine du dépôt sur GitHub Pages à chaque push sur `main` (activer : *Settings → Pages → Source : GitHub Actions*). Pour la mise en production sur fercold.pt, copier tout sauf `tools/`, `.github/` et `package.json` à la racine du domaine.

## À compléter avec Fercold

- Horaires de semaine (seul « samedi jusqu'à 12h30 » est public) → ajouter `openingHoursSpecification` dans `tools/build.mjs`
- Année de création, photos réelles du comptoir / de l'équipe (fort impact sur le SEO local)
- Coordonnées GPS exactes et lien Google Business Profile
- Les photos des produits en vedette et les logos Errecom / Toyotomi / bannière Gree viennent du CDN actuel (`bo8.onlinebiz.pt`) : les rapatrier dans `assets/img/` lors de la mise en production

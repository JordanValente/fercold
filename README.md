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

## Pages

- `/` accueil (recherche instantanée dans le catalogue, univers, étapes, marques, espace pro, FAQ, venir au comptoir)
- `/climatizacao/`, `/refrigeracao/`, `/ferramenta/`, `/instalacao-avac/`, `/ventilacao/`, `/material-electrico/`, `/equipamentos-hoteleiros/`, `/fotovoltaicos/`
- `/sobre-nos/`, `/contactos/`, `/pesquisa/`, `404.html`

Les boutons « Comprar » renvoient vers la boutique actuelle (`/loja-online/...`) et l'espace B2B existant : le site se branche devant le e-commerce sans le casser.

## Utilisation

```bash
npm run build      # génère dist/
npm run dev        # build + serveur local sur http://localhost:4321
```

Tout le contenu (catégories, familles, marques, FAQ, coordonnées) est dans `src/data.mjs`.

Variables : `SITE_URL` (défaut `https://www.fercold.pt`) et `BASE_PATH` (sous-dossier, ex. `/fercold` pour GitHub Pages).

## Déploiement

Le workflow `.github/workflows/pages.yml` publie automatiquement sur GitHub Pages à chaque push sur `main` (activer : *Settings → Pages → Source : GitHub Actions*).

## À compléter avec Fercold

- Horaires de semaine (seul « samedi jusqu'à 12h30 » est public) → ajouter `openingHoursSpecification` dans `build.mjs`
- Année de création, photos réelles du comptoir / de l'équipe (fort impact sur le SEO local)
- Coordonnées GPS exactes et lien Google Business Profile

# Performance — FTCA / FIFAK

Audit et optimisations réalisées sur le site (images, fonts, service worker,
bundle). Document vivant : mettre à jour au fil des sessions perf.

## 1. Cause racine du problème initial ("images ne s'affichent pas")

**Ce n'était pas un bug de code.** Les chemins d'images dans l'app
(`assets/wallp.jpg`, etc., résolus via `<base href="/">`) sont corrects et
génèrent bien des URLs `/assets/...` valides. Le diagnostic sur le site en
ligne a montré :

```
404  /assets/wallp.jpg
404  /assets/image-presse.png
404  /assets/ftca-logo-mark.png
...
404  /some-random-route          (devrait renvoyer index.html via .htaccess)
```

Le dossier `assets/` **et** le fichier `.htaccess` n'étaient pas présents
sur le serveur — le déploiement en ligne à ce moment-là ne correspondait pas
au build produit par ce repo (probablement un upload FTP manuel antérieur
qui n'a pas inclus le dossier `assets/` ni le fichier caché `.htaccess`).
**Un redéploiement complet du contenu de `dist/ftca-fifak/browser/`
(voir DEPLOYMENT.md) résout ce point** — aucune correction de code n'était
nécessaire pour ce symptôme précis.

> **Suite, 2026-08-20** — le symptôme "images cassées en prod" est revenu
> après la migration Cloudinary, mais avec **deux causes distinctes qu'il
> ne faut pas confondre** :
> 1. Un vrai bug de code (mineur, déjà corrigé) : le Service Worker
>    (`ngsw-config.json` → `/assets/**`) précachait encore 4 fichiers locaux
>    devenus orphelins après la migration vers `assetUrl()`/Cloudinary —
>    fichiers supprimés de `src/assets/`.
> 2. La cause principale, **pas liée au code du tout** : le pipeline
>    GitHub Actions (`deploy.yml`) rapportait "success" à chaque run, mais
>    l'upload FTP atterrissait probablement dans `public_html/public_html/`
>    (compte FTP déjà home-scopé sur `public_html/` + `server-dir:
>    /public_html/` en plus) — donc *aucun* commit depuis le tout début de
>    la migration Cloudinary n'avait jamais atteint le site réellement
>    servi. Voir DEPLOYMENT.md §5 pour le détail et le correctif. Lire ce
>    genre de symptôme comme "code cassé" sans vérifier d'abord si le
>    déploiement atteint le bon dossier est le piège à éviter — ce fut le
>    cas ici pendant plusieurs itérations de debug.

## 2. Optimisation des images locales

`npm run optimize-assets` (script `scripts/optimize-assets.js`, basé sur
`sharp`) redimensionne aux dimensions réellement affichées, recompresse,
strip les métadonnées EXIF, et génère une variante `.webp` + un placeholder
flou (LQIP) par image.

| Fichier | Avant | Après | WebP | Usage |
|---|---:|---:|---:|---|
| `deadline.png` | 988kB | 298kB | 83kB | non référencé dans le code actuellement |
| `Fifak-ill.jpg` | 882kB | 175kB | 177kB | hero `/fifak-2026` |
| `fifak.jpg` | 792kB | 280kB | 332kB | non référencé dans le code actuellement |
| `image-presse.png` | 765kB | 130kB | 54kB | carte article (landing) |
| `kelibia-port.jpg` | 730kB | 140kB | 127kB | non référencé dans le code actuellement |
| `fifak-wallp.png` | 331kB | 99kB | 35kB | carte article (landing) |
| `ftca-logo-mark.png` | 85kB | 8kB | 19kB | logo navbar/footer |
| `public-kelibia.jpg` | 77kB | 72kB | 63kB | 1er spread Nashriya |
| `ftca_logo.JPG` | 62kB | 27kB | 13kB | source brute (non déployée en usage) |
| `wallp.jpg` | 42kB | 23kB | 19kB | hero landing |

**Total des 10 fichiers : ~4,7MB → ~1,25MB (recompressés) + ~1,0MB de
variantes WebP** (WebP n'est téléchargé qu'à la place du fichier d'origine
par les navigateurs qui le supportent, pas en plus). **Toutes les images
sont maintenant sous 500kB.**

`deadline.png`, `fifak.jpg` et `kelibia-port.jpg` ne sont référencés par
aucun composant à ce jour (vérifié par recherche dans `src/app/`) — ils sont
optimisés par prudence mais alourdissent le déploiement pour rien tant
qu'ils ne sont pas utilisés. **À vérifier avec l'équipe FTCA** : à intégrer
dans un composant, ou à supprimer du repo.

Le script est idempotent (le relancer sur des fichiers déjà optimisés ne
les redégrade pas significativement) — à relancer après tout ajout de
nouvelle image dans `src/assets/`.

## 3. Formats modernes (WebP) et fallback

- `<img>` (cartes articles, logo navbar/footer) : `<picture>` avec
  `<source type="image/webp">` + fallback PNG/JPEG d'origine — support
  universel, y compris navigateurs anciens et clic-droit "enregistrer
  l'image".
- `background-image` CSS (hero) : pointe directement vers le `.webp`
  (`content.bgImageWebp`), sans fallback CSS — le support WebP est
  aujourd'hui quasi-universel (Safari 14+, tous Chromium/Firefox depuis
  plusieurs années) ; gérer un fallback `@supports` pour un cas résiduel
  aurait ajouté de la complexité pour un gain marginal.

## 4. LQIP (placeholder flou)

`scripts/optimize-assets.js` génère un LQIP base64 (24px, WebP qualité 40,
quelques centaines d'octets) par image, écrit dans
`src/assets/lqip-manifest.json` et recopié dans les champs `lqip` /
`bgImageWebp` des fichiers `data/*.ts`.

**Où c'est branché concrètement** : cartes articles uniquement
(`articles-section.component.html`). Technique utilisée : le LQIP est posé
en `background-image` CSS directement sur la balise `<img>` (qui a un
`object-fit: cover` et une taille réservée via `aspect-ratio` sur son
parent) — le placeholder flou est visible pendant le chargement lazy, puis
automatiquement recouvert par l'image réelle une fois chargée, **sans JS
de swap nécessaire**.

**Où ça n'a délibérément pas été branché** : le hero (background CSS,
au-dessus du pli). Un blur-up piloté par JS retarderait paradoxalement le
rendu de l'élément LCP de la page — la bonne pratique pour une image
critique au-dessus du pli est de la précharger le plus tôt possible, pas de
la faire attendre derrière un placeholder (voir §6).

## 5. Lazy loading

`loading="lazy"` ajouté sur toutes les images en dessous du pli qui ne
l'avaient pas : photos de jury, affiches du programme, images des spreads
Nashriya, cartes articles. Le logo navbar/footer reste `loading="eager"`
(toujours visible immédiatement, ne doit pas être différé).

## 6. Hero / LCP

Le hero est l'élément LCP (Largest Contentful Paint) de chaque page. Deux
optimisations, avec un choix technique assumé :

- **Landing (`/`)** : `<link rel="preload" as="image" fetchpriority="high">`
  statique directement dans `src/index.html`, pointant sur `wallp.webp`.
  Sans SSR, le scanner de préchargement du navigateur ne voit que le HTML
  statique initial — c'est le seul moyen de vraiment gagner du temps avant
  le bootstrap Angular.
- **`/fifak-2026`** : image différente (`Fifak-ill.webp`), donc pas
  couverte par le preload statique ci-dessus (un seul `index.html` sert les
  deux routes, sans SSR pour différencier au moment du rendu serveur).
  `HeroComponent` injecte son propre `<link rel="preload">` en `ngOnInit` —
  gain plus modeste (n'agit qu'après le bootstrap JS, pas avant), documenté
  comme tel plutôt que survendu.
- CSS `background-image` du hero pointe vers `bgImageWebp` en priorité.

**Limite structurelle** : l'app est 100% CSR (pas de SSR, voir CLAUDE.md
§2). Le HTML initial livré au navigateur est un coquille quasi vide
(`<app-root></app-root>`) — aucune optimisation d'assets ne peut faire
peindre le hero avant que le bundle JS soit téléchargé, parsé et exécuté.
C'est un plafond architectural, pas un problème d'images.

## 7. Service Worker (PWA)

`ng add @angular/pwa` : `@angular/service-worker`, `ngsw-config.json`,
`src/manifest.webmanifest`, `provideServiceWorker(...)` dans
`app.config.ts`. Correction apportée après coup : le schematic génère par
défaut des icônes et des couleurs de marque **Angular génériques** (logo
bouclier bleu, `theme_color: #1976d2`) — remplacées par :
- Icônes régénérées depuis `src/assets/ftca_logo.JPG` (même source que le
  favicon existant, voir CLAUDE.md §8), aux 8 tailles requises par le
  manifest (72 à 512px).
- `theme_color: #e8153c` (`--rouge-vif`), `background_color: #0a0908`
  (`--noir`), `name`/`short_name` = FTCA — alignés sur `_tokens.scss`.
- `<meta name="theme-color">` dans `index.html` mis à jour en cohérence.

Mise en cache : JS/CSS (`assetGroup "app"`, `installMode: prefetch` —
approprié car noms hashés, cache-busting automatique à chaque build) et
`assets/**` (`installMode: lazy`, `updateMode: prefetch`) via la
configuration par défaut d'Angular, qui correspond à ce qui était demandé
(JS/CSS et images mis en cache long terme, invalidés proprement à chaque
déploiement).

## 8. Fonts auto-hébergées

Les 4 familles (Fraunces, Anton, Archivo, Amiri) étaient chargées depuis le
CDN Google Fonts. Auto-hébergement complet dans `src/assets/fonts/` +
`src/app/styles/_fonts.scss`, CDN retiré d'`index.html`.

**Sous-ensembles conservés** : `latin` + `latin-ext` pour Fraunces/Anton/
Archivo (le français a besoin de `latin-ext` pour les caractères accentués
— é, è, à, ç, œ... — absents du sous-ensemble `latin` de base) ; `arabic`
uniquement pour Amiri (utilisée exclusivement pour le bloc arabe de la
Nashriya). Sous-ensembles `cyrillic`/`vietnamese`/`greek` non utilisés par
le site, exclus. 21 fichiers `.woff2`, ~1,3MB au total sur disque — mais
`unicode-range` par `@font-face` fait que le navigateur ne télécharge que
les sous-ensembles réellement nécessaires au texte affiché, comme avec le
CDN Google Fonts (le comportement de chargement paresseux par script est
préservé, seul l'hébergement change).

`font-display` :
- `swap` conservé pour **Archivo** (texte de corps, doit rester lisible
  immédiatement même avec la police de repli) et **Amiri** (texte arabe :
  la justesse du script affiché prime sur un éventuel reflow).
- `optional` pour **Fraunces** et **Anton** (typographie éditoriale/poster,
  non essentielle à la lecture) — suite à un CLS mesuré à 0.463 en preset
  desktop Lighthouse attribué par l'outil au chargement de ces deux
  polices (voir §9). `optional` élimine le risque de reflow tardif : soit
  la police est prête à temps (~100ms), soit le navigateur garde
  définitivement la police de repli pour ce chargement de page, sans jamais
  basculer en cours de rendu.

`<link rel="preload">` ajouté dans `index.html` pour Archivo (latin +
latin-ext, régulier) — la police de corps utilisée dès le premier rendu
(navbar, hero) sur toutes les pages.

**Non fait** : Font Awesome reste chargé depuis son CDN (cdnjs). Auto-
héberger Font Awesome était hors du périmètre demandé (qui visait
spécifiquement Google Fonts) et representerait un chantier séparé
(sous-ensemble d'icônes réellement utilisées, gestion de 3 familles
solid/regular/brands).

## 9. Mesures Lighthouse (local, honnêtes — voir limites ci-dessous)

Mesuré en local contre le build de production
(`npm run build:prod` + `npx http-server dist/ftca-fifak/browser`),
Chrome headless, après toutes les optimisations ci-dessus.

| | Mobile (défaut) | Desktop |
|---|---:|---:|
| Performance | **60** | 45 |
| Accessibility | 93 | 92 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 5.4s | 2.8s |
| LCP | 8.2s | 3.5s |
| TBT | 140ms | 20ms |
| CLS | 0 | 0.463 |

**Le score cible de 85+ n'est pas atteint dans cet environnement de test
local — à dire clairement plutôt qu'à enjoliver.** Raisons identifiées,
par ordre d'impact probable :

1. **`http-server` (serveur de test local) ne compresse pas les réponses**
   (`gzip`/`brotli`). Lighthouse chiffre ~229KiB d'économie possible rien
   que là-dessus. La compression gzip est **confirmée active en production**
   (LiteSpeed, header `Content-Encoding: gzip` vérifié par `curl -I`) — ce
   test local sous-estime donc significativement les performances réelles.
2. **Pas de SSR** (voir §6) : le CSR pur impose un plancher de temps avant
   peinture du contenu (download + parse + exécution JS avant tout rendu),
   quelle que soit l'optimisation des assets. Améliorer davantage
   nécessiterait du SSR/prerendering (`@angular/ssr`), hors périmètre de
   cette session.
3. **Profil de throttling par défaut de Lighthouse mobile** : simulation
   volontairement pessimiste (CPU 4x plus lent, réseau "4G lent") — un
   score de laboratoire dans ces conditions ne reflète pas l'expérience de
   la majorité des visiteurs réels (WiFi, 4G/5G correct, appareils récents).
4. **CLS 0.463 en preset desktop uniquement** (0 en mobile) : Lighthouse
   attribue ce shift à un élément tardif dans le `<footer>`, initialement
   pointé vers le chargement de Fraunces/Anton. Le correctif `font-display:
   optional` (§8) a été appliqué mais **n'a pas fait bouger le chiffre lors
   de la revérification** (identique aux 10 décimales près), ce qui suggère
   que l'attribution initiale de Lighthouse à ces polices était trompeuse
   plutôt que causale. Le correctif reste une bonne pratique en soi
   (réduit un vrai risque de reflow ailleurs) mais **le CLS mesuré n'est
   pas confirmé résolu** — point ouvert, voir Checklist.

**Recommandation** : une fois le redéploiement effectué (voir
DEPLOYMENT.md), auditer **l'URL de production réelle**
(`https://ftca-fifak.tn`) plutôt que ce build local :

```bash
npx lighthouse https://ftca-fifak.tn/ --view
```

ou via PageSpeed Insights (https://pagespeed.web.dev/) qui utilise en plus
des données de terrain (Chrome UX Report) quand elles sont disponibles —
bien plus représentatif que ce test synthétique mono-machine que du
laboratoire.

## 10. Bundle JS / lazy loading des routes

Déjà en place (architecture existante, vérifiée plutôt que refaite) :
`home-page-component` et `fifak-2026-page-component` sont deux chunks lazy
séparés (routing `loadComponent`, voir `app.routes.ts`) — confirmé dans la
sortie de build (`ng build --configuration production`). Bundle initial
~276kB brut / ~76kB transféré (gzip estimé par Angular CLI), polyfills
minimaux (`zone.js` uniquement, requis par cette version d'Angular).

## 11. `npm audit`

52 vulnérabilités signalées (dont 3 critiques), **toutes nécessitant une
mise à jour majeure d'Angular** (17 → 21, saut de 4 versions majeures) pour
être corrigées (`npm audit fix --force`). **Non appliqué dans cette
session** : une migration Angular majeure est un chantier à part entière
(breaking changes, tests de non-régression complets sur toutes les pages),
pas un correctif de déploiement/perf. À planifier séparément.

## Checklist perf restante

- [ ] Redéployer (voir DEPLOYMENT.md) puis re-mesurer sur
      `https://ftca-fifak.tn` réel (gzip actif, conditions réelles)
- [ ] Décider du sort de `deadline.png` / `fifak.jpg` / `kelibia-port.jpg`
      (non utilisés actuellement — intégrer ou supprimer)
- [ ] Investiguer plus avant le CLS desktop 0.463 sur le `<footer>` — le
      correctif `font-display` appliqué n'a pas confirmé le résoudre ;
      profiler avec Chrome DevTools (panneau Performance, section Layout
      Shift) sur la page réelle en conditions desktop
- [ ] Envisager `@angular/ssr` si le plancher CSR (§6) devient bloquant
      pour le SEO/LCP après le redéploiement
- [ ] Planifier séparément la mise à jour majeure Angular (`npm audit`, §11)
- [ ] Si les icônes/couleurs PWA (§7) doivent changer avec la marque,
      régénérer depuis `ftca_logo.JPG` (même procédé que §7, pas de script
      conservé dans le repo — à recréer si besoin, cf. convention
      CLAUDE.md §8)

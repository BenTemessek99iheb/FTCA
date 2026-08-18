# Assets — structure et conventions

## Structure de `src/assets/`

```
src/assets/
  *.jpg, *.png          images sources, optimisées par npm run optimize-assets
  *.webp                 variante WebP générée pour chaque image ci-dessus
  lqip-manifest.json      placeholders flous (base64) générés, référencés
                          manuellement dans src/app/data/*.ts (champ `lqip`)
  fonts/                  woff2 auto-hébergés (Fraunces, Anton, Archivo, Amiri)
                          — voir src/app/styles/_fonts.scss
  icons/                  favicon (icon-180/192/512.png) + set PWA
                          (icon-{72,96,128,144,152,192,384,512}x*.png,
                          référencé par src/manifest.webmanifest)
  img/                    vide, non utilisé — peut être supprimé
```

`src/favicon.ico` vit à la racine de `src/` (hors `assets/`), c'est la
convention par défaut d'Angular CLI — ne pas le déplacer.

## Comment une image est servie

`angular.json` → `architect.build.options.assets` contient `"src/assets"` :
tout le dossier est copié tel quel dans `dist/ftca-fifak/browser/assets/`
à chaque build, avec la même arborescence. `index.html` déclare
`<base href="/">`, donc toute référence `assets/xxx.jpg` dans le code
(HTML ou TS, sans slash initial) se résout en `/assets/xxx.jpg` — cette
convention (chemin relatif sans slash initial) est celle utilisée partout
dans ce projet, à conserver pour toute nouvelle image.

## Chemins actuels par section

| Section | Champ de contenu | Fichier de données |
|---|---|---|
| Navbar / Footer | logo (`<img src>` en dur) | `navbar.component.html` / `footer.component.html` |
| Hero landing | `HERO_CONTENT.bgImageUrl` / `.bgImageWebp` | `data/site-content.ts` |
| Hero FIFAK 2026 | `FIFAK_2026_HERO_CONTENT.bgImageUrl` / `.bgImageWebp` | `data/fifak-2026-content.ts` |
| Cartes articles | `ArticleCard.image` / `.webpImage` / `.lqip` | `data/site-content.ts` |
| Jury | `JuryMember.photoUrl` | `data/fifak-2026-content.ts` |
| Programme | `ProgrammeFilm.posterUrl` | `data/fifak-2026-content.ts` |
| Nashriya | `NashriyaEntry.imageUrl` | `data/fifak-2026-content.ts` |

Convention du projet (voir CLAUDE.md §6) : **jamais d'URL d'image codée en
dur dans un template** en dehors du logo navbar/footer (identique sur
toutes les pages, pas de variation de contenu à typer) — toute image liée
à du contenu éditorial passe par un objet typé dans `data/*.ts`.

## Ajouter une nouvelle image

1. Déposer le fichier source dans `src/assets/` (JPEG ou PNG, peu importe
   la taille de départ — le script la réduit).
2. Ajouter une entrée dans `TARGETS` de `scripts/optimize-assets.js` :
   nom de fichier exact, largeur max réellement affichée par le composant
   qui l'utilisera, qualité de compression (78-85 pour JPEG, 80-90 pour PNG).
3. `npm run optimize-assets` — redimensionne, recompresse, strip l'EXIF,
   génère le `.webp`, ajoute une entrée dans `lqip-manifest.json`.
4. Vérifier que le fichier fait moins de 500kB après optimisation (le
   script avertit sinon — baisser `quality`/`maxWidth` pour ce fichier).
5. Référencer le chemin dans le fichier de données concerné (`data/*.ts`),
   jamais en dur dans un template (sauf logo navbar/footer, seul cas déjà
   toléré dans ce projet).
6. Pour un usage `<img>` : suivre le patron `<picture>` +
   `webpImage`/`lqip` de `articles-section.component.html`. Pour un fond
   CSS plein écran : ajouter un champ `*Webp` à côté de l'URL d'origine,
   comme `HeroContent.bgImageWebp`.
7. `npm run build:prod` puis vérifier `find dist/ftca-fifak/browser/assets/`
   — le nouveau fichier (+ son `.webp`) doit y apparaître.

## Images externes (picsum.photos)

Jury, programme, et la majorité des entrées Nashriya utilisent des
placeholders `https://picsum.photos/seed/...` — voir IMAGE-AUDIT.md pour
la liste complète. Ce sont des espaces réservés documentés depuis
l'origine du projet (CLAUDE.md §1), pas des bugs. Quand les vraies photos
FTCA/FIFAK seront disponibles : les déposer dans `src/assets/`, les passer
par `npm run optimize-assets`, puis remplacer les URLs `picsum.photos`
correspondantes dans `data/fifak-2026-content.ts` par les chemins locaux
optimisés (suivre la procédure ci-dessus).

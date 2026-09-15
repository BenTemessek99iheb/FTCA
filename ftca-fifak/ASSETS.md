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

**Deux mécanismes différents selon comment le chemin est construit** —
distinction importante, source de confusion sinon (vécu le 2026-09-15,
images d'articles ajoutées au code mais invisibles sur le site) :

- **Via `assetUrl('nom')`** (`src/app/shared/asset-url.ts`) — le cas de la
  quasi-totalité des images de contenu éditorial (`data/*.ts`). Résout vers
  un miroir Cloudinary (`res.cloudinary.com/ykjb5rh5/.../assets/<nom>`,
  `f_auto,q_auto` pour le format/la qualité à la volée), **pas** vers
  `dist/.../assets/` local — voir `environment.ts` pour le detail et le
  pourquoi. **Le fichier local ne suffit pas** : il doit en plus être
  poussé sur Cloudinary, ce qui n'arrive **pas automatiquement** au
  déploiement du site (aucun step CI ne le fait). Deux scripts dédiés :
  - `npm run verify-cloudinary` (lecture seule) — liste les fichiers de
    `src/assets/` absents de Cloudinary.
  - `npm run upload-assets` — les y pousse. Nécessite un `.env` **à la
    racine du repo** (au-dessus de `ftca-fifak/`, donc `FTCA/.env` — pas
    `ftca-fifak/.env`, qui sert au FTP, voir `.env.example`) avec
    `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
    (Cloudinary → Settings → API Keys). Sans ce `.env`, `npm run
    verify-cloudinary`/`upload-assets` échouent immédiatement avec un
    message explicite plutôt qu'une erreur obscure.
- **Chemin local direct** (`assets/xxx.svg` en dur, sans passer par
  `assetUrl()`) — cas rare, actuellement seulement `assets/tn.svg`
  (`tunisia-map.component.ts`, récupéré via `HttpClient.get(...)` en texte
  brut pour être injecté dans le DOM — un usage qui ne se prête pas à
  Cloudinary). Pour ce cas : `angular.json` →
  `architect.build.options.assets` contient `"src/assets"`, tout le dossier
  est copié tel quel dans `dist/ftca-fifak/browser/assets/` à chaque build,
  et `index.html` déclare `<base href="/">` donc `assets/xxx` (sans slash
  initial) se résout en `/assets/xxx` sur le domaine du site lui-même — ce
  mécanisme suffit, pas besoin de Cloudinary pour ce genre de fichier.

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
8. **`npm run upload-assets`** (voir §"Comment une image est servie"
   ci-dessus) — étape à ne pas oublier si le champ de données utilise
   `assetUrl()` (le cas normal) : sans elle, l'image reste invisible en
   ligne (et en dev local) même une fois le site déployé, puisque
   `assetUrl()` ne lit jamais `dist/.../assets/` local. `npm run
   verify-cloudinary` pour confirmer avant de considérer la tâche terminée.

## Images externes (picsum.photos)

Jury, programme, et la majorité des entrées Nashriya utilisent des
placeholders `https://picsum.photos/seed/...` — voir IMAGE-AUDIT.md pour
la liste complète. Ce sont des espaces réservés documentés depuis
l'origine du projet (CLAUDE.md §1), pas des bugs. Quand les vraies photos
FTCA/FIFAK seront disponibles : les déposer dans `src/assets/`, les passer
par `npm run optimize-assets`, puis remplacer les URLs `picsum.photos`
correspondantes dans `data/fifak-2026-content.ts` par les chemins locaux
optimisés (suivre la procédure ci-dessus).

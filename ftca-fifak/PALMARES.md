# Palmarès — composant et modèle de données

Section "Palmarès 2026" de la page `/fifak-2026` : compétition
internationale, compétition nationale, et prix parallèles.

## Structure

```
src/app/components/laureate-laurels/       Couronne SVG + logo FTCA (décoratif,
                                            partagé avec film-detail-modal)
src/app/pages/fifak-2026/palmares/
  palmares.model.ts                  Types (AwardCategory, PalmaresFilm...)
  palmares.data.ts                   Données — un prix = un PalmaresFilm
  palmares.component.ts/html/scss    Section complète (groupée par section)
  laureate-certificate/
    laureate-certificate.component.ts/html/scss   Carte de lauréat réutilisable
```

`laureate-laurels` vit dans `src/app/components/` (pas sous `palmares/`) parce
qu'il est aussi utilisé par `film-detail-modal` (composant partagé,
`src/app/components/film-detail-modal/`) : le mettre sous une page spécifique
aurait créé une dépendance inversée (un composant partagé importé depuis une
page). C'est le seul écart à l'arborescence suggérée initialement.

Comme les autres sections de `/fifak-2026` (jury, nashriya, programme), le
composant consomme les données via `ContentService.getPalmaresFilms()`,
jamais directement `PALMARES_FILMS` — voir `content.service.ts`.

## Modèle de données

`PalmaresFilm` (un prix décerné à un film) :

```ts
interface PalmaresFilm {
  id: string;
  title: string;
  director: string;
  country: string;
  posterUrl: string;
  category: AwardCategory;           // voir enum + AWARD_CATEGORY_LABELS
  section: 'international' | 'national' | 'sidebar';
  prominence: 'featured' | 'standard'; // 'featured' = Faucon d'or / Grand Prix
  structure?: string;                 // club/école/prod créditée
}
```

**Choix clé : les prix référencent `PROGRAMME_FILMS`, ils ne dupliquent pas
ses données.** Presque tous les films primés existent déjà comme
`ProgrammeFilm` dans `data/fifak-2026-content.ts` (poster, réalisateur,
pays déjà saisis pour l'affichage du catalogue). `palmares.data.ts` résout
chaque prix via `requireFilm(fragmentDeTitre)`, qui cherche un match unique
par sous-chaîne dans `PROGRAMME_FILMS` et **échoue au chargement du module**
si le fragment ne correspond à aucun film ou à plusieurs — ce fail-fast est
volontaire : mieux vaut un crash au build qu'un prix silencieusement mal
rattaché. `director`, `country`, `posterUrl` et `structure` (dérivé de
`sousCategorie`/`Prod`) peuvent être surchargés par prix quand la source du
palmarès diffère du programme (ex : le Prix technique crédite un technicien
précis plutôt que toute l'équipe de réalisation).

Un même film peut porter plusieurs prix (ex: le documentaire "حوح" gagne
Meilleur film amateur + Prix Municipalité + Prix des bénévoles) : chaque
prix est une entrée `PalmaresFilm` distincte avec son propre `id`, `category`
et `section`.

Les libellés de catégorie sont un `Record<AwardCategory, string>` unique en
français (`AWARD_CATEGORY_LABELS`), suivant exactement le patron déjà en
place pour `PROGRAMME_CATEGORY_LABELS`/`FILM_GENRE_LABELS` — pas de re-saisie
FR/AR ici, les titres de film bilingues suivent la convention déjà utilisée
partout dans `PROGRAMME_FILMS` (ex: `"هدر/Good Boy"`).

## Design — pas de panneau, s'intègre au fond de la section

`laureate-certificate` n'a pas de fond/bordure/ombre propres : le lauréat
s'intègre directement au fond de la section (`--noir`/`--panneau`, voir
`styles/_tokens.scss`), pas de tuile de contenu isolée. Hiérarchie identique
sur toutes les cartes :

1. **Logo FTCA au-dessus de la couronne de lauriers** (`app-laureate-laurels`,
   `assets/laureat.png`) — élément décoratif fixe et discret, plus grand sur
   les deux prix `'featured'` (Faucon d'or, Grand Prix), qui ouvrent aussi
   chaque grille (voir `PalmaresComponent.bySection`, trié pour éviter un
   trou dans la grille 4 colonnes plutôt que trié par ordre de saisie).
2. **Catégorie du prix** — l'élément dominant (`--impact`, rouge) et **seul
   élément cliquable** de la carte (`<button>`, pas toute la carte) : ouvre
   `app-film-detail-modal`, déjà utilisé par `film-card` — pas de modal
   dupliqué. Retour visuel au survol limité à ce bouton (couleur, soulignement)
   plutôt qu'un effet de carte entière, pour ne pas laisser croire que le
   titre/réalisateur sont eux aussi cliquables.
3. **Film** (titre, réalisateur) — en retrait, texte plus petit et plus terne.
   Le pays/la structure ne sont plus affichés sur la carte (demandé pour
   alléger : récompense > titre > réalisateur, rien de plus) ; ils restent
   consultables dans le modal de détail (`programmeFilm.country`, etc.).

`PalmaresFilm.programmeFilm` porte la référence complète vers `ProgrammeFilm`
pour ouvrir ce modal (poster, synopsis, durée...) ; le modal reçoit en plus
`[prizeLabel]`, qui affiche le même bandeau lauriers + nom du prix en tête
(`FilmDetailModalComponent.prizeLabel`, optionnel — les autres usages du
modal, ex. depuis le programme, n'en fournissent pas et n'affichent rien).

**`assets/laureat.png` fourni ne contenait pas de vraie transparence** — un
fond gris très sombre était cuit dans le PNG (opaque, alpha=255 partout),
invisible tel quel sur fond sombre mais rendu comme un carré plein dès qu'on
essayait de le recolorer. Refait via `sharp` (extraction alpha par luminance
+ étirement de contraste) avant d'être passé dans `optimize-assets.js`
(entrée `laureat.png` ajoutée aux `TARGETS`).

**`assets/laureat` n'est pas encore résolu par `assetUrl()` au moment de ce
commit** — `assetUrl()` pointe vers un miroir Cloudinary
(`res.cloudinary.com/ykjb5rh5/.../assets/<nom>`, voir `environment.ts`) qui
ne sert que les fichiers déjà déployés en production ; un fichier tout juste
ajouté localement (comme `laureat.png` ici) y répond 404 jusqu'au prochain
déploiement (le même cycle que tout nouvel asset de ce projet — `ftca_logo`
et `ftca-logo-mark`, déjà utilisés ailleurs, répondent bien 200). Attendu à
se résoudre après le prochain `git push` sur `main`, pas un bug à corriger
ici.

Pas de poster dans la carte elle-même (il n'apparaît qu'au clic, dans le
modal) : à cette taille de carte, un poster nuisait à la lisibilité du prix
(essayé, revenu en arrière) ; le poster reste l'élément fort du modal de
détail, pas de la carte de la grille.

Pas de QR code ni de gradient doré : ces éléments du brief initial ne
correspondaient pas à l'identité visuelle réelle du site (validé avec
l'équipe avant implémentation).

## Intégration

Le composant est monté directement dans `fifak-2026-page.component.html`
comme les autres sections (`<app-palmares>` après `<app-nashriya-section>`),
et déclaré dans `railSections` (`{ id: 'palmares', label: '05' }`) pour la
navigation par rail de pellicule (`film-rail`). Ce n'est pas une route
séparée : contrairement au programme complet (`/fifak-2026/programme`), le
palmarès (~20 prix) tient dans une seule section de page.

## Accessibilité & responsive

- Le bouton catégorie porte un `aria-label` combinant catégorie + titre du
  film (le libellé visible seul, ex. "Mention spéciale", ne suffirait pas à
  distinguer les lecteurs d'écran) ; la couronne de lauriers (purement
  décorative) est marquée `aria-hidden="true"`.
- Grille `repeat(4, 1fr)` → 3 → 2 → 1 colonne selon la largeur, identique aux
  breakpoints de `programme-grid` (1080px / 768px / 520px).
- Respecte `prefers-reduced-motion` via les règles globales déjà définies
  dans `_tokens.scss` (`.reveal`, transitions).

## Ajouter un prix

1. Vérifier si le film existe déjà dans `PROGRAMME_FILMS`
   (`data/fifak-2026-content.ts`). Si oui, ajouter une entrée
   `award('fragment unique du titre', AwardCategory.XXX, 'section', overrides?)`
   dans `palmares.data.ts`.
2. Si le film n'est pas encore au programme, l'y ajouter d'abord (poster,
   réalisateur, pays — voir `ASSETS.md` pour la procédure d'image), puis
   référencer son titre depuis `palmares.data.ts`.
3. Nouvelle catégorie de prix non couverte par `AwardCategory` : ajouter le
   membre d'enum et son libellé dans `AWARD_CATEGORY_LABELS`
   (`palmares.model.ts`).

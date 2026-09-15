# Clubs FTCA — carte, tiroir latéral, page dédiée et inscription

Deux points d'entrée vers la même carte de Tunisie par gouvernorat (contours
réels) : un tiroir latéral rapide (icône dans la navbar) et une page dédiée
`/clubs` (lien "Clubs" dans la nav principale) — plus un popup club(s) et un
formulaire d'inscription pré-rempli, partagés par les deux.

## Structure

```
src/app/data/clubs-content.ts              Club (interface + CLUBS)
src/assets/tn.svg                          24 gouvernorats (Simplemaps, voir licence dans le fichier)
src/app/components/
  tunisia-map/           Injecte tn.svg dans le DOM, rend chaque gouvernorat interactif
  club-popup/             Popup club(s) d'un gouvernorat (même patron que film-detail-modal)
  clubs-drawer/          Tiroir latéral (carte + popup), ouvert depuis navbar
  share-button/          Bouton "Partager" réutilisable (club-popup → lien /inscription du club)
src/app/pages/clubs/
  clubs-page.component.ts/html/scss         Page dédiée (route /clubs) : carte en grand + annuaire
src/app/pages/inscription/
  inscription-page.component.ts/html/scss   Formulaire d'inscription (route /inscription)
src/app/services/
  club-registration.service.ts   Envoie le formulaire au backend Google Apps Script
scripts/google-apps-script/
  inscriptions.gs                Backend à coller dans l'éditeur Apps Script (voir plus bas)
```

`ContentService.getClubs()` expose `CLUBS`, comme les autres contenus du
site (`getProgrammeFilms()`, `getPalmaresFilms()`...).

## Décisions de conception (voir aussi l'historique de session)

- **Pas de Three.js/WebGL.** Aucune dépendance 3D n'existait dans ce projet
  (tout le reste — lauriers, grain — est du SVG + CSS). Le "3D-ish" demandé
  est simulé par un léger tilt CSS (`perspective` + `rotateX/rotateY`,
  `tunisia-map.component.ts` → `onMouseMove()`, désactivé sous
  `prefers-reduced-motion`), pas une vraie scène WebGL.
- **`assets/tn.svg` est injecté tel quel**, pas redessiné à la main : 24
  `<path>` (un par gouvernorat réel — Tunis, Ariana, Sfax, Sousse, Bizerte,
  Nabeul...), chacun avec `id="TNxx"` et `name="<Gouvernorat>"`. Récupéré via
  `HttpClient.get('assets/tn.svg', { responseType: 'text' })` (texte brut,
  **pas** `assetUrl()` — ce helper pointe vers un miroir Cloudinary pensé
  pour des photos, pas pour du SVG interactif à injecter dans le DOM ; voir
  `data/site-content.ts` / `shared/asset-url.ts`), puis `[innerHTML]` avec
  `DomSanitizer.bypassSecurityTrustHtml` (asset du projet, pas du contenu
  utilisateur). `TunisiaMapComponent` utilise
  `ViewEncapsulation.None` : le SVG injecté vit hors du template compilé par
  Angular, les styles `scoped` (attribut `_ngcontent`) ne l'atteindraient
  pas — noms de classes déjà namespacés (`tunisia-map__*`) pour rester sûr.
  `tn.svg` ne se charge **qu'à la première ouverture du tiroir**
  (`ClubsDrawerComponent.mapLoaded`), pas à chaque chargement de page : le
  tiroir lui-même est toujours monté dans la navbar (voir plus bas), un
  fetch de ~450 Ko à chaque visite aurait été un vrai coût de performance
  pour la quasi-totalité des visiteurs qui n'ouvrent jamais "Clubs".
- **Chaque gouvernorat est son propre `<path>` nommé, survolable** (tooltip
  natif via un `<title>` injecté par `wireUpRegions()`) — les 24, pas
  seulement ceux avec un club. Seuls les gouvernorats portant au moins un
  club (`Club.region`) reçoivent `role="button"`, `tabindex`, un
  `aria-label`, et les gestionnaires clic/clavier ; les autres restent
  visuellement neutres et non cliquables.
- **Les marqueurs de club ne sont pas des coordonnées devinées** : ils
  utilisent le point d'étiquette réel que le fichier source fournit pour
  chaque gouvernorat (`<g id="label_points">` dans `tn.svg`, recopié dans
  `REGION_LABEL_POINTS` de `tunisia-map.component.ts` plutôt que reparsé au
  runtime), donc toujours à l'intérieur de la bonne forme.
- **"Barre latérale" = tiroir qui slide depuis la droite** (`clubs-drawer`),
  ouvert par un bouton rond dans la navbar (icône carte, à côté du burger),
  sur le même patron `[isOpen]`/`(close)` que `app-mobile-menu` — y compris
  la gestion de `document.body.style.overflow`, qui reste dans `navbar.component.ts`
  plutôt que dupliquée dans le tiroir.
- **`/clubs` réutilise `app-tunisia-map` tel quel** — même fetch de `tn.svg`,
  mêmes marqueurs, même comportement clic/clavier — pas de fork. Seul
  changement apporté au composant : le `max-width: 340px` fixe de
  `.tunisia-map` a été retiré (`tunisia-map.component.scss`) pour qu'il
  remplisse son conteneur plutôt qu'une taille figée ; chaque consommateur
  (`clubs-drawer` ~380px, `clubs-page` jusqu'à 640px) fixe sa propre largeur
  via son propre wrapper. La logique de sélection (gouvernorat → popup club)
  est dupliquée entre `ClubsDrawerComponent` et `ClubsPageComponent` (~15
  lignes chacun) plutôt que factorisée — trop peu de code pour justifier une
  abstraction partagée.
- **L'annuaire sous la carte (`/clubs` uniquement, pas le tiroir)** groupe
  `CLUBS` par `region` (triées alphabétiquement, `ClubsPageComponent.buildRegionGroups()`,
  calculé une fois — pas un `computed()` signal, `CLUBS` ne change jamais au
  runtime). Cliquer une carte club appelle **le même** `onRegionSelected()`
  que cliquer le gouvernorat sur la carte, ouvrant le même
  `app-club-popup` (tous les clubs du gouvernorat, pas juste celui cliqué) —
  aucune variante "un seul club" à maintenir en plus, comme demandé. Chaque
  carte est un `<button>` natif (focus/clavier Entrée-Espace gratuits, pas de
  gestion manuelle) ; l'anneau de focus vient de la règle globale
  `:focus-visible` de `_tokens.scss`, rien à ajouter. Survoler une carte
  (`onCardHoverStart`/`onCardHoverEnd`) alimente un signal `hoveredRegion`
  combiné à `selectedRegion` dans le binding `[activeRegion]` passé à
  `app-tunisia-map` (`hoveredRegion() ?? selectedRegion()`) — **aucune**
  modification de `tunisia-map.component.ts` : la mise en évidence
  (`tunisia-map__region--selected`) existait déjà pour l'état "popup
  ouverte", elle réagit simplement à une valeur différente selon d'où elle
  vient.
- **`tn.svg` est retéléchargé si le tiroir a déjà été ouvert puis qu'on
  navigue vers `/clubs`** (ou l'inverse) : chaque instance de
  `app-tunisia-map` fait son propre fetch dans son propre `ngOnInit`, aucun
  cache partagé entre elles. Accepté tel quel plutôt que construit un service
  de cache dédié pour ce cas — le fichier reste raisonnablement petit
  (~450 Ko) et le cache HTTP du navigateur atténue déjà en partie le coût
  d'un second fetch.
- **Un gouvernorat peut porter plusieurs clubs** (Tunis : Taher Hadded, Bab
  Laasal, Tunis Nord, Sidi Hassine, Bardo ; Nabeul : Kélibia, Hammam el
  Ghzez, Korba, Hammamet) : `club-popup` liste tous les clubs du gouvernorat
  cliqué, chacun avec son propre bouton "Join Us".
- **Certaines villes ne sont pas leur propre gouvernorat dans `tn.svg`** —
  ex. Mégrine et Hammam Lif sont administrativement dans le gouvernorat de
  Ben Arous, pas Tunis : `city`/`location` gardent le libellé usuel (affiché,
  peut dire "Tunis" par usage courant) mais `region` porte le vrai
  gouvernorat pour que le marqueur tombe au bon endroit sur la carte — voir
  le commentaire sur `Club.region` dans `clubs-content.ts`.

## Partager un club (Facebook, Instagram)

Chaque club de `club-popup` porte un bouton "Partager" (`app-share-button`,
icône seule, à côté de "Join Us") qui pointe vers son propre lien
`{siteUrl}/inscription?club=<id>` — pas un lien générique.

- **Sur mobile / navigateur compatible Web Share API** (la plupart des
  navigateurs mobiles, et Chrome desktop récent sous Windows) : clic → menu
  de partage natif de l'OS, qui liste déjà Facebook, Instagram, WhatsApp,
  Messenger... Rien à construire côté site pour ça, c'est le système qui
  gère.
- **Sinon** (desktop sans Web Share API) : petit menu avec
  - **Facebook** — vraie boîte de dialogue de partage
    (`facebook.com/sharer/sharer.php?u=...`).
  - **Instagram** — Instagram n'a **aucune** URL de partage web équivalente
    (pas de `instagram.com/sharer`) : impossible de "poster" depuis un
    navigateur sans app. Ce bouton copie donc le lien et affiche "Lien
    copié — collez-le dans votre story ou bio Instagram" plutôt que de
    proposer un bouton qui ne ferait rien de réel une fois cliqué.
  - **Copier le lien** — générique, pour tout le reste (SMS, email, autre
    réseau...).

**"Élégant quand partagé"** = les balises Open Graph/Twitter Card ajoutées
dans `index.html` (image, titre, description). Limite à connaître : ce site
est un build 100 % statique, sans SSR/prerendering (voir `DEPLOYMENT.md`) —
les robots Facebook/WhatsApp/etc. lisent le HTML tel que servi, sans
exécuter le JavaScript Angular. Résultat : l'aperçu est **le même pour
toutes les pages** (image + titre + description génériques du site), pas de
carte dynamique du genre "Rejoignez Club FTCA Beb Laasal" propre à chaque
lien `/inscription?club=...` partagé — ce serait possible avec du
prerendering par route (Angular SSR), mais c'est un changement
d'architecture plus lourd que ce qui a été demandé ici. `og:image` pointe
vers `assets/wallp` (déjà utilisé comme fond du hero, déjà hébergé sur
Cloudinary — voir `assetUrl()`) via une transformation Cloudinary qui force
un JPG 1200×630 recadré, le format/format attendu par la plupart des
lecteurs de cartes de partage.

## Formulaire d'inscription

Les 11 questions (`inscription-page.component.ts` → `form`) reprennent
exactement le formulaire de référence fourni par la Fédération — aucun champ
ajouté ou retiré :

Prénom, Nom, Date de naissance, Lieu de résidence, Adresse e-mail, Numéro de
téléphone, Pourquoi voulez-vous rejoindre le club ?, Avez-vous une expérience
dans le domaine du cinéma ? (Oui/Non), Si oui — parlez-nous brièvement de
cette expérience (conditionnel, visible et obligatoire seulement si la
réponse précédente est "Oui" — vidé et son validateur retiré sinon, voir
`ngOnInit()`), Votre film préféré ? Pourquoi vous l'avez choisi ?, Quelles
sont vos attentes du club ?

"Lieu de résidence" reste **pré-rempli mais modifiable** (pas désactivé comme
l'était l'ancien champ "Ville") quand on arrive via `?club=<id>` : il décrit
le candidat, pas le club — quelqu'un peut légitimement résider ailleurs que
le club qu'il rejoint.

## Brancher Google Sheets

Ce site est 100 % statique (voir `DEPLOYMENT.md`) — pas de serveur à nous
pour recevoir les inscriptions. Le backend choisi est un **Google Apps
Script déployé en "Web App"**, gratuit, hébergé par Google, lié directement
à un classeur Google Sheets : `HttpClient` (Angular) poste le formulaire à
cette URL, le script ajoute une ligne dans l'onglet du club correspondant
(créé automatiquement au premier envoi — un seul classeur, un onglet par
club, pas besoin d'un classeur séparé par club ni de plusieurs
déploiements).

Code déjà écrit et prêt à coller :
`scripts/google-apps-script/inscriptions.gs` (backend) et
`src/app/services/club-registration.service.ts` (appel côté Angular, déjà
branché dans `inscription-page.component.ts`). Il ne reste que la partie
côté compte Google, que je ne peux pas faire à ta place (aucun accès à un
compte Google depuis cet environnement) :

1. **Créer le classeur** : sheets.google.com → classeur vide, le nommer par
   exemple "Inscriptions clubs FTCA".
2. **Ouvrir l'éditeur de script** : dans ce classeur, menu
   **Extensions → Apps Script**. Un projet vide s'ouvre, lié à ce classeur
   (`SpreadsheetApp.getActiveSpreadsheet()` dans le code cible toujours ce
   classeur-là, pas besoin d'indiquer un ID).
3. **Coller le code** : remplacer tout le contenu de `Code.gs` (dans
   l'éditeur Apps Script) par le contenu de
   `scripts/google-apps-script/inscriptions.gs`. **Enregistrer**
   (icône disquette ou Ctrl/Cmd+S).
4. **Déployer** : bouton **Déployer → Nouveau déploiement** → type
   **Application Web**. Réglages :
   - Exécuter en tant que : **Moi** (ton compte)
   - Qui a accès : **Tout le monde** (nécessaire pour que le site public
     puisse poster sans compte Google — c'est le formulaire lui-même qui
     reste sous ton contrôle, pas les données du classeur, qui restent
     privées à ton compte)
   - **Déployer**, puis **Autoriser l'accès** (première fois : Google
     demande de confirmer que le script peut écrire dans le classeur —
     "Paramètres avancés" → "Accéder à [projet] (non sécurisé)" si un
     écran d'avertissement apparaît, normal pour un script personnel non
     publié sur le Marketplace).
   - Copier l'**URL de l'application Web** obtenue à la fin (se termine par
     `/exec`).
5. **Vérifier** : ouvrir cette URL directement dans un navigateur → doit
   afficher `{"status":"ok","message":"FTCA inscriptions — endpoint actif"}`.
   Si ça affiche une erreur Google à la place, le déploiement n'est pas
   allé au bout — refaire l'étape 4.
6. **Configurer le site** : coller cette URL dans `apiUrl` de
   `src/environments/environment.prod.ts` (et `environment.ts` si tu veux
   aussi tester en local avec `npm start`), puis déployer normalement
   (`git push` sur `main`, voir `DEPLOYMENT.md`).

Une fois configuré, chaque inscription crée/complète un onglet nommé
d'après `Club.id` (ex. `tunis-beb-laasal`) dans le classeur, avec une ligne
d'en-têtes ajoutée automatiquement à la création de l'onglet.

**Redéployer après une modification du script** : Apps Script versionne les
déploiements — modifier `Code.gs` dans l'éditeur ne suffit pas, il faut
**Déployer → Gérer les déploiements → ✏️ (modifier)** → **Nouvelle
version** → **Déployer**, sinon le Web App continue de servir l'ancien
code. L'URL reste la même d'une nouvelle version à l'autre (pas besoin de
retoucher `environment.ts`).

**Tant que `apiUrl` reste `null`** (valeur actuelle), `submit()` retombe sur
un envoi simulé (log console + confirmation) — le formulaire reste
utilisable/démontrable sans backend déployé, comme avant cette intégration.
`ClubRegistrationService.isConfigured` porte cette bascule ; `submitState`
gère maintenant un état `'error'` (bandeau + formulaire conservé, pas de
perte de saisie) pour un vrai échec réseau une fois le backend branché.

## Compléter les infos d'un club

Les 20 clubs de `CLUBS` (`clubs-content.ts`) et leurs `location` viennent de
la liste fournie par la Fédération, en deux temps — ce ne sont pas des
villes génériques "un club par gouvernorat" inventées. Sousse/Sfax/Djerba
restent absentes faute de club réel confirmé à ces localités ; les ajouter
dès que la Fédération les confirme, avec les mêmes informations que les
autres (voir "Ajouter une ville/un club" plus bas).

`description` reste une phrase générique dérivée de `location` (pas de texte
de présentation propre à chaque club) et `members` reste absent partout —
**ne pas inventer un nombre de membres précis** ni un descriptif détaillé
pour un club réel : les compléter dans `clubs-content.ts` quand la
Fédération fournit ces informations. `members` est optionnel et n'est
affiché dans `club-popup` que s'il est renseigné.

## Ajouter une ville/un club

1. Ajouter une entrée à `CLUBS` (`data/clubs-content.ts`) avec un `id`
   unique et un `region` correspondant **exactement** à un attribut `name`
   de `tn.svg` (les 24 valeurs sont listées dans `REGION_LABEL_POINTS`,
   `tunisia-map.component.ts` — copier-coller l'orthographe exacte, y
   compris les accents : "Béja", "Kassérine", "Le Kef"...).
2. Rien d'autre à toucher : le marqueur se positionne automatiquement sur le
   point d'étiquette du gouvernorat, et la route `/inscription?club=<id>`
   fonctionne pour tout `id` présent dans `CLUBS`.
3. Ville hors des 24 gouvernorats de `tn.svg` (fréquent — la plupart des
   délégations tunisiennes ne sont pas leurs propres formes dans ce fichier,
   voir Mégrine/Hammam Lif → Ben Arous ci-dessus) : rattacher `region` au
   gouvernorat parent réel, garder `city`/`location` pour l'affichage précis.

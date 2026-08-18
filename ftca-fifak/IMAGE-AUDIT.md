# Audit images — FTCA / FIFAK

Audit complet de toutes les images référencées dans le code, vérifiées une
par une contre le système de fichiers et contre le serveur de dev
(`ng serve`, HTTP réel, pas une supposition).

## Méthodologie

1. `grep -r "<img" src/app/ --include="*.html"` + recherche
   `background-image`/`backgroundImage` en `.scss`/`.ts` + recherche de
   toute référence image dans `src/app/data/*.ts`
2. `ls -la src/assets/` — inventaire complet du dossier
3. Chaque chemin trouvé à l'étape 1 confronté au dossier réel
4. `ng serve` démarré, chaque chemin local testé avec `curl` (statut HTTP
   réel — équivalent scriptable de F12 → Network)
5. `npm run build:prod` puis `find dist/ftca-fifak/browser/assets/` —
   vérifie que tout ce qui est référencé est bien copié dans le build

## Résultat : aucune image locale manquante

Les 53 fichiers du dossier `src/assets/` (images optimisées + variantes
`.webp` + fonts + icônes PWA) sont tous présents dans `dist/` après build,
et chaque chemin local référencé dans le code répond **200** sur le
serveur de dev.

| Composant | Image | Chemin | Statut |
|---|---|---|---|
| `navbar` | Logo | `assets/ftca-logo-mark.webp` | ✅ 200 |
| `footer` | Logo | `assets/ftca-logo-mark.webp` | ✅ 200 |
| `hero` (landing `/`) | Fond hero | `assets/wallp.webp` (fallback `assets/wallp.jpg`) | ✅ 200 |
| `hero` (`/fifak-2026`) | Fond hero | `assets/Fifak-ill.webp` (fallback `assets/Fifak-ill.jpg`) | ✅ 200 |
| `articles-section` | Carte 1 — La Presse | `assets/image-presse.webp` | ✅ 200 |
| `articles-section` | Carte 2 — Fédération | `assets/ftca-logo-mark.webp` (logo réutilisé) | ✅ 200 |
| `articles-section` | Carte 3 — Formation | `assets/fifak-wallp.webp` | ✅ 200 |
| `nashriya-spread` | Entrée 23 Août | `assets/public-kelibia.webp` | ✅ 200 |
| `nashriya-spread` | Entrées 24→29 Août (×6) | `https://picsum.photos/seed/nash-*` | ⚠️ externe (placeholder, voir §Points d'attention) |
| `jury-section` | Jury national (×5) | `https://picsum.photos/seed/jury-nat-*` | ⚠️ externe (placeholder) |
| `jury-section` | Jury international (×4) | `https://picsum.photos/seed/jury-intl-*` | ⚠️ externe (placeholder) |
| `programme-section` | Affiches films (×14) | `https://picsum.photos/seed/film-*` | ⚠️ externe (placeholder) |
| `immersive-break` | Fond (SCSS, codé en dur) | `https://picsum.photos/seed/ftca-storytelling-film/...` | ⚠️ externe (placeholder) |
| `index.html` | Favicon | `favicon.ico` | ✅ 200 |
| `index.html` | Icônes favicon/apple-touch | `assets/icons/icon-{180,192,512}.png` | ✅ 200 |
| `manifest.webmanifest` | Icônes PWA (×8) | `assets/icons/icon-{72…512}x*.png` | ✅ présentes dans `dist/` |

## Problèmes de chemin recherchés (aucun trouvé)

Recherché explicitement dans tout `src/` : chemins relatifs `./assets`,
chemins absolus Windows (`C:\Users…`), `localhost` codé en dur dans une
référence image, chemins `/public/…`, noms de fichiers avec espaces.
**Aucune occurrence.** Tous les chemins d'assets suivent la convention du
projet : relatifs sans slash initial (`assets/...`), résolus correctement
via `<base href="/">` dans `index.html`.

## Points d'attention (pas des bugs — signalés pour action future)

- **Images `picsum.photos`** (jury, programme, nashriya jours 2-7, fond
  immersive-break) : placeholders externes documentés depuis l'origine du
  projet (voir CLAUDE.md §1 et §3) — fonctionnels tant que picsum.photos
  répond, mais **pas des assets FTCA/FIFAK réels**. À remplacer par les
  vraies photos quand elles seront disponibles.
- **`deadline.png`, `fifak.jpg`, `kelibia-port.jpg`** (dans `src/assets/`) :
  non référencés par aucun composant. Optimisés par précaution (session
  précédente) mais alourdissent le repo sans usage actuel — décision à
  prendre : intégrer ou supprimer (déjà signalé dans PERFORMANCE.md).
- **`ftca_logo.JPG`** : source brute conservée intentionnellement pour
  régénérer les dérivés (favicon, icônes PWA, logo) si besoin — voir
  CLAUDE.md §8. Pas un bug qu'il ne soit "utilisé" par aucun composant.

## Si des images manquent encore sur https://ftca-fifak.tn (production)

Cet audit porte sur le **code et l'environnement de développement local**,
tous deux vérifiés sains. Si le site en ligne montre encore des images
cassées, la cause n'est pas dans ce repo mais dans l'état du déploiement :
voir **PERFORMANCE.md §1** et **DEPLOYMENT.md** — au moment de la session
précédente, le contenu alors en ligne ne correspondait pas au build produit
ici (dossier `assets/` et `.htaccess` absents du serveur). Un
redéploiement complet du contenu de `dist/ftca-fifak/browser/` est le
correctif, pas une modification de code supplémentaire.

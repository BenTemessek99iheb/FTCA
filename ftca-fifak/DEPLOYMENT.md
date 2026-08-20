# Déploiement — FTCA / FIFAK sur cPanel

Ce document explique comment le site (Angular, statique, aucun backend requis)
est déployé sur l'hébergement cPanel de **https://ftca-fifak.tn**, en
automatique via GitHub Actions ou manuellement.

## 1. Architecture du déploiement

- `git push` sur `main` → GitHub Actions (`.github/workflows/deploy.yml`) :
  1. `npm ci`
  2. `npm run build:prod` (= `ng build --configuration production`)
  3. Upload du contenu de `dist/ftca-fifak/browser/` vers le serveur cPanel
     via FTP/FTPS, dans `public_html/` (ou le dossier configuré).
- Le fichier `.htaccess` (à la racine du projet) est copié automatiquement
  dans `dist/ftca-fifak/browser/` à chaque build (voir `angular.json` →
  `architect.build.options.assets`), donc il est toujours déployé avec le reste.
- Un second workflow, `.github/workflows/deploy-pages.yml`, publie aussi le
  site sur GitHub Pages (`/FTCA/`) — il est indépendant de ce déploiement
  cPanel et n'a pas besoin d'être touché.

## 2. Configurer les secrets GitHub (à faire une seule fois)

Dans le repo GitHub → **Settings → Secrets and variables → Actions → New
repository secret**, ajouter :

| Secret | Valeur | Obligatoire |
|---|---|---|
| `FTP_SERVER` | Hôte FTP fourni par l'hébergeur cPanel (ex: `ftp.ftca-fifak.tn` ou une IP) | Oui |
| `FTP_USERNAME` | Identifiant du compte FTP cPanel | Oui |
| `FTP_PASSWORD` | Mot de passe du compte FTP cPanel | Oui |
| `FTP_SERVER_DIR` | Dossier distant cible | Non — défaut `/public_html/` |

Ces informations FTP se trouvent dans cPanel → **FTP Accounts** (créer un
compte FTP dédié au déploiement plutôt que d'utiliser le compte cPanel
principal est recommandé).

> ⚠️ **Mise à jour 2026-08-20 — théorie "addon domain" ci-dessous invalidée.**
> Confirmé via cPanel → Domains : `ftca-fifak.tn` est bien le **domaine
> principal** du compte, avec Document Root = `/public_html` directement (pas
> un addon domain). Ce n'était donc **pas** la cause d'un épisode où tous les
> runs `Deploy to cPanel (FTP)` étaient marqués "success" alors que le site en
> ligne ne reflétait aucun commit récent (voir §5 "Le déploiement a réussi
> mais public_html/ ne correspond pas au build" pour la vraie cause trouvée).
> Le paragraphe suivant (règle générale domaine principal vs addon domain)
> reste correct et utile si le projet change un jour d'hébergement/domaine —
> il n'a simplement pas été le problème ici.
>
> Si `ftca-fifak.tn` est le **domaine principal** du compte cPanel,
> `public_html/` est la bonne cible. Si c'est un **addon domain**, le dossier
> réel est généralement `public_html/ftca-fifak.tn/` — à vérifier dans
> cPanel → **Domains**, et à renseigner dans `FTP_SERVER_DIR` si différent.

Une fois les secrets ajoutés, tout push sur `main` déclenche automatiquement
le build + déploiement. Le suivi se fait dans l'onglet **Actions** du repo.

## 3. Tester en local avant de push

```bash
cd ftca-fifak
npm ci
npm run build:prod          # build de production dans dist/ftca-fifak/browser/

# Servir le build de production localement pour vérifier avant déploiement :
npx http-server dist/ftca-fifak/browser -p 8080
# puis ouvrir http://localhost:8080 et tester la navigation, y compris
# un rafraîchissement (F5) sur une route interne comme /fifak-2026
```

Alternative sans build séparé : `npm run serve:prod` (dev-server Angular
avec la configuration de production, moins fidèle qu'un vrai `dist/` servi
statiquement mais plus rapide pour itérer).

## 4. Déploiement manuel (sans GitHub Actions)

Deux options :

**A. Script `deploy-manual.sh`** (nécessite [lftp](https://lftp.yar.ru/)) :

```bash
cd ftca-fifak
cp .env.example .env    # puis renseigner FTP_SERVER / FTP_USERNAME / FTP_PASSWORD
./deploy-manual.sh
```

Le script build en production, vérifie la présence de `index.html` et
`.htaccess`, demande confirmation (la synchronisation supprime côté serveur
les fichiers absents du build local), puis envoie tout via FTPS.

**B. Upload manuel via FileZilla / gestionnaire de fichiers cPanel** :

1. `npm run build:prod`
2. Uploader **tout le contenu** de `dist/ftca-fifak/browser/` (y compris le
   fichier caché `.htaccess` — activer "afficher les fichiers cachés" dans
   le client FTP) dans `public_html/`.

## 5. Dépannage

**Le déploiement a réussi mais `public_html/` ne correspond pas au build**
(observé 2026-08-20 : tous les runs `Deploy to cPanel (FTP)` marqués
"success" dans l'onglet Actions, mais `https://ftca-fifak.tn` continuait à
servir un build antérieur à toute la migration Cloudinary — pas de
`<link rel="manifest">`, Google Fonts CDN encore chargé, aucun dossier
`assets/`). Confirmé via cPanel → File Manager : fichiers datés d'un
déploiement bien plus ancien, et un fichier nommé `htaccess` **sans le
point initial** présent à la racine de `public_html/` (voir point suivant).
Domaine confirmé principal (Document Root `/public_html` direct, pas
d'addon domain — voir §2). Cause la plus probable : le compte FTP dédié
utilisé par le secret `FTP_USERNAME` a un **home directory déjà scopé sur
`public_html/`** côté cPanel — dans ce cas, `server-dir: /public_html/` (la
valeur par défaut du workflow) fait atterrir l'upload dans
`public_html/public_html/`, un dossier jamais servi publiquement, pendant
que FTP-Deploy-Action rapporte quand même un statut "success" (l'upload a
bien réussi — juste pas au bon endroit). Correctif appliqué dans
`deploy.yml` : `server-dir` par défaut changé de `/public_html/` à `/`
(ancienne valeur gardée en commentaire pour rollback). Si `/` ne résout pas
le problème : vérifier le home directory exact du compte dans cPanel →
**FTP Accounts**, et ajuster `server-dir` (ou le secret `FTP_SERVER_DIR`
s'il est défini — il a priorité sur la valeur par défaut du workflow) en
conséquence.

**Fichier `htaccess` sans le point trouvé en prod** — repéré dans le même
épisode : un fichier `htaccess` (au lieu de `.htaccess`) traînait à la
racine de `public_html/`, probablement un reliquat d'un upload manuel très
ancien (avant l'automatisation FTP) où le point initial a été perdu (client
FTP/interface qui masque les fichiers cachés par défaut, renommage
accidentel...). Sans le point, Apache ignore complètement ce fichier : ni
fallback SPA (`RewriteRule ^ index.html`), ni forçage HTTPS, ni règles de
cache/gzip ne s'appliquent. Le vrai `.htaccess` (avec le point) est bien
généré par le build (`angular.json` → `architect.build.options.assets`,
glob `.htaccess` depuis la racine du repo — vérifié 2026-08-20) et sera
déployé correctement une fois `server-dir` corrigé ; l'ancien fichier
`htaccess` orphelin sur le serveur peut être supprimé manuellement via
File Manager (ne sera pas nettoyé automatiquement par le déploiement FTP
tant qu'il n'entre pas en conflit de nom avec `.htaccess`).

**Rafraîchir une route (ex: `/fifak-2026`) donne une 404 Apache** →
`.htaccess` n'a pas été uploadé (fichier caché souvent oublié), ou
`mod_rewrite` n'est pas activé sur l'hébergement (contacter le support
cPanel/hébergeur).

**Le déploiement FTP échoue en CI (`FTP-Deploy-Action`)** → certains hôtes
cPanel n'acceptent pas FTPS explicite. Dans `.github/workflows/deploy.yml`,
passer `protocol: ftps` à `protocol: ftp` (connexion non chiffrée — à
éviter si évitable, mais parfois nécessaire selon l'hébergeur).

**Site accessible en `http://` non redirigé vers `https://`** → vérifier
qu'un certificat SSL est actif dans cPanel (AutoSSL / Let's Encrypt) avant
de compter sur la redirection forcée du `.htaccess` — sans certificat valide,
forcer HTTPS casse l'accès au site.

**CSS/JS non mis à jour après déploiement (ancienne version visible)** →
normalement impossible grâce à `outputHashing: all` (noms de fichiers
hashés à chaque build) + règles de cache `.htaccess` qui interdisent la
mise en cache de `index.html`. Si ça arrive quand même, vider le cache du
navigateur et vérifier qu'un cache serveur/CDN externe (Cloudflare etc.)
n'est pas en jeu.

**`baseHref` / assets cassés (chemins qui pointent vers `/FTCA/...`)** →
la configuration `production` d'`angular.json` est alignée sur un
déploiement à la racine du domaine (`baseHref: "/"`). Ne pas la modifier
pour ce déploiement cPanel — c'est le workflow `deploy-pages.yml` (GitHub
Pages, servi sous `/FTCA/`) qui surcharge le base-href via
`--base-href /FTCA/` au moment du build, spécifiquement pour ce cas-là.

**Le déploiement a réussi mais le site affiche encore l'ancienne version**
→ le site utilise maintenant un Service Worker (`@angular/service-worker`,
voir PERFORMANCE.md §7). Un navigateur ayant déjà visité le site peut
continuer à servir la version mise en cache pendant un moment après un
déploiement : le SW détecte la mise à jour en tâche de fond et ne
l'active qu'au **prochain rechargement complet** (parfois le second). Pour
vérifier immédiatement après un déploiement : ouvrir les DevTools →
Application → Service Workers, ou recharger en navigation privée.

**Erreurs de permissions (403 Forbidden, ou upload FTP qui échoue sur
certains fichiers)** → sur cPanel, les fichiers uploadés doivent
généralement être en `644` et les dossiers en `755`. La plupart des clients
FTP (dont `FTP-Deploy-Action` et `lftp`) préservent des permissions
correctes par défaut ; si un `403` apparaît après déploiement, vérifier
dans cPanel → **File Manager** → clic droit sur le fichier/dossier →
**Permissions**, et corriger à `644`/`755` si besoin. Un `550 Permission
denied` pendant l'étape FTP en CI indique en général un compte FTP sans
droit d'écriture sur `FTP_SERVER_DIR` — vérifier les permissions du compte
FTP lui-même dans cPanel → **FTP Accounts**.

## 6. Scripts npm et outillage

- `npm run build:prod` — build de production (`ng build --configuration
  production`)
- `npm run serve:prod` — dev-server avec la configuration de production
- `npm test` — tests unitaires (Karma/Jasmine)
- Pas de script `lint` : ESLint n'est pas configuré sur ce projet (aucune
  dépendance `@angular-eslint/*`, aucun fichier de config). Ajouter un
  `"lint": "ng lint"` sans linter installé échouerait immédiatement — à
  faire volontairement via `ng add @angular-eslint/schematics` si le linting
  devient un besoin, plutôt que comme effet de bord de cette préparation
  au déploiement.

## 7. Notes techniques

- Site 100 % statique : aucun runtime Node.js n'est requis côté serveur,
  compatible avec un hébergement cPanel mutualisé basique.
- `tsconfig.prod.json` n'est pas nécessaire : le builder Angular 17
  (`@angular-devkit/build-angular:application`, basé sur esbuild) applique
  AOT, tree-shaking et minification automatiquement pour la configuration
  `production` définie dans `angular.json` — un `tsconfig.prod.json` séparé
  serait redondant avec les builders Angular modernes (utile seulement
  avec l'ancien `browser` builder / webpack).
- Service Worker (PWA) : non activé pour l'instant. Si souhaité plus tard,
  `ng add @angular/pwa` reste l'ajout recommandé (génère un
  `ngsw-config.json` et enregistre le service worker) — non fait ici pour
  rester dans le périmètre "préparation du déploiement" sans changer le
  comportement runtime de l'app sans validation dédiée.

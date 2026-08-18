# Checklist de mise en production — FTCA / FIFAK

Étapes à suivre, dans l'ordre, pour passer du repo actuel à un site en ligne
sur `https://ftca-fifak.tn`. Détails et commandes exactes dans `DEPLOYMENT.md`.

## Côté hébergement cPanel

- [ ] Domaine `ftca-fifak.tn` configuré et pointant vers l'hébergement (DNS)
- [ ] Certificat SSL actif (AutoSSL / Let's Encrypt) — requis, `.htaccess`
      force HTTPS
- [ ] Confirmer le dossier web réel du domaine (`public_html/` si domaine
      principal, `public_html/ftca-fifak.tn/` si addon domain)
- [ ] Créer un compte FTP dédié au déploiement (cPanel → FTP Accounts)
- [ ] Vérifier que `mod_rewrite`, `mod_deflate`, `mod_expires`, `mod_headers`
      sont actifs sur l'hébergement (généralement le cas par défaut chez la
      plupart des hébergeurs cPanel)

## Côté GitHub

- [ ] Ajouter les secrets dans **Settings → Secrets and variables →
      Actions** : `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (et
      `FTP_SERVER_DIR` si différent de `/public_html/`)
- [ ] Vérifier que `.github/workflows/deploy.yml` est bien présent sur `main`

## Avant le premier déploiement

- [ ] `cd ftca-fifak && npm ci && npm run build:prod` en local — build sans
      erreur
- [ ] Vérifier que `dist/ftca-fifak/browser/.htaccess` existe après le build
- [ ] Servir `dist/ftca-fifak/browser/` en local (`npx http-server ...`) et
      tester la navigation + un rafraîchissement sur une route interne
      (`/fifak-2026`)

## Premier déploiement

- [ ] Déploiement manuel de test (`./deploy-manual.sh` ou upload FileZilla)
      OU déclenchement manuel du workflow (`Actions` → `Deploy to cPanel
      (FTP)` → `Run workflow`)
- [ ] Vérifier sur le serveur (FTP, "afficher les fichiers cachés" activé)
      que `.htaccess` est bien présent à la racine du dossier web

## Vérifications post-déploiement sur https://ftca-fifak.tn

- [ ] Le site charge correctement à la racine `/`
- [ ] **Toutes les images s'affichent** (hero, cartes articles, logo
      navbar/footer) — c'était le bug initial (voir PERFORMANCE.md §1) :
      vérifier `/assets/wallp.webp` et `/assets/ftca-logo-mark.webp`
      répondent 200, pas 404
- [ ] `https://www.ftca-fifak.tn` redirige vers `https://ftca-fifak.tn`
- [ ] `http://ftca-fifak.tn` redirige vers `https://ftca-fifak.tn`
- [ ] Navigation interne (`/fifak-2026`) fonctionne, y compris après un
      rafraîchissement navigateur (F5) — pas de 404 Apache
- [ ] Ancres de section (ex: liens du menu vers `#fifak`) scrollent
      correctement
- [ ] Onglet Réseau du navigateur : les fichiers `.js`/`.css` ont bien un
      header `Cache-Control` longue durée, `index.html` n'est pas mis en
      cache
- [ ] Favicon et icônes s'affichent correctement
- [ ] DevTools → Application → Service Workers : un SW est bien enregistré
      et actif (`ngsw-worker.js`) ; Manifest affiche le bon nom/icônes FTCA
      (pas le logo Angular générique)
- [ ] `npx lighthouse https://ftca-fifak.tn/ --view` : re-mesurer en
      conditions réelles (voir PERFORMANCE.md §9 pour les limites du test
      local effectué pendant le développement)

## Mise en place du flux continu

- [ ] Confirmer qu'un push sur `main` déclenche bien le workflow (onglet
      **Actions**) et se termine en vert
- [ ] Ouvrir le run et vérifier chaque étape : `npm ci`, build, "Vérification
      du build" (0 erreur), étape FTP (pas de `550`/timeout)
- [ ] Confirmer que le site est à jour après ce déploiement automatique

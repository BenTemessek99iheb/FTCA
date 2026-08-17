#!/usr/bin/env bash
# Déploiement manuel FTCA/FIFAK vers cPanel (sans passer par GitHub Actions).
# Build Angular en production puis synchronise dist/ftca-fifak/browser/ via FTP.
#
# Prérequis :
#   - lftp installé localement (macOS: brew install lftp / Debian-Ubuntu: apt install lftp)
#   - un fichier .env à la racine de ftca-fifak/ (copier .env.example et le remplir)
#
# Usage : ./deploy-manual.sh   (depuis ftca-fifak/, ou n'importe où : le script se repositionne)

set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "❌ Fichier .env introuvable. Copiez .env.example en .env et renseignez vos identifiants FTP."
  exit 1
fi

set -a
source .env
set +a

: "${FTP_SERVER:?FTP_SERVER manquant dans .env}"
: "${FTP_USERNAME:?FTP_USERNAME manquant dans .env}"
: "${FTP_PASSWORD:?FTP_PASSWORD manquant dans .env}"
FTP_SERVER_DIR="${FTP_SERVER_DIR:-/public_html/}"

echo "📦 Installation des dépendances..."
npm ci

echo "🏗️  Build Angular (production)..."
npm run build:prod

BUILD_DIR="dist/ftca-fifak/browser"
if [ ! -f "$BUILD_DIR/index.html" ]; then
  echo "❌ Build échoué : index.html introuvable dans $BUILD_DIR"
  exit 1
fi
if [ ! -f "$BUILD_DIR/.htaccess" ]; then
  echo "⚠️  .htaccess absent du build — vérifiez angular.json (assets)."
fi

if ! command -v lftp >/dev/null 2>&1; then
  echo "❌ lftp n'est pas installé. Installez-le, ou uploadez $BUILD_DIR manuellement via FileZilla / le gestionnaire de fichiers cPanel."
  exit 1
fi

echo ""
echo "⚠️  ATTENTION : la synchronisation va SUPPRIMER sur le serveur, dans"
echo "   '$FTP_SERVER_DIR' (hôte: $FTP_SERVER), tout fichier absent de $BUILD_DIR."
echo "   Vérifiez que FTP_SERVER_DIR pointe bien sur le bon dossier avant de continuer."
read -r -p "Continuer le déploiement ? [y/N] " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Déploiement annulé."
  exit 1
fi

echo "🚀 Envoi de $BUILD_DIR vers $FTP_SERVER_DIR sur $FTP_SERVER..."
lftp -u "$FTP_USERNAME","$FTP_PASSWORD" "$FTP_SERVER" <<EOF
set ftp:ssl-force true
set ssl:verify-certificate no
mirror -R --delete --verbose "$BUILD_DIR" "$FTP_SERVER_DIR"
bye
EOF

echo "✅ Déploiement terminé : https://ftca-fifak.tn"

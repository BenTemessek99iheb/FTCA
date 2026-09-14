// Environnement de développement (utilisé par `ng serve` / `ng build` sans --configuration production)
export const environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
  // Pas de backend/CMS pour la majorité du site (contenu statique via
  // ContentService). Utilisé aujourd'hui par ClubRegistrationService (voir
  // src/app/services/club-registration.service.ts) pour le formulaire
  // /inscription : URL du Web App Google Apps Script une fois déployé
  // (scripts/google-apps-script/inscriptions.gs) — voir CLUBS.md §
  // "Brancher Google Sheets". Tant que c'est null, le formulaire retombe sur
  // un envoi simulé plutôt que d'échouer.
  apiUrl:
    'https://script.google.com/macros/s/AKfycbw8nr2SHuUHOZcL08lMopRnqWCmlPjK0BTP1EG7fIS81j3D4pF2guXPB6fQAPP7Hf46/exec' as string,
  // Pointe vers Cloudinary même en dev (comme la prod) : assetUrl() retire
  // systématiquement l'extension pour laisser f_auto choisir le format à la
  // livraison, ce qu'un serveur de fichiers statiques (ng serve, Apache) ne
  // sait pas résoudre sans elle — /assets local casserait silencieusement.
  assetsBaseUrl:
    'https://res.cloudinary.com/ykjb5rh5/image/upload/f_auto,q_auto/assets',
};

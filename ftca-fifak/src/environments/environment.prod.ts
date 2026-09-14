// Environnement de production — substitué à environment.ts via fileReplacements (angular.json)
export const environment = {
  production: true,
  siteUrl: 'https://ftca-fifak.tn',
  // Pas de backend/CMS pour la majorité du site (contenu statique via
  // ContentService). Utilisé aujourd'hui par ClubRegistrationService (voir
  // src/app/services/club-registration.service.ts) pour le formulaire
  // /inscription : URL du Web App Google Apps Script une fois déployé
  // (scripts/google-apps-script/inscriptions.gs) — voir CLUBS.md §
  // "Brancher Google Sheets". Tant que c'est null, le formulaire retombe sur
  // un envoi simulé plutôt que d'échouer.
  apiUrl:
    'https://script.google.com/macros/s/AKfycbw8nr2SHuUHOZcL08lMopRnqWCmlPjK0BTP1EG7fIS81j3D4pF2guXPB6fQAPP7Hf46/exec' as
      | string
      | null,
  // f_auto/q_auto : Cloudinary choisit le format (webp/avif) et la qualité
  // à la volée — plus besoin de <picture>/fallback .webp générés localement.
  assetsBaseUrl:
    'https://res.cloudinary.com/ykjb5rh5/image/upload/f_auto,q_auto/assets',
};

// Environnement de production — substitué à environment.ts via fileReplacements (angular.json)
export const environment = {
  production: true,
  siteUrl: 'https://ftca-fifak.tn',
  // Pas de backend/CMS pour l'instant (contenu statique via ContentService) —
  // point d'extension prévu pour un futur remplacement par une API réelle.
  apiUrl: null as string | null,
  // f_auto/q_auto : Cloudinary choisit le format (webp/avif) et la qualité
  // à la volée — plus besoin de <picture>/fallback .webp générés localement.
  assetsBaseUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/f_auto,q_auto/assets',
};

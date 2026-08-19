// Environnement de développement (utilisé par `ng serve` / `ng build` sans --configuration production)
export const environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
  // Pas de backend/CMS pour l'instant (contenu statique via ContentService) —
  // point d'extension prévu pour un futur remplacement par une API réelle.
  apiUrl: null as string | null,
  // Pointe vers Cloudinary même en dev (comme la prod) : assetUrl() retire
  // systématiquement l'extension pour laisser f_auto choisir le format à la
  // livraison, ce qu'un serveur de fichiers statiques (ng serve, Apache) ne
  // sait pas résoudre sans elle — /assets local casserait silencieusement.
  assetsBaseUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/f_auto,q_auto/assets',
};

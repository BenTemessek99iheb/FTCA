// Environnement de développement (utilisé par `ng serve` / `ng build` sans --configuration production)
export const environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
  // Pas de backend/CMS pour l'instant (contenu statique via ContentService) —
  // point d'extension prévu pour un futur remplacement par une API réelle.
  apiUrl: null as string | null,
};

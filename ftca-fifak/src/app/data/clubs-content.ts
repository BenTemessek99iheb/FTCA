/**
 * CLUBS FTCA — data
 * Clubs régionaux affichés sur la carte de Tunisie (app-clubs-drawer).
 *
 * Noms et localités repris quand ils existent déjà ailleurs dans le projet
 * (voir `sousCategorie`/`Prod` dans PROGRAMME_FILMS — ex. "FTCA Beb Laasal",
 * "Club FTCA Tahar Haddad", "Club FTCA Kélibia") pour ne pas retaper une
 * variante différente du même club réel. `description`, `location` et
 * `members` ne sont pas des données confirmées pour les clubs sans film déjà
 * associé dans PROGRAMME_FILMS : laissés volontairement génériques/absents
 * plutôt qu'inventés — à compléter avec les vraies informations de chaque
 * club (voir §"Compléter les infos d'un club" dans CLUBS.md).
 */

export interface Club {
  id: string;
  name: string;
  /** Libellé affiché (ville/quartier) — peut différer du gouvernorat administratif, voir `region` */
  city: string;
  /**
   * Doit correspondre exactement à un attribut `name` de assets/tn.svg (un
   * gouvernorat — ex. "Tunis", "Sfax", "Médenine"). tunisia-map.component.ts
   * positionne le marqueur du club sur le point d'étiquette réel de ce
   * gouvernorat dans le SVG, jamais une coordonnée saisie à la main ici.
   * Djerba n'est pas un gouvernorat propre dans ce SVG (c'est une délégation
   * de Médenine) : `region: 'Médenine'` pour ce club, `city: 'Djerba'` pour
   * l'affichage.
   */
  region: string;
  location: string;
  description: string;
  /** Optionnel — n'afficher que si une valeur réelle est connue, ne pas inventer un chiffre */
  members?: number;
  /** Forme d'URL attendue par le backend d'inscription (non implémenté, voir CLUBS.md) */
  formEndpoint: string;
}

export const CLUBS: Club[] = [
  {
    id: 'tunis-beb-laasal',
    name: 'Club FTCA Beb Laasal',
    city: 'Tunis',
    region: 'Tunis',
    location: 'Bab El Assal, Tunis',
    description: 'Club de cinéastes amateurs de la Médina de Tunis.',
    formEndpoint: '/api/inscription/tunis-beb-laasal',
  },
  {
    id: 'tunis-tahar-haddad',
    name: 'Club FTCA Tahar Haddad',
    city: 'Tunis',
    region: 'Tunis',
    location: 'Avenue Tahar Haddad, Tunis',
    description: 'Club de cinéastes amateurs de la Fédération, à Tunis.',
    formEndpoint: '/api/inscription/tunis-tahar-haddad',
  },
  {
    id: 'tunis-nord',
    name: 'Club FTCA Tunis Nord',
    city: 'Tunis Nord',
    region: 'Tunis',
    location: 'Tunis Nord',
    description: 'Club de cinéastes amateurs de la Fédération, à Tunis Nord.',
    formEndpoint: '/api/inscription/tunis-nord',
  },
  {
    id: 'zaghouan',
    name: 'Club FTCA Zaghouan',
    city: 'Zaghouan',
    region: 'Zaghouan',
    location: 'Zaghouan',
    description: 'Club de cinéastes amateurs de la Fédération, à Zaghouan.',
    formEndpoint: '/api/inscription/zaghouan',
  },
  {
    id: 'sousse',
    name: 'Club FTCA Sousse',
    city: 'Sousse',
    region: 'Sousse',
    location: 'Sousse',
    description: 'Club de cinéastes amateurs de la Fédération, à Sousse.',
    formEndpoint: '/api/inscription/sousse',
  },
  {
    id: 'monastir',
    name: 'Club FTCA Monastir',
    city: 'Monastir',
    region: 'Monastir',
    location: 'Monastir',
    description: 'Club de cinéastes amateurs de la Fédération, à Monastir.',
    formEndpoint: '/api/inscription/monastir',
  },
  {
    id: 'sfax',
    name: 'Club FTCA Sfax',
    city: 'Sfax',
    region: 'Sfax',
    location: 'Sfax',
    description: 'Club de cinéastes amateurs de la Fédération, à Sfax.',
    formEndpoint: '/api/inscription/sfax',
  },
  {
    id: 'gafsa',
    name: 'Club FTCA Gafsa',
    city: 'Gafsa',
    region: 'Gafsa',
    location: 'Gafsa',
    description: 'Club de cinéastes amateurs de la Fédération, à Gafsa.',
    formEndpoint: '/api/inscription/gafsa',
  },
  {
    id: 'djerba',
    name: 'Club FTCA Djerba',
    city: 'Djerba',
    region: 'Médenine',
    location: 'Djerba',
    description: 'Club de cinéastes amateurs de la Fédération, à Djerba.',
    formEndpoint: '/api/inscription/djerba',
  },
  {
    id: 'tataouine',
    name: 'Club FTCA Tataouine',
    city: 'Tataouine',
    region: 'Tataouine',
    location: 'Tataouine',
    description: 'Club de cinéastes amateurs de la Fédération, à Tataouine.',
    formEndpoint: '/api/inscription/tataouine',
  },
];

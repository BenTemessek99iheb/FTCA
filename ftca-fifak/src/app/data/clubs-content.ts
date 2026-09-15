/**
 * CLUBS FTCA — data
 * Clubs régionaux affichés sur la carte de Tunisie (app-clubs-drawer,
 * app-clubs-page — carte ET annuaire, voir clubs-page.component.ts).
 * Liste fournie directement par la Fédération, en plusieurs temps
 * (20 clubs au total) — Sousse/Sfax/Djerba restent absents faute de club
 * FTCA réel confirmé à ces localités ; les ajouter dès que la Fédération
 * les confirme, en suivant le même patron que les autres entrées.
 */

export interface Club {
  id: string;
  name: string;
  /** Libellé affiché (ville/quartier) — peut différer du gouvernorat administratif, voir `region` */
  city: string;
  /**
   * Doit correspondre exactement à un attribut `name` de assets/tn.svg (un
   * gouvernorat — ex. "Tunis", "Nabeul", "Ben Arous"). tunisia-map.component.ts
   * positionne le marqueur du club sur le point d'étiquette réel de ce
   * gouvernorat dans le SVG, jamais une coordonnée saisie à la main ici.
   * Mégrine et Hammam Lif sont administrativement dans le gouvernorat de Ben
   * Arous (pas Tunis, malgré l'usage courant qui les associe au "Grand
   * Tunis") : `region: 'Ben Arous'` pour que le marqueur tombe au bon
   * endroit, `city`/`location` gardent le libellé fourni pour l'affichage.
   */
  region: string;
  location: string;
  description: string;
  /** Optionnel — n'afficher que si une valeur réelle est connue, ne pas inventer un chiffre */
  members?: number;
  /** Forme d'URL attendue par le backend d'inscription, voir CLUBS.md */
  formEndpoint: string;
}

export const CLUBS: Club[] = [
  {
    id: 'taher-hadded',
    name: 'Club FTCA Taher Hadded',
    city: 'Tunis',
    region: 'Tunis',
    location: 'Centre Culturel Dar Lasrem, Tunis',
    description: 'Club de cinéastes amateurs de la Fédération, au Centre Culturel Dar Lasrem (Tunis).',
    formEndpoint: '/api/inscription/taher-hadded',
  },
  {
    id: 'bab-laasal',
    name: 'Club FTCA Bab Laasal',
    city: 'Bab Laasal',
    region: 'Tunis',
    location: 'Bab Laasal, Tunis',
    description: 'Club de cinéastes amateurs de la Fédération, à Bab Laasal (Tunis).',
    formEndpoint: '/api/inscription/bab-laasal',
  },
  {
    id: 'tunis-nord',
    name: 'Club FTCA Tunis Nord',
    city: 'Tunis Nord',
    region: 'Tunis',
    location: 'La Marsa, Tunis',
    description: 'Club de cinéastes amateurs de la Fédération, à La Marsa (Tunis Nord).',
    formEndpoint: '/api/inscription/tunis-nord',
  },
  {
    id: 'sidi-hassine',
    name: 'Club FTCA Sidi Hassine',
    city: 'Sidi Hassine',
    region: 'Tunis',
    location: 'Sidi Hassine, Tunis',
    description: 'Club de cinéastes amateurs de la Fédération, à Sidi Hassine (Tunis).',
    formEndpoint: '/api/inscription/sidi-hassine',
  },
  {
    id: 'bardo',
    name: 'Club FTCA Bardo',
    city: 'Bardo',
    region: 'Tunis',
    location: 'Le Bardo, Tunis',
    description: 'Club de cinéastes amateurs de la Fédération, au Bardo (Tunis).',
    formEndpoint: '/api/inscription/bardo',
  },
  {
    id: 'megrine',
    name: 'Club FTCA Mégrine',
    city: 'Mégrine',
    region: 'Ben Arous',
    location: 'Mégrine, Tunis',
    description: 'Club de cinéastes amateurs de la Fédération, à Mégrine.',
    formEndpoint: '/api/inscription/megrine',
  },
  {
    id: 'hammam-lif',
    name: 'Club FTCA Hammam Lif',
    city: 'Hammam Lif',
    region: 'Ben Arous',
    location: 'Hammam Lif, Tunis',
    description: 'Club de cinéastes amateurs de la Fédération, à Hammam Lif.',
    formEndpoint: '/api/inscription/hammam-lif',
  },
  {
    id: 'menzel-bourguiba',
    name: 'Club FTCA Menzel Bourguiba',
    city: 'Menzel Bourguiba',
    region: 'Bizerte',
    location: 'Menzel Bourguiba, Bizerte',
    description: 'Club de cinéastes amateurs de la Fédération, à Menzel Bourguiba.',
    formEndpoint: '/api/inscription/menzel-bourguiba',
  },
  {
    id: 'kelibia',
    name: 'Club FTCA Kélibia',
    city: 'Kélibia',
    region: 'Nabeul',
    location: 'Kélibia',
    description: 'Club de cinéastes amateurs de la Fédération, à Kélibia.',
    formEndpoint: '/api/inscription/kelibia',
  },
  {
    id: 'hammam-el-ghzez',
    name: 'Club FTCA Hammam el Ghzez',
    city: 'Hammam el Ghzez',
    region: 'Nabeul',
    location: 'Hammam el Ghzez, Kélibia',
    description: 'Club de cinéastes amateurs de la Fédération, à Hammam el Ghzez (Kélibia).',
    formEndpoint: '/api/inscription/hammam-el-ghzez',
  },
  {
    id: 'korba',
    name: 'Club FTCA Korba',
    city: 'Korba',
    region: 'Nabeul',
    location: 'Korba, Nabeul',
    description: 'Club de cinéastes amateurs de la Fédération, à Korba.',
    formEndpoint: '/api/inscription/korba',
  },
  {
    id: 'hammamet',
    name: 'Club FTCA Hammamet',
    city: 'Hammamet',
    region: 'Nabeul',
    location: 'Hammamet, Nabeul',
    description: 'Club de cinéastes amateurs de la Fédération, à Hammamet.',
    formEndpoint: '/api/inscription/hammamet',
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
    id: 'ahmed-foued-najm',
    name: 'Club FTCA Ahmed Foued Najm',
    city: 'Monastir',
    region: 'Monastir',
    location: 'Monastir',
    description: 'Club de cinéastes amateurs de la Fédération, à Monastir.',
    formEndpoint: '/api/inscription/ahmed-foued-najm',
  },
  {
    id: 'chebba',
    name: 'Club FTCA Chebba',
    city: 'Chebba',
    region: 'Mahdia',
    location: 'Chebba, Mahdia',
    description: 'Club de cinéastes amateurs de la Fédération, à Chebba.',
    formEndpoint: '/api/inscription/chebba',
  },
  {
    id: 'el-hamma',
    name: 'Club FTCA El Hamma',
    city: 'El Hamma',
    region: 'Gabès',
    location: 'El Hamma, Gabès',
    description: 'Club de cinéastes amateurs de la Fédération, à El Hamma (Gabès).',
    formEndpoint: '/api/inscription/el-hamma',
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
    id: 'tataouine',
    name: 'Club FTCA Tataouine',
    city: 'Tataouine',
    region: 'Tataouine',
    location: 'Tataouine',
    description: 'Club de cinéastes amateurs de la Fédération, à Tataouine.',
    formEndpoint: '/api/inscription/tataouine',
  },
  {
    id: 'el-kef',
    name: 'Club FTCA El Kef',
    city: 'El Kef',
    region: 'Le Kef',
    location: 'El Kef',
    description: 'Club de cinéastes amateurs de la Fédération, à El Kef.',
    formEndpoint: '/api/inscription/el-kef',
  },
  {
    id: 'medenine',
    name: 'Club FTCA Médenine',
    city: 'Médenine',
    region: 'Médenine',
    location: 'Médenine',
    description: 'Club de cinéastes amateurs de la Fédération, à Médenine.',
    formEndpoint: '/api/inscription/medenine',
  },
];

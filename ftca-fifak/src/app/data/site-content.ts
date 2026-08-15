/**
 * SITE CONTENT
 * Typed data structures for all sections
 * Extracted from prototype HTML, ready for API integration
 */

/* ============================================================
   FTCA SECTION — Timeline
   ============================================================ */

export interface TimelineItem {
  year: string;
  description: string;
}

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: '1960',
    description:
      'Naissance du mouvement amateur à Kélibia, porté par des passionnés de cinéma réunis autour d\'un projecteur 8mm.',
  },
  {
    year: '1964',
    description:
      'Première édition du FIFAK — le festival devient rapidement une référence internationale pour le cinéma amateur.',
  },
  {
    year: '1980s',
    description:
      'Structuration de la FTCA en fédération nationale, rassemblant les clubs de cinéastes amateurs de tout le pays.',
  },
  {
    year: 'Aujourd\'hui',
    description:
      'Une nouvelle génération de cinéastes amateurs, un festival vivant, et une fédération qui continue de transmettre.',
  },
];

/* ============================================================
   FTCA SECTION — Mission
   ============================================================ */

export interface MissionItem {
  icon: string; // Font Awesome class
  title: string;
  description: string;
}

export const MISSION_ITEMS: MissionItem[] = [
  {
    icon: 'fa-solid fa-film',
    title: 'Développement du cinéma amateur',
    description: 'Soutenir la création indépendante à travers tout le territoire tunisien.',
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: 'Formation',
    description:
      'Ateliers, ciné-clubs et transmission du savoir-faire entre générations de cinéastes.',
  },
  {
    icon: 'fa-solid fa-clapperboard',
    title: 'Diffusion',
    description:
      'Faire circuler les films amateurs tunisiens en Tunisie comme à l\'international.',
  },
  {
    icon: 'fa-solid fa-globe',
    title: 'Échanges culturels',
    description: 'Connecter les cinéastes tunisiens aux réseaux amateurs internationaux.',
  },
];

/* ============================================================
   FIFAK SECTION — Cards
   ============================================================ */

export interface FifakCard {
  num: string;
  title: string;
  description: string;
}

export const FIFAK_CARDS: FifakCard[] = [
  {
    num: '01',
    title: 'Le festival',
    description:
      'Une semaine de projections, de rencontres et de compétition sur les bords de la Méditerranée.',
  },
  {
    num: '02',
    title: 'Compétition',
    description:
      'Courts métrages amateurs tunisiens et internationaux, en lice pour le Coq de Kélibia.',
  },
  {
    num: '03',
    title: 'Jury',
    description: 'Des professionnels du cinéma et de la culture évaluent chaque édition.',
  },
  {
    num: '04',
    title: 'Palmarès',
    description:
      'Les films primés rejoignent l\'histoire du festival et sa mémoire collective.',
  },
];

/* ============================================================
   FIFAK SECTION — Archives
   ============================================================ */

export interface ArchiveEdition {
  year: string;
  edition: string;
}

export const ARCHIVE_EDITIONS: ArchiveEdition[] = [
  { year: '2025', edition: '66ᵉ édition' },
  { year: '2024', edition: '65ᵉ édition' },
  { year: '2023', edition: '64ᵉ édition' },
  { year: '2022', edition: '63ᵉ édition' },
  { year: '2019', edition: '60ᵉ édition' },
  { year: '1964', edition: '1ʳᵉ édition' },
];

/* ============================================================
   FIFAK 2026 FEATURE — Information rows
   ============================================================ */

export interface Fifak2026Row {
  label: string;
  value: string;
}

export const FIFAK_2026_ROWS: Fifak2026Row[] = [
  { label: 'Dates', value: 'août 2026' },
  { label: 'Programme', value: 'Bientôt disponible' },
  { label: 'Compétition', value: 'Appel à films ouvert' },
  { label: 'Jury', value: 'Annonce à venir' },
  { label: 'Palmarès', value: 'Éditions précédentes' },
];

/* ============================================================
   ARTICLES SECTION
   ============================================================ */

export interface ArticleCard {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
}

export const ARTICLE_CARDS: ArticleCard[] = [
  {
    category: 'FIFAK 2026',
    date: '12 Août 2026',
    title: 'La Presse - FIFAK 2026 : Une édition charnière',
    excerpt:
      'La 39éme Edition du FIFAK 2026 promet d\'être particulièrement marquante.',
    image: 'assets/image-presse.png',
    link: 'https://www.lapresse.tn/2026/07/16/fifak-2026-une-edition-charniere/?fbclid=IwY2xjawTtRTJwZG9mBWV4dG4DYWVtAjExAHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7MpuzETCUecgSNF20U6olfib-cAtm_UPYM5-FmscoUK6oifepbqSQsu0Y_VQ_aem_ANwjXywjhdyGgN6gEq6Y-g',
  },
  {
    category: 'Fédération',
    date: '23 Août 2026',
    title: 'Retour sur 60 ans de cinéma amateur à Kélibia',
    excerpt:
      'Un regard sur l\'histoire de la FTCA et l\'évolution du mouvement amateur en Tunisie.',
    image: 'assets/ftca-logo-mark.png',
    link: '#',
  },
  {
    category: 'Formation',
    date: '23 Août 2026',
    title: 'Nouveaux ateliers de réalisation ouverts aux jeunes cinéastes',
    excerpt:
      'La FTCA lance un cycle de formations gratuites.',
    image: 'assets/fifak-wallp.png',
    link: '#',
  },
];

/* ============================================================
   EDITORIAL STATS
   ============================================================ */

export interface EditorialStat {
  value: string;
  label: string;
}

export const EDITORIAL_STATS: EditorialStat[] = [
  { value: '60+', label: 'Années d\'existence et de transmission' },
  { value: '67', label: 'Éditions du FIFAK organisées à Kélibia' },
  { value: '+40', label: 'Pays représentés au festival au fil des années' },
];

/* ============================================================
   HERO CONTENT
   Structure partagée par app-hero, réutilisée pour la landing
   et pour la page dédiée FIFAK 2026 (contenu différent, même composant)
   ============================================================ */

export interface HeroAction {
  label: string;
  variant: 'solid' | 'ghost';
  routerLink: string;
  fragment?: string;
}

export interface HeroContent {
  /** 'display' = traitement Fraunces de la landing, 'impact' = traitement Anton poster (FIFAK 2026) */
  typographyVariant: 'display' | 'impact';
  eyebrowText: string;
  eyebrowStyled: boolean;
  titlePrefix: string;
  titleAccent: string;
  titleSuffix?: string;
  subtitle: string;
  actions: HeroAction[];
  badgeNumber: string;
  badgeLines: string[];
  bgImageUrl: string;
  bgPosition: string;
}

export const HERO_CONTENT: HeroContent = {
  typographyVariant: 'display',
  eyebrowText: 'Depuis 1962 — Tunisie',
  eyebrowStyled: false,
  titlePrefix: 'Fédération\nTunisienne des\n',
  titleAccent: 'Cinéastes',
  titleSuffix: ' Amateurs',
  subtitle:
    'La FTCA fait vivre le cinéma amateur tunisien depuis des décennies : formation, création, transmission — et l\'organisation du plus ancien festival de films amateurs au monde.',
  actions: [
    { label: 'Découvrir FIFAK 2026', variant: 'solid', routerLink: '/fifak-2026' },
    { label: 'Notre histoire', variant: 'ghost', routerLink: '/', fragment: 'ftca' },
  ],
  badgeNumber: 'N°67',
  badgeLines: ['Édition', 'FIFAK 2026'],
  bgImageUrl: 'assets/wallp.jpg',
  bgPosition: 'center 30%',
};

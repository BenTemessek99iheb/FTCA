/**
 * FIFAK 2026 CONTENT
 * Typed data for the dedicated /fifak-2026 route
 * Extracted from reference/fifak-2026.html, ready for API integration
 */

import { HeroContent } from './site-content';
import { assetUrl } from '../shared/asset-url';

/* ============================================================
   HERO
   ============================================================ */

export const FIFAK_2026_HERO_CONTENT: HeroContent = {
  typographyVariant: 'impact',
  eyebrowText: '39ᵉ édition — Kélibia, Tunisie',
  eyebrowStyled: true,
  titlePrefix: 'FIFAK ',
  titleAccent: '2026',
  subtitle:
    'Une semaine de cinéma amateur au bord de la Méditerranée : compétition internationale, hommages, rencontres — et sept nuits de projections à Kélibia.',
  actions: [
    { label: 'Voir le programme', variant: 'solid', routerLink: '/fifak-2026', fragment: 'programme' },
    { label: 'Découvrir le jury', variant: 'ghost', routerLink: '/fifak-2026', fragment: 'jury' },
    { label: 'Lire la Nashriya', variant: 'ghost', routerLink: '/fifak-2026', fragment: 'nashriya' },
  ],
  badgeNumber: '23—29 AOÛT',
  badgeLines: ['39ᵉ édition', 'FIFAK 2026'],
  bgImageUrl: assetUrl('Fifak-ill'),
  bgImageWebp: assetUrl('Fifak-ill'),
  bgPosition: 'center 1%',
};

/* ============================================================
   PROGRAMME
   ============================================================ */

export type ProgrammeCategory = 'ouverture' | 'national' | 'international' | 'hommage';

export interface ProgrammeFilm {
  title: string;
  director: string;
  country: string;
  category: ProgrammeCategory;
  day: number; // 23–29
  posterUrl: string;
  /** Résumé court affiché sur la carte film (2-3 lignes, "Lire plus" pour le texte complet) */
  synopsis: string;
}

export const PROGRAMME_CATEGORY_LABELS: Record<ProgrammeCategory, string> = {
  ouverture: 'Ouverture',
  national: 'National',
  international: 'International',
  hommage: 'Hommage',
};

export const PROGRAMME_DAYS = [23, 24, 25, 26, 27, 28, 29];

export const PROGRAMME_FILMS: ProgrammeFilm[] = [
  {
    title: "Nuits d'Argent",
    director: 'Sonia Kraïem',
    country: 'Tunisie',
    category: 'ouverture',
    day: 23,
    posterUrl: 'https://picsum.photos/seed/film-ouverture/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Le Sel de la Mer',
    director: 'Amine Chérif',
    country: 'Tunisie',
    category: 'national',
    day: 24,
    posterUrl: 'https://picsum.photos/seed/film-national-1/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Broken Frames',
    director: 'Marco Ferretti',
    country: 'Italie',
    category: 'international',
    day: 24,
    posterUrl: 'https://picsum.photos/seed/film-intl-1/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Sable et Lumière',
    director: 'Rania Bouazizi',
    country: 'Tunisie',
    category: 'national',
    day: 25,
    posterUrl: 'https://picsum.photos/seed/film-national-2/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Silent Reels',
    director: 'Anke Voss',
    country: 'Allemagne',
    category: 'international',
    day: 25,
    posterUrl: 'https://picsum.photos/seed/film-intl-2/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Empreintes',
    director: 'Rétrospective',
    country: 'Tunisie',
    category: 'hommage',
    day: 25,
    posterUrl: 'https://picsum.photos/seed/film-hommage-1/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Kélibia Blues',
    director: 'Mehdi Sassi',
    country: 'Tunisie',
    category: 'national',
    day: 26,
    posterUrl: 'https://picsum.photos/seed/film-national-3/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'The Last Reel',
    director: 'Julia Novak',
    country: 'Pologne',
    category: 'international',
    day: 26,
    posterUrl: 'https://picsum.photos/seed/film-intl-3/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Terre Amère',
    director: 'Ines Gharbi',
    country: 'Tunisie',
    category: 'national',
    day: 27,
    posterUrl: 'https://picsum.photos/seed/film-national-4/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Anhedonia',
    director: 'Pablo Reyes',
    country: 'Espagne',
    category: 'international',
    day: 27,
    posterUrl: 'https://picsum.photos/seed/film-intl-4/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Retour de Flamme',
    director: 'Rétrospective',
    country: 'Tunisie',
    category: 'hommage',
    day: 27,
    posterUrl: 'https://picsum.photos/seed/film-hommage-2/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Vagues',
    director: 'Firas Belhaj',
    country: 'Tunisie',
    category: 'national',
    day: 28,
    posterUrl: 'https://picsum.photos/seed/film-national-5/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Echoes of Amateur Cinema',
    director: 'Ben Whitfield',
    country: 'Royaume-Uni',
    category: 'international',
    day: 28,
    posterUrl: 'https://picsum.photos/seed/film-intl-5/450/600',
    synopsis: 'À compléter par la FTCA',
  },
  {
    title: 'Lueurs',
    director: 'Film de clôture',
    country: 'Tunisie',
    category: 'national',
    day: 29,
    posterUrl: 'https://picsum.photos/seed/film-cloture/450/600',
    synopsis: 'À compléter par la FTCA',
  },

  // ---- Données de TEST ci-dessous (à SUPPRIMER quand le vrai catalogue
  // 50+ films sera fourni par la FTCA) : générées uniquement pour vérifier
  // visuellement grille/filtres/pagination à volume réel. Titres/synopsis
  // volontairement identifiables comme factices. ----
  ...Array.from({ length: 38 }, (_, i) => {
    const n = i + 15;
    const categories: ProgrammeCategory[] = ['national', 'international', 'hommage', 'national', 'international'];
    const category = categories[i % categories.length];
    const day = PROGRAMME_DAYS[i % PROGRAMME_DAYS.length];
    return {
      title: `Film exemple #${n}`,
      director: 'Réalisateur Test',
      country: 'Pays Test',
      category,
      day,
      posterUrl: `https://picsum.photos/seed/film-test-${n}/450/600`,
      synopsis: 'Donnée de test — à remplacer par le vrai catalogue FTCA.',
    };
  }),
];

/* ============================================================
   JURY
   ============================================================ */

export interface JuryMember {
  name: string;
  role: string;
  country: string;
  group: 'national' | 'international';
  photoUrl: string;
  /** Biographie affichée dans la popup (jury-member-modal), pas sur la carte */
  bio: string;
}

export const JURY_MEMBERS: JuryMember[] = [
  {
    name: 'Anas Kammoun',
    role: 'Réalisateur / Professeur Universitaire',
    country: 'Tunisie',
    group: 'national',
    photoUrl: 'https://picsum.photos/seed/jury-nat-1/240/240',
    bio: 'À compléter par la FTCA',
  },
  {
    name: 'Olfa Chakroun',
    role: 'Réalisatrice',
    country: 'Tunisie',
    group: 'national',
    photoUrl: 'https://picsum.photos/seed/jury-nat-2/240/240',
    bio: 'À compléter par la FTCA',
  },
  {
    name: 'Lobna Noomen',
    role: 'Artiste / Actrice',
    country: 'Tunisie',
    group: 'national',
    photoUrl: 'https://picsum.photos/seed/jury-nat-3/240/240',
    bio: 'À compléter par la FTCA',
  },
  {
    name: 'Ridha Rakbani',
    role: 'Cinéaste amateur / FTCA',
    country: 'Tunisie',
    group: 'national',
    photoUrl: 'https://picsum.photos/seed/jury-nat-4/240/240',
    bio: 'À compléter par la FTCA',
  },
  {
    name: 'Anouar Lahouar',
    role: 'Réalisateur',
    country: 'Tunisie',
    group: 'national',
    photoUrl: 'https://picsum.photos/seed/jury-nat-5/240/240',
    bio: 'À compléter par la FTCA',
  },
  {
    name: 'Leïla Mansour',
    role: 'Directrice de festival',
    country: 'France',
    group: 'international',
    photoUrl: 'https://picsum.photos/seed/jury-intl-1/240/240',
    bio: 'À compléter par la FTCA',
  },
  {
    name: 'Moez Mrabet',
    role: 'Réalisateur / Acteur',
    country: 'Tunisie',
    group: 'international',
    photoUrl: 'https://picsum.photos/seed/jury-intl-2/240/240',
    bio: 'À compléter par la FTCA',
  },
  {
    name: 'Hanna Atallah',
    role: 'Réalisateur / Producteur',
    country: 'Palestine',
    group: 'international',
    photoUrl: 'https://picsum.photos/seed/jury-intl-3/240/240',
    bio: 'À compléter par la FTCA',
  },
  {
    name: 'Moussa Touré',
    role: 'Réalisateur',
    country: 'Sénégal',
    group: 'international',
    photoUrl: 'https://picsum.photos/seed/jury-intl-4/240/240',
    bio: 'À compléter par la FTCA',
  },
  {
    name: 'Marie-pierre Bretas',
    role: 'Réalisatrice',
    country: 'France',
    group: 'international',
    photoUrl: 'https://picsum.photos/seed/jury-intl-4/240/240',
    bio: 'À compléter par la FTCA',
  },
  {
    name: 'Abdelkarim Kadri',
    role: 'Critique cinéma',
    country: 'Algérie',
    group: 'international',
    photoUrl: 'https://picsum.photos/seed/jury-intl-4/240/240',
    bio: 'À compléter par la FTCA',
  },
];

/* ============================================================
   NASHRIYA — journal quotidien bilingue EN / AR
   ============================================================ */

export interface NashriyaLocale {
  title: string;
  body: string;
}

export interface NashriyaEntry {
  day: number; // 23–29
  dateLabel: string;
  imageUrl: string;
  en: NashriyaLocale;
  ar: NashriyaLocale;
}

export const NASHRIYA_ENTRIES: NashriyaEntry[] = [
  {
    day: 23,
    dateLabel: '23 Août 2026',
    imageUrl: assetUrl('public-kelibia'),
    en: {
      title: 'Kélibia lights up for the 39th edition',
      body: 'The festival opened tonight on the shores of Kélibia with the screening of "Nuits d\'Argent" before a packed audience. A warm and emotional start to seven nights of amateur cinema.',
    },
    ar: {
      title: 'قليبية تضيء لانطلاق الدورة التاسعة والثلاثين',
      body: 'انطلقت فعاليات المهرجان هذا المساء على شاطئ قليبية بعرض فيلم "ليالي الفضة" أمام جمهور غفير، في بداية مفعمة بالمشاعر لسبع ليال من السينما الهاوية.',
    },
  },
/*   {
    day: 24,
    dateLabel: '24 Août 2026',
    imageUrl: 'https://picsum.photos/seed/nash-24/1600/650',
    en: {
      title: 'First screenings, first debates',
      body: 'National and international selections shared the big screen for the first time. Audiences lingered long after the credits, arguing over their favourites late into the night.',
    },
    ar: {
      title: 'أولى العروض وأولى النقاشات',
      body: 'تقاسمت الأفلام الوطنية والدولية الشاشة الكبرى لأول مرة، وامتدت النقاشات بين الحضور إلى وقت متأخر من الليل حول الأفلام المفضلة لديهم.',
    },
  },
  {
    day: 25,
    dateLabel: '25 Août 2026',
    imageUrl: 'https://picsum.photos/seed/nash-25/1600/650',
    en: {
      title: 'A tribute night to remember',
      body: 'The restored screening of "Empreintes" moved the room to silence, followed by a moving exchange with the festival\'s archivists on the legacy of Tunisian amateur cinema.',
    },
    ar: {
      title: 'أمسية تكريم لا تُنسى',
      body: 'أطبق الصمت على القاعة عند عرض النسخة المرممة من فيلم "بصمات"، وأعقبه حوار مؤثر مع أرشيفيي المهرجان حول إرث السينما الهاوية التونسية.',
    },
  },
  {
    day: 26,
    dateLabel: '26 Août 2026',
    imageUrl: 'https://picsum.photos/seed/nash-26/1600/650',
    en: {
      title: 'A sleepless night on the old port',
      body: '"Kélibia Blues" and "The Last Reel" kept the crowd awake well past midnight, as the old port turned into an open-air cinema under a warm August sky.',
    },
    ar: {
      title: 'ليلة بيضاء على الميناء القديم',
      body: 'أبقى فيلما "بلوز قليبية" و"البكرة الأخيرة" الجمهور مستيقظا إلى ما بعد منتصف الليل، وتحول الميناء القديم إلى قاعة سينما مفتوحة تحت سماء أوت الدافئة.',
    },
  },
  {
    day: 27,
    dateLabel: '27 Août 2026',
    imageUrl: 'https://picsum.photos/seed/nash-27/1600/650',
    en: {
      title: 'The jury tightens its debates',
      body: 'With only three days left before the awards, deliberations intensified behind closed doors as the jury narrowed down its shortlist for the Coq de Kélibia.',
    },
    ar: {
      title: 'لجنة التحكيم تُحكم نقاشاتها',
      body: 'مع اقتراب موعد الجوائز بعد ثلاثة أيام فقط، تكثفت المداولات خلف الأبواب المغلقة وضاقت القائمة القصيرة المرشحة لجائزة ديك قليبية.',
    },
  },
  {
    day: 28,
    dateLabel: '28 Août 2026',
    imageUrl: 'https://picsum.photos/seed/nash-28/1600/650',
    en: {
      title: 'Second-to-last night, first impressions',
      body: 'Amateur filmmakers shared their impressions ahead of tomorrow\'s ceremony, reflecting on a week of screenings, encounters, and long nights by the sea.',
    },
    ar: {
      title: 'الليلة قبل الأخيرة وأولى الانطباعات',
      body: 'شارك صانعو الأفلام الهواة انطباعاتهم قبيل حفل الغد، وهم يستذكرون أسبوعا حافلا بالعروض واللقاءات والليالي الطويلة على شاطئ البحر.',
    },
  },
  {
    day: 29,
    dateLabel: '29 Août 2026',
    imageUrl: 'https://picsum.photos/seed/nash-29/1600/650',
    en: {
      title: 'The Coq de Kélibia finds its winner',
      body: 'Closing ceremony, full awards list, and a final screening of "Lueurs" brought the 67th edition of FIFAK to a close — until next year, Kélibia.',
    },
    ar: {
      title: 'ديك قليبية يجد صاحبه',
      body: 'اختتمت الدورة السابعة والستون لمهرجان قليبية بحفل ختامي وقائمة كاملة للجوائز، وعرض ختامي لفيلم "أضواء" — إلى اللقاء العام المقبل في قليبية.',
    },
  },
 */];

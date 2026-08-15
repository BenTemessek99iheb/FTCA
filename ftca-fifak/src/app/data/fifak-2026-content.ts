/**
 * FIFAK 2026 CONTENT
 * Typed data for the dedicated /fifak-2026 route
 * Extracted from reference/fifak-2026.html, ready for API integration
 */

import { HeroContent } from './site-content';

/* ============================================================
   HERO
   ============================================================ */

export const FIFAK_2026_HERO_CONTENT: HeroContent = {
  typographyVariant: 'impact',
  eyebrowText: '67ᵉ édition — Kélibia, Tunisie',
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
  badgeLines: ['67ᵉ édition', 'FIFAK 2026'],
  bgImageUrl: 'assets/kelibia-port.jpg',
  bgPosition: 'center 35%',
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
  },
  {
    title: 'Le Sel de la Mer',
    director: 'Amine Chérif',
    country: 'Tunisie',
    category: 'national',
    day: 24,
    posterUrl: 'https://picsum.photos/seed/film-national-1/450/600',
  },
  {
    title: 'Broken Frames',
    director: 'Marco Ferretti',
    country: 'Italie',
    category: 'international',
    day: 24,
    posterUrl: 'https://picsum.photos/seed/film-intl-1/450/600',
  },
  {
    title: 'Sable et Lumière',
    director: 'Rania Bouazizi',
    country: 'Tunisie',
    category: 'national',
    day: 25,
    posterUrl: 'https://picsum.photos/seed/film-national-2/450/600',
  },
  {
    title: 'Silent Reels',
    director: 'Anke Voss',
    country: 'Allemagne',
    category: 'international',
    day: 25,
    posterUrl: 'https://picsum.photos/seed/film-intl-2/450/600',
  },
  {
    title: 'Empreintes',
    director: 'Rétrospective',
    country: 'Tunisie',
    category: 'hommage',
    day: 25,
    posterUrl: 'https://picsum.photos/seed/film-hommage-1/450/600',
  },
  {
    title: 'Kélibia Blues',
    director: 'Mehdi Sassi',
    country: 'Tunisie',
    category: 'national',
    day: 26,
    posterUrl: 'https://picsum.photos/seed/film-national-3/450/600',
  },
  {
    title: 'The Last Reel',
    director: 'Julia Novak',
    country: 'Pologne',
    category: 'international',
    day: 26,
    posterUrl: 'https://picsum.photos/seed/film-intl-3/450/600',
  },
  {
    title: 'Terre Amère',
    director: 'Ines Gharbi',
    country: 'Tunisie',
    category: 'national',
    day: 27,
    posterUrl: 'https://picsum.photos/seed/film-national-4/450/600',
  },
  {
    title: 'Anhedonia',
    director: 'Pablo Reyes',
    country: 'Espagne',
    category: 'international',
    day: 27,
    posterUrl: 'https://picsum.photos/seed/film-intl-4/450/600',
  },
  {
    title: 'Retour de Flamme',
    director: 'Rétrospective',
    country: 'Tunisie',
    category: 'hommage',
    day: 27,
    posterUrl: 'https://picsum.photos/seed/film-hommage-2/450/600',
  },
  {
    title: 'Vagues',
    director: 'Firas Belhaj',
    country: 'Tunisie',
    category: 'national',
    day: 28,
    posterUrl: 'https://picsum.photos/seed/film-national-5/450/600',
  },
  {
    title: 'Echoes of Amateur Cinema',
    director: 'Ben Whitfield',
    country: 'Royaume-Uni',
    category: 'international',
    day: 28,
    posterUrl: 'https://picsum.photos/seed/film-intl-5/450/600',
  },
  {
    title: 'Lueurs',
    director: 'Film de clôture',
    country: 'Tunisie',
    category: 'national',
    day: 29,
    posterUrl: 'https://picsum.photos/seed/film-cloture/450/600',
  },
];

/* ============================================================
   JURY
   ============================================================ */

export interface JuryMember {
  name: string;
  role: string;
  group: 'national' | 'international';
  photoUrl: string;
}

export const JURY_MEMBERS: JuryMember[] = [
  {
    name: 'Nadia Ben Rached',
    role: 'Présidente du jury',
    group: 'national',
    photoUrl: 'https://picsum.photos/seed/jury-nat-1/240/240',
  },
  {
    name: 'Karim Fassi',
    role: 'Critique de cinéma',
    group: 'national',
    photoUrl: 'https://picsum.photos/seed/jury-nat-2/240/240',
  },
  {
    name: 'Salma Trabelsi',
    role: 'Monteuse',
    group: 'national',
    photoUrl: 'https://picsum.photos/seed/jury-nat-3/240/240',
  },
  {
    name: 'Youssef Amara',
    role: 'Cinéaste amateur',
    group: 'national',
    photoUrl: 'https://picsum.photos/seed/jury-nat-4/240/240',
  },
  {
    name: 'Mounira Zaghouani',
    role: 'Productrice',
    group: 'national',
    photoUrl: 'https://picsum.photos/seed/jury-nat-5/240/240',
  },
  {
    name: 'Leïla Mansour',
    role: 'Directrice de festival — France',
    group: 'international',
    photoUrl: 'https://picsum.photos/seed/jury-intl-1/240/240',
  },
  {
    name: 'Marco Ferretti',
    role: 'Réalisateur — Italie',
    group: 'international',
    photoUrl: 'https://picsum.photos/seed/jury-intl-2/240/240',
  },
  {
    name: 'Anke Voss',
    role: 'Documentariste — Allemagne',
    group: 'international',
    photoUrl: 'https://picsum.photos/seed/jury-intl-3/240/240',
  },
  {
    name: 'Ben Whitfield',
    role: 'Programmateur — Royaume-Uni',
    group: 'international',
    photoUrl: 'https://picsum.photos/seed/jury-intl-4/240/240',
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
    imageUrl: 'assets/public-kelibia.jpg',
    en: {
      title: 'Kélibia lights up for the 67th edition',
      body: 'The festival opened tonight on the shores of Kélibia with the screening of "Nuits d\'Argent" before a packed audience. A warm and emotional start to seven nights of amateur cinema.',
    },
    ar: {
      title: 'قليبية تضيء لانطلاق الدورة السابعة والستين',
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

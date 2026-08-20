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
    name: 'Ons Kammoun',
    role: 'Filmmaker, Film Researcher',
    country: 'Tunisia',
    group: 'national',
    photoUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787225448/ons_kamoun.jpg',
    bio: 'Ons Kamoun is a filmmaker and film researcher, holding a PhD in Cinema from the Université de Toulouse Jean-Jaurès in France. Since 2003, she has taught design, cinema, and filmic anthropology at Tunisian universities, and since 2018 she has been an assistant professor at the École Supérieure de l\'Audiovisuel et du Cinéma at the University of Carthage. Her first feature film, Travelling, recounts her own experience as a film teacher in southern Tunisia. A cultural operator as well as a filmmaker, she has supervised numerous residencies and film production workshops, directed festivals including Les Journées Cinématographiques de Hergla and Tunis Tout Court, and coordinated the programming of the Cinémathèque Tunisienne during its founding year. She currently serves as President of the Tunisian Association for the Promotion of Film Criticism (ATPCC). Her writing and filmmaking focus on questions of self-narrative, otherness, and the anthropology of Tunisian cinema. Her documentaries include Travelling (2017), Jean Fontaine, un poème à trois strophes (2021), and Ailes et Tesselles (2022).',
  },
  {
    name: 'Olfa Chakroun',
    role: 'Director',
    country: 'Tunisia',
    group: 'national',
    photoUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787225446/Olfa_chakroun.jpg',
    bio: 'Olfa Chakroun is a Tunisian director, screenwriter, and academic. A disciple of Jacques Rosner, she trained in theatre before becoming an actress and film teacher at ISAMM in Tunis. She later turned to filmmaking, drawn to the ways memory, place, and identity intersect with the contemporary transformations of Tunisia. Her documentaries include La Maison d\'Angela (2010), Tunisie année zéro (2011), and La Goulette année zéro (2013).',
  },
  {
    name: 'Lobna Noomen',
    role: 'Actress, Musician',
    country: 'Tunisia',
    group: 'national',
    photoUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787224629/Lobna_noomen.jpg',
    bio: 'Lobna Noomane is a Tunisian artist whose work spans music and acting, holding a Master\'s degree in Theatre from the Institut Supérieur d\'Art Dramatique in Tunis. Alongside her musical career, she has built a distinguished body of work in theatre and film, notably for her role in Bastardo by director Nejib Belkadhi, for which she won Best Actress at the 30th Alexandria Mediterranean Film Festival in 2014. On stage, she starred in Wafa Taboubi\'s play Al-Haribat (The Escapees), which won the Golden Tanit, the top prize at the 26th Journées Théâtrales de Carthage in 2025, with Noomane herself receiving the award for Best Female Performance. Al-Haribat went on to win the Sheikh Dr. Sultan bin Mohammed Al Qasimi Award for Best Arab Theatrical Production at the 16th Arab Theatre Festival in Egypt in 2026. Her work is marked by the intersection of music, acting, and performance, and by her ability to move fluidly between different forms of artistic expression.',
  },
  {
    name: 'Ridha Rakbani',
    role: 'Amateur Filmmaker / FTCA',
    country: 'Tunisia',
    group: 'national',
    photoUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787225450/Ridha_ROKBENI.jpg',
    bio: 'Ridha Rokbani is a Tunisian amateur filmmaker long associated with the Fédération Tunisienne des Cinéastes Amateurs (FTCA). He has contributed to FTCA productions as a production assistant, notably on the documentary Images saccadées, and has served on national juries at the Festival International du Film Amateur de Kélibia (FIFAK).',
  },
  {
    name: 'Anouar Lahouar',
    role: 'Director',
    country: 'Tunisia',
    group: 'national',
    photoUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787225441/Anouar_Lahouar.jpg',
    bio: 'Anouar Lahouar holds a Master\'s degree in Psychology, obtained in Morocco in 1997. A former member of Association Médi Film Création (Morocco), he trained in 35mm editing and camera technique at the Centre Cinématographique Marocain. He was a member of the FTCA (Fédération Tunisienne des Cinéastes Amateurs) in Sousse and is an active committee member of FIFEJ, the International Film Festival for Children and Youth in Sousse. His early amateur films, produced with the FTCA, earned numerous international awards, including bronze medals at the Kélibia Festival, the Estonia International Festival, and UNICA (the International Federation of Non-Professional Films) in both Germany and Belgium, as well as the Federico Fellini Prize (UNESCO, 2005). His feature-length works include Ève à mes yeux (2009), his first professional film, and the fiction short Le Masseur (Ettayeb) (2011), both honored at festivals in Tunisia, Estonia, Germany, and Belgium.',
  },
  
  {
    name: 'Moez Mrabet',
    role: 'Director / Actor',
    country: 'Tunisia',
    group: 'international',
    photoUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787225443/moez-mrabet.png',
    bio: 'Moez Mrabet is a Tunisian actor, stage director, and academic, holding a PhD in Theatre and Performing Arts from the Université Paris III - Sorbonne Nouvelle (2007) and trained at the Institut Supérieur d\'Art Dramatique (ISAD) in Tunis. Alongside his academic career as a researcher and former Director of Studies at ISAD, he has built an extensive career on stage and screen, with film credits including Le Dernier Mirage (2014) and L\'Affaire 460 (2019). He has held several cultural leadership roles, including General Director of the Centre Culturel International de Hammamet and, since 2023, General Director of the Tunisian National Theatre.',
  },
  {
    name: 'Hanna Atallah',
    role: 'Filmmaker, Producer, Cultural Arts Manager',
    country: 'Palestine',
    group: 'international',
    photoUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787224640/hanna_atallah.jpg',
    bio: 'Hanna Atallah is a Palestinian filmmaker, producer, and cultural arts manager, and a graduate of the High Cinema Institute in Cairo. His work spans fiction and documentary, with productions screened and awarded at leading international film festivals, including Locarno, the BFI London Film Festival, and the El Gouna Film Festival. He is the founder and artistic director of Filmlab Palestine and director of Palestine Cinema Days, playing a key role in strengthening Palestinian film infrastructure, supporting emerging filmmakers, and expanding the international presence of Palestinian cinema. He is also the co-founder of August Films in Palestine and Route 243 in New York. Atallah is a member of the European Film Academy.',
  },
  {
    name: 'Moussa Touré',
    role: 'Director',
    country: 'Senegal',
    group: 'international',
    photoUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787225452/Moussa_toure%CC%81.jpg',
    bio: 'Moussa Touré is a Senegalese director, screenwriter, and producer, born in 1958 in Dakar. He began his career as a technician before turning to directing, founding his own production company, Les Films du Crocodile. His first feature, Toubab Bi (1991), was critically acclaimed and awarded at numerous festivals, followed by the popular hit TGV (1998). He is best known internationally for La Pirogue (2012), which premiered at Cannes\' Un Certain Regard and won awards at festivals worldwide. He has also directed several noted documentaries and served as President of the Documentary Jury at FESPACO in 2011.',
  },
  {
    name: 'Marie-pierre Bretas',
    role: 'Director',
    country: 'France',
    group: 'international',
    photoUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787224637/Marie-Pierre_Br%C3%AAtas.jpg',
    bio: 'Born in Toulouse, she grew up between Oran and the Paris suburbs. After preparatory literary studies and time at the Sorbonne, she became a journalist (Le Matin de Paris, Actuel), then spent three years in New York, working a string of odd jobs before training in documentary filmmaking (IIIS, Ateliers Varan). She co-directed Mon travail c\'est capital for Arte, then, having settled in Brazil\'s Nordeste, made La Campagne de São José (FID Marseille, Fidadoc Grand Prize) and Hautes Terres (Special Jury Mention, Cinéma du Réel 2014). In 2022, she presented La Lumière des rêves in competition at Cinéma du Réel. Her latest film, Leaving Amerika, shot between the USA and Cuba, will be released in theaters this coming October. Since 2021, she has mentored the documentary writing workshop (Ruche d\'écriture) at Fidadoc in Agadir.',
  },
  {
    name: 'Abdelkarim Kadri',
    role: 'Writer, Author, Film Critic',
    country: 'Algeria',
    group: 'international',
    photoUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787225440/abdelkerim_kadri.jpg',
    bio: 'Abdelkarim Kadri is an Algerian writer, author, and film critic, born in 1982 in Hammam N\'Bail, Guelma. He is the author of several books on cinema, including Sinima al-Shi\'r (2016), Sinima al-Ru\'a (2017), Shi\'riyat al-Sinima (2022), Jamaliyat al-Talaqqi fi al-Sinima al-Wathaeqiya (2024), and al-Sinima al-Tunisiya (2025), alongside contributions to several collective works on Arab cinema. He has lectured and served on juries at numerous festivals, including the Carthage Film Festival, the Sharm El-Sheikh Festival of Arab and European Cinema, the Oran International Festival of Arab Cinema, and the Imedghassen International Film Festival. He has served as a juror for the Arab Critics Award at the Cannes Film Festival and the European Critics Award at the Cairo International Film Festival from 2018 to 2025. His literary work has also been recognized internationally, including a mention from the Sharjah Award for Arab Creativity and third prize in the Al-Khattala Arabic Novel Competition.',
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

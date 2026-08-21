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

export type FilmGenre = 'fiction' | 'documentaire' | 'doc-fiction' | 'experimental' | 'doc-experimental' ;

export const FILM_GENRE_LABELS: Record<FilmGenre, string> = {
  fiction: 'Fiction',
  documentaire: 'Documentaire',
  'doc-fiction': 'Doc/Fiction',
  experimental: 'Expérimental',
  'doc-experimental': 'Doc/Expérimental',
};

// Type de production (ex: Indépendant, École, FTCA...) — liste volontairement
// vide pour l'instant, à définir par la FTCA. `never` reflète fidèlement
// "aucune valeur valide pour l'instant" ; remplacer par une vraie union de
// litéraux (ex: 'independant' | 'ecole' | 'ftca') dès que la liste est fixée.
export type FilmSubCategory = never;

export const FILM_SUBCATEGORY_LABELS: Record<FilmSubCategory, string> = {};

export interface ProgrammeFilmSynopsis {
  en: string;
  ar: string;
}

export interface ProgrammeFilm {
  title: string;
  director: string;
  country: string;
  category: ProgrammeCategory;
  day: number; // 23–29
  posterUrl: string;
  genre: FilmGenre;
  /** Résumé bilingue affiché sur la carte film (2-3 lignes, "Lire plus" pour le texte complet) */
  synopsis: ProgrammeFilmSynopsis;
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
    title: "El Comita/ the committee",
    director: 'Mouhamed Trabelsi',
    country: 'Tunisie',
    category: 'national',
    day: 23,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243863/el_commita.jpg',
    genre: 'fiction',
    synopsis: {
      en: 'A mysterious committee interviews candidates for the presidency, but with each interview, a satirical truth about power is revealed. The session ends with a shocking twist that proves the decision had been made from the very beginning.',
      ar: '',
    },
  },
  {
    title: 'خارج الاطار / Hors champ',
    director: 'Sadok Sadem',
    country: 'Tunisie',
    category: 'national',
    day: 24,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243839/Hors_champ_Out_of_frame.jpg',
    genre: 'fiction',
    synopsis: {
      en: 'Between a dream that refuses to die and a nightmare that refuses to end, a soul wanders on the margins of life... There, outside the frame, the real story begins.',
      ar: 'بين حلمٍ يرفض أن يموت وكابوسٍ يرفض أن ينتهي، تتوه روحٌ على هامش الحياة... هناك، خارج الإطار، تبدأ الحكاية الحقيقية.',
    },
  },
  {
    title: 'تقفن في الضلال/standing in the shadows',
    director: 'khadija zammouli',
    country: 'Tunisie',
    category: 'national',
    day: 24,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243819/%D8%AA%D9%82%D9%81%D9%86_%D9%81%D9%8A_%D8%A7%D9%84%D8%B6%D9%84%D8%A7%D9%84standing_in_the_shadows.jpg',
    genre: 'experimental',
    // Split EN/AR non fait : le terme arabe "صنعات" est imbriqué au milieu de la
    // phrase anglaise, et le paragraphe AR commence tronqué ("ن خلال" au lieu de
    // "من خلال") — texte original laissé intact, à corriger manuellement.
    synopsis: {
      en: 'Through the archives of the Salle El Fateh, the film observes the silent struggle and ongoing invisibility of the  صنعات , highlighting the interplay between the past and the present. The film reveals the memory embedded in the body and time, bringing to light the gradual erasure of these women who remain largely unknown. ن خلال الأرشيف في قاعة الفتح، يراقب الفيلم النضال الصامت والتهميش المستمر لـ صنعات، مع التنقل بين الماضي والحاضر. يكشف الفيلم الذاكرة المتجسدة في الجسد والزمان، ويبرز التلاشي التدريجي لهؤلاء النساء اللواتي يظلن مجهولات، وذلك من خلال التفاعل بين الأرشيف والحاضر',
      ar: 'ن خلال الأرشيف في قاعة الفتح، يراقب الفيلم النضال الصامت والتهميش المستمر لـ صنعات، مع التنقل بين الماضي والحاضر. يكشف الفيلم الذاكرة المتجسدة في الجسد والزمان، ويبرز التلاشي التدريجي لهؤلاء النساء اللواتي يظلن مجهولات، وذلك من خلال التفاعل بين الأرشيف والحاضر',
    },
  },
 
  {
    title: '٢٠ يومًا، بتوقيت بوزويدة/20 days in bouzouida time',
    director: 'Bassem Belgacem jebahi',
    country: 'Tunisie',
    category: 'national',
    day: 25,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243847/%D9%A2%D9%A0_%D9%8A%D9%88%D9%85%D9%8B%D8%A7_%D8%A8%D8%AA%D9%88%D9%82%D9%8A%D8%AA_%D8%A8%D9%88%D8%B2%D9%88%D9%8A%D8%AF%D8%A920_days_in_bouzouida_time.png',
    genre: 'documentaire',
    synopsis: {
      en: 'Twenty breathtaking days—a span of time where history merges with reality, and upbringing transforms into destiny. Through the gaze of the father, Mohamed Bouzouida, and the intimate testimonies of his children, 20 Days in Bouzouida Time chronicles the story of their brother, Hamza, who chose to build a bridge of resistance stretching from the mountains of Tunisia to the sea of Gaza. Caught between a departed mother s wish and the ancestral legacy, the family comes together to bear witness to the definitive moment of separation, sharing the heavy price of the principles they were raised upon.',
      ar: 'عشرون يوماً من حبس الأنفاس.. زمن كافٍ ليتداخل فيه التاريخ بالواقع، وتتحول فيه التربية إلى مصير. يروي فيلم 20 يوماً، بتوقيت بوزويدة —من خلال نظرات الأب محمد بوزويدة وشهادات أبنائه المؤثرة—حكاية شقيقهم حمزة الذي اختار أن يمد جسراً من المقاومة يمتد من جبال تونس إلى بحر غزة. بين وصية الأم الغائبة وأمانة الأجداد، تجتمع العائلة لتشهد على لحظة الفراق الحاسمة، وتقتسم مع الأب الثمن الباهظ للمبادئ التي كبروا عليها.',
    },
  },
   {
    title: 'Still Loading.. / Mezel...',
    director: 'Nada Bouhadida',
    country: 'Tunisie',
    category: 'national',
    day: 25,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243851/Still_Loading_Mazel.png',
    genre: 'fiction',
    synopsis: {
      en: 'A young screenwriter-director is ready to shoot her first short film but unexpected legal and administrative obstacles stop the project,Caught between frustration and determination, she must decide whether to give up or fight for her film.',
      ar: 'مخرجة وكاتبة سيناريو شابة تستعد لتصوير أول فيلم قصير لها  لكنها تصطدم بعراقيل إدارية وقانونية لم تكن تعرفه بين الإحباط والإصرار، تجد نفسها أمام خيار صعب: الاستسلام أو الدفاع عن حلمها',
    },
  },
   {
    title: 'Beneath the Veil / Sous le voile',
    director: 'Hazar Abbassi',
    country: 'Tunisie',
    category: 'national',
    day: 25,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243826/Sous_le_voile_-_Hazar_Abbassi.jpg',
    genre: 'fiction',
    synopsis: {
      en: 'On the day when songs celebrate her union with her cousin — the man who broke her — Nour searches for a way out behind the veils of silence. A fragile yet furious escape begins, unfolding between the forest and the sea.',
      ar: 'في اليوم الذي تتعالى فيه الأهازيج احتفالًا بزفافها من ابن عمّها، الرجل الذي كسرها، تبحث نور عن منفذٍ خلف ستائر الصمت. تبدأ رحلة هروبٍ هشة، مشبعة بالغضب والإصرار، بين الغابة والبحر.',
    },
  },
  {
    title: 'Amel / امال',
    director: 'rahma ben jemaa',
    country: 'Tunisie',
    category: 'national',
    day: 25,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243871/AMEL_-_rahma_ben_jemaa.png',
    genre: 'fiction',
    // Split EN/AR non fait : le texte arabe collé ici dans les données source est
    // en réalité celui de "Beneath the Veil" (Nour/mariage/forêt), sans rapport
    // avec le sujet d'Amel (cancer) — erreur de copier-coller à corriger avec la
    // vraie synopsis arabe d'Amel. Texte original laissé intact tel quel.
    synopsis: {
      en: 'In late summer 2022, the life of "Amel," a sixty-five-year-old woman, is turned upside down when her family discovers that she has advanced-stage cancer. Amid health challenges and emotional turmoil, the hidden layers of a complex family bond come to light, as love, responsibility, and the fear of loss collide في اليوم الذي تتعالى فيه الأهازيج احتفالًا بزفافها من ابن عمّها، الرجل الذي كسرها، تبحث نور عن منفذٍ خلف ستائر الصمت. تبدأ رحلة هروبٍ هشة، مشبعة بالغضب والإصرار، بين الغابة والبحر.',
      ar: 'في أواخر صيف2022، تنقلب حياة "آمال"، امرأة في الخامسة والستين من عمرها، رأسًا على عقب عندما تكتشف عائلتها إصابتها بمرض السرطان في مرحلة متقدمة. وسط التحديات الصحية واالضطرابات العاطفية، تنكشف خبايا عالقة عائلية متشابكة، حيث تتصارع األدوار بين الحب، المسؤولية، والخوف من الفقدان',
    },
  },
  {
    title: 'ﻛﺒﺴﺔ/The Omnipresent',
    director: 'Youssef Ben Khalifa',
    country: 'Tunisie',
    category: 'national',
    day: 25,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243863/%EF%BB%9B%EF%BA%92%EF%BA%B4%EF%BA%94The_Omnipresent.png',
    genre: 'fiction',
    synopsis: {
      en: 'On the day of a decisive exam, a group of students arrives before anyone else, determined to cheat in complete peace. Their plan collapses when they discover a new teacher strict, methodical, and already in position ready to supervise the room with relentless vigilance.Between panicked glances, improvised tricks, and increasingly absurd attempts at cheating, the tension rises along with suppressed bursts of laughter. Each student tries to outsmart the others in a true comedy of resourcefulness.As the teacher tightens control, the exam turns into a silent battle where everything can shift at any moment. By the end of the session, an unexpected revelation completely changes the game.',
      ar: 'في يوم امتحان مصيري، يصل مجموعة من التلاميذ باكراً إلى القاعة بنيّة الغش بهدوء قبل وصول الجميع. غير أن مخططهم ينهار عند ظهور أستاذ جديد صارم، جهّز القاعة مسبقاً ويراقبهم بعيون يقظة لا تفوّت شيئاً. تتصاعد محاولات الغش بطرق طريفة ومرتبكة، ممزوجة بضحكات مكتومة وقلق متزايد. يتحول الامتحان إلى معركة سرية بين ذكاء التلاميذ وصرامة الأستاذ، وكل واحد منهم يحاول النجاة بخطته. ومع اقتراب نهاية الحصة، يفاجأ الجميع باكتشاف غير متوقع يقلب الموقف رأساً على عقب.',
    },
  },
  {
    title: 'the buried / المردومة',
    director: 'yassmine naceur',
    country: 'Tunisie',
    category: 'national',
    day: 26,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243823/buried.jpg',
    genre: 'documentaire',
    synopsis: {
      en: 'This documentary tells the story of Hnia, a resilient rural woman who shares her experience with Al Mardouma, a traditional method of charcoal production. Through her testimony, the film revisits her past, tracing her life journey and the challenges she faced in both work and daily survival. The film sheds light on the position of Tunisian rural women and their essential role in preserving traditional heritage, highlighting their strength, patience, and resilience while working under harsh living conditions.',
      ar: 'يتناول هذا الفيلم الوثائقي قصة المرأة الريفية المجاهدة هنية، التي تروي تجربتها مع المردومة، وهي طريقة تقليدية لصنع الفحم. من خلال شهادتها، يعود الفيلم إلى ماضيها ليستعرض مسار حياتها وما واجهته من صعوبات وتحديات في العمل والعيش. يسلّط الفيلم الضوء على مكانة المرأة الريفية التونسية ودورها المحوري في الحفاظ على الموروث التقليدي، مبرزًا قوتها وصبرها وقدرتها على المقاومة والعمل في ظروف قاسية',
    },
  },
  {
    title: 'فرصة عمل/Job Opportunity',
    director: 'Karima Trabelsi',
    country: 'Tunisie',
    category: 'national',
    day: 26,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243828/Job_Opportunity_%D9%81%D8%B1%D8%B5%D8%A9_%D8%B9%D9%85%D9%84_A4_-_club_taher_lhaddad_ftca_ftca.png',
    genre: 'fiction',
    synopsis: {
      en: 'Desperately looking for a job, Adem, a young graduate in his twenties, goes through a series of absurd and humiliating job interviews.',
      ar: 'في بحثه اليائس عن عمل، يواجه آدم، وهو خريج شاب في العشرينات من عمره، سلسلة من مقابلات التوظيف العبثية والمهينة.',
    },
  },
  {
    title: 'هدر/Good Boy', 
    director: 'Samoud Sélim & Jerbi Mariem',
    country: 'Tunisie',
    category: 'national',
    day: 27,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787269810/good_boy_FIFAK_26_affiche.png',
    genre: 'fiction',
    synopsis: {
      en: 'When avoiding effort becomes an obsession, every small shortcut comes with a hidden price.',
      ar: 'عندما يتحول تجنب المجهود إلى هوس، تفرض الحلول السهلة أثمانًا خفيّة.',
    },
  },
  {
    title: 'عالصباح يا فتاح / O God opener of doors',
    director: 'Kahna Maddeb',
    country: 'Tunisie',
    category: 'national',
    day: 27,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787248594/o_god_opener_of_doors.jpg',
    // Aucun synopsis fourni pour l'instant -> genre non déductible, 'fiction'
    // posé par défaut uniquement pour respecter le type, à valider/corriger.
    genre: 'fiction',
    synopsis: { en: '', ar: '.... عم المنجي يلتقط القوارير البلاستيكية من مكان إلى مكان فجأة ' },
  },
  {
    title: 'قد لا ينام البعض/Sleepless Are Some',
    director: 'Amir Belhaj',
    country: 'Tunisie',
    category: 'national',
    day: 27,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243839/SOMEARESLEEPLESSPOSTER_-_Yung_Amiro.jpg',
    genre: 'fiction',
    synopsis: {
      en: 'Upon the sudden departure of his colleague, Chantal Gérard, Xavier Caution is assigned to the night shift at a dying newspaper, while a butterfly circles around a halogen lamp.',
      ar: 'إثر الرحيل المفاجئ لزميلته شانتال جيرارد ، يُنقل اكزافييه كوسيون إلى نوبة العمل الليلية في صحيفةٍ تحتضر، بينما تطوف فراشة حول ضوءٍ زائف.',
    },
  },
  {
    title: 'زردة /Zerda',
    director: 'Sboui saber',
    country: 'Tunisie',
    category: 'national',
    day: 28,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243821/Zerda.jpg',
    genre: 'documentaire',
    synopsis: {
      en: 'Zarda" is a documentary that offers a visual and human journey into the traditional pilgrimages to the shrines of saints in southern Tunisia, where spirituality intertwines with cultural heritage and collective memory. Through poetic imagery and authentic moments, the film documents the rituals, chants, prayers, and human encounters that define this enduring tradition, while highlighting its cultural significance and contributing to the preservation of a unique heritage that is gradually disappearing.',
      ar: 'يرصد فيلم «زردة» رحلةً بصريةً وإنسانيةً إلى عالم الزيارات الشعبية للأولياء الصالحين في الجنوب التونسي، حيث تمتزج الروحانية بالتراث، وتلتقي الذاكرة الجماعية بطقوس توارثتها الأجيال. ومن خلال صورة شاعرية ومشاهد حية، يوثق الفيلم تفاصيل هذه الممارسة الشعبية بما تحمله من أهازيج ودعوات ولقاءات إنسانية، في محاولة للحفاظ على جزء أصيل من الموروث الثقافي الذي يواجه خطر الاندثار.',
    },
  },
  {
    title: 'ضُحِّيَ بهم لإطعام العالم /sacrificed to feed the world ',
    director: 'Islem zrelli',
    country: 'Tunisie',
    category: 'national',
    day: 28,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787271863/sacrificed_to_feed_the_world.jpg',
    genre: 'documentaire',
    synopsis: {
      en: 'Sacrificed to Feed the World tells the story of Gabès, a city in southern Tunisia that has endured decades of industrial pollution caused by the chemical complex. Through intimate testimonies and powerful imagery, the film reveals how pollution has reshaped everyday life, devastating the sea, contaminating agricultural land, and forcing local communities to pay the price with their health and livelihoods for an industry that produces fertilizers for the world.The documentary follows fishermen who have lost their sea, farmers whose land has been damaged, and families living with the growing burden of pollution-related illnesses and environmental degradation. Their stories paint a deeply human portrait of a community struggling to survive under the weight of environmental injustice. At the same time, the film highlights the unconventional forms of resistance led by Gabès youth. Turning culture into a tool of protest, they use rap music, graffiti art, and the chants of football ultras to challenge silence, reclaim public space, and amplify their fight for environmental justice. More than a film about pollution, Sacrificed to Feed the World is a story of resilience, creativity, and the determination of a community refusing to be sacrificed. It asks a fundamental question: who pays the price for feeding the world?',
      ar: '',
    },
  },
  {
    title: 'Breath/نفس',
    director: 'mohamed aziz sassi',
    country: 'Tunisie',
    category: 'national',
    day: 28,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243839/Breath%D9%86%D9%81%D8%B3.png',
    genre: 'fiction',
    synopsis: {
      en: 'A short film of a psychological and symbolic drama following Ibrahim, a plastic bottle collector who finds a strange gas mask that drags him into suffocating nightmares of pollution and illusion, turning his search for clean air into a desperate struggle for survival',
      ar: 'فيلم قصير دراما نفسية ورمزية يتابع إبراهيم، جامع القوارير البلاستيكية، الذي يعثر على قناع غاز غريب يجرّه إلى كوابيس خانقة بين التلوث والوهم، ليتحول بحثه عن أكسجين نقي إلى صراع مرعب يهدد حياته',
    },
  },
  {
    title: 'إِهْفِتْ/Chorea',
    director: 'Seif Flifel',
    country: 'Tunisie',
    category: 'national',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243845/Chorea_Poster_-_Djafar_Moussa.png',
    genre: 'fiction',
    synopsis: {
      en: 'Inspired by the main actor s real struggle as a male dancer in Tunisian society, Chorea narrates a story of resilience and discovery. Using the medium of choreography, the film attempts to reflect the journey of navigating early adulthood while trying to piece together the fragments of identity.',
      ar: 'الفيلم مستوحى من القصة الحقيقية للممّثل الرئيسي و المصاعب التي يواجهها كراقص في المجتمع التونسي. يروي "إِهْفِتْ" قصة عن الصمود و الاكتشاف, و يقدم, من خلال الرقص كوسيط فني, محاولة للتعبير و مناقشة رحلة التعلّم تزامنا مع السعي إلى بناء الذات.',
    },
  },
  {
    title: 'غبرة/Dust',
    director: 'Walid Ajroudi',
    country: 'Tunisie',
    category: 'national',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243829/%D8%BA%D8%A8%D8%B1%D8%A9Dust.png',
    genre: 'documentaire',
    synopsis: {
      en: 'In Tataouine, Saber lives among stone, wood and dust. With his hands, he shapes forms from materials carrying traces of the past, while the desire to leave remains ever-present. Between a workshop that mirrors his spirit and a town he keeps returning to, a portrait emerges of a man trying to understand his bond with a place—and what remains of it when he leaves.',
      ar: 'في تطاوين، يعيش صابر بين الحجر والخشب والغبار، يصنع بيديه أشكالاً من أثرٍ قديم، بينما تظلّ فكرة الرحيل حاضرة في حياته. بين ورشةٍ تشبهه، ومدينةٍ يعود إليها كلما ابتعد، تتشكل حكاية رجل يحاول أن يفهم علاقته بالمكان، وبما يبقى منه حين يرحل.',
    },
  },
  {
    title: 'حوح/Three days, three months',
    director: 'Saif Eddine Ben Ghozi',
    country: 'Tunisie',
    category: 'national',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787270521/7ou7.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'documentaire',
    synopsis: { en: '', ar: '"حُاحْ" رحلة في عالم الفلاح بحمّام الغزاز، وفي علاقته العميقة بالأرض التي عاش منها وتعلّق بها عبر أجيال. من خلال شهادات الفلاحين، يكتشف الفيلم مكانة الدرع كجزء من ذاكرة المدينة وثقافتها وعاداتها، قبل أن يكشف التحولات التي أصبحت تهدد هذا الإرث: البناء العشوائي والتوسع العمراني على حساب الأراضي الفلاحية، ملوحة المياه وتدهور البيئة، تراجع النشاط الفلاحي، وغياب رؤية واضحة ومستدامة لمستقبل الفلاحة، إلى جانب الضغوط العقارية التي تدفع بالأرض نحو التغيير. بين ذاكرة جيل عاش الفلاحة كطريقة حياة، وواقع جيل يحاول مواصلة العمل في ظروف أكثر صعوبة، يرصد الفيلم علاقة الإنسان بأرضه حين تصبح هذه الأرض نفسها مهددة بالاختفاء. وفي ختام الرحلة، تنتقل الحكاية من الحقل إلى المائدة، لتكشف كيف ارتبطت الدرع بعادات غذائية متوارثة، وكيف يمكن لاختفاء محصول أن يعني فقدان جزء من ذاكرة المكان وثقافته.' },
  },
  {
    title: 'بلدية 90 /  Municipality 90 ',
    director: 'Saîda Nasri et Anas Elech',
    country: 'Tunisie',
    category: 'national',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787270230/municipality90.png',
    genre: 'documentaire',
    synopsis: {
      en: 'In 1990, the small coastal town of Chebba witnessed an exceptional political experience. Left-wing independents, together with members of the Chebba cell of the Tunisian Communist Party, ran in the municipal elections on an opposition list called “The Independent List.” The list received broad popular support and won 15 seats, compared with only 3 seats for the Constitutional Democratic Rally (RCD), making it an exceptional case during Ben Ali’s rule. More than three decades later, the film returns to this experience through the testimonies of those who lived it: former activists, members of “The Independent List,” and witnesses of that period, including Saïda Nasri, one of the film’s co-directors, who took part in the elections as a volunteer polling-station observer. Through these testimonies, the film revisits the memory of a collective experience of political activism in Chebba, between nostalgia and a critical reading of the past. It questions the stakes, limitations, and significance of this experience, and what it can mean today as one of the rare examples of opposition political action under an authoritarian regime.',
      ar: '',
    },
  },
  {
    title: 'يجري/Running',
    director: 'Mohamed Karim Dahmouni & Mohamed Ali Maatoug',
    country: 'Tunisie',
    category: 'national',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243819/Running.jpg',
    genre: 'fiction',
    synopsis: {
      en: 'Massoud has spent all of his life running, trying to make something of himself. However, nothing seems to work out. No matter how hard he runs, life gives him nothing in return. After chasing things that lead nowhere, he finally finds what he is meant to do.',
      ar: 'بعد أن أمضى مسعود حياته كلها باحثا عن شيء يحقق به ذاته، اكتشف ألا شيء كان يستحق كل هذا العناء. فكل باب طرقه أُغلق في وجهه، وكل طريق سلكه لم يوصله إلى مبتغاه. وحينما أنهكه الركض، وتعب من ملاحقة أشياء لا جدوى منها، وجد أخيرا ما يمكنه التميز فيه.',
    },
  },
  {
    title: 'MONAD',
    director: 'Mohamed Elyes Kefi',
    country: 'Tunisie',
    category: 'national',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787243819/Monad.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'experimental',
    synopsis: { en: 'À compléter par la FTCA', ar: '' },
  },
    
//---------------------------- International films ----------------------------//


  {
    title: 'The Dead Of Three Villages',
    director: 'Muhammed Kaya',
    country: 'Türkiye',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787261309/The_Dead_Of_Three_Villages.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'experimental',
    synopsis: { en: 'In the early 1900s, a 38-year-old man rode through the villages of Diyarbakır on horseback. He fell off his horse and died at a crossroads between three villages. Children who witnessed this immediately informed their elders. Scholars from three religions (a Muslim Kurdish mullah, an Armenian Christian priest, and a Yazidi Kurdish sheikh) began discussing the deceased s religion in the village square, placing the deceased before them. The mullah, the sheikh, and the priest attempted to interpret the deceased s death from their own perspective. The mulla attributed the dirty and worn knees to prayer, Sheikh Halit attributed the injury to the sun, and the priest attributed it to his morning prayers to God. The mullah suggested that the man had been circumcised. Taybet Ana, an elderly villager, requested that the deceased be taken to her home to have his circumcision performed there. The deceased was taken to the old woman s house. The deceased, who was circumcised, was not Christian. The scholars of the three religions left the funeral to perform their religious duties. The mullah goes to perform ablution, but his arm hair is combed back. Noticing this, the mullah tells the religious scholars that the hair is combed back when performing ablution. Based on the mullah s suggestion, the man is examined. This claim is deemed insufficient. Three religious scholars, having determined that the man was Muslim due to the stone mark on his forehead, send him to wash the body. While washing the body, Gassal turns it over and notices the hammer and sickle tattoo on its back, summoning the religious scholars again. The three religious scholars stare at the tattoo.', ar: '' },
  },
   {
    title: 'Like an Orchid',
    director: 'Jana Bashir, Cheryl Chan, Julia Blaszczyk',
    country: 'Royaume-Uni',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787261539/Like_an_Orchid.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'experimental',
    synopsis: { en: 'Like an Orchid follows the story of an exhausted woman who steps into a crowded subway train, where she faces the horrors that are not talked about enough…', ar: '' },
  },
   
 {
    title: 'My Grandmother is a Skydiver',
    director: 'Polina Piddubna',
    country: 'Allemagne Ukraine',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787262046/My_Grandmother_is_a_Skydiver.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'experimental',
    synopsis: { en: 'Alfyia, a joyful young woman in 1960s Central Asia, is actively parachuting and studying to become a midwife, when she receives an extraordinary phone call from her granddaughter in 2022. She is worried about her grandmother s safety amid the invasion of Ukraine. In this intergenerational conversation across time and space, the granddaughter tries to restore and rethink family memory and her own ethnic identity, break the endless cycle of collective trauma and reflect on the meaning of human life.', ar: '' },
  },
  {
    title: 'Prayer',
    director: 'Sofia Geweiler',
    country: 'Portugale',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787263428/prayer.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'experimental',
    synopsis: { en: 'In a techno club in Lisbon, immigrant worker Abdul is on a video call with his wife, Aliyah, who is going into labor and begs him to be present, at least over the phone. At the same time, his colleague Maria desperately needs his help. Caught between work s demands and his son s birth, Abdul grapples with the fear of losing his job and the challenge of becoming a father from afar. On top of all that, he fights with his strict father-in-law for his right to perform the sacred tradition of reciting the Adhan for his newborn son. The film "Prayer", which explores the intersection of tradition, fatherhood, and the struggles of undocumented immigrant labor, is based on the autobiographical story of its screenwriter, Deo Mahameru. The project was created as a student film within the KinoEyes Joint European Film Masters at Lusofona University in Lisbon.', ar: '' },
  },
   {
    title: 'Profitable place',
    director: 'Alex Maximov',
    country: 'biélorussie',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787264668/Profitable_place.png',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'experimental',
    synopsis: { en: 'Some places in the world are better for business than others. And with the right skills, you don’t just meet demand — you create it.', ar: '' },
  },
    {
    title: 'Echo',
    director: 'Mohamed Masli',
    country: 'Libye',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787265253/ECHO.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'experimental',
    synopsis: { en: '', ar: '' },
  },
   {
    title: 'Qulpynai',
    director: 'Amir Salimzhan',
    country: 'Kazakhstan',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787265651/Qulpynai.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'experimental',
    synopsis: { en: 'A 7-year-old girl named Sulu and her 4-year-old sister Karlygash live in a village with their grandfather. They deeply miss their father, a pilot who was sent to the front lines. One day, they receive a letter supposedly from him, but since they don t know how to read, they have no idea what it says. Desperate to see him, the girls sneak into their grandfather s garage to build a wooden airplane and fly to their father.', ar: '' },
  },
   {
    title: 'The Badaro Complex',
    director: 'Adam Mabrouk',
    country: 'liban egypte',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787265786/The_Badaro_Complex.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'experimental',
    synopsis: { en: 'You, a clueless aspiring filmmaker, create your debut short film, while desperately seeking the approval of your idols', ar: '' },
  },
    {
    title: 'The Cause Of Water',
    director: 'Steven Chabre',
    country: 'Etats-Unis',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787265988/The_Cause_Of_Water.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'experimental',
    synopsis: { en: 'the Cause of Water Synopsis The Cause of Water is a film about movement, connection and meditation. A man and woman connect, separate, and connect as they traverse environments and states.  An old couch is their vehicle.  Meditation and musing are the screen on which it all unfolds.', ar: '' },
  },
  {
    title: 'Silk Spun',
    director: 'Marguerite Ranger',
    country: 'Canada Vietnam',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787267189/Silk_Spun.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'experimental',
    synopsis: { en: 'Blending memories, fiction, and confessions, Silk Spun tells the history of three generations of women from a Vietnamese family since their arrival in Quebec in 1975. In the intimacy and vulnerability of her intergenerational relationships, the director exposes the contextual disparities transforming the relationship to individual identity among the women of her family.', ar: '' },
  },
  {
    title: 'Allegory of the Cave',
    director: 'Wang Yajing',
    country: 'Chine',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787265049/Allegory_of_the_Cave.png',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'doc-experimental',
    synopsis: { en: 'This world is very chaotic, with many injustices and exploitation, gender conflicts and violent injuries, the law of the jungle and war killings, ideal struggles and shattered dreams;We should call for fairness and justice, love and peace, freedom and hope,encourage people to gain hope and happiness. ', ar: '' },
  },  {
    title: 'Image Burning',
    director: 'Ahmed Fayez',
    country: 'Egypte',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787268060/IMAGE_BURNING.png',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'fiction',
    synopsis: { en: 'A retired teacher, isolated on New Year’s Eve, lures a young woman into his quiet home. Their encounter forces him to confront a truth far more unsettling than his loneliness and one that reshapes both their lives.', ar: '' },
  },  {
    title: 'At last',
    director: 'Shazdeh Hachem',
    country: 'Liban',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787268291/at_last.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'fiction',
    synopsis: { en: 'Alain is 8 years old. At school, the students bully him and the blindness of the adults worsen his situation because they punish him for standing up for himself.', ar: '' },
  },

  {
    title: 'Malverde',
    director: 'Claudia Gordillo',
    country: 'Colombie',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787268291/malverde.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'fiction',
    synopsis: { en: 'Malverde narrates the rhythms of a land planted with sugarcane. An imposed plant that has recoded native nature and the ways in which human and non-human bodies move to survive. The story takes place in southern Valle del Cauca and northern Cauca, Colombia, and delves into a kind of journey and evocation, in what this extractivist landscape has become today.', ar: '' },
  },
    {
    title: 'Pruning',
    director: 'MOHAMMAD hemati',
    country: 'Iran',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787268632/pruning.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'fiction',
    synopsis: { en: 'At an age when most boys have long left the ritual behind, Ilya sets out on a journey to be circumcised. A passage expected to usher him into manhood. But as he travels, he discovers that being a man means something far different from what he has always believed.', ar: '' },
  },
    {
    title: 'Warden',
    director: 'SABAH MOHAMMADI',
    country: 'IRAN',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787268700/warning.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'fiction',
    synopsis: { en: 'Zivar, a middle-aged woman, is the supervisor of a student dormitory. She reacts harshly when a student returns late to the dorm. In her solitude, she feels guilty and tries to improve the situation', ar: '' },
  },
    {
    title: 'Al-Mamadani: The 501st Survivor',
    director: 'Anwar Mohammed Abulkhair, Deema Abd Alhady',
    country: 'Palestine',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787268815/Al-Mamadani_The_501st_Survivor.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'fiction',
    synopsis: { en: '.', ar: '' },
  },
    {
    title: 'Le Monde,',
    director: 'Mohammad Bakri',
    country: 'Palestine',
    category: 'ouverture',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787269074/le_monde_-_ouverture.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'fiction',
    synopsis: { en: 'Inside Le Monde, a café-restaurant, people of different ages and backgrounds are immersed in their private moments as a birthday celebration unfolds. In the background, a television quietly broadcasts images of the war in Gaza, largely ignored by those present. Only a seventy-year-old man sitting in a corner with his daughter seems to register what is happening. At the height of the celebration, he rises, accepts a cane from his daughter, and we realize that he is blind. He leaves the café in silence, prompting a quiet reflection on what it truly means to see.', ar: 'داخل مقهى-مطعم «لو موند»، ينغمس أشخاص من أعمار وخلفيات مختلفة في لحظاتهم الخاصة بينما تتواصل أجواء احتفال بعيد ميلاد. في الخلفية، يبثّ التلفاز بهدوء صورًا عن الحرب في غزة، فيتجاهلها معظم الحاضرين. وحده رجل في السبعين من عمره يجلس في زاوية برفقة ابنته يبدو أنه يلتقط ما يحدث. في ذروة الاحتفال، ينهض، تتناول ابنته عصًا وتضعها في يده، فنكتشف أنه كفيف. يغادر المقهى بصمت، فيفتح ذلك بابًا لتأمّل هادئ في معنى أن نرى حقًا.' },
  },
   
  {
    title: 'Empty Spaces,',
    director: 'Felipe Brum',
    country: 'Brésil',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787316473/Empty_Spaces.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'fiction',
    synopsis: { en: 'Elisa returns to her hometown, accompanying her mother, who shows signs of memory loss, as a last attempt to make her reconnect with the past. The trip becomes a bittersweet reflection about identity, loss and the search for connection, questioning what remains when memories and places, cease to exist.', ar: ''},
  },
  {
    title: 'Alone in Tehran',
    director: 'Amen sahraei',
    country: 'Iran',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787316615/Alone_in_Tehran.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'fiction',
    synopsis: { en: 'During the Israeli attacks on Iran and the evacuation of Tehran, she had no choice but to stay behind. In a silenced, nearly abandoned city, with nothing but her phone, she began to record the final days that felt like the end of everything. This is a war diary, raw, fragmented, intimate, and real. It captures the dread and beauty of surviving through isolation, violence, and the haunting quietness of a vanishing world. Shot in the streets and indoors during the active conflict, this film is not only a testimony to survival, but to the act of documenting when all else collapses', ar: '' },
  },
{
    title: 'Right, grandma?',
    director: 'Orsolya Szitka',
    country: 'Estonia, Hungary',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787317322/Right_grandma.jpg',
    // Aucun synopsis fourni -> genre non déductible, 'fiction' posé par défaut
    // uniquement pour respecter le type, à valider/corriger.
    genre: 'fiction',
    synopsis: { en: 'After months of avoiding the inevitable, Anna returns to her grandmother, paralyzed and voiceless after a stroke, able to communicate only through her eyes. In the silence between them, guilt and love slowly unravel, opening a fragile path toward reconnection.', ar: '' },
  },
  {
    title: 'Right, grandma?',
    director: 'Orsolya Szitka',
    country: 'Estonia, Hungary',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787317322/Right_grandma.jpg',
    genre: 'fiction',
    synopsis: { en: 'After months of avoiding the inevitable, Anna returns to her grandmother, paralyzed and voiceless after a stroke, able to communicate only through her eyes. In the silence between them, guilt and love slowly unravel, opening a fragile path toward reconnection.', ar: '' },
  },

   {
    title: 'Before you gone',
    director: 'Xie ChIa-Ping',
    country: 'Taïwan',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787317609/Before_you_gone.jpg',
    genre: 'fiction',
    synopsis: { en: 'Today, It’s a year after you gone, I sit in front of you and telling you about the past of our family , as well as my deepest longing and regrets for you. Emotions weave between memory and reality, leaving behind what was never spoken. 〈Before you gone〉 adopts a personal narrative approach, interweaving real imagery with hand-drawn animation to capture emotions that are difficult to document within memory.', ar: '' },
  },
   {
    title: 'A Single Applause',
    director: 'Maria Lapshina - Мария Лапшина',
    country: 'Russie',
    category: 'international',
    day: 29,
    posterUrl: 'https://res.cloudinary.com/ykjb5rh5/image/upload/v1787317815/A_Single_Applause.jpg',
    genre: 'fiction',
    synopsis: { en: 'A father, worn down by the routine of everyday life, comes to a children’s play with his daughter and unexpectedly becomes part of the performance himself. He has no idea how profoundly this moment will change his life.', ar: '' },
  },

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

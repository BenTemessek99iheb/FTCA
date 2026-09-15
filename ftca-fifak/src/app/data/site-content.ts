/**
 * SITE CONTENT
 * Typed data structures for all sections
 * Extracted from prototype HTML, ready for API integration
 */

import { assetUrl } from '../shared/asset-url';

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
      "Naissance du mouvement amateur à Kélibia, porté par des passionnés de cinéma réunis autour d'un projecteur 8mm.",
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
    year: "Aujourd'hui",
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
    description:
      'Soutenir la création indépendante à travers tout le territoire tunisien.',
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
      "Faire circuler les films amateurs tunisiens en Tunisie comme à l'international.",
  },
  {
    icon: 'fa-solid fa-globe',
    title: 'Échanges culturels',
    description:
      'Connecter les cinéastes tunisiens aux réseaux amateurs internationaux.',
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
    description:
      'Des professionnels du cinéma et de la culture évaluent chaque édition.',
  },
  {
    num: '04',
    title: 'Palmarès',
    description:
      "Les films primés rejoignent l'histoire du festival et sa mémoire collective.",
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
  { label: 'Compétition', value: 'Appel à films fermé' },
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
  /** Variante .webp de `image`, générée par `npm run optimize-assets` (voir lqip-manifest.json) */
  webpImage?: string;
  /** Placeholder flou base64 affiché pendant le chargement lazy de `image` */
  lqip?: string;
  link: string;
  /** Langue de `title`/`excerpt` — 'ar' bascule le rendu en RTL + police --arabe (voir articles-section). Absent = 'fr' (comportement existant, inchangé). */
  lang?: 'fr' | 'ar';
}

export const ARTICLE_CARDS: ArticleCard[] = [
  {
    category: 'FIFAK 2026',
    date: '30 Août 2026',
    title: 'La Presse - FIFAK 2026 : Identités croisées et Ghazawiyet',
    excerpt:
      'Troisième journée de la 39e édition du Fifak, marquée par une soirée spéciale « Ghazawiyet » dédiée à la Palestine et aux femmes de Gaza.',
    image: assetUrl('article-lapresse-ghazawiyet'),
    webpImage: assetUrl('article-lapresse-ghazawiyet'),
    lqip: 'data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAABwBACdASoYAA8APu1iqU2ppaOiMAgBMB2JbACdAYq+5cEW5tbAHiq1blRwKAD+9DLYzmcTikJWYdiTIQ2JrYtktHUK2HGqKDji0ksIYLDmm1iQFbiH496Qzr/JZo3RkH+Bk/tp7E32PuDHctTe+eb7A5G8j1q76e3lH/jxd0f4u7bfjt38F8xLj6AAAA==',
    link: 'https://www.lapresse.tn/2026/08/28/fifak-2026-identites-croisees-et-ghazawiyet/?fbclid=IwY2xjawUWI-BwZG9mBWV4dG4DYWVtAjExAHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR4fQW2jOQxeFFdKOLCyhp7qz33wGKSrQdtc_wH4hS9mVgIydjO0iGJ4OINfEw_aem_SENCptiCOHRsbIvo-FrRLg',
  },
  {
    category: 'FIFAK 2026',
    date: '30 Août 2026',
    title:
      'الإخبارية التونسية - "واردن" يحصد الصقر الذهبي والسينما التونسية تتوّج',
    excerpt:
      'فاز الفيلم الإيراني "واردن" بجائزة الصقر الذهبي، بينما توّج الفيلم التونسي "العود" بالجائزة الكبرى في المسابقة الوطنية.',
    image: assetUrl('article-alikhbaria-warden'),
    webpImage: assetUrl('article-alikhbaria-warden'),
    lqip: 'data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAACwAwCdASoYAA8APu1iqU2ppaOiMAgBMB2JaAAAVGNl/BXTsxiKgAD+jTefXv5ykhyMntNvkNuU46mpMx09UaG3TGTAhflbnCywCcv/Q//A/0+bhhhIpJcmVk8f+DSfoKY7Ln22VnTWjHwfNDKSTDMWVSopLdu998LFerAA',
    link: 'https://www.alikhbariaattounsia.com/2026/08/30/%d8%a7%d8%ae%d8%aa%d8%aa%d8%a7%d9%85-%d9%85%d9%87%d8%b1%d8%ac%d8%a7%d9%86-%d9%82%d9%84%d9%8a%d8%a8%d9%8a%d8%a9-%d9%84%d9%81%d9%8a%d9%84%d9%85-%d8%a7%d9%84%d9%87%d9%88%d8%a7%d8%a9-%d9%88%d8%a7/?fbclid=IwY2xjawUWI7VwZG9mBWV4dG4DYWVtAjExAHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR6ChxzN8D605U-T2JrjrT-ExvzTYJ-4vz2sKKOqqnUMKyNU0MnQNTiWkG9ghw_aem_ZEbed-uAeF1vSSS6a1rbcA',
    lang: 'ar',
  },
  {
    category: 'FIFAK 2026',
    date: '30 Août 2026',
    title: 'Assabah News - نتائج المسابقتين الدولية والوطنية للدورة 39',
    excerpt:
      'توزيع الجوائز على الأفلام الفائزة في المسابقتين الدولية والوطنية، وسط عروض فنية وتكريمات لشخصيات سينمائية راحلة.',
    image: assetUrl('article-assabahnews-cloture'),
    webpImage: assetUrl('article-assabahnews-cloture'),
    lqip: 'data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAABwBACdASoYAAwAPu1iqk2ppaQiMAgBMB2JZACdL1yByzs50peIjDNtNgYMAAD+rxEmqGtaRMOf8AtZz8TRIaa/jHvnB93wp/DsqWIOzijAnUe9M4i9atzdJtaIWiKEEEKdpmiK0xBM/js2hCWeYR1fm9la3FGd+6EfVFFEwQmP0ohAEAhX9Ulwyw96ZAAA',
    link: 'https://www.assabahnews.tn/ar/%D8%AB%D9%82%D8%A7%D9%81%D8%A9/%D9%81%D9%86%D9%88%D9%86/153128-%D8%A7%D8%AE%D8%AA%D8%AA%D8%A7%D9%85-%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9-39-%D9%84%D9%84%D9%85%D9%87%D8%B1%D8%AC%D8%A7%D9%86-%D8%A7%D9%84%D8%AF%D9%88%D9%84%D9%8A-%D9%84%D9%81%D9%8A%D9%84%D9%85-%D8%A7%D9%84%D9%87%D9%88%D8%A7%D8%A9-%D8%A8%D9%82%D9%84%D9%8A%D8%A8%D9%8A%D8%A9-%D9%86%D8%AA%D8%A7%D8%A6%D8%AC-%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%A8%D9%82%D8%AA%D9%8A%D9%86-%D8%A7%D9%84%D8%AF%D9%88%D9%84%D9%8A%D8%A9-%D9%88%D8%A7%D9%84%D9%88%D8%B7%D9%86%D9%8A%D8%A9',
    lang: 'ar',
  },
  {
    category: 'FIFAK 2026',
    date: '30 Août 2026',
    title:
      'Radio Monastir - اختتام فعاليات الدورة 39 للمهرجان الدولي لفيلم الهواة بقليبية',
    excerpt:
      'أسدل الستار في ساعة متأخرة من ليلة السبت-الأحد على فعاليات الدورة 39، مع الإعلان عن نتائج المسابقتين الدولية والوطنية.',
    image: assetUrl('article-radiomonastir-cloture'),
    webpImage: assetUrl('article-radiomonastir-cloture'),
    lqip: 'data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAABwBACdASoYAAwAPu1iqk2ppaQiMAgBMB2JZACdL1yByzs50peIjDNtNgYMAAD+rxEmqGtaRMOf8AtZz8TRIaa/jHvnB93wp/DsqWIOzijAnUe9M4i9atzdJtaIWiKEEEKdpmiK0xBM/js2hCWeYR1fm9la3FGd+6EfVFFEwQmP0ohAEAhX9Ulwyw96ZAAA',
    link: 'https://www.radiomonastir.tn/article/6a93faaa07af205440528b22/%D8%A7%D8%AE%D8%AA%D8%AA%D8%A7%D9%85-%D9%81%D8%B9%D8%A7%D9%84%D9%8A%D8%A7%D8%AA-%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9-39-%D9%84%D9%84%D9%85%D9%87%D8%B1%D8%AC%D8%A7%D9%86-%D8%A7%D9%84%D8%AF%D9%88%D9%84%D9%8A-%D9%84%D9%81%D9%8A%D9%84%D9%85-%D8%A7%D9%84%D9%87%D9%88%D8%A7%D8%A9-%D8%A8%D9%82%D9%84%D9%8A%D8%A8%D9%8A%D8%A9?fbclid=IwY2xjawUWI6RwZG9mBWV4dG4DYWVtAjExAHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR4IP4ZMyXFbuW-YWwARHWm82Z_Wgbb4_0GFCmoQrwakXej5eBQ7il1xBLX9xw_aem_5I7r9NaSteITx76K1LRrDw',
    lang: 'ar',
  },
  {
    category: 'FIFAK 2026',
    date: '30 Août 2026',
    title:
      'Radio Nationale - الفيلم الإيراني "واردن" يحصل على جائزة الصقر الذهبي',
    excerpt:
      'اختتمت الدورة 39 للمهرجان الدولي لفيلم الهواة بقليبية بفوز الفيلم الإيراني "واردن" بجائزة الصقر الذهبي، من بين 28 فيلمًا من مختلف الأصناف والبلدان.',
    image: assetUrl('article-radiotunisienne-warden'),
    webpImage: assetUrl('article-radiotunisienne-warden'),
    lqip: 'data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAACwAwCdASoYAA4APu1kq04ppaQiMAgBMB2JaAAAQqHdcsupHA5mAAD+jTe7G5qLvohSswf5hifECQYtvsvCdR7PM+7v/H17nYP23BFdr6C3ZeSn7vP6pwegKvISHOpRD3xGP/t9mQPZxWmCT7PbX5qpbAzeR3r8AAA=',
    link: 'https://www.radionationale.tn/article/6a93fb0c07af20544052cfcc/%D8%A7%D9%84%D9%85%D9%87%D8%B1%D8%AC%D8%A7%D9%86-%D8%A7%D9%84%D8%AF%D9%88%D9%84%D9%8A-%D9%84%D9%81%D9%84%D9%85-%D8%A7%D9%84%D9%87%D9%88%D8%A7%D8%A9-%D8%A8%D9%82%D9%84%D9%8A%D8%A8%D9%8A%D8%A9-%D8%A7%D9%84%D9%81%D9%8A%D9%84%D9%85-%D8%A7%D9%84%D8%A5%D9%8A%D8%B1%D8%A7%D9%86%D9%8A-%D9%88%D8%A7%D8%B1%D8%AF%D9%86-%D9%8A%D8%AD%D8%B5%D9%84-%D8%B9%D9%84%D9%89-%D8%AC%D8%A7%D8%A6%D8%B2%D8%A9-%D8%A7%D9%84%D8%B5%D9%82%D8%B1-%D8%A7%D9%84%D8%B0%D9%87%D8%A8%D9%8A?fbclid=IwY2xjawUWI5NwZG9mBWV4dG4DYWVtAjExAHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR42EfXCXqyikK3xJ0oQcoRsm-FIcj5KAuqKnsOylIflhowyqRDdMn3DttkIIA_aem_-2c7KYugHRv2DabNjAVkmQ',
    lang: 'ar',
  },
  {
    category: 'FIFAK 2026',
    date: '30 Août 2026',
    title: 'Safa News - اختتام الدورة 39 للمهرجان الدولي لفيلم الهواة بقليبية',
    excerpt:
      'أسدل الستار يوم السبت 29 أوت 2026 على فعاليات الدورة التاسعة والثلاثين من المهرجان الدولي لفيلم الهواة بقليبية.',
    image: assetUrl('article-safanews-cloture'),
    webpImage: assetUrl('article-safanews-cloture'),
    lqip: 'data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAADQAwCdASoYAA4APu1iqU2ppaOiMAgBMB2JQBYdg9E8dlomm1rPq8AA/uc7xKen31tE97+Bmu3vVfdrlsM1DyFlUc7JfZDdarkk4GFgxCV8XCcuRN2HR1DqRCSpuEZQEPsrxTZX6dUgDf44FtNH12nT41v6+c2RGmwUAAAA',
    link: 'https://www.safanews.net/%D8%A7%D8%AE%D8%AA%D8%AA%D8%A7%D9%85-%D8%A7%D9%84%D9%81%D9%8A%D9%81%D8%A7%D9%83%D8%A7%D9%84%D9%85%D9%87%D8%B1%D8%AC%D8%A7%D9%86-%D8%A7%D9%84%D8%AF%D9%88%D9%84%D9%8A-%D9%84%D9%81%D9%8A%D9%84%D9%85/?fbclid=IwY2xjawUWI4hwZG9mBWV4dG4DYWVtAjExAHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR4IlBkcQKmVS1AwC1qEiHx70KwI-asRGEHxJ-Wrgiz4lahuyN5yWSOAMz5Evg_aem_XHjfGzoDUmIHRv_o0IvRGw',
    lang: 'ar',
  },
  {
    category: 'FIFAK 2026',
    date: '12 Août 2026',
    title: 'La Presse - FIFAK 2026 : Une édition charnière',
    excerpt:
      "La 39éme Edition du FIFAK 2026 promet d'être particulièrement marquante.",
    image: assetUrl('image-presse'),
    webpImage: assetUrl('image-presse'),
    lqip: 'data:image/webp;base64,UklGRrgAAABXRUJQVlA4IKwAAABQBACdASoYAA4APu1iqU2ppaOiMAgBMB2JaQAD5gHb6/wch+1v7UUctvYAAP7SZJleNNH+rMJNFnUKhg5cz56Yqo+6t77X4Ms+tm2xfMykIn7XDMvKlf9KCwJ+G27jENgcatblQTeyyo6EUp3ZNMI/5waX/Su8N1oM4EPVPJ1n7O3k2smLjudL7ZhYCDzZ1Pkop+pTT1k/RwRXKCXVT25L6j/Vx3DxqvZAOIAA',
    link: 'https://www.lapresse.tn/2026/07/16/fifak-2026-une-edition-charniere/?fbclid=IwY2xjawTtRTJwZG9mBWV4dG4DYWVtAjExAHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7MpuzETCUecgSNF20U6olfib-cAtm_UPYM5-FmscoUK6oifepbqSQsu0Y_VQ_aem_ANwjXywjhdyGgN6gEq6Y-g',
  },
  {
    category: 'Fédération',
    date: '23 Août 2026',
    title: 'Retour sur 60 ans de cinéma amateur à Kélibia',
    excerpt:
      "Un regard sur l'histoire de la FTCA et l'évolution du mouvement amateur en Tunisie.",
    image: assetUrl('ftca-logo-mark'),
    webpImage: assetUrl('ftca-logo-mark'),
    lqip: 'data:image/webp;base64,UklGRoYCAABXRUJQVlA4WAoAAAAQAAAAFwAAFwAAQUxQSHMBAAABkGvb1rE965z3V2zbL2LbTmXbNjqnNKrU6n70sXMDtm3nxQk+XUJETEAH10vrN18wtH7gpW7voaQWvG29EQDBd5E0CHmH56ApPBfNZMb8TrmZPAoFcbJwGL2j3ZjRveqCZDNy1Zjhw8evX9fbySzDWhtGgO+SJ2lEHcdRpfFqaOshKAgZOszrT/sWTfsigAAq/ynT1jdevOXTj9vL0DlVUEcUEBqXbti9ptR+W9KX2TPI43AnFKG6V0TbYgt/2XQKdtaputlOoPwv+KUW2pde9elw6IL9tLE4ICq4/727bvu2JUkU2xlFAKFNqUWWMrLwbNtmhaAqaZI4icL4wSyE1IJbZj9+x2aJHalIXnOvBnnN2lQDr8yev/xm9nFph35UufRxLfWvvVuc4tnzr4ldXnpwAFXv2RYaPbIN4JfYh08/Qvt4c3sVys1Y3Y3Ks1Z1gqDMIrPE9hQqmQr+rmsnT5+6dLR1s8Bz3SDwXTcIPLdNFwBWUDgg7AAAALAGAJ0BKhgAGAA+7WKnTqmlIyIwGAwBMB2JZADADQE/+l0qCT1fT1X9gCkKVfhFaB5uuTV8wAjIYf8wqPgAAP7t4CUK5JPUFu9XkFZsFshhHNxmKuGw5yzKUziBkQS+/3Hkj2fWsd/yAKVLWwvyjmUNsJFtcd7pNwggJPludeRuyE578LQFH4Zx3uv5DpLK5zWn0cT7ICByFqfecYxdTQPWq6FXalZPPIS6Ctu4ESDTH2KznrqcR2vzTjtGM5qj4zrpbvkGgkcx5cf/rNBdJ7fY+3P0MYsp7ROTmjeYmT0aAqX9s7d/3iEQQAAA',
    link: '#',
  },
  {
    category: 'Formation',
    date: '23 Août 2026',
    title: 'Nouveaux ateliers de réalisation ouverts aux jeunes cinéastes',
    excerpt: 'La FTCA lance un cycle de formations gratuites.',
    image: assetUrl('fifak-wallp'),
    webpImage: assetUrl('fifak-wallp'),
    lqip: 'data:image/webp;base64,UklGRrgAAABXRUJQVlA4IKwAAACwBACdASoYAAwAPu1iqU2ppaOiMAgBMB2JZACdMoAlvBWsyfvSPxm9T4LNoTgAAP7p/zSWr1XyJ6OjvSgPNgjs5qcPxeWlNjHjkbCrC2nvHAlK8v7HUyNQexDZ5oSS+JFHEyYco5Sd9SSK4gWepw+5Ws1lSTJOxT4+zkw/KanoyYYWuv7q9JmF93lcj8PK+A7JYmfRnA25wpdTlD7yYZQqy6XlmYae93hFwAAA',
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
  { value: '60+', label: "Années d'existence et de transmission" },
  { value: '39', label: 'Éditions du FIFAK organisées à Kélibia' },
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
  /** Variante .webp de bgImageUrl (générée par npm run optimize-assets), utilisée en priorité + préchargée */
  bgImageWebp?: string;
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
    "La FTCA fait vivre le cinéma amateur tunisien depuis des décennies : formation, création, transmission — et l'organisation du plus ancien festival de films amateurs au monde.",
  actions: [
    {
      label: 'Découvrir FIFAK 2026',
      variant: 'solid',
      routerLink: '/fifak-2026',
    },
    {
      label: 'Notre histoire',
      variant: 'ghost',
      routerLink: '/',
      fragment: 'ftca',
    },
  ],
  badgeNumber: 'N°39',
  badgeLines: ['Édition', 'FIFAK 2026'],
  bgImageUrl: assetUrl('wallp'),
  bgImageWebp: assetUrl('wallp'),
  bgPosition: 'center 30%',
};

/**
 * PALMARÈS — types
 * Palmarès 2026 : compétition internationale, compétition nationale, prix parallèles.
 */

import { ProgrammeFilm } from '../../../data/fifak-2026-content';

/** Catégorie de prix. Les libellés associés vivent dans AWARD_CATEGORY_LABELS. */
export enum AwardCategory {
  SPECIAL_MENTION = 'special-mention',
  BEST_DOCUMENTARY = 'best-documentary',
  BEST_ANIMATION_EXPERIMENTAL = 'best-animation-experimental',
  BEST_FICTION = 'best-fiction',
  JURY_AWARD = 'jury-award',
  GOLDEN_FALCON = 'golden-falcon',
  FIRST_MENTION = 'first-mention',
  SECOND_MENTION = 'second-mention',
  THIRD_MENTION = 'third-mention',
  BEST_SCHOOL_FILM = 'best-school-film',
  BEST_AMATEUR_FILM = 'best-amateur-film',
  GRAND_PRIZE = 'grand-prize',
  MUNICIPALITY_MENTION = 'municipality-mention',
  MUNICIPALITY_AWARD = 'municipality-award',
  AMNESTY_AWARD = 'amnesty-award',
  VOLUNTEERS_AWARD = 'volunteers-award',
  WOMEN_ISSUES_AWARD = 'women-issues-award',
  TECHNICAL_AWARD = 'technical-award',
}

export const AWARD_CATEGORY_LABELS: Record<AwardCategory, string> = {
  [AwardCategory.SPECIAL_MENTION]: 'Mention spéciale',
  [AwardCategory.BEST_DOCUMENTARY]: 'Meilleur documentaire',
  [AwardCategory.BEST_ANIMATION_EXPERIMENTAL]: 'Meilleur film expérimental / animation',
  [AwardCategory.BEST_FICTION]: 'Meilleure fiction',
  [AwardCategory.JURY_AWARD]: 'Prix spécial du jury',
  [AwardCategory.GOLDEN_FALCON]: "Faucon d'or",
  [AwardCategory.FIRST_MENTION]: '1ère mention',
  [AwardCategory.SECOND_MENTION]: '2ème mention',
  [AwardCategory.THIRD_MENTION]: '3ème mention',
  [AwardCategory.BEST_SCHOOL_FILM]: 'Meilleur film école',
  [AwardCategory.BEST_AMATEUR_FILM]: 'Meilleur film amateur',
  [AwardCategory.GRAND_PRIZE]: 'Grand Prix',
  [AwardCategory.MUNICIPALITY_MENTION]: 'Mention — Prix de la Municipalité de Kélibia',
  [AwardCategory.MUNICIPALITY_AWARD]: 'Prix de la Municipalité de Kélibia',
  [AwardCategory.AMNESTY_AWARD]: 'Prix Amnesty International Tunisie',
  [AwardCategory.VOLUNTEERS_AWARD]: 'Prix spécial des bénévoles',
  [AwardCategory.WOMEN_ISSUES_AWARD]: 'Prix Yasser Jaradi — Causes féminines',
  [AwardCategory.TECHNICAL_AWARD]: 'Prix du matériel technique',
};

export type PalmaresSection = 'international' | 'national' | 'sidebar';

export const PALMARES_SECTION_LABELS: Record<PalmaresSection, string> = {
  international: 'Compétition Internationale',
  national: 'Compétition Nationale',
  sidebar: 'Prix Parallèles',
};

/** 'featured' = grands prix (Faucon d'or, Grand Prix) rendus en médaillon laurier ; 'standard' = tous les autres prix. */
export type PalmaresProminence = 'featured' | 'standard';

export interface PalmaresFilm {
  id: string;
  title: string;
  director: string;
  country: string;
  posterUrl: string;
  category: AwardCategory;
  section: PalmaresSection;
  prominence: PalmaresProminence;
  /** Structure de production/club/école créditée (ex: "Club FTCA Kélibia", "Indépendant") */
  structure?: string;
  /** Film complet — permet d'ouvrir le modal de détail existant (app-film-detail-modal) au clic sur le lauréat */
  programmeFilm: ProgrammeFilm;
}

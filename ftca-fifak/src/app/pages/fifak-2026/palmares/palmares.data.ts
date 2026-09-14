/**
 * PALMARÈS 2026 — data
 * Chaque prix référence son film via PROGRAMME_FILMS (poster, pays, réalisateur déjà
 * typés là-bas) plutôt que de dupliquer ces champs — voir PALMARES.md.
 */

import { PROGRAMME_FILMS, ProgrammeFilm } from '../../../data/fifak-2026-content';
import { AwardCategory, PalmaresFilm, PalmaresProminence, PalmaresSection } from './palmares.model';

/**
 * Résout un film primé par un fragment de titre unique dans PROGRAMME_FILMS.
 * Échoue au chargement si le fragment ne correspond à aucun film ou à plusieurs —
 * les titres de la source d'origine du palmarès diffèrent souvent légèrement
 * (translittération, ponctuation) de ceux déjà saisis dans le programme.
 */
function requireFilm(titleFragment: string): ProgrammeFilm {
  const matches = PROGRAMME_FILMS.filter((f) => f.title.includes(titleFragment));
  if (matches.length !== 1) {
    throw new Error(
      `Palmarès: "${titleFragment}" doit correspondre à exactement un film de PROGRAMME_FILMS (trouvé ${matches.length})`
    );
  }
  return matches[0];
}

let nextId = 0;

interface AwardOverrides {
  prominence?: PalmaresProminence;
  structure?: string;
  director?: string;
}

function award(
  titleFragment: string,
  category: AwardCategory,
  section: PalmaresSection,
  overrides: AwardOverrides = {}
): PalmaresFilm {
  const film = requireFilm(titleFragment);
  nextId += 1;
  return {
    id: `palmares-${nextId}`,
    title: film.title,
    director: overrides.director ?? film.director,
    country: film.country,
    posterUrl: film.posterUrl,
    category,
    section,
    prominence: overrides.prominence ?? 'standard',
    structure: overrides.structure ?? film.sousCategorie?.trim() ?? film.Prod?.trim(),
    programmeFilm: film,
  };
}

export const PALMARES_FILMS: PalmaresFilm[] = [
  // ============================================================
  // COMPÉTITION INTERNATIONALE
  // ============================================================
  award('At last', AwardCategory.SPECIAL_MENTION, 'international'),
  award('Erasure', AwardCategory.SPECIAL_MENTION, 'international'),
  award('Echo', AwardCategory.SPECIAL_MENTION, 'international'),
  award('Silk Spun', AwardCategory.BEST_DOCUMENTARY, 'international'),
  award('Allegory of the Cave', AwardCategory.BEST_ANIMATION_EXPERIMENTAL, 'international'),
  award('Prayer', AwardCategory.BEST_FICTION, 'international'),
  award('Heavenbound', AwardCategory.JURY_AWARD, 'international'),
  award('Warden', AwardCategory.GOLDEN_FALCON, 'international', { prominence: 'featured' }),

  // ============================================================
  // COMPÉTITION NATIONALE
  // ============================================================
  award('Chorea', AwardCategory.FIRST_MENTION, 'national'),
  award('Good Boy', AwardCategory.SECOND_MENTION, 'national'),
  award('The Omnipresent', AwardCategory.THIRD_MENTION, 'national'),
  award('Family Booklet', AwardCategory.BEST_SCHOOL_FILM, 'national'),
  award('Three days, three months', AwardCategory.BEST_AMATEUR_FILM, 'national'),
  award('the buried', AwardCategory.JURY_AWARD, 'national'),
  award('Heavenbound', AwardCategory.GRAND_PRIZE, 'national', { prominence: 'featured' }),

  // ============================================================
  // PRIX PARALLÈLES
  // ============================================================
  award('Breath', AwardCategory.MUNICIPALITY_MENTION, 'sidebar'),
  award('Three days, three months', AwardCategory.MUNICIPALITY_AWARD, 'sidebar'),
  award('sacrificed to feed the world', AwardCategory.AMNESTY_AWARD, 'sidebar'),
  award('Three days, three months', AwardCategory.VOLUNTEERS_AWARD, 'sidebar', {
    structure: 'Club Cinéma Hamam El-Ghazzaz',
  }),
  award('the buried', AwardCategory.WOMEN_ISSUES_AWARD, 'sidebar'),
  // Crédité au technicien (Anes El-Ach) plutôt qu'à l'équipe de réalisation complète
  // du film — spécifique à ce prix technique.
  award('Municipality 90', AwardCategory.TECHNICAL_AWARD, 'sidebar', { director: 'Anes El-Ach' }),
];

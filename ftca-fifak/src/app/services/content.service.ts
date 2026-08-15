import { Injectable } from '@angular/core';
import {
  TimelineItem,
  MissionItem,
  FifakCard,
  ArchiveEdition,
  Fifak2026Row,
  ArticleCard,
} from '../data/site-content';
import {
  TIMELINE_ITEMS,
  MISSION_ITEMS,
  FIFAK_CARDS,
  ARCHIVE_EDITIONS,
  FIFAK_2026_ROWS,
  ARTICLE_CARDS,
} from '../data/site-content';
import { ProgrammeFilm, JuryMember, NashriyaEntry } from '../data/fifak-2026-content';
import { PROGRAMME_FILMS, JURY_MEMBERS, NASHRIYA_ENTRIES } from '../data/fifak-2026-content';

/**
 * Content service — provides typed content data
 * Currently returns static data; can be swapped for API calls later
 */
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  getTimelineItems(): TimelineItem[] {
    return TIMELINE_ITEMS;
  }

  getMissionItems(): MissionItem[] {
    return MISSION_ITEMS;
  }

  getFifakCards(): FifakCard[] {
    return FIFAK_CARDS;
  }

  getArchiveEditions(): ArchiveEdition[] {
    return ARCHIVE_EDITIONS;
  }

  getFifak2026Rows(): Fifak2026Row[] {
    return FIFAK_2026_ROWS;
  }

  getArticleCards(): ArticleCard[] {
    return ARTICLE_CARDS;
  }

  getProgrammeFilms(): ProgrammeFilm[] {
    return PROGRAMME_FILMS;
  }

  getJuryMembers(): JuryMember[] {
    return JURY_MEMBERS;
  }

  getNashriyaEntries(): NashriyaEntry[] {
    return NASHRIYA_ENTRIES;
  }
}

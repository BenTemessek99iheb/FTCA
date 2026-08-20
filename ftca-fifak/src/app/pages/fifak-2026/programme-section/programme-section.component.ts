import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from '../../../directives/reveal-on-scroll.directive';
import { ContentService } from '../../../services/content.service';
import { PROGRAMME_DAYS } from '../../../data/fifak-2026-content';
import { FilmCardComponent } from '../../../components/film-card/film-card.component';

/**
 * Nombre de films affichés dans la preview (landing FIFAK 2026). Choisi
 * pour remplir une grille 4 colonnes desktop sur deux rangées ; le
 * catalogue complet (50+ films) vit sur /fifak-2026/programme.
 */
const PREVIEW_LIMIT = 8;

@Component({
  selector: 'app-programme-section',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealOnScrollDirective, FilmCardComponent],
  templateUrl: './programme-section.component.html',
  styleUrls: ['./programme-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammeSectionComponent {
  private readonly allFilms = this.contentService.getProgrammeFilms();

  readonly previewFilms = this.allFilms.slice(0, PREVIEW_LIMIT);
  readonly totalFilms = this.allFilms.length;
  readonly days = PROGRAMME_DAYS;

  constructor(private contentService: ContentService) {}
}

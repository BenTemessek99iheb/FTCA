import { Component, ChangeDetectionStrategy, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgrammeFilm, PROGRAMME_CATEGORY_LABELS } from '../../data/fifak-2026-content';

/**
 * Carte film réutilisée par la preview programme (landing FIFAK 2026) et
 * la page complète /fifak-2026/programme — un seul endroit à faire évoluer
 * pour les deux usages.
 */
@Component({
  selector: 'app-film-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent {
  @Input({ required: true }) film!: ProgrammeFilm;

  readonly categoryLabels = PROGRAMME_CATEGORY_LABELS;
  readonly expanded = signal(false);

  toggleExpanded(): void {
    this.expanded.update((v) => !v);
  }
}

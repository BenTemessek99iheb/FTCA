import { Component, ChangeDetectionStrategy, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgrammeFilm, PROGRAMME_CATEGORY_LABELS, FILM_GENRE_LABELS } from '../../data/fifak-2026-content';

type SynopsisLang = 'en' | 'ar';

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
  readonly genreLabels = FILM_GENRE_LABELS;

  readonly expanded = signal(false);
  readonly activeLang = signal<SynopsisLang>('en');

  readonly hasArabic = computed(() => !!this.film.synopsis.ar);
  readonly activeSynopsis = computed(() =>
    this.activeLang() === 'ar' ? this.film.synopsis.ar : this.film.synopsis.en
  );

  toggleExpanded(): void {
    this.expanded.update((v) => !v);
  }

  setLang(lang: SynopsisLang): void {
    if (lang === this.activeLang()) return;
    this.activeLang.set(lang);
    this.expanded.set(false);
  }
}

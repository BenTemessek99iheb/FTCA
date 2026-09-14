import { Component, ChangeDetectionStrategy, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AWARD_CATEGORY_LABELS, PalmaresFilm } from '../palmares.model';
import { LaureateLaurelsComponent } from '../../../../components/laureate-laurels/laureate-laurels.component';
import { FilmDetailModalComponent } from '../../../../components/film-detail-modal/film-detail-modal.component';

/**
 * Carte de lauréat — pas de panneau/fond propre, s'intègre directement au
 * fond de la section (lauriers, catégorie du prix, film). Seule la catégorie
 * est cliquable (bouton) : ouvre le modal de détail film existant
 * (app-film-detail-modal), avec le nom du prix en tête.
 */
@Component({
  selector: 'app-laureate-certificate',
  standalone: true,
  imports: [CommonModule, LaureateLaurelsComponent, FilmDetailModalComponent],
  templateUrl: './laureate-certificate.component.html',
  styleUrls: ['./laureate-certificate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaureateCertificateComponent {
  @Input({ required: true }) film!: PalmaresFilm;

  readonly detailOpen = signal(false);

  get categoryLabel(): string {
    return AWARD_CATEGORY_LABELS[this.film.category];
  }

  get isFeatured(): boolean {
    return this.film.prominence === 'featured';
  }

  openDetail(): void {
    this.detailOpen.set(true);
  }

  closeDetail(): void {
    this.detailOpen.set(false);
  }
}

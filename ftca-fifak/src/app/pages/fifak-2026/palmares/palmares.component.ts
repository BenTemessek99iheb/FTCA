import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../../directives/reveal-on-scroll.directive';
import { ContentService } from '../../../services/content.service';
import { LaureateCertificateComponent } from './laureate-certificate/laureate-certificate.component';
import { PalmaresFilm, PalmaresSection } from './palmares.model';

@Component({
  selector: 'app-palmares',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, LaureateCertificateComponent],
  templateUrl: './palmares.component.html',
  styleUrls: ['./palmares.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PalmaresComponent {
  private readonly films = this.contentService.getPalmaresFilms();

  readonly internationalAwards = this.bySection('international');
  readonly nationalAwards = this.bySection('national');
  readonly sidebarAwards = this.bySection('sidebar');

  constructor(private contentService: ContentService) {}

  /**
   * Le prix 'featured' (Faucon d'or / Grand Prix) occupe 2 colonnes (voir
   * laureate-certificate.component.scss) : il doit ouvrir la grille plutôt
   * qu'apparaître au milieu, pour éviter un trou dans la grille 4 colonnes.
   */
  private bySection(section: PalmaresSection): PalmaresFilm[] {
    return this.films
      .filter((f) => f.section === section)
      .sort((a, b) => Number(b.prominence === 'featured') - Number(a.prominence === 'featured'));
  }
}

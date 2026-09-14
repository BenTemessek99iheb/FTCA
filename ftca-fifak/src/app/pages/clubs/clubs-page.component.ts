import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { Club } from '../../data/clubs-content';
import { TunisiaMapComponent } from '../../components/tunisia-map/tunisia-map.component';
import { ClubPopupComponent } from '../../components/club-popup/club-popup.component';

/**
 * Page /clubs — expérience carte complète, en pleine page plutôt qu'en
 * tiroir. Réutilise app-tunisia-map tel quel (même fetch de tn.svg, mêmes
 * marqueurs REGION_LABEL_POINTS, même comportement survol/clic) : seule la
 * taille du conteneur change (voir clubs-page.component.scss), pas le
 * composant. La logique de sélection (region → popup club) est dupliquée
 * depuis ClubsDrawerComponent plutôt que partagée : ~15 lignes, une
 * abstraction commune n'apporterait rien ici (voir CLUBS.md).
 */
@Component({
  selector: 'app-clubs-page',
  standalone: true,
  imports: [CommonModule, TunisiaMapComponent, ClubPopupComponent],
  templateUrl: './clubs-page.component.html',
  styleUrls: ['./clubs-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubsPageComponent {
  readonly clubs = this.contentService.getClubs();
  readonly selectedRegion = signal<string | null>(null);

  constructor(private contentService: ContentService) {}

  get clubsForSelectedRegion(): Club[] {
    const region = this.selectedRegion();
    return region ? this.clubs.filter((c) => c.region === region) : [];
  }

  onRegionSelected(region: string): void {
    this.selectedRegion.set(region);
  }

  closePopup(): void {
    this.selectedRegion.set(null);
  }
}

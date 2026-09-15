import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { Club } from '../../data/clubs-content';
import { TunisiaMapComponent } from '../../components/tunisia-map/tunisia-map.component';
import { ClubPopupComponent } from '../../components/club-popup/club-popup.component';

export interface ClubRegionGroup {
  region: string;
  clubs: Club[];
}

/**
 * Page /clubs — expérience carte complète, en pleine page plutôt qu'en
 * tiroir. Réutilise app-tunisia-map tel quel (même fetch de tn.svg, mêmes
 * marqueurs REGION_LABEL_POINTS, même comportement survol/clic) : seule la
 * taille du conteneur change (voir clubs-page.component.scss), pas le
 * composant. La logique de sélection (region → popup club) est dupliquée
 * depuis ClubsDrawerComponent plutôt que partagée : ~15 lignes, une
 * abstraction commune n'apporterait rien ici (voir CLUBS.md).
 *
 * L'annuaire sous la carte (regionGroups) réutilise ce même mécanisme de
 * sélection : cliquer une carte club appelle onRegionSelected() comme un
 * clic sur la carte, ouvrant le même app-club-popup (tous les clubs du
 * gouvernorat, pas seulement celui cliqué) — pas de variante "un seul club"
 * à maintenir en plus. Survoler une carte met en évidence son gouvernorat
 * sur la carte via hoveredRegion, combiné à selectedRegion dans le binding
 * [activeRegion] du template : aucune modification de tunisia-map.component.ts,
 * la mise en évidence existante (classe tunisia-map__region--selected)
 * réagit simplement à une valeur différente.
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
  readonly hoveredRegion = signal<string | null>(null);

  readonly regionGroups: ClubRegionGroup[] = this.buildRegionGroups();
  readonly totalClubs = this.clubs.length;
  readonly totalRegions = this.regionGroups.length;

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

  onCardHoverStart(region: string): void {
    this.hoveredRegion.set(region);
  }

  onCardHoverEnd(): void {
    this.hoveredRegion.set(null);
  }

  private buildRegionGroups(): ClubRegionGroup[] {
    const byRegion = new Map<string, Club[]>();
    for (const club of this.clubs) {
      const group = byRegion.get(club.region) ?? [];
      group.push(club);
      byRegion.set(club.region, group);
    }
    return [...byRegion.entries()]
      .map(([region, clubs]) => ({ region, clubs }))
      .sort((a, b) => a.region.localeCompare(b.region, 'fr'));
  }
}

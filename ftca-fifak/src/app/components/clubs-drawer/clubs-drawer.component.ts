import { Component, ChangeDetectionStrategy, EventEmitter, HostListener, Input, OnChanges, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { Club } from '../../data/clubs-content';
import { TunisiaMapComponent } from '../tunisia-map/tunisia-map.component';
import { ClubPopupComponent } from '../club-popup/club-popup.component';

/**
 * Tiroir latéral "Clubs FTCA" — carte de Tunisie + popup club, ouvert depuis
 * le bouton dédié de la navbar (même patron [isOpen]/(close) que app-mobile-menu ;
 * la gestion de document.body.style.overflow reste dans navbar, pas ici).
 */
@Component({
  selector: 'app-clubs-drawer',
  standalone: true,
  imports: [CommonModule, TunisiaMapComponent, ClubPopupComponent],
  templateUrl: './clubs-drawer.component.html',
  styleUrls: ['./clubs-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubsDrawerComponent implements OnChanges {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  readonly clubs = this.contentService.getClubs();
  /** Gouvernorat sélectionné (Club.region — voir tunisia-map.component.ts) */
  readonly selectedRegion = signal<string | null>(null);

  /**
   * app-tunisia-map télécharge assets/tn.svg (~450 Ko) dès son
   * initialisation : monté seulement à la première ouverture du tiroir
   * (et jamais démonté ensuite, pour ne pas re-télécharger à chaque
   * ouverture) plutôt que sur *ngIf="isOpen" directement — le tiroir lui-même
   * reste toujours dans le DOM (voir navbar.component.html), le fetch ne doit
   * pas se déclencher pour chaque visiteur du site.
   */
  readonly mapLoaded = signal(false);

  constructor(private contentService: ContentService) {}

  ngOnChanges(): void {
    if (this.isOpen) {
      this.mapLoaded.set(true);
    }
  }

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

  requestClose(): void {
    this.selectedRegion.set(null);
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    // Laisse club-popup gérer son propre Escape en priorité (il consomme
    // l'événement en fermant la popup sans fermer le tiroir) ; ici, si le
    // tiroir est ouvert et qu'aucune popup n'est affichée, Escape le ferme.
    if (this.isOpen && !this.selectedRegion()) {
      this.requestClose();
    }
  }
}

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent implements OnChanges {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  readonly isFifakOpen = signal(false);

  ngOnChanges(changes: SimpleChanges): void {
    // Repart replié à chaque fermeture du panneau, pour ne pas rouvrir sur
    // un sous-menu resté déplié de la visite précédente.
    if (changes['isOpen'] && !this.isOpen) {
      this.isFifakOpen.set(false);
    }
  }

  toggleFifak(): void {
    this.isFifakOpen.update((v) => !v);
  }

  onLinkClick(): void {
    this.close.emit();
  }
}

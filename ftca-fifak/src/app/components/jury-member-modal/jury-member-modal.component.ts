import { Component, ChangeDetectionStrategy, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuryMember } from '../../data/fifak-2026-content';

/**
 * Popup générique affichant le détail d'un membre du jury (photo, pays,
 * bio) — utilisée par jury-section pour les deux groupes (national et
 * international), un seul composant plutôt qu'une modale dupliquée.
 */
@Component({
  selector: 'app-jury-member-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jury-member-modal.component.html',
  styleUrls: ['./jury-member-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JuryMemberModalComponent {
  @Input({ required: true }) member!: JuryMember;
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close.emit();
  }

  onBackdropClick(): void {
    this.close.emit();
  }
}

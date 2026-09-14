import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Club } from '../../data/clubs-content';
import { ShareButtonComponent } from '../share-button/share-button.component';
import { environment } from '../../../environments/environment';

const CLOSE_ANIMATION_MS = 200;

/**
 * Popup club(s) d'un gouvernorat — ouverte au clic sur un gouvernorat de
 * app-tunisia-map. Un gouvernorat peut porter plusieurs clubs (ex: Tunis).
 * Suit le même patron ouverture/fermeture que film-detail-modal.
 */
@Component({
  selector: 'app-club-popup',
  standalone: true,
  imports: [CommonModule, RouterLink, ShareButtonComponent],
  templateUrl: './club-popup.component.html',
  styleUrls: ['./club-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubPopupComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) region!: string;
  @Input({ required: true }) clubs!: Club[];
  @Output() close = new EventEmitter<void>();
  /** Distinct de `close` : "Join Us" quitte la page (inscription), le parent doit fermer tout le tiroir, pas juste cette popup */
  @Output() join = new EventEmitter<void>();

  @ViewChild('panel') private panelRef?: ElementRef<HTMLElement>;

  readonly closing = signal(false);

  private previouslyFocused: HTMLElement | null = null;
  private closeTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.previouslyFocused = document.activeElement as HTMLElement | null;
  }

  ngAfterViewInit(): void {
    this.panelRef?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
    this.previouslyFocused?.focus?.();
  }

  requestClose(): void {
    if (this.closing()) return;
    this.closing.set(true);
    this.closeTimeout = setTimeout(() => this.close.emit(), CLOSE_ANIMATION_MS);
  }

  onBackdropClick(): void {
    this.requestClose();
  }

  shareUrl(club: Club): string {
    return `${environment.siteUrl}/inscription?club=${club.id}`;
  }

  shareText(club: Club): string {
    return `Rejoignez ${club.name}, un club de cinéastes amateurs de la FTCA !`;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.requestClose();
  }
}

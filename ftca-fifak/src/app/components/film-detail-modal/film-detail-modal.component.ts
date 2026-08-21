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
import { ProgrammeFilm, PROGRAMME_CATEGORY_LABELS, FILM_GENRE_LABELS } from '../../data/fifak-2026-content';

const CLOSE_ANIMATION_MS = 220;
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Popup de détail film, réutilisée partout où app-film-card est affichée
 * (preview programme + page complète) — chaque carte porte sa propre
 * instance, ouverte/fermée via *ngIf.
 */
@Component({
  selector: 'app-film-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-detail-modal.component.html',
  styleUrls: ['./film-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) film!: ProgrammeFilm;
  @Output() close = new EventEmitter<void>();

  @ViewChild('panel') private panelRef?: ElementRef<HTMLElement>;

  readonly categoryLabels = PROGRAMME_CATEGORY_LABELS;
  readonly genreLabels = FILM_GENRE_LABELS;
  readonly closing = signal(false);

  private previouslyFocused: HTMLElement | null = null;
  private closeTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
  }

  ngAfterViewInit(): void {
    this.panelRef?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
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

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.requestClose();
  }

  // Piège à focus : Tab/Shift+Tab bouclent à l'intérieur du panneau tant que
  // la modal est ouverte, sans dépendre d'une librairie externe.
  @HostListener('document:keydown.tab', ['$event'])
  onTab(event: KeyboardEvent): void {
    const panel = this.panelRef?.nativeElement;
    if (!panel) return;
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

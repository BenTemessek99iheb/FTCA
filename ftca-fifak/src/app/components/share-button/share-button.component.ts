import { Component, ChangeDetectionStrategy, ElementRef, HostListener, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

const FEEDBACK_DISPLAY_MS = 2500;

/**
 * Petit bouton "Partager" réutilisable. Sur mobile/navigateurs compatibles
 * (Web Share API), ouvre directement le partage natif de l'OS — qui inclut
 * déjà Facebook, Instagram, WhatsApp, Messenger... Sinon (desktop, pas de
 * Web Share API), affiche un petit menu Facebook + Instagram + copier le
 * lien.
 *
 * Instagram n'expose aucune URL de partage web comme Facebook
 * (`facebook.com/sharer/...`) : impossible de "poster" directement depuis
 * un navigateur sans app. "Instagram" copie donc le lien et indique de le
 * coller en story/bio — seule option réaliste hors app native, plutôt que
 * de proposer un bouton qui ne ferait rien de réel.
 */
@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareButtonComponent {
  @Input({ required: true }) url!: string;
  @Input({ required: true }) title!: string;
  @Input() text = '';

  readonly menuOpen = signal(false);
  readonly feedback = signal<string | null>(null);

  private feedbackTimeout?: ReturnType<typeof setTimeout>;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get canShareNatively(): boolean {
    return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
  }

  async onTriggerClick(): Promise<void> {
    if (this.canShareNatively) {
      try {
        await navigator.share({ title: this.title, text: this.text, url: this.url });
      } catch {
        // Partage annulé par l'utilisateur — rien à faire.
      }
      return;
    }
    this.menuOpen.update((open) => !open);
  }

  shareFacebook(): void {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=640');
    this.closeMenu();
  }

  async shareInstagram(): Promise<void> {
    await this.copyToClipboard();
    this.showFeedback('Lien copié — collez-le dans votre story ou bio Instagram');
  }

  async copyLink(): Promise<void> {
    await this.copyToClipboard();
    this.showFeedback('Lien copié !');
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.menuOpen() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  private async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.url);
    } catch {
      // Presse-papiers indisponible (contexte non sécurisé, permission refusée...) — cas marginal, pas de repli.
    }
  }

  private showFeedback(message: string): void {
    this.closeMenu();
    this.feedback.set(message);
    if (this.feedbackTimeout) clearTimeout(this.feedbackTimeout);
    this.feedbackTimeout = setTimeout(() => this.feedback.set(null), FEEDBACK_DISPLAY_MS);
  }
}

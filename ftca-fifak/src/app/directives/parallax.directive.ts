import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

/**
 * Directive pour appliquer un effet parallax au scroll
 * Utilisée sur le blob immersif (.break__bg)
 *
 * Utilisation: <div appParallax [intensity]="60">
 */
@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnInit, OnDestroy {
  @Input() intensity = 60; // Intensité du parallax en pixels

  private targetElement: HTMLElement | null = null;
  private onScrollListener: (() => void) | null = null;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.targetElement = this.el.nativeElement;
    this.setupParallax();
  }

  ngOnDestroy(): void {
    if (this.onScrollListener) {
      window.removeEventListener('scroll', this.onScrollListener);
    }
  }

  private setupParallax(): void {
    if (!this.targetElement) return;

    this.onScrollListener = () => {
      const section = this.targetElement!.closest('section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only apply parallax when section is in viewport
      if (rect.top < vh && rect.bottom > 0) {
        const progress = (vh - rect.top) / (vh + rect.height);
        const offset = (progress - 0.5) * this.intensity;
        this.targetElement!.style.transform = `translateY(${offset}px) scale(1.15)`;
      }
    };

    window.addEventListener('scroll', this.onScrollListener, { passive: true });

    // Initial call
    this.onScrollListener();
  }
}

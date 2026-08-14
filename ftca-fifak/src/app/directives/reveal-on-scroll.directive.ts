import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

/**
 * Directive pour révéler les éléments au scroll (IntersectionObserver)
 * Ajoute la classe 'is-visible' quand l'élément entre dans le viewport
 *
 * Utilisation: <div class="reveal" appRevealOnScroll>
 */
@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.setupObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('is-visible');
            if (this.observer) {
              this.observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    this.observer.observe(this.el.nativeElement);
  }
}

import { Injectable, signal, effect } from '@angular/core';

/**
 * Tracks scroll position and provides a reactive signal for navbar state
 */
@Injectable({
  providedIn: 'root',
})
export class ScrollStateService {
  isScrolled = signal(false);

  constructor() {
    this.initScrollListener();
  }

  private initScrollListener(): void {
    // Set initial state
    this.isScrolled.set(window.scrollY > 40);

    // Listen to scroll events
    window.addEventListener(
      'scroll',
      () => {
        this.isScrolled.set(window.scrollY > 40);
      },
      { passive: true }
    );
  }
}

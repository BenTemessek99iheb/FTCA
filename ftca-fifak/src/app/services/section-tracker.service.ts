import { Injectable, signal } from '@angular/core';

export interface TrackedSection {
  id: string;
  label: string;
  element?: HTMLElement;
}

/**
 * Tracks which section is currently visible and notifies the film-rail component
 */
@Injectable({
  providedIn: 'root',
})
export class SectionTrackerService {
  activeSection = signal<TrackedSection | null>(null);
  private sections: TrackedSection[] = [];
  private observer: IntersectionObserver | null = null;

  constructor() {}

  /**
   * Initialize section tracking with a list of sections
   */
  initSections(sections: TrackedSection[]): void {
    this.sections = sections;
    this.setupObserver();
    this.observeSections();
  }

  /**
   * Setup IntersectionObserver for tracking sections
   */
  private setupObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = this.sections.find((s) => s.id === entry.target.id);
            if (section) {
              this.activeSection.set(section);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
  }

  /**
   * Observe all registered sections
   */
  private observeSections(): void {
    if (!this.observer) return;

    this.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        section.element = element;
        this.observer!.observe(element);
      }
    });
  }

  /**
   * Stop observing sections and clean up
   */
  destroyObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

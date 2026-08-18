import { Component, ChangeDetectionStrategy, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { HeroContent } from '../../data/site-content';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealOnScrollDirective],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input({ required: true }) content!: HeroContent;
  readonly sprockets = Array.from({ length: 8 }, (_, i) => i);
  private preloadLink?: HTMLLinkElement;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  // Le hero est l'élément LCP de chaque page : sa background-image (posée en CSS
  // via [style.background-image]) n'est découverte par le scanner de préchargement
  // du navigateur qu'une fois le CSS appliqué. Un <link rel="preload"> injecté ici
  // permet de démarrer le téléchargement dès le <head>, avant même le rendu du DOM.
  ngOnInit(): void {
    const href = this.content.bgImageWebp || this.content.bgImageUrl;
    const link = this.document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    link.setAttribute('fetchpriority', 'high');
    this.document.head.appendChild(link);
    this.preloadLink = link;
  }

  ngOnDestroy(): void {
    this.preloadLink?.remove();
  }
}

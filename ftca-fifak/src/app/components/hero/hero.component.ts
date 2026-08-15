import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class HeroComponent {
  @Input({ required: true }) content!: HeroContent;
  readonly sprockets = Array.from({ length: 8 }, (_, i) => i);
}

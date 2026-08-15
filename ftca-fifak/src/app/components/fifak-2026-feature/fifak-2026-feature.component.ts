import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-fifak-2026-feature',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealOnScrollDirective],
  templateUrl: './fifak-2026-feature.component.html',
  styleUrls: ['./fifak-2026-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fifak2026FeatureComponent {
  fifak2026Rows$ = this.contentService.getFifak2026Rows();

  constructor(private contentService: ContentService) {}
}

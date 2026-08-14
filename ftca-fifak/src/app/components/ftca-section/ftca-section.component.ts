import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { ContentService } from '../../services/content.service';
import { EDITORIAL_STATS } from '../../data/site-content';

@Component({
  selector: 'app-ftca-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './ftca-section.component.html',
  styleUrls: ['./ftca-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtcaSectionComponent {
  timelineItems$ = this.contentService.getTimelineItems();
  missionItems$ = this.contentService.getMissionItems();
  editorialStats$ = EDITORIAL_STATS;

  staggerIndices = Array.from({ length: 4 }, (_, i) => i);

  constructor(private contentService: ContentService) {}
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-fifak-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './fifak-section.component.html',
  styleUrls: ['./fifak-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FifakSectionComponent {
  fifakCards$ = this.contentService.getFifakCards();
  archiveEditions$ = this.contentService.getArchiveEditions();

  constructor(private contentService: ContentService) {}
}

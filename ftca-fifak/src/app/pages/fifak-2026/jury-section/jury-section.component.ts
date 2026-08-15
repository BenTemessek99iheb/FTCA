import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../../directives/reveal-on-scroll.directive';
import { ContentService } from '../../../services/content.service';
import { HorizontalScrollerComponent } from '../../../components/horizontal-scroller/horizontal-scroller.component';

@Component({
  selector: 'app-jury-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, HorizontalScrollerComponent],
  templateUrl: './jury-section.component.html',
  styleUrls: ['./jury-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JurySectionComponent {
  private readonly members = this.contentService.getJuryMembers();

  readonly nationalMembers = this.members.filter((m) => m.group === 'national');
  readonly internationalMembers = this.members.filter((m) => m.group === 'international');

  constructor(private contentService: ContentService) {}
}

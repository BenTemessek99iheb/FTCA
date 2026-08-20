import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../../directives/reveal-on-scroll.directive';
import { ContentService } from '../../../services/content.service';
import { HorizontalScrollerComponent } from '../../../components/horizontal-scroller/horizontal-scroller.component';
import { JuryMemberModalComponent } from '../../../components/jury-member-modal/jury-member-modal.component';
import { JuryMember } from '../../../data/fifak-2026-content';

@Component({
  selector: 'app-jury-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, HorizontalScrollerComponent, JuryMemberModalComponent],
  templateUrl: './jury-section.component.html',
  styleUrls: ['./jury-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JurySectionComponent {
  private readonly members = this.contentService.getJuryMembers();

  readonly nationalMembers = this.members.filter((m) => m.group === 'national');
  readonly internationalMembers = this.members.filter((m) => m.group === 'international');

  readonly selectedMember = signal<JuryMember | null>(null);

  constructor(private contentService: ContentService) {}

  selectMember(member: JuryMember): void {
    this.selectedMember.set(member);
  }

  closeModal(): void {
    this.selectedMember.set(null);
  }
}

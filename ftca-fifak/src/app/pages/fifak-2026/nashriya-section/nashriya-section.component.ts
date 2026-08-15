import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../../directives/reveal-on-scroll.directive';
import { ContentService } from '../../../services/content.service';
import { NashriyaSpreadComponent } from './nashriya-spread/nashriya-spread.component';

@Component({
  selector: 'app-nashriya-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, NashriyaSpreadComponent],
  templateUrl: './nashriya-section.component.html',
  styleUrls: ['./nashriya-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NashriyaSectionComponent {
  readonly entries = this.contentService.getNashriyaEntries();

  constructor(private contentService: ContentService) {}

  folioNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../../../directives/reveal-on-scroll.directive';
import { NashriyaEntry } from '../../../../data/fifak-2026-content';

@Component({
  selector: 'app-nashriya-spread',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './nashriya-spread.component.html',
  styleUrls: ['./nashriya-spread.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NashriyaSpreadComponent {
  @Input({ required: true }) entry!: NashriyaEntry;
  @Input({ required: true }) folioNumber!: string;
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FilmRailComponent } from '../../components/film-rail/film-rail.component';
import { TrackedSection } from '../../services/section-tracker.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProgrammeSectionComponent } from './programme-section/programme-section.component';
import { JurySectionComponent } from './jury-section/jury-section.component';
import { NashriyaSectionComponent } from './nashriya-section/nashriya-section.component';
import { FIFAK_2026_HERO_CONTENT } from '../../data/fifak-2026-content';

@Component({
  selector: 'app-fifak-2026-page',
  standalone: true,
  imports: [
    FilmRailComponent,
    HeroComponent,
    ProgrammeSectionComponent,
    JurySectionComponent,
    NashriyaSectionComponent,
  ],
  templateUrl: './fifak-2026-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fifak2026PageComponent {
  readonly heroContent = FIFAK_2026_HERO_CONTENT;

  readonly railSections: TrackedSection[] = [
    { id: 'hero', label: '01' },
    { id: 'programme', label: '02' },
    { id: 'jury', label: '03' },
    { id: 'nashriya', label: '04' },
  ];
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FilmRailComponent } from '../../components/film-rail/film-rail.component';
import { TrackedSection } from '../../services/section-tracker.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { FtcaSectionComponent } from '../../components/ftca-section/ftca-section.component';
import { ImmersiveBreakComponent } from '../../components/immersive-break/immersive-break.component';
import { FifakSectionComponent } from '../../components/fifak-section/fifak-section.component';
import { Fifak2026FeatureComponent } from '../../components/fifak-2026-feature/fifak-2026-feature.component';
import { ArticlesSectionComponent } from '../../components/articles-section/articles-section.component';
import { ContactCtaComponent } from '../../components/contact-cta/contact-cta.component';
import { HERO_CONTENT } from '../../data/site-content';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FilmRailComponent,
    HeroComponent,
    FtcaSectionComponent,
    ImmersiveBreakComponent,
    FifakSectionComponent,
    Fifak2026FeatureComponent,
    ArticlesSectionComponent,
    ContactCtaComponent,
  ],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly heroContent = HERO_CONTENT;

  readonly railSections: TrackedSection[] = [
    { id: 'hero', label: '01' },
    { id: 'ftca', label: '02' },
    { id: 'break', label: '03' },
    { id: 'fifak', label: '04' },
    { id: 'fifak2026', label: '05' },
    { id: 'articles', label: '06' },
    { id: 'contact', label: '07' },
  ];
}

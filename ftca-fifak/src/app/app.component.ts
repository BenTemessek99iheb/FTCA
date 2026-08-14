import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrainComponent } from './components/grain/grain.component';
import { FilmRailComponent } from './components/film-rail/film-rail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { FtcaSectionComponent } from './components/ftca-section/ftca-section.component';
import { ImmersiveBreakComponent } from './components/immersive-break/immersive-break.component';
import { FifakSectionComponent } from './components/fifak-section/fifak-section.component';
import { Fifak2026FeatureComponent } from './components/fifak-2026-feature/fifak-2026-feature.component';
import { ArticlesSectionComponent } from './components/articles-section/articles-section.component';
import { ContactCtaComponent } from './components/contact-cta/contact-cta.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    GrainComponent,
    FilmRailComponent,
    NavbarComponent,
    HeroComponent,
    FtcaSectionComponent,
    ImmersiveBreakComponent,
    FifakSectionComponent,
    Fifak2026FeatureComponent,
    ArticlesSectionComponent,
    ContactCtaComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'ftca-fifak';
}


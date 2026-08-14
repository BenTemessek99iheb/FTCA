import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-articles-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './articles-section.component.html',
  styleUrls: ['./articles-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesSectionComponent {
  articleCards$ = this.contentService.getArticleCards();

  constructor(private contentService: ContentService) {}
}

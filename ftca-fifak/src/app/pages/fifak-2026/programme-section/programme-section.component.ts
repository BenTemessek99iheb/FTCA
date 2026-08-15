import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../../directives/reveal-on-scroll.directive';
import { ContentService } from '../../../services/content.service';
import { PROGRAMME_CATEGORY_LABELS, PROGRAMME_DAYS } from '../../../data/fifak-2026-content';
import { HorizontalScrollerComponent } from '../../../components/horizontal-scroller/horizontal-scroller.component';

@Component({
  selector: 'app-programme-section',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, HorizontalScrollerComponent],
  templateUrl: './programme-section.component.html',
  styleUrls: ['./programme-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammeSectionComponent {
  readonly films = this.contentService.getProgrammeFilms();
  readonly days = PROGRAMME_DAYS;
  readonly categoryLabels = PROGRAMME_CATEGORY_LABELS;
  readonly activeDay = signal(this.days[0]);

  @ViewChild(HorizontalScrollerComponent) private scroller!: HorizontalScrollerComponent;
  @ViewChildren('filmCard') private filmCards!: QueryList<ElementRef<HTMLElement>>;

  constructor(private contentService: ContentService) {}

  scrollPrev(): void {
    this.scroller.prev();
  }

  scrollNext(): void {
    this.scroller.next();
  }

  jumpToDay(day: number): void {
    this.activeDay.set(day);
    const index = this.films.findIndex((film) => film.day === day);
    if (index === -1) return;

    const cardEl = this.filmCards.toArray()[index]?.nativeElement;
    if (cardEl) this.scroller.scrollToElement(cardEl);
  }
}

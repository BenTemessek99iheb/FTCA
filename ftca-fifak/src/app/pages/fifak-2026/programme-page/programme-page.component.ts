import { Component, ChangeDetectionStrategy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../services/content.service';
import { ProgrammeCategory, PROGRAMME_CATEGORY_LABELS, PROGRAMME_DAYS } from '../../../data/fifak-2026-content';
import { FilmCardComponent } from '../../../components/film-card/film-card.component';

/** Nombre de films ajoutés à chaque clic sur "Charger plus". */
const PAGE_SIZE = 12;

@Component({
  selector: 'app-programme-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FilmCardComponent],
  templateUrl: './programme-page.component.html',
  styleUrls: ['./programme-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammePageComponent implements OnInit {
  private readonly allFilms = this.contentService.getProgrammeFilms();

  readonly days = PROGRAMME_DAYS;
  readonly categories: ProgrammeCategory[] = ['ouverture', 'national', 'international', 'hommage'];
  readonly categoryLabels = PROGRAMME_CATEGORY_LABELS;

  readonly selectedDay = signal<number | null>(null);
  readonly selectedCategory = signal<ProgrammeCategory | null>(null);
  readonly searchQuery = signal('');
  readonly visibleCount = signal(PAGE_SIZE);

  readonly filteredFilms = computed(() => {
    const day = this.selectedDay();
    const category = this.selectedCategory();
    const query = this.searchQuery().trim().toLowerCase();
    return this.allFilms.filter(
      (film) =>
        (day === null || film.day === day) &&
        (category === null || film.category === category) &&
        (!query || film.title.toLowerCase().includes(query))
    );
  });

  readonly pagedFilms = computed(() => this.filteredFilms().slice(0, this.visibleCount()));
  readonly hasMore = computed(() => this.visibleCount() < this.filteredFilms().length);

  constructor(private contentService: ContentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const dayParam = this.route.snapshot.queryParamMap.get('day');
    const day = dayParam ? Number(dayParam) : null;
    if (day !== null && this.days.includes(day)) {
      this.selectedDay.set(day);
    }
  }

  setDay(day: number | null): void {
    this.selectedDay.set(day);
    this.visibleCount.set(PAGE_SIZE);
  }

  setCategory(category: ProgrammeCategory | null): void {
    this.selectedCategory.set(category);
    this.visibleCount.set(PAGE_SIZE);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
    this.visibleCount.set(PAGE_SIZE);
  }

  clearSearch(): void {
    this.setSearchQuery('');
  }

  loadMore(): void {
    this.visibleCount.update((v) => v + PAGE_SIZE);
  }
}

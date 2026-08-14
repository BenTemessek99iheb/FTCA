import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTrackerService, TrackedSection } from '../../services/section-tracker.service';

@Component({
  selector: 'app-film-rail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-rail.component.html',
  styleUrls: ['./film-rail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmRailComponent implements OnInit, OnDestroy {
  readonly HOLE_COUNT = 34;
  readonly SECTIONS: TrackedSection[] = [
    { id: 'hero', label: '01' },
    { id: 'ftca', label: '02' },
    { id: 'break', label: '03' },
    { id: 'fifak', label: '04' },
    { id: 'fifak2026', label: '05' },
    { id: 'articles', label: '06' },
    { id: 'contact', label: '07' },
  ];

  holes = Array.from({ length: this.HOLE_COUNT }, (_, i) => i);

  activeHoleIndices = computed(() => {
    const activeSection = this.trackerService.activeSection();
    if (!activeSection) return new Set<number>();

    const sectionIndex = this.SECTIONS.findIndex((s) => s.id === activeSection.id);
    if (sectionIndex === -1) return new Set<number>();

    const ratio = sectionIndex / (this.SECTIONS.length - 1);
    const activeHoleIdx = Math.round(ratio * (this.HOLE_COUNT - 1));

    return new Set([activeHoleIdx - 1, activeHoleIdx, activeHoleIdx + 1].filter((i) => i >= 0 && i < this.HOLE_COUNT));
  });

  currentFrameLabel = computed(() => {
    const activeSection = this.trackerService.activeSection();
    return activeSection?.label || '01';
  });

  constructor(private trackerService: SectionTrackerService) {}

  ngOnInit(): void {
    this.trackerService.initSections(this.SECTIONS);
  }

  ngOnDestroy(): void {
    this.trackerService.destroyObserver();
  }

  isHoleActive(index: number): boolean {
    return this.activeHoleIndices().has(index);
  }
}

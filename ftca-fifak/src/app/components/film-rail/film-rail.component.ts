import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, computed } from '@angular/core';
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
  @Input({ required: true }) sections: TrackedSection[] = [];

  readonly HOLE_COUNT = 34;
  holes = Array.from({ length: this.HOLE_COUNT }, (_, i) => i);

  activeHoleIndices = computed(() => {
    const activeSection = this.trackerService.activeSection();
    if (!activeSection) return new Set<number>();

    const sectionIndex = this.sections.findIndex((s) => s.id === activeSection.id);
    if (sectionIndex === -1) return new Set<number>();

    const ratio = sectionIndex / (this.sections.length - 1);
    const activeHoleIdx = Math.round(ratio * (this.HOLE_COUNT - 1));

    return new Set([activeHoleIdx - 1, activeHoleIdx, activeHoleIdx + 1].filter((i) => i >= 0 && i < this.HOLE_COUNT));
  });

  currentFrameLabel = computed(() => {
    const activeSection = this.trackerService.activeSection();
    return activeSection?.label ?? this.sections[0]?.label ?? '01';
  });

  totalFrameLabel = computed(() => String(this.sections.length).padStart(2, '0'));

  constructor(private trackerService: SectionTrackerService) {}

  ngOnInit(): void {
    this.trackerService.initSections(this.sections);
  }

  ngOnDestroy(): void {
    this.trackerService.destroyObserver();
  }

  isHoleActive(index: number): boolean {
    return this.activeHoleIndices().has(index);
  }
}

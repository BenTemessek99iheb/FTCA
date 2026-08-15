import { Component, ChangeDetectionStrategy, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Generic scroll-snap horizontal rail: track + optional edge fades.
 * Prev/next triggers and "jump to item" controls are authored by the
 * consuming page (each rail's layout differs — see programme-section vs
 * jury-section); this component exposes prev()/next()/scrollToElement()
 * via a template reference variable for that purpose.
 */
@Component({
  selector: 'app-horizontal-scroller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-scroller.component.html',
  styleUrls: ['./horizontal-scroller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalScrollerComponent {
  @Input() showFades = true;
  @Input() gap = 22;
  @Input() trackPadding = '6px 4px 24px';

  @ViewChild('track', { static: true }) private trackRef!: ElementRef<HTMLElement>;

  prev(): void {
    this.scrollByAmount(-1);
  }

  next(): void {
    this.scrollByAmount(1);
  }

  scrollToElement(target: HTMLElement): void {
    const track = this.trackRef.nativeElement;
    track.scrollTo({ left: target.offsetLeft - 4, behavior: 'smooth' });
  }

  private scrollByAmount(direction: 1 | -1): void {
    const track = this.trackRef.nativeElement;
    track.scrollBy({ left: track.clientWidth * 0.6 * direction, behavior: 'smooth' });
  }
}

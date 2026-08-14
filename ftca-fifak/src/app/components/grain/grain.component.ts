import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-grain',
  standalone: true,
  template: '<div class="grain" aria-hidden="true"></div>',
  styleUrls: ['./grain.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrainComponent {}

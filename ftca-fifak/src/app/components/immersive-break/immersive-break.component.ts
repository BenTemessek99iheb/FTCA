import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { ParallaxDirective } from '../../directives/parallax.directive';

@Component({
  selector: 'app-immersive-break',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective, ParallaxDirective],
  templateUrl: './immersive-break.component.html',
  styleUrls: ['./immersive-break.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImmersiveBreakComponent {}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact-cta',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  templateUrl: './contact-cta.component.html',
  styleUrls: ['./contact-cta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCtaComponent {}

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { assetUrl } from '../../shared/asset-url';

/**
 * Logo FTCA + couronne de lauriers (assets/laureat.png) — élément décoratif
 * fixe réutilisé par laureate-certificate (palmarès) et le bandeau prix de
 * film-detail-modal. Logo au-dessus de la couronne (pas superposé au centre)
 * — voir reference/First Honorable mention.jpg.
 */
@Component({
  selector: 'app-laureate-laurels',
  standalone: true,
  templateUrl: './laureate-laurels.component.html',
  styleUrls: ['./laureate-laurels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaureateLaurelsComponent {
  @Input() size: 'sm' | 'lg' | 'xl' = 'lg';

  readonly wreathUrl = assetUrl('laureat');
  readonly logoUrl = assetUrl('ftca-logo-mark');
}

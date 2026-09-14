import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Club } from '../../data/clubs-content';

/**
 * Points d'étiquette (repère du viewBox 1000x1000 de assets/tn.svg,
 * `<g id="label_points">`) — position réelle, à l'intérieur de la forme,
 * fournie par le fichier source (Simplemaps), pas une coordonnée devinée.
 * Clé = attribut `name` du gouvernorat, identique entre `<path>` et `<circle>`.
 */
const REGION_LABEL_POINTS: Record<string, { x: number; y: number }> = {
  Tataouine: { x: 526.7, y: 734 },
  Gabès: { x: 519.2, y: 511.3 },
  Médenine: { x: 637, y: 583.6 },
  Tozeur: { x: 335.3, y: 505.3 },
  Kebili: { x: 429.9, y: 590.5 },
  Gafsa: { x: 424.5, y: 444 },
  Ariana: { x: 556.2, y: 124.5 },
  'Ben Arous': { x: 570.1, y: 165.7 },
  Bizerte: { x: 484.7, y: 110.8 },
  Tunis: { x: 563.8, y: 142.6 },
  Zaghouan: { x: 546.3, y: 203 },
  Manubah: { x: 531, y: 144.9 },
  Nabeul: { x: 618.2, y: 159.4 },
  'Le Kef': { x: 409.6, y: 233.7 },
  Béja: { x: 467.1, y: 167 },
  Jendouba: { x: 415.8, y: 166.9 },
  Siliana: { x: 480.8, y: 232.2 },
  Monastir: { x: 622.5, y: 296.8 },
  Mahdia: { x: 587, y: 337.6 },
  Sousse: { x: 593.4, y: 272.5 },
  Sfax: { x: 577.6, y: 398.1 },
  Kassérine: { x: 423, y: 347.5 },
  Kairouan: { x: 530.7, y: 294.2 },
  'Sidi Bou Zid': { x: 502.5, y: 391.1 },
};

/** Amplitude max du tilt "3D-ish" au survol (degrés) — reste subtil, désactivé sous prefers-reduced-motion */
const MAX_TILT_DEG = 5;

export interface RegionMarker {
  region: string;
  x: number;
  y: number;
}

/**
 * Carte de Tunisie par gouvernorat — charge assets/tn.svg (24 gouvernorats
 * réels, contours Simplemaps, licence commerciale libre avec attribution
 * conservée dans le fichier) et l'injecte tel quel dans le DOM plutôt que de
 * redessiner un contour à la main. Chaque `<path name="...">` devient un
 * gouvernorat survolable (tooltip natif via <title>) ; seuls les
 * gouvernorats portant au moins un club sont cliquables (role="button",
 * clavier compris) et reçoivent un marqueur positionné sur le point
 * d'étiquette réel du fichier source, jamais une coordonnée saisie à la main.
 *
 * ViewEncapsulation.None : le SVG est injecté via [innerHTML], donc en
 * dehors du template compilé par Angular — les styles scoped (attribut
 * _ngcontent) ne l'atteindraient pas. Noms de classes déjà namespacés
 * (tunisia-map__*) pour éviter toute collision globale.
 */
@Component({
  selector: 'app-tunisia-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tunisia-map.component.html',
  styleUrls: ['./tunisia-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TunisiaMapComponent implements OnInit, OnChanges {
  @Input({ required: true }) clubs!: Club[];
  @Input() activeRegion: string | null = null;
  @Output() regionSelected = new EventEmitter<string>();

  @ViewChild('mapHost', { static: true }) private mapHost!: ElementRef<HTMLDivElement>;

  svgHtml: SafeHtml | null = null;
  tiltTransform = '';
  markers: RegionMarker[] = [];

  private readonly reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private regionPaths = new Map<string, SVGPathElement>();

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const clubRegions = new Set(this.clubs.map((c) => c.region));
    this.markers = [...clubRegions]
      .map((region) => {
        const point = REGION_LABEL_POINTS[region];
        return point ? { region, x: point.x, y: point.y } : null;
      })
      .filter((m): m is RegionMarker => m !== null);

    this.http.get('assets/tn.svg', { responseType: 'text' }).subscribe((raw) => {
      this.svgHtml = this.sanitizer.bypassSecurityTrustHtml(raw);
      this.cdr.detectChanges();
      this.wireUpRegions(clubRegions);
    });
  }

  private wireUpRegions(clubRegions: Set<string>): void {
    const paths = this.mapHost.nativeElement.querySelectorAll<SVGPathElement>('path[name]');

    paths.forEach((path) => {
      const name = path.getAttribute('name');
      if (!name) return;

      path.classList.add('tunisia-map__region');
      this.regionPaths.set(name, path);

      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = name;
      path.appendChild(title);

      if (clubRegions.has(name)) {
        path.classList.add('tunisia-map__region--active');
        path.setAttribute('role', 'button');
        path.setAttribute('tabindex', '0');
        path.setAttribute('aria-label', `Voir les clubs à ${name}`);
        path.addEventListener('click', () => this.regionSelected.emit(name));
        path.addEventListener('keydown', (event: KeyboardEvent) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.regionSelected.emit(name);
          }
        });
      }
    });

    this.applySelectedRegion();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeRegion']) {
      this.applySelectedRegion();
    }
  }

  private applySelectedRegion(): void {
    this.regionPaths.forEach((path, name) => {
      path.classList.toggle('tunisia-map__region--selected', name === this.activeRegion);
    });
  }

  onMouseMove(event: MouseEvent, container: HTMLElement): void {
    if (this.reducedMotion) return;
    const rect = container.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateY = px * MAX_TILT_DEG * 2;
    const rotateX = -py * MAX_TILT_DEG * 2;
    this.tiltTransform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  resetTilt(): void {
    this.tiltTransform = '';
  }
}

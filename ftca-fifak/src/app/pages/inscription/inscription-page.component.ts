import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentService } from '../../services/content.service';
import { ClubRegistrationService } from '../../services/club-registration.service';
import { Club } from '../../data/clubs-content';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

/** Délai de l'envoi simulé (repli tant que environment.apiUrl n'est pas configuré, voir submit()) */
const SIMULATED_SUBMIT_DELAY_MS = 500;
const MIN_ANSWER_LENGTH = 10;

/**
 * Page d'inscription à un club FTCA — questions reprises telles que fournies
 * par la Fédération (voir le formulaire de référence, pas de champ ajouté ou
 * retiré de son propre chef).
 *
 * Reçoit `?club=<id>` (voir club-popup, bouton "Join Us") pour préremplir le
 * lieu de résidence avec la ville du club choisi — pré-rempli seulement, pas
 * verrouillé : contrairement à l'ancien champ "Ville" (qui décrivait le
 * club), "Lieu de résidence" décrit le candidat, qui peut légitimement
 * habiter ailleurs que le club qu'il rejoint.
 *
 * `submit()` envoie via ClubRegistrationService au backend Google Apps
 * Script (scripts/google-apps-script/inscriptions.gs — voir CLUBS.md §
 * "Brancher Google Sheets" pour le déployer) quand `environment.apiUrl` est
 * configuré. Tant que ce n'est pas fait (`apiUrl: null`), retombe sur un
 * envoi simulé (log console + succès) — comportement identique à avant
 * cette intégration, pour ne pas casser le formulaire en attendant le
 * déploiement.
 */
@Component({
  selector: 'app-inscription-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './inscription-page.component.html',
  styleUrls: ['./inscription-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InscriptionPageComponent implements OnInit {
  readonly club = signal<Club | null>(null);
  readonly submitState = signal<SubmitState>('idle');

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', [Validators.required]],
    residence: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s]{6,}$/)]],
    motivation: ['', [Validators.required, Validators.minLength(MIN_ANSWER_LENGTH)]],
    hasFilmExperience: this.fb.control<boolean | null>(null, Validators.required),
    filmExperienceDetails: [''],
    favoriteFilm: ['', [Validators.required, Validators.minLength(MIN_ANSWER_LENGTH)]],
    expectations: ['', [Validators.required, Validators.minLength(MIN_ANSWER_LENGTH)]],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contentService: ContentService,
    private registrationService: ClubRegistrationService
  ) {}

  ngOnInit(): void {
    const clubId = this.route.snapshot.queryParamMap.get('club');
    const club = clubId ? this.contentService.getClubs().find((c) => c.id === clubId) ?? null : null;
    this.club.set(club);

    if (club) {
      this.form.controls.residence.setValue(club.city);
    }

    // "Si oui, parlez-nous..." n'est obligatoire que si la réponse à la
    // question précédente est "Oui" — sinon vidé pour ne pas envoyer un
    // reliquat de texte si le candidat change d'avis après avoir répondu.
    this.form.controls.hasFilmExperience.valueChanges.subscribe((hasExperience) => {
      const details = this.form.controls.filmExperienceDetails;
      if (hasExperience) {
        details.setValidators([Validators.required, Validators.minLength(MIN_ANSWER_LENGTH)]);
      } else {
        details.clearValidators();
        details.setValue('');
      }
      details.updateValueAndValidity();
    });
  }

  submit(): void {
    if (this.form.invalid || this.submitState() === 'submitting') {
      this.form.markAllAsTouched();
      return;
    }

    const club = this.club();
    const formValue = this.form.getRawValue();
    // Après la vérification form.invalid ci-dessus, hasFilmExperience est
    // garanti non-null (Validators.required) — le contrôle reste typé
    // `boolean | null` car sa valeur initiale l'est (aucune réponse par défaut).
    const payload = { club: club?.id ?? '', ...formValue, hasFilmExperience: !!formValue.hasFilmExperience };

    this.submitState.set('submitting');

    if (!this.registrationService.isConfigured) {
      console.info('[inscription] environment.apiUrl non configuré, envoi simulé — payload :', payload);
      setTimeout(() => this.submitState.set('success'), SIMULATED_SUBMIT_DELAY_MS);
      return;
    }

    this.registrationService.submit(payload).subscribe({
      next: () => this.submitState.set('success'),
      error: (err) => {
        console.error('[inscription] échec de l’envoi', err);
        this.submitState.set('error');
      },
    });
  }
}

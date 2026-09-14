import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ClubRegistrationPayload {
  club: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  residence: string;
  email: string;
  phone: string;
  motivation: string;
  hasFilmExperience: boolean;
  filmExperienceDetails: string;
  favoriteFilm: string;
  expectations: string;
}

/**
 * Envoie une inscription club au backend Google Apps Script — voir
 * scripts/google-apps-script/inscriptions.gs et CLUBS.md § "Brancher Google
 * Sheets" pour le déployer. `environment.apiUrl` est l'URL du Web App
 * obtenue après déploiement ; tant qu'elle vaut `null` (pas encore
 * déployé), submit() échoue explicitement plutôt que d'appeler une URL
 * inexistante — inscription-page.component.ts retombe alors sur un envoi
 * simulé (comportement identique à avant cette intégration).
 */
@Injectable({
  providedIn: 'root',
})
export class ClubRegistrationService {
  constructor(private http: HttpClient) {}

  get isConfigured(): boolean {
    return !!environment.apiUrl;
  }

  submit(payload: ClubRegistrationPayload): Observable<{ status: string; message?: string }> {
    if (!environment.apiUrl) {
      return throwError(() => new Error('environment.apiUrl non configuré — voir CLUBS.md.'));
    }

    // Content-Type: text/plain (pas application/json) volontaire : un Web App
    // Apps Script ne sait pas répondre à la requête de préflight CORS
    // (OPTIONS) qu'un Content-Type application/json déclencherait — text/plain
    // est une "simple request" CORS, pas de préflight. Apps Script lit quand
    // même e.postData.contents comme du JSON côté serveur, voir inscriptions.gs.
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain;charset=utf-8' });
    return this.http.post<{ status: string; message?: string }>(environment.apiUrl, JSON.stringify(payload), {
      headers,
    });
  }
}

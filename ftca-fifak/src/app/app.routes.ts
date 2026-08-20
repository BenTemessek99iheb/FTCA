import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page.component').then((m) => m.HomePageComponent),
    title: 'FTCA — Fédération Tunisienne des Cinéastes Amateurs',
  },
  {
    path: 'fifak-2026',
    loadComponent: () =>
      import('./pages/fifak-2026/fifak-2026-page.component').then((m) => m.Fifak2026PageComponent),
    title: 'FIFAK 2026 — 23 au 29 Août, Kélibia | FTCA',
  },
  {
    path: 'fifak-2026/programme',
    loadComponent: () =>
      import('./pages/fifak-2026/programme-page/programme-page.component').then((m) => m.ProgrammePageComponent),
    title: 'Programme complet — FIFAK 2026 | FTCA',
  },
];

import { environment } from '../../environments/environment';

// path relatif à assets/, SANS extension, ex: 'ftca-logo-mark' ou 'icons/icon-192'
export function assetUrl(path: string): string {
  return `${environment.assetsBaseUrl}/${path}`;
}

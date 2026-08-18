# FtcaFifak

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Production / déploiement

Run `npm run build:prod` for an explicit production build (equivalent to
`ng build`, since `production` is the default configuration in
`angular.json`). Output goes to `dist/ftca-fifak/browser/`.

This project is deployed as a static site to cPanel hosting at
[ftca-fifak.tn](https://ftca-fifak.tn), automatically via GitHub Actions on
every push to `main`. See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full
setup (required secrets, manual deployment, troubleshooting) and
[CHECKLIST.md](./CHECKLIST.md) for the go-live checklist.

## Performance / images

See [PERFORMANCE.md](./PERFORMANCE.md) for the full audit (image sizes,
WebP/LQIP, service worker, self-hosted fonts, Lighthouse results).

**Adding a new image** — always run the optimizer before committing:

```bash
# Drop the file in src/assets/, add its filename + target width/quality
# to TARGETS in scripts/optimize-assets.js, then:
npm run optimize-assets
```

This resizes to the target width, recompresses, strips EXIF metadata,
generates a `.webp` sibling, and adds a blur placeholder (LQIP) to
`src/assets/lqip-manifest.json`. For an `<img>`-based usage, wire it up
the same way as `articles-section.component.html` does (`<picture>` +
`webpImage` + `lqip` fields on the content interface in `data/*.ts`); for
a full-bleed CSS background (like `hero`), add a `*Webp` field alongside
the original URL instead. Keep every image under 500kB after optimization
— if it isn't, lower `quality` or `maxWidth` for that file in the script.

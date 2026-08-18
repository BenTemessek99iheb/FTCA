#!/usr/bin/env node
/**
 * Optimise les images statiques de src/assets/ :
 *  - redimensionne à la largeur maximale réellement affichée par l'app
 *    (voir la table TARGETS ci-dessous, alignée sur PERFORMANCE.md)
 *  - recompresse au format d'origine (JPEG mozjpeg / PNG quantifié),
 *    ce qui supprime au passage les métadonnées EXIF (sharp ne les
 *    recopie jamais sauf appel explicite à .withMetadata())
 *  - génère une version .webp à côté de chaque image
 *  - génère un LQIP (miniature floue en base64) par image, écrit dans
 *    src/assets/lqip-manifest.json, pour les composants qui font du
 *    blur-up (voir LqipImageComponent)
 *
 * Usage : npm run optimize-assets
 * Idempotent : ré-exécuter le script sur des fichiers déjà optimisés
 * les laisse quasiment inchangés (sharp ne réduit jamais en dessous
 * de maxWidth deux fois, withoutEnlargement empêche tout agrandissement).
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');
const LQIP_WIDTH = 24;

// Largeur max cible par fichier, choisie d'après son usage réel dans l'app :
//  - hero (pleine largeur d'écran, background-size: cover) -> 2000px
//  - cartes/teasers (affichage contenu, ~400-500px CSS, prévoir le rétina) -> 900px
//  - logo (navbar/footer, ~40-60px CSS, prévoir @3x) -> 400px
// Les 4 derniers fichiers ne sont référencés dans aucun composant au moment
// de ce script (voir PERFORMANCE.md) ; ils sont optimisés par prudence au
// cas où ils seraient utilisés plus tard, sans impact sur le site actuel.
const TARGETS = {
  'wallp.jpg': { maxWidth: 2000, quality: 78 },
  'Fifak-ill.jpg': { maxWidth: 2000, quality: 78 },
  'image-presse.png': { maxWidth: 900, quality: 80 },
  'fifak-wallp.png': { maxWidth: 900, quality: 80 },
  'ftca-logo-mark.png': { maxWidth: 400, quality: 90 },
  'public-kelibia.jpg': { maxWidth: 1600, quality: 78 },
  'deadline.png': { maxWidth: 1600, quality: 80 },
  'fifak.jpg': { maxWidth: 1200, quality: 68 },
  'kelibia-port.jpg': { maxWidth: 1600, quality: 78 },
  'ftca_logo.JPG': { maxWidth: 1200, quality: 80 },
};

function fmtKb(bytes) {
  return `${(bytes / 1024).toFixed(0)}kB`;
}

async function optimizeOne(filename) {
  const filePath = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filename} introuvable, ignoré.`);
    return null;
  }

  const { maxWidth, quality } = TARGETS[filename];
  const ext = path.extname(filename); // conserve la casse (ex: .JPG)
  const isPng = ext.toLowerCase() === '.png';
  const originalSize = fs.statSync(filePath).size;

  // Lu entièrement en mémoire une seule fois : toutes les sorties (image
  // recompressée, webp, LQIP) en dérivent, ce qui évite tout conflit
  // lecture/écriture sur le même fichier.
  const inputBuffer = fs.readFileSync(filePath);
  const meta = await sharp(inputBuffer).metadata();
  const resizeWidth = meta.width && meta.width > maxWidth ? maxWidth : undefined;

  const pipeline = () => {
    const img = sharp(inputBuffer).rotate(); // applique l'orientation EXIF puis la strip
    return resizeWidth ? img.resize({ width: resizeWidth, withoutEnlargement: true }) : img;
  };

  if (isPng) {
    await pipeline().png({ quality, compressionLevel: 9 }).toFile(filePath);
  } else {
    await pipeline().jpeg({ quality, mozjpeg: true }).toFile(filePath);
  }

  const webpPath = filePath.slice(0, -ext.length) + '.webp';
  await pipeline().webp({ quality }).toFile(webpPath);

  const lqipBuffer = await pipeline().resize({ width: LQIP_WIDTH }).webp({ quality: 40 }).toBuffer();
  const lqip = `data:image/webp;base64,${lqipBuffer.toString('base64')}`;

  const optimizedSize = fs.statSync(filePath).size;
  const webpSize = fs.statSync(webpPath).size;

  console.log(
    `✅ ${filename.padEnd(22)} ${fmtKb(originalSize).padStart(7)} → ${fmtKb(optimizedSize).padStart(7)}` +
      `  (webp ${fmtKb(webpSize)})`
  );

  return { file: filename, webp: path.basename(webpPath), lqip };
}

async function main() {
  console.log(`Optimisation des images dans ${path.relative(process.cwd(), ASSETS_DIR)}/ ...\n`);
  const results = [];
  for (const filename of Object.keys(TARGETS)) {
    const r = await optimizeOne(filename);
    if (r) results.push(r);
  }

  const manifest = Object.fromEntries(results.map((r) => [r.file, { webp: r.webp, lqip: r.lqip }]));
  const manifestPath = path.join(ASSETS_DIR, 'lqip-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  const over500kb = results.filter((r) => fs.statSync(path.join(ASSETS_DIR, r.file)).size > 500 * 1024);
  console.log(`\n📄 Manifest LQIP écrit : ${path.relative(process.cwd(), manifestPath)}`);
  if (over500kb.length) {
    console.warn(`⚠️  Encore >500kB après optimisation : ${over500kb.map((r) => r.file).join(', ')}`);
  } else {
    console.log('✅ Toutes les images optimisées sont sous 500kB.');
  }
}

main().catch((err) => {
  console.error('❌ Échec de l\'optimisation :', err);
  process.exit(1);
});

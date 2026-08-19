#!/usr/bin/env node
/**
 * Vérifie que chaque image de src/assets/ a bien un pendant sur Cloudinary,
 * sous le public_id attendu par la convention assetUrl() : "assets/<chemin
 * relatif sans extension>". N'uploade rien — lecture seule (resources_by_ids).
 *
 * Note importante : deux fichiers locaux de même nom mais d'extension
 * différente (ex: fifak.jpg + fifak.webp) résolvent au MÊME public_id
 * Cloudinary ("assets/fifak"), puisque le public_id ne porte pas
 * l'extension. C'est voulu (f_auto choisit le format à la livraison), mais
 * ça veut dire qu'un seul des deux fichiers source est réellement stocké
 * sous ce public_id — l'autre a été silencieusement écrasé ou rejeté à
 * l'upload. Le script signale ces collisions séparément.
 *
 * Usage : npm run verify-cloudinary
 */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('❌ CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET manquants dans .env (racine du repo).');
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');
const IMAGE_EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.svg', '.ico']);
const CHUNK_SIZE = 100;

function walk(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function toPublicId(filePath) {
  const rel = path.relative(ASSETS_DIR, filePath).split(path.sep).join('/');
  const ext = path.extname(rel);
  return 'assets/' + rel.slice(0, -ext.length);
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function deliveryUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}`;
}

async function main() {
  const allFiles = walk(ASSETS_DIR).filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()));

  const entries = allFiles.map((f) => ({
    file: path.relative(ASSETS_DIR, f).split(path.sep).join('/'),
    publicId: toPublicId(f),
  }));

  // Collisions : plusieurs fichiers locaux -> même public_id
  const byPublicId = new Map();
  for (const e of entries) {
    if (!byPublicId.has(e.publicId)) byPublicId.set(e.publicId, []);
    byPublicId.get(e.publicId).push(e.file);
  }
  const collisions = [...byPublicId.entries()].filter(([, files]) => files.length > 1);

  const uniquePublicIds = [...byPublicId.keys()];
  const foundIds = new Set();

  for (const batch of chunk(uniquePublicIds, CHUNK_SIZE)) {
    try {
      const res = await cloudinary.api.resources_by_ids(batch, { resource_type: 'image' });
      for (const r of res.resources) foundIds.add(r.public_id);
    } catch (err) {
      console.error(`❌ Échec de la requête Cloudinary pour un lot de ${batch.length} public_id(s) :`, err.message || err);
    }
  }

  console.log(`\nVérification de ${entries.length} fichier(s) local(aux) (${uniquePublicIds.length} public_id unique(s)) contre Cloudinary (${CLOUDINARY_CLOUD_NAME})...\n`);

  const rows = entries.map((e) => ({
    ...e,
    found: foundIds.has(e.publicId),
    url: deliveryUrl(e.publicId),
  }));

  const fileCol = Math.max(...rows.map((r) => r.file.length), 'fichier local'.length);
  const idCol = Math.max(...rows.map((r) => r.publicId.length), 'public_id'.length);
  console.log(`${'fichier local'.padEnd(fileCol)}  ${'public_id'.padEnd(idCol)}  trouvé  url`);
  for (const r of rows) {
    console.log(
      `${r.file.padEnd(fileCol)}  ${r.publicId.padEnd(idCol)}  ${(r.found ? 'oui' : 'NON').padEnd(6)}  ${r.found ? r.url : ''}`
    );
  }

  const missing = rows.filter((r) => !r.found);
  console.log(`\n${rows.length - missing.length}/${rows.length} fichiers trouvés sur Cloudinary.`);

  if (collisions.length) {
    console.log(`\n⚠️  Collisions de public_id (plusieurs fichiers locaux -> même public_id Cloudinary) :`);
    for (const [publicId, files] of collisions) {
      console.log(`   ${publicId}  <-  ${files.join(', ')}`);
    }
    console.log('   (un seul de ces fichiers est réellement stocké sous ce public_id ; les autres ont été écrasés ou rejetés à l\'upload — probable origine du "1 failed" vu dans l\'UI)');
  }

  if (missing.length) {
    console.log(`\n❌ Fichiers locaux absents de Cloudinary (${missing.length}) :`);
    for (const r of missing) console.log(`   ${r.file}  (public_id attendu: ${r.publicId})`);
    process.exit(1);
  } else {
    console.log('\n✅ Tous les fichiers locaux ont un public_id présent sur Cloudinary.');
  }
}

main().catch((err) => {
  console.error('❌ Échec de la vérification :', err);
  process.exit(1);
});

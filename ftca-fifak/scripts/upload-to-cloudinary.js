#!/usr/bin/env node
/**
 * Upload src/assets/ vers Cloudinary en fixant explicitement le public_id
 * sur le chemin relatif (sans extension), ex: src/assets/icons/icon-192.png
 * -> public_id "assets/icons/icon-192". Sur un compte en "Dynamic Folder
 * Mode", Cloudinary dérive le dossier affiché dans la Media Library depuis
 * les "/" du public_id quand aucun asset_folder explicite n'est fourni —
 * ça recrée donc à la fois la bonne arborescence ET la bonne URL de
 * livraison, contrairement à un upload manuel via l'UI (qui fixe le
 * dossier et le public_id indépendamment, et aplatit ce dernier).
 *
 * Déduplication : le public_id ne portant pas d'extension, un fichier
 * "nom.jpg" et son dérivé "nom.webp" viseraient le même public_id. On ne
 * garde qu'un seul "master" par nom (priorité au format original sur le
 * .webp généré) — f_auto/q_auto se charge de livrer le bon format à la
 * volée, donc le .webp local pré-généré devient redondant côté Cloudinary.
 *
 * Usage : npm run upload-assets
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
// Priorité de sélection quand plusieurs fichiers partagent le même nom sans
// extension : on garde le premier format trouvé dans cet ordre.
const EXTENSION_PRIORITY = ['.png', '.jpg', '.jpeg', '.svg', '.ico', '.webp'];

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

async function main() {
  const allFiles = walk(ASSETS_DIR).filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()));

  // Regroupe par public_id cible pour détecter les collisions nom-sans-extension.
  const groups = new Map();
  for (const f of allFiles) {
    const publicId = toPublicId(f);
    if (!groups.has(publicId)) groups.set(publicId, []);
    groups.get(publicId).push(f);
  }

  const toUpload = [];
  const skipped = [];
  for (const [publicId, files] of groups.entries()) {
    if (files.length === 1) {
      toUpload.push({ publicId, file: files[0] });
      continue;
    }
    const sorted = [...files].sort((a, b) => {
      const pa = EXTENSION_PRIORITY.indexOf(path.extname(a).toLowerCase());
      const pb = EXTENSION_PRIORITY.indexOf(path.extname(b).toLowerCase());
      return (pa === -1 ? 99 : pa) - (pb === -1 ? 99 : pb);
    });
    const winner = sorted[0];
    toUpload.push({ publicId, file: winner });
    for (const loser of sorted.slice(1)) {
      skipped.push({ publicId, file: loser, keptInstead: winner });
    }
  }

  console.log(`Upload de ${toUpload.length} asset(s) vers Cloudinary (${CLOUDINARY_CLOUD_NAME})...\n`);

  const results = [];
  const failures = [];

  for (const { publicId, file } of toUpload) {
    const localRel = path.relative(ASSETS_DIR, file).split(path.sep).join('/');
    try {
      const res = await cloudinary.uploader.upload(file, {
        public_id: publicId,
        resource_type: 'image',
        overwrite: true,
        unique_filename: false,
      });
      results.push({ local: localRel, publicId, url: res.secure_url });
      console.log(`✅ ${localRel.padEnd(30)} -> ${res.secure_url}`);
    } catch (err) {
      failures.push({ local: localRel, publicId, error: err.message || String(err) });
      console.error(`❌ ${localRel.padEnd(30)} -> ÉCHEC : ${err.message || err}`);
    }
  }

  console.log(`\n${results.length}/${toUpload.length} uploads réussis.`);

  if (skipped.length) {
    console.log(`\n⏭️  Fichiers locaux non uploadés (même public_id qu'un autre fichier, un seul master gardé par nom) :`);
    for (const s of skipped) {
      console.log(`   ${path.relative(ASSETS_DIR, s.file).split(path.sep).join('/')}  (public_id ${s.publicId} déjà pris par ${path.relative(ASSETS_DIR, s.keptInstead).split(path.sep).join('/')})`);
    }
  }

  if (failures.length) {
    console.log(`\n❌ Échecs (${failures.length}) :`);
    for (const f of failures) console.log(`   ${f.local} (public_id ${f.publicId}) : ${f.error}`);
    process.exitCode = 1;
  } else {
    console.log('\n✅ Aucun échec.');
  }
}

main().catch((err) => {
  console.error('❌ Échec du script :', err);
  process.exit(1);
});

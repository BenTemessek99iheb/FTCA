/**
 * FTCA — Inscriptions clubs → Google Sheets
 *
 * Backend "sans serveur" pour le formulaire /inscription du site (voir
 * CLUBS.md § "Brancher Google Sheets" pour la procédure de déploiement
 * complète). Un classeur Google Sheets, un onglet par club (créé
 * automatiquement au premier envoi) — pas besoin d'un classeur séparé par
 * club ni de plusieurs déploiements.
 *
 * Ce fichier se colle tel quel dans l'éditeur Apps Script (Extensions >
 * Apps Script) du classeur cible. Ne PAS renommer les fonctions doGet/doPost
 * — ce sont les points d'entrée reconnus par Apps Script.
 */

var HEADERS = [
  'Horodatage',
  'Club',
  'Prénom',
  'Nom',
  'Date de naissance',
  'Lieu de résidence',
  'Email',
  'Téléphone',
  'Pourquoi rejoindre le club',
  'Expérience cinéma',
  "Détail de l'expérience",
  'Film préféré',
  'Attentes du club',
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getOrCreateClubSheet_(data.club);

    sheet.appendRow([
      new Date(),
      data.club || '',
      data.firstName || '',
      data.lastName || '',
      data.birthDate || '',
      data.residence || '',
      data.email || '',
      data.phone || '',
      data.motivation || '',
      data.hasFilmExperience ? 'Oui' : 'Non',
      data.filmExperienceDetails || '',
      data.favoriteFilm || '',
      data.expectations || '',
    ]);

    return jsonResponse_({ status: 'ok' });
  } catch (err) {
    return jsonResponse_({ status: 'error', message: String(err) });
  }
}

// Simple vérification que le déploiement est actif — ouvrir l'URL du Web App
// dans un navigateur doit répondre ce message, pas une erreur Google.
function doGet(e) {
  return jsonResponse_({ status: 'ok', message: 'FTCA inscriptions — endpoint actif' });
}

function getOrCreateClubSheet_(clubId) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = clubId || 'sans-club';
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

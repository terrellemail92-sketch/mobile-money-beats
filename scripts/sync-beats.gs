// ─── CONFIGURATION — fill these in ──────────────────────────────────────────
const BEATS_FOLDER_ID   = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE';
const SPREADSHEET_ID    = 'PASTE_YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME        = 'Beats';
const DEFAULT_PERSONAL  = 2;
const DEFAULT_COMMERCIAL = 15;
// ─────────────────────────────────────────────────────────────────────────────

function syncNewBeats() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);

  // Get beat titles already in the sheet so we don't duplicate
  const lastRow = sheet.getLastRow();
  const existingTitles = lastRow > 1
    ? sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat().map(t => t.toString().toLowerCase())
    : [];

  const beatsFolder = DriveApp.getFolderById(BEATS_FOLDER_ID);
  const subfolders  = beatsFolder.getFolders();
  let newCount = 0;

  while (subfolders.hasNext()) {
    const beatFolder = subfolders.next();
    const folderName = beatFolder.getName();

    // Skip if already in the sheet
    if (existingTitles.includes(folderName.toLowerCase())) continue;

    let mp3Url = '', wavUrl = '', stemsUrl = '';
    const files = beatFolder.getFiles();

    while (files.hasNext()) {
      const file = files.next();
      const name = file.getName().toLowerCase();

      // Auto-share each file so the link works for buyers
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      const url = `https://drive.google.com/file/d/${file.getId()}/view`;
      if (name.endsWith('.mp3'))               mp3Url   = url;
      else if (name.endsWith('.wav'))           wavUrl   = url;
      else if (name.endsWith('.zip'))           stemsUrl = url;
    }

    const newId = sheet.getLastRow(); // auto-increment ID

    sheet.appendRow([
      newId,                // A — ID
      folderName,           // B — Title (from folder name)
      '',                   // C — BPM (you fill in)
      '',                   // D — Key (you fill in)
      '',                   // E — Tags (you fill in)
      'Loop',               // F — Category (default, change if Loop Pack)
      '',                   // G — Tier (you fill in: Heat / Solid / Archive)
      '',                   // H — Cover URL (you fill in)
      mp3Url,               // I — MP3 URL (auto-filled)
      wavUrl,               // J — WAV URL (auto-filled)
      stemsUrl,             // K — Stems URL (auto-filled)
      DEFAULT_PERSONAL,     // L — Personal Price
      DEFAULT_COMMERCIAL,   // M — Commercial Price
      'NO',                 // N — Active (flip to YES when ready to sell)
    ]);

    newCount++;
    Logger.log(`Added: ${folderName}`);
  }

  Logger.log(`Sync complete. ${newCount} new beat(s) added.`);
}

// Run this once to set up automatic daily syncing
function createDailyTrigger() {
  // Remove existing triggers first to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('syncNewBeats')
    .timeBased()
    .everyHours(6) // checks every 6 hours
    .create();

  Logger.log('Daily trigger created. Sync runs every 6 hours.');
}

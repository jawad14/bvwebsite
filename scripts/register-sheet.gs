/**
 * Best Value — Registrations webhook (Google Apps Script)
 * ------------------------------------------------------------------
 * Receives account-application submissions from /api/register, appends
 * a styled row to the "Registrations" sheet, and saves the uploaded
 * Tax I.D. file into a separate Drive folder (link stored in the sheet).
 *
 * SETUP
 * 1. SHEET_ID  = the spreadsheet that holds all form tabs.
 * 2. FOLDER_ID = Drive folder where tax files are saved.
 * 3. Deploy → New deployment → "Web app"
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the /exec URL into GOOGLE_SHEET_REGISTER_URL in .env.local
 */

var SHEET_ID   = '1GS1W7aSvQDnXioEt0jDHDUGVtHFRPi05I7x8ebCsoBQ';
var FOLDER_ID  = '1FvFs7LqhU-G712st0dRbBRsh2H-5lhEp';
var SHEET_NAME = 'Registrations';

var HEADERS = [
  'Timestamp', 'Company Name', 'Address', 'Tel / ID #', 'Mobile', 'Fax',
  'Contact Name', 'Email', 'Tax Deduction', 'Print Name', 'Tax File',
];
var WIDTHS = [150, 190, 230, 120, 120, 120, 170, 220, 120, 170, 240];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Save the tax file (if any) to the Drive folder and keep its link.
    var taxFileLink = '';
    if (data.taxFileData && data.taxFileName) {
      var folder = DriveApp.getFolderById(FOLDER_ID);
      var bytes  = Utilities.base64Decode(data.taxFileData);
      var blob   = Utilities.newBlob(bytes, data.taxFileType || 'application/octet-stream', data.taxFileName);
      var safeCompany = String(data.companyName || 'unknown').replace(/[^\w.-]+/g, '_').substring(0, 60);
      blob.setName(safeCompany + '_' + nowStamp() + '_' + data.taxFileName);
      taxFileLink = folder.createFile(blob).getUrl();
    }

    var sheet = getSheet();
    sheet.appendRow([
      new Date(),
      data.companyName  || '',
      data.address      || '',
      data.tel          || '',
      data.mobile       || '',
      data.fax          || '',
      data.contactName  || '',
      data.email        || '',
      data.taxDeduction || '',
      data.printName    || '',
      taxFileLink,
    ]);
    styleBody(sheet);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  styleHeader(sheet);
  return sheet;
}

/* ── Shared styling ─────────────────────────────────────────────── */

var BRAND_NAVY = '#001D68';

function styleHeader(sheet) {
  if (sheet.getRange(1, 1).getValue() !== HEADERS[0]) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  var header = sheet.getRange(1, 1, 1, HEADERS.length);
  header
    .setBackground(BRAND_NAVY)
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(11)
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left');
  sheet.setRowHeight(1, 34);
  sheet.setFrozenRows(1);
  for (var i = 0; i < WIDTHS.length; i++) sheet.setColumnWidth(i + 1, WIDTHS[i]);
  // Remove unused trailing columns for a clean look.
  var maxCols = sheet.getMaxColumns();
  if (maxCols > HEADERS.length) sheet.deleteColumns(HEADERS.length + 1, maxCols - HEADERS.length);
}

function styleBody(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  var body = sheet.getRange(2, 1, lastRow - 1, HEADERS.length);
  body.setVerticalAlignment('top').setWrap(true).setFontSize(10);
  // Zebra striping without clobbering the header style.
  for (var r = 2; r <= lastRow; r++) {
    sheet.getRange(r, 1, 1, HEADERS.length)
      .setBackground(r % 2 === 0 ? '#F4F6FB' : '#FFFFFF');
  }
}

function nowStamp() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

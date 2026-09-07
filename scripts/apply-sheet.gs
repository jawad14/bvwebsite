/**
 * Best Value — Careers Application webhook (Google Apps Script)
 * ------------------------------------------------------------------
 * Receives job applications (from the /careers/apply form via /api/apply),
 * appends a styled row to the "Applications" tab, and saves the uploaded
 * resume into a Drive folder (link stored in the sheet).
 *
 * SETUP
 * 1. SHEET_ID  = the dedicated Applications spreadsheet (its own file).
 * 2. FOLDER_ID = the dedicated Resumes Drive folder.
 * 3. Deploy → New deployment → "Web app"
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the /exec URL into GOOGLE_SHEET_APPLY_URL in .env.local
 */

var SHEET_ID   = '10OJo_BrqsolDf3tWDIhfy06I-hfkKSJF6TMYSytAsYY';
var FOLDER_ID  = '1UX6q11w_7gMXQHhAuC9tvfFyE2bSjuuZ';
var SHEET_NAME = 'Applications';

var HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Address', 'Position(s)', 'Education', 'Resume'];
var WIDTHS  = [150, 170, 220, 130, 240, 200, 320, 240];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Save the resume (if any) to the Drive folder and keep its link.
    var resumeLink = '';
    if (data.resumeData && data.resumeName) {
      var folder = DriveApp.getFolderById(FOLDER_ID);
      var bytes  = Utilities.base64Decode(data.resumeData);
      var blob   = Utilities.newBlob(bytes, data.resumeType || 'application/octet-stream', data.resumeName);
      var safeName = String(data.name || 'applicant').replace(/[^\w.-]+/g, '_').substring(0, 60);
      blob.setName(safeName + '_' + nowStamp() + '_' + data.resumeName);
      resumeLink = folder.createFile(blob).getUrl();
    }

    var sheet = getSheet();
    sheet.appendRow([
      new Date(),
      data.name      || '',
      data.email     || '',
      data.phone     || '',
      data.address   || '',
      data.position  || '',
      data.education || '',
      resumeLink,
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
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setBackground(BRAND_NAVY)
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(11)
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left');
  sheet.setRowHeight(1, 34);
  sheet.setFrozenRows(1);
  for (var i = 0; i < WIDTHS.length; i++) sheet.setColumnWidth(i + 1, WIDTHS[i]);
  var maxCols = sheet.getMaxColumns();
  if (maxCols > HEADERS.length) sheet.deleteColumns(HEADERS.length + 1, maxCols - HEADERS.length);
}

function styleBody(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  sheet.getRange(2, 1, lastRow - 1, HEADERS.length)
    .setVerticalAlignment('top').setWrap(true).setFontSize(10);
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

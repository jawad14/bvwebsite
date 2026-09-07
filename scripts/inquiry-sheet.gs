/**
 * Best Value — Paints Inquiry webhook (Google Apps Script)
 * ------------------------------------------------------------------
 * Receives paint product inquiries (from the /paints "Inquire" modal via
 * /api/inquiry) and appends a styled row to the "Inquiries" tab.
 * No file uploads — this form has no attachments.
 *
 * SETUP
 * 1. SHEET_ID = the dedicated Inquiries spreadsheet (its own file).
 * 2. Deploy → New deployment → "Web app"
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 3. Copy the /exec URL into GOOGLE_SHEET_INQUIRY_URL in .env.local
 */

var SHEET_ID   = '1QOrb2bFMkAfEggbP-g6QD_YUmR06QkYhesNocUj6AVc';
var SHEET_NAME = 'Inquiries';

var HEADERS = ['Timestamp', 'Category', 'Name', 'Email', 'Phone', 'Message'];
var WIDTHS  = [150, 190, 170, 220, 130, 420];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = getSheet();
    sheet.appendRow([
      new Date(),
      data.category || '',
      data.name     || '',
      data.email    || '',
      data.phone    || '',
      data.message  || '',
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

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

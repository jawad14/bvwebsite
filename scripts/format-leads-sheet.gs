/**
 * Best Value — Leads sheet formatter + column adder (one-time / re-runnable)
 * --------------------------------------------------------------------------
 * Styles the existing "leads" (quote requests) sheet to match the other
 * form sheets and ADDS lead-tracking columns at the end.
 *
 * HOW TO RUN
 * 1. Open the leads spreadsheet in your browser.
 * 2. Extensions → Apps Script.
 * 3. Paste this file, Save.
 * 4. Select "formatLeadsSheet" in the function dropdown → Run.
 *    (Authorize when prompted — it only touches this spreadsheet.)
 *
 * Safe to run repeatedly: it won't duplicate columns and won't overwrite
 * your existing lead data.
 */

// Leave '' to use the first/active sheet, or set the exact tab name.
var LEADS_SHEET_NAME = '';

// If the sheet has NO header row yet, these are written (matches /api/quote).
var DEFAULT_HEADERS = ['Name', 'Phone', 'Email', 'Vehicle', 'Parts', 'Notes'];

// Tracking columns appended to the right (only if not already present).
var TRACKING_COLUMNS = ['Status', 'Assigned To', 'Follow-Up Date', 'Internal Notes'];

// Dropdown options for the Status column.
var STATUS_OPTIONS = ['New', 'Contacted', 'Quoted', 'Won', 'Lost'];

var BRAND_NAVY = '#001D68';

function formatLeadsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = LEADS_SHEET_NAME ? ss.getSheetByName(LEADS_SHEET_NAME) : ss.getSheets()[0];
  if (!sheet) throw new Error('Leads sheet not found: ' + LEADS_SHEET_NAME);

  // 1. Ensure there is a header row.
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var firstCell = sheet.getRange(1, 1).getValue();
  if (firstCell === '' && sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, DEFAULT_HEADERS.length).setValues([DEFAULT_HEADERS]);
    lastCol = DEFAULT_HEADERS.length;
  }

  // 2. Read current headers.
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0]
    .map(function (h) { return String(h).trim(); });

  // 3. Append any missing tracking columns.
  TRACKING_COLUMNS.forEach(function (col) {
    if (headers.indexOf(col) === -1) {
      lastCol += 1;
      sheet.getRange(1, lastCol).setValue(col);
      headers.push(col);
    }
  });

  // 4. Style the header row.
  var header = sheet.getRange(1, 1, 1, lastCol);
  header
    .setBackground(BRAND_NAVY)
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(11)
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left');
  sheet.setRowHeight(1, 34);
  sheet.setFrozenRows(1);

  // 5. Body styling + zebra striping.
  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    var body = sheet.getRange(2, 1, lastRow - 1, lastCol);
    body.setVerticalAlignment('top').setWrap(true).setFontSize(10);
    for (var r = 2; r <= lastRow; r++) {
      sheet.getRange(r, 1, 1, lastCol)
        .setBackground(r % 2 === 0 ? '#F4F6FB' : '#FFFFFF');
    }
  }

  // 6. Status dropdown on the whole Status column.
  var statusIdx = headers.indexOf('Status');
  if (statusIdx !== -1) {
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(STATUS_OPTIONS, true)
      .setAllowInvalid(false)
      .build();
    sheet.getRange(2, statusIdx + 1, Math.max(sheet.getMaxRows() - 1, 1), 1).setDataValidation(rule);
  }

  // 7. Reasonable widths.
  for (var c = 1; c <= lastCol; c++) {
    var name = headers[c - 1];
    var w = 150;
    if (name === 'Parts' || name === 'Notes' || name === 'Internal Notes') w = 320;
    else if (name === 'Email' || name === 'Vehicle') w = 220;
    else if (name === 'Name' || name === 'Assigned To') w = 170;
    sheet.setColumnWidth(c, w);
  }

  SpreadsheetApp.getActiveSpreadsheet().toast('Leads sheet formatted ✓');
}

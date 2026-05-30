/**
 * Backend RSVP Undangan Digital
 * Cara pakai:
 * 1. Buat Google Sheets baru.
 * 2. Buka Extensions > Apps Script.
 * 3. Tempel kode ini.
 * 4. Deploy > New deployment > Web app.
 * 5. Execute as: Me.
 * 6. Who has access: Anyone.
 * 7. Salin URL Web App, lalu tempel ke WEDDING_CONFIG.googleScriptUrl.
 */

const SHEET_NAME = "RSVP";

// Kosongkan jika Apps Script dibuat dari Google Sheets yang sama.
// Isi dengan Spreadsheet ID jika Apps Script dibuat sebagai project standalone.
const SPREADSHEET_ID = "";

const HEADERS = [
  "Timestamp",
  "Nama Tamu",
  "Kehadiran",
  "Jumlah Tamu",
  "Ucapan",
  "Link Undangan",
  "Acara",
  "User Agent"
];

function doGet() {
  return jsonResponse_({
    status: "active",
    message: "RSVP Web App aktif"
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const data = parseRequest_(e);
    const sheet = getSheet_();

    ensureHeaders_(sheet);

    const rowData = [
      new Date(),
      data.name || "",
      data.attendance || "",
      data.guest_count || "",
      data.message || "",
      data.guest_url || "",
      data.event_name || "",
      data.user_agent || ""
    ];

    const updatedRow = upsertByGuestName_(sheet, data.name, rowData);

    return jsonResponse_({
      status: "success",
      message: "RSVP berhasil disimpan",
      row: updatedRow
    });

  } catch (error) {
    return jsonResponse_({
      status: "error",
      message: error.message
    });

  } finally {
    lock.releaseLock();
  }
}

function parseRequest_(e) {
  if (!e) {
    return {};
  }

  const contentType = e.postData && e.postData.type ? e.postData.type : "";

  if (contentType.indexOf("application/json") !== -1 && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }

  return e.parameter || {};
}

function getSheet_() {
  const spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error("Spreadsheet tidak ditemukan. Buat Apps Script dari Google Sheets atau isi SPREADSHEET_ID.");
  }

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders_(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), HEADERS.length);
  const firstRow = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const hasHeader = firstRow.some(function (cell) {
    return String(cell).trim() !== "";
  });

  if (!hasHeader) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function upsertByGuestName_(sheet, guestName, rowData) {
  if (!guestName) {
    sheet.appendRow(rowData);
    return sheet.getLastRow();
  }

  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    sheet.appendRow(rowData);
    return sheet.getLastRow();
  }

  const names = sheet.getRange(2, 2, lastRow - 1, 1).getValues();

  for (let i = 0; i < names.length; i++) {
    const existingName = String(names[i][0]).trim().toLowerCase();

    if (existingName === String(guestName).trim().toLowerCase()) {
      const rowNumber = i + 2;
      sheet.getRange(rowNumber, 1, 1, rowData.length).setValues([rowData]);
      return rowNumber;
    }
  }

  sheet.appendRow(rowData);
  return sheet.getLastRow();
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

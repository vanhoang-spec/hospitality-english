// Minimal CSV parse/stringify for the org-admin bulk-import feature.
// No external dependency — files here are small (dozens to low
// hundreds of rows), admin-authored, and only need to round-trip
// through Excel/Sheets, so a hand-rolled RFC4180-ish parser is enough.

/** Parses CSV text into rows of raw string cells. Handles quoted fields
 * (with embedded commas/newlines/escaped "") and \n or \r\n line endings. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const len = text.length;

  function pushField() {
    row.push(field);
    field = "";
  }
  function pushRow() {
    pushField();
    rows.push(row);
    row = [];
  }

  while (i < len) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      pushField();
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      continue;
    }
    if (c === "\n") {
      pushRow();
      i++;
      continue;
    }
    field += c;
    i++;
  }
  if (field.length > 0 || row.length > 0) pushRow();

  // Drop fully-blank trailing rows (e.g. a trailing newline in the file).
  return rows.filter((r) => !(r.length === 1 && r[0].trim() === ""));
}

/** Stringifies rows back to CSV text (CRLF line endings, quoting only where needed). */
export function toCsv(rows: string[][]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const needsQuote = /[",\n\r]/.test(cell);
          const escaped = cell.replace(/"/g, '""');
          return needsQuote ? `"${escaped}"` : escaped;
        })
        .join(","),
    )
    .join("\r\n");
}

// Strips Vietnamese diacritics and lowercases, for tolerant header matching
// (so "Số điện thoại", "so dien thoai", "SĐT" style headers all resolve).
function foldHeader(s: string): string {
  return s
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

const HEADER_ALIASES = {
  name: ["ten", "name", "ho ten", "full_name", "fullname"],
  phone: ["so dien thoai", "sdt", "dien thoai", "phone"],
  password: ["mat khau", "password", "pass"],
  department: ["phong ban", "department", "dept", "ban"],
} as const;

export type CsvColumn = keyof typeof HEADER_ALIASES;

/** Maps each expected logical column to the index of its matching header
 * cell (by folded alias match), or -1 if the header row has no match. */
export function mapCsvHeaders(headerRow: string[]): Record<CsvColumn, number> {
  const folded = headerRow.map(foldHeader);
  const result = {} as Record<CsvColumn, number>;
  (Object.keys(HEADER_ALIASES) as CsvColumn[]).forEach((col) => {
    result[col] = folded.findIndex((h) => HEADER_ALIASES[col].includes(h as never));
  });
  return result;
}

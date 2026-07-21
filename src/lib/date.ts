// Local-calendar-day helpers. Streaks and review scheduling are meant to
// track the learner's own day, not UTC — using toISOString() here would
// mark anything before 07:00 in Vietnam (UTC+7) as still "yesterday".

export function localDateStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function yesterdayStr(): string {
  return addDays(localDateStr(), -1);
}

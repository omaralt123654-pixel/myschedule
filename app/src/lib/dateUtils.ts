// Pure date helpers used to make the grid/calendar work for ANY month/year,
// instead of the old hardcoded "January 2026" values.

export function getDaysInMonth(year: number, month: number): number {
  // month is 0-indexed (0 = Jan). Day 0 of next month = last day of this month.
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstWeekday(year: number, month: number): number {
  // 0 = Sunday ... 6 = Saturday
  return new Date(year, month, 1).getDay();
}

export function dateKey(year: number, month: number, day: number): string {
  return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

export function isSameDay(year: number, month: number, day: number, date: Date): boolean {
  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  );
}

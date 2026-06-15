export function toDateInputValue(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getMonthKey(date: string) {
  return date.slice(0, 7);
}

export function getTodayKey() {
  return toDateInputValue(new Date());
}

export function isCurrentMonth(date: string) {
  return getMonthKey(date) === getMonthKey(getTodayKey());
}

export function isWithinLastDays(date: string, days: number) {
  const itemTime = new Date(`${date}T00:00:00`).getTime();
  const today = new Date(`${getTodayKey()}T00:00:00`).getTime();
  const diff = today - itemTime;
  return diff >= 0 && diff <= days * 24 * 60 * 60 * 1000;
}

export function formatDisplayDate(date: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

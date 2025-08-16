// Shared date-related constants and utilities

export const WEEKDAYS: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function isSameDay(a: Date, b: Date) {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

export function clamp(date: Date, min?: Date, max?: Date) {
  let d = date;
  if (min && d < min) d = min;
  if (max && d > max) d = max;
  return d;
}

export function getMonthDays(view: Date): (Date | null)[] {
  const monthStart = new Date(view);
  monthStart.setDate(1);
  const monthEnd = new Date(view);
  monthEnd.setMonth(monthEnd.getMonth() + 1, 0);
  const leading = (monthStart.getDay() + 6) % 7; // Monday=0
  const totalDays = monthEnd.getDate();
  const out: (Date | null)[] = [];
  for (let i = 0; i < leading; i++) out.push(null);
  for (let d = 1; d <= totalDays; d++) out.push(new Date(view.getFullYear(), view.getMonth(), d));
  return out;
}

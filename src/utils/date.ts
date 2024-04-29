import { addDays, startOfDay, isSameDay } from "date-fns";

export interface Entry {
  month: number;
  data: {
    index: number;
    sunday: Date;
  }[];
}

export const formatter = new Intl.DateTimeFormat("fr-CA", {
  day: "2-digit",
});

export const dayFormatter = new Intl.DateTimeFormat("fr-CA", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function getNextSunday() {
  const today = new Date();
  return startOfDay(addDays(today, (7 - today.getDay()) % 7));
}

export function isNextSunday(givenDate: Date): boolean {
  return isSameDay(givenDate, getNextSunday());
}

export function isCurrentMonth(month: number): boolean {
  return getNextSunday().getMonth() === month - 1;
}

export function isPastMonth(month: number): boolean {
  return getNextSunday().getMonth() > month - 1;
}

export function getSundaysInYear(year: number): Entry[] {
  const entries: Entry[] = [];
  let index = 0;
  const date = new Date(year, 0, 1); // Start from January 1st of the given year

  for (let month = 0; month < 12; month++) {
    const data: Entry["data"] = [];

    while (date.getMonth() === month) {
      if (date.getDay() === 0) {
        data.push({ index: index++, sunday: new Date(date) });
      }

      date.setDate(date.getDate() + 1);
    }

    entries.push({ month: month + 1, data });
  }

  return entries;
}

export function getMonthSundays(year: number, month: number) {
  const sundays: Date[] = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    if (date.getDay() === 0) {
      sundays.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }

  return sundays;
}

export const frenchMonthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const names = ["Harivelo", "Fabrice", "Tolotra", "Njaka"];

export function getName(index: number) {
  return names[index % names.length];
}

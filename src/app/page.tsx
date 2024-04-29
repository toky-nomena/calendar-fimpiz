import { cn } from "~/utils/cn";
import {
  type Entry,
  formatter,
  frenchMonthNames,
  getSundaysInYear,
  isNextSunday,
  getName,
  isCurrentMonth,
  dayFormatter,
} from "~/utils/date";

export default function HomePage() {
  const entries = getSundaysInYear(2024);
  return (
    <div className="xs:grid-cols-2 grid gap-8 p-8 md:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <MonthView key={entry.month} entry={entry} />
      ))}
    </div>
  );
}

function MonthView({ entry }: { entry: Entry }) {
  return (
    <div
      className={cn(
        "bg-tile-color flex flex-col opacity-40 drop-shadow-sm",
        isCurrentMonth(entry.month) && "scale-102 opacity-100",
      )}
    >
      <div className="border-b-2 p-3 text-xl font-semibold uppercase">
        {frenchMonthNames[entry.month - 1]}
      </div>
      <ul className="flex list-disc flex-col gap-2 p-3">
        {entry.data.map((data) => (
          <DateView
            date={data.sunday}
            index={data.index}
            key={data.sunday.toDateString()}
          />
        ))}
      </ul>
    </div>
  );
}

function DateView({ index, date }: { index: number; date: Date }) {
  const isNext = isNextSunday(date);
  return (
    <li className="flex list-none items-center justify-between text-gray-400">
      <div
        className={cn(
          "flex items-center gap-2 text-sm font-normal",
          isNext && "text-md font-bold text-blue-600",
        )}
      >
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-400 text-xs font-semibold",
            isNext && "border-none bg-blue-600 text-white",
          )}
        >
          {formatter.format(date)}
        </div>
        <div>{getName(index)}</div>
      </div>
      {isNext && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="text-blue-600"
        >
          <title>Piano</title>
          <path d="M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8" />
          <path d="M2 14h20" />
          <path d="M6 14v4" />
          <path d="M10 14v4" />
          <path d="M14 14v4" />
          <path d="M18 14v4" />
        </svg>
      )}
    </li>
  );
}

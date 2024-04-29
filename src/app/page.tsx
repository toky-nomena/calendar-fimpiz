import { cn } from "~/utils/cn";
import {
  type Entry,
  formatter,
  frenchMonthNames,
  getSundaysInYear,
  isNextSunday,
  getName,
  isCurrentMonth,
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
  const isCurrent = isCurrentMonth(entry.month);

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-gray-700 bg-black opacity-50 drop-shadow-sm",
        isCurrent && "scale-102 opacity-100",
      )}
    >
      <div className="border-0 border-b border-solid border-gray-700 p-3 text-xl font-semibold uppercase">
        {frenchMonthNames[entry.month - 1]}
      </div>
      <ul className={cn("flex list-disc flex-col gap-2 py-3")}>
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
    <li
      className={cn(
        "flex list-none items-center justify-between px-3 text-gray-50",
        isNext && "bg-green-200 py-2 text-lg text-black",
      )}
    >
      <div className={"flex items-center gap-2 font-normal"}>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 text-xs font-semibold",
            isNext && "border-black",
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
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <title>Note</title>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}
    </li>
  );
}

import { format, isSameDay } from "date-fns";

interface Props {
    weekDays: Date[];
    shifts: any[];
    getShiftForDay: (date: Date) => any;
}

export const MiniWeekCalendar = ({
  weekDays,
  shifts,
  getShiftForDay,
}: Props) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          This Week's Overview
        </h2>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const shift = getShiftForDay(day);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toISOString()}
                className={`text-center p-3 rounded-lg border ${
                  isToday
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {format(day, "EEE")}
                </div>

                <div
                  className={`text-lg font-semibold mb-2 ${
                    isToday
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {format(day, "d")}
                </div>

                {shift && (
                  <div className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    {shift.type}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
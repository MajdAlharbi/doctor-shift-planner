import { startOfWeek, addDays, isSameDay } from "date-fns";

/* =========================
   📊 Calculate Main Stats
========================= */

interface CalculateStatsParams {
  shifts: any[];
  commitments: any[];
  conflicts: any[];
  recoveryRules: { minSleepAfterNightShift: number };
}

export const calculateStats = ({
  shifts,
  commitments,
  conflicts,
  recoveryRules,
}: CalculateStatsParams) => {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = addDays(weekStart, 6);

  const thisWeekShifts = shifts.filter(
    (s) => s.date >= weekStart && s.date <= weekEnd
  ).length;

  const nightShifts = shifts.filter((s) => s.type === "night");

  const recoveryHours =
    nightShifts.length * recoveryRules.minSleepAfterNightShift;

  const activeConflicts = conflicts.filter(
    (c) => c.status === "active"
  ).length;

  const maxRecommendedShifts = 5;

  const workLifeBalance = Math.max(
    0,
    100 - (thisWeekShifts / maxRecommendedShifts) * 100
  );

  return {
    thisWeekShifts,
    recoveryHours,
    personalCommitments: commitments.length,
    activeConflicts,
    workLifeBalance,
    maxShifts: maxRecommendedShifts,
  };
};

/* =========================
   🚨 Urgent Conflicts
========================= */

export const getUrgentConflicts = (conflicts: any[]) => {
  return conflicts
    .filter((c) => c.status === "active" && c.severity === "high")
    .slice(0, 3);
};

/* =========================
   📅 Generate Week Days
========================= */

export const generateWeekDays = () => {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });

  return Array.from({ length: 7 }, (_, i) =>
    addDays(weekStart, i)
  );
};

/* =========================
   🔎 Get Shift For Specific Day
========================= */

export const getShiftForDay = (
  shifts: any[],
  date: Date
) => {
  return shifts.find((s) => isSameDay(s.date, date));
};
import { useMemo } from "react";
import { startOfWeek, addDays, isSameDay } from "date-fns";
import { useApp } from "../../../contexts/AppContext";

export const useDashboardStats = () => {
  const {
    shifts,
    commitments,
    conflicts,
    recoveryRules,
  } = useApp();

  const stats = useMemo(() => {
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
  }, [shifts, commitments, conflicts, recoveryRules]);

  const urgentConflicts = useMemo(
    () =>
      conflicts
        .filter((c) => c.status === "active" && c.severity === "high")
        .slice(0, 3),
    [conflicts]
  );

  const weekDays = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, []);

  const getShiftForDay = (date: Date) =>
    shifts.find((s) => isSameDay(s.date, date));

  return {
    stats,
    urgentConflicts,
    weekDays,
    getShiftForDay,
  };
};
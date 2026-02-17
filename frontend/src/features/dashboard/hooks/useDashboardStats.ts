import { useMemo } from "react";
import { startOfWeek, addDays, isSameDay } from "date-fns";
import { useApp } from "../../../contexts/AppContext";
import { calculateDashboardStats } from "../utils/dashboardCalculations";

export const useDashboardStats = () => {
  const { shifts, commitments, conflicts, recoveryRules } = useApp();

  // 🧠 Business Engine
  const stats = useMemo(() => {
    return calculateDashboardStats(shifts, commitments, recoveryRules);
  }, [shifts, commitments, recoveryRules]);

  // 🚨 Urgent Conflicts (UI-level logic)
  const urgentConflicts = useMemo(
    () =>
      conflicts
        .filter((c) => c.status === "active" && c.severity === "high")
        .slice(0, 3),
    [conflicts]
  );

  // 📅 Mini calendar week
  const weekDays = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, []);

  const getShiftForDay = (date: Date) =>
    shifts.find((s) => isSameDay(s.date, date));

  return {
    ...stats,
    urgentConflicts,
    weekDays,
    getShiftForDay,
  };
};

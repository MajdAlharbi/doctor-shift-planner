import React, { useMemo, useState } from "react";
import { Lightbulb } from "lucide-react";
import { startOfWeek, addDays, isSameDay } from "date-fns";

import { useApp } from "../../contexts/AppContext";

import { QuickTips } from "../../components/QuickTips";
import { StatsGrid } from "./components/StatsGrid";
import { MiniWeekCalendar } from "./components/MiniWeekCalendar";
import { QuickActions } from "./components/QuickActions";
import { UrgentConflicts } from "./components/UrgentConflicts";
import { WorkLifeBalance } from "./components/WorkLifeBalance";

export const Dashboard: React.FC = () => {
  const {
    profile,
    shifts,
    commitments,
    conflicts,
    recoveryRules,
    t,
  } = useApp();

  const [showTips, setShowTips] = useState(false);

  // ===============================
  // 📊 Stats Calculation
  // ===============================
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

  // ===============================
  // 🚨 Urgent Conflicts
  // ===============================
  const urgentConflicts = conflicts
    .filter((c) => c.status === "active" && c.severity === "high")
    .slice(0, 3);

  // ===============================
  // 📅 Week Days
  // ===============================
  const weekDays = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });

    return Array.from({ length: 7 }, (_, i) =>
      addDays(weekStart, i)
    );
  }, []);

  const getShiftForDay = (date: Date) =>
    shifts.find((s) => isSameDay(s.date, date));

  // ===============================
  // 📦 Stat Cards Data
  // ===============================
  const statCards = [
    {
      title: t("thisWeekShifts"),
      value: stats.thisWeekShifts,
      color: "blue",
    },
    {
      title: t("recoveryHours"),
      value: stats.recoveryHours,
      color: "green",
    },
    {
      title: t("personalCommitments"),
      value: stats.personalCommitments,
      color: "orange",
    },
    {
      title: t("activeConflicts"),
      value: stats.activeConflicts,
      color: "red",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ===============================
            👋 Welcome Section
        =============================== */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("welcome")}, {profile.name.split(" ")[0]} 👋
          </h1>

          <p className="text-gray-600 dark:text-gray-400">
            {profile.specialty} • {profile.hospital}
          </p>
        </div>

        {/* ===============================
            📊 Stats Grid
        =============================== */}
        <StatsGrid statCards={statCards} />

        {/* ===============================
            🧱 Main Layout Grid
        =============================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <MiniWeekCalendar
              weekDays={weekDays}
              shifts={shifts}
              getShiftForDay={getShiftForDay}
            />

            <UrgentConflicts conflicts={urgentConflicts} />
          </div>

          {/* Right Side */}
          <div className="space-y-8">
            <QuickActions />

            <WorkLifeBalance
              score={stats.workLifeBalance}
              maxShifts={stats.maxShifts}
            />
          </div>

        </div>

        {/* ===============================
            💡 Help Button
        =============================== */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowTips(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg transition-colors font-medium"
          >
            <Lightbulb className="w-5 h-5" />
            View Quick Tips
          </button>
        </div>

      </div>

      {/* Quick Tips Modal */}
      {showTips && <QuickTips onClose={() => setShowTips(false)} />}
    </div>
  );
};

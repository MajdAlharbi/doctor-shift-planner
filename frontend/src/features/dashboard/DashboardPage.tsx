import React, { useState } from "react";
import { Lightbulb } from "lucide-react";

import { useApp } from "../../contexts/AppContext";
import { QuickTips } from "./components/QuickTips";

import { StatsGrid } from "./components/StatsGrid";
import { MiniWeekCalendar } from "./components/MiniWeekCalendar";
import { QuickActions } from "./components/QuickActions";
import { UrgentConflicts } from "./components/UrgentConflicts";
import { WorkLifeBalance } from "./components/WorkLifeBalance";

import type { StatCard } from "./types";
import { useDashboardStats } from "./hooks/useDashboardStats";

export const Dashboard: React.FC = () => {
  const { profile, t, shifts } = useApp();
  const [showTips, setShowTips] = useState(false);

const {
  totalShiftMinutes,
  weeklyShiftCount,
  nightShiftCount,
  commitmentsOnShiftDays,
  recoveryCompliance,
  workLifeScore,
  burnoutRisk,
  urgentConflicts,
  weekDays,
  getShiftForDay,
} = useDashboardStats();


  const statCards: StatCard[] = [
    { title: t("thisWeekShifts"), value: weeklyShiftCount, color: "blue" },
    { title: t("recoveryHours"), value: recoveryCompliance, color: "green" },
    { title: t("personalCommitments"), value: commitmentsOnShiftDays, color: "orange" },
    { title: t("activeConflicts"), value: urgentConflicts.length, color: "red" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("welcome")}, {profile.name.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {profile.specialty} • {profile.hospital}
          </p>
        </div>

        <StatsGrid statCards={statCards} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          <div className="lg:col-span-2 space-y-8">
            <MiniWeekCalendar
              weekDays={weekDays}
              shifts={shifts}
              getShiftForDay={getShiftForDay}
            />
            <UrgentConflicts conflicts={urgentConflicts} />
          </div>

          <div className="space-y-8">
            <QuickActions />
            <WorkLifeBalance
  score={workLifeScore}
  maxShifts={5}
/>

          </div>

        </div>

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

      {showTips && <QuickTips onClose={() => setShowTips(false)} />}
    </div>
  );
};

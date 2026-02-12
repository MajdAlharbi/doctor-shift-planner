
import { Progress } from "../../../components/ui/progress";

interface WorkLifeBalanceProps {
  score: number;
  maxShifts: number;
}

export const WorkLifeBalance = ({
  score,
  maxShifts,
}: WorkLifeBalanceProps) => {
  return (
    <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Work-Life Balance
      </h2>

      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Work-Life Balance Score
        </p>
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {score.toFixed(0)}%
        </p>
      </div>

      <Progress value={score} />

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
        Maximum recommended: {maxShifts} shifts/week
      </p>
    </div>
  );
};
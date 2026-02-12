import { Link } from "react-router-dom";

interface Conflict {
  id: string;
  description: string;
  ruleViolated: string;
  status: string;
  severity: string;
}

interface UrgentConflictsProps {
  conflicts: Conflict[];
}

export const UrgentConflicts = ({
  conflicts,
}: UrgentConflictsProps) => {
  const urgent = conflicts
    .filter(
      (c) => c.status === "active" && c.severity === "high"
    )
    .slice(0, 3);

  if (urgent.length === 0) return null;

  return (
    <div className="mt-8 bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-red-900 dark:text-red-100">
          ⚠️ Urgent Conflicts
        </h2>

        <Link
          to="/conflicts"
          className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {urgent.map((conflict) => (
          <div
            key={conflict.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-200 dark:border-red-800"
          >
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              {conflict.description}
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Rule: {conflict.ruleViolated}
            </p>

            <Link
              to="/conflicts"
              className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
            >
              Resolve Now →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
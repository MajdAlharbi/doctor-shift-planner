import { Link } from "react-router-dom";
import { Plus, Sparkles, ChevronRight } from "lucide-react";
import { useApp } from "../../../contexts/AppContext";

export function QuickActions() {
  const { t } = useApp();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Quick Actions
      </h2>

      <div className="space-y-3">

        <Link
          to="/shifts"
          className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              {t("addShift")}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
        </Link>

        <Link
          to="/commitments"
          className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              {t("addCommitment")}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400" />
        </Link>

        <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all group">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="font-medium text-white">
              {t("generatePlan")}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80 group-hover:text-white" />
        </button>

      </div>
    </div>
  );
}
import type { StatCard } from "../types";

interface Props {
  statCards: StatCard[];
}

const colorMap = {
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-green-500",
    text: "text-green-600 dark:text-green-400",
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-orange-600 dark:text-orange-400",
  },
  red: {
    bg: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
  },
};

export const StatsGrid = ({ statCards }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => {
        const styles = colorMap[stat.color];

        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${styles.bg} p-3 rounded-lg`}>
                <span className="w-6 h-6 text-white" />
              </div>

              <span className={`text-3xl font-bold ${styles.text}`}>
                {stat.value}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

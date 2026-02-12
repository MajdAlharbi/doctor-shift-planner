interface Props {
  statCards: any[];
}

export const StatsGrid = ({ statCards }: Props) => {
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
        <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
            <div className="flex items-center justify-between mb-4">
            <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
            </div>

            <span className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
            </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
            {stat.title}
            </p>
        </div>
        ))}
    </div>
    );
};
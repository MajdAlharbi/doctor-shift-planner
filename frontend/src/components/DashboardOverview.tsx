import { Clock, Heart, AlertTriangle, Calendar, Plus, FileText, Bell, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { MiniWeeklyCalendar } from './MiniWeeklyCalendar';

interface DashboardOverviewProps {
  isDarkMode: boolean;
  isRTL: boolean;
  onNavigateToCalendar: () => void;
}

export function DashboardOverview({ isDarkMode, isRTL, onNavigateToCalendar }: DashboardOverviewProps) {
  // Statistics data
  const stats = [
    {
      icon: <Clock className="w-6 h-6" />,
      label: isRTL ? 'ساعات العمل هذا الأسبوع' : 'Work Hours This Week',
      value: '42',
      unit: isRTL ? 'ساعة' : 'hours',
      change: '+5%',
      trend: 'up',
      color: 'blue',
      bgColor: isDarkMode ? 'bg-blue-900/40' : 'bg-blue-50',
      iconBg: isDarkMode ? 'bg-blue-800' : 'bg-blue-100',
      iconColor: isDarkMode ? 'text-blue-400' : 'text-blue-600',
      textColor: isDarkMode ? 'text-blue-400' : 'text-blue-600'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: isRTL ? 'فترات الاستراحة' : 'Recovery Periods',
      value: '18',
      unit: isRTL ? 'ساعة' : 'hours',
      change: '+12%',
      trend: 'up',
      color: 'emerald',
      bgColor: isDarkMode ? 'bg-emerald-900/40' : 'bg-emerald-50',
      iconBg: isDarkMode ? 'bg-emerald-800' : 'bg-emerald-100',
      iconColor: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
      textColor: isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: isRTL ? 'المناوبات المجدولة' : 'Scheduled Shifts',
      value: '24',
      unit: isRTL ? 'مناوبة' : 'shifts',
      change: '+3',
      trend: 'up',
      color: 'purple',
      bgColor: isDarkMode ? 'bg-purple-900/40' : 'bg-purple-50',
      iconBg: isDarkMode ? 'bg-purple-800' : 'bg-purple-100',
      iconColor: isDarkMode ? 'text-purple-400' : 'text-purple-600',
      textColor: isDarkMode ? 'text-purple-400' : 'text-purple-600'
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      label: isRTL ? 'التعارضات النشطة' : 'Active Conflicts',
      value: '3',
      unit: isRTL ? 'مشكلة' : 'issues',
      change: '-2',
      trend: 'down',
      color: 'red',
      bgColor: isDarkMode ? 'bg-red-900/40' : 'bg-red-50',
      iconBg: isDarkMode ? 'bg-red-800' : 'bg-red-100',
      iconColor: isDarkMode ? 'text-red-400' : 'text-red-600',
      textColor: isDarkMode ? 'text-red-400' : 'text-red-600'
    }
  ];

  // Urgent conflicts
  const urgentConflicts = [
    {
      id: '1',
      doctor: 'Dr. Sarah Ahmed',
      issue: isRTL ? 'وقت استراحة غير كافٍ بين المناوبات' : 'Insufficient rest time between shifts',
      priority: 'high',
      time: isRTL ? 'منذ ساعتين' : '2 hours ago'
    },
    {
      id: '2',
      doctor: 'Dr. Mohammed Ali',
      issue: isRTL ? 'الاقتراب من حد الساعات الأسبوعية' : 'Approaching weekly hour limit',
      priority: 'medium',
      time: isRTL ? 'منذ 5 ساعات' : '5 hours ago'
    },
    {
      id: '3',
      doctor: 'Dr. Fatima Hassan',
      issue: isRTL ? 'تداخل المناوبة مع الاجتماع المجدول' : 'Shift overlaps with scheduled meeting',
      priority: 'low',
      time: isRTL ? 'منذ يوم واحد' : '1 day ago'
    }
  ];

  // Quick actions
  const quickActions = [
    {
      icon: <Plus className="w-5 h-5" />,
      label: isRTL ? 'إضافة مناوبة جديدة' : 'Add New Shift',
      color: 'blue'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: isRTL ? 'إنشاء تقرير' : 'Generate Report',
      color: 'emerald'
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: isRTL ? 'إرسال إشعارات' : 'Send Notifications',
      color: 'amber'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: isRTL ? 'إدارة الفريق' : 'Manage Team',
      color: 'purple'
    }
  ];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          bg: isDarkMode ? 'bg-red-900/30' : 'bg-red-50',
          dot: 'bg-red-500',
          text: isDarkMode ? 'text-red-400' : 'text-red-600'
        };
      case 'medium':
        return {
          bg: isDarkMode ? 'bg-amber-900/30' : 'bg-amber-50',
          dot: 'bg-amber-500',
          text: isDarkMode ? 'text-amber-400' : 'text-amber-600'
        };
      default:
        return {
          bg: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50',
          dot: 'bg-blue-500',
          text: isDarkMode ? 'text-blue-400' : 'text-blue-600'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {isRTL ? 'مرحباً، دكتور أحمد' : 'Welcome, Dr. Ahmed'}
        </h1>
        <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {isRTL ? 'نظرة عامة على جدولك هذا الأسبوع' : "Here's your schedule overview for this week"}
        </p>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              ${stat.bgColor} rounded-xl p-6 border transition-all duration-200
              hover:shadow-lg hover:scale-[1.02] cursor-pointer
              ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}
            `}
          >
            {/* Icon */}
            <div className={`${stat.iconBg} ${stat.iconColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>

            {/* Label */}
            <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {stat.label}
            </p>

            {/* Value */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {stat.value}
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {stat.unit}
              </span>
            </div>

            {/* Change Indicator */}
            <div className="flex items-center gap-1">
              {stat.trend === 'up' ? (
                <TrendingUp className={`w-4 h-4 ${stat.change.startsWith('-') ? 'text-red-500' : stat.textColor}`} />
              ) : (
                <TrendingDown className={`w-4 h-4 ${stat.change.startsWith('-') ? stat.textColor : 'text-red-500'}`} />
              )}
              <span className={`text-sm font-medium ${stat.change.startsWith('-') ? stat.textColor : stat.textColor}`}>
                {stat.change} {isRTL ? 'من الأسبوع الماضي' : 'from last week'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini Weekly Calendar - will be added in next component */}
        <div className="lg:col-span-2">
          <div className={`rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg overflow-hidden border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} flex items-center justify-between`}>
              <div>
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {isRTL ? 'نظرة عامة على الأسبوع' : 'Weekly Overview'}
                </h2>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {isRTL ? 'فبراير 10 - 16، 2026' : 'February 10 - 16, 2026'}
                </p>
              </div>
              <button
                onClick={onNavigateToCalendar}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105
                  ${isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }
                `}
              >
                {isRTL ? 'عرض التفاصيل' : 'View Details'}
              </button>
            </div>
            <div className="p-6">
              {/* Placeholder for mini calendar component */}
              <MiniWeeklyCalendar />
            </div>
          </div>
        </div>

        {/* Urgent Conflicts & Quick Actions */}
        <div className="space-y-6">
          {/* Urgent Conflicts */}
          <div className={`rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg overflow-hidden border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {isRTL ? 'التعارضات العاجلة' : 'Urgent Conflicts'}
                </h3>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {urgentConflicts.map((conflict) => {
                const style = getPriorityStyle(conflict.priority);
                return (
                  <div
                    key={conflict.id}
                    className={`${style.bg} rounded-lg p-4 hover:shadow-md transition-all cursor-pointer`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full ${style.dot} mt-2 flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {conflict.doctor}
                        </h4>
                        <p className={`text-xs mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {conflict.issue}
                        </p>
                        <span className={`text-xs ${style.text}`}>
                          {conflict.time}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={`p-4 border-t ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
              <button className="w-full text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                {isRTL ? 'عرض جميع التعارضات' : 'View All Conflicts'}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg overflow-hidden border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`
                    w-full flex items-center gap-3 p-4 rounded-lg transition-all hover:scale-105
                    ${isDarkMode 
                      ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${action.color === 'blue' && (isDarkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600')}
                    ${action.color === 'emerald' && (isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-600')}
                    ${action.color === 'amber' && (isDarkMode ? 'bg-amber-900/50 text-amber-400' : 'bg-amber-100 text-amber-600')}
                    ${action.color === 'purple' && (isDarkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-600')}
                  `}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
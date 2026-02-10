import { AlertTriangle, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface ConflictPanelProps {
  isDarkMode: boolean;
  isRTL: boolean;
}

interface Conflict {
  id: string;
  type: 'critical' | 'warning' | 'info';
  doctor: string;
  message: string;
  timestamp: string;
}

export function ConflictPanel({ isDarkMode, isRTL }: ConflictPanelProps) {
  // Mock conflict data
  const conflicts: Conflict[] = [
    {
      id: '1',
      type: 'critical',
      doctor: 'Dr. Sarah Ahmed',
      message: 'Insufficient recovery time between shifts (Day 1-3)',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'warning',
      doctor: 'Dr. Mohammed Ali',
      message: 'Approaching weekly hour limit (38/40 hours)',
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      type: 'info',
      doctor: 'Dr. Fatima Hassan',
      message: 'On-call shift overlaps with scheduled meeting',
      timestamp: '1 day ago'
    }
  ];

  const stats = [
    { label: isRTL ? 'المناوبات النشطة' : 'Active Shifts', value: '24', change: '+3' },
    { label: isRTL ? 'إجمالي الساعات' : 'Total Hours', value: '192', change: '+8' },
    { label: isRTL ? 'الأطباء' : 'Doctors', value: '12', change: '0' }
  ];

  const getConflictIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'info':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
    }
  };

  const getConflictStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bg: isDarkMode ? 'bg-red-900/20' : 'bg-red-50',
          border: 'border-red-500/30',
          text: isDarkMode ? 'text-red-300' : 'text-red-700'
        };
      case 'warning':
        return {
          bg: isDarkMode ? 'bg-amber-900/20' : 'bg-amber-50',
          border: 'border-amber-500/30',
          text: isDarkMode ? 'text-amber-300' : 'text-amber-700'
        };
      case 'info':
        return {
          bg: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50',
          border: 'border-blue-500/30',
          text: isDarkMode ? 'text-blue-300' : 'text-blue-700'
        };
      default:
        return {
          bg: isDarkMode ? 'bg-slate-800' : 'bg-slate-50',
          border: 'border-slate-500/30',
          text: isDarkMode ? 'text-slate-300' : 'text-slate-700'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className={`rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {isRTL ? 'نظرة عامة على الأسبوع' : 'Week Overview'}
        </h3>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {stat.label}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </span>
                {stat.change !== '0' && (
                  <span className={`text-xs font-medium flex items-center gap-1 ${
                    stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conflict Detection Panel */}
      <div className={`rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg overflow-hidden`}>
        <div className={`p-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {isRTL ? 'كشف التعارضات' : 'Conflict Detection'}
              </h3>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {conflicts.length} {isRTL ? 'مشكلة تم الكشف عنها' : `issue${conflicts.length !== 1 ? 's' : ''} detected`}
              </p>
            </div>
            {conflicts.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs font-medium text-red-500">{isRTL ? 'نشط' : 'Active'}</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          {conflicts.length > 0 ? (
            <div className="space-y-3">
              {conflicts.map((conflict) => {
                const styles = getConflictStyles(conflict.type);
                return (
                  <div
                    key={conflict.id}
                    className={`${styles.bg} border ${styles.border} rounded-lg p-4 transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getConflictIcon(conflict.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-semibold ${styles.text} mb-1`}>
                          {conflict.doctor}
                        </h4>
                        <p className={`text-sm ${styles.text} opacity-90 mb-2`}>
                          {conflict.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${styles.text} opacity-70`}>
                            {conflict.timestamp}
                          </span>
                          <button className={`text-xs font-medium ${styles.text} hover:underline transition-all hover:scale-105`}>
                            {isRTL ? 'حل' : 'Resolve'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className={`w-12 h-12 mx-auto mb-3 ${
                isDarkMode ? 'text-emerald-500' : 'text-emerald-600'
              }`} />
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {isRTL ? 'لا توجد تعارضات' : 'No conflicts detected'}
              </p>
            </div>
          )}
        </div>

        {conflicts.length > 0 && (
          <div className={`p-4 border-t ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
            <button className={`w-full py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}>
              {isRTL ? 'عرض جميع التعارضات' : 'View All Conflicts'} ({conflicts.length})
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className={`rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
        </h3>
        <div className="space-y-2">
          <button className={`w-full py-3 rounded-lg text-sm font-medium transition-all hover:scale-105 text-left px-4 ${
            isDarkMode 
              ? 'bg-slate-700 hover:bg-slate-600 text-white' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
          }`}>
            {isRTL ? 'تصدير الجدول' : 'Export Schedule'}
          </button>
          <button className={`w-full py-3 rounded-lg text-sm font-medium transition-all hover:scale-105 text-left px-4 ${
            isDarkMode 
              ? 'bg-slate-700 hover:bg-slate-600 text-white' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
          }`}>
            {isRTL ? 'إرسال الإشعارات' : 'Send Notifications'}
          </button>
          <button className={`w-full py-3 rounded-lg text-sm font-medium transition-all hover:scale-105 text-left px-4 ${
            isDarkMode 
              ? 'bg-slate-700 hover:bg-slate-600 text-white' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
          }`}>
            {isRTL ? 'إنشاء تقرير' : 'Generate Report'}
          </button>
        </div>
      </div>
    </div>
  );
}
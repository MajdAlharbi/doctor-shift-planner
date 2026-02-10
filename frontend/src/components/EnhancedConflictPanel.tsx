import { useState } from 'react';
import { AlertTriangle, AlertCircle, Clock, CheckCircle, X, RotateCcw, Pause, Zap, History, ChevronDown, ChevronUp } from 'lucide-react';

interface EnhancedConflictPanelProps {
  isDarkMode: boolean;
  isRTL: boolean;
}

interface Conflict {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  doctor: string;
  title: string;
  description: string;
  rule: string;
  timestamp: string;
  suggestion?: string;
  autoResolvable: boolean;
  status: 'active' | 'resolved' | 'ignored' | 'postponed';
}

export function EnhancedConflictPanel({ isDarkMode, isRTL }: EnhancedConflictPanelProps) {
  const [conflicts, setConflicts] = useState<Conflict[]>([
    {
      id: '1',
      severity: 'critical',
      doctor: 'Dr. Sarah Ahmed',
      title: isRTL ? 'وقت استراحة غير كافٍ' : 'Insufficient Recovery Time',
      description: isRTL ? 'أقل من 11 ساعة بين مناوبات اليوم 1 والثلاثاء' : 'Less than 11 hours between Monday and Tuesday shifts',
      rule: isRTL ? 'الحد الأدنى: 11 ساعة بين المناوبات' : 'Minimum 11 hours between shifts',
      timestamp: '2 hours ago',
      suggestion: isRTL ? 'تأخير مناوبة الثلاثاء من 08:00 إلى 11:00' : 'Delay Tuesday shift from 08:00 to 11:00',
      autoResolvable: true,
      status: 'active'
    },
    {
      id: '2',
      severity: 'high',
      doctor: 'Dr. Mohammed Ali',
      title: isRTL ? 'الاقتراب من حد الساعات الأسبوعية' : 'Approaching Weekly Hour Limit',
      description: isRTL ? '38 من 40 ساعة هذا الأسبوع' : '38 of 40 hours this week',
      rule: isRTL ? 'الحد الأقصى: 40 ساعة في الأسبوع' : 'Maximum 40 hours per week',
      timestamp: '5 hours ago',
      suggestion: isRTL ? 'إزالة مناوبة الجمعة المسائية أو تقليص إلى 2 ساعة' : 'Remove Friday evening shift or reduce to 2 hours',
      autoResolvable: false,
      status: 'active'
    },
    {
      id: '3',
      severity: 'medium',
      doctor: 'Dr. Fatima Hassan',
      title: isRTL ? 'تداخل مع اجتماع مجدول' : 'Overlap with Scheduled Meeting',
      description: isRTL ? 'مناوبة عند الطلب تتداخل مع اجتماع القسم' : 'On-call shift overlaps with department meeting',
      rule: isRTL ? 'تجنب التداخل مع الاجتماعات المهمة' : 'Avoid conflicts with important meetings',
      timestamp: '1 day ago',
      suggestion: isRTL ? 'نقل مناوبة عند الطلب إلى دكتور أحمد خليل' : 'Transfer on-call to Dr. Ahmed Khalil',
      autoResolvable: true,
      status: 'active'
    },
    {
      id: '4',
      severity: 'low',
      doctor: 'Dr. Ahmed Khalil',
      title: isRTL ? 'نقص في فترات الاستراحة' : 'Low Recovery Period',
      description: isRTL ? 'يومين فقط من الاستراحة هذا الأسبوع' : 'Only 2 recovery days this week',
      rule: isRTL ? 'الموصى به: 3 أيام استراحة في الأسبوع' : 'Recommended: 3 recovery days per week',
      timestamp: '2 days ago',
      suggestion: isRTL ? 'إضافة يوم استراحة يوم الجمعة' : 'Add recovery day on Friday',
      autoResolvable: true,
      status: 'active'
    }
  ]);

  const [showHistory, setShowHistory] = useState(false);
  const [expandedConflicts, setExpandedConflicts] = useState<Set<string>>(new Set());

  const resolvedConflicts: Conflict[] = [
    {
      id: 'r1',
      severity: 'high',
      doctor: 'Dr. Layla Ibrahim',
      title: isRTL ? 'تم حل: تداخل المناوبات' : 'Resolved: Shift Overlap',
      description: isRTL ? 'تم تعديل التوقيت لمنع التداخل' : 'Timing adjusted to prevent overlap',
      rule: isRTL ? 'عدم التداخل بين المناوبات' : 'No overlapping shifts',
      timestamp: '3 days ago',
      autoResolvable: true,
      status: 'resolved'
    },
    {
      id: 'r2',
      severity: 'medium',
      doctor: 'Dr. Sarah Ahmed',
      title: isRTL ? 'تم حل: ساعات العمل الإضافية' : 'Resolved: Overtime Hours',
      description: isRTL ? 'تم إعادة توزيع الساعات على الفريق' : 'Hours redistributed across team',
      rule: isRTL ? 'الحد الأقصى: 40 ساعة في الأسبوع' : 'Maximum 40 hours per week',
      timestamp: '5 days ago',
      autoResolvable: false,
      status: 'resolved'
    }
  ];

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          bg: isDarkMode ? 'bg-red-900/40' : 'bg-red-50',
          border: 'border-red-500',
          text: isDarkMode ? 'text-red-400' : 'text-red-700',
          label: isRTL ? 'حرج' : 'Critical',
          badgeBg: isDarkMode ? 'bg-red-900/60' : 'bg-red-100',
          badgeText: isDarkMode ? 'text-red-300' : 'text-red-800'
        };
      case 'high':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          bg: isDarkMode ? 'bg-orange-900/40' : 'bg-orange-50',
          border: 'border-orange-500',
          text: isDarkMode ? 'text-orange-400' : 'text-orange-700',
          label: isRTL ? 'عالي' : 'High',
          badgeBg: isDarkMode ? 'bg-orange-900/60' : 'bg-orange-100',
          badgeText: isDarkMode ? 'text-orange-300' : 'text-orange-800'
        };
      case 'medium':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          bg: isDarkMode ? 'bg-amber-900/40' : 'bg-amber-50',
          border: 'border-amber-500',
          text: isDarkMode ? 'text-amber-400' : 'text-amber-700',
          label: isRTL ? 'متوسط' : 'Medium',
          badgeBg: isDarkMode ? 'bg-amber-900/60' : 'bg-amber-100',
          badgeText: isDarkMode ? 'text-amber-300' : 'text-amber-800'
        };
      default:
        return {
          icon: <Clock className="w-5 h-5" />,
          bg: isDarkMode ? 'bg-blue-900/40' : 'bg-blue-50',
          border: 'border-blue-500',
          text: isDarkMode ? 'text-blue-400' : 'text-blue-700',
          label: isRTL ? 'منخفض' : 'Low',
          badgeBg: isDarkMode ? 'bg-blue-900/60' : 'bg-blue-100',
          badgeText: isDarkMode ? 'text-blue-300' : 'text-blue-800'
        };
    }
  };

  const handleAutoResolve = (conflictId: string) => {
    setConflicts(prev => prev.map(c => 
      c.id === conflictId ? { ...c, status: 'resolved' as const } : c
    ));
  };

  const handleIgnore = (conflictId: string) => {
    setConflicts(prev => prev.map(c => 
      c.id === conflictId ? { ...c, status: 'ignored' as const } : c
    ));
  };

  const handlePostpone = (conflictId: string) => {
    setConflicts(prev => prev.map(c => 
      c.id === conflictId ? { ...c, status: 'postponed' as const } : c
    ));
  };

  const toggleExpand = (conflictId: string) => {
    setExpandedConflicts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(conflictId)) {
        newSet.delete(conflictId);
      } else {
        newSet.add(conflictId);
      }
      return newSet;
    });
  };

  const activeConflicts = conflicts.filter(c => c.status === 'active');
  const criticalCount = activeConflicts.filter(c => c.severity === 'critical').length;
  const highCount = activeConflicts.filter(c => c.severity === 'high').length;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {isRTL ? 'مركز حل التعارضات' : 'Conflict Resolution Center'}
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'إدارة وحل تعارضات الجدولة' : 'Manage and resolve scheduling conflicts'}
            </p>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}
            `}
          >
            <History className="w-4 h-4" />
            <span>{isRTL ? 'السجل' : 'History'}</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              {criticalCount}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
              {isRTL ? 'حرجة' : 'Critical'}
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-orange-900/30' : 'bg-orange-50'}`}>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              {highCount}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>
              {isRTL ? 'عالية' : 'High'}
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'}`}>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {activeConflicts.filter(c => c.autoResolvable).length}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
              {isRTL ? 'قابلة للحل التلقائي' : 'Auto-Resolvable'}
            </div>
          </div>
        </div>
      </div>

      {/* Active Conflicts */}
      <div className="space-y-4">
        {activeConflicts.length === 0 ? (
          <div className={`rounded-xl p-12 text-center border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'}`}>
              <CheckCircle className={`w-8 h-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
            <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {isRTL ? 'لا توجد تعارضات نشطة' : 'No Active Conflicts'}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'جميع الجداول متوافقة مع القواعد' : 'All schedules comply with rules'}
            </p>
          </div>
        ) : (
          activeConflicts.map((conflict) => {
            const config = getSeverityConfig(conflict.severity);
            const isExpanded = expandedConflicts.has(conflict.id);

            return (
              <div
                key={conflict.id}
                className={`rounded-xl border-2 overflow-hidden transition-all ${config.bg} ${config.border}`}
              >
                {/* Conflict Header */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`${config.text} flex-shrink-0`}>
                      {config.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${config.badgeBg} ${config.badgeText}`}>
                              {config.label}
                            </span>
                            {conflict.autoResolvable && (
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${isDarkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                                <Zap className="w-3 h-3" />
                                {isRTL ? 'حل تلقائي' : 'Auto-Fix'}
                              </span>
                            )}
                          </div>
                          <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {conflict.title}
                          </h3>
                          <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            {conflict.doctor}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {conflict.description}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleExpand(conflict.id)}
                          className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-white/50'}`}
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                          {/* Rule Violated */}
                          <div className={`mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'}`}>
                            <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              {isRTL ? 'القاعدة المخالفة:' : 'Rule Violated:'}
                            </div>
                            <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              {conflict.rule}
                            </div>
                          </div>

                          {/* Suggestion */}
                          {conflict.suggestion && (
                            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                              <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                                💡 {isRTL ? 'اقتراح الحل:' : 'Suggested Resolution:'}
                              </div>
                              <div className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                                {conflict.suggestion}
                              </div>
                            </div>
                          )}

                          {/* Timestamp */}
                          <div className={`mt-3 flex items-center gap-2 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                            <Clock className="w-3 h-3" />
                            <span>{conflict.timestamp}</span>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        {conflict.autoResolvable && (
                          <button
                            onClick={() => handleAutoResolve(conflict.id)}
                            className={`
                              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105
                              ${isDarkMode 
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                              }
                            `}
                          >
                            <Zap className="w-4 h-4" />
                            <span>{isRTL ? 'حل تلقائي' : 'Auto-Resolve'}</span>
                          </button>
                        )}
                        <button
                          onClick={() => handlePostpone(conflict.id)}
                          className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                            ${isDarkMode 
                              ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                              : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                            }
                          `}
                        >
                          <Pause className="w-4 h-4" />
                          <span>{isRTL ? 'تأجيل' : 'Postpone'}</span>
                        </button>
                        <button
                          onClick={() => handleIgnore(conflict.id)}
                          className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                            ${isDarkMode 
                              ? 'bg-red-900/40 hover:bg-red-900/60 text-red-400' 
                              : 'bg-red-50 hover:bg-red-100 text-red-700'
                            }
                          `}
                        >
                          <X className="w-4 h-4" />
                          <span>{isRTL ? 'تجاهل' : 'Ignore'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* History Section */}
      {showHistory && (
        <div className={`rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {isRTL ? 'سجل التعارضات المحلولة' : 'Resolved Conflicts History'}
            </h3>
          </div>
          <div className="p-6 space-y-3">
            {resolvedConflicts.map((conflict) => {
              const config = getSeverityConfig(conflict.severity);
              return (
                <div
                  key={conflict.id}
                  className={`p-4 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-slate-50 border-slate-200'}`}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <div className="flex-1">
                      <h4 className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {conflict.title}
                      </h4>
                      <p className={`text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {conflict.doctor}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                        {conflict.description} • {conflict.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

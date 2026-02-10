import { useState } from 'react';
import { Save, RotateCcw, Info, AlertCircle } from 'lucide-react';

interface RecoveryRulesSettingsProps {
  isDarkMode: boolean;
  isRTL: boolean;
}

export function RecoveryRulesSettings({ isDarkMode, isRTL }: RecoveryRulesSettingsProps) {
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Default settings
  const defaultSettings = {
    minRestHours: 11,
    minSleepHours: 7,
    maxWeeklyHours: 40,
    maxConsecutiveDays: 6,
    minRecoveryDays: 2,
    bufferTimeBefore: 30,
    bufferTimeAfter: 30,
    maxDailyHours: 12,
    nightShiftRecovery: 48
  };

  const [settings, setSettings] = useState(defaultSettings);

  const handleChange = (key: keyof typeof settings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    setShowSaveSuccess(true);
    setHasChanges(false);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  const rules = [
    {
      id: 'minRestHours',
      label: isRTL ? 'الحد الأدنى لوقت الراحة بين المناوبات' : 'Minimum Rest Time Between Shifts',
      description: isRTL ? 'الوقت الأدنى المطلوب بين نهاية مناوبة وبداية التالية' : 'Minimum time required between end of one shift and start of next',
      value: settings.minRestHours,
      min: 8,
      max: 16,
      step: 1,
      unit: isRTL ? 'ساعة' : 'hours',
      icon: '🛌',
      example: isRTL 
        ? `مثال: إذا انتهت المناوبة الساعة 10 مساءً، لا يمكن البدء قبل ${settings.minRestHours} ساعة (${(22 + settings.minRestHours) % 24}:00 صباحاً)`
        : `Example: If shift ends at 10 PM, cannot start before ${settings.minRestHours} hours (${(22 + settings.minRestHours) % 24}:00 AM)`
    },
    {
      id: 'minSleepHours',
      label: isRTL ? 'الحد الأدنى لساعات النوم اليومية' : 'Minimum Daily Sleep Hours',
      description: isRTL ? 'ساعات النوم الموصى بها يومياً للحفاظ على الصحة' : 'Recommended sleep hours per day for health maintenance',
      value: settings.minSleepHours,
      min: 6,
      max: 9,
      step: 0.5,
      unit: isRTL ? 'ساعة' : 'hours',
      icon: '😴',
      example: isRTL
        ? `مثال: يحتاج الطبيب إلى ${settings.minSleepHours} ساعات نوم متواصلة كل 24 ساعة`
        : `Example: Doctor needs ${settings.minSleepHours} hours of continuous sleep per 24 hours`
    },
    {
      id: 'maxWeeklyHours',
      label: isRTL ? 'الحد الأقصى لساعات العمل الأسبوعية' : 'Maximum Weekly Work Hours',
      description: isRTL ? 'إجمالي ساعات العمل المسموح بها في الأسبوع' : 'Total allowed work hours per week',
      value: settings.maxWeeklyHours,
      min: 35,
      max: 60,
      step: 5,
      unit: isRTL ? 'ساعة' : 'hours',
      icon: '📊',
      example: isRTL
        ? `مثال: لا يمكن تجاوز ${settings.maxWeeklyHours} ساعة عمل في الأسبوع الواحد`
        : `Example: Cannot exceed ${settings.maxWeeklyHours} work hours in a single week`
    },
    {
      id: 'maxConsecutiveDays',
      label: isRTL ? 'الحد الأقصى للأيام المتتالية' : 'Maximum Consecutive Days',
      description: isRTL ? 'أقصى عدد أيام العمل المتواصلة دون راحة' : 'Maximum work days in a row without rest',
      value: settings.maxConsecutiveDays,
      min: 5,
      max: 7,
      step: 1,
      unit: isRTL ? 'يوم' : 'days',
      icon: '📅',
      example: isRTL
        ? `مثال: بعد ${settings.maxConsecutiveDays} أيام عمل متواصلة، يجب أخذ يوم راحة`
        : `Example: After ${settings.maxConsecutiveDays} consecutive work days, must take rest day`
    },
    {
      id: 'minRecoveryDays',
      label: isRTL ? 'الحد الأدنى لأيام الاستراحة الأسبوعية' : 'Minimum Weekly Recovery Days',
      description: isRTL ? 'عدد أيام الراحة الكاملة المطلوبة أسبوعياً' : 'Number of full rest days required per week',
      value: settings.minRecoveryDays,
      min: 1,
      max: 3,
      step: 1,
      unit: isRTL ? 'يوم' : 'days',
      icon: '🌿',
      example: isRTL
        ? `مثال: يجب تخصيص ${settings.minRecoveryDays} يوم على الأقل للراحة التامة كل أسبوع`
        : `Example: Must allocate ${settings.minRecoveryDays} day(s) for complete rest each week`
    },
    {
      id: 'bufferTimeBefore',
      label: isRTL ? 'وقت الاحتياط قبل المناوبة' : 'Buffer Time Before Shift',
      description: isRTL ? 'وقت إضافي للتحضير قبل بداية المناوبة' : 'Extra time for preparation before shift starts',
      value: settings.bufferTimeBefore,
      min: 15,
      max: 60,
      step: 15,
      unit: isRTL ? 'دقيقة' : 'minutes',
      icon: '⏰',
      example: isRTL
        ? `مثال: إذا كانت المناوبة تبدأ 8 صباحاً، يجب الوصول قبلها بـ ${settings.bufferTimeBefore} دقيقة`
        : `Example: If shift starts at 8 AM, must arrive ${settings.bufferTimeBefore} minutes before`
    },
    {
      id: 'bufferTimeAfter',
      label: isRTL ? 'وقت الاحتياط بعد المناوبة' : 'Buffer Time After Shift',
      description: isRTL ? 'وقت إضافي لإنهاء المهام بعد انتهاء المناوبة' : 'Extra time to complete tasks after shift ends',
      value: settings.bufferTimeAfter,
      min: 15,
      max: 60,
      step: 15,
      unit: isRTL ? 'دقيقة' : 'minutes',
      icon: '⌛',
      example: isRTL
        ? `مثال: إذا انتهت المناوبة 4 مساءً، قد يمتد العمل حتى ${settings.bufferTimeAfter} دقيقة بعدها`
        : `Example: If shift ends at 4 PM, work may extend ${settings.bufferTimeAfter} minutes after`
    },
    {
      id: 'maxDailyHours',
      label: isRTL ? 'الحد الأقصى لساعات العمل اليومية' : 'Maximum Daily Work Hours',
      description: isRTL ? 'أقصى عدد ساعات العمل المسموح بها في اليوم الواحد' : 'Maximum allowed work hours in a single day',
      value: settings.maxDailyHours,
      min: 8,
      max: 16,
      step: 1,
      unit: isRTL ? 'ساعة' : 'hours',
      icon: '⏱️',
      example: isRTL
        ? `مثال: لا يمكن أن تتجاوز المناوبة ${settings.maxDailyHours} ساعة في اليوم`
        : `Example: A shift cannot exceed ${settings.maxDailyHours} hours in one day`
    },
    {
      id: 'nightShiftRecovery',
      label: isRTL ? 'وقت الاستراحة بعد المناوبة الليلية' : 'Recovery Time After Night Shift',
      description: isRTL ? 'الوقت الإضافي للراحة بعد المناوبات الليلية' : 'Extra recovery time needed after night shifts',
      value: settings.nightShiftRecovery,
      min: 24,
      max: 72,
      step: 12,
      unit: isRTL ? 'ساعة' : 'hours',
      icon: '🌙',
      example: isRTL
        ? `مثال: بعد مناوبة ليلية، يحتاج الطبيب ${settings.nightShiftRecovery} ساعة راحة قبل المناوبة التالية`
        : `Example: After night shift, doctor needs ${settings.nightShiftRecovery} hours recovery before next shift`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {isRTL ? 'قواعد الاستراحة والعمل' : 'Recovery & Work Rules'}
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isRTL ? 'ضبط المعايير الصحية والتنظيمية للجداول' : 'Configure health and regulatory standards for schedules'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all
              ${isDarkMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
              }
            `}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isRTL ? 'إعادة تعيين' : 'Reset'}</span>
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all hover:scale-105
              ${hasChanges
                ? (isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white')
                : (isDarkMode ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed')
              }
            `}
          >
            <Save className="w-4 h-4" />
            <span>{isRTL ? 'حفظ التغييرات' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSaveSuccess && (
        <div className={`rounded-lg p-4 border ${isDarkMode ? 'bg-emerald-900/30 border-emerald-700' : 'bg-emerald-50 border-emerald-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-emerald-800' : 'bg-emerald-100'}`}>
              <Save className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
            <div>
              <div className={`font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                {isRTL ? 'تم الحفظ بنجاح!' : 'Settings Saved Successfully!'}
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                {isRTL ? 'سيتم تطبيق القواعد الجديدة على جميع الجداول' : 'New rules will be applied to all schedules'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Important Notice */}
      <div className={`rounded-lg p-4 border ${isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
        <div className="flex items-start gap-3">
          <Info className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <div className={`font-medium mb-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              {isRTL ? 'ملاحظة هامة' : 'Important Notice'}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              {isRTL 
                ? 'هذه القواعد مبنية على معايير الصحة المهنية والقوانين التنظيمية. التغييرات قد تؤثر على اكتشاف التعارضات.'
                : 'These rules are based on occupational health standards and regulatory requirements. Changes may affect conflict detection.'}
            </div>
          </div>
        </div>
      </div>

      {/* Rules Settings */}
      <div className="space-y-6">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
          >
            {/* Rule Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">{rule.icon}</div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {rule.label}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {rule.description}
                </p>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'القيمة الحالية:' : 'Current Value:'}
                </label>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {rule.value} {rule.unit}
                </div>
              </div>

              {/* Range Slider */}
              <div className="relative">
                <input
                  type="range"
                  min={rule.min}
                  max={rule.max}
                  step={rule.step}
                  value={rule.value}
                  onChange={(e) => handleChange(rule.id as any, parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${isDarkMode ? '#3b82f6' : '#2563eb'} 0%, ${isDarkMode ? '#3b82f6' : '#2563eb'} ${((rule.value - rule.min) / (rule.max - rule.min)) * 100}%, ${isDarkMode ? '#334155' : '#e2e8f0'} ${((rule.value - rule.min) / (rule.max - rule.min)) * 100}%, ${isDarkMode ? '#334155' : '#e2e8f0'} 100%)`
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    {rule.min} {rule.unit}
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    {rule.max} {rule.unit}
                  </span>
                </div>
              </div>

              {/* Example */}
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  💡 {isRTL ? 'مثال:' : 'Example:'}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {rule.example}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Panel */}
      <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {isRTL ? 'ملخص القواعد الحالية' : 'Current Rules Summary'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'}`}>
            <div className={`text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'ساعات الراحة' : 'Rest Hours'}
            </div>
            <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {settings.minRestHours}h {isRTL ? 'بين المناوبات' : 'between shifts'}
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'}`}>
            <div className={`text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'حد الساعات الأسبوعية' : 'Weekly Limit'}
            </div>
            <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {settings.maxWeeklyHours}h {isRTL ? 'في الأسبوع' : 'per week'}
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'}`}>
            <div className={`text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'أيام الاستراحة' : 'Recovery Days'}
            </div>
            <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {settings.minRecoveryDays} {isRTL ? 'يوم/أسبوع' : 'days/week'}
            </div>
          </div>
        </div>
      </div>

      {/* Warning about changes */}
      {hasChanges && (
        <div className={`rounded-lg p-4 border ${isDarkMode ? 'bg-amber-900/30 border-amber-700' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-center gap-3">
            <AlertCircle className={`w-5 h-5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
            <div className={`text-sm font-medium ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
              {isRTL 
                ? 'لديك تغييرات غير محفوظة. تأكد من حفظها قبل المغادرة.'
                : 'You have unsaved changes. Make sure to save before leaving.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { Clock } from 'lucide-react';

interface MiniWeeklyCalendarProps {
  isDarkMode: boolean;
  isRTL: boolean;
}

interface MiniShift {
  type: 'morning' | 'evening' | 'night' | 'recovery' | 'on-call';
  startTime: string;
  endTime: string;
  doctor: string;
}

export function MiniWeeklyCalendar({ isDarkMode, isRTL }: MiniWeeklyCalendarProps) {
  const days = isRTL 
    ? ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const dates = [10, 11, 12, 13, 14, 15, 16];

  // Mock mini shift data for the week
  const weekShifts: Record<number, MiniShift[]> = {
    0: [
      { type: 'morning', startTime: '08:00', endTime: '16:00', doctor: 'Dr. Sarah A.' },
      { type: 'evening', startTime: '16:00', endTime: '00:00', doctor: 'Dr. Mohammed A.' }
    ],
    1: [
      { type: 'recovery', startTime: '08:00', endTime: '20:00', doctor: 'Dr. Sarah A.' },
      { type: 'morning', startTime: '08:00', endTime: '16:00', doctor: 'Dr. Fatima H.' }
    ],
    2: [
      { type: 'night', startTime: '00:00', endTime: '08:00', doctor: 'Dr. Mohammed A.' },
      { type: 'morning', startTime: '08:00', endTime: '16:00', doctor: 'Dr. Ahmed K.' }
    ],
    3: [
      { type: 'on-call', startTime: '08:00', endTime: '20:00', doctor: 'Dr. Fatima H.' },
      { type: 'morning', startTime: '08:00', endTime: '16:00', doctor: 'Dr. Sarah A.' }
    ],
    4: [
      { type: 'evening', startTime: '16:00', endTime: '00:00', doctor: 'Dr. Layla I.' }
    ],
    5: [
      { type: 'recovery', startTime: '08:00', endTime: '20:00', doctor: 'Dr. Ahmed K.' }
    ],
    6: [
      { type: 'morning', startTime: '08:00', endTime: '16:00', doctor: 'Dr. Mohammed A.' }
    ]
  };

  const getShiftColor = (type: string) => {
    switch (type) {
      case 'morning':
        return {
          bg: isDarkMode ? 'bg-blue-700/60' : 'bg-blue-500',
          text: 'text-white',
          label: isRTL ? 'ص' : 'M'
        };
      case 'evening':
        return {
          bg: isDarkMode ? 'bg-blue-600/60' : 'bg-blue-600',
          text: 'text-white',
          label: isRTL ? 'م' : 'E'
        };
      case 'night':
        return {
          bg: isDarkMode ? 'bg-indigo-700/60' : 'bg-indigo-600',
          text: 'text-white',
          label: isRTL ? 'ل' : 'N'
        };
      case 'recovery':
        return {
          bg: isDarkMode ? 'bg-emerald-700/60' : 'bg-emerald-500',
          text: 'text-white',
          label: isRTL ? 'ر' : 'R'
        };
      case 'on-call':
        return {
          bg: isDarkMode ? 'bg-cyan-700/60' : 'bg-cyan-500',
          text: 'text-white',
          label: isRTL ? 'ط' : 'C'
        };
      default:
        return {
          bg: isDarkMode ? 'bg-slate-700' : 'bg-slate-400',
          text: 'text-white',
          label: '?'
        };
    }
  };

  return (
    <div>
      {/* Color Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b" style={{
        borderColor: isDarkMode ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)'
      }}>
        <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {isRTL ? 'الأنواع:' : 'Legend:'}
        </span>
        {[
          { type: 'morning', label: isRTL ? 'صباحية' : 'Morning' },
          { type: 'evening', label: isRTL ? 'مسائية' : 'Evening' },
          { type: 'night', label: isRTL ? 'ليلية' : 'Night' },
          { type: 'recovery', label: isRTL ? 'استراحة' : 'Recovery' },
          { type: 'on-call', label: isRTL ? 'عند الطلب' : 'On-Call' }
        ].map((item) => {
          const color = getShiftColor(item.type);
          return (
            <div key={item.type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${color.bg}`}></div>
              <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mini Calendar Grid */}
      <div className="grid grid-cols-7 gap-3">
        {days.map((day, index) => {
          const dayShifts = weekShifts[index] || [];
          const isToday = index === 2; // Mock: Wednesday is today

          return (
            <div 
              key={index}
              className={`
                relative rounded-lg p-3 transition-all hover:scale-105 cursor-pointer
                ${isDarkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'}
                ${isToday ? (isDarkMode ? 'ring-2 ring-blue-500' : 'ring-2 ring-blue-500') : ''}
              `}
            >
              {/* Day Header */}
              <div className="text-center mb-3">
                <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {day}
                </div>
                <div className={`
                  text-lg font-bold
                  ${isToday 
                    ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                    : (isDarkMode ? 'text-white' : 'text-slate-900')
                  }
                `}>
                  {dates[index]}
                </div>
              </div>

              {/* Shift Indicators */}
              <div className="space-y-2">
                {dayShifts.length > 0 ? (
                  dayShifts.map((shift, shiftIndex) => {
                    const color = getShiftColor(shift.type);
                    return (
                      <div
                        key={shiftIndex}
                        className={`${color.bg} ${color.text} rounded px-2 py-1.5 text-xs transition-all hover:scale-105`}
                        title={`${shift.doctor} - ${shift.startTime}-${shift.endTime}`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold">{color.label}</span>
                          <Clock className="w-3 h-3 opacity-70" />
                        </div>
                        <div className="text-[10px] mt-0.5 truncate opacity-90">
                          {shift.doctor}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className={`text-center py-2 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    {isRTL ? 'فارغ' : 'Empty'}
                  </div>
                )}
              </div>

              {/* Shift Count Badge */}
              {dayShifts.length > 0 && (
                <div className={`
                  absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
                  ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}
                  ${isRTL ? 'right-auto -left-1' : ''}
                `}>
                  {dayShifts.length}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className={`
        mt-6 pt-4 border-t grid grid-cols-3 gap-4
        ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}
      `}>
        <div className="text-center">
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            11
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isRTL ? 'إجمالي المناوبات' : 'Total Shifts'}
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            2
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isRTL ? 'فترات الاستراحة' : 'Recovery Days'}
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            5
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isRTL ? 'أطباء نشطون' : 'Active Doctors'}
          </div>
        </div>
      </div>
    </div>
  );
}

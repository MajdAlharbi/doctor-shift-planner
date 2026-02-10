import { Clock, Stethoscope } from 'lucide-react';
import { MapPin, Edit2 } from 'lucide-react';
import type { Shift } from './WeeklyCalendar';

interface ShiftCardProps {
  shift: Shift;
  isDarkMode: boolean;
  isRTL: boolean;
  onClick?: () => void;
}

export function ShiftCard({ shift, isDarkMode, isRTL, onClick }: ShiftCardProps) {
  // Calculate duration in hours
  const calculateDuration = () => {
    const [startHour, startMin] = shift.startTime.split(':').map(Number);
    const [endHour, endMin] = shift.endTime.split(':').map(Number);
    
    let duration = (endHour - startHour) + (endMin - startMin) / 60;
    if (duration < 0) duration += 24; // Handle overnight shifts
    
    return duration;
  };

  const duration = calculateDuration();
  const durationText = isRTL 
    ? `${duration.toFixed(1)} ساعة` 
    : `${duration.toFixed(1)}h`;

  // Color coding based on shift type
  const getShiftColors = () => {
    switch (shift.type) {
      case 'morning':
        return {
          bg: isDarkMode ? 'bg-blue-900/40' : 'bg-blue-50',
          border: 'border-blue-500',
          text: isDarkMode ? 'text-blue-300' : 'text-blue-700',
          badge: isDarkMode ? 'bg-blue-700' : 'bg-blue-500',
        };
      case 'evening':
        return {
          bg: isDarkMode ? 'bg-blue-800/40' : 'bg-blue-100',
          border: 'border-blue-600',
          text: isDarkMode ? 'text-blue-300' : 'text-blue-800',
          badge: isDarkMode ? 'bg-blue-600' : 'bg-blue-600',
        };
      case 'night':
        return {
          bg: isDarkMode ? 'bg-indigo-900/40' : 'bg-indigo-50',
          border: 'border-indigo-600',
          text: isDarkMode ? 'text-indigo-300' : 'text-indigo-800',
          badge: isDarkMode ? 'bg-indigo-700' : 'bg-indigo-600',
        };
      case 'recovery':
        return {
          bg: isDarkMode ? 'bg-emerald-900/40' : 'bg-emerald-50',
          border: 'border-emerald-500',
          text: isDarkMode ? 'text-emerald-300' : 'text-emerald-700',
          badge: isDarkMode ? 'bg-emerald-700' : 'bg-emerald-500',
        };
      case 'on-call':
        return {
          bg: isDarkMode ? 'bg-cyan-900/40' : 'bg-cyan-50',
          border: 'border-cyan-500',
          text: isDarkMode ? 'text-cyan-300' : 'text-cyan-700',
          badge: isDarkMode ? 'bg-cyan-700' : 'bg-cyan-500',
        };
      default:
        return {
          bg: isDarkMode ? 'bg-slate-800' : 'bg-slate-100',
          border: 'border-slate-500',
          text: isDarkMode ? 'text-slate-300' : 'text-slate-700',
          badge: isDarkMode ? 'bg-slate-700' : 'bg-slate-500',
        };
    }
  };

  const getShiftLabel = () => {
    if (isRTL) {
      switch (shift.type) {
        case 'morning': return 'صباحية';
        case 'evening': return 'مسائية';
        case 'night': return 'ليلية';
        case 'recovery': return 'استراحة';
        case 'on-call': return 'عند الطلب';
        default: return 'مناوبة';
      }
    } else {
      switch (shift.type) {
        case 'morning': return 'Morning';
        case 'evening': return 'Evening';
        case 'night': return 'Night';
        case 'recovery': return 'Recovery';
        case 'on-call': return 'On-Call';
        default: return 'Shift';
      }
    }
  };

  const colors = getShiftColors();

  return (
    <div 
      onClick={onClick}
      className={`
        group relative ${colors.bg} border-l-4 ${colors.border} rounded-lg p-4 
        cursor-pointer transition-all duration-200
        hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5
        active:scale-[0.98]
      `}
      style={{ padding: 'var(--spacing-2)' }}
    >
      {/* Hover overlay for edit indication */}
      <div className={`
        absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200
        ${isRTL ? 'right-auto left-2' : ''}
      `}>
        <div className={`p-1.5 rounded ${isDarkMode ? 'bg-slate-700/80' : 'bg-white/80'}`}>
          <Edit2 className={`w-3.5 h-3.5 ${colors.text}`} />
        </div>
      </div>

      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold ${colors.text} truncate mb-1`}>
            {shift.doctorName}
          </h4>
          {shift.department && (
            <div className="flex items-center gap-1.5 mb-1">
              <Stethoscope className={`w-3.5 h-3.5 ${colors.text} opacity-70`} />
              <span className={`text-xs ${colors.text} opacity-80`}>
                {shift.department}
              </span>
            </div>
          )}
          {shift.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className={`w-3.5 h-3.5 ${colors.text} opacity-70`} />
              <span className={`text-xs ${colors.text} opacity-80`}>
                {shift.location}
              </span>
            </div>
          )}
        </div>
        <div className={`
          ${colors.badge} text-white text-xs px-2.5 py-1 rounded-md font-medium 
          whitespace-nowrap shadow-sm
        `}>
          {getShiftLabel()}
        </div>
      </div>
      
      <div className={`
        flex items-center justify-between pt-2 mt-2 border-t 
        ${isDarkMode ? 'border-white/10' : 'border-black/10'}
      `}>
        <div className="flex items-center gap-1.5">
          <Clock className={`w-3.5 h-3.5 ${colors.text} opacity-70`} />
          <span className={`text-xs ${colors.text} font-medium`}>
            {shift.startTime} - {shift.endTime}
          </span>
        </div>
        <span className={`text-xs ${colors.text} font-semibold`}>
          {durationText}
        </span>
      </div>
    </div>
  );
}
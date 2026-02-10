import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from 'lucide-react';

interface EnhancedWeeklyCalendarProps {
  isDarkMode: boolean;
  isRTL: boolean;
  onShiftClick?: (shift: Shift) => void;
}

export interface Shift {
  id: string;
  doctorName: string;
  type: 'morning' | 'evening' | 'night' | 'recovery' | 'personal';
  startTime: string; // Format: "HH:MM"
  endTime: string;
  day: number; // 0-6 for Mon-Sun
  department?: string;
  location?: string;
  priority?: 'high' | 'medium' | 'low';
  hasConflict?: boolean;
}

export function EnhancedWeeklyCalendar({ isDarkMode, isRTL, onShiftClick }: EnhancedWeeklyCalendarProps) {
  const [currentWeekStart] = useState(new Date(2026, 1, 9)); // Feb 9, 2026 (Monday)
  const [draggedShift, setDraggedShift] = useState<Shift | null>(null);
  const [hoveredShift, setHoveredShift] = useState<string | null>(null);
  
  // Timeline from 6 AM to 10 PM (16 hours)
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = i + 6;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Mock shift data with conflicts
  const [shifts, setShifts] = useState<Shift[]>([
    { 
      id: '1', 
      doctorName: 'Dr. Sarah Ahmed', 
      type: 'morning', 
      startTime: '08:00', 
      endTime: '16:00', 
      day: 0, 
      department: 'Emergency', 
      location: 'Building A - Floor 3' 
    },
    { 
      id: '2', 
      doctorName: 'Dr. Mohammed Ali', 
      type: 'evening', 
      startTime: '16:00', 
      endTime: '22:00', 
      day: 0, 
      department: 'ICU', 
      location: 'Building B - Floor 2' 
    },
    { 
      id: '3', 
      doctorName: 'Dr. Sarah Ahmed', 
      type: 'recovery', 
      startTime: '08:00', 
      endTime: '20:00', 
      day: 1, 
      department: 'Emergency' 
    },
    { 
      id: '4', 
      doctorName: 'Dr. Fatima Hassan', 
      type: 'morning', 
      startTime: '08:00', 
      endTime: '16:00', 
      day: 1, 
      department: 'Surgery', 
      location: 'Building C - OR Suite' 
    },
    { 
      id: '5', 
      doctorName: 'Dr. Ahmed Khalil', 
      type: 'morning', 
      startTime: '08:00', 
      endTime: '16:00', 
      day: 2, 
      department: 'Pediatrics', 
      location: 'Building D - Floor 1' 
    },
    { 
      id: '6', 
      doctorName: 'Dr. Ahmed Khalil', 
      type: 'personal', 
      startTime: '18:00', 
      endTime: '20:00', 
      day: 2, 
      priority: 'high',
      location: 'Family Event' 
    },
    { 
      id: '7', 
      doctorName: 'Dr. Fatima Hassan', 
      type: 'evening', 
      startTime: '14:00', 
      endTime: '21:00', 
      day: 3, 
      department: 'Surgery', 
      location: 'Building C - OR Suite',
      hasConflict: true // Insufficient rest from previous shift
    },
    { 
      id: '8', 
      doctorName: 'Dr. Sarah Ahmed', 
      type: 'morning', 
      startTime: '08:00', 
      endTime: '16:00', 
      day: 3, 
      department: 'Emergency', 
      location: 'Building A - Floor 3' 
    },
    { 
      id: '9', 
      doctorName: 'Dr. Layla Ibrahim', 
      type: 'evening', 
      startTime: '16:00', 
      endTime: '22:00', 
      day: 4, 
      department: 'Cardiology', 
      location: 'Building A - Floor 4' 
    },
    { 
      id: '10', 
      doctorName: 'Dr. Ahmed Khalil', 
      type: 'recovery', 
      startTime: '08:00', 
      endTime: '20:00', 
      day: 5, 
      department: 'Pediatrics' 
    },
    { 
      id: '11', 
      doctorName: 'Dr. Mohammed Ali', 
      type: 'morning', 
      startTime: '08:00', 
      endTime: '16:00', 
      day: 6, 
      department: 'ICU', 
      location: 'Building B - Floor 2' 
    },
  ]);

  const weekDays = isRTL 
    ? ['السبت', 'الجمعة', 'الخميس', 'الأربعاء', 'الثلاثاء', 'الاثنين', 'الأحد'].reverse()
    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getDateForDay = (dayIndex: number) => {
    const date = new Date(currentWeekStart);
    date.setDate(currentWeekStart.getDate() + dayIndex);
    return date.getDate();
  };

  const getShiftsForDay = (dayIndex: number) => {
    return shifts.filter(shift => shift.day === dayIndex);
  };

  // Convert time string to minutes from 6 AM
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours - 6) * 60 + minutes;
  };

  // Calculate position and height for shift block
  const getShiftPosition = (shift: Shift) => {
    const startMinutes = timeToMinutes(shift.startTime);
    const endMinutes = timeToMinutes(shift.endTime);
    const duration = endMinutes - startMinutes;
    
    // Each hour is 60px, total timeline is 16 hours (6 AM - 10 PM) = 960px
    const pixelsPerMinute = 60 / 60; // 1px per minute
    
    return {
      top: Math.max(0, startMinutes * pixelsPerMinute),
      height: Math.max(20, duration * pixelsPerMinute)
    };
  };

  const getShiftColor = (shift: Shift) => {
    if (shift.hasConflict) {
      return {
        bg: isDarkMode ? 'bg-red-900/80' : 'bg-red-500',
        border: 'border-red-600',
        text: 'text-white',
        hover: isDarkMode ? 'hover:bg-red-800' : 'hover:bg-red-600'
      };
    }

    switch (shift.type) {
      case 'morning':
        return {
          bg: isDarkMode ? 'bg-blue-700/80' : 'bg-blue-500',
          border: 'border-blue-600',
          text: 'text-white',
          hover: isDarkMode ? 'hover:bg-blue-600' : 'hover:bg-blue-600'
        };
      case 'evening':
        return {
          bg: isDarkMode ? 'bg-blue-800/80' : 'bg-blue-600',
          border: 'border-blue-700',
          text: 'text-white',
          hover: isDarkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-700'
        };
      case 'night':
        return {
          bg: isDarkMode ? 'bg-indigo-900/80' : 'bg-indigo-700',
          border: 'border-indigo-800',
          text: 'text-white',
          hover: isDarkMode ? 'hover:bg-indigo-800' : 'hover:bg-indigo-800'
        };
      case 'recovery':
        return {
          bg: isDarkMode ? 'bg-emerald-700/80' : 'bg-emerald-500',
          border: 'border-emerald-600',
          text: 'text-white',
          hover: isDarkMode ? 'hover:bg-emerald-600' : 'hover:bg-emerald-600'
        };
      case 'personal':
        return {
          bg: isDarkMode ? 'bg-amber-700/80' : 'bg-amber-500',
          border: 'border-amber-600',
          text: 'text-white',
          hover: isDarkMode ? 'hover:bg-amber-600' : 'hover:bg-amber-600'
        };
      default:
        return {
          bg: isDarkMode ? 'bg-slate-700' : 'bg-slate-400',
          border: 'border-slate-600',
          text: 'text-white',
          hover: isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-500'
        };
    }
  };

  const handleDragStart = (shift: Shift) => {
    setDraggedShift(shift);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dayIndex: number, timeSlot: string) => {
    if (draggedShift) {
      const [hours] = timeSlot.split(':').map(Number);
      const [startHours, startMinutes] = draggedShift.startTime.split(':').map(Number);
      const [endHours, endMinutes] = draggedShift.endTime.split(':').map(Number);
      
      const duration = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
      const newEndHours = Math.floor((hours * 60 + duration) / 60);
      const newEndMinutes = (hours * 60 + duration) % 60;
      
      const updatedShifts = shifts.map(s => 
        s.id === draggedShift.id 
          ? { 
              ...s, 
              day: dayIndex, 
              startTime: timeSlot,
              endTime: `${newEndHours.toString().padStart(2, '0')}:${newEndMinutes.toString().padStart(2, '0')}`
            }
          : s
      );
      
      setShifts(updatedShifts);
      setDraggedShift(null);
    }
  };

  return (
    <div className={`rounded-xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg overflow-hidden border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
      {/* Header */}
      <div className={`p-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {isRTL ? 'التقويم الأسبوعي' : 'Weekly Calendar'}
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'فبراير 9 - 15، 2026' : 'February 9 - 15, 2026'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Color Legend */}
        <div className="flex flex-wrap items-center gap-3">
          <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isRTL ? 'الأنواع:' : 'Legend:'}
          </span>
          {[
            { type: 'morning', label: isRTL ? 'صباحية' : 'Morning', color: '#3B82F6' },
            { type: 'evening', label: isRTL ? 'مسائية' : 'Evening', color: '#2563EB' },
            { type: 'night', label: isRTL ? 'ليلية' : 'Night', color: '#4338CA' },
            { type: 'recovery', label: isRTL ? 'استراحة' : 'Recovery', color: '#10B981' },
            { type: 'personal', label: isRTL ? 'شخصية' : 'Personal', color: '#F59E0B' },
            { type: 'conflict', label: isRTL ? 'تعارض' : 'Conflict', color: '#EF4444' }
          ].map((item) => (
            <div key={item.type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
              <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Days Header */}
          <div className={`grid grid-cols-8 border-b ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
            <div className={`p-4 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'الوقت' : 'Time'}
            </div>
            {weekDays.map((day, index) => (
              <div key={index} className="p-4 text-center">
                <div className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {day}
                </div>
                <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {getDateForDay(index)}
                </div>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="grid grid-cols-8 relative">
            {/* Time Column */}
            <div className={`${isDarkMode ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
              {timeSlots.map((time, index) => (
                <div 
                  key={time}
                  className={`h-[60px] px-4 py-2 border-b text-xs font-medium ${isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-600'}`}
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Day Columns */}
            {weekDays.map((_, dayIndex) => (
              <div key={dayIndex} className="relative">
                {/* Time slots grid */}
                {timeSlots.map((time, slotIndex) => (
                  <div
                    key={`${dayIndex}-${time}`}
                    className={`h-[60px] border-b border-r ${isDarkMode ? 'border-slate-700 hover:bg-slate-700/30' : 'border-slate-200 hover:bg-slate-100'} transition-colors cursor-pointer`}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(dayIndex, time)}
                  >
                  </div>
                ))}

                {/* Shift blocks positioned absolutely */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="relative h-full pointer-events-auto">
                    {getShiftsForDay(dayIndex).map((shift) => {
                      const position = getShiftPosition(shift);
                      const colors = getShiftColor(shift);
                      const isHovered = hoveredShift === shift.id;

                      return (
                        <div
                          key={shift.id}
                          draggable={shift.type === 'personal'}
                          onDragStart={() => handleDragStart(shift)}
                          onMouseEnter={() => setHoveredShift(shift.id)}
                          onMouseLeave={() => setHoveredShift(null)}
                          onClick={() => onShiftClick?.(shift)}
                          className={`
                            absolute left-1 right-1 rounded-lg border-2 p-2 cursor-pointer transition-all
                            ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
                            ${isHovered ? 'shadow-lg scale-105 z-10' : 'shadow'}
                            ${shift.type === 'personal' ? 'cursor-move' : ''}
                          `}
                          style={{
                            top: `${position.top}px`,
                            height: `${position.height}px`,
                            minHeight: '40px'
                          }}
                        >
                          <div className="text-xs font-bold truncate">
                            {shift.doctorName}
                          </div>
                          <div className="text-[10px] opacity-90 truncate mt-0.5">
                            {shift.department || shift.location}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] opacity-80 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{shift.startTime} - {shift.endTime}</span>
                          </div>
                          
                          {/* Tooltip on hover */}
                          {isHovered && (
                            <div className={`
                              absolute left-full ml-2 top-0 w-64 p-3 rounded-lg shadow-xl z-50
                              ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}
                            `}>
                              <div className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {shift.doctorName}
                              </div>
                              <div className="space-y-1.5 text-xs">
                                <div className={`flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{shift.startTime} - {shift.endTime}</span>
                                </div>
                                {shift.department && (
                                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    <User className="w-3.5 h-3.5" />
                                    <span>{shift.department}</span>
                                  </div>
                                )}
                                {shift.location && (
                                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>{shift.location}</span>
                                  </div>
                                )}
                                {shift.hasConflict && (
                                  <div className="mt-2 pt-2 border-t border-red-500/30">
                                    <div className="text-red-400 font-medium">
                                      ⚠️ {isRTL ? 'تعارض مكتشف' : 'Conflict Detected'}
                                    </div>
                                    <div className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                      {isRTL ? 'وقت استراحة غير كافٍ' : 'Insufficient rest time'}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className={`p-4 border-t text-xs ${isDarkMode ? 'border-slate-700 bg-slate-900/30 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
        <p>
          {isRTL 
            ? '💡 يمكنك سحب وإفلات الأنشطة الشخصية (البرتقالية) لإعادة جدولتها. مرر فوق أي مناوبة لرؤية التفاصيل الكاملة.'
            : '💡 Drag and drop personal activities (orange) to reschedule. Hover over any shift to see full details.'
          }
        </p>
      </div>
    </div>
  );
}

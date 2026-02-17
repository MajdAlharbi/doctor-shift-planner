import React, { useMemo, useState } from 'react';
import { format, startOfWeek, addDays, addHours, isSameDay, parse } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { CalendarEvent } from '../../types';

export const WeeklyCalendar: React.FC = () => {
  const { shifts, commitments, recoveryRules, updateCommitment, t } = useApp();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  // Generate week days
  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [currentWeek]);
  
  // Generate time slots (6 AM to 10 PM)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }, []);
  
  // Convert shifts and commitments to calendar events
  const events = useMemo(() => {
    const calendarEvents: CalendarEvent[] = [];
    
    // Add shifts
    shifts.forEach((shift) => {
      calendarEvents.push({
        id: shift.id,
        type: 'shift',
        title: `${t(shift.type)} Shift`,
        date: shift.date,
        startTime: shift.startTime,
        endTime: shift.endTime,
        color: shift.type === 'day' ? '#3B82F6' : shift.type === 'night' ? '#4F46E5' : '#7C3AED',
        data: shift,
      });
      
      // Add recovery periods after night shifts
      if (shift.type === 'night') {
        const endDateTime = parse(shift.endTime, 'HH:mm', shift.date);
        const recoveryEnd = addHours(endDateTime, recoveryRules.minSleepAfterNightShift);
        
        calendarEvents.push({
          id: `recovery-${shift.id}`,
          type: 'recovery',
          title: 'Recovery Time',
          date: shift.date,
          startTime: shift.endTime,
          endTime: format(recoveryEnd, 'HH:mm'),
          color: '#10B981',
          data: shift,
        });
      }
    });
    
    // Add commitments
    commitments.forEach((commitment) => {
      calendarEvents.push({
        id: commitment.id,
        type: 'commitment',
        title: commitment.name,
        date: commitment.date,
        startTime: commitment.startTime,
        endTime: commitment.endTime,
        color: '#F59E0B',
        data: commitment,
      });
    });
    
    return calendarEvents;
  }, [shifts, commitments, recoveryRules, t]);
  
  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(event.date, day));
  };
  
  // Calculate position and height for event
  const getEventStyle = (startTime: string, endTime: string) => {
    const parseTime = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours + minutes / 60;
    };
    
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const startHour = 6;
    const endHour = 22;
    
    // Clamp to visible range
    const clampedStart = Math.max(start, startHour);
    const clampedEnd = Math.min(end, endHour);
    
    const top = ((clampedStart - startHour) / (endHour - startHour)) * 100;
    const height = ((clampedEnd - clampedStart) / (endHour - startHour)) * 100;
    
    return { top: `${top}%`, height: `${height}%` };
  };
  
  // Get current time indicator position
  const getCurrentTimePosition = () => {
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    const startHour = 6;
    const endHour = 22;
    
    if (hours < startHour || hours > endHour) return null;
    
    return ((hours - startHour) / (endHour - startHour)) * 100;
  };
  
  const currentTimePosition = getCurrentTimePosition();
  const today = new Date();
  
  const handlePrevWeek = () => {
    setCurrentWeek((prev) => addDays(prev, -7));
  };
  
  const handleNextWeek = () => {
    setCurrentWeek((prev) => addDays(prev, 7));
  };
  
  const handleToday = () => {
    setCurrentWeek(new Date());
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('weeklyCalendar')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {format(weekDays[0], 'MMM dd')} - {format(weekDays[6], 'MMM dd, yyyy')}
            </p>
          </div>
          
          {/* Week Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevWeek}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={handleToday}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Today
            </button>
            <button
              onClick={handleNextWeek}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Next week"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Day Shifts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-indigo-600"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Night Shifts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-600"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">On-Call</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Recovery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Personal</span>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
            {/* Time column header */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            
            {/* Day headers */}
            {weekDays.map((day) => {
              const isToday = isSameDay(day, today);
              return (
                <div
                  key={day.toISOString()}
                  className={`p-4 text-center border-r border-gray-200 dark:border-gray-700 last:border-r-0 ${
                    isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-900'
                  }`}
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {format(day, 'EEE')}
                  </div>
                  <div
                    className={`text-lg font-semibold ${
                      isToday
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {format(day, 'd')}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Calendar body */}
          <div className="grid grid-cols-8 relative">
            {/* Time labels */}
            <div className="bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
              {timeSlots.map((time, index) => (
                <div
                  key={time}
                  className="h-20 px-3 py-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"
                >
                  {time}
                </div>
              ))}
            </div>
            
            {/* Day columns */}
            {weekDays.map((day, dayIndex) => {
              const dayEvents = getEventsForDay(day);
              const isToday = isSameDay(day, today);
              
              return (
                <div
                  key={day.toISOString()}
                  className={`relative border-r border-gray-200 dark:border-gray-700 last:border-r-0 ${
                    isToday ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                  }`}
                >
                  {/* Hour lines */}
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className="h-20 border-b border-gray-200 dark:border-gray-700"
                    />
                  ))}
                  
                  {/* Events */}
                  <div className="absolute inset-0 p-1">
                    {dayEvents.map((event) => {
                      const style = getEventStyle(event.startTime, event.endTime);
                      return (
                        <div
                          key={event.id}
                          className="absolute left-1 right-1 rounded-lg p-2 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden"
                          style={{
                            top: style.top,
                            height: style.height,
                            backgroundColor: event.color,
                            minHeight: '30px',
                          }}
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="text-white text-xs font-medium truncate">
                            {event.title}
                          </div>
                          <div className="text-white/90 text-xs">
                            {event.startTime} - {event.endTime}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Current time indicator */}
                  {isToday && currentTimePosition !== null && (
                    <div
                      className="absolute left-0 right-0 h-0.5 bg-red-500 z-10"
                      style={{ top: `${currentTimePosition}%` }}
                    >
                      <div className="absolute -left-1 -top-1.5 w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Event Details Modal */}
        {selectedEvent && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-2 rounded-full mb-4"
                style={{ backgroundColor: selectedEvent.color }}
              ></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {selectedEvent.title}
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <strong>Date:</strong> {format(selectedEvent.date, 'MMM dd, yyyy')}
                </div>
                <div>
                  <strong>Time:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}
                </div>
                <div>
                  <strong>Type:</strong> {selectedEvent.type}
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-6 w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium text-gray-900 dark:text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import { Shift, PersonalCommitment, Conflict } from '../types';

// Helper to get dates for current week
const getDateForDay = (dayOffset: number): Date => {
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() + dayOffset);
  return date;
};

export const mockShifts: Shift[] = [
  {
    id: 's1',
    date: getDateForDay(0),
    startTime: '08:00',
    endTime: '16:00',
    type: 'day',
    location: 'Emergency Department',
    repeat: 'none',
    notes: 'Regular day shift',
  },
  {
    id: 's2',
    date: getDateForDay(1),
    startTime: '20:00',
    endTime: '06:00',
    type: 'night',
    location: 'ICU',
    repeat: 'none',
    notes: 'Night shift coverage',
  },
  {
    id: 's3',
    date: getDateForDay(3),
    startTime: '08:00',
    endTime: '16:00',
    type: 'day',
    location: 'Emergency Department',
    repeat: 'weekly',
    notes: 'Recurring weekly shift',
  },
  {
    id: 's4',
    date: getDateForDay(5),
    startTime: '16:00',
    endTime: '22:00',
    type: 'oncall',
    location: 'Hospital',
    repeat: 'none',
    notes: 'On-call weekend',
  },
];

export const mockCommitments: PersonalCommitment[] = [
  {
    id: 'c1',
    name: 'Dentist Appointment',
    date: getDateForDay(2),
    startTime: '10:00',
    endTime: '11:00',
    duration: 60,
    priority: 'high',
    flexible: false,
    notes: 'Annual checkup',
  },
  {
    id: 'c2',
    name: 'Gym Session',
    date: getDateForDay(0),
    startTime: '17:00',
    endTime: '18:30',
    duration: 90,
    priority: 'medium',
    flexible: true,
    flexibleWindow: {
      earliestStart: '16:00',
      latestEnd: '20:00',
    },
    notes: 'Workout routine',
  },
  {
    id: 'c3',
    name: 'Family Dinner',
    date: getDateForDay(4),
    startTime: '19:00',
    endTime: '21:00',
    duration: 120,
    priority: 'high',
    flexible: false,
    notes: 'Weekly family gathering',
  },
  {
    id: 'c4',
    name: 'Medical Conference Call',
    date: getDateForDay(1),
    startTime: '14:00',
    endTime: '15:00',
    duration: 60,
    priority: 'high',
    flexible: false,
    notes: 'Important case discussion',
  },
];

export const mockConflicts: Conflict[] = [
  {
    id: 'cf1',
    type: 'recovery',
    status: 'active',
    description: 'Medical Conference Call scheduled during recovery period after night shift',
    ruleViolated: 'Minimum 8 hours sleep after night shift',
    suggestedFix: 'Reschedule conference call to 4:00 PM the next day',
    affectedItems: ['s2', 'c4'],
    severity: 'high',
    createdAt: new Date(),
  },
  {
    id: 'cf2',
    type: 'buffer',
    status: 'active',
    description: 'Gym session scheduled too close to day shift start time',
    ruleViolated: 'Buffer of 60 minutes before shift required',
    suggestedFix: 'Move gym session to 3:00 PM or reschedule',
    affectedItems: ['s1', 'c2'],
    severity: 'medium',
    createdAt: new Date(),
  },
];

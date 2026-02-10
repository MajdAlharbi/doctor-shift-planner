// Core data types for the medical shift planner

export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export type ShiftType = 'day' | 'night' | 'oncall';
export type RepeatOption = 'none' | 'weekly' | 'monthly';
export type Priority = 'high' | 'medium' | 'low';
export type ConflictType = 'recovery' | 'overlap' | 'buffer' | 'limit';
export type ConflictStatus = 'active' | 'resolved' | 'ignored' | 'snoozed';

export interface Shift {
  id: string;
  date: Date;
  startTime: string; // HH:mm format
  endTime: string;
  type: ShiftType;
  location?: string;
  repeat: RepeatOption;
  notes?: string;
}

export interface PersonalCommitment {
  id: string;
  name: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  priority: Priority;
  flexible: boolean;
  flexibleWindow?: {
    earliestStart: string;
    latestEnd: string;
  };
  notes?: string;
}

export interface RecoveryRules {
  minSleepAfterNightShift: number; // hours
  bufferBeforeShift: number; // minutes
  bufferAfterShift: number; // minutes
  maxCommitmentsOnShiftDays: number;
}

export interface Conflict {
  id: string;
  type: ConflictType;
  status: ConflictStatus;
  description: string;
  ruleViolated: string;
  suggestedFix: string;
  affectedItems: string[]; // IDs of shifts/commitments
  severity: 'high' | 'medium' | 'low';
  createdAt: Date;
}

export interface DoctorProfile {
  name: string;
  specialty: string;
  hospital: string;
  photoUrl?: string;
}

export interface UserPreferences {
  language: Language;
  theme: Theme;
  notifications: boolean;
  timeFormat: '12h' | '24h';
}

export interface DashboardStats {
  thisWeekShifts: number;
  recoveryHours: number;
  personalCommitments: number;
  activeConflicts: number;
}

export interface CalendarEvent {
  id: string;
  type: 'shift' | 'recovery' | 'commitment' | 'conflict';
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  color: string;
  data: Shift | PersonalCommitment;
}

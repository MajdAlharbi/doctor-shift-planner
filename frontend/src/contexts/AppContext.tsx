import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  Theme,
  Shift,
  PersonalCommitment,
  RecoveryRules,
  Conflict,
  DoctorProfile,
  UserPreferences,
} from '../types';

interface AppContextType {
  // User & Preferences
  profile: DoctorProfile;
  setProfile: (profile: DoctorProfile) => void;
  preferences: UserPreferences;
  setPreferences: (prefs: UserPreferences) => void;
  
  // Language & Theme
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
  
  // Data
  shifts: Shift[];
  setShifts: (shifts: Shift[]) => void;
  addShift: (shift: Shift) => void;
  updateShift: (id: string, shift: Partial<Shift>) => void;
  deleteShift: (id: string) => void;
  
  commitments: PersonalCommitment[];
  setCommitments: (commitments: PersonalCommitment[]) => void;
  addCommitment: (commitment: PersonalCommitment) => void;
  updateCommitment: (id: string, commitment: Partial<PersonalCommitment>) => void;
  deleteCommitment: (id: string) => void;
  
  recoveryRules: RecoveryRules;
  setRecoveryRules: (rules: RecoveryRules) => void;
  
  conflicts: Conflict[];
  setConflicts: (conflicts: Conflict[]) => void;
  resolveConflict: (id: string) => void;
  ignoreConflict: (id: string) => void;
  snoozeConflict: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    welcome: 'Welcome back',
    dashboard: 'Dashboard',
    myShifts: 'My Shifts',
    weeklyCalendar: 'Weekly Calendar',
    myCommitments: 'My Commitments',
    recoveryRules: 'Recovery Rules',
    conflicts: 'Conflict Resolution',
    profile: 'Profile & Settings',
    thisWeekShifts: "This Week's Shifts",
    recoveryHours: 'Recovery Hours',
    personalCommitments: 'Personal Commitments',
    activeConflicts: 'Active Conflicts',
    addShift: 'Add Shift',
    addCommitment: 'Add Commitment',
    generatePlan: 'Generate Smart Plan',
    urgentConflicts: 'Urgent Conflicts (Need Attention)',
    noConflicts: 'Great! No scheduling conflicts detected',
    noShifts: 'Add your first shift to get started',
    noCommitments: 'Add personal activities for better balance',
    workLifeBalance: 'Work-Life Balance Score',
    maxShifts: 'Maximum recommended: {maxShifts} shifts/week',
    day: 'Day',
    night: 'Night',
    oncall: 'On-Call',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    apply: 'Apply',
    ignore: 'Ignore',
    snooze: 'Snooze',
    light: 'Light',
    dark: 'Dark',
    english: 'English',
    arabic: 'Arabic',
  },
  ar: {
    welcome: 'مرحباً بعودتك',
    dashboard: 'لوحة التحكم',
    myShifts: 'نوباتي',
    weeklyCalendar: 'التقويم الأسبوعي',
    myCommitments: 'التزاماتي',
    recoveryRules: 'قواعد الاستشفاء',
    conflicts: 'حل النزاعات',
    profile: 'الملف الشخصي والإعدادات',
    thisWeekShifts: 'نوبات هذا الأسبوع',
    recoveryHours: 'ساعات الاستشفاء',
    personalCommitments: 'الالتزامات الشخصية',
    activeConflicts: 'النزاعات النشطة',
    addShift: 'إضافة نوبة',
    addCommitment: 'إضافة التزام',
    generatePlan: 'إنشاء خطة ذكية',
    urgentConflicts: 'نزاعات عاجلة (تحتاج انتباه)',
    noConflicts: 'رائع! لا توجد تعارضات في الجدول',
    noShifts: 'أضف نوبتك الأولى للبدء',
    noCommitments: 'أضف أنشطة شخصية لتحقيق توازن أفضل',
    workLifeBalance: 'درجة التوازن بين العمل والحياة',
    maxShifts: 'الحد الأقصى الموصى به: {maxShifts} نوبات/أسبوع',
    day: 'نهاري',
    night: 'ليلي',
    oncall: 'استدعاء',
    high: 'عالي',
    medium: 'متوسط',
    low: 'منخفض',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    apply: 'تطبيق',
    ignore: 'تجاهل',
    snooze: 'غفوة',
    light: 'فاتح',
    dark: 'داكن',
    english: 'إنجليزي',
    arabic: 'عربي',
  },
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  
  const [profile, setProfile] = useState<DoctorProfile>({
    name: 'Dr. Ahmed Hassan',
    specialty: 'Emergency Medicine',
    hospital: 'City General Hospital',
  });
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    language: 'en',
    theme: 'light',
    notifications: true,
    timeFormat: '12h',
  });
  
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [commitments, setCommitments] = useState<PersonalCommitment[]>([]);
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  
  const [recoveryRules, setRecoveryRules] = useState<RecoveryRules>({
    minSleepAfterNightShift: 8,
    bufferBeforeShift: 60,
    bufferAfterShift: 120,
    maxCommitmentsOnShiftDays: 2,
  });
  
  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [theme, language]);
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  const addShift = (shift: Shift) => {
    setShifts((prev) => [...prev, shift]);
  };
  
  const updateShift = (id: string, updatedShift: Partial<Shift>) => {
    setShifts((prev) =>
      prev.map((shift) => (shift.id === id ? { ...shift, ...updatedShift } : shift))
    );
  };
  
  const deleteShift = (id: string) => {
    setShifts((prev) => prev.filter((shift) => shift.id !== id));
  };
  
  const addCommitment = (commitment: PersonalCommitment) => {
    setCommitments((prev) => [...prev, commitment]);
  };
  
  const updateCommitment = (id: string, updatedCommitment: Partial<PersonalCommitment>) => {
    setCommitments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedCommitment } : c))
    );
  };
  
  const deleteCommitment = (id: string) => {
    setCommitments((prev) => prev.filter((c) => c.id !== id));
  };
  
  const resolveConflict = (id: string) => {
    setConflicts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'resolved' as ConflictStatus } : c))
    );
  };
  
  const ignoreConflict = (id: string) => {
    setConflicts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'ignored' as ConflictStatus } : c))
    );
  };
  
  const snoozeConflict = (id: string) => {
    setConflicts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'snoozed' as ConflictStatus } : c))
    );
  };
  
  const value: AppContextType = {
    profile,
    setProfile,
    preferences,
    setPreferences,
    language,
    setLanguage,
    theme,
    setTheme,
    t,
    shifts,
    setShifts,
    addShift,
    updateShift,
    deleteShift,
    commitments,
    setCommitments,
    addCommitment,
    updateCommitment,
    deleteCommitment,
    recoveryRules,
    setRecoveryRules,
    conflicts,
    setConflicts,
    resolveConflict,
    ignoreConflict,
    snoozeConflict,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
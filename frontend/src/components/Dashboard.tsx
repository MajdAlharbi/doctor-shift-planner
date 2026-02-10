import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Calendar, Clock, AlertTriangle, Activity, Plus, Sparkles, ChevronRight, Lightbulb, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { QuickTips } from './QuickTips';
import { Progress } from './ui/progress';

export const Dashboard: React.FC = () => {
  const { profile, shifts, commitments, conflicts, recoveryRules, t, language } = useApp();
  const [showTips, setShowTips] = useState(false);
  
  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 6);
    
    const thisWeekShifts = shifts.filter(
      (s) => s.date >= weekStart && s.date <= weekEnd
    ).length;
    
    // Calculate recovery hours (8 hours after each night shift)
    const nightShifts = shifts.filter((s) => s.type === 'night');
    const recoveryHours = nightShifts.length * recoveryRules.minSleepAfterNightShift;
    
    const activeConflicts = conflicts.filter((c) => c.status === 'active' || c.status === 'pending').length;
    
    // Calculate work-life balance score
    const maxRecommendedShifts = 5;
    const workLifeBalance = Math.max(0, 100 - (thisWeekShifts / maxRecommendedShifts) * 100);
    
    return {
      thisWeekShifts,
      recoveryHours,
      personalCommitments: commitments.length,
      activeConflicts,
      workLifeBalance,
      maxShifts: maxRecommendedShifts,
    };
  }, [shifts, commitments, conflicts, recoveryRules]);
  
  // Get urgent conflicts
  const urgentConflicts = conflicts.filter(
    (c) => c.status === 'active' && c.severity === 'high'
  ).slice(0, 3);
  
  // Generate mini calendar (current week)
  const weekDays = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, []);
  
  const getShiftForDay = (date: Date) => {
    return shifts.find((s) => isSameDay(s.date, date));
  };
  
  const statCards = [
    {
      title: t('thisWeekShifts'),
      value: stats.thisWeekShifts,
      icon: Calendar,
      color: 'bg-blue-500',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: t('recoveryHours'),
      value: stats.recoveryHours,
      icon: Clock,
      color: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: t('personalCommitments'),
      value: stats.personalCommitments,
      icon: Activity,
      color: 'bg-orange-500',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      title: t('activeConflicts'),
      value: stats.activeConflicts,
      icon: AlertTriangle,
      color: 'bg-red-500',
      textColor: 'text-red-600 dark:text-red-400',
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('welcome')}, {profile.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {profile.specialty} • {profile.hospital}
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mini Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                This Week's Overview
              </h2>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => {
                  const shift = getShiftForDay(day);
                  const isToday = isSameDay(day, new Date());
                  
                  return (
                    <div
                      key={day.toISOString()}
                      className={`text-center p-3 rounded-lg border ${
                        isToday
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {format(day, 'EEE')}
                      </div>
                      <div
                        className={`text-lg font-semibold mb-2 ${
                          isToday
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {format(day, 'd')}
                      </div>
                      {shift && (
                        <div
                          className={`text-xs px-2 py-1 rounded ${
                            shift.type === 'day'
                              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                              : shift.type === 'night'
                              ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                              : 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                          }`}
                        >
                          {t(shift.type)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/shifts"
                className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {t('addShift')}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </Link>
              
              <Link
                to="/commitments"
                className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-orange-600 p-2 rounded-lg">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {t('addCommitment')}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400" />
              </Link>
              
              <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all group">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="font-medium text-white">{t('generatePlan')}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-white/80 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Urgent Conflicts Section */}
        {urgentConflicts.length > 0 && (
          <div className="mt-8 bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-red-900 dark:text-red-100">
                ⚠️ {t('urgentConflicts')}
              </h2>
              <Link
                to="/conflicts"
                className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {urgentConflicts.map((conflict) => (
                <div
                  key={conflict.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-red-200 dark:border-red-800"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {conflict.description}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Rule: {conflict.ruleViolated}
                  </p>
                  <Link
                    to="/conflicts"
                    className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
                  >
                    Resolve Now →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* No Conflicts Message */}
        {conflicts.filter((c) => c.status === 'active').length === 0 && (
          <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 text-center">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-lg font-medium text-green-900 dark:text-green-100">
              {t('noConflicts')}
            </p>
          </div>
        )}
        
        {/* Work-Life Balance Progress Bar */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Work-Life Balance
          </h2>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('workLifeBalance')}
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {stats.workLifeBalance.toFixed(0)}%
            </p>
          </div>
          <Progress value={stats.workLifeBalance} />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Maximum recommended: {stats.maxShifts} shifts/week
          </p>
        </div>
        
        {/* Help Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowTips(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg transition-colors font-medium"
          >
            <Lightbulb className="w-5 h-5" />
            <span>View Quick Tips</span>
          </button>
        </div>
      </div>
      
      {/* Quick Tips Modal */}
      {showTips && <QuickTips onClose={() => setShowTips(false)} />}
    </div>
  );
};
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Clock as ClockIcon, Filter } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ConflictStatus } from '../../types';
import { format } from 'date-fns';

export const ConflictResolution: React.FC = () => {
  const { conflicts, resolveConflict, ignoreConflict, snoozeConflict, t } = useApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const [selectedTab, setSelectedTab] = useState<'current' | 'history'>('current');
  
  const filteredConflicts = conflicts.filter((c) => {
    if (selectedTab === 'current') {
      return c.status === 'active' || c.status === 'snoozed';
    } else {
      return c.status === 'resolved' || c.status === 'ignored';
    }
  }).filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });
  
  const activeConflicts = conflicts.filter((c) => c.status === 'active');
  const urgentConflicts = activeConflicts.filter((c) => c.severity === 'high');
  
  const getConflictIcon = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />;
      case 'medium':
        return <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />;
      case 'low':
        return <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
    }
  };
  
  const getSeverityColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700';
    }
  };
  
  const getStatusBadge = (status: ConflictStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
            Active
          </span>
        );
      case 'resolved':
        return (
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Resolved
          </span>
        );
      case 'ignored':
        return (
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Ignored
          </span>
        );
      case 'snoozed':
        return (
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            Snoozed
          </span>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('conflicts')} Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and resolve scheduling conflicts
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">
                  Urgent Conflicts
                </p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {urgentConflicts.length}
                </p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium mb-1">
                  Active Conflicts
                </p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {activeConflicts.length}
                </p>
              </div>
              <AlertTriangle className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">
                  Resolved
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {conflicts.filter((c) => c.status === 'resolved').length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setSelectedTab('current')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'current'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Current Issues ({activeConflicts.length})
          </button>
          <button
            onClick={() => setSelectedTab('history')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedTab === 'history'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            History ({conflicts.length - activeConflicts.length})
          </button>
        </div>
        
        {/* Filter */}
        {selectedTab === 'current' && (
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
            {(['all', 'active'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {f === 'all' ? 'All' : 'Active Only'}
              </button>
            ))}
          </div>
        )}
        
        {/* Conflicts List */}
        {filteredConflicts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
            {selectedTab === 'current' ? (
              <>
                <div className="text-6xl mb-4">✅</div>
                <p className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">
                  {t('noConflicts')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your schedule is perfectly balanced!
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">📋</div>
                <p className="text-lg text-gray-600 dark:text-gray-400">No history yet</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredConflicts.map((conflict) => (
              <div
                key={conflict.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 border-2 ${getSeverityColor(
                  conflict.severity
                )} hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 p-3 bg-white dark:bg-gray-900 rounded-lg">
                    {getConflictIcon(conflict.severity)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-medium uppercase ${getSeverityColor(
                              conflict.severity
                            )}`}
                          >
                            {conflict.severity} Priority
                          </span>
                          {getStatusBadge(conflict.status)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {conflict.description}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 dark:text-gray-400 font-medium min-w-[100px]">
                          Rule Violated:
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {conflict.ruleViolated}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 dark:text-gray-400 font-medium min-w-[100px]">
                          Suggested Fix:
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          {conflict.suggestedFix}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 dark:text-gray-400 font-medium min-w-[100px]">
                          Detected:
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {format(conflict.createdAt, 'MMM dd, yyyy HH:mm')}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions - Only show for active/snoozed conflicts */}
                    {(conflict.status === 'active' || conflict.status === 'snoozed') && (
                      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => resolveConflict(conflict.id)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm"
                        >
                          {t('apply')} Fix
                        </button>
                        <button
                          onClick={() => ignoreConflict(conflict.id)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium text-sm"
                        >
                          {t('ignore')}
                        </button>
                        <button
                          onClick={() => snoozeConflict(conflict.id)}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-lg transition-colors font-medium text-sm"
                        >
                          {t('snooze')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Help Section */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 How Conflict Resolution Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <strong className="block mb-2">Apply Fix:</strong>
              <p>Automatically reschedules the conflicting item based on the suggested solution.</p>
            </div>
            <div>
              <strong className="block mb-2">Ignore:</strong>
              <p>Keeps the conflict as-is and marks it as acknowledged. Won't show in active list.</p>
            </div>
            <div>
              <strong className="block mb-2">Snooze:</strong>
              <p>Temporarily hides the conflict. Will reappear later for review.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

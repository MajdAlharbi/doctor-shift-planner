import React, { useState } from 'react';
import { Save, RotateCcw, Moon, Clock, Shield, Activity } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { RecoveryRules as RecoveryRulesType } from '../types';

export const RecoveryRules: React.FC = () => {
  const { recoveryRules, setRecoveryRules, t } = useApp();
  const [formData, setFormData] = useState<RecoveryRulesType>(recoveryRules);
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    setRecoveryRules(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  
  const handleReset = () => {
    const defaultRules: RecoveryRulesType = {
      minSleepAfterNightShift: 8,
      bufferBeforeShift: 60,
      bufferAfterShift: 120,
      maxCommitmentsOnShiftDays: 2,
    };
    setFormData(defaultRules);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('recoveryRules')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure your recovery and buffer time preferences to maintain work-life balance
          </p>
        </div>
        
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="space-y-8">
            {/* Minimum Sleep After Night Shift */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-lg">
                  <Moon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Minimum Sleep After Night Shift
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Ensures adequate recovery time after night shifts to prevent burnout
                  </p>
                  <div className="flex items-center gap-6">
                    <input
                      type="range"
                      min="6"
                      max="12"
                      step="1"
                      value={formData.minSleepAfterNightShift}
                      onChange={(e) =>
                        setFormData({ ...formData, minSleepAfterNightShift: Number(e.target.value) })
                      }
                      className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400 min-w-[80px]">
                      {formData.minSleepAfterNightShift} hours
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>6 hours</span>
                    <span>12 hours</span>
                  </div>
                </div>
              </div>
              
              {/* Visual Example */}
              <div className="ml-16 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Example:</strong>
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 rounded text-indigo-700 dark:text-indigo-300">
                    Night Shift: 20:00 - 06:00
                  </div>
                  <span>→</span>
                  <div className="px-3 py-1 bg-green-100 dark:bg-green-900/40 rounded text-green-700 dark:text-green-300">
                    Recovery: 06:00 - {6 + formData.minSleepAfterNightShift}:00
                  </div>
                </div>
              </div>
            </div>
            
            {/* Buffer Before Shift */}
            <div className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Buffer Time Before Shift
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Free time before your shift starts for preparation and commute
                  </p>
                  <div className="flex items-center gap-6">
                    <input
                      type="range"
                      min="0"
                      max="120"
                      step="15"
                      value={formData.bufferBeforeShift}
                      onChange={(e) =>
                        setFormData({ ...formData, bufferBeforeShift: Number(e.target.value) })
                      }
                      className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 min-w-[80px]">
                      {formData.bufferBeforeShift} min
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>No buffer</span>
                    <span>2 hours</span>
                  </div>
                </div>
              </div>
              
              {/* Visual Example */}
              <div className="ml-16 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Example:</strong>
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Day shift at 08:00 → No personal activities after{' '}
                  {`${String(8 - Math.floor(formData.bufferBeforeShift / 60)).padStart(2, '0')}:${String(
                    60 - (formData.bufferBeforeShift % 60)
                  ).padStart(2, '0')}`}
                </div>
              </div>
            </div>
            
            {/* Buffer After Shift */}
            <div className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Buffer Time After Shift
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Recovery time after shift ends before scheduling personal activities
                  </p>
                  <div className="flex items-center gap-6">
                    <input
                      type="range"
                      min="0"
                      max="180"
                      step="15"
                      value={formData.bufferAfterShift}
                      onChange={(e) =>
                        setFormData({ ...formData, bufferAfterShift: Number(e.target.value) })
                      }
                      className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 min-w-[80px]">
                      {formData.bufferAfterShift} min
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>No buffer</span>
                    <span>3 hours</span>
                  </div>
                </div>
              </div>
              
              {/* Visual Example */}
              <div className="ml-16 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Example:</strong>
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Shift ends at 16:00 → No personal activities before{' '}
                  {`${String(16 + Math.floor(formData.bufferAfterShift / 60)).padStart(2, '0')}:${String(
                    formData.bufferAfterShift % 60
                  ).padStart(2, '0')}`}
                </div>
              </div>
            </div>
            
            {/* Max Commitments on Shift Days */}
            <div className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
                  <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Max Personal Commitments on Shift Days
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Limit the number of personal activities on days when you have shifts
                  </p>
                  <div className="flex items-center gap-6">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="1"
                      value={formData.maxCommitmentsOnShiftDays}
                      onChange={(e) =>
                        setFormData({ ...formData, maxCommitmentsOnShiftDays: Number(e.target.value) })
                      }
                      className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400 min-w-[80px]">
                      {formData.maxCommitmentsOnShiftDays}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>None</span>
                    <span>5 activities</span>
                  </div>
                </div>
              </div>
              
              {/* Visual Example */}
              <div className="ml-16 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Example:</strong>
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formData.maxCommitmentsOnShiftDays === 0
                    ? 'No personal activities allowed on shift days'
                    : `Maximum ${formData.maxCommitmentsOnShiftDays} personal ${
                        formData.maxCommitmentsOnShiftDays === 1 ? 'activity' : 'activities'
                      } allowed on days with shifts`}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset to Defaults</span>
          </button>
          
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            <span>{saved ? 'Saved!' : t('save') + ' Rules'}</span>
          </button>
        </div>
        
        {/* Success Message */}
        {saved && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
            <p className="text-green-700 dark:text-green-300 font-medium">
              ✅ Recovery rules saved successfully!
            </p>
          </div>
        )}
        
        {/* Info Box */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 Why Recovery Rules Matter
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Prevent burnout by ensuring adequate rest between shifts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Maintain work-life balance with buffer times for personal needs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Reduce scheduling conflicts automatically</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <span>Improve overall well-being and job satisfaction</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

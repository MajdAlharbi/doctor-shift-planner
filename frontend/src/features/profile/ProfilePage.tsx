import React, { useState } from 'react';
import { User, Stethoscope, Building2, Save, Globe, Monitor, Bell, Clock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const ProfileSettings: React.FC = () => {
  const { profile, setProfile, preferences, setPreferences, language, setLanguage, theme, setTheme, t } = useApp();
  const [saved, setSaved] = useState(false);
  
  const [profileData, setProfileData] = useState(profile);
  const [preferencesData, setPreferencesData] = useState(preferences);
  
  const handleSave = () => {
    setProfile(profileData);
    setPreferences(preferencesData);
    setLanguage(preferencesData.language);
    setTheme(preferencesData.theme);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('profile')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and preferences
          </p>
        </div>
        
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Personal Information
          </h2>
          
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm">
                  Change Photo
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  JPG, PNG or GIF. Max size 2MB
                </p>
              </div>
            </div>
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Specialty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Specialty
              </label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={profileData.specialty}
                  onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                  placeholder="e.g., Emergency Medicine"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Hospital */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hospital / Clinic
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={profileData.hospital}
                  onChange={(e) => setProfileData({ ...profileData, hospital: e.target.value })}
                  placeholder="e.g., City General Hospital"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Preferences Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Preferences
          </h2>
          
          <div className="space-y-6">
            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Globe className="w-5 h-5 inline mr-2" />
                Language
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPreferencesData({ ...preferencesData, language: 'en' })}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    preferencesData.language === 'en'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-semibold">English</div>
                  <div className="text-xs opacity-70">EN</div>
                </button>
                <button
                  onClick={() => setPreferencesData({ ...preferencesData, language: 'ar' })}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    preferencesData.language === 'ar'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-semibold">العربية</div>
                  <div className="text-xs opacity-70">AR</div>
                </button>
              </div>
            </div>
            
            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Monitor className="w-5 h-5 inline mr-2" />
                Theme
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPreferencesData({ ...preferencesData, theme: 'light' })}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    preferencesData.theme === 'light'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-semibold">{t('light')} Mode</div>
                  <div className="text-xs opacity-70">☀️</div>
                </button>
                <button
                  onClick={() => setPreferencesData({ ...preferencesData, theme: 'dark' })}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    preferencesData.theme === 'dark'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-semibold">{t('dark')} Mode</div>
                  <div className="text-xs opacity-70">🌙</div>
                </button>
              </div>
            </div>
            
            {/* Time Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Clock className="w-5 h-5 inline mr-2" />
                Time Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPreferencesData({ ...preferencesData, timeFormat: '12h' })}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    preferencesData.timeFormat === '12h'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-semibold">12-hour</div>
                  <div className="text-xs opacity-70">1:00 PM</div>
                </button>
                <button
                  onClick={() => setPreferencesData({ ...preferencesData, timeFormat: '24h' })}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    preferencesData.timeFormat === '24h'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-semibold">24-hour</div>
                  <div className="text-xs opacity-70">13:00</div>
                </button>
              </div>
            </div>
            
            {/* Notifications */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Notifications
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Receive alerts for conflicts and reminders
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferencesData.notifications}
                  onChange={(e) =>
                    setPreferencesData({ ...preferencesData, notifications: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Account Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Account
          </h2>
          
          <div className="space-y-4">
            <button className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium text-left">
              Change Password
            </button>
            <button className="w-full px-6 py-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg transition-colors font-medium text-left">
              Export My Data
            </button>
            <button className="w-full px-6 py-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg transition-colors font-medium text-left">
              Delete Account
            </button>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            <span>{saved ? 'Saved!' : t('save') + ' Changes'}</span>
          </button>
        </div>
        
        {/* Success Message */}
        {saved && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
            <p className="text-green-700 dark:text-green-300 font-medium">
              ✅ Settings saved successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

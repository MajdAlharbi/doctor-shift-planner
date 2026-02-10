import React from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Clock,
  Calendar,
  ListChecks,
  Moon,
  AlertTriangle,
  User,
  Globe,
  Sun,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

export const Sidebar: React.FC = () => {
  const { profile, language, setLanguage, theme, setTheme, t, conflicts } = useApp();
  const location = useLocation();

  const navigation = [
    { 
      name: t('dashboard'), 
      path: '/', 
      icon: LayoutDashboard,
      label: 'Dashboard'
    },
    { 
      name: t('myShifts'), 
      path: '/shifts', 
      icon: Clock,
      label: 'My Shifts'
    },
    { 
      name: t('weeklyCalendar'), 
      path: '/calendar', 
      icon: Calendar,
      label: 'Weekly Calendar'
    },
    { 
      name: t('myCommitments'), 
      path: '/commitments', 
      icon: ListChecks,
      label: 'My Commitments'
    },
    { 
      name: t('recoveryRules'), 
      path: '/recovery', 
      icon: Moon,
      label: 'Recovery Rules'
    },
    { 
      name: t('conflicts'), 
      path: '/conflicts', 
      icon: AlertTriangle,
      label: 'Conflict Resolution',
      badge: conflicts.filter(c => c.status === 'pending').length
    },
    { 
      name: t('profile'), 
      path: '/profile', 
      icon: User,
      label: 'Profile & Settings'
    },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  // Check if path is active (exact match for home, prefix match for others)
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside 
      className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-screen w-20 bg-white dark:bg-gray-800 border-${language === 'ar' ? 'l' : 'r'} border-gray-200 dark:border-gray-700 flex flex-col items-center py-6 gap-6 z-50 shadow-sm`}
    >
      {/* Top Section: Logo & Doctor Name */}
      <div className="flex flex-col items-center gap-2 px-2">
        {/* Logo with hover effect */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 cursor-help group">
              <span className="text-white font-bold text-2xl group-hover:scale-110 transition-transform">M</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side={language === 'ar' ? 'left' : 'right'} sideOffset={10}>
            <div className="text-center">
              <p className="font-bold text-sm">MedShift Planner</p>
              <p className="text-xs opacity-90 mt-0.5">Medical Shift Management</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        {/* Doctor Name Badge */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center w-14 h-7 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-help hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
                {profile.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side={language === 'ar' ? 'left' : 'right'} sideOffset={10}>
            <div className="text-center">
              <p className="font-semibold">{profile.name}</p>
              <p className="text-xs opacity-80 mt-0.5">{profile.specialty}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Separator */}
      <div className="w-12 h-px bg-gray-200 dark:bg-gray-700" />

      {/* Middle Section: Navigation Icons */}
      <nav className="flex-1 flex flex-col items-center gap-2 w-full px-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Tooltip key={item.path}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={`relative w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-200 group ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-md scale-105'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105'
                  }`}
                >
                  <Icon className={`w-6 h-6 transition-transform ${active ? '' : 'group-hover:scale-110'}`} />
                  
                  {/* Badge for conflicts */}
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                  
                  {/* Active Indicator Bar */}
                  {active && (
                    <span 
                      className={`absolute ${language === 'ar' ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-blue-500 to-blue-600 rounded-${language === 'ar' ? 'l' : 'r'}-full shadow-lg`}
                    />
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent side={language === 'ar' ? 'left' : 'right'} sideOffset={10}>
                <p className="font-medium">{item.name}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* Separator */}
      <div className="w-12 h-px bg-gray-200 dark:bg-gray-700" />

      {/* Bottom Section: Theme & Language Toggle */}
      <div className="flex flex-col items-center gap-2 pb-2">
        {/* Theme Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleTheme}
              className="w-14 h-14 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-200 hover:scale-105 group"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              ) : (
                <Sun className="w-6 h-6 group-hover:rotate-45 transition-transform" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side={language === 'ar' ? 'left' : 'right'} sideOffset={10}>
            <p className="font-medium">{theme === 'light' ? t('dark') : t('light')} Mode</p>
          </TooltipContent>
        </Tooltip>

        {/* Language Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleLanguage}
              className="w-14 h-14 flex flex-col items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105 group"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5 mb-0.5 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-bold uppercase">{language}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side={language === 'ar' ? 'left' : 'right'} sideOffset={10}>
            <p className="font-medium">{language === 'en' ? t('arabic') : t('english')}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
};
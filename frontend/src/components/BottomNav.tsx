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
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

export const BottomNav: React.FC = () => {
  const { language, t, conflicts } = useApp();
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

  // Check if path is active (exact match for home, prefix match for others)
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed bottom-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 z-50 shadow-2xl`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-1 sm:px-4">
        <div className="flex items-center justify-around py-1.5 sm:py-2 gap-0.5 sm:gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={`relative flex flex-col items-center justify-center flex-1 max-w-[80px] sm:max-w-[100px] h-14 sm:h-16 rounded-2xl transition-all duration-300 ease-out group ${
                      active
                        ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-900/20 text-blue-600 dark:text-blue-400 scale-105 shadow-md'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`transition-all duration-300 ${active ? 'scale-110' : 'group-hover:scale-110 group-active:scale-100'}`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={active ? 2.5 : 2} />
                    </div>
                    
                    {/* Label - Adaptive visibility */}
                    <span className={`text-[10px] sm:text-xs font-medium mt-0.5 sm:mt-1 transition-all duration-200 ${
                      active 
                        ? 'opacity-100 text-blue-600 dark:text-blue-400 font-semibold' 
                        : 'opacity-70 text-gray-600 dark:text-gray-400 group-hover:opacity-100'
                    }`}>
                      {item.name.length > 8 
                        ? item.name.substring(0, 7) + '…' 
                        : item.name}
                    </span>
                    
                    {/* Badge for conflicts */}
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 sm:top-0 sm:right-0 min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] px-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-gray-800 animate-pulse">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                    
                    {/* Active Indicator - Top bar with glow */}
                    {active && (
                      <>
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-b-full shadow-lg" />
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-b-full blur-sm opacity-50" />
                      </>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={10}>
                  <div className="text-center">
                    <p className="font-semibold">{item.label}</p>
                    {active && <p className="text-xs opacity-80 mt-0.5">Current Page</p>}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
      
      {/* Safe area for iOS devices */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white dark:bg-gray-800" />
    </nav>
  );
};
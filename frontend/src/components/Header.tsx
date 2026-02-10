import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

export const Header: React.FC = () => {
  const { profile, language, setLanguage, theme, setTheme, t } = useApp();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <header 
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl sm:text-2xl">M</span>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                MedShift Planner
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">{profile.name}</p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-200 hover:scale-105 group"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                  ) : (
                    <Sun className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-45 transition-transform" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={5}>
                <p className="font-medium">{theme === 'light' ? t('dark') : t('light')} Mode</p>
              </TooltipContent>
            </Tooltip>
            
            {/* Language Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleLanguage}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex flex-col items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105 group"
                  aria-label="Toggle language"
                >
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 group-hover:rotate-12 transition-transform" />
                  <span className="text-xs font-bold uppercase">{language}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={5}>
                <p className="font-medium">{language === 'en' ? t('arabic') : t('english')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
};
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  isDarkMode: boolean;
  isRTL: boolean;
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  isDarkMode, 
  isRTL, 
  title, 
  message,
  onRetry 
}: ErrorStateProps) {
  const defaultTitle = isRTL ? 'حدث خطأ' : 'Something Went Wrong';
  const defaultMessage = isRTL 
    ? 'تعذر تحميل البيانات. يرجى المحاولة مرة أخرى.' 
    : 'Unable to load data. Please try again.';

  return (
    <div className={`rounded-xl p-8 text-center ${
      isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
    }`}>
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
        isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
      }`}>
        <AlertCircle className="w-8 h-8" />
      </div>
      
      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        {title || defaultTitle}
      </h3>
      
      <p className={`text-sm mb-6 max-w-md mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        {message || defaultMessage}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105 ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          {isRTL ? 'إعادة المحاولة' : 'Try Again'}
        </button>
      )}
    </div>
  );
}

export function InlineError({ isDarkMode, isRTL, message }: { isDarkMode: boolean; isRTL: boolean; message: string }) {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg ${
      isDarkMode ? 'bg-red-900/20 border border-red-900/30' : 'bg-red-50 border border-red-100'
    }`}>
      <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
        isDarkMode ? 'text-red-400' : 'text-red-600'
      }`} />
      <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
        {message}
      </p>
    </div>
  );
}

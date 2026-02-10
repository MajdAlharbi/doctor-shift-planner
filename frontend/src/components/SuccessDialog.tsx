import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  isRTL: boolean;
  title?: string;
  message?: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export function SuccessDialog({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  isRTL,
  title,
  message,
  autoClose = true,
  autoCloseDelay = 3000
}: SuccessDialogProps) {
  const defaultTitle = isRTL ? 'نجحت العملية' : 'Success!';
  const defaultMessage = isRTL ? 'تم حفظ التغييرات بنجاح' : 'Changes saved successfully';

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className={`pointer-events-auto w-full max-w-md rounded-xl shadow-2xl animate-in zoom-in duration-200 ${
            isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
          }`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            isDarkMode ? 'border-slate-700' : 'border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-emerald-900/40' : 'bg-emerald-50'
              }`}>
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {title || defaultTitle}
              </h3>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {message || defaultMessage}
            </p>
          </div>
          
          {/* Footer */}
          <div className={`flex justify-end gap-3 p-6 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-slate-200'
          }`}>
            <button
              onClick={onClose}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {isRTL ? 'تم' : 'Done'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

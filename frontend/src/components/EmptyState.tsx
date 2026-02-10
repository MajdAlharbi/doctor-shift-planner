import { CalendarX2, Plus, LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  isDarkMode?: boolean;
  isRTL?: boolean;
  type?: 'shifts' | 'conflicts' | 'day' | 'commitments' | 'general';
  onAction?: () => void;
  icon?: LucideIcon;
  title?: string;
  description?: string;
  actionText?: string;
}

export function EmptyState({ 
  isDarkMode = false, 
  isRTL = false, 
  type = 'shifts', 
  onAction,
  icon: CustomIcon,
  title: customTitle,
  description: customDescription,
  actionText: customActionText
}: EmptyStateProps) {
  const getContent = () => {
    switch (type) {
      case 'day':
        return {
          icon: CalendarX2,
          title: isRTL ? 'لا توجد مناوبات' : 'No Shifts Scheduled',
          description: isRTL ? 'لم يتم جدولة أي مناوبات لهذا اليوم' : 'No shifts are scheduled for this day',
          actionText: isRTL ? 'إضافة مناوبة' : 'Add Shift',
          variant: 'info' as const
        };
      case 'conflicts':
        return {
          icon: null,
          title: isRTL ? 'لا توجد تعارضات' : 'All Clear!',
          description: isRTL ? 'لا توجد تعارضات في الجدول الحالي' : 'No scheduling conflicts detected',
          actionText: null,
          variant: 'success' as const
        };
      case 'commitments':
        return {
          icon: CalendarX2,
          title: isRTL ? 'لا توجد التزامات' : 'No Commitments Yet',
          description: isRTL ? 'لم يتم إضافة أي التزامات شخصية' : 'Start adding your personal commitments to manage work-life balance',
          actionText: isRTL ? 'إضافة التزام' : 'Add Commitment',
          variant: 'info' as const
        };
      default:
        return {
          icon: CalendarX2,
          title: isRTL ? 'ابدأ بإضافة المناوبات' : 'Start Adding Shifts',
          description: isRTL ? 'قم بإنشاء جدول المناوبات لفريقك الطبي' : 'Create your medical team schedule to get started',
          actionText: isRTL ? 'إنشاء مناوبة جديدة' : 'Create New Shift',
          variant: 'default' as const
        };
    }
  };

  const content = getContent();
  const Icon = CustomIcon || content.icon;
  const title = customTitle || content.title;
  const description = customDescription || content.description;
  const actionText = customActionText !== undefined ? customActionText : content.actionText;

  const variantStyles = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500',
    info: 'bg-blue-50 dark:bg-blue-950 text-blue-400 dark:text-blue-500',
    success: 'bg-green-50 dark:bg-green-950 text-green-500 dark:text-green-400',
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] px-4 py-12">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6 ${
          variantStyles[content.variant]
        } transition-all duration-300 hover:scale-105`}>
          {type === 'conflicts' ? (
            <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : Icon ? (
            <Icon className="w-14 h-14" strokeWidth={1.5} />
          ) : null}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {description}
        </p>

        {/* Action Button */}
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}
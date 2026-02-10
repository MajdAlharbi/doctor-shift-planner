import { Skeleton } from './ui/skeleton';

interface LoadingSkeletonProps {
  isDarkMode?: boolean;
  count?: number;
}

export function ShiftCardSkeleton({ isDarkMode = false }: LoadingSkeletonProps) {
  return (
    <div className="rounded-xl p-4 bg-gray-100 dark:bg-gray-800 animate-pulse shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-3">
        <Skeleton className="h-5 w-28 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-6 w-18 bg-gray-200 dark:bg-gray-700" />
      </div>
      <Skeleton className="h-4 w-24 mb-3 bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-36 bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export function DashboardSkeleton({ isDarkMode = false }: LoadingSkeletonProps) {
  return (
    <div className="space-y-6 p-6">
      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-700" />
            </div>
            <Skeleton className="h-10 w-20 mb-2 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md animate-pulse">
          <Skeleton className="h-7 w-40 mb-6 bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <ShiftCardSkeleton key={i} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md animate-pulse">
          <Skeleton className="h-7 w-40 mb-6 bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CalendarLoadingSkeleton({ isDarkMode = false }: LoadingSkeletonProps) {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
      {/* Header Skeleton */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-9 w-56 mb-3 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-5 w-40 bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-11 w-11 rounded-xl bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-11 w-24 rounded-xl bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-11 w-11 rounded-xl bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <div className="flex gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-5 w-28 bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>
      </div>

      {/* Calendar Grid Skeleton */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index}>
              <div className="text-center pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                <Skeleton className="h-5 w-20 mx-auto mb-2 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-8 w-10 mx-auto bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <ShiftCardSkeleton key={i} isDarkMode={isDarkMode} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
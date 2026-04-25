import React from 'react';

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', lines }) => {
  if (lines) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`skeleton h-4 rounded-lg animate-pulse bg-gray-200 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
          />
        ))}
      </div>
    );
  }
  return <div className={`skeleton animate-pulse bg-gray-200 ${className}`} />;
};

export const Loader: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
  </div>
);

export const CourseCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
    <Skeleton className="h-32 w-full rounded-xl" />
    <Skeleton className="h-4 w-3/4 rounded-lg" />
    <Skeleton className="h-3 w-1/2 rounded-lg" />
    <Skeleton className="h-2 w-full rounded-full" />
  </div>
);
);

export const Loader: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3">
    <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    <span className="text-sm text-slate-500">{message}</span>
  </div>
);
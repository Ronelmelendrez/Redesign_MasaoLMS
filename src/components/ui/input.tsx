import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  iconRight,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full h-10 rounded-xl border bg-white text-sm text-gray-800',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'transition-all duration-150',
            error ? 'border-red-300 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-400',
            icon ? 'pl-10' : 'pl-3',
            iconRight ? 'pr-10' : 'pr-3',
            className
          )}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {iconRight}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
import React from 'react';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  size?: 'sm' | 'md';
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-[#e8f3ec] text-[#1a5c2e]',
  success: 'bg-[#d4e8d9] text-[#246b37]',
  warning: 'bg-[#fdf6e3] text-[#c8991a]',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-[#b8dbc4] text-[#0f3d1e]',
  neutral: 'bg-slate-100 text-slate-600',
};

const dotColors: Record<BadgeVariant, string> = {
  primary: 'bg-[#1a5c2e]',
  success: 'bg-[#246b37]',
  warning: 'bg-[#c8991a]',
  danger: 'bg-red-500',
  info: 'bg-[#0f3d1e]',
  neutral: 'bg-slate-400',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  size = 'sm',
  dot = false,
}) => {
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${variantClasses[variant]} ${sizeClass}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
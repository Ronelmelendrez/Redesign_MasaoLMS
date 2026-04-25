import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium', {
  variants: {
    variant: {
      default: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
      info: 'bg-purple-100 text-purple-800',
      gray: 'bg-gray-100 text-gray-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, icon, children, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon}
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };

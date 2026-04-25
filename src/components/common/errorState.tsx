import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface ErrorStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  icon,
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
      {icon ?? <AlertCircle className="w-7 h-7" />}
    </div>
    <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
    {description && <p className="text-sm text-gray-600 mt-1 max-w-sm">{description}</p>}
    {action && (
      <Button onClick={action.onClick} variant="primary" size="md" className="mt-4">
        {action.label}
      </Button>
    )}
  </div>
);

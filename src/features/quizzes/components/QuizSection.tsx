import React from 'react';
import type { Quiz } from '@app-types';
import { QuizCard } from './QuizCard';

interface QuizSectionProps {
  title: string;
  items: Quiz[];
  icon: React.ReactNode;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ title, items, icon }) =>
  items.length > 0 ? (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
        {icon} {title}
      </h2>
      {items.map(q => (
        <QuizCard key={q.id} quiz={q} />
      ))}
    </div>
  ) : null;

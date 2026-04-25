import React from 'react';
import { CheckCircle, Clock, Star } from 'lucide-react';
import { QuizSection } from '../components';
import { useQuizFilters } from '../hooks';
import { mockQuizzes } from '@mock/data';

export const Quizzes: React.FC = () => {
  const { available, upcoming, completed } = useQuizFilters(mockQuizzes);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
          Quizzes
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">Take assessments and review your scores</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Available', count: available.length, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Upcoming', count: upcoming.length, color: 'bg-slate-50 text-slate-600' },
          { label: 'Completed', count: completed.length, color: 'bg-indigo-50 text-indigo-700' },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-2xl p-4 border border-slate-100`}>
            <p className="text-2xl font-bold">{s.count}</p>
            <p className="text-xs font-semibold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <QuizSection
        title="Available Now"
        icon={<CheckCircle className="w-4 h-4 text-emerald-500" />}
        items={available}
      />
      <QuizSection
        title="Upcoming"
        icon={<Clock className="w-4 h-4 text-slate-400" />}
        items={upcoming}
      />
      <QuizSection
        title="Completed"
        icon={<Star className="w-4 h-4 text-indigo-500" />}
        items={completed}
      />
    </div>
  );
};
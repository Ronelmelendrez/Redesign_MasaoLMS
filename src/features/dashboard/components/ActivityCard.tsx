import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card } from '@components/ui/card';
import type { Activity } from '@types/index';

// Map activity type to icon color background
const activityColors: Record<string, string> = {
  'assignment-submitted': 'bg-emerald-100 text-emerald-600',
  'quiz-completed': 'bg-blue-100 text-blue-600',
  'course-completed': 'bg-purple-100 text-purple-600',
  'comment-added': 'bg-orange-100 text-orange-600',
  'resource-added': 'bg-indigo-100 text-indigo-600',
};

// Icon components for each activity type
const activityIcons: Record<string, React.ReactNode> = {
  'check-circle': <span className="text-sm">✓</span>,
  'award': <span className="text-sm">🏆</span>,
  'star': <span className="text-sm">⭐</span>,
  'message': <span className="text-sm">💬</span>,
  'file': <span className="text-sm">📄</span>,
};

interface ActivityCardProps {
  activities: Activity[];
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activities }) => {
  return (
    <Card padding="none">
      <div className="p-4 border-b border-slate-50">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-600" /> Recent Activity
        </h2>
      </div>
      <div className="divide-y divide-slate-50">
        {activities.map(act => (
          <div key={act.id} className="px-4 py-3 flex items-start gap-3">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${activityColors[act.type] || 'bg-slate-100 text-slate-600'}`}
            >
              {activityIcons[act.icon] || '•'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700 line-clamp-1">{act.text}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {act.course} · {act.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

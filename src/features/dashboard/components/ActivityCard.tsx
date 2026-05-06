import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card } from '@components/ui/card';
import type { Activity } from '@types/index';

// Map activity type to icon color background
const activityColors: Record<string, string> = {
  'assignment-submitted': 'bg-[#e8f3ec]/60 text-[#1a5c2e]',
  'quiz-completed': 'bg-[#fdf6e3]/60 text-[#c8991a]',
  'course-completed': 'bg-[#d4e8d9]/60 text-[#246b37]',
  'comment-added': 'bg-[#e8f3ec]/60 text-[#1a5c2e]',
  'resource-added': 'bg-[#fdf6e3]/60 text-[#c8991a]',
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
    <Card padding="none" className="overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-50 bg-gradient-to-br from-[#fdf6e3] to-white">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-3" style={{ fontFamily: 'var(--font-display)' }}>
          <div className="w-10 h-10 rounded-lg bg-[#c8991a]/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#c8991a]" />
          </div>
          Recent Activity
        </h2>
      </div>

      {/* Activities */}
      <div className="divide-y divide-slate-50">
        {activities.map(act => (
          <div 
            key={act.id} 
            className="px-5 sm:px-6 py-4 hover:bg-[#fafaf7] transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold ${activityColors[act.type] || 'bg-slate-100 text-slate-600'}`}
              >
                {activityIcons[act.icon] || '•'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-[#1a5c2e] transition-colors">
                  {act.text}
                </p>
                <p className="text-xs text-slate-500 mt-1.5">
                  <span>{act.course}</span>
                  <span className="text-slate-400 mx-1.5">·</span>
                  <span className="text-slate-400">{act.time}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 sm:px-6 py-3 border-t border-slate-50 bg-[#fafaf7]/50">
        <button className="w-full text-center text-xs font-semibold text-[#1a5c2e] hover:text-[#0f3d1e] transition-colors py-1">
          View all activity
        </button>
      </div>
    </Card>
  );
};

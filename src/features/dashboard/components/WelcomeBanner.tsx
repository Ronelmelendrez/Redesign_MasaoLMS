import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { User } from '@types/index';

interface WelcomeBannerProps {
  user: User;
  greeting: string;
  pendingAssignments: number;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  user,
  greeting,
  pendingAssignments,
}) => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 p-6 sm:p-8 text-white">
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4" />
    <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p className="text-indigo-200 text-sm font-medium mb-1">{greeting} 👋</p>
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
          {user.name}
        </h2>
        <p className="text-indigo-200 text-sm mt-1">
          {user.program} · {user.year}
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:text-right">
        <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2.5 backdrop-blur">
          <Calendar className="w-4 h-4 text-indigo-200" />
          <div>
            <p className="text-xs text-indigo-200 font-medium">Next Class</p>
            <p className="text-sm font-bold text-white">CS301 · Mon 9:00 AM</p>
          </div>
        </div>
        {pendingAssignments > 0 && (
          <div className="flex items-center gap-2 bg-amber-400/30 rounded-xl px-4 py-2.5 backdrop-blur">
            <Clock className="w-4 h-4 text-amber-200" />
            <p className="text-sm font-semibold text-white">
              {pendingAssignments} assignments due soon
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

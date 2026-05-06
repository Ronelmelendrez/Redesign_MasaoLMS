import React from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import type { User } from '@app-types';

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
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f3d1e] via-[#1a5c2e] to-[#246b37] p-8 sm:p-10 text-white">
    {/* Background patterns */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8991a]/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
    <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-white/5 rounded-full translate-y-1/3 blur-3xl" />
    
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      {/* Left side */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-[#c8991a]" />
          <p className="text-sm font-bold uppercase tracking-widest text-[#b8dbc4]">{greeting}</p>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
          {user.name}
        </h2>
        <p className="text-base text-white/75 font-medium">
          {user.program} · {user.year}
        </p>
      </div>

      {/* Right side - Info cards */}
      <div className="flex flex-col gap-3 w-full sm:w-auto">
        {/* Next class */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-3.5 border border-white/15">
          <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-[#c8991a]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Next Class</p>
            <p className="text-sm font-bold text-white mt-0.5">CS301 · Mon 9:00 AM</p>
          </div>
        </div>

        {/* Pending assignments */}
        {pendingAssignments > 0 && (
          <div className="flex items-center gap-3 bg-[#c8991a]/20 backdrop-blur-xl rounded-2xl px-5 py-3.5 border border-[#c8991a]/30">
            <div className="w-10 h-10 rounded-lg bg-[#c8991a]/30 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-[#f0c842]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#f0c842]/80">Due Soon</p>
              <p className="text-sm font-bold text-white mt-0.5">{pendingAssignments} assignment{pendingAssignments > 1 ? 's' : ''}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

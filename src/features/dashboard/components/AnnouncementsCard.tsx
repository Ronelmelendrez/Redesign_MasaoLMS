import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowRight } from 'lucide-react';
import { Card } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import type { Announcement } from '@types/index';

interface AnnouncementsCardProps {
  announcements: Announcement[];
}

export const AnnouncementsCard: React.FC<AnnouncementsCardProps> = ({ announcements }) => {
  const navigate = useNavigate();

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-50 flex items-center justify-between bg-gradient-to-br from-[#e8f3ec] to-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1a5c2e]/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#1a5c2e]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>Announcements</h2>
            <p className="text-xs text-slate-500 mt-0.5">{announcements.length} updates</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/announcements')}
          className="text-[#1a5c2e] hover:text-[#0f3d1e] hover:bg-[#e8f3ec]"
        >
          See all
        </Button>
      </div>

      {/* Announcements */}
      <div className="divide-y divide-slate-50">
        {announcements.slice(0, 3).map(a => (
          <div
            key={a.id}
            className="px-5 sm:px-6 py-4 hover:bg-[#fafaf7] transition-colors cursor-pointer group"
            onClick={() => navigate('/announcements')}
          >
            <div className="flex items-start gap-3.5">
              <img
                src={a.authorAvatar}
                alt={a.author}
                className="w-9 h-9 rounded-full bg-[#e8f3ec] flex-shrink-0 mt-0.5 border border-[#1a5c2e]/5"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {a.pinned && (
                    <span className="text-[10px] bg-[#c8991a]/10 text-[#c8991a] font-bold px-1.5 py-0.5 rounded">
                      PINNED
                    </span>
                  )}
                  <Badge
                    variant={
                      a.category === 'Exam' ? 'danger' : a.category === 'System' ? 'warning' : 'info'
                    }
                    size="sm"
                  >
                    {a.category}
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-slate-900 mt-2 line-clamp-1 group-hover:text-[#1a5c2e] transition-colors">
                  {a.title}
                </p>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{a.body}</p>
                <p className="text-xs text-slate-400 mt-2">by {a.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 sm:px-6 py-3 border-t border-slate-50 bg-[#fafaf7]/50">
        <button 
          onClick={() => navigate('/announcements')}
          className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-[#1a5c2e] hover:text-[#0f3d1e] transition-colors py-1"
        >
          View all announcements
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
};

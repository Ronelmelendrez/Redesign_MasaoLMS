import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
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
    <Card padding="none">
      <div className="p-4 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-800">Announcements</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/announcements')}>
          See all
        </Button>
      </div>
      <div className="divide-y divide-slate-50">
        {announcements.slice(0, 3).map(a => (
          <div
            key={a.id}
            className="px-4 py-3 hover:bg-slate-50/50 transition-colors cursor-pointer"
            onClick={() => navigate('/announcements')}
          >
            <div className="flex items-start gap-2.5">
              <img
                src={a.authorAvatar}
                alt={a.author}
                className="w-7 h-7 rounded-full bg-indigo-100 flex-shrink-0 mt-0.5"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {a.pinned && (
                    <span className="text-[10px] bg-indigo-100 text-indigo-600 font-bold px-1.5 py-0.5 rounded">
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
                <p className="text-sm font-semibold text-slate-800 mt-1 line-clamp-1">{a.title}</p>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{a.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

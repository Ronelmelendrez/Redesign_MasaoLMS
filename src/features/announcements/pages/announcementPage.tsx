import React, { useState } from 'react';
import { Bell, Pin, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { Card } from '@components/ui/card';
import { mockAnnouncements } from '@mock/data';

const categoryVariants: Record<string, 'danger' | 'warning' | 'info' | 'success' | 'neutral'> = {
  Exam: 'danger', Schedule: 'warning', System: 'warning', Project: 'info', General: 'neutral',
};

export const Announcements: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(mockAnnouncements[0]?.id);

  const pinned = mockAnnouncements.filter(a => a.pinned);
  const regular = mockAnnouncements.filter(a => !a.pinned);

  const AnnouncementCard: React.FC<{ ann: typeof mockAnnouncements[0] }> = ({ ann }) => {
    const isExp = expanded === ann.id;
    return (
      <Card padding="none" key={ann.id}>
        <button
          className="w-full text-left p-4 hover:bg-slate-50/60 transition-colors"
          onClick={() => setExpanded(isExp ? null : ann.id)}
        >
          <div className="flex items-start gap-3">
            <img src={ann.authorAvatar} alt={ann.author} className="w-9 h-9 rounded-full bg-indigo-100 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {ann.pinned && (
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                    <Pin className="w-2.5 h-2.5" /> PINNED
                  </span>
                )}
                <Badge variant={categoryVariants[ann.category] ?? 'neutral'} size="sm">{ann.category}</Badge>
                <span className="text-[10px] font-semibold text-slate-400 ml-auto">{ann.courseCode}</span>
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{ann.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{ann.body}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400">{ann.author} · {new Date(ann.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                {isExp ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </div>
            </div>
          </div>
        </button>
        {isExp && (
          <div className="px-4 pb-4 border-t border-slate-50">
            <p className="text-sm text-slate-600 leading-relaxed pt-3">{ann.body}</p>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Announcements</h1>
          <p className="text-sm text-slate-500 mt-0.5">{mockAnnouncements.length} total announcements</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <Bell className="w-5 h-5" />
        </div>
      </div>

      {pinned.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">📌 Pinned</h2>
          {pinned.map(a => <AnnouncementCard key={a.id} ann={a} />)}
        </div>
      )}
      {regular.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent</h2>
          {regular.map(a => <AnnouncementCard key={a.id} ann={a} />)}
        </div>
      )}
    </div>
  );
};
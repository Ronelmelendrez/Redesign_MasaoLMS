import React from 'react';
import { Clock, CheckCircle, Lock, HelpCircle, Star, ChevronRight } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { mockQuizzes } from '../../mock/data';

export const Quizzes: React.FC = () => {
  const available = mockQuizzes.filter(q => q.status === 'available');
  const upcoming = mockQuizzes.filter(q => q.status === 'upcoming');
  const completed = mockQuizzes.filter(q => q.status === 'completed');

  const Section: React.FC<{ title: string; items: typeof mockQuizzes; icon: React.ReactNode }> = ({ title, items, icon }) => (
    items.length > 0 ? (
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">{icon} {title}</h2>
        {items.map(q => (
          <Card key={q.id} padding="none" hover={q.status !== 'upcoming'}>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{q.courseCode}</span>
                    <Badge
                      variant={q.status === 'available' ? 'success' : q.status === 'upcoming' ? 'neutral' : 'primary'}
                      size="sm" dot
                    >
                      {q.status === 'available' ? 'Open Now' : q.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">{q.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{q.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {q.duration} min</span>
                    <span className="flex items-center gap-1"><HelpCircle className="w-3 h-3" /> {q.questions} questions</span>
                    <span>Attempt {q.attempts}/{q.maxAttempts}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  {q.score !== null && (
                    <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl">
                      <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                      <span className="text-sm font-bold">{q.score}%</span>
                    </div>
                  )}
                  {q.status === 'available' && (
                    <Button size="sm" iconRight={<ChevronRight className="w-3.5 h-3.5" />}>Start Quiz</Button>
                  )}
                  {q.status === 'completed' && (
                    <Button size="sm" variant="outline">Review</Button>
                  )}
                  {q.status === 'upcoming' && (
                    <Button size="sm" variant="ghost" icon={<Lock className="w-3.5 h-3.5" />} disabled>Locked</Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    ) : null
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Quizzes</h1>
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

      <Section title="Available Now" icon={<CheckCircle className="w-4 h-4 text-emerald-500" />} items={available} />
      <Section title="Upcoming" icon={<Clock className="w-4 h-4 text-slate-400" />} items={upcoming} />
      <Section title="Completed" icon={<Star className="w-4 h-4 text-indigo-500" />} items={completed} />
    </div>
  );
};
import React from 'react';
import { Clock, HelpCircle, Star, ChevronRight, Lock } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import type { Quiz } from '@types/index';

interface QuizCardProps {
  quiz: Quiz;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz: q }) => (
  <Card key={q.id} padding="none" hover={q.status !== 'upcoming'}>
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
              {q.courseCode}
            </span>
            <Badge
              variant={q.status === 'available' ? 'success' : q.status === 'upcoming' ? 'neutral' : 'primary'}
              size="sm"
              dot
            >
              {q.status === 'available' ? 'Open Now' : q.status === 'upcoming' ? 'Upcoming' : 'Completed'}
            </Badge>
          </div>
          <h3 className="font-bold text-slate-800 text-sm">{q.title}</h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{q.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400 flex-wrap">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {q.duration} min
            </span>
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3 h-3" /> {q.questions} questions
            </span>
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
            <Button size="sm" iconRight={<ChevronRight className="w-3.5 h-3.5" />}>
              Start Quiz
            </Button>
          )}
          {q.status === 'completed' && <Button size="sm" variant="outline">Review</Button>}
          {q.status === 'upcoming' && (
            <Button size="sm" variant="ghost" icon={<Lock className="w-3.5 h-3.5" />} disabled>
              Locked
            </Button>
          )}
        </div>
      </div>
    </div>
  </Card>
);

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { Card, CardHeader } from '@components/ui/card';
import type { Course } from '@app-types';

interface CompletedCoursesProps {
  courses: Course[];
}

export const CompletedCourses: React.FC<CompletedCoursesProps> = ({ courses }) => {
  const completed = courses.filter(c => c.progress >= 80);

  return (
    <Card>
      <CardHeader title="Completed Courses" icon={<CheckCircle className="w-4 h-4" />} />
      {completed.length === 0 ? (
        <p className="text-sm text-slate-500">No completed courses yet.</p>
      ) : (
        <div className="space-y-2.5">
          {completed.map(course => (
            <div key={course.id} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${course.color} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{course.title}</p>
                <p className="text-xs text-slate-500 truncate">{course.code}</p>
              </div>
              <Badge variant="success" size="sm">Completed</Badge>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

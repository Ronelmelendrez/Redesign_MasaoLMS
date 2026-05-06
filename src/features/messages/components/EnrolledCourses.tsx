import React from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardHeader } from '@components/ui/card';
import type { Course } from '@app-types';

interface EnrolledCoursesProps {
  courses: Course[];
}

export const EnrolledCourses: React.FC<EnrolledCoursesProps> = ({ courses }) => (
  <Card>
    <CardHeader title="Enrolled Courses" icon={<BookOpen className="w-4 h-4" />} />
    <div className="space-y-2.5">
      {courses.map(c => (
        <div key={c.id} className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${c.color} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{c.code}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${c.color}`} style={{ width: `${c.progress}%` }} />
              </div>
              <span className="text-[10px] text-slate-500 font-semibold">{c.progress}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

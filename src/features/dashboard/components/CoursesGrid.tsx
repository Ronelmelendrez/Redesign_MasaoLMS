import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@components/ui/button';
import { CourseCardSkeleton } from '@components/common/loader';
import type { Course } from '@app-types';

interface CoursesGridProps {
  courses: Course[];
  loading: boolean;
}

export const CoursesGrid: React.FC<CoursesGridProps> = ({ courses, loading }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>My Courses</h2>
          <p className="text-sm text-slate-500 mt-1">Continue learning where you left off</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/courses')}
          className="text-[#1a5c2e] hover:text-[#0f3d1e] hover:bg-[#e8f3ec]"
          iconRight={<ChevronRight className="w-4 h-4" />}
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)
          : courses.map(course => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="group relative bg-white rounded-xl border border-slate-100/60 shadow-[0_2px_8px_rgba(26,92,46,0.06)] overflow-hidden hover:shadow-[0_10px_20px_rgba(26,92,46,0.12)] hover:border-[#246b37]/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4 p-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-white bg-[#1a5c2e] px-2 py-0.5 rounded-md uppercase tracking-wide">
                        {course.code}
                      </span>
                      <span className="text-xs text-slate-500 font-medium truncate">{course.instructor}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 mt-1 line-clamp-1">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 h-1.5 bg-[#e8f3ec] rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${course.color} transition-all duration-500`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#1a5c2e]">{course.progress}%</span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-500 flex-shrink-0">
                    <p className="flex items-center gap-1.5 font-medium justify-end">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {course.nextClass}
                    </p>
                    <p className="mt-1 font-medium">{course.modules} modules</p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a5c2e]/0 to-[#1a5c2e]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
              </div>
            ))}
      </div>
    </div>
  );
};

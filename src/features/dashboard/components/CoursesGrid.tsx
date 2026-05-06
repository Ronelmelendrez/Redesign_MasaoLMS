import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@components/ui/button';
import { CourseCardSkeleton } from '@components/common/loader';
import type { Course } from '@types/index';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)
          : courses.map(course => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="group bg-white rounded-2xl border border-slate-100/60 shadow-[0_2px_8px_rgba(26,92,46,0.06)] overflow-hidden hover:shadow-[0_12px_24px_rgba(26,92,46,0.15)] hover:border-[#246b37]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Color Bar */}
                <div className={`h-3 bg-gradient-to-r ${course.color}`} />
                
                <div className="p-5 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <span className="text-xs font-bold text-white bg-[#1a5c2e] px-2.5 py-1 rounded-lg uppercase tracking-wide">
                        {course.code}
                      </span>
                      <h3 className="text-base font-semibold text-slate-900 mt-2.5 line-clamp-2 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-1.5">{course.instructor}</p>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-2.5 mb-4">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Progress</span>
                      <span className="text-sm font-bold text-[#1a5c2e]">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-[#e8f3ec] rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${course.color} transition-all duration-500`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {course.nextClass}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">{course.modules} modules</p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a5c2e]/0 to-[#1a5c2e]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              </div>
            ))}
      </div>
    </div>
  );
};

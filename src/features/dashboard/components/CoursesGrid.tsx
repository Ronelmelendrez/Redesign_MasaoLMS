import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">My Courses</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/courses')}
          iconRight={<ChevronRight className="w-3.5 h-3.5" />}
        >
          View all
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)
          : courses.map(course => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        {course.code}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-800 mt-1.5 line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-semibold text-slate-700">{course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill bg-gradient-to-r ${course.color}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {course.nextClass}
                    </p>
                    <span className="text-xs text-slate-400">{course.modules} modules</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

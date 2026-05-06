import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Users, Clock, ChevronRight, Filter } from 'lucide-react';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { mockCourses } from '@mock/data';

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = mockCourses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    (c.code ?? '').toLowerCase().includes(search.toLowerCase()) ||
    c.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>My Courses</h1>
          <p className="text-sm text-slate-500 mt-0.5">{mockCourses.length} enrolled courses this semester</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search courses…"
            icon={<Search className="w-4 h-4" />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-60"
          />
          <Button variant="outline" size="md" icon={<Filter className="w-4 h-4" />}>Filter</Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(course => (
          <div
            key={course.id}
            onClick={() => navigate(`/courses/${course.id}`)}
            className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
          >
            {/* Color header */}
            <div className={`h-24 bg-gradient-to-br ${course.color} relative overflow-hidden flex items-end p-4`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="relative">
                <span className="text-xs font-bold text-white/80 bg-white/20 backdrop-blur px-2 py-0.5 rounded-md">{course.code}</span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">{course.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <img src={course.instructorAvatar} alt={course.instructor} className="w-5 h-5 rounded-full bg-indigo-100" />
                    <span className="text-xs text-slate-500">{course.instructor}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
              </div>

              {/* Progress */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-bold text-slate-700">{course.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill bg-gradient-to-r ${course.color}`} style={{ width: `${course.progress}%` }} />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(course.tags ?? []).map(tag => (
                  <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
                ))}
              </div>

              {/* Footer stats */}
              <div className="flex items-center gap-4 pt-3 border-t border-slate-50 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.students} students</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.modules} modules</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.credits} units</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No courses match your search</p>
        </div>
      )}
    </div>
  );
};
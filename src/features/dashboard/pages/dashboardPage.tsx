import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, ClipboardList, Star, TrendingUp,
  Upload, Mail, Bell, CheckCircle, Calendar, ChevronRight, Clock
} from 'lucide-react';
import { Card } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { CourseCardSkeleton } from '@components/common/loader';
import { mockUser, mockCourses, mockActivity, mockAnnouncements, mockAssignments } from '@mock/data';

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; sub?: string; color: string }> = ({
  icon, label, value, sub, color
}) => (
  <div className={`bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center flex-shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      {sub && <p className="text-xs text-emerald-600 font-semibold mt-0.5">{sub}</p>}
    </div>
  </div>
);

const activityIcons: Record<string, React.ReactNode> = {
  upload: <Upload className="w-4 h-4" />,
  star: <Star className="w-4 h-4" />,
  mail: <Mail className="w-4 h-4" />,
  megaphone: <Bell className="w-4 h-4" />,
  'check-circle': <CheckCircle className="w-4 h-4" />,
};

const activityColors: Record<string, string> = {
  submission: 'bg-indigo-50 text-indigo-600',
  grade: 'bg-amber-50 text-amber-600',
  message: 'bg-cyan-50 text-cyan-600',
  announcement: 'bg-purple-50 text-purple-600',
  module: 'bg-emerald-50 text-emerald-600',
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending').length;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 p-6 sm:p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-indigo-200 text-sm font-medium mb-1">{greeting} 👋</p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
              {mockUser.name}
            </h2>
            <p className="text-indigo-200 text-sm mt-1">{mockUser.program} · {mockUser.year}</p>
          </div>
          <div className="flex flex-col gap-2 sm:text-right">
            <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2.5 backdrop-blur">
              <Calendar className="w-4 h-4 text-indigo-200" />
              <div>
                <p className="text-xs text-indigo-200 font-medium">Next Class</p>
                <p className="text-sm font-bold text-white">CS301 · Mon 9:00 AM</p>
              </div>
            </div>
            {pendingAssignments > 0 && (
              <div className="flex items-center gap-2 bg-amber-400/30 rounded-xl px-4 py-2.5 backdrop-blur">
                <Clock className="w-4 h-4 text-amber-200" />
                <p className="text-sm font-semibold text-white">{pendingAssignments} assignments due soon</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<BookOpen className="w-5 h-5 text-indigo-600" />} label="Active Courses" value="4" color="bg-indigo-50" />
        <StatCard icon={<ClipboardList className="w-5 h-5 text-amber-600" />} label="Pending Tasks" value={String(pendingAssignments)} sub="2 due this week" color="bg-amber-50" />
        <StatCard icon={<Star className="w-5 h-5 text-emerald-600" />} label="Avg. Grade" value="88%" sub="↑ 3% this month" color="bg-emerald-50" />
        <StatCard icon={<TrendingUp className="w-5 h-5 text-purple-600" />} label="Completion" value="68%" color="bg-purple-50" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Courses */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">My Courses</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/courses')} iconRight={<ChevronRight className="w-3.5 h-3.5" />}>
              View all
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)
              : mockCourses.map(course => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{course.code}</span>
                        <h3 className="text-sm font-semibold text-slate-800 mt-1.5 line-clamp-1">{course.title}</h3>
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

        {/* Right column */}
        <div className="space-y-4">
          {/* Announcements */}
          <Card padding="none">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold text-slate-800">Announcements</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/announcements')}>See all</Button>
            </div>
            <div className="divide-y divide-slate-50">
              {mockAnnouncements.slice(0, 3).map(a => (
                <div key={a.id} className="px-4 py-3 hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => navigate('/announcements')}>
                  <div className="flex items-start gap-2.5">
                    <img src={a.authorAvatar} alt={a.author} className="w-7 h-7 rounded-full bg-indigo-100 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {a.pinned && <span className="text-[10px] bg-indigo-100 text-indigo-600 font-bold px-1.5 py-0.5 rounded">PINNED</span>}
                        <Badge variant={a.category === 'Exam' ? 'danger' : a.category === 'System' ? 'warning' : 'info'} size="sm">
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

          {/* Recent Activity */}
          <Card padding="none">
            <div className="p-4 border-b border-slate-50">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" /> Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-slate-50">
              {mockActivity.map(act => (
                <div key={act.id} className="px-4 py-3 flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${activityColors[act.type]}`}>
                    {activityIcons[act.icon]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700 line-clamp-1">{act.text}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{act.course} · {act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
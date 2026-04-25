import React from 'react';
import { BookOpen, ClipboardList, Star, TrendingUp } from 'lucide-react';
import { StatCard, WelcomeBanner, CoursesGrid, AnnouncementsCard, ActivityCard } from '../components';
import { useDashboardData } from '../hooks';
import { mockUser, mockCourses, mockActivity, mockAnnouncements, mockAssignments } from '@mock/data';

export const Dashboard: React.FC = () => {
  const { loading, greeting } = useDashboardData();
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner user={mockUser} greeting={greeting} pendingAssignments={pendingAssignments} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<BookOpen className="w-5 h-5 text-indigo-600" />}
          label="Active Courses"
          value="4"
          color="bg-indigo-50"
        />
        <StatCard
          icon={<ClipboardList className="w-5 h-5 text-amber-600" />}
          label="Pending Tasks"
          value={String(pendingAssignments)}
          sub="2 due this week"
          color="bg-amber-50"
        />
        <StatCard
          icon={<Star className="w-5 h-5 text-emerald-600" />}
          label="Avg. Grade"
          value="88%"
          sub="↑ 3% this month"
          color="bg-emerald-50"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
          label="Completion"
          value="68%"
          color="bg-purple-50"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Courses */}
        <div className="xl:col-span-2">
          <CoursesGrid courses={mockCourses} loading={loading} />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <AnnouncementsCard announcements={mockAnnouncements} />
          <ActivityCard activities={mockActivity} />
        </div>
      </div>
    </div>
  );
};
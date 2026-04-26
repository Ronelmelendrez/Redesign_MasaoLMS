import React from 'react';
import { BookOpen, ClipboardList, TrendingUp, Target } from 'lucide-react';
import { StatCard, WelcomeBanner, CoursesGrid, AnnouncementsCard, ActivityCard } from '../components';
import { useDashboardData } from '../hooks';
import { mockUser, mockCourses, mockActivity, mockAnnouncements, mockAssignments } from '@mock/data';

export const Dashboard: React.FC = () => {
  const { loading, greeting } = useDashboardData();
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <WelcomeBanner user={mockUser} greeting={greeting} pendingAssignments={pendingAssignments} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<BookOpen className="w-6 h-6 text-[#1a5c2e]" />}
          label="Active Courses"
          value="4"
          color="bg-[#e8f3ec]"
        />
        <StatCard
          icon={<ClipboardList className="w-6 h-6 text-[#c8991a]" />}
          label="Pending Tasks"
          value={String(pendingAssignments)}
          sub="2 this week"
          color="bg-[#fdf6e3]"
        />
        <StatCard
          icon={<Target className="w-6 h-6 text-[#246b37]" />}
          label="Avg. Grade"
          value="88%"
          sub="3% improvement"
          color="bg-[#d4e8d9]"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-[#1a5c2e]" />}
          label="Completion"
          value="68%"
          color="bg-[#e8f3ec]"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Courses */}
        <div className="xl:col-span-2">
          <CoursesGrid courses={mockCourses} loading={loading} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <AnnouncementsCard announcements={mockAnnouncements} />
          <ActivityCard activities={mockActivity} />
        </div>
      </div>
    </div>
  );
};
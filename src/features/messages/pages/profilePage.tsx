import React from 'react';
import { BookOpen, Star, Award, TrendingUp } from 'lucide-react';
import {
  ProfileHeader,
  StatsGrid,
  AccountInfo,
  EnrolledCourses,
} from '../components';
import { mockUser, mockCourses, mockAssignments } from '@mock/data';

export const Profile: React.FC = () => {
  const avgGrade = 88;
  const completedAssignments = mockAssignments.filter(a => a.status === 'graded').length;

  const stats = [
    {
      icon: <BookOpen className="w-4 h-4" />,
      label: 'Courses',
      value: mockCourses.length,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      icon: <Star className="w-4 h-4" />,
      label: 'Avg Grade',
      value: `${avgGrade}%`,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: <Award className="w-4 h-4" />,
      label: 'Completed',
      value: completedAssignments,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: 'Progress',
      value: '68%',
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-display)' }}>
          Profile
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account and preferences</p>
      </div>

      <ProfileHeader user={mockUser} />

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <AccountInfo user={mockUser} />
        <EnrolledCourses courses={mockCourses} />
      </div>
    </div>
  );
};
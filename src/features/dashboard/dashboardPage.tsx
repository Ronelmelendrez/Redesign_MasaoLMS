import React, { useState } from 'react';
import { BookOpen, ClipboardList, HelpCircle, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockCourses, mockAssignments, mockAnnouncements } from '../../mock/data';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [greeting] = useState(
    new Date().getHours() < 12
      ? 'Good Morning'
      : new Date().getHours() < 18
        ? 'Good Afternoon'
        : 'Good Evening'
  );

  const recentCourses = mockCourses.slice(0, 4);
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending').slice(0, 3);
  const highPriorityAnnouncements = mockAnnouncements.filter(a => a.priority === 'high').slice(0, 3);

  const stats = [
    {
      label: 'Active Courses',
      value: mockCourses.length,
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Pending Work',
      value: mockAssignments.filter(a => a.status === 'pending').length,
      icon: ClipboardList,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      label: 'Average Progress',
      value: Math.round(mockCourses.reduce((a, c) => a + c.progress, 0) / mockCourses.length) + '%',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Announcements',
      value: highPriorityAnnouncements.length,
      icon: HelpCircle,
      color: 'bg-red-100 text-red-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{greeting}, Alex!</h1>
        <p className="text-gray-600">Welcome back to MASAO. Here's your learning summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} padding="md" hover>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Active Courses</h2>
            <Button onClick={() => navigate('/courses')} variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentCourses.map((course) => (
              <Card
                key={course.id}
                padding="lg"
                hover
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="space-y-3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{course.instructor}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <Badge variant="info">{course.modules} modules</Badge>
                    <Badge variant="gray">{course.students} students</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Assignments */}
          <Card padding="lg">
            <CardHeader title="Pending Work" icon={<ClipboardList className="w-4 h-4" />} />
            <div className="space-y-3">
              {pendingAssignments.length > 0 ? (
                pendingAssignments.map((assignment) => (
                  <div key={assignment.id} className="pb-3 border-b border-gray-200 last:border-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{assignment.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{assignment.course}</p>
                      </div>
                      <Badge variant="warning">Due {assignment.dueDate}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600 text-center py-4">No pending assignments</p>
              )}
              <Button onClick={() => navigate('/assignments')} fullWidth variant="primary" size="sm">
                View All
              </Button>
            </div>
          </Card>

          {/* Announcements */}
          <Card padding="lg">
            <CardHeader title="Latest Announcements" icon={<Calendar className="w-4 h-4" />} />
            <div className="space-y-3">
              {highPriorityAnnouncements.length > 0 ? (
                highPriorityAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="pb-3 border-b border-gray-200 last:border-0">
                    <div className="flex items-start gap-2">
                      <Badge variant="danger" className="mt-0.5 flex-shrink-0">
                        High
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm">{announcement.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600 text-center py-4">No announcements</p>
              )}
              <Button onClick={() => navigate('/announcements')} fullWidth variant="primary" size="sm">
                View All
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

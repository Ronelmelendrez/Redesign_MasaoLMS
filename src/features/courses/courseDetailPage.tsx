import React, { useState } from 'react';
import { ArrowLeft, Play, FileText, BarChart3, MessageSquare, Trophy } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Loader } from '../../components/common/loader';
import { mockCourses, mockModules } from '../../mock/data';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../../utils/cn';

type TabType = 'overview' | 'modules' | 'assignments' | 'quizzes' | 'discussion' | 'chat';

export const CourseDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(false);

  const course = mockCourses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Course not found</p>
        <Button onClick={() => navigate('/courses')} variant="primary" className="mt-4">
          Back to Courses
        </Button>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <FileText className="w-4 h-4" /> },
    { id: 'modules', label: 'Modules', icon: <Play className="w-4 h-4" /> },
    { id: 'assignments', label: 'Assignments', icon: <Trophy className="w-4 h-4" /> },
    { id: 'quizzes', label: 'Quizzes', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'discussion', label: 'Discussion', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'chat', label: 'Chat', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/courses')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600 mt-1">Taught by {course.instructor}</p>
        </div>
      </div>

      {/* Hero Image */}
      <Card padding="none" className="overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-64 object-cover" />
      </Card>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card padding="md">
          <p className="text-sm text-gray-600">Progress</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{course.progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </Card>
        <Card padding="md">
          <p className="text-sm text-gray-600">Modules</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{course.modules}</p>
        </Card>
        <Card padding="md">
          <p className="text-sm text-gray-600">Students</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{course.students}</p>
        </Card>
        <Card padding="md">
          <p className="text-sm text-gray-600">Category</p>
          <p className="text-sm font-bold text-gray-900 mt-2">{course.category}</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {loading ? (
        <Loader />
      ) : (
        <>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card padding="lg">
                  <CardHeader title="About This Course" />
                  <p className="text-gray-700 leading-relaxed">{course.description}</p>
                </Card>

                <Card padding="lg">
                  <CardHeader title="What You'll Learn" />
                  <ul className="space-y-3">
                    {[
                      'Master core algorithms and data structures',
                      'Implement efficient solutions to real-world problems',
                      'Understand complexity analysis and optimization',
                      'Build professional-grade applications',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="text-blue-600 font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <div className="space-y-4">
                <Card padding="lg">
                  <CardHeader title="Course Info" />
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Instructor</p>
                      <p className="font-semibold text-gray-900 mt-1">{course.instructor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <Badge variant="info" className="mt-1">
                        {course.category}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Modules</p>
                      <p className="font-semibold text-gray-900 mt-1">{course.modules} modules</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Enrolled Students</p>
                      <p className="font-semibold text-gray-900 mt-1">{course.students} students</p>
                    </div>
                  </div>
                </Card>

                <Button fullWidth variant="primary" size="lg">
                  Continue Learning
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="space-y-4">
              {mockModules.map((module) => (
                <Card key={module.id} padding="lg" hover>
                  <CardHeader
                    title={module.title}
                    subtitle={`${module.completed} of ${module.lessons.length} lessons completed`}
                    icon={<Play className="w-4 h-4" />}
                  />
                  <div className="mt-4">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">
                          {Math.round((module.completed / module.lessons.length) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(module.completed / module.lessons.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
                          <input type="checkbox" checked={lesson.completed} readOnly className="w-4 h-4" />
                          <span className="flex-1 text-gray-700">{lesson.title}</span>
                          <Badge variant="gray" className="text-xs">
                            {lesson.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'assignments' && (
            <Card padding="lg">
              <p className="text-gray-600">No assignments available for this course yet.</p>
            </Card>
          )}

          {activeTab === 'quizzes' && (
            <Card padding="lg">
              <p className="text-gray-600">No quizzes available for this course yet.</p>
            </Card>
          )}

          {activeTab === 'discussion' && (
            <Card padding="lg">
              <p className="text-gray-600">Discussion forum coming soon.</p>
            </Card>
          )}

          {activeTab === 'chat' && (
            <Card padding="lg">
              <p className="text-gray-600">Chat room coming soon.</p>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

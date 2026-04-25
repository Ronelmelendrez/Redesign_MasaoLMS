import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Users, BookOpen, Clock, Calendar,
  Video, FileText, CheckCircle, Lock, ChevronDown, ChevronRight,
  MessageSquare, ClipboardList, HelpCircle
} from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { mockCourses, mockModules, mockAssignments } from '@mock/data';

type Tab = 'overview' | 'modules' | 'assignments' | 'quizzes' | 'discussion' | 'chat';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'modules', label: 'Modules', icon: <FileText className="w-3.5 h-3.5" /> },
  { id: 'assignments', label: 'Assignments', icon: <ClipboardList className="w-3.5 h-3.5" /> },
  { id: 'quizzes', label: 'Quizzes', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  { id: 'discussion', label: 'Discussion', icon: <MessageSquare className="w-3.5 h-3.5" /> },
  { id: 'chat', label: 'Chat Room', icon: <MessageSquare className="w-3.5 h-3.5" /> },
];

const moduleItemIcons: Record<string, React.ReactNode> = {
  video: <Video className="w-3.5 h-3.5" />,
  reading: <FileText className="w-3.5 h-3.5" />,
  quiz: <HelpCircle className="w-3.5 h-3.5" />,
  assignment: <ClipboardList className="w-3.5 h-3.5" />,
};

export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [expandedModules, setExpandedModules] = useState<string[]>(['1', '2']);

  const course = mockCourses.find(c => c.id === id);
  if (!course) return (
    <div className="text-center py-20">
      <p className="text-slate-500">Course not found</p>
      <Button variant="ghost" onClick={() => navigate('/courses')} className="mt-3">← Back to Courses</Button>
    </div>
  );

  const courseAssignments = mockAssignments.filter(a => a.courseId === id);
  const toggleModule = (mid: string) =>
    setExpandedModules(prev => prev.includes(mid) ? prev.filter(m => m !== mid) : [...prev, mid]);

  return (
    <div className="space-y-6">
      {/* Back */}
      <button onClick={() => navigate('/courses')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </button>

      {/* Course Header */}
      <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${course.color} text-white`}>
        <div className="relative px-6 py-8 bg-gradient-to-t from-black/30 to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold bg-white/20 backdrop-blur px-2.5 py-1 rounded-lg">{course.code}</span>
              <h1 className="text-2xl sm:text-3xl font-bold mt-3" style={{ fontFamily: 'Syne, sans-serif' }}>{course.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <img src={course.instructorAvatar} alt={course.instructor} className="w-7 h-7 rounded-full border-2 border-white/30" />
                <span className="text-white/80 text-sm">{course.instructor}</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-4 text-sm text-white/80">
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {course.students} students</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {course.modules} modules</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {course.credits} credits</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {course.schedule}</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-4 min-w-[150px]">
              <p className="text-white/70 text-xs font-medium mb-1">Your Progress</p>
              <p className="text-3xl font-bold text-white">{course.progress}%</p>
              <div className="mt-2 h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-thin border-b border-slate-100">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-150 flex-shrink-0
                ${activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">About this Course</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{course.description}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Schedule', value: course.schedule, icon: <Calendar className="w-4 h-4 text-indigo-500" /> },
                  { label: 'Students', value: `${course.students} enrolled`, icon: <Users className="w-4 h-4 text-indigo-500" /> },
                  { label: 'Credits', value: `${course.credits} units`, icon: <BookOpen className="w-4 h-4 text-indigo-500" /> },
                  { label: 'Next Class', value: course.nextClass, icon: <Clock className="w-4 h-4 text-indigo-500" /> },
                ].map(info => (
                  <div key={info.label} className="bg-slate-50 rounded-xl p-3.5">
                    <div className="mb-1.5">{info.icon}</div>
                    <p className="text-xs text-slate-500 font-medium">{info.label}</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{info.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map(tag => <Badge key={tag} variant="primary" size="sm">{tag}</Badge>)}
                </div>
              </div>
            </div>
          )}

          {/* Modules */}
          {activeTab === 'modules' && (
            <div className="space-y-3">
              {mockModules.map((mod, idx) => (
                <div key={mod.id} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-slate-50/80 transition-colors text-left"
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${mod.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                      {mod.completed ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">{mod.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{mod.items.length} items · {mod.items.filter(i => i.completed).length} completed</p>
                    </div>
                    <Badge variant={mod.completed ? 'success' : 'neutral'} size="sm">
                      {mod.completed ? 'Completed' : 'In Progress'}
                    </Badge>
                    {expandedModules.includes(mod.id) ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedModules.includes(mod.id) && (
                    <div className="border-t border-slate-50 divide-y divide-slate-50">
                      {mod.items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50/50 cursor-pointer transition-colors">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${item.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                            {item.completed ? <CheckCircle className="w-3.5 h-3.5" /> : moduleItemIcons[item.type]}
                          </div>
                          <span className={`text-sm flex-1 ${item.completed ? 'text-slate-500 line-through' : 'text-slate-700 font-medium'}`}>{item.title}</span>
                          <span className="text-xs text-slate-400">{item.duration}</span>
                          {!item.completed && idx > 1 && <Lock className="w-3.5 h-3.5 text-slate-300" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Assignments */}
          {activeTab === 'assignments' && (
            <div className="space-y-3">
              {courseAssignments.length === 0 ? (
                <p className="text-center py-10 text-slate-500 text-sm">No assignments for this course yet.</p>
              ) : courseAssignments.map(a => (
                <div key={a.id} className="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-slate-800 text-sm">{a.title}</h4>
                      <Badge variant={a.status === 'graded' ? 'success' : a.status === 'submitted' ? 'info' : 'warning'} size="sm" dot>
                        {a.status === 'graded' ? 'Graded' : a.status === 'submitted' ? 'Submitted' : 'Pending'}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{a.description}</p>
                    <p className="text-xs text-slate-400 mt-1.5">Due: {new Date(a.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-slate-600">{a.grade !== undefined && a.grade !== null ? `${a.grade}/${a.points}` : `/${a.points} pts`}</p>
                    <Button size="sm" variant={a.status === 'pending' ? 'primary' : 'outline'} className="mt-2">
                      {a.status === 'pending' ? 'Submit' : 'View'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quizzes / Discussion / Chat placeholder tabs */}
          {(activeTab === 'quizzes' || activeTab === 'discussion') && (
            <div className="text-center py-12 text-slate-500">
              <p className="text-4xl mb-3">📚</p>
              <p className="font-semibold">Content coming soon</p>
              <p className="text-sm mt-1">Check back later or visit the main {activeTab} page.</p>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm mb-3">Go to the full Chat Room for this course</p>
              <Button onClick={() => navigate('/chat')} icon={<MessageSquare className="w-4 h-4" />}>Open Chat Room</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
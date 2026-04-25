import React from 'react';
import { User, BookOpen, Star, Edit3, Camera, Award, TrendingUp } from 'lucide-react';
import { Card, CardHeader } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { mockUser, mockCourses, mockAssignments } from '@mock/data';

export const Profile: React.FC = () => {
  const avgGrade = 88;
  const completedAssignments = mockAssignments.filter(a => a.status === 'graded').length;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>Profile</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Profile card */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="relative w-20 h-20 flex-shrink-0">
            <img src={mockUser.avatar} alt={mockUser.name} className="w-20 h-20 rounded-2xl bg-indigo-100" />
            <button className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-indigo-500 transition-colors">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900">{mockUser.name}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{mockUser.email}</p>
            <div className="flex flex-wrap gap-2 mt-2.5">
              <Badge variant="primary" size="sm">{mockUser.role}</Badge>
              <Badge variant="neutral" size="sm">{mockUser.program}</Badge>
              <Badge variant="info" size="sm">{mockUser.year}</Badge>
            </div>
          </div>
          <Button variant="outline" icon={<Edit3 className="w-4 h-4" />}>Edit Profile</Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: <BookOpen className="w-4 h-4" />, label: 'Courses', value: mockCourses.length, color: 'text-indigo-600 bg-indigo-50' },
          { icon: <Star className="w-4 h-4" />, label: 'Avg Grade', value: `${avgGrade}%`, color: 'text-amber-600 bg-amber-50' },
          { icon: <Award className="w-4 h-4" />, label: 'Completed', value: completedAssignments, color: 'text-emerald-600 bg-emerald-50' },
          { icon: <TrendingUp className="w-4 h-4" />, label: 'Progress', value: '68%', color: 'text-purple-600 bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-lg font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info & Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Account Information" icon={<User className="w-4 h-4" />} />
          <div className="space-y-3">
            {[
              { label: 'Full Name', value: mockUser.name },
              { label: 'Email', value: mockUser.email },
              { label: 'Program', value: mockUser.program },
              { label: 'Year Level', value: mockUser.year },
              { label: 'Role', value: mockUser.role },
            ].map(f => (
              <div key={f.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-xs font-medium text-slate-500">{f.label}</span>
                <span className="text-sm font-semibold text-slate-800">{f.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Enrolled Courses" icon={<BookOpen className="w-4 h-4" />} />
          <div className="space-y-2.5">
            {mockCourses.map(c => (
              <div key={c.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${c.color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{c.code}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${c.color}`} style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">{c.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { useAppStore } from '../../hooks/useAppStore';
import { mockUser, mockAnnouncements } from '../../mock/data';
import { useNavigate, useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/courses': 'My Courses',
  '/assignments': 'Assignments',
  '/quizzes': 'Quizzes',
  '/chat': 'Chat Room',
  '/announcements': 'Announcements',
  '/messages': 'Messages',
  '/profile': 'Profile',
};

export const Topbar: React.FC = () => {
  const { toggleSidebar } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const title = pageTitles[location.pathname] ??
    (location.pathname.startsWith('/courses/') ? 'Course Detail' : 'MASAO');

  const unread = mockAnnouncements.filter(a => a.pinned).length;

  return (
    <header className="h-16 bg-white/80 backdrop-blur border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900 hidden sm:block">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className={`relative transition-all duration-200 ${searchOpen ? 'w-64' : 'w-9'} hidden sm:block`}>
          {searchOpen ? (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                autoFocus
                placeholder="Search courses, assignments…"
                onBlur={() => setSearchOpen(false)}
                className="w-full h-9 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-xl text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); navigate('/announcements'); }}
            className="relative w-9 h-9 rounded-xl text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
            )}
          </button>
        </div>

        {/* User avatar */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <img src={mockUser.avatar} alt={mockUser.name} className="w-7 h-7 rounded-full bg-indigo-100" />
          <span className="text-sm font-semibold text-slate-800 hidden sm:block">{mockUser.name.split(' ')[0]}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
};
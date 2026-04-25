import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, ClipboardList, HelpCircle,
  MessageSquare, Bell, Mail, User, GraduationCap, X, LogOut,
} from 'lucide-react';
import { useAppStore } from '../../hooks/useAppStore';
import { mockUser } from '../../mock/data';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/courses', icon: BookOpen, label: 'My Courses' },
  { to: '/assignments', icon: ClipboardList, label: 'Assignments' },
  { to: '/quizzes', icon: HelpCircle, label: 'Quizzes' },
  { to: '/chat', icon: MessageSquare, label: 'Chat Room' },
  { to: '/announcements', icon: Bell, label: 'Announcements' },
  { to: '/messages', icon: Mail, label: 'Messages' },
];

const bottomItems = [
  { to: '/profile', icon: User, label: 'Profile' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col
          bg-white border-r border-slate-100
          w-[260px] transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                MASAO
              </span>
              <p className="text-[10px] text-slate-400 -mt-0.5 font-medium tracking-wide uppercase">Learning Portal</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">Main Menu</p>
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon className={`nav-icon w-4 h-4 flex-shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{label}</span>
                {label === 'Messages' && (
                  <span className="ml-auto bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    1
                  </span>
                )}
                {label === 'Announcements' && (
                  <span className="ml-auto bg-cyan-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    2
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="border-t border-slate-100 my-3" />
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">Account</p>

          {bottomItems.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname.startsWith(to);
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon className={`nav-icon w-4 h-4 flex-shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User info */}
        <div className="px-3 py-4 border-t border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <img src={mockUser.avatar} alt={mockUser.name} className="w-8 h-8 rounded-full bg-indigo-100" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800 truncate">{mockUser.name}</p>
              <p className="text-xs text-slate-500 truncate">{mockUser.program}</p>
            </div>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="Sign out">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
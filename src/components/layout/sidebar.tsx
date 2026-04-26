import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, ClipboardList, HelpCircle,
  MessageSquare, Bell, Mail, User, GraduationCap, X, LogOut,
} from 'lucide-react';
import { useAppStore } from '@hooks/useAppStore';
import { cn } from '@/utils/cn';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
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
  const { sidebarOpen, setSidebarOpen, user } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

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
        className={cn(
          'fixed top-0 left-0 h-full z-40 flex flex-col',
          'bg-white border-r border-gray-200',
          'w-[260px] transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-gray-900 tracking-tight">
                MASAO
              </span>
              <p className="text-[10px] text-gray-400 -mt-0.5 font-medium tracking-wide uppercase">Learning</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">Main Menu</p>
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to));
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  'text-sm font-medium',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {label === 'Messages' && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    1
                  </span>
                )}
                {label === 'Announcements' && (
                  <span className="ml-auto bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    2
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="border-t border-gray-200 my-3" />
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">Account</p>

          {bottomItems.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname.startsWith(to);
            return (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  'text-sm font-medium',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User info */}
        {user && (
          <div className="px-3 py-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-blue-100" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
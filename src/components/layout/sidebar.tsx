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

const onlineUsers = [
  {
    id: 'ou-1',
    name: 'Mika Tan',
    role: 'Data Structures',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mika',
    status: 'online',
  },
  {
    id: 'ou-2',
    name: 'Chris Valdez',
    role: 'Web Dev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
    status: 'online',
  },
  {
    id: 'ou-3',
    name: 'Lara Ortiz',
    role: 'Database',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lara',
    status: 'idle',
  },
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
          'bg-white border-r border-[#1a5c2e]/10',
          'w-[260px] transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#1a5c2e]/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a5c2e] to-[#246b37] flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-[#1a5c2e] tracking-tight">
                MASAO
              </span>
              <p className="text-[10px] text-gray-400 -mt-0.5 font-medium tracking-wide uppercase">Learning</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-[#e8f3ec]"
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
                    ? 'bg-[#e8f3ec] text-[#1a5c2e]'
                    : 'text-gray-600 hover:bg-[#f3f9f5]'
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

          <div className="border-t border-[#1a5c2e]/10 my-3" />
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
                    ? 'bg-[#e8f3ec] text-[#1a5c2e]'
                    : 'text-gray-600 hover:bg-[#f3f9f5]'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
              </NavLink>
            );
          })}

          <div className="border-t border-[#1a5c2e]/10 my-3" />
          <div className="px-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Online Now</p>
              <span className="text-[10px] font-semibold text-emerald-600">{onlineUsers.length}</span>
            </div>
            <div className="space-y-2">
              {onlineUsers.map(person => (
                <div key={person.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#f3f9f5]">
                  <div className="relative">
                    <img src={person.avatar} alt={person.name} className="w-7 h-7 rounded-full bg-[#e8f3ec]" />
                    <span
                      className={cn(
                        'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white',
                        person.status === 'online' ? 'bg-emerald-500' : 'bg-amber-400'
                      )}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{person.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">{person.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* User info */}
        {user && (
          <div className="px-3 py-4 border-t border-[#1a5c2e]/10 flex-shrink-0">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f3f9f5] transition-colors cursor-pointer">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-[#e8f3ec]" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-gray-400 hover:text-[#1a5c2e] hover:bg-[#e8f3ec] rounded-lg transition-colors"
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
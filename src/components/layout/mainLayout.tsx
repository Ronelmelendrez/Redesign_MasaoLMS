import React from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { useAppStore } from '@hooks/useAppStore';
import { cn } from '@/utils/cn';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div
        className={cn(
          'flex flex-col min-h-screen',
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        )}
      >
        <Topbar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
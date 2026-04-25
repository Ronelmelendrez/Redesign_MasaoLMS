import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="lg:ml-[260px] flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
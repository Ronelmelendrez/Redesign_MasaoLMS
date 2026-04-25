import { create } from 'zustand';
import type { User } from '../types';
import { mockUser } from '../mock/data';

interface AppState {
  user: User | null;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setUser: (user: User) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: mockUser,
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setUser: (user) => set({ user }),
}));
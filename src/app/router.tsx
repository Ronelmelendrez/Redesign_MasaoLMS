import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@components/layout/mainLayout';
import { Dashboard } from '@features/dashboard/pages/dashboardPage';
import { Courses } from '@features/courses/pages/coursePage';
import { CourseDetail } from '@features/courses/pages/courseDetailPage';
import { Assignments } from '@features/assignments/pages/assignmentPage';
import { Quizzes } from '@features/quizzes/pages/quizzesPage';
import { Chat } from '@features/chat/pages/chatPage';
import { Announcements } from '@features/announcements/pages/announcementPage';
import { Messages } from '@features/messages/pages/messagesPage';
import { Profile } from '@features/messages/pages/profilePage';

export const AppRouter: React.FC = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/quizzes" element={<Quizzes />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </MainLayout>
);
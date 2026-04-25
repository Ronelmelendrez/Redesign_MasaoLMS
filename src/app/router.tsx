import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Dashboard } from '../features/dashboard/Dashboard';
import { Courses } from '../features/courses/Courses';
import { CourseDetail } from '../features/courses/CourseDetail';
import { Assignments } from '../features/assignments/Assignments';
import { Quizzes } from '../features/quizzes/Quizzes';
import { Chat } from '../features/chat/Chat';
import { Announcements } from '../features/announcements/Announcements';
import { Messages } from '../features/messages/Messages';
import { Profile } from '../features/messages/Profile';

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
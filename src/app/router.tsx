import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@components/layout/mainLayout';
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute';
import MasaoLandingPage from '@features/landing/masaoLandingPage';
import { Login } from '@features/auth/pages/loginPage';
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
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<MasaoLandingPage />} />
    <Route path="/login" element={<Login />} />

    {/* Protected routes */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Dashboard />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/courses"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Courses />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/courses/:id"
      element={
        <ProtectedRoute>
          <MainLayout>
            <CourseDetail />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/assignments"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Assignments />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/quizzes"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Quizzes />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/chat"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Chat />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/announcements"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Announcements />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/messages"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Messages />
          </MainLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Profile />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    {/* Catch all - redirect to home */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
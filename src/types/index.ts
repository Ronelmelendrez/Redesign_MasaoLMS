// Types and Interfaces for the LMS
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  program?: string;
  year?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  students: number;
  progress: number;
  lastAccessed?: string;
  category: string;
  modules: number;
  code?: string;
  color?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  completed: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'assignment';
  duration?: number;
  completed: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  submittedAt?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  course: string;
  courseCode: string;
  questions: number;
  duration: number;
  timeLimit: number;
  score?: number;
  submitted: boolean;
  status: 'available' | 'upcoming' | 'completed';
  dueDate: string;
  attempts: number;
  maxAttempts: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  courseId?: string;
  priority: 'normal' | 'high';
}

export interface Message {
  id: string;
  senderId: string;
  sender: string;
  from: string;
  fromAvatar?: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  content: string;
  timestamp: string;
  read: boolean;
  starred?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

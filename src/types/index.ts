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
  instructorAvatar?: string;
  students: number;
  progress: number;
  lastAccessed?: string;
  category: string;
  modules: number;
  code?: string;
  color?: string;
  nextClass?: string;
  credits?: number;
  schedule?: string;
  tags?: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  completed: number;
  items?: Lesson[];
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
  description?: string;
  courseId: string;
  course: string;
  courseCode?: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  submittedAt?: string;
  points?: number;
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
  authorAvatar?: string;
  date: string;
  createdAt?: string;
  courseId?: string;
  courseCode?: string;
  priority: 'normal' | 'high';
  body?: string;
  pinned?: boolean;
  category?: string;
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

export interface Activity {
  id: string;
  type: 'assignment-submitted' | 'quiz-completed' | 'course-completed' | 'comment-added' | 'resource-added';
  text: string;
  course: string;
  time: string;
  icon: 'check-circle' | 'award' | 'star' | 'message' | 'file';
}

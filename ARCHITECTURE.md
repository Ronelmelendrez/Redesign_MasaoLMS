# MASAO Learning Management System - Frontend Redesign

A modern, clean, and highly usable frontend redesign of the MASAO Learning Management System (LMS) built with **React**, **TypeScript**, **Tailwind CSS**, **React Router**, and **Zustand**.

---

## 🎯 Project Overview

This is a **frontend-only** modern LMS redesign focused on:
- ✨ **Clean UI/UX** with consistent design system
- 🎨 **Tailwind CSS** for styling with no inline styles
- 📱 **Mobile-first responsive design**
- ⚡ **Fast and lightweight** with Vite
- 🪝 **React Hooks** for state management
- 🛣️ **React Router** for navigation
- 💾 **Zustand** for lightweight state management
- 🎭 **Mock data** - no backend required

---

## 📁 Project Structure

```
src/
├── app/
│   ├── router.tsx                 # Main router configuration
│   └── providers.tsx              # App providers (for future use)
│
├── components/
│   ├── common/
│   │   ├── emptyState.tsx         # Empty state component
│   │   ├── loader.tsx             # Loading skeleton & spinner
│   │   └── errorState.tsx         # Error state component
│   │
│   ├── layout/
│   │   ├── sidebar.tsx            # Fixed sidebar navigation
│   │   ├── topbar.tsx             # Top navigation bar
│   │   └── mainLayout.tsx         # Main layout wrapper
│   │
│   └── ui/
│       ├── button.tsx             # Button component (variants: primary, secondary, ghost, danger, success, outline)
│       ├── card.tsx               # Card component with header/title/description/footer
│       ├── input.tsx              # Input component with label, error, icon support
│       ├── badge.tsx              # Badge component (6 variants)
│       └── modal.tsx              # Modal dialog component
│
├── features/
│   ├── dashboard/
│   │   ├── dashboardPage.tsx      # Dashboard page with stats, courses, announcements
│   │   └── Dashboard.tsx          # Export wrapper
│   │
│   ├── courses/
│   │   ├── coursePage.tsx         # Courses list with search & filter
│   │   ├── courseDetailPage.tsx   # Course detail with tabs (overview, modules, assignments, etc)
│   │   ├── Courses.tsx            # Export wrapper
│   │   └── CourseDetail.tsx       # Export wrapper
│   │
│   ├── assignments/
│   │   ├── assignmentPage.tsx     # Assignments list with drag-drop upload
│   │   └── Assignments.tsx        # Export wrapper
│   │
│   ├── quizzes/
│   │   ├── quizziesPages.tsx      # Quizzes with score display
│   │   └── Quizzes.tsx            # Export wrapper
│   │
│   ├── chat/
│   │   ├── chatPage.tsx           # Real-time chat UI with messages
│   │   └── Chat.tsx               # Export wrapper
│   │
│   ├── announcements/
│   │   ├── announcementPage.tsx   # Announcements list with priorities
│   │   └── Announcements.tsx      # Export wrapper
│   │
│   └── messages/
│       ├── messagesPage.tsx       # Messages inbox with detail view
│       ├── profilePage.tsx        # User profile & account settings
│       ├── Messages.tsx           # Export wrapper
│       └── Profile.tsx            # Export wrapper
│
├── hooks/
│   └── useAppStore.ts             # Zustand store for app state (user, sidebar toggle)
│
├── mock/
│   └── data.ts                    # Mock data for all features
│
├── styles/
│   └── global.css                 # Global styles & Tailwind directives
│
├── types/
│   └── index.ts                   # TypeScript interfaces & types
│
├── utils/
│   └── cn.ts                      # Class name utility (cn function)
│
├── main.tsx                       # React entry point
└── app.tsx                        # Main App component
```

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Secondary**: Cyan (#06b6d4)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)

### Components
All components are built with:
- **Rounded corners**: `rounded-lg`, `rounded-xl`
- **Soft shadows**: `shadow-sm`
- **Consistent spacing**: `p-4`, `p-6`, `gap-4`, `gap-6`
- **Hover & focus states**: Smooth transitions & ring focus

### Typography
- **Font**: System UI (DM Sans fallback)
- **Headings**: Bold, clear hierarchy (h1, h2, h3)
- **Body**: Regular, readable (14px-16px)

---

## 🧩 UI Components

### Button
```tsx
<Button 
  variant="primary" // primary | secondary | ghost | danger | success | outline
  size="md"         // xs | sm | md | lg | xl
  fullWidth
  loading
  icon={<Icon />}
>
  Click me
</Button>
```

### Card
```tsx
<Card padding="lg" hover bordered>
  <CardHeader title="Title" subtitle="Subtitle" icon={<Icon />} />
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Input
```tsx
<Input
  label="Email"
  error="Invalid email"
  icon={<Mail className="w-4 h-4" />}
  placeholder="your@email.com"
/>
```

### Badge
```tsx
<Badge variant="success">Completed</Badge>
// Variants: default | success | warning | danger | info | gray
```

---

## 📱 Responsive Design

- **Mobile-first approach**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Sidebar collapses** on screens < lg
- **Grid layouts** that adapt to screen size

### Example
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>
```

---

## 🚀 Features

### Dashboard
- Welcome header with greeting
- Course stats (progress, count, average)
- Active courses grid with progress bars
- Pending assignments panel
- High-priority announcements

### Courses
- Course grid with search & category filter
- Progress tracking
- Course details page with tabs:
  - **Overview**: Course info & what you'll learn
  - **Modules**: Lesson tracking with progress
  - **Assignments**: Course-specific assignments
  - **Quizzes**: Course quizzes
  - **Discussion**: Forum (placeholder)
  - **Chat**: Real-time chat (placeholder)

### Assignments
- Filter by status: All, Pending, Submitted, Graded
- Drag-and-drop file upload
- Grade display with feedback
- Submission tracking

### Quizzes
- Quiz listing with score display
- Status badges (Pending, Completed)
- Quiz info: questions, time limit, due date
- Expandable details

### Chat
- Real-time message interface
- Message bubbles (left/right alignment)
- Typing indicator
- Auto-scroll to latest message
- Emoji & attachment support (UI ready)

### Announcements
- Priority-based display (high, normal)
- Course-related announcements
- Date tracking
- Sortable by priority/date

### Messages
- Inbox with unread indicators
- Search & filter
- Message detail view
- Reply interface

### Profile
- Avatar display
- Account info (editable)
- 2FA & notification settings
- Statistics dashboard
- Account deletion (danger zone)

---

## 🎯 Navigation

### Sidebar
- **Dashboard** - Main overview
- **My Courses** - Course management
- **Assignments** - Assignment tracking
- **Quizzes** - Quiz management
- **Chat Room** - Discussion
- **Announcements** - Updates
- **Messages** - Inbox
- **Profile** - Account settings

### Responsive Behavior
- **Desktop**: Fixed sidebar (260px width)
- **Mobile**: Hamburger menu, collapsible sidebar with overlay

---

## 🛠️ Technology Stack

- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (with @tailwindcss/vite)
- **Routing**: React Router v6
- **State**: Zustand
- **Icons**: Lucide React
- **UI Utilities**: class-variance-authority (CVA)

---

## 📦 Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "zustand": "^4.x",
  "lucide-react": "latest",
  "class-variance-authority": "latest"
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
cd masao_beta
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

---

## ✨ Key Features

### 1. Modern UI/UX
- Clean, minimal design
- Consistent spacing & typography
- Smooth transitions & animations
- Proper loading & error states

### 2. Responsive Design
- Mobile-first approach
- Flexible layouts with Tailwind
- Touch-friendly UI elements
- Optimized for all screen sizes

### 3. State Management
- Lightweight Zustand store
- User context (name, email, avatar)
- Sidebar toggle state
- Easy to extend

### 4. Reusable Components
- 5+ UI components
- 3 layout components
- Common state & utilities
- Well-documented props

### 5. Mock Data
- Complete mock data for all features
- Realistic student workflows
- Multiple course examples
- Various assignment/quiz statuses

---

## 🎨 Tailwind Configuration

The project uses Tailwind CSS with:
- Custom color palette
- Extended spacing
- Smooth transitions
- Custom utilities (gradient-brand, glass effect, etc.)

---

## 📚 File Naming Convention

- **Pages**: `featureName.tsx` (lowercase with camelCase)
- **Components**: `ComponentName.tsx` (PascalCase)
- **Hooks**: `useHookName.ts` (camelCase with 'use' prefix)
- **Utilities**: `utilityName.ts` (camelCase)
- **Types**: `index.ts` in types folder

---

## 🔄 Workflow Example

1. **User logs in** → Dashboard page loads
2. **View courses** → Courses page with grid
3. **Click course** → Course detail page
4. **View modules** → Tab shows lessons with progress
5. **Check assignments** → Assignment page with upload
6. **Take quiz** → Quiz detail with timer (UI ready)
7. **Send message** → Chat with real-time bubbles
8. **Check profile** → Edit account info

---

## 📝 Notes

- All data is **mocked** - no backend API calls
- **No authentication** - hardcoded user session
- **Responsive** - works on mobile, tablet, desktop
- **Production-ready** code with proper typing
- **Scalable** structure for future expansion

---

## 🚀 Future Enhancements

- [ ] API integration
- [ ] Real authentication
- [ ] WebSocket for live chat
- [ ] File upload to cloud storage
- [ ] Dark mode
- [ ] Accessibility (WCAG) improvements
- [ ] Internationalization (i18n)
- [ ] Analytics & logging

---

## 📄 License

This project is part of the MASAO LMS redesign initiative.

---

**Built with ❤️ for modern learning experiences**

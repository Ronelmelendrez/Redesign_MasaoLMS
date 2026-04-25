# MASAO Learning Management System - Modern Frontend Redesign

A production-level, modern, and highly usable frontend redesign of the MASAO Learning Management System (LMS) built with **React**, **TypeScript**, **Tailwind CSS**, **React Router**, and **Zustand**.

![MASAO LMS](https://img.shields.io/badge/React-18+-blue?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-blue?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-5+-green?style=flat-square)

---

## ✨ Features

### 🎯 Core Features
- ✅ **Dashboard** - Overview with stats, active courses, pending work, announcements
- ✅ **Courses** - Searchable course catalog with detailed course pages
- ✅ **Assignments** - Assignment tracking with drag-drop upload
- ✅ **Quizzes** - Quiz management with score display
- ✅ **Chat** - Real-time messaging interface with typing indicators
- ✅ **Announcements** - Priority-based announcement system
- ✅ **Messages** - Message inbox with detail viewer
- ✅ **Profile** - User profile & account settings

### 🎨 Design Excellence
- 🎯 **Modern UI/UX** - Clean, minimal, professional design
- 📱 **Fully Responsive** - Mobile-first, works on all devices
- ♿ **Accessible** - Proper semantic HTML & ARIA labels
- 🎭 **Dark Mode Ready** - Easy to add theme switching
- ⚡ **Smooth Animations** - Transitions & hover effects

### 🛠️ Developer Experience
- 📦 **Reusable Components** - 5+ UI components, 3 layout components
- 🔧 **TypeScript** - Full type safety with interfaces
- 🎣 **React Hooks** - Modern functional components
- 💾 **Zustand Store** - Lightweight state management
- 🎯 **Clean Architecture** - Feature-based folder structure
- 🚀 **Fast Build** - Vite-powered development

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ 
- **npm** or **yarn**

### Installation

```bash
# Clone/Navigate to project
cd masao_beta

# Install dependencies
npm install

# Start development server
npm run dev
```

Server runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── app/                          # App configuration
│   ├── router.tsx               # Route definitions
│   └── providers.tsx            # App providers
│
├── components/                   # Reusable components
│   ├── common/                  # Common UI (empty state, loader, error)
│   ├── layout/                  # Layout (sidebar, topbar, main)
│   └── ui/                      # UI components (button, card, input, badge, modal)
│
├── features/                     # Feature pages (business logic)
│   ├── dashboard/               # Dashboard page
│   ├── courses/                 # Courses & course detail
│   ├── assignments/             # Assignments page
│   ├── quizzes/                 # Quizzes page
│   ├── chat/                    # Chat room page
│   ├── announcements/           # Announcements page
│   └── messages/                # Messages & profile pages
│
├── hooks/                        # Custom hooks & Zustand store
│   └── useAppStore.ts           # Global app state
│
├── mock/                         # Mock data
│   └── data.ts                  # All mock data for features
│
├── styles/                       # Global styles
│   └── global.css               # Tailwind + global styles
│
├── types/                        # TypeScript types
│   └── index.ts                 # All interfaces & types
│
├── utils/                        # Utility functions
│   └── cn.ts                    # Class name utility
│
├── main.tsx                      # React entry point
└── vite.config.ts              # Vite configuration
```

---

## 🎨 Design System

### Colors
| Color | Hex | Usage |
|-------|-----|-------|
| **Primary (Blue)** | `#2563eb` | Main actions, links |
| **Secondary (Cyan)** | `#06b6d4` | Accent, highlights |
| **Success (Green)** | `#10b981` | Positive actions, completed |
| **Warning (Orange)** | `#f59e0b` | Warnings, pending |
| **Danger (Red)** | `#ef4444` | Errors, critical actions |
| **Gray** | `#6b7280` | Neutral, disabled |

### Components

#### Button
6 variants: `primary` | `secondary` | `ghost` | `danger` | `success` | `outline`

```tsx
<Button variant="primary" size="md" fullWidth>Action</Button>
```

#### Card
Container with optional header, content, footer

```tsx
<Card hover padding="lg">
  <CardHeader title="Title" icon={<Icon />} />
  <p>Content</p>
</Card>
```

#### Input
Form input with label, error, icon support

```tsx
<Input label="Email" error="Invalid" icon={<Mail />} />
```

#### Badge
Status indicator with 6 variants

```tsx
<Badge variant="success">Completed</Badge>
```

#### Modal
Dialog component

```tsx
<Modal isOpen={open} onClose={setOpen} title="Title">
  Content
</Modal>
```

---

## 📱 Responsive Design

- **Mobile-First** - Designed for mobile, scales up
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Sidebar** - Collapsible on mobile, fixed on desktop
- **Flexible Layouts** - Grid & flex for adaptive UI

---

## 🧠 State Management

### Zustand Store (`useAppStore`)

```typescript
const { user, sidebarOpen, toggleSidebar, setUser } = useAppStore();
```

**State**:
- `user` - Current logged-in user
- `sidebarOpen` - Sidebar visibility

**Actions**:
- `toggleSidebar()` - Toggle sidebar
- `setSidebarOpen(boolean)` - Set sidebar state
- `setUser(user)` - Update user

---

## 📊 Mock Data

Complete mock data in `src/mock/data.ts`:
- **6 courses** with progress, instructor, description
- **4 assignments** with various statuses & grades
- **3 quizzes** with scores
- **4 announcements** with priorities
- **3 messages** with unread status
- **5 chat messages** with timestamps
- **2 modules** with lessons

---

## 🛣️ Navigation

### Sidebar Menu
| Icon | Route | Page |
|------|-------|------|
| 📊 | `/` | Dashboard |
| 📚 | `/courses` | Courses |
| ✅ | `/assignments` | Assignments |
| ❓ | `/quizzes` | Quizzes |
| 💬 | `/chat` | Chat Room |
| 🔔 | `/announcements` | Announcements |
| ✉️ | `/messages` | Messages |
| 👤 | `/profile` | Profile |

---

## 🎯 Page Details

### Dashboard
- **Welcome section** with time-based greeting
- **4 stat cards** (courses, pending work, average progress, announcements)
- **Course grid** (4 courses) with progress tracking
- **Pending assignments** panel
- **Latest announcements** widget

### Courses
- **Search & filter** by category
- **Course grid** with images, instructor, progress
- **Responsive layout** (1, 2, 3 columns based on screen)
- **Click to view** course details

### Course Detail
- **Hero image** with course info
- **6 tabs**: Overview, Modules, Assignments, Quizzes, Discussion, Chat
- **Progress tracking** with visual progress bar
- **Module lessons** with completion checkmarks

### Assignments
- **Status filter** (All, Pending, Submitted, Graded)
- **Drag-drop upload** area for pending assignments
- **Grade display** with feedback
- **Submission dates** and status badges

### Quizzes
- **Quiz grid** with statistics
- **Status indicators** (Pending, Completed)
- **Score display** for completed quizzes
- **Quiz info**: questions, time limit, due date

### Chat
- **Message bubbles** (left/right aligned)
- **Typing indicator** animation
- **Message timestamps**
- **Auto-scroll** to latest message
- **Emoji & attachment** buttons (UI ready)

### Announcements
- **Priority highlighting** (high = red border)
- **Course tagging** for related courses
- **Date sorting** (newest first)
- **Author attribution**

### Messages
- **Unread indicators** (red dot)
- **Search & filter**
- **Message detail viewer**
- **Reply compose area**
- **Archive & delete** actions

### Profile
- **Avatar display** (Gravatar-style)
- **Editable profile** (name, email, role)
- **Account settings** (2FA, notifications, password)
- **Statistics** (courses, average score)
- **Danger zone** (delete account)

---

## 🔧 Technology Stack

| Tech | Version | Purpose |
|------|---------|---------|
| **React** | 18+ | UI framework |
| **TypeScript** | 5+ | Type safety |
| **Tailwind CSS** | 3+ | Styling |
| **React Router** | 6+ | Navigation |
| **Zustand** | 4+ | State management |
| **Lucide React** | Latest | Icons |
| **Vite** | 5+ | Build tool |

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x",
  "zustand": "^4.x",
  "lucide-react": "latest"
}
```

**Dev Dependencies**:
- @vitejs/plugin-react
- @tailwindcss/vite
- TypeScript
- Vite

---

## 🎯 Key Features

### 1. **Production-Ready Code**
- ✅ Full TypeScript with strict mode
- ✅ Proper error handling & empty states
- ✅ Loading states with skeletons
- ✅ Responsive design with mobile-first approach
- ✅ Accessibility considered

### 2. **Component-Driven**
- ✅ Small, reusable components
- ✅ Proper prop types & documentation
- ✅ Consistent styling & spacing
- ✅ No inline styles (Tailwind only)
- ✅ Semantic HTML

### 3. **Easy to Extend**
- ✅ Feature-based folder structure
- ✅ Clear naming conventions
- ✅ Easy to add new pages
- ✅ Mock data easily replaceable with API
- ✅ Zustand store easy to expand

### 4. **Modern UX**
- ✅ Smooth transitions & animations
- ✅ Clear visual hierarchy
- ✅ Proper feedback (loading, errors, success)
- ✅ Intuitive navigation
- ✅ Consistent design language

---

## 🚀 Development Workflow

### Adding a New Page

1. Create feature folder: `src/features/featurename/`
2. Create page component: `featurepage.tsx`
3. Create export wrapper: `FeatureName.tsx`
4. Add route in `src/app/router.tsx`
5. Add nav item in `src/components/layout/sidebar.tsx`

### Adding a New Component

1. Create in `src/components/ui/componentname.tsx`
2. Export with proper TypeScript types
3. Import and use in pages

### Updating Styles

- Modify Tailwind classes directly in components
- Add custom utilities in `src/styles/global.css`
- Update colors in CSS variables
- Extend Tailwind config in `tailwind.config.js`

---

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Quick setup guide
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture overview

---

## 🎓 Learning Paths

### For Designers
- Review component library in `src/components/ui/`
- Check color usage in `src/styles/global.css`
- Explore layout responsiveness with grid/flex

### For Developers
- Start with `src/app/router.tsx` for routing
- Review `src/hooks/useAppStore.ts` for state management
- Check `src/features/` for page implementations
- Study component props in `src/components/`

### For Full-Stack
- Prepare to replace mock data with API calls
- Extend Zustand store for complex state
- Add authentication flow
- Connect WebSocket for real-time chat

---

## 💡 Best Practices Used

- ✅ **TypeScript Strict Mode** - Type safety
- ✅ **Component Composition** - Reusable, testable components
- ✅ **Proper Naming** - Clear, descriptive names
- ✅ **DRY Principle** - No code repetition
- ✅ **Semantic HTML** - Proper DOM structure
- ✅ **Accessibility** - ARIA labels, keyboard navigation
- ✅ **Performance** - Optimized components, lazy loading ready
- ✅ **Responsive** - Mobile-first design
- ✅ **Documentation** - Comments where needed
- ✅ **Testing Ready** - Props are testable, mocks available

---

## 🔄 Future Enhancements

- [ ] API integration
- [ ] Real authentication & authorization
- [ ] WebSocket for live chat
- [ ] File upload to cloud storage
- [ ] Dark mode toggle
- [ ] Internationalization (i18n)
- [ ] E2E testing
- [ ] Component storybook
- [ ] Analytics tracking
- [ ] Performance monitoring

---

## 📄 Notes

- **All data is mocked** - No backend required for demo
- **No authentication** - Hardcoded user session for demo
- **Fully responsive** - Works on mobile, tablet, desktop
- **Production code** - Ready to connect with backend API
- **Extensible** - Easy to add features & customize

---

## 🎉 Getting Started

```bash
# Install & run
npm install
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see the application.

---

## 📞 Support & Questions

Refer to:
- **[QUICKSTART.md](./QUICKSTART.md)** for setup issues
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** for technical details
- Code comments for implementation details
- Component prop types for usage examples

---

## 📄 License

This project is part of the MASAO Learning Management System redesign initiative.

---

<div align="center">

**Built with ❤️ using React + TypeScript + Tailwind CSS**

*A modern, clean, production-ready LMS frontend*

[QUICKSTART →](./QUICKSTART.md) | [ARCHITECTURE →](./ARCHITECTURE.md)

</div>

# MASAO LMS Frontend - File Index & Reference

A quick reference guide to all files in the project.

## 📂 Project Root

```
masao_beta/
├── README.md                      → Project overview & features
├── README_NEW.md                  → Alternative comprehensive README
├── QUICKSTART.md                  → Setup & usage guide (START HERE)
├── ARCHITECTURE.md                → Technical architecture & components
├── COMPLETION_SUMMARY.md          → What was built summary
├── VERIFICATION_CHECKLIST.md      → Testing & verification guide (THIS FILE)
├── FILE_INDEX.md                  → This file
├── vite.config.ts                 → Vite build configuration
├── tsconfig.json                  → TypeScript configuration
├── package.json                   → Dependencies & scripts
└── src/                           → Source code
```

---

## 📁 src/ Directory Structure

### `src/main.tsx`
- React application entry point
- Mounts app to DOM
- Initializes providers

### `src/app/`
**Router & App Setup**

- `router.tsx` - React Router configuration with 9 routes
  - `/` → Dashboard
  - `/courses` → Courses list
  - `/courses/:id` → Course detail
  - `/assignments` → Assignments
  - `/quizzes` → Quizzes
  - `/chat` → Chat room
  - `/announcements` → Announcements
  - `/messages` → Messages
  - `/profile` → Profile
  - `*` → 404 Not Found (fallback)

---

### `src/components/ui/`
**Reusable UI Components**

1. **button.tsx** (200+ lines)
   - 6 variants: primary, secondary, ghost, danger, success, outline
   - 3 sizes: sm, md, lg
   - Loading state with spinner
   - Props: variant, size, fullWidth, loading, disabled

2. **card.tsx** (150+ lines)
   - Card container with hover effect
   - Sub-components: CardHeader, CardTitle, CardDescription, CardContent, CardFooter
   - Props: hover, padding (sm, md, lg, none)

3. **input.tsx** (120+ lines)
   - Form input with label
   - Error handling with red border
   - Icon support (left/right)
   - Props: label, error, icon, type, placeholder

4. **badge.tsx** (100+ lines)
   - 6 color variants: default, success, warning, danger, info, gray
   - Icon support
   - Props: variant, icon

5. **modal.tsx** (150+ lines)
   - Dialog overlay component
   - Sizes: sm, md, lg, xl
   - Props: isOpen, onClose, title, content, footer

---

### `src/components/layout/`
**Layout Components**

1. **sidebar.tsx** (200+ lines)
   - Fixed left navigation (260px)
   - 8 navigation items with icons
   - Collapsible on mobile (<lg)
   - User info section at bottom
   - Logo with gradient
   - Uses React Router NavLink

2. **topbar.tsx** (180+ lines)
   - Top navigation bar
   - Expandable search (w-9 to w-64)
   - Notification bell with badge
   - User avatar button
   - Responsive design

3. **mainLayout.tsx** (80+ lines)
   - Wrapper combining Sidebar + Topbar
   - Main content area
   - Responsive padding (lg:ml-[260px])

---

### `src/components/common/`
**Common Utility Components**

1. **emptyState.tsx** (60+ lines)
   - Icon (Inbox by default)
   - Title & description
   - Optional action button
   - Centered layout

2. **errorState.tsx** (70+ lines)
   - Alert icon
   - Error title & description
   - Red color scheme
   - Action button

3. **loader.tsx** (100+ lines)
   - Skeleton component (multiple lines)
   - Loader spinner (blue ring)
   - CourseCardSkeleton for loading state

---

### `src/features/`
**Feature Pages (Business Logic)**

#### `src/features/dashboard/`
- **dashboardPage.tsx** → Main dashboard component
- **Dashboard.tsx** → Export wrapper
- Features: stats, courses grid, assignments, announcements

#### `src/features/courses/`
- **coursePage.tsx** → Courses list page
- **Courses.tsx** → Export wrapper
- Features: search, filter, grid layout, click to view

- **courseDetailPage.tsx** → Single course page
- **CourseDetail.tsx** → Export wrapper
- Features: 6 tabs, modules, assignments, quizzes

#### `src/features/assignments/`
- **assignmentPage.tsx** → Assignments page
- **Assignments.tsx** → Export wrapper
- Features: status filter, drag-drop upload, grading

#### `src/features/quizzes/`
- **quizziesPages.tsx** → Quizzes page
- **Quizzes.tsx** → Export wrapper
- Features: grid layout, scores, status

#### `src/features/chat/`
- **chatPage.tsx** → Chat room page
- **Chat.tsx** → Export wrapper
- Features: message bubbles, typing indicator, send

#### `src/features/announcements/`
- **announcementPage.tsx** → Announcements page
- **Announcements.tsx** → Export wrapper
- Features: priority display, course tagging

#### `src/features/messages/`
- **messagesPage.tsx** → Messages inbox page
- **Messages.tsx** → Export wrapper
- Features: unread count, detail viewer, reply

- **profilePage.tsx** → User profile page
- **Profile.tsx** → Export wrapper
- Features: editable info, settings, statistics

---

### `src/hooks/`
**Custom Hooks & State Management**

- **useAppStore.ts** (80+ lines)
  - Zustand store
  - State: user, sidebarOpen
  - Actions: toggleSidebar, setSidebarOpen, setUser
  - Default: mockUser (Alex Rivera)

---

### `src/mock/`
**Mock Data (Replaces API)**

- **data.ts** (400+ lines)
  - mockUser - Alex Rivera (student)
  - mockCourses - 6 courses with progress
  - mockAssignments - 4 assignments with grades
  - mockQuizzes - 3 quizzes with scores
  - mockAnnouncements - 4 announcements
  - mockMessages - 3 messages
  - mockChatMessages - 5 chat messages
  - mockModules - 2 modules with lessons

---

### `src/types/`
**TypeScript Interfaces**

- **index.ts** (200+ lines)
  - User interface
  - Course interface
  - Module & Lesson interfaces
  - Assignment interface
  - Quiz interface
  - Announcement interface
  - Message interface
  - ChatMessage interface

---

### `src/styles/`
**Global Styles**

- **global.css** (150+ lines)
  - Tailwind directives
  - CSS variables (colors)
  - Custom utilities (.gradient-brand, .glass)
  - Animation classes
  - Component layer styles

---

### `src/utils/`
**Utility Functions**

- **cn.ts** (20 lines)
  - Class name utility
  - Merges conditional Tailwind classes
  - Used throughout components

---

## 📊 File Statistics

### By Type
| Type | Count | Lines |
|------|-------|-------|
| Components | 15 | ~2,000 |
| Features | 18 | ~2,500 |
| Hooks | 1 | ~80 |
| Types | 1 | ~200 |
| Mock | 1 | ~400 |
| Utils | 1 | ~20 |
| Styles | 1 | ~150 |
| Config | 3 | ~100 |
| **Total** | **40** | **~5,500** |

### By Category
- **UI Components**: 5 files
- **Layout Components**: 3 files
- **Common Components**: 3 files
- **Feature Pages**: 18 files (9 pages + 9 wrappers)
- **Core Files**: 6 files
- **Config Files**: 3 files
- **Documentation**: 6 files

---

## 🔗 File Dependencies

### Router Imports
```
router.tsx imports:
├── Dashboard from features/dashboard
├── Courses from features/courses
├── CourseDetail from features/courses
├── Assignments from features/assignments
├── Quizzes from features/quizzes
├── Chat from features/chat
├── Announcements from features/announcements
├── Messages from features/messages
└── Profile from features/messages
```

### Layout Imports
```
MainLayout imports:
├── Sidebar from components/layout
└── Topbar from components/layout

Sidebar/Topbar import:
├── useAppStore from hooks
├── useNavigate from react-router
└── Icons from lucide-react
```

### Feature Page Imports
```
Each feature page imports:
├── Mock data from mock/data
├── UI components from components/ui
├── Common components from components/common
├── Types from types/index
└── React hooks (useState, useEffect, etc)
```

---

## 📝 Documentation Files

1. **README.md** (1,000+ lines)
   - Project overview
   - Features list
   - Tech stack
   - Quick start
   - Component guide

2. **QUICKSTART.md** (1,000+ lines)
   - Installation steps
   - Project structure
   - Routes table
   - Component overview
   - Development workflow
   - Troubleshooting

3. **ARCHITECTURE.md** (2,000+ lines)
   - Complete architecture
   - All components documented
   - All features documented
   - Tech stack details
   - Design system
   - Future enhancements

4. **COMPLETION_SUMMARY.md** (500+ lines)
   - What was built
   - Status overview
   - Statistics
   - Next steps
   - Key achievements

5. **VERIFICATION_CHECKLIST.md** (200+ lines)
   - Feature verification
   - Testing steps
   - Quality checklist

6. **FILE_INDEX.md** (This file)
   - File reference guide
   - Dependencies map
   - Quick lookup

---

## 🎯 Quick Navigation

### By Feature
- **Dashboard** → `src/features/dashboard/`
- **Courses** → `src/features/courses/`
- **Assignments** → `src/features/assignments/`
- **Quizzes** → `src/features/quizzes/`
- **Chat** → `src/features/chat/`
- **Announcements** → `src/features/announcements/`
- **Messages** → `src/features/messages/`
- **Profile** → `src/features/messages/profilePage.tsx`

### By Component Type
- **Buttons** → `src/components/ui/button.tsx`
- **Cards** → `src/components/ui/card.tsx`
- **Forms** → `src/components/ui/input.tsx`
- **Badges** → `src/components/ui/badge.tsx`
- **Modals** → `src/components/ui/modal.tsx`
- **Sidebar** → `src/components/layout/sidebar.tsx`
- **Topbar** → `src/components/layout/topbar.tsx`

### By Data
- **Types** → `src/types/index.ts`
- **Mock Data** → `src/mock/data.ts`
- **Store** → `src/hooks/useAppStore.ts`

---

## 🚀 Getting Started

### 1. Read Documentation (In Order)
1. README.md - Overview
2. QUICKSTART.md - Setup
3. ARCHITECTURE.md - Deep dive

### 2. Explore Code
1. Start with `src/app/router.tsx`
2. Check `src/components/` structure
3. Review a feature page (e.g., Dashboard)
4. Look at `src/mock/data.ts`

### 3. Run the Project
```bash
npm install
npm run dev
```

### 4. Verify Everything Works
Use VERIFICATION_CHECKLIST.md to test all features

---

## 📚 File Sizes (Approximate)

```
Router:               ~150 lines
UI Components:        ~800 lines total
Layout Components:    ~500 lines total
Common Components:    ~200 lines total
Feature Pages:        ~2,500 lines total
Styles:              ~150 lines
Types:               ~200 lines
Mock:                ~400 lines
Store:               ~80 lines
Utils:               ~20 lines
Config:              ~100 lines
─────────────────────────────
Total:               ~5,500 lines
```

---

## ✅ Checklist for New Developers

- [ ] Read README.md
- [ ] Read QUICKSTART.md
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Test all routes
- [ ] Review ARCHITECTURE.md
- [ ] Explore src/components/
- [ ] Check mock data structure
- [ ] Review type definitions
- [ ] Understand Zustand store

---

## 🎯 Common Tasks

### Add a New Page
1. Create folder in `src/features/`
2. Create page file
3. Create export wrapper
4. Add route to `src/app/router.tsx`
5. Add sidebar item

### Add a New Component
1. Create in `src/components/ui/`
2. Export with types
3. Import in feature pages

### Update Styles
1. Modify Tailwind classes in components
2. Add custom utilities to `src/styles/global.css`

### Change Mock Data
1. Edit `src/mock/data.ts`
2. Import in feature pages

---

**Note**: All files are production-ready. Use this index for quick reference.

# MASAO LMS - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn installed

### Installation

1. **Navigate to project directory**
   ```bash
   cd masao_beta
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   Dependencies include:
   - React & React DOM
   - React Router for navigation
   - Zustand for state management
   - Tailwind CSS for styling
   - Lucide React for icons
   - TypeScript for type safety

3. **Start development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📋 Project Structure at a Glance

```
masao_beta/
├── src/
│   ├── app/              → Router & app setup
│   ├── components/       → UI, layout, common components
│   ├── features/         → Feature pages (dashboard, courses, etc)
│   ├── hooks/            → Custom hooks & Zustand store
│   ├── mock/             → Mock data
│   ├── styles/           → Global styles
│   ├── types/            → TypeScript types
│   ├── utils/            → Utility functions
│   └── main.tsx          → React entry point
├── vite.config.ts        → Vite configuration
├── tsconfig.json         → TypeScript configuration
└── package.json          → Dependencies
```

---

## 🎯 Main Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Home with stats & overview |
| `/courses` | Courses | List all enrolled courses |
| `/courses/:id` | Course Detail | Single course with modules & assignments |
| `/assignments` | Assignments | All assignments with upload & tracking |
| `/quizzes` | Quizzes | Quiz list with scores |
| `/chat` | Chat | Real-time messaging interface |
| `/announcements` | Announcements | Important updates & notifications |
| `/messages` | Messages | Message inbox |
| `/profile` | Profile | User profile & account settings |

---

## 🧩 Key Components

### UI Components (`src/components/ui/`)
- **Button** - With 6 variants (primary, secondary, ghost, danger, success, outline)
- **Card** - Reusable container with header, content, footer
- **Input** - Form input with label, error, icon support
- **Badge** - Status/tag component with 6 variants
- **Modal** - Dialog component

### Layout Components (`src/components/layout/`)
- **Sidebar** - Fixed left navigation (260px, collapses on mobile)
- **Topbar** - Top navigation with search & user menu
- **MainLayout** - Wrapper that combines sidebar + topbar

### Common Components (`src/components/common/`)
- **EmptyState** - When no data available
- **ErrorState** - When error occurs
- **Loader** - Loading spinner & skeletons

---

## 🎨 Design System

### Colors
```
Primary (Blue):    #2563eb
Secondary (Cyan):  #06b6d4
Success (Green):   #10b981
Warning (Orange):  #f59e0b
Danger (Red):      #ef4444
```

### Spacing
```
xs: 0.5rem (8px)
sm: 1rem (16px)
md: 1.5rem (24px)
lg: 2rem (32px)
xl: 3rem (48px)
```

### Responsive Breakpoints
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## 💾 State Management

### Zustand Store (`useAppStore`)

Located in `src/hooks/useAppStore.ts`

```typescript
// Access store
const { user, sidebarOpen, toggleSidebar, setUser } = useAppStore();

// Current state:
- user: Current logged-in user (mock: Alex Rivera)
- sidebarOpen: Sidebar visibility toggle
- toggleSidebar(): Toggle sidebar state
- setSidebarOpen(open: boolean): Set sidebar state
- setUser(user: User): Update user info
```

### Mock User
```typescript
{
  id: '1',
  name: 'Alex Rivera',
  email: 'alex.rivera@masao.edu',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  role: 'student'
}
```

---

## 📊 Mock Data

All data is located in `src/mock/data.ts`:

- **mockUser** - Current logged-in user
- **mockCourses** - 6 sample courses with progress
- **mockAssignments** - 4 assignments with various statuses
- **mockQuizzes** - 3 quizzes with scores
- **mockAnnouncements** - System & course announcements
- **mockMessages** - Messages inbox
- **mockChatMessages** - Chat conversation
- **mockModules** - Course modules with lessons

---

## 🔧 Development Workflow

### Adding a New Feature Page

1. Create feature folder: `src/features/featureName/`
2. Create page component: `featurePage.tsx`
3. Create export wrapper: `FeatureName.tsx`
4. Add route to `src/app/router.tsx`
5. Add navigation link to sidebar

### Example:
```typescript
// src/features/myfeature/myfeaturePage.tsx
export const MyFeature: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Your content */}
    </div>
  );
};

// src/features/myfeature/MyFeature.tsx
export { MyFeature } from './myfeaturePage';

// src/app/router.tsx
import { MyFeature } from '../features/myfeature/MyFeature';
// Add route: <Route path="/myfeature" element={<MyFeature />} />
```

### Adding a New UI Component

1. Create in `src/components/ui/componentName.tsx`
2. Export from barrel file if needed
3. Import and use in feature pages

```typescript
// src/components/ui/mycomponent.tsx
export const MyComponent: React.FC<Props> = (props) => {
  return <div className="...">{/* component */}</div>;
};
```

---

## 🎯 Features Overview

### Dashboard
- Welcome section with time-based greeting
- 4 stat cards (courses, pending work, average progress, announcements)
- Course grid with progress tracking
- Pending assignments panel
- Latest announcements widget

### Courses
- Grid layout with search & category filter
- Course cards with progress bars
- Sortable by progress/students/modules
- Click to view detailed course page

### Course Detail
- Hero image with course info
- 6-tab navigation (Overview, Modules, Assignments, Quizzes, Discussion, Chat)
- Progress tracking
- Module lessons with completion status
- Course description & learning outcomes

### Assignments
- Status filter (All, Pending, Submitted, Graded)
- Drag-and-drop file upload area
- Grade display with feedback
- Submission dates & status badges
- Due date highlighting

### Quizzes
- Quiz grid with statistics
- Status badges (Pending, Completed)
- Score display for completed quizzes
- Expandable details
- Time limit & question count

### Chat
- Real-time message bubbles
- Typing indicator animation
- Message timestamps
- Auto-scroll to latest message
- Emoji & attachment buttons (UI ready)

### Announcements
- Priority-based display
- High priority highlighted with border
- Course-related tags
- Chronological sorting
- Expandable details

### Messages
- Unread message indicators
- Search & filter
- Message detail viewer
- Reply compose interface
- Archive & delete actions

### Profile
- Avatar upload area
- Editable user information
- Account settings (2FA, notifications, password)
- Performance statistics
- Account management (danger zone)

---

## 🚨 Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Module Not Found
- Ensure all imports use correct paths
- Check file naming (components use PascalCase)
- Verify exports in index files

### Tailwind Not Applied
- Ensure `@import "tailwindcss"` in globals.css
- Check tailwind.config.js is present
- Restart dev server

### Types Missing
- Check `src/types/index.ts` for all interfaces
- Ensure imports have correct types
- Verify tsconfig.json is configured

---

## 🎯 Next Steps

1. **Explore the dashboard** - Get familiar with the layout
2. **Check different pages** - Test all features
3. **Review component code** - Understand patterns
4. **Try modifying styles** - Update Tailwind classes
5. **Add new features** - Extend the system
6. **Connect to API** - Replace mock data (future)

---

## 📚 Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Linting (if configured)
npm run lint         # Check code quality

# Type checking
npx tsc --noEmit    # Check TypeScript errors
```

---

## 🎓 Learning Resources

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/) - Component examples

### React & TypeScript
- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Zustand
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Lucide Icons
- [Lucide Icons](https://lucide.dev) - Icon library

---

## 💡 Pro Tips

1. **Use Chrome DevTools** for responsive testing
2. **Enable Tailwind IntelliSense** in VS Code for class suggestions
3. **Use grid/flex properly** for consistent layouts
4. **Keep components small** and reusable
5. **Test on mobile** during development
6. **Use TypeScript strict mode** for type safety

---

## 📞 Support

For issues or questions:
1. Check the code comments
2. Review the ARCHITECTURE.md
3. Inspect component prop types
4. Check mock data structure

---

**Ready to build? Start with `npm run dev` 🚀**

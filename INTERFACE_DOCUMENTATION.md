# Smart Campus - Interface Documentation

This document provides a comprehensive overview of the three user interfaces developed for the Smart Campus application, based on the use case diagrams provided.

## Overview

The Smart Campus application provides three distinct interfaces for different user roles:
- **Student Interface** - For students to manage their academic life
- **Parent Interface** - For parents to track their children's progress
- **Teacher Interface** - For teachers to manage classes and track student progress

## Architecture

### Technology Stack
- **Frontend**: Angular 19.2.0
- **Styling**: SCSS with CSS Custom Properties
- **HTTP Client**: Angular HttpClient for API communication
- **Routing**: Angular Router with lazy-loaded modules

### Project Structure
```
src/app/
├── pages/
│   ├── student/           # Student interface components
│   ├── parent/           # Parent interface components
│   └── teacher/          # Teacher interface components
├── services/             # Data services
│   ├── student.service.ts
│   ├── parent.service.ts
│   └── teacher.service.ts
└── styles.scss          # Global styling
```

## Student Interface

### Dashboard (`/dashboard`)
**Purpose**: Central hub for students to access all academic functionalities.

**Features**:
- Academic statistics overview (average grades, attendance rate)
- Quick access to notes, schedules, and messages
- Personal profile management
- Upcoming events and notifications

**Components**:
- `DashboardComponent` - Main dashboard with feature cards
- Statistics display for grades and attendance
- Navigation to specialized sections

### Academic Tracking
**Features**:
- **Notes Consultation** (`/student/my-notes`) - View grades and teacher feedback
- **Attendance Tracking** (`/student/my-seances`) - Monitor class attendance
- **Schedule Management** (`/student/emploi-temps`) - Access class schedules

### Communication
**Features**:
- **Messaging System** (`/student/messages`) - Communicate with teachers
- **Notifications** (`/student/notifications`) - Receive important alerts

### Personal Profile
**Features**:
- View and update personal information
- Manage account settings

## Parent Interface

### Dashboard (`/parent/dashboard`)
**Purpose**: Comprehensive overview of all children's academic progress.

**Features**:
- Multi-child management dashboard
- Global statistics (average grades, attendance across all children)
- Quick access to each child's detailed information
- Recent notifications and upcoming events

**Key Components**:
- `ParentDashboardComponent` - Main dashboard
- Children overview cards with individual statistics
- Feature navigation grid

### Child Tracking (`/parent/child-tracking`)
**Purpose**: Detailed profile management for each child.

**Features**:
- View detailed child profiles
- Edit personal information
- Manage emergency contacts
- Track medical information (allergies, etc.)

### Academic Monitoring
**Features**:
- **Notes Consultation** (`/parent/child-notes`) - View children's grades
- **Attendance Monitoring** (`/parent/child-presence`) - Track attendance and justify absences
- **Schedule Access** (`/parent/planning`) - View children's schedules and events

### Communication
**Features**:
- **Teacher Communication** (`/parent/messages`) - Exchange messages with teachers
- **Notifications** (`/parent/notifications`) - Receive alerts about children

## Teacher Interface

### Dashboard (`/teacher/dashboard`)
**Purpose**: Central control panel for managing classes and tracking student progress.

**Features**:
- Class and student statistics overview
- Today's session management
- Quick access to attendance marking and grading
- Top-performing students display
- Recent messages and notifications

**Key Components**:
- `TeacherDashboardComponent` - Main dashboard
- Today's sessions with quick action buttons
- Statistics cards for classes, students, and assignments

### Session Management (`/teacher/sessions`)
**Purpose**: Complete session lifecycle management.

**Features**:
- Create, edit, and delete class sessions
- Define session content and pedagogical objectives
- Manage different session types (Course, TD, TP, Exam)
- Quick attendance marking
- Session details and planning

**Key Components**:
- `SessionManagementComponent` - Full CRUD operations for sessions
- Session form with comprehensive fields
- Session list with filtering and status indicators

### Pedagogical Tracking
**Features**:
- **Student Profiles** (`/teacher/student-profiles`) - Access detailed student information
- **Progress Tracking** (`/teacher/progress-tracking`) - Monitor individual student progress
- **Results Analysis** (`/teacher/results-analysis`) - Analyze class performance

### Planning & Communication
**Features**:
- **Schedule Management** (`/teacher/planning`) - Manage teaching schedule
- **Messaging** (`/teacher/messages`) - Communicate with parents and colleagues
- **Notifications** (`/teacher/notifications`) - Send and receive important alerts

## Services Architecture

### Student Service (`student.service.ts`)
**Responsibilities**:
- Dashboard statistics management
- Academic data (notes, attendance, sessions)
- Personal profile management
- Communication features

**Key Methods**:
- `getDashboardStats()` - Retrieve student statistics
- `getMyNotes()` - Fetch student grades
- `getMyPresences()` - Get attendance records
- `getMySchedule()` - Retrieve class schedule

### Parent Service (`parent.service.ts`)
**Responsibilities**:
- Multi-child data management
- Child profile operations
- Academic monitoring across children
- Parent-teacher communication

**Key Methods**:
- `getMyChildren()` - Retrieve children list
- `getChildProfile(childId)` - Get detailed child information
- `getChildNotes(childId)` - Fetch child's grades
- `getChildPresences(childId)` - Get child's attendance

**Interfaces**:
- `Child` - Child profile structure
- `ChildNote` - Grade information
- `ChildPresence` - Attendance record

### Teacher Service (`teacher.service.ts`)
**Responsibilities**:
- Session lifecycle management
- Student data access and management
- Class performance analytics
- Educational planning tools

**Key Methods**:
- `getMySessions()` - Retrieve teacher's sessions
- `createSession(session)` - Create new session
- `getMyStudents()` - Get students list
- `markPresence(sessionId, presences)` - Record attendance

**Interfaces**:
- `Session` - Class session structure
- `Student` - Student profile for teachers
- `SessionPresence` - Attendance marking

## Design System

### Color Scheme
- **Primary**: #4f46e5 (Indigo)
- **Secondary**: #7c3aed (Purple)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Amber)
- **Danger**: #ef4444 (Red)
- **Info**: #3b82f6 (Blue)

### Component Patterns
- **Dashboard Cards**: Consistent stat display with icons and color coding
- **Feature Cards**: Hover effects with navigation capabilities
- **Sidebar Navigation**: Collapsible sidebar for sub-navigation
- **Form Layouts**: Grid-based responsive forms
- **Status Indicators**: Color-coded elements for grades, attendance, etc.

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Collapsible navigation on mobile devices
- Touch-friendly interactive elements

## Navigation & Routing

### Route Structure
```
/login                    # Authentication
/dashboard               # Student dashboard
/parent/*                # Parent module (lazy-loaded)
/teacher/*               # Teacher module (lazy-loaded)
/admin/*                 # Admin module (existing)
```

### Lazy Loading
Each user interface is implemented as a separate Angular module with lazy loading for optimal performance:
- `ParentModule` - Loaded only when accessing parent routes
- `TeacherModule` - Loaded only when accessing teacher routes

## Data Flow

### Authentication Flow
1. User logs in through `/login`
2. Role-based redirection to appropriate interface
3. Token-based authentication for API calls

### State Management
- Services handle data fetching and caching
- Observable patterns for reactive updates
- Local state management within components

## Future Enhancements

### Planned Features
1. **Real-time Notifications** - WebSocket integration
2. **File Upload/Download** - Document management
3. **Calendar Integration** - Advanced scheduling
4. **Analytics Dashboard** - Advanced reporting
5. **Mobile App** - Native mobile applications
6. **Offline Capability** - PWA features

### Technical Improvements
1. **State Management** - NgRx implementation
2. **Testing** - Comprehensive unit and e2e tests
3. **Performance** - Advanced optimization techniques
4. **Accessibility** - WCAG compliance
5. **Internationalization** - Multi-language support

## Installation & Setup

### Prerequisites
- Node.js 18+
- Angular CLI 19+

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build --prod
```

### Environment Configuration
Configure API endpoints in `src/environments/`:
- `environment.ts` - Development
- `environment.prod.ts` - Production

## Testing

### Unit Testing
```bash
ng test
```

### E2E Testing
```bash
ng e2e
```

## Deployment

### Build Commands
```bash
# Development build
ng build

# Production build
ng build --configuration production
```

### Server Configuration
Ensure proper routing configuration for SPA on your web server.

---

*This documentation provides a comprehensive overview of the Smart Campus interfaces. For technical implementation details, refer to the component and service source code.*
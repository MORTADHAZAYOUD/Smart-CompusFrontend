# SmartCampus Student Interface

A comprehensive Angular-based student portal for educational ERP systems, featuring modern UI/UX design and responsive functionality.

## 🚀 Features

### Core Modules
- **Dashboard**: Overview with statistics, charts, and recent activities
- **Profile Management**: View and edit personal information with photo upload
- **Academic Records**: View grades, notes, and performance analytics
- **Attendance Tracking**: Monitor presence history and attendance rates
- **Schedule Management**: View weekly schedule and upcoming sessions
- **Event Calendar**: Browse school events and academic activities
- **Messaging System**: Communicate with teachers and administrators
- **Notifications**: Real-time alerts and important updates

### Technical Features
- **Responsive Design**: Mobile-first approach with tablet and desktop support
- **Modern UI**: Angular Material components with custom styling
- **Real-time Data**: Observable-based data management
- **Performance Charts**: ngx-charts integration for analytics
- **Form Validation**: Comprehensive form handling with error management
- **Accessibility**: WCAG compliant with focus states and screen reader support

## 🛠️ Technology Stack

- **Frontend**: Angular 17+
- **UI Framework**: Angular Material
- **Charts**: ngx-charts
- **Styling**: SCSS with CSS Grid and Flexbox
- **State Management**: RxJS Observables
- **Routing**: Angular Router with lazy loading

## 📁 Project Structure

```
src/app/features/student/
├── components/
│   ├── student-dashboard/          # Main dashboard with stats and charts
│   ├── student-profile/            # Profile management with form editing
│   ├── student-layout/             # Main layout with sidebar navigation
│   ├── student-notes/              # Academic records and grades
│   ├── student-attendance/         # Attendance tracking
│   ├── student-sessions/           # Class sessions management
│   ├── student-schedule/           # Weekly schedule view
│   ├── student-events/             # School events calendar
│   ├── student-messages/           # Messaging system
│   └── student-notifications/      # Notification center
├── shared/components/
│   ├── dashboard-card/             # Reusable stat cards
│   ├── notification-item/          # Notification display component
│   ├── schedule-item/              # Schedule entry component
│   ├── event-card/                 # Event display component
│   ├── message-item/               # Message display component
│   ├── performance-chart/          # Performance analytics chart
│   └── attendance-chart/           # Attendance analytics chart
├── services/
│   └── student.service.ts          # API service with mock data
├── student.module.ts               # Feature module configuration
└── student.routes.ts               # Routing configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: #2196F3 (Blue)
- **Secondary**: #4CAF50 (Green)
- **Warning**: #FF9800 (Orange)
- **Error**: #F44336 (Red)
- **Success**: #4CAF50 (Green)
- **Info**: #2196F3 (Blue)

### Typography
- **Headings**: Roboto, 600-700 weight
- **Body**: Roboto, 400 weight
- **Captions**: Roboto, 500 weight

### Components
- **Cards**: Rounded corners (12px), subtle shadows
- **Buttons**: Material Design with hover effects
- **Forms**: Outline style with validation states
- **Charts**: Custom color schemes with animations

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

## 🔧 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install @angular/material @angular/cdk ngx-charts chart.js @types/chart.js
   ```

2. **Import Student Module**
   ```typescript
   // app.routes.ts
   {
     path: 'student',
     loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule)
   }
   ```

3. **Configure Material Theme**
   ```scss
   // styles.scss
   @import '@angular/material/prebuilt-themes/indigo-pink.css';
   ```

## 🚀 Usage

### Navigation
Access the student interface at `/student/dashboard` after login.

### Key Features

#### Dashboard
- **Global Statistics**: Average grades, attendance rate, upcoming sessions
- **Performance Charts**: Subject-wise performance visualization
- **Recent Activities**: Latest grades and notifications
- **Quick Actions**: Direct access to main features

#### Profile Management
- **Personal Information**: Edit name, email, phone, address
- **Photo Upload**: Change profile picture with preview
- **Academic Info**: View student ID, class, grade (read-only)
- **Parent Information**: Update parent/guardian details

#### Data Management
- **Mock Data**: Comprehensive test data for all features
- **API Integration**: Ready for backend integration
- **Error Handling**: Graceful error states and user feedback
- **Loading States**: Smooth loading animations

## 📊 Mock Data Structure

### Student Profile
```typescript
interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  studentId: string;
  class: string;
  grade: string;
  phone: string;
  address: string;
  birthDate: string;
  parentName: string;
  parentPhone: string;
}
```

### Academic Records
```typescript
interface Note {
  id: number;
  subject: string;
  subjectCode: string;
  note: number;
  maxNote: number;
  coefficient: number;
  date: string;
  teacher: string;
  type: 'exam' | 'homework' | 'project' | 'quiz';
  comment?: string;
}
```

### Attendance
```typescript
interface Attendance {
  id: number;
  date: string;
  subject: string;
  teacher: string;
  status: 'present' | 'absent' | 'justified' | 'late';
  justification?: string;
  session: string;
}
```

## 🎯 Best Practices

### Performance
- **Lazy Loading**: Feature modules loaded on demand
- **OnPush Strategy**: Optimized change detection
- **Memory Management**: Proper subscription cleanup
- **Image Optimization**: Responsive images with proper sizing

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG AA compliant

### Code Quality
- **TypeScript**: Strict typing throughout
- **ESLint**: Code quality enforcement
- **Component Architecture**: Reusable, testable components
- **Service Pattern**: Centralized data management

## 🔮 Future Enhancements

### Planned Features
- **Real-time Notifications**: WebSocket integration
- **Offline Support**: Service Worker implementation
- **Advanced Analytics**: Detailed performance insights
- **Mobile App**: Progressive Web App (PWA)
- **Dark Mode**: Theme switching capability
- **Internationalization**: Multi-language support

### Technical Improvements
- **State Management**: NgRx integration for complex state
- **Testing**: Comprehensive unit and e2e tests
- **Performance**: Virtual scrolling for large datasets
- **Security**: Enhanced authentication and authorization

## 📝 API Integration

The service is designed for easy backend integration:

```typescript
// student.service.ts
private apiUrl = '/api/student';

getStudentProfile(): Observable<Student> {
  return this.http.get<Student>(`${this.apiUrl}/profile`);
}

updateStudentProfile(student: Partial<Student>): Observable<Student> {
  return this.http.put<Student>(`${this.apiUrl}/profile`, student);
}
```

## 🎨 Customization

### Theming
```scss
// Custom theme variables
$primary-color: #2196F3;
$secondary-color: #4CAF50;
$background-color: #f5f5f5;
$text-color: #333;
```

### Component Styling
```scss
// Custom component styles
.dashboard-card {
  @include material-card;
  @include responsive-grid;
}
```

## 📞 Support

For questions or issues:
- **Documentation**: Check inline comments and TypeScript interfaces
- **Examples**: Review mock data structure for implementation
- **Testing**: Use provided mock data for development

---

**SmartCampus Student Interface** - Empowering students with modern, accessible, and feature-rich educational technology.
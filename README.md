# SmartCampus - Student Interface

A modern, responsive Angular frontend for the SmartCampus Educational ERP system, designed specifically for students to manage their academic journey.

## 🚀 Features

### 📊 Dashboard
- **Global Academic Performance**: Real-time GPA and academic standing
- **Attendance Tracking**: Visual attendance rate with historical data
- **Interactive Charts**: Performance analysis with ngx-charts
- **Quick Actions**: Easy access to most-used features
- **Notification Center**: Recent alerts and important updates

### 👨‍🎓 Student Features
- **Profile Management**: View and update personal information
- **Academic Records**: Comprehensive grade tracking and analysis
- **Attendance History**: Detailed attendance records with status indicators
- **Class Schedule**: Weekly and daily schedule management
- **Session Management**: Upcoming and past class sessions
- **Event Calendar**: School events and important dates
- **Messaging System**: Communication with teachers and administration
- **Smart Notifications**: Real-time alerts for grades, attendance, and events

## 🛠 Technology Stack

### Frontend Framework
- **Angular 17+**: Latest Angular framework with standalone components
- **Angular Material**: Modern UI components library
- **Angular CDK**: Component development kit for advanced UI patterns

### Charts & Visualization  
- **ngx-charts**: Powerful charting library based on D3.js
- **D3.js**: Data visualization and manipulation

### State Management & HTTP
- **RxJS**: Reactive programming with Observables
- **Angular HttpClient**: API communication
- **BehaviorSubject**: State management for user data

### Responsive Design
- **CSS Grid & Flexbox**: Modern layout techniques
- **Angular Material Breakpoints**: Responsive breakpoint detection
- **Mobile-first Design**: Optimized for all device sizes

## 📱 UI/UX Design

### Design Principles
- **Clean & Modern**: Minimalist interface focused on content
- **Educational Context**: UI elements designed for academic environments
- **Accessibility First**: WCAG compliant design patterns
- **Performance Optimized**: Fast loading with efficient rendering

### Color Scheme
- **Primary**: `#667eea` (Modern blue-purple gradient)
- **Secondary**: `#764ba2` (Complementary purple)
- **Success**: `#4caf50` (Green for positive actions)
- **Warning**: `#ff9800` (Orange for attention)
- **Error**: `#f44336` (Red for alerts)

### Typography & Icons
- **Material Icons**: Consistent iconography
- **Responsive Typography**: Fluid text scaling
- **Clear Hierarchy**: Well-defined information structure

## 🏗 Project Structure

```
src/app/modules/student/
├── components/
│   ├── student-layout/           # Main layout with navigation
│   ├── student-dashboard/        # Dashboard with charts and widgets
│   ├── student-profile/          # Profile management
│   ├── student-notes/            # Academic grades and performance
│   ├── student-attendance/       # Attendance tracking
│   ├── student-sessions/         # Class session management
│   ├── student-schedule/         # Weekly schedule view
│   ├── student-events/           # Event calendar
│   ├── student-messages/         # Messaging system
│   ├── student-notifications/    # Notification center
│   └── shared/                   # Reusable components
│       ├── stat-card/            # Statistics display cards
│       ├── schedule-item/        # Schedule item component
│       ├── notification-item/    # Notification display
│       └── event-card/           # Event display card
├── services/
│   └── student.service.ts        # API service with mock data
├── student-routing.module.ts     # Routing configuration
└── student.module.ts             # Module definition
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm 9+
- Angular CLI 17+

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd smartcampus-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Angular CLI (if not installed)**
```bash
npm install -g @angular/cli@17
```

4. **Install Angular Material**
```bash
ng add @angular/material
```

5. **Start development server**
```bash
npm start
# or
ng serve
```

6. **Open in browser**
```
http://localhost:4200
```

## 📋 Available Scripts

```bash
# Development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Build and watch for changes
npm run watch
```

## 🎯 Component Overview

### Core Components

#### **StudentDashboardComponent**
- Real-time performance metrics
- Interactive charts (bar charts, pie charts)
- Recent activity feed
- Quick navigation cards

#### **StudentLayoutComponent** 
- Responsive sidebar navigation
- Mobile-optimized menu
- User profile header
- Breadcrumb navigation

#### **StudentProfileComponent**
- Editable profile form
- Photo upload functionality
- Academic information display
- Contact details management

#### **StudentNotesComponent**
- Comprehensive grade tracking
- Subject-wise performance analysis
- Weighted average calculations
- Historical grade trends

### Shared Components

#### **StatCardComponent**
- Configurable statistics display
- Progress indicators
- Color-coded status
- Trend visualization

#### **ScheduleItemComponent**
- Class session information
- Teacher and room details
- Time and date formatting
- Session type indicators

## 🔌 API Integration

### Service Architecture
```typescript
// Example API endpoints (configured in student.service.ts)
/api/student/profile     // Student profile data
/api/student/notes       // Academic grades
/api/student/attendance  // Attendance records
/api/student/schedule    // Weekly schedule
/api/student/sessions    // Class sessions
/api/student/events      // School events
/api/student/messages    // Messages
/api/student/notifications // Notifications
```

### Mock Data
The application includes comprehensive mock data for development and testing:
- Student profiles with realistic information
- Academic grades across multiple subjects
- Attendance records with various statuses
- Event calendar with different event types
- Message threads with teachers and administration

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Mobile Features
- Collapsible sidebar navigation
- Touch-friendly interface
- Optimized chart rendering
- Simplified data tables
- Gesture support

## 🎨 Theming & Customization

### Material Theme Configuration
```scss
// Custom theme colors in styles.scss
$primary-palette: mat-palette($mat-indigo);
$accent-palette: mat-palette($mat-purple);
$warn-palette: mat-palette($mat-red);
```

### CSS Custom Properties
```scss
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #4caf50;
  --warning-color: #ff9800;
  --error-color: #f44336;
}
```

## 🚀 Performance Optimizations

### Angular Optimizations
- **OnPush Change Detection**: Improved rendering performance
- **Lazy Loading**: Module-based code splitting  
- **TrackBy Functions**: Efficient list rendering
- **Async Pipe**: Automatic subscription management

### Bundle Optimization
- **Tree Shaking**: Remove unused code
- **Code Splitting**: Optimized chunk loading
- **Asset Optimization**: Compressed images and fonts
- **Service Worker**: PWA capabilities (optional)

## 🔒 Security Features

### Authentication Ready
- JWT token integration structure
- Route guards implementation
- Role-based access control foundation
- Secure API communication patterns

### Data Protection
- Input sanitization
- XSS prevention
- CSRF protection considerations
- Secure storage patterns

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

## 🧪 Testing Strategy

### Unit Testing
```bash
# Run unit tests
npm test

# Run tests with coverage
ng test --code-coverage
```

### E2E Testing
```bash
# Run e2e tests
ng e2e
```

## 📈 Future Enhancements

### Planned Features
- **PWA Support**: Offline functionality and push notifications
- **Dark Mode**: Complete dark theme implementation
- **Multi-language**: i18n internationalization
- **Advanced Analytics**: Detailed performance insights
- **Real-time Updates**: WebSocket integration
- **File Upload**: Document and assignment submission
- **Calendar Integration**: Export to external calendars

### Technical Improvements
- **State Management**: NgRx implementation for complex state
- **Caching Strategy**: Advanced caching with service workers
- **Performance Monitoring**: Analytics and performance tracking
- **Accessibility**: Enhanced WCAG 2.1 compliance

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**SmartCampus Development Team**
- Frontend Architecture: Angular & Material Design
- UI/UX Design: Student-centered interface design
- Backend Integration: Symfony API connectivity

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**Built with ❤️ for educational excellence**

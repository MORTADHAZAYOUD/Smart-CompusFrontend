# 🎓 Teacher Dashboard - Smart Campus ERP System

A modern, responsive Angular interface for teachers in a school ERP system. This dashboard provides comprehensive tools for session management, student monitoring, communication, and analytics.

## 📋 Features

### 🏫 Core Functionality

1. **Session Management**
   - View, create, edit, and delete class sessions (courses, assignments, exams)
   - Mark student attendance with intuitive interface
   - Assign grades to students per session
   - Session filtering and search capabilities

2. **Student Monitoring**
   - View filtered list of students by class
   - Access individual student profiles (name, email, class, status, optional photo)
   - Track student progression and analyze performance
   - Attendance history and analytics

3. **Calendar Integration**
   - Display weekly calendar of upcoming sessions and activities
   - Filter calendar by class, subject, or date
   - Visual session type indicators

4. **Communication**
   - Send and receive messages in a simple messaging interface
   - List conversations (1:1 or group) with unread badges
   - Message history and search functionality

5. **Notifications**
   - Display notifications about absences, new grades, upcoming sessions, or new messages
   - Visual indicators for unread alerts
   - Priority-based notification system

6. **Dashboard Analytics**
   - Statistics overview (average grades, attendance rate)
   - Interactive charts (bar, pie) for data visualization
   - Performance metrics and trends

## 🛠 Technology Stack

- **Framework**: Angular 19.2
- **UI Library**: Angular Material 19.2
- **Charts**: NGX Charts 23.0
- **Styling**: SCSS with custom design system
- **HTTP Client**: Angular HttpClient for API communication
- **Authentication**: JWT token-based authentication
- **Responsive Design**: CSS Grid and Flexbox

## 🏗 Project Structure

```
src/app/
├── core/
│   └── guards/
│       └── teacher.guard.ts          # Role-based access control
├── services/
│   ├── teacher.service.ts            # Main teacher API service
│   └── auth.service.ts               # Authentication service
└── pages/
    └── teacher/
        ├── teacher.module.ts         # Teacher feature module
        ├── teacher-routing.module.ts # Teacher routes
        ├── teacher-layout/           # Main layout with sidebar
        ├── teacher-dashboard/        # Dashboard with stats & charts
        ├── session-management/       # CRUD operations for sessions
        ├── student-monitoring/       # Student lists & profiles
        ├── calendar/                 # Calendar integration
        ├── messaging/                # Communication interface
        ├── notifications/            # Notification center
        └── shared/                   # Reusable components
            ├── session-dialog/       # Session create/edit dialog
            ├── attendance-dialog/    # Attendance marking
            ├── grade-dialog/         # Grade assignment
            └── ...                   # Other shared components
```

## 🎨 Design System

### Color Palette
- **Primary**: `#1976d2` (Blue)
- **Accent**: `#ff9800` (Orange)
- **Success**: `#4caf50` (Green)
- **Warning**: `#f44336` (Red)
- **Background**: `#f5f5f5` (Light Gray)
- **Surface**: `#ffffff` (White)

### Typography
- **Headers**: Roboto, 600 weight
- **Body**: Roboto, 400 weight
- **Captions**: Roboto, 300 weight

### Components
- **Cards**: 12px border radius, subtle shadows
- **Buttons**: Material Design with custom styling
- **Forms**: Outlined form fields
- **Tables**: Clean, sortable with pagination
- **Charts**: Interactive with consistent color scheme

## 🔧 API Integration

The dashboard integrates with a Symfony backend through RESTful APIs:

### Endpoints
- `GET /api/seances` - Fetch sessions
- `POST /api/seances` - Create session
- `PUT /api/seances/{id}` - Update session
- `DELETE /api/seances/{id}` - Delete session
- `GET /api/students` - Fetch students
- `GET /api/attendance/session/{id}` - Get attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/notes/session/{id}` - Get grades
- `POST /api/notes` - Assign grades
- `GET /api/messages` - Fetch messages
- `POST /api/messages` - Send message
- `GET /api/notifications` - Get notifications
- `GET /api/teacher/stats` - Dashboard statistics

### Authentication
- JWT token stored in localStorage
- Bearer token authentication
- Role-based access control (teacher role required)
- Automatic token refresh handling

## 📱 Responsive Design

The dashboard is fully responsive across all devices:

- **Desktop** (1200px+): Full sidebar navigation, multi-column layouts
- **Tablet** (768px-1199px): Collapsible sidebar, optimized grid layouts
- **Mobile** (320px-767px): Overlay sidebar, single-column layouts, touch-optimized

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Angular CLI 19+
- Symfony backend API running on `http://localhost:8000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-campus-teacher-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Update the API URL in `src/app/services/teacher.service.ts`:
   ```typescript
   private readonly API_URL = 'http://your-api-domain.com/api';
   ```

4. **Start the development server**
   ```bash
   ng serve
   ```

5. **Access the application**
   Open `http://localhost:4200/teacher` in your browser

### Login Requirements
- Valid teacher credentials
- User role must be set to 'teacher'
- JWT token will be stored automatically upon successful login

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Route Guards**: Role-based access control
- **HTTPS Ready**: Production-ready security headers
- **Input Validation**: Form validation and sanitization
- **XSS Protection**: Angular's built-in security features

## 📊 Performance Optimizations

- **Lazy Loading**: Feature modules loaded on demand
- **OnPush Change Detection**: Optimized component updates
- **Virtual Scrolling**: Efficient handling of large datasets
- **Image Optimization**: Responsive images with lazy loading
- **Bundle Splitting**: Optimized chunk sizes for faster loading

## 🧪 Testing

### Unit Tests
```bash
ng test
```

### E2E Tests
```bash
ng e2e
```

### Linting
```bash
ng lint
```

## 📦 Build & Deployment

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --prod
```

### Docker Deployment
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN ng build --prod

FROM nginx:alpine
COPY --from=build /app/dist/smart-campus /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔮 Future Enhancements

### Planned Features
- [ ] Real-time notifications with WebSocket
- [ ] Advanced reporting and analytics
- [ ] Mobile app companion
- [ ] Offline mode support
- [ ] Multi-language support (i18n)
- [ ] Advanced calendar features (recurring sessions)
- [ ] File upload and document management
- [ ] Parent-teacher communication portal
- [ ] Grade book export (PDF, Excel)
- [ ] Advanced student performance analytics

### Technical Improvements
- [ ] PWA capabilities
- [ ] Service worker for caching
- [ ] Advanced state management (NgRx)
- [ ] Micro-frontend architecture
- [ ] Advanced testing coverage
- [ ] Performance monitoring
- [ ] Accessibility improvements (WCAG 2.1)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Email: support@smartcampus.edu
- Documentation: [docs.smartcampus.edu](https://docs.smartcampus.edu)
- Issues: [GitHub Issues](https://github.com/smartcampus/teacher-dashboard/issues)

---

**Built with ❤️ for educators worldwide**
# Frontend Integration Guide

## 🚀 Backend Status
✅ **BACKEND IS NOW READY!** The backend server (`src/server.ts`) has been updated to handle all frontend requests properly.

## 📋 What's Been Fixed in Backend

### 1. Server Configuration ✅
- **Port**: Changed from 4000 to 8000 (matches frontend expectations)
- **CORS**: Configured for `http://localhost:4200`
- **Middleware**: Added JSON parsing and error handling
- **Static files**: Properly configured for Angular SSR

### 2. API Endpoints Added ✅

#### Authentication APIs
- `POST /api/register` - User registration (all user types)
- `POST /api/login` - User authentication with type-based routing

#### Admin APIs
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/dashboard/activities` - Recent activities
- `GET/POST/PUT/DELETE /api/admin/students` - Student management
- `GET/POST/PUT/DELETE /api/admin/teachers` - Teacher management
- `GET/POST/PUT/DELETE /api/admin/classes` - Class management
- `GET/POST/PUT/DELETE /api/admin/schedules` - Schedule management
- `GET /api/admin/reports/*` - Various reports
- `GET/PUT /api/admin/settings` - Settings management
- `GET /api/admin/registrations/pending` - Pending registrations

#### Student APIs
- `GET /api/student/profile` - Student profile
- `PUT /api/student/profile` - Update profile
- `GET /api/student/dashboard/stats` - Dashboard stats
- `GET /api/student/grades` - Student grades
- `GET /api/student/attendance` - Attendance records
- `GET /api/student/schedule` - Class schedule
- `GET /api/student/sessions` - Upcoming sessions
- `GET /api/student/notifications` - Notifications
- `PATCH /api/student/notifications/:id/read` - Mark notification as read

#### Teacher APIs (Basic structure for future)
- `GET /api/teacher/profile` - Teacher profile
- `GET /api/teacher/classes` - Teacher's classes

#### Parent APIs (Basic structure for future)
- `GET /api/parent/profile` - Parent profile
- `GET /api/parent/children/:childId/grades` - Child's grades

## 🔧 Frontend Improvements to Add

### 1. HttpClient Integration for Student Service

**Current Status**: Student service uses mock data with `Observable.of()`
**Recommended Update**: Add HTTP calls for real-time data

```typescript
// Update src/app/services/student.service.ts
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/api/student';

  constructor(private http: HttpClient) {}

  // Replace mock data methods with HTTP calls
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/grades`);
  }

  getAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/attendance`);
  }

  // ... add other methods
}
```

### 2. Error Handling Enhancement

**Add Global Error Interceptor**:
```typescript
// Create src/app/interceptors/error.interceptor.ts
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirect to login
          window.location.href = '/login';
        }
        return throwError(() => error);
      })
    );
  }
}
```

### 3. Authentication Guard

**Create Route Guards**:
```typescript
// Create src/app/guards/auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
```

### 4. Environment Configuration

**Update environment files**:
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-production-domain.com/api'
};
```

### 5. Loading States and User Feedback

**Add Loading Service**:
```typescript
// Create src/app/services/loading.service.ts
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }
}
```

### 6. Navigation Improvements

**Update Login Component Navigation** ✅ (Already done)
- Login now routes based on user type (admin/teacher/parent/student)

### 7. Data Refresh Implementation

**Add automatic data refresh**:
```typescript
// In components, add refresh intervals
ngOnInit() {
  this.loadData();
  
  // Refresh every 5 minutes
  setInterval(() => {
    this.loadData();
  }, 5 * 60 * 1000);
}
```

## 🚀 How to Start the Application

### 1. Start the Backend Server
```bash
npm run build
npm run serve:ssr:SmartCompus
```
**Note**: Server will run on port 8000 (not 4000)

### 2. Start the Frontend Development Server
```bash
ng serve
```
**Note**: Frontend runs on port 4200

### 3. Test the Integration
1. Navigate to `http://localhost:4200`
2. Try registration: Test with different user types
3. Try login: Use registered credentials
4. Check different dashboards based on user type

## 🔧 Optional Enhancements

### 1. Real Database Integration
- Replace in-memory arrays with actual database (PostgreSQL, MongoDB, etc.)
- Add proper user authentication with JWT verification

### 2. File Upload Support
- Add profile picture upload
- Document upload for students

### 3. Real-time Features
- WebSocket integration for notifications
- Live attendance tracking

### 4. Progressive Web App (PWA)
- Offline support
- Push notifications

### 5. Advanced Security
- JWT token refresh mechanism
- Role-based access control
- API rate limiting

## 🐛 Common Issues & Solutions

### Issue: CORS Errors
**Solution**: CORS is configured for `http://localhost:4200`. If using different port, update the CORS configuration in `server.ts`.

### Issue: 404 on API Calls
**Solution**: Ensure backend server is running on port 8000 and APIs match the defined endpoints.

### Issue: Navigation Errors
**Solution**: Check that the routes in `app.routes.ts` match the navigation calls in components.

### Issue: Authentication Not Working
**Solution**: Verify that `localStorage.setItem('token', res.token)` is working and token is being included in API calls.

## 📝 Next Steps Priority

1. **High Priority**: Update StudentService to use HTTP calls instead of mock data
2. **Medium Priority**: Add error interceptor and loading states
3. **Low Priority**: Add advanced features like real-time updates

The backend is fully functional and ready to handle all frontend requests. The current application should work out-of-the-box for basic functionality!
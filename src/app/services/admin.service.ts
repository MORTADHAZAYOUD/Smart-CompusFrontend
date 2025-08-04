import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Student {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  dateNaissance: string;
  classe_id: number;
  classe_name?: string;
  telephone?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
}

export interface Teacher {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  specialite: string;
  telephone?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface ClassInfo {
  id: number;
  name: string;
  level: string;
  speciality: string;
  capacity: number;
  currentStudents: number;
  teacherId?: number;
  teacherName?: string;
  status: 'active' | 'inactive';
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  activeSchedules: number;
  todayAttendance: number;
  pendingRegistrations: number;
  monthlyRegistrations: number[];
  attendanceRate: number[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient) {}

  // Dashboard methods
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`)
      .pipe(catchError(this.handleError));
  }

  getRecentActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard/activities`)
      .pipe(catchError(this.handleError));
  }

  // Student management methods
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`)
      .pipe(catchError(this.handleError));
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/students/${id}`)
      .pipe(catchError(this.handleError));
  }

  createStudent(student: Partial<Student>): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, student)
      .pipe(catchError(this.handleError));
  }

  updateStudent(id: number, student: Partial<Student>): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/students/${id}`, student)
      .pipe(catchError(this.handleError));
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/students/${id}`)
      .pipe(catchError(this.handleError));
  }

  suspendStudent(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/students/${id}/suspend`, {})
      .pipe(catchError(this.handleError));
  }

  activateStudent(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/students/${id}/activate`, {})
      .pipe(catchError(this.handleError));
  }

  // Teacher management methods
  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiUrl}/teachers`)
      .pipe(catchError(this.handleError));
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/teachers/${id}`)
      .pipe(catchError(this.handleError));
  }

  createTeacher(teacher: Partial<Teacher>): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.apiUrl}/teachers`, teacher)
      .pipe(catchError(this.handleError));
  }

  updateTeacher(id: number, teacher: Partial<Teacher>): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/teachers/${id}`, teacher)
      .pipe(catchError(this.handleError));
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/teachers/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Class management methods
  getAllClasses(): Observable<ClassInfo[]> {
    return this.http.get<ClassInfo[]>(`${this.apiUrl}/classes`)
      .pipe(catchError(this.handleError));
  }

  getClass(id: number): Observable<ClassInfo> {
    return this.http.get<ClassInfo>(`${this.apiUrl}/classes/${id}`)
      .pipe(catchError(this.handleError));
  }

  createClass(classInfo: Partial<ClassInfo>): Observable<ClassInfo> {
    return this.http.post<ClassInfo>(`${this.apiUrl}/classes`, classInfo)
      .pipe(catchError(this.handleError));
  }

  updateClass(id: number, classInfo: Partial<ClassInfo>): Observable<ClassInfo> {
    return this.http.put<ClassInfo>(`${this.apiUrl}/classes/${id}`, classInfo)
      .pipe(catchError(this.handleError));
  }

  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/classes/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Schedule management methods
  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/schedules`)
      .pipe(catchError(this.handleError));
  }

  createSchedule(schedule: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/schedules`, schedule)
      .pipe(catchError(this.handleError));
  }

  updateSchedule(id: number, schedule: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/schedules/${id}`, schedule)
      .pipe(catchError(this.handleError));
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/schedules/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Reports methods
  getAttendanceReport(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reports/attendance?start=${startDate}&end=${endDate}`)
      .pipe(catchError(this.handleError));
  }

  getGradeReport(classId?: number): Observable<any> {
    const url = classId ? 
      `${this.apiUrl}/reports/grades?classId=${classId}` : 
      `${this.apiUrl}/reports/grades`;
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  }

  getRegistrationReport(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reports/registrations`)
      .pipe(catchError(this.handleError));
  }

  // System settings methods
  getSystemSettings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/settings`)
      .pipe(catchError(this.handleError));
  }

  updateSystemSettings(settings: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/settings`, settings)
      .pipe(catchError(this.handleError));
  }

  // Pending registrations
  getPendingRegistrations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/registrations/pending`)
      .pipe(catchError(this.handleError));
  }

  approveRegistration(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/registrations/${id}/approve`, {})
      .pipe(catchError(this.handleError));
  }

  rejectRegistration(id: number, reason?: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/registrations/${id}/reject`, { reason })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Admin Service Error:', error);
    
    if (error.status === 0) {
      return throwError(() => ({
        error: 'Erreur de connexion au serveur. Vérifiez votre connexion internet.',
        code: 'NETWORK_ERROR'
      }));
    } else if (error.status === 401) {
      return throwError(() => ({
        error: 'Session expirée. Veuillez vous reconnecter.',
        code: 'UNAUTHORIZED'
      }));
    } else if (error.status === 403) {
      return throwError(() => ({
        error: 'Accès non autorisé. Permissions insuffisantes.',
        code: 'FORBIDDEN'
      }));
    } else if (error.status === 500) {
      return throwError(() => ({
        error: 'Erreur interne du serveur. Veuillez réessayer plus tard.',
        code: 'SERVER_ERROR'
      }));
    } else {
      return throwError(() => ({
        error: error.error?.message || `Erreur HTTP ${error.status}: ${error.statusText}`,
        code: 'HTTP_ERROR'
      }));
    }
  }
}
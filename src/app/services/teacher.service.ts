import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Session {
  id?: number;
  title: string;
  type: 'cours' | 'devoir' | 'examen';
  subject: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  createdBy?: number;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  class: string;
  status: 'active' | 'inactive';
  photo?: string;
  parentContact?: string;
}

export interface Attendance {
  id?: number;
  sessionId: number;
  studentId: number;
  status: 'present' | 'absent' | 'late';
  date: string;
}

export interface Grade {
  id?: number;
  sessionId: number;
  studentId: number;
  score: number;
  maxScore: number;
  comment?: string;
  date: string;
}

export interface Message {
  id?: number;
  senderId: number;
  receiverId?: number;
  groupId?: number;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'individual' | 'group';
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'absence' | 'grade' | 'session' | 'message' | 'general';
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface TeacherStats {
  totalSessions: number;
  totalStudents: number;
  averageAttendance: number;
  averageGrades: number;
  unreadMessages: number;
  upcomingSessions: number;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private readonly API_URL = 'http://localhost:8000/api'; // Symfony backend URL
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadNotifications();
  }

  private getHttpOptions() {
    const token = localStorage.getItem('auth_token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

  // Session Management
  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.API_URL}/seances`, this.getHttpOptions());
  }

  getSessionById(id: number): Observable<Session> {
    return this.http.get<Session>(`${this.API_URL}/seances/${id}`, this.getHttpOptions());
  }

  createSession(session: Session): Observable<Session> {
    return this.http.post<Session>(`${this.API_URL}/seances`, session, this.getHttpOptions());
  }

  updateSession(id: number, session: Session): Observable<Session> {
    return this.http.put<Session>(`${this.API_URL}/seances/${id}`, session, this.getHttpOptions());
  }

  deleteSession(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/seances/${id}`, this.getHttpOptions());
  }

  // Student Management
  getStudents(classFilter?: string): Observable<Student[]> {
    const url = classFilter ? 
      `${this.API_URL}/students?class=${classFilter}` : 
      `${this.API_URL}/students`;
    return this.http.get<Student[]>(url, this.getHttpOptions());
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.API_URL}/students/${id}`, this.getHttpOptions());
  }

  getStudentsByClass(className: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.API_URL}/students/class/${className}`, this.getHttpOptions());
  }

  // Attendance Management
  getAttendanceBySession(sessionId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.API_URL}/attendance/session/${sessionId}`, this.getHttpOptions());
  }

  markAttendance(attendance: Attendance[]): Observable<Attendance[]> {
    return this.http.post<Attendance[]>(`${this.API_URL}/attendance`, attendance, this.getHttpOptions());
  }

  updateAttendance(id: number, attendance: Attendance): Observable<Attendance> {
    return this.http.put<Attendance>(`${this.API_URL}/attendance/${id}`, attendance, this.getHttpOptions());
  }

  // Grade Management
  getGradesBySession(sessionId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.API_URL}/notes/session/${sessionId}`, this.getHttpOptions());
  }

  getGradesByStudent(studentId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.API_URL}/notes/student/${studentId}`, this.getHttpOptions());
  }

  assignGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(`${this.API_URL}/notes`, grade, this.getHttpOptions());
  }

  updateGrade(id: number, grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.API_URL}/notes/${id}`, grade, this.getHttpOptions());
  }

  // Messaging
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.API_URL}/messages`, this.getHttpOptions());
  }

  getConversations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/conversations`, this.getHttpOptions());
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.API_URL}/messages`, message, this.getHttpOptions());
  }

  markMessageAsRead(messageId: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/messages/${messageId}/read`, {}, this.getHttpOptions());
  }

  // Notifications
  loadNotifications(): void {
    this.http.get<Notification[]>(`${this.API_URL}/notifications`, this.getHttpOptions())
      .subscribe(notifications => {
        this.notificationsSubject.next(notifications);
      });
  }

  markNotificationAsRead(id: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/notifications/${id}/read`, {}, this.getHttpOptions())
      .pipe(
        map(() => {
          const currentNotifications = this.notificationsSubject.value;
          const updatedNotifications = currentNotifications.map(n => 
            n.id === id ? { ...n, isRead: true } : n
          );
          this.notificationsSubject.next(updatedNotifications);
        })
      );
  }

  getUnreadNotificationsCount(): Observable<number> {
    return this.notifications$.pipe(
      map(notifications => notifications.filter(n => !n.isRead).length)
    );
  }

  // Statistics and Analytics
  getTeacherStats(): Observable<TeacherStats> {
    return this.http.get<TeacherStats>(`${this.API_URL}/teacher/stats`, this.getHttpOptions());
  }

  getAttendanceStats(classFilter?: string, dateRange?: { start: string; end: string }): Observable<any> {
    let url = `${this.API_URL}/stats/attendance`;
    const params = new URLSearchParams();
    
    if (classFilter) params.append('class', classFilter);
    if (dateRange) {
      params.append('start', dateRange.start);
      params.append('end', dateRange.end);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    return this.http.get<any>(url, this.getHttpOptions());
  }

  getGradeStats(classFilter?: string, subject?: string): Observable<any> {
    let url = `${this.API_URL}/stats/grades`;
    const params = new URLSearchParams();
    
    if (classFilter) params.append('class', classFilter);
    if (subject) params.append('subject', subject);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    return this.http.get<any>(url, this.getHttpOptions());
  }

  // Calendar and Schedule
  getWeeklySchedule(weekStart: string): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.API_URL}/schedule/week?start=${weekStart}`, this.getHttpOptions());
  }

  getUpcomingSessions(limit: number = 5): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.API_URL}/sessions/upcoming?limit=${limit}`, this.getHttpOptions());
  }

  // Utility methods
  getClasses(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/classes`, this.getHttpOptions());
  }

  getSubjects(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/subjects`, this.getHttpOptions());
  }
}
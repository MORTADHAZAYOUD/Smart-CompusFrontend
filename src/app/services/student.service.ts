import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';

// Interfaces
export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  studentId: string;
  program: string;
  year: number;
  semester: number;
  profilePicture?: string;
}

export interface Note {
  id: number;
  subject: string;
  subjectCode: string;
  grade: number;
  maxGrade: number;
  examType: string;
  date: string;
  teacher: string;
  coefficient: number;
}

export interface Attendance {
  id: number;
  date: string;
  subject: string;
  subjectCode: string;
  status: 'present' | 'absent' | 'justified' | 'late';
  teacher: string;
  sessionType: string;
  duration: number;
}

export interface Session {
  id: number;
  subject: string;
  subjectCode: string;
  teacher: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  sessionType: string;
  description?: string;
}

export interface ScheduleItem {
  id: number;
  subject: string;
  subjectCode: string;
  teacher: string;
  room: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string;
  endTime: string;
  sessionType: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  type: 'academic' | 'social' | 'exam' | 'holiday' | 'meeting';
  isOptional: boolean;
}

export interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderType: 'teacher' | 'admin' | 'student';
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
  isImportant: boolean;
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  actionUrl?: string;
}

export interface DashboardStats {
  globalAverage: number;
  attendanceRate: number;
  totalSubjects: number;
  upcomingExams: number;
  unreadMessages: number;
  unreadNotifications: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private currentStudent = new BehaviorSubject<Student | null>(null);
  
  constructor() {
    // Set mock current student
    this.currentStudent.next(this.getMockStudent());
  }

  getCurrentStudent(): Observable<Student | null> {
    return this.currentStudent.asObservable();
  }

  updateProfile(profile: Partial<Student>): Observable<Student> {
    const current = this.currentStudent.value;
    if (current) {
      const updated = { ...current, ...profile };
      this.currentStudent.next(updated);
      return of(updated).pipe(delay(500));
    }
    throw new Error('No current student');
  }

  getDashboardStats(): Observable<DashboardStats> {
    const stats: DashboardStats = {
      globalAverage: 15.2,
      attendanceRate: 92.5,
      totalSubjects: 8,
      upcomingExams: 3,
      unreadMessages: 5,
      unreadNotifications: 2
    };
    return of(stats).pipe(delay(300));
  }

  getNotes(): Observable<Note[]> {
    const notes: Note[] = [
      { id: 1, subject: 'Mathematics', subjectCode: 'MATH301', grade: 16, maxGrade: 20, examType: 'Midterm', date: '2024-01-15', teacher: 'Prof. Johnson', coefficient: 2 },
      { id: 2, subject: 'Physics', subjectCode: 'PHYS201', grade: 14, maxGrade: 20, examType: 'Quiz', date: '2024-01-12', teacher: 'Dr. Smith', coefficient: 1 },
      { id: 3, subject: 'Computer Science', subjectCode: 'CS401', grade: 18, maxGrade: 20, examType: 'Project', date: '2024-01-10', teacher: 'Prof. Wilson', coefficient: 3 },
      { id: 4, subject: 'Chemistry', subjectCode: 'CHEM201', grade: 13, maxGrade: 20, examType: 'Lab Report', date: '2024-01-08', teacher: 'Dr. Brown', coefficient: 1 },
      { id: 5, subject: 'Mathematics', subjectCode: 'MATH301', grade: 15, maxGrade: 20, examType: 'Quiz', date: '2024-01-05', teacher: 'Prof. Johnson', coefficient: 1 },
      { id: 6, subject: 'English', subjectCode: 'ENG102', grade: 17, maxGrade: 20, examType: 'Essay', date: '2024-01-03', teacher: 'Ms. Davis', coefficient: 2 }
    ];
    return of(notes).pipe(delay(400));
  }

  getAttendance(): Observable<Attendance[]> {
    const attendance: Attendance[] = [
      { id: 1, date: '2024-01-15', subject: 'Mathematics', subjectCode: 'MATH301', status: 'present', teacher: 'Prof. Johnson', sessionType: 'Lecture', duration: 90 },
      { id: 2, date: '2024-01-15', subject: 'Physics', subjectCode: 'PHYS201', status: 'present', teacher: 'Dr. Smith', sessionType: 'Lab', duration: 120 },
      { id: 3, date: '2024-01-14', subject: 'Computer Science', subjectCode: 'CS401', status: 'absent', teacher: 'Prof. Wilson', sessionType: 'Lecture', duration: 90 },
      { id: 4, date: '2024-01-14', subject: 'Chemistry', subjectCode: 'CHEM201', status: 'justified', teacher: 'Dr. Brown', sessionType: 'Lab', duration: 120 },
      { id: 5, date: '2024-01-13', subject: 'Mathematics', subjectCode: 'MATH301', status: 'late', teacher: 'Prof. Johnson', sessionType: 'Tutorial', duration: 60 },
      { id: 6, date: '2024-01-13', subject: 'English', subjectCode: 'ENG102', status: 'present', teacher: 'Ms. Davis', sessionType: 'Lecture', duration: 90 }
    ];
    return of(attendance).pipe(delay(400));
  }

  getSessions(): Observable<Session[]> {
    const sessions: Session[] = [
      { id: 1, subject: 'Mathematics', subjectCode: 'MATH301', teacher: 'Prof. Johnson', room: 'A101', date: '2024-01-16', startTime: '09:00', endTime: '10:30', sessionType: 'Lecture', description: 'Calculus III - Integration by parts' },
      { id: 2, subject: 'Physics', subjectCode: 'PHYS201', teacher: 'Dr. Smith', room: 'B205', date: '2024-01-16', startTime: '14:00', endTime: '16:00', sessionType: 'Lab', description: 'Optics laboratory experiment' },
      { id: 3, subject: 'Computer Science', subjectCode: 'CS401', teacher: 'Prof. Wilson', room: 'C301', date: '2024-01-17', startTime: '10:00', endTime: '11:30', sessionType: 'Lecture', description: 'Advanced Algorithms - Dynamic Programming' },
      { id: 4, subject: 'Chemistry', subjectCode: 'CHEM201', teacher: 'Dr. Brown', room: 'D102', date: '2024-01-17', startTime: '15:00', endTime: '17:00', sessionType: 'Lab', description: 'Organic synthesis practical' },
      { id: 5, subject: 'English', subjectCode: 'ENG102', teacher: 'Ms. Davis', room: 'E201', date: '2024-01-18', startTime: '11:00', endTime: '12:30', sessionType: 'Lecture', description: 'Modern Literature Analysis' }
    ];
    return of(sessions).pipe(delay(400));
  }

  getSchedule(): Observable<ScheduleItem[]> {
    const schedule: ScheduleItem[] = [
      { id: 1, subject: 'Mathematics', subjectCode: 'MATH301', teacher: 'Prof. Johnson', room: 'A101', dayOfWeek: 1, startTime: '09:00', endTime: '10:30', sessionType: 'Lecture' },
      { id: 2, subject: 'Physics', subjectCode: 'PHYS201', teacher: 'Dr. Smith', room: 'B205', dayOfWeek: 1, startTime: '14:00', endTime: '16:00', sessionType: 'Lab' },
      { id: 3, subject: 'Computer Science', subjectCode: 'CS401', teacher: 'Prof. Wilson', room: 'C301', dayOfWeek: 2, startTime: '10:00', endTime: '11:30', sessionType: 'Lecture' },
      { id: 4, subject: 'Chemistry', subjectCode: 'CHEM201', teacher: 'Dr. Brown', room: 'D102', dayOfWeek: 2, startTime: '15:00', endTime: '17:00', sessionType: 'Lab' },
      { id: 5, subject: 'English', subjectCode: 'ENG102', teacher: 'Ms. Davis', room: 'E201', dayOfWeek: 3, startTime: '11:00', endTime: '12:30', sessionType: 'Lecture' },
      { id: 6, subject: 'Mathematics', subjectCode: 'MATH301', teacher: 'Prof. Johnson', room: 'A101', dayOfWeek: 3, startTime: '14:00', endTime: '15:30', sessionType: 'Tutorial' },
      { id: 7, subject: 'Physics', subjectCode: 'PHYS201', teacher: 'Dr. Smith', room: 'B205', dayOfWeek: 4, startTime: '09:00', endTime: '10:30', sessionType: 'Lecture' },
      { id: 8, subject: 'Computer Science', subjectCode: 'CS401', teacher: 'Prof. Wilson', room: 'C301', dayOfWeek: 4, startTime: '13:00', endTime: '15:00', sessionType: 'Lab' },
      { id: 9, subject: 'Chemistry', subjectCode: 'CHEM201', teacher: 'Dr. Brown', room: 'D102', dayOfWeek: 5, startTime: '10:00', endTime: '11:30', sessionType: 'Lecture' },
      { id: 10, subject: 'English', subjectCode: 'ENG102', teacher: 'Ms. Davis', room: 'E201', dayOfWeek: 5, startTime: '15:00', endTime: '16:30', sessionType: 'Tutorial' }
    ];
    return of(schedule).pipe(delay(400));
  }

  getEvents(): Observable<Event[]> {
    const events: Event[] = [
      { id: 1, title: 'Mathematics Midterm Exam', description: 'Calculus III midterm examination', date: '2024-01-20', startTime: '09:00', endTime: '11:00', location: 'Main Hall', type: 'exam', isOptional: false },
      { id: 2, title: 'Science Fair', description: 'Annual science fair and exhibition', date: '2024-01-25', startTime: '10:00', endTime: '16:00', location: 'Exhibition Center', type: 'academic', isOptional: true },
      { id: 3, title: 'Winter Break', description: 'Winter vacation period', date: '2024-02-01', type: 'holiday', isOptional: false },
      { id: 4, title: 'Student Council Meeting', description: 'Monthly student council meeting', date: '2024-01-22', startTime: '14:00', endTime: '15:30', location: 'Conference Room A', type: 'meeting', isOptional: true },
      { id: 5, title: 'Career Fair', description: 'Annual career fair with industry partners', date: '2024-02-05', startTime: '09:00', endTime: '17:00', location: 'Campus Center', type: 'social', isOptional: true }
    ];
    return of(events).pipe(delay(400));
  }

  getMessages(): Observable<Message[]> {
    const messages: Message[] = [
      { id: 1, senderId: 101, senderName: 'Prof. Johnson', senderType: 'teacher', subject: 'Assignment Deadline', content: 'Reminder: Your mathematics assignment is due next Friday.', date: '2024-01-15T10:30:00', isRead: false, isImportant: true },
      { id: 2, senderId: 102, senderName: 'Academic Office', senderType: 'admin', subject: 'Grade Report Available', content: 'Your semester grades are now available in the portal.', date: '2024-01-14T14:20:00', isRead: false, isImportant: false },
      { id: 3, senderId: 103, senderName: 'Dr. Smith', senderType: 'teacher', subject: 'Lab Session Canceled', content: 'Tomorrow\'s physics lab session is canceled due to equipment maintenance.', date: '2024-01-13T16:45:00', isRead: true, isImportant: true },
      { id: 4, senderId: 104, senderName: 'Library Services', senderType: 'admin', subject: 'Book Return Reminder', content: 'You have 2 books due for return by January 20th.', date: '2024-01-12T09:15:00', isRead: true, isImportant: false },
      { id: 5, senderId: 105, senderName: 'Prof. Wilson', senderType: 'teacher', subject: 'Project Group Assignment', content: 'Please check your assigned group for the final project.', date: '2024-01-11T11:30:00', isRead: false, isImportant: false }
    ];
    return of(messages).pipe(delay(400));
  }

  getNotifications(): Observable<Notification[]> {
    const notifications: Notification[] = [
      { id: 1, title: 'New Grade Posted', content: 'Your Computer Science project grade has been posted', date: '2024-01-15T15:30:00', type: 'success', isRead: false, actionUrl: '/student/notes' },
      { id: 2, title: 'Attendance Warning', content: 'You have been absent from 2 consecutive Physics classes', date: '2024-01-14T08:00:00', type: 'warning', isRead: false, actionUrl: '/student/attendance' },
      { id: 3, title: 'Upcoming Exam', content: 'Mathematics midterm exam is scheduled for January 20th', date: '2024-01-13T12:00:00', type: 'info', isRead: true, actionUrl: '/student/schedule' },
      { id: 4, title: 'Registration Open', content: 'Course registration for next semester is now open', date: '2024-01-12T10:00:00', type: 'info', isRead: true },
      { id: 5, title: 'Payment Due', content: 'Your tuition payment is due by January 30th', date: '2024-01-10T09:00:00', type: 'warning', isRead: true }
    ];
    return of(notifications).pipe(delay(400));
  }

  markMessageAsRead(messageId: number): Observable<boolean> {
    return of(true).pipe(delay(200));
  }

  markNotificationAsRead(notificationId: number): Observable<boolean> {
    return of(true).pipe(delay(200));
  }

  markAllNotificationsAsRead(): Observable<boolean> {
    return of(true).pipe(delay(300));
  }

  getUnreadNotifications(): Observable<Notification[]> {
    return this.getNotifications().pipe(
      map(notifications => notifications.filter(n => !n.isRead))
    );
  }

  sendMessage(recipientId: number, subject: string, content: string): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  getPerformanceData(): Observable<any[]> {
    const performanceData = [
      { name: 'Mathematics', value: 15.5 },
      { name: 'Physics', value: 14.2 },
      { name: 'Computer Science', value: 17.8 },
      { name: 'Chemistry', value: 13.6 },
      { name: 'English', value: 16.1 }
    ];
    return of(performanceData).pipe(delay(300));
  }

  getAttendanceData(): Observable<any[]> {
    const attendanceData = [
      { name: 'Present', value: 85 },
      { name: 'Absent', value: 8 },
      { name: 'Justified', value: 5 },
      { name: 'Late', value: 2 }
    ];
    return of(attendanceData).pipe(delay(300));
  }

  private getMockStudent(): Student {
    return {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@smartcampus.edu',
      phone: '+1234567890',
      dateOfBirth: '2001-05-15',
      studentId: 'SC2024001',
      program: 'Computer Science',
      year: 3,
      semester: 5,
      profilePicture: 'https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=JD'
    };
  }
}
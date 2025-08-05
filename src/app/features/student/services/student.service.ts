import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Student {
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

export interface Note {
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

export interface Attendance {
  id: number;
  date: string;
  subject: string;
  teacher: string;
  status: 'present' | 'absent' | 'justified' | 'late';
  justification?: string;
  session: string;
}

export interface Session {
  id: number;
  subject: string;
  teacher: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  type: 'course' | 'tutorial' | 'lab' | 'exam';
  status: 'upcoming' | 'ongoing' | 'completed';
  description?: string;
}

export interface ScheduleItem {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
  type: 'course' | 'tutorial' | 'lab';
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'academic' | 'social' | 'sport' | 'cultural';
  isImportant: boolean;
}

export interface Message {
  id: number;
  sender: string;
  senderId: number;
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
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface DashboardStats {
  globalAverage: number;
  attendanceRate: number;
  totalSubjects: number;
  upcomingSessions: number;
  unreadMessages: number;
  unreadNotifications: number;
  nextSession?: Session;
  recentNotes: Note[];
  recentNotifications: Notification[];
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = '/api/student';
  
  // Mock data
  private mockStudent: Student = {
    id: 1,
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@smartcampus.edu',
    photo: 'https://via.placeholder.com/150/2196F3/FFFFFF?text=AJ',
    studentId: 'STU2024001',
    class: '12th Grade A',
    grade: '12th Grade',
    phone: '+1 (555) 123-4567',
    address: '123 Education St, Learning City, LC 12345',
    birthDate: '2006-03-15',
    parentName: 'Sarah Johnson',
    parentPhone: '+1 (555) 987-6543'
  };

  private mockNotes: Note[] = [
    {
      id: 1,
      subject: 'Mathematics',
      subjectCode: 'MATH101',
      note: 85,
      maxNote: 100,
      coefficient: 2,
      date: '2024-01-15',
      teacher: 'Dr. Smith',
      type: 'exam',
      comment: 'Excellent work on calculus concepts'
    },
    {
      id: 2,
      subject: 'Physics',
      subjectCode: 'PHYS101',
      note: 92,
      maxNote: 100,
      coefficient: 1.5,
      date: '2024-01-10',
      teacher: 'Prof. Brown',
      type: 'project',
      comment: 'Outstanding lab report'
    },
    {
      id: 3,
      subject: 'English Literature',
      subjectCode: 'ENG101',
      note: 78,
      maxNote: 100,
      coefficient: 1,
      date: '2024-01-12',
      teacher: 'Ms. Davis',
      type: 'homework',
      comment: 'Good analysis, needs more depth'
    },
    {
      id: 4,
      subject: 'History',
      subjectCode: 'HIST101',
      note: 88,
      maxNote: 100,
      coefficient: 1,
      date: '2024-01-08',
      teacher: 'Mr. Wilson',
      type: 'quiz',
      comment: 'Well researched presentation'
    },
    {
      id: 5,
      subject: 'Chemistry',
      subjectCode: 'CHEM101',
      note: 95,
      maxNote: 100,
      coefficient: 1.5,
      date: '2024-01-14',
      teacher: 'Dr. Garcia',
      type: 'exam',
      comment: 'Perfect understanding of concepts'
    }
  ];

  private mockAttendance: Attendance[] = [
    {
      id: 1,
      date: '2024-01-15',
      subject: 'Mathematics',
      teacher: 'Dr. Smith',
      status: 'present',
      session: 'Morning'
    },
    {
      id: 2,
      date: '2024-01-15',
      subject: 'Physics',
      teacher: 'Prof. Brown',
      status: 'present',
      session: 'Afternoon'
    },
    {
      id: 3,
      date: '2024-01-14',
      subject: 'English Literature',
      teacher: 'Ms. Davis',
      status: 'absent',
      justification: 'Medical appointment',
      session: 'Morning'
    },
    {
      id: 4,
      date: '2024-01-14',
      subject: 'History',
      teacher: 'Mr. Wilson',
      status: 'justified',
      justification: 'Medical appointment',
      session: 'Afternoon'
    },
    {
      id: 5,
      date: '2024-01-13',
      subject: 'Chemistry',
      teacher: 'Dr. Garcia',
      status: 'present',
      session: 'Morning'
    }
  ];

  private mockSessions: Session[] = [
    {
      id: 1,
      subject: 'Mathematics',
      teacher: 'Dr. Smith',
      date: '2024-01-16',
      startTime: '09:00',
      endTime: '10:30',
      room: 'Room 201',
      type: 'course',
      status: 'upcoming'
    },
    {
      id: 2,
      subject: 'Physics Lab',
      teacher: 'Prof. Brown',
      date: '2024-01-16',
      startTime: '14:00',
      endTime: '16:00',
      room: 'Lab 105',
      type: 'lab',
      status: 'upcoming'
    },
    {
      id: 3,
      subject: 'English Literature',
      teacher: 'Ms. Davis',
      date: '2024-01-15',
      startTime: '11:00',
      endTime: '12:30',
      room: 'Room 103',
      type: 'course',
      status: 'completed'
    }
  ];

  private mockSchedule: ScheduleItem[] = [
    {
      id: 1,
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      subject: 'Mathematics',
      teacher: 'Dr. Smith',
      room: 'Room 201',
      type: 'course'
    },
    {
      id: 2,
      day: 'Monday',
      startTime: '11:00',
      endTime: '12:30',
      subject: 'English Literature',
      teacher: 'Ms. Davis',
      room: 'Room 103',
      type: 'course'
    },
    {
      id: 3,
      day: 'Monday',
      startTime: '14:00',
      endTime: '15:30',
      subject: 'Physics',
      teacher: 'Prof. Brown',
      room: 'Room 205',
      type: 'course'
    },
    {
      id: 4,
      day: 'Tuesday',
      startTime: '09:00',
      endTime: '10:30',
      subject: 'History',
      teacher: 'Mr. Wilson',
      room: 'Room 107',
      type: 'course'
    },
    {
      id: 5,
      day: 'Tuesday',
      startTime: '11:00',
      endTime: '12:30',
      subject: 'Chemistry',
      teacher: 'Dr. Garcia',
      room: 'Lab 105',
      type: 'lab'
    }
  ];

  private mockEvents: Event[] = [
    {
      id: 1,
      title: 'Science Fair',
      description: 'Annual science fair showcasing student projects',
      date: '2024-02-15',
      startTime: '09:00',
      endTime: '16:00',
      location: 'Gymnasium',
      type: 'academic',
      isImportant: true
    },
    {
      id: 2,
      title: 'Basketball Tournament',
      description: 'Inter-class basketball championship',
      date: '2024-01-25',
      startTime: '15:00',
      endTime: '18:00',
      location: 'Sports Complex',
      type: 'sport',
      isImportant: false
    },
    {
      id: 3,
      title: 'Art Exhibition',
      description: 'Student artwork display',
      date: '2024-02-01',
      startTime: '18:00',
      endTime: '20:00',
      location: 'Art Gallery',
      type: 'cultural',
      isImportant: false
    }
  ];

  private mockMessages: Message[] = [
    {
      id: 1,
      sender: 'Dr. Smith',
      senderId: 101,
      senderType: 'teacher',
      subject: 'Mathematics Assignment Feedback',
      content: 'Great work on the calculus assignment! Your understanding of derivatives is excellent.',
      date: '2024-01-15T10:30:00',
      isRead: false,
      isImportant: true
    },
    {
      id: 2,
      sender: 'Administration',
      senderId: 201,
      senderType: 'admin',
      subject: 'Parent-Teacher Conference Reminder',
      content: 'Reminder: Parent-teacher conference scheduled for next Friday at 3 PM.',
      date: '2024-01-14T14:00:00',
      isRead: true,
      isImportant: false
    },
    {
      id: 3,
      sender: 'Prof. Brown',
      senderId: 102,
      senderType: 'teacher',
      subject: 'Physics Lab Safety Guidelines',
      content: 'Please review the safety guidelines before tomorrow\'s lab session.',
      date: '2024-01-13T16:45:00',
      isRead: true,
      isImportant: false
    }
  ];

  private mockNotifications: Notification[] = [
    {
      id: 1,
      title: 'New Grade Posted',
      message: 'Your Mathematics exam grade has been posted.',
      type: 'info',
      date: '2024-01-15T09:00:00',
      isRead: false,
      actionUrl: '/student/notes'
    },
    {
      id: 2,
      title: 'Attendance Alert',
      message: 'You were marked absent in English Literature on 2024-01-14.',
      type: 'warning',
      date: '2024-01-14T16:30:00',
      isRead: false,
      actionUrl: '/student/attendance'
    },
    {
      id: 3,
      title: 'Event Reminder',
      message: 'Science Fair is tomorrow! Don\'t forget to bring your project.',
      type: 'success',
      date: '2024-01-14T08:00:00',
      isRead: true,
      actionUrl: '/student/events'
    }
  ];

  constructor(private http: HttpClient) {}

  // Student Profile
  getStudentProfile(): Observable<Student> {
    return of(this.mockStudent).pipe(delay(500));
  }

  updateStudentProfile(student: Partial<Student>): Observable<Student> {
    this.mockStudent = { ...this.mockStudent, ...student };
    return of(this.mockStudent).pipe(delay(800));
  }

  // Notes
  getNotes(): Observable<Note[]> {
    return of(this.mockNotes).pipe(delay(600));
  }

  getNotesBySubject(subject: string): Observable<Note[]> {
    const filteredNotes = this.mockNotes.filter(note => note.subject === subject);
    return of(filteredNotes).pipe(delay(400));
  }

  // Attendance
  getAttendance(): Observable<Attendance[]> {
    return of(this.mockAttendance).pipe(delay(500));
  }

  getAttendanceByDate(date: string): Observable<Attendance[]> {
    const filteredAttendance = this.mockAttendance.filter(att => att.date === date);
    return of(filteredAttendance).pipe(delay(300));
  }

  // Sessions
  getSessions(): Observable<Session[]> {
    return of(this.mockSessions).pipe(delay(500));
  }

  getUpcomingSessions(): Observable<Session[]> {
    const upcoming = this.mockSessions.filter(session => session.status === 'upcoming');
    return of(upcoming).pipe(delay(400));
  }

  // Schedule
  getSchedule(): Observable<ScheduleItem[]> {
    return of(this.mockSchedule).pipe(delay(500));
  }

  getScheduleByDay(day: string): Observable<ScheduleItem[]> {
    const daySchedule = this.mockSchedule.filter(item => item.day === day);
    return of(daySchedule).pipe(delay(300));
  }

  // Events
  getEvents(): Observable<Event[]> {
    return of(this.mockEvents).pipe(delay(500));
  }

  getUpcomingEvents(): Observable<Event[]> {
    const upcoming = this.mockEvents.filter(event => new Date(event.date) > new Date());
    return of(upcoming).pipe(delay(400));
  }

  // Messages
  getMessages(): Observable<Message[]> {
    return of(this.mockMessages).pipe(delay(600));
  }

  getUnreadMessages(): Observable<Message[]> {
    const unread = this.mockMessages.filter(msg => !msg.isRead);
    return of(unread).pipe(delay(400));
  }

  sendMessage(message: Omit<Message, 'id' | 'date' | 'isRead'>): Observable<Message> {
    const newMessage: Message = {
      ...message,
      id: this.mockMessages.length + 1,
      date: new Date().toISOString(),
      isRead: false
    };
    this.mockMessages.unshift(newMessage);
    return of(newMessage).pipe(delay(800));
  }

  markMessageAsRead(messageId: number): Observable<void> {
    const message = this.mockMessages.find(msg => msg.id === messageId);
    if (message) {
      message.isRead = true;
    }
    return of(void 0).pipe(delay(300));
  }

  // Notifications
  getNotifications(): Observable<Notification[]> {
    return of(this.mockNotifications).pipe(delay(500));
  }

  getUnreadNotifications(): Observable<Notification[]> {
    const unread = this.mockNotifications.filter(notif => !notif.isRead);
    return of(unread).pipe(delay(400));
  }

  markNotificationAsRead(notificationId: number): Observable<void> {
    const notification = this.mockNotifications.find(notif => notif.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
    return of(void 0).pipe(delay(300));
  }

  // Dashboard Stats
  getDashboardStats(): Observable<DashboardStats> {
    const globalAverage = this.mockNotes.reduce((sum, note) => sum + note.note, 0) / this.mockNotes.length;
    const attendanceRate = (this.mockAttendance.filter(att => att.status === 'present').length / this.mockAttendance.length) * 100;
    const unreadMessages = this.mockMessages.filter(msg => !msg.isRead).length;
    const unreadNotifications = this.mockNotifications.filter(notif => !notif.isRead).length;
    const nextSession = this.mockSessions.find(session => session.status === 'upcoming');
    const recentNotes = this.mockNotes.slice(0, 3);
    const recentNotifications = this.mockNotifications.slice(0, 3);

    const stats: DashboardStats = {
      globalAverage: Math.round(globalAverage * 100) / 100,
      attendanceRate: Math.round(attendanceRate * 100) / 100,
      totalSubjects: 5,
      upcomingSessions: this.mockSessions.filter(s => s.status === 'upcoming').length,
      unreadMessages,
      unreadNotifications,
      nextSession,
      recentNotes,
      recentNotifications
    };

    return of(stats).pipe(delay(700));
  }

  // Performance Chart Data
  getPerformanceChartData(): Observable<any[]> {
    const performanceData = this.mockNotes.map(note => ({
      name: note.subject,
      value: note.note
    }));
    return of(performanceData).pipe(delay(500));
  }

  // Attendance Chart Data
  getAttendanceChartData(): Observable<any[]> {
    const attendanceData = [
      { name: 'Present', value: this.mockAttendance.filter(att => att.status === 'present').length },
      { name: 'Absent', value: this.mockAttendance.filter(att => att.status === 'absent').length },
      { name: 'Justified', value: this.mockAttendance.filter(att => att.status === 'justified').length },
      { name: 'Late', value: this.mockAttendance.filter(att => att.status === 'late').length }
    ];
    return of(attendanceData).pipe(delay(500));
  }
}
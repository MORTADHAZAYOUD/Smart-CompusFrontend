import { Component, OnInit } from '@angular/core';
import { TeacherService, Student, Session } from '../../../services/teacher.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  
  stats = {
    nombreClasses: 0,
    nombreEtudiants: 0,
    seancesAujourdhui: 0,
    devoisACorreger: 0,
    moyenneGenerale: 0,
    tauxPresenceMoyen: 0
  };

  todaySessions: Session[] = [];
  recentMessages: any[] = [];
  recentNotifications: any[] = [];
  topStudents: Student[] = [];
  teacherName = 'Prof. Enseignant';

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load dashboard statistics
    this.teacherService.getDashboardStats().subscribe(data => {
      this.stats = data;
    });

    // Load today's sessions
    this.teacherService.getMySessions().subscribe(sessions => {
      const today = new Date();
      this.todaySessions = sessions.filter(session => 
        session.date.toDateString() === today.toDateString()
      ).slice(0, 4); // Show only first 4
    });

    // Load recent messages
    this.teacherService.getMyMessages().subscribe(messages => {
      this.recentMessages = messages.slice(0, 3); // Show only first 3
    });

    // Load recent notifications
    this.teacherService.getMyNotifications().subscribe(notifications => {
      this.recentNotifications = notifications.slice(0, 3); // Show only first 3
    });

    // Load top students (mock implementation)
    this.teacherService.getMyStudents().subscribe(students => {
      this.topStudents = students
        .sort((a, b) => b.moyenne - a.moyenne)
        .slice(0, 5); // Top 5 students
    });
  }

  navigateTo(route: string): void {
    window.location.href = `/teacher/${route}`;
  }

  navigateToSession(sessionId: number): void {
    window.location.href = `/teacher/sessions/${sessionId}`;
  }

  getSessionTypeClass(type: string): string {
    switch (type) {
      case 'Cours': return 'course';
      case 'TD': return 'td';
      case 'TP': return 'tp';
      case 'Examen': return 'exam';
      default: return 'other';
    }
  }

  getStudentGradeClass(moyenne: number): string {
    if (moyenne >= 16) return 'excellent';
    if (moyenne >= 14) return 'good';
    if (moyenne >= 12) return 'average';
    return 'needs-improvement';
  }

  getPresenceClass(tauxPresence: number): string {
    if (tauxPresence >= 95) return 'excellent';
    if (tauxPresence >= 90) return 'good';
    if (tauxPresence >= 85) return 'average';
    return 'needs-improvement';
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '📢';
    }
  }

  markPresence(sessionId: number): void {
    this.navigateTo(`sessions/${sessionId}/presence`);
  }

  quickGrade(sessionId: number): void {
    this.navigateTo(`sessions/${sessionId}/notes`);
  }
}
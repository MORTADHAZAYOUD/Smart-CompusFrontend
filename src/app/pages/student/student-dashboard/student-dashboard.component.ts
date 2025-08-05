import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatCardComponent } from '../shared/stat-card/stat-card.component';
import { ScheduleItemComponent } from '../shared/schedule-item/schedule-item.component';
import { EventCardComponent } from '../shared/event-card/event-card.component';
import { NotificationItemComponent } from '../shared/notification-item/notification-item.component';
import { 
  StudentService, 
  DashboardStats, 
  Note, 
  Session, 
  Event, 
  Notification 
} from '../../../services/student.service';

interface DashboardData {
  stats: DashboardStats;
  recentNotes: Note[];
  upcomingSessions: Session[];
  upcomingEvents: Event[];
  recentNotifications: Notification[];
  performanceData: any[];
  attendanceData: any[];
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    NgxChartsModule,
    StatCardComponent,
    ScheduleItemComponent,
    EventCardComponent,
    NotificationItemComponent
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  dashboardData$: Observable<DashboardData>;
  
  // Chart options
  performanceColorScheme = 'cool';
  
  attendanceColorScheme = 'vivid';

  constructor(private studentService: StudentService) {
    this.dashboardData$ = this.loadDashboardData();
  }

  ngOnInit(): void {}

  private loadDashboardData(): Observable<DashboardData> {
    return combineLatest([
      this.studentService.getDashboardStats(),
      this.studentService.getNotes(),
      this.studentService.getSessions(),
      this.studentService.getEvents(),
      this.studentService.getNotifications(),
      this.studentService.getPerformanceData(),
      this.studentService.getAttendanceData()
    ]).pipe(
      map(([stats, notes, sessions, events, notifications, performanceData, attendanceData]) => ({
        stats,
        recentNotes: notes.slice(0, 3),
        upcomingSessions: sessions.slice(0, 3),
        upcomingEvents: events.slice(0, 3),
        recentNotifications: notifications.filter(n => !n.isRead).slice(0, 3),
        performanceData,
        attendanceData
      }))
    );
  }

  getGradeColor(grade: number, maxGrade: number): 'success' | 'warning' | 'danger' | 'info' | 'primary' {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  }

  getAttendanceColor(rate: number): 'success' | 'warning' | 'danger' | 'info' | 'primary' {
    if (rate >= 90) return 'success';
    if (rate >= 75) return 'warning';
    return 'danger';
  }

  formatTime(time: string): string {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  getEventTypeIcon(type: string): string {
    const icons = {
      'academic': 'school',
      'social': 'people',
      'exam': 'quiz',
      'holiday': 'beach_access',
      'meeting': 'groups'
    };
    return icons[type as keyof typeof icons] || 'event';
  }

  getNotificationIcon(type: string): string {
    const icons = {
      'info': 'info',
      'warning': 'warning',
      'success': 'check_circle',
      'error': 'error'
    };
    return icons[type as keyof typeof icons] || 'notifications';
  }
}
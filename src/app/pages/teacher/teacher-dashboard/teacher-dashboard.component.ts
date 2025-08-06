import { Component, OnInit } from '@angular/core';
import { TeacherService, TeacherStats, Session, Student, Notification } from '../../../services/teacher.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  stats: TeacherStats = {
    totalSessions: 0,
    totalStudents: 0,
    averageAttendance: 0,
    averageGrades: 0,
    unreadMessages: 0,
    upcomingSessions: 0
  };

  upcomingSessions: Session[] = [];
  recentNotifications: Notification[] = [];
  isLoading = true;

  // Chart data
  attendanceChartData: any[] = [];
  gradeDistributionData: any[] = [];
  weeklySessionsData: any[] = [];

  // Chart options
  colorScheme = {
    domain: ['#1976d2', '#ff9800', '#4caf50', '#f44336', '#9c27b0', '#00bcd4']
  };

  attendanceChartOptions = {
    view: [350, 200],
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    xAxisLabel: 'Classes',
    yAxisLabel: 'Attendance %'
  };

  gradeChartOptions = {
    view: [350, 200],
    gradient: false,
    showLegend: true,
    showLabels: true,
    isDoughnut: false
  };

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;

    // Load teacher statistics
    this.teacherService.getTeacherStats().subscribe(
      stats => {
        this.stats = stats;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading teacher stats:', error);
        this.isLoading = false;
      }
    );

    // Load upcoming sessions
    this.teacherService.getUpcomingSessions(5).subscribe(
      sessions => {
        this.upcomingSessions = sessions;
      },
      error => {
        console.error('Error loading upcoming sessions:', error);
      }
    );

    // Load recent notifications
    this.teacherService.notifications$.subscribe(
      notifications => {
        this.recentNotifications = notifications
          .filter(n => !n.isRead)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 5);
      }
    );

    // Load chart data
    this.loadChartData();
  }

  loadChartData(): void {
    // Load attendance statistics
    this.teacherService.getAttendanceStats().subscribe(
      data => {
        this.attendanceChartData = data.map((item: any) => ({
          name: item.className,
          value: item.attendanceRate
        }));
      },
      error => {
        console.error('Error loading attendance stats:', error);
        // Mock data for demo
        this.attendanceChartData = [
          { name: 'Class A', value: 85 },
          { name: 'Class B', value: 92 },
          { name: 'Class C', value: 78 },
          { name: 'Class D', value: 88 }
        ];
      }
    );

    // Load grade distribution
    this.teacherService.getGradeStats().subscribe(
      data => {
        this.gradeDistributionData = data.distribution || [
          { name: 'Excellent (90-100)', value: 15 },
          { name: 'Good (80-89)', value: 25 },
          { name: 'Average (70-79)', value: 35 },
          { name: 'Below Average (60-69)', value: 20 },
          { name: 'Poor (0-59)', value: 5 }
        ];
      },
      error => {
        console.error('Error loading grade stats:', error);
        // Mock data for demo
        this.gradeDistributionData = [
          { name: 'Excellent (90-100)', value: 15 },
          { name: 'Good (80-89)', value: 25 },
          { name: 'Average (70-79)', value: 35 },
          { name: 'Below Average (60-69)', value: 20 },
          { name: 'Poor (0-59)', value: 5 }
        ];
      }
    );

    // Mock weekly sessions data
    const currentDate = new Date();
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.weeklySessionsData = weekDays.map(day => ({
      name: day,
      value: Math.floor(Math.random() * 5) + 1
    }));
  }

  getStatIcon(statType: string): string {
    const icons: { [key: string]: string } = {
      sessions: 'school',
      students: 'people',
      attendance: 'how_to_reg',
      grades: 'grade',
      messages: 'message',
      upcoming: 'event'
    };
    return icons[statType] || 'info';
  }

  getStatColor(statType: string): string {
    const colors: { [key: string]: string } = {
      sessions: '#1976d2',
      students: '#4caf50',
      attendance: '#ff9800',
      grades: '#9c27b0',
      messages: '#f44336',
      upcoming: '#00bcd4'
    };
    return colors[statType] || '#757575';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getSessionTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      cours: 'book',
      devoir: 'assignment',
      examen: 'quiz'
    };
    return icons[type] || 'school';
  }

  getNotificationIcon(type: string): string {
    const icons: { [key: string]: string } = {
      absence: 'person_off',
      grade: 'grade',
      session: 'event',
      message: 'message',
      general: 'info'
    };
    return icons[type] || 'notifications';
  }

  navigateToSessions(): void {
    // Navigation will be handled by the router
  }

  navigateToStudents(): void {
    // Navigation will be handled by the router
  }

  navigateToMessages(): void {
    // Navigation will be handled by the router
  }

  navigateToNotifications(): void {
    // Navigation will be handled by the router
  }

  onChartSelect(event: any): void {
    console.log('Chart selection:', event);
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StudentService, DashboardStats, Note, Notification, Session } from '../../services/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  stats: DashboardStats | null = null;
  performanceChartData: any[] = [];
  attendanceChartData: any[] = [];
  loading = true;
  chartLoading = true;

  // Chart options
  performanceChartOptions = {
    view: [400, 200],
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Subjects',
    showYAxisLabel: true,
    yAxisLabel: 'Grade',
    colorScheme: {
      domain: ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0']
    }
  };

  attendanceChartOptions = {
    view: [400, 200],
    gradient: true,
    showLegend: true,
    showLabels: true,
    isDoughnut: false,
    legendPosition: 'bottom',
    colorScheme: {
      domain: ['#4CAF50', '#F44336', '#FF9800', '#2196F3']
    }
  };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.chartLoading = true;

    // Load dashboard stats
    this.studentService.getDashboardStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.stats = stats;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading dashboard stats:', error);
          this.loading = false;
        }
      });

    // Load chart data
    this.studentService.getPerformanceChartData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.performanceChartData = data;
          this.chartLoading = false;
        },
        error: (error) => {
          console.error('Error loading performance chart data:', error);
          this.chartLoading = false;
        }
      });

    this.studentService.getAttendanceChartData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.attendanceChartData = data;
        },
        error: (error) => {
          console.error('Error loading attendance chart data:', error);
        }
      });
  }

  getGradeColor(grade: number): string {
    if (grade >= 90) return '#4CAF50';
    if (grade >= 80) return '#8BC34A';
    if (grade >= 70) return '#FFC107';
    if (grade >= 60) return '#FF9800';
    return '#F44336';
  }

  getAttendanceColor(rate: number): string {
    if (rate >= 90) return '#4CAF50';
    if (rate >= 80) return '#8BC34A';
    if (rate >= 70) return '#FFC107';
    if (rate >= 60) return '#FF9800';
    return '#F44336';
  }

  formatTime(time: string): string {
    return time.substring(0, 5);
  }

  getSessionStatusColor(status: string): string {
    switch (status) {
      case 'upcoming': return '#2196F3';
      case 'ongoing': return '#4CAF50';
      case 'completed': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'info': return 'info';
      case 'warning': return 'warning';
      case 'success': return 'check_circle';
      case 'error': return 'error';
      default: return 'notifications';
    }
  }

  getNotificationColor(type: string): string {
    switch (type) {
      case 'info': return '#2196F3';
      case 'warning': return '#FF9800';
      case 'success': return '#4CAF50';
      case 'error': return '#F44336';
      default: return '#9E9E9E';
    }
  }

  onChartClick(event: any): void {
    console.log('Chart clicked:', event);
  }
}
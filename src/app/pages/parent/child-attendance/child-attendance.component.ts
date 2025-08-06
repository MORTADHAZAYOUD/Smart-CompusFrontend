import { Component, OnInit } from '@angular/core';

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  arrivalTime?: string;
  departureTime?: string;
  reason?: string;
  justifiedAbsence?: boolean;
}

interface MonthlyStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  attendanceRate: number;
}

@Component({
  selector: 'app-child-attendance',
  templateUrl: './child-attendance.component.html',
  styleUrls: ['./child-attendance.component.scss']
})
export class ChildAttendanceComponent implements OnInit {
  currentMonth = new Date();
  selectedMonth = new Date();
  
  attendanceRecords: AttendanceRecord[] = [
    {
      date: '2024-01-15',
      status: 'present',
      arrivalTime: '08:15',
      departureTime: '16:30'
    },
    {
      date: '2024-01-16',
      status: 'present',
      arrivalTime: '08:10',
      departureTime: '16:30'
    },
    {
      date: '2024-01-17',
      status: 'absent',
      reason: 'Maladie',
      justifiedAbsence: true
    },
    {
      date: '2024-01-18',
      status: 'late',
      arrivalTime: '08:35',
      departureTime: '16:30',
      reason: 'Transport en retard'
    },
    {
      date: '2024-01-19',
      status: 'present',
      arrivalTime: '08:05',
      departureTime: '16:30'
    }
  ];

  monthlyStats: MonthlyStats = {
    totalDays: 20,
    presentDays: 16,
    absentDays: 2,
    lateDays: 2,
    attendanceRate: 80
  };

  constructor() {}

  ngOnInit(): void {
    this.calculateMonthlyStats();
  }

  calculateMonthlyStats(): void {
    const presentCount = this.attendanceRecords.filter(r => r.status === 'present').length;
    const absentCount = this.attendanceRecords.filter(r => r.status === 'absent').length;
    const lateCount = this.attendanceRecords.filter(r => r.status === 'late').length;
    const totalCount = this.attendanceRecords.length;

    this.monthlyStats = {
      totalDays: totalCount,
      presentDays: presentCount,
      absentDays: absentCount,
      lateDays: lateCount,
      attendanceRate: totalCount > 0 ? Math.round(((presentCount + lateCount) / totalCount) * 100) : 0
    };
  }

  changeMonth(direction: number): void {
    this.selectedMonth = new Date(this.selectedMonth.setMonth(this.selectedMonth.getMonth() + direction));
    // Here you would typically fetch new data for the selected month
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'present': return '✅';
      case 'absent': return '❌';
      case 'late': return '⏰';
      default: return '❓';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'present': return '#27ae60';
      case 'absent': return '#e74c3c';
      case 'late': return '#f39c12';
      default: return '#95a5a6';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getMonthYear(): string {
    return this.selectedMonth.toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    });
  }

  isCurrentMonth(): boolean {
    return this.selectedMonth.getMonth() === this.currentMonth.getMonth() &&
           this.selectedMonth.getFullYear() === this.currentMonth.getFullYear();
  }
}
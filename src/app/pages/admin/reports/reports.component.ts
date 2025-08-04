import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';

interface ReportData {
  studentRegistrations: {
    labels: string[];
    data: number[];
  };
  attendanceRates: {
    labels: string[];
    data: number[];
  };
  classDistribution: {
    labels: string[];
    data: number[];
  };
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  loading = true;
  selectedReport = 'overview';
  reportData: ReportData = {
    studentRegistrations: { labels: [], data: [] },
    attendanceRates: { labels: [], data: [] },
    classDistribution: { labels: [], data: [] }
  };

  overviewStats = {
    totalStudents: 0,
    totalTeachers: 0,
    averageAttendance: 0,
    activeClasses: 0
  };

  recentRegistrations: any[] = [];
  topPerformingClasses: any[] = [];

  reportTypes = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'attendance', label: 'Présences', icon: '✅' },
    { id: 'registrations', label: 'Inscriptions', icon: '📝' },
    { id: 'performance', label: 'Performances', icon: '📈' }
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData(): void {
    this.loading = true;

    // Simulate API calls with mock data
    setTimeout(() => {
      this.overviewStats = {
        totalStudents: 245,
        totalTeachers: 18,
        averageAttendance: 87.5,
        activeClasses: 12
      };

      this.reportData = {
        studentRegistrations: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
          data: [12, 19, 15, 25, 22, 18]
        },
        attendanceRates: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
          data: [92, 88, 85, 90, 87]
        },
        classDistribution: {
          labels: ['L1 Info', 'L2 Info', 'L3 Info', 'M1 Info', 'M2 Info'],
          data: [45, 52, 48, 35, 28]
        }
      };

      this.recentRegistrations = [
        {
          name: 'Marie Dubois',
          class: 'L3 Informatique',
          date: new Date(Date.now() - 1000 * 60 * 60 * 24),
          status: 'approved'
        },
        {
          name: 'Jean Martin',
          class: 'M1 Informatique',
          date: new Date(Date.now() - 1000 * 60 * 60 * 48),
          status: 'pending'
        },
        {
          name: 'Sophie Laurent',
          class: 'L2 Informatique',
          date: new Date(Date.now() - 1000 * 60 * 60 * 72),
          status: 'approved'
        }
      ];

      this.topPerformingClasses = [
        { name: 'L3 Informatique', average: 16.2, students: 48 },
        { name: 'M1 Informatique', average: 15.8, students: 35 },
        { name: 'L2 Informatique', average: 15.1, students: 52 },
        { name: 'M2 Informatique', average: 14.9, students: 28 },
        { name: 'L1 Informatique', average: 14.2, students: 45 }
      ];

      this.loading = false;
    }, 1000);
  }

  selectReport(reportId: string): void {
    this.selectedReport = reportId;
  }

  exportReport(): void {
    console.log('Exporting report:', this.selectedReport);
    // Implement export functionality
    alert('Fonctionnalité d\'export en cours de développement');
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'approved': return 'Approuvé';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR');
  }
}
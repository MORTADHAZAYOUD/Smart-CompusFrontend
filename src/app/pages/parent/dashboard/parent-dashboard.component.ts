import { Component, OnInit } from '@angular/core';

interface Child {
  id: number;
  name: string;
  class: string;
  averageGrade: number;
  attendance: number;
  behaviorRating: string;
  profileImage?: string;
  recentGrades: Grade[];
  upcomingExams: Exam[];
}

interface Grade {
  subject: string;
  grade: number;
  maxGrade: number;
  date: Date;
  type: string; // 'exam', 'homework', 'quiz'
}

interface Exam {
  subject: string;
  date: Date;
  time: string;
  type: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  date: Date;
  childName?: string;
  read: boolean;
}

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.scss']
})
export class ParentDashboardComponent implements OnInit {
  
  children: Child[] = [
    {
      id: 1,
      name: 'Emma Dupont',
      class: '3ème A',
      averageGrade: 15.2,
      attendance: 95,
      behaviorRating: 'Excellent',
      recentGrades: [
        { subject: 'Mathématiques', grade: 17, maxGrade: 20, date: new Date('2024-01-15'), type: 'exam' },
        { subject: 'Français', grade: 14, maxGrade: 20, date: new Date('2024-01-12'), type: 'homework' },
        { subject: 'Histoire', grade: 16, maxGrade: 20, date: new Date('2024-01-10'), type: 'quiz' }
      ],
      upcomingExams: [
        { subject: 'Sciences', date: new Date('2024-01-25'), time: '10:00', type: 'Contrôle' },
        { subject: 'Anglais', date: new Date('2024-01-28'), time: '14:00', type: 'Oral' }
      ]
    },
    {
      id: 2,
      name: 'Lucas Dupont',
      class: '6ème B',
      averageGrade: 13.8,
      attendance: 92,
      behaviorRating: 'Bien',
      recentGrades: [
        { subject: 'Mathématiques', grade: 12, maxGrade: 20, date: new Date('2024-01-14'), type: 'exam' },
        { subject: 'Français', grade: 15, maxGrade: 20, date: new Date('2024-01-11'), type: 'homework' },
        { subject: 'Arts', grade: 18, maxGrade: 20, date: new Date('2024-01-09'), type: 'project' }
      ],
      upcomingExams: [
        { subject: 'Géographie', date: new Date('2024-01-26'), time: '09:00', type: 'Interrogation' },
        { subject: 'Sport', date: new Date('2024-01-30'), time: '15:00', type: 'Évaluation' }
      ]
    }
  ];

  recentNotifications: Notification[] = [
    {
      id: 1,
      title: 'Nouvelle note disponible',
      message: 'Emma a reçu une nouvelle note en Mathématiques: 17/20',
      type: 'success',
      date: new Date('2024-01-15'),
      childName: 'Emma Dupont',
      read: false
    },
    {
      id: 2,
      title: 'Absence signalée',
      message: 'Lucas était absent le 14/01/2024 en cours de Sport',
      type: 'warning',
      date: new Date('2024-01-14'),
      childName: 'Lucas Dupont',
      read: false
    },
    {
      id: 3,
      title: 'Examen à venir',
      message: 'Contrôle de Sciences prévu le 25/01/2024 pour Emma',
      type: 'info',
      date: new Date('2024-01-13'),
      childName: 'Emma Dupont',
      read: true
    }
  ];

  currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
    // Load dashboard data
  }

  getGradeColor(grade: number, maxGrade: number): string {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return '#2ecc71';
    if (percentage >= 60) return '#f39c12';
    if (percentage >= 40) return '#e67e22';
    return '#e74c3c';
  }

  getBehaviorColor(rating: string): string {
    switch (rating.toLowerCase()) {
      case 'excellent': return '#2ecc71';
      case 'bien': return '#3498db';
      case 'moyen': return '#f39c12';
      case 'insuffisant': return '#e74c3c';
      default: return '#95a5a6';
    }
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'urgent': return '🚨';
      default: return '📢';
    }
  }

  getUpcomingExamsCount(): number {
    let count = 0;
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    this.children.forEach(child => {
      child.upcomingExams.forEach(exam => {
        if (exam.date >= today && exam.date <= nextWeek) {
          count++;
        }
      });
    });

    return count;
  }

  getUnreadNotificationsCount(): number {
    return this.recentNotifications.filter(notif => !notif.read).length;
  }

  getOverallAverageGrade(): number {
    if (this.children.length === 0) return 0;
    const total = this.children.reduce((sum, child) => sum + child.averageGrade, 0);
    return Math.round((total / this.children.length) * 10) / 10;
  }

  getOverallAttendance(): number {
    if (this.children.length === 0) return 0;
    const total = this.children.reduce((sum, child) => sum + child.attendance, 0);
    return Math.round(total / this.children.length);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatDateTime(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  markNotificationAsRead(notificationId: number): void {
    const notification = this.recentNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }
}
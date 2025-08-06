import { Component, OnInit } from '@angular/core';

interface DashboardStats {
  totalStudents: number;
  totalSessions: number;
  completedSessions: number;
  pendingGrades: number;
  todaySessions: number;
  unreadMessages: number;
}

interface RecentActivity {
  id: number;
  type: 'session' | 'grade' | 'message' | 'attendance';
  title: string;
  description: string;
  time: string;
  icon: string;
}

interface UpcomingSession {
  id: number;
  subject: string;
  time: string;
  duration: string;
  room: string;
  studentsCount: number;
}

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  
  stats: DashboardStats = {
    totalStudents: 125,
    totalSessions: 48,
    completedSessions: 35,
    pendingGrades: 12,
    todaySessions: 3,
    unreadMessages: 8
  };
  
  recentActivities: RecentActivity[] = [
    {
      id: 1,
      type: 'session',
      title: 'Séance de Mathématiques terminée',
      description: 'Classe de 3ème A - Algèbre',
      time: '10 min',
      icon: '📚'
    },
    {
      id: 2,
      type: 'grade',
      title: 'Notes attribuées',
      description: '25 copies corrigées en Physique',
      time: '1 h',
      icon: '🎯'
    },
    {
      id: 3,
      type: 'message',
      title: 'Nouveau message reçu',
      description: 'De Marie Martin - Question sur le cours',
      time: '2 h',
      icon: '💬'
    },
    {
      id: 4,
      type: 'attendance',
      title: 'Présences marquées',
      description: 'Classe de 2nde B - 28/30 présents',
      time: '3 h',
      icon: '✅'
    }
  ];
  
  upcomingSessions: UpcomingSession[] = [
    {
      id: 1,
      subject: 'Mathématiques - 1ère S',
      time: '14:00',
      duration: '2h',
      room: 'Salle 205',
      studentsCount: 32
    },
    {
      id: 2,
      subject: 'Physique - Terminale',
      time: '16:00',
      duration: '1h30',
      room: 'Labo 1',
      studentsCount: 28
    },
    {
      id: 3,
      subject: 'Mathématiques - 3ème A',
      time: '09:00',
      duration: '1h',
      room: 'Salle 102',
      studentsCount: 25
    }
  ];
  
  currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }
  
  getProgressPercentage(): number {
    return Math.round((this.stats.completedSessions / this.stats.totalSessions) * 100);
  }
  
  getActivityIcon(type: string): string {
    switch(type) {
      case 'session': return '📚';
      case 'grade': return '🎯';
      case 'message': return '💬';
      case 'attendance': return '✅';
      default: return '📢';
    }
  }
  
  navigateToSessions(): void {
    // Navigation logic
  }
  
  navigateToMessages(): void {
    // Navigation logic
  }
  
  navigateToGrades(): void {
    // Navigation logic
  }
}
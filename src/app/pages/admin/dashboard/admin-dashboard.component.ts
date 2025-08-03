import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  activeSchedules: number;
  todayAttendance: number;
  pendingRegistrations: number;
}

interface RecentActivity {
  id: number;
  type: 'registration' | 'login' | 'schedule' | 'grade';
  message: string;
  timestamp: Date;
  user?: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    activeSchedules: 0,
    todayAttendance: 0,
    pendingRegistrations: 0
  };

  recentActivities: RecentActivity[] = [];
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    
    // Simulate API calls - replace with actual service calls
    setTimeout(() => {
      this.stats = {
        totalStudents: 245,
        totalTeachers: 18,
        totalClasses: 12,
        activeSchedules: 8,
        todayAttendance: 92,
        pendingRegistrations: 5
      };

      this.recentActivities = [
        {
          id: 1,
          type: 'registration',
          message: 'Nouvelle inscription - Marie Dubois',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          user: 'Marie Dubois'
        },
        {
          id: 2,
          type: 'schedule',
          message: 'Emploi du temps modifié - Classe L3 Info',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          user: 'Prof. Martin'
        },
        {
          id: 3,
          type: 'login',
          message: 'Connexion enseignant - Dr. Sophie Laurent',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
          user: 'Dr. Sophie Laurent'
        },
        {
          id: 4,
          type: 'grade',
          message: 'Notes saisies - Mathématiques L2',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
          user: 'Prof. Durand'
        }
      ];

      this.loading = false;
    }, 1000);
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'registration': return '👤';
      case 'login': return '🔐';
      case 'schedule': return '📅';
      case 'grade': return '📝';
      default: return '📊';
    }
  }

  formatTimestamp(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) {
      return `Il y a ${hours}h`;
    } else if (minutes > 0) {
      return `Il y a ${minutes}min`;
    } else {
      return 'À l\'instant';
    }
  }
}
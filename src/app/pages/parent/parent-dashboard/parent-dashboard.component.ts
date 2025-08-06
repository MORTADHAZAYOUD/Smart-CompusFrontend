import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

interface DashboardCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  route?: string;
}

interface RecentActivity {
  type: string;
  message: string;
  time: string;
  icon: string;
}

interface UpcomingEvent {
  title: string;
  date: string;
  time: string;
  type: string;
}

@Component({
  selector: 'app-parent-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink,     RouterModule, FormsModule],
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.scss']
})
export class ParentDashboardComponent implements OnInit {
  childName = 'Marie Dupont';
  
  dashboardCards: DashboardCard[] = [
    {
      title: 'Présences ce mois',
      value: '18/20',
      icon: '✅',
      color: '#27ae60',
      route: '/parent/child-attendance'
    },
    {
      title: 'Moyenne générale',
      value: '15.5/20',
      icon: '📊',
      color: '#3498db',
      route: '/parent/child-notes'
    },
    {
      title: 'Messages non lus',
      value: 3,
      icon: '💬',
      color: '#e74c3c',
      route: '/parent/messages'
    },
    {
      title: 'Notifications',
      value: 5,
      icon: '🔔',
      color: '#f39c12',
      route: '/parent/notifications'
    }
  ];

  recentActivities: RecentActivity[] = [
    {
      type: 'attendance',
      message: 'Votre enfant est arrivé à l\'école à 08:15',
      time: 'Il y a 2 heures',
      icon: '🏫'
    },
    {
      type: 'grade',
      message: 'Nouvelle note en Mathématiques: 16/20',
      time: 'Hier à 16:30',
      icon: '📝'
    },
    {
      type: 'message',
      message: 'Nouveau message de Mme. Martin',
      time: 'Hier à 14:20',
      icon: '💬'
    },
    {
      type: 'event',
      message: 'Rappel: Réunion parent-professeur demain',
      time: 'Il y a 3 heures',
      icon: '📅'
    }
  ];

  upcomingEvents: UpcomingEvent[] = [
    {
      title: 'Réunion parent-professeur',
      date: '2024-01-15',
      time: '18:00',
      type: 'meeting'
    },
    {
      title: 'Sortie scolaire - Musée',
      date: '2024-01-18',
      time: '09:00',
      type: 'trip'
    },
    {
      title: 'Contrôle de Mathématiques',
      date: '2024-01-20',
      time: '10:00',
      type: 'exam'
    }
  ];

  weeklyAttendance = [
    { day: 'Lun', present: true },
    { day: 'Mar', present: true },
    { day: 'Mer', present: false },
    { day: 'Jeu', present: true },
    { day: 'Ven', present: true }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize dashboard data
  }

  navigateTo(route: string): void {
    if (route) {
      this.router.navigate([route]);
    }
  }

  getEventTypeIcon(type: string): string {
    switch (type) {
      case 'meeting': return '👥';
      case 'trip': return '🚌';
      case 'exam': return '📝';
      default: return '📅';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}
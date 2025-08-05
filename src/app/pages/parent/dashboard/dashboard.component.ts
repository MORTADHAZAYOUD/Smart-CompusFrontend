import { Component, OnInit } from '@angular/core';
import { ParentService, Child } from '../../../services/parent.service';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class ParentDashboardComponent implements OnInit {
  
  stats = {
    nombreEnfants: 0,
    moyenneGenerale: 0,
    tauxPresenceGlobal: 0,
    messagesPendants: 0,
    prochainRendezVous: null as Date | null
  };

  children: Child[] = [];
  upcomingEvents: any[] = [];
  recentNotifications: any[] = [];
  parentName = 'M. Parent';

  constructor(private parentService: ParentService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load dashboard statistics
    this.parentService.getDashboardStats().subscribe(data => {
      this.stats = data;
    });

    // Load children information
    this.parentService.getMyChildren().subscribe(children => {
      this.children = children;
    });

    // Load upcoming events
    this.parentService.getUpcomingEvents().subscribe(events => {
      this.upcomingEvents = events.slice(0, 3); // Show only first 3
    });

    // Load recent notifications
    this.parentService.getMyNotifications().subscribe(notifications => {
      this.recentNotifications = notifications.slice(0, 3); // Show only first 3
    });
  }

  navigateTo(route: string): void {
    window.location.href = `/parent/${route}`;
  }

  navigateToChild(childId: number, section: string): void {
    window.location.href = `/parent/child/${childId}/${section}`;
  }

  getChildGradeClass(moyenne: number): string {
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
}
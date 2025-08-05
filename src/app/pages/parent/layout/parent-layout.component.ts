import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-parent-layout',
  templateUrl: './parent-layout.component.html',
  styleUrls: ['./parent-layout.component.scss']
})
export class ParentLayoutComponent implements OnInit {
  currentUser = {
    name: 'Parent User',
    email: 'parent@smartcompus.com',
    profession: 'Ingénieur',
    childrenCount: 2
  };

  menuItems: MenuItem[] = [
    { label: 'Tableau de bord', icon: '📊', route: '/parent/dashboard' },
    { label: 'Mes enfants', icon: '👶', route: '/parent/children' },
    { label: 'Rapports scolaires', icon: '📈', route: '/parent/reports' },
    { label: 'Notifications', icon: '🔔', route: '/parent/notifications' },
    { label: 'Mon profil', icon: '👤', route: '/parent/profile' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateActiveMenuItem();
  }

  updateActiveMenuItem(): void {
    const currentUrl = this.router.url;
    this.menuItems.forEach(item => {
      item.active = currentUrl.includes(item.route);
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.updateActiveMenuItem();
  }

  logout(): void {
    // Implement logout logic
    this.router.navigate(['/login']);
  }

  // Get notification count (mock data for now)
  getNotificationCount(): number {
    return 3;
  }

  // Check if user has unread notifications
  hasNotifications(): boolean {
    return this.getNotificationCount() > 0;
  }
}
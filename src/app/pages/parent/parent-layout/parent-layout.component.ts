import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-layout',
  templateUrl: './parent-layout.component.html',
  styleUrls: ['./parent-layout.component.scss']
})
export class ParentLayoutComponent implements OnInit {
  isSidebarCollapsed = false;
  currentUser = { name: 'Parent User', email: 'parent@example.com' };
  unreadNotifications = 5;
  unreadMessages = 3;

  menuItems = [
    { 
      label: 'Dashboard', 
      icon: '📊', 
      route: '/parent/dashboard', 
      active: true 
    },
    { 
      label: 'Profil Enfant', 
      icon: '👤', 
      route: '/parent/child-profile', 
      active: false 
    },
    { 
      label: 'Présences', 
      icon: '✅', 
      route: '/parent/child-attendance', 
      active: false 
    },
    { 
      label: 'Notes', 
      icon: '📝', 
      route: '/parent/child-notes', 
      active: false 
    },
    { 
      label: 'Emploi du Temps', 
      icon: '📅', 
      route: '/parent/schedule', 
      active: false 
    },
    { 
      label: 'Événements', 
      icon: '🎉', 
      route: '/parent/events', 
      active: false 
    },
    { 
      label: 'Messages', 
      icon: '💬', 
      route: '/parent/messages', 
      active: false,
      badge: this.unreadMessages 
    },
    { 
      label: 'Notifications', 
      icon: '🔔', 
      route: '/parent/notifications', 
      active: false,
      badge: this.unreadNotifications 
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateActiveMenuItem();
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.updateActiveMenuItem();
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  private updateActiveMenuItem(): void {
    const currentRoute = this.router.url;
    this.menuItems.forEach(item => {
      item.active = currentRoute.includes(item.route);
    });
  }
}
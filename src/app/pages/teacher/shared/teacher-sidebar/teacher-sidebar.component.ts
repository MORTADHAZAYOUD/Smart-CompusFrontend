import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-teacher-sidebar',
    standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-sidebar.component.html',
  styleUrls: ['./teacher-sidebar.component.scss']
})
export class TeacherSidebarComponent implements OnInit {
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<boolean>();
  
  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Tableau de Bord',
      icon: '🏠',
      route: '/teacher/dashboard'
    },
    {
      id: 'sessions',
      label: 'Gestion des Séances',
      icon: '📚',
      route: '/teacher/sessions',
      children: [
        { id: 'manage-sessions', label: 'Gérer Séances', icon: '📝', route: '/teacher/sessions/manage' },
        { id: 'mark-attendance', label: 'Marquer Présences', icon: '✅', route: '/teacher/sessions/attendance' },
        { id: 'assign-grades', label: 'Attribuer Notes', icon: '🎯', route: '/teacher/sessions/grades' }
      ]
    },
    {
      id: 'tracking',
      label: 'Suivi Pédagogique',
      icon: '👥',
      route: '/teacher/tracking',
      children: [
        { id: 'student-profiles', label: 'Consulter Profils Élèves', icon: '👤', route: '/teacher/tracking/profiles' },
        { id: 'track-progress', label: 'Suivre Progression', icon: '📈', route: '/teacher/tracking/progress' },
        { id: 'analyze-results', label: 'Analyser Résultats', icon: '📊', route: '/teacher/tracking/results' }
      ]
    },
    {
      id: 'planning',
      label: 'Planning',
      icon: '📅',
      route: '/teacher/planning',
      children: [
        { id: 'view-calendar', label: 'Consulter Calendrier', icon: '📆', route: '/teacher/planning/calendar' },
        { id: 'plan-activities', label: 'Planifier Activités', icon: '⚡', route: '/teacher/planning/activities' }
      ]
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: '💬',
      route: '/teacher/messages',
      children: [
        { id: 'send-messages', label: 'Envoyer/Recevoir Messages', icon: '📨', route: '/teacher/messages/chat' },
        { id: 'notifications', label: 'Notifications', icon: '🔔', route: '/teacher/notifications' }
      ]
    }
  ];
  
  activeRoute = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.activeRoute = this.router.url;
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
    this.toggleCollapse.emit(this.collapsed);
  }

  toggleMenuItem(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    } else {
      this.navigateToRoute(item.route);
    }
  }

  navigateToRoute(route: string): void {
    this.router.navigate([route]);
    this.activeRoute = route;
  }

  isActive(route: string): boolean {
    return this.activeRoute === route || this.activeRoute.startsWith(route + '/');
  }

  hasActiveChild(item: MenuItem): boolean {
    if (!item.children) return false;
    return item.children.some(child => this.isActive(child.route));
  }
}
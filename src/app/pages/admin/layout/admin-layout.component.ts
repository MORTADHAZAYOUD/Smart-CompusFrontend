import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule // ✅ Needed for <router-outlet>
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  sidebarOpen = true;

  menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Tableau de bord' },
    { path: '/admin/students', icon: '👨‍🎓', label: 'Étudiants' },
    { path: '/admin/teachers', icon: '👨‍🏫', label: 'Enseignants' },
    { path: '/admin/classes', icon: '🏫', label: 'Classes' },
    { path: '/admin/schedules', icon: '📅', label: 'Emplois du temps' },
    { path: '/admin/reports', icon: '📈', label: 'Rapports' },
    { path: '/admin/settings', icon: '⚙️', label: 'Paramètres' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-header',
  templateUrl: './teacher-header.component.html',
  styleUrls: ['./teacher-header.component.scss']
})
export class TeacherHeaderComponent implements OnInit {
  @Input() sidebarCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  
  showNotificationsDropdown = false;
  showMessagesDropdown = false;
  showProfileDropdown = false;
  
  notifications = [
    { id: 1, title: 'Nouvelle séance programmée', message: 'Cours de mathématiques à 14h00', time: '5 min', type: 'info' },
    { id: 2, title: 'Absence signalée', message: 'Jean Dupont absent aujourd\'hui', time: '10 min', type: 'warning' },
    { id: 3, title: 'Devoir rendu', message: '5 nouveaux devoirs à corriger', time: '1 h', type: 'success' }
  ];
  
  messages = [
    { id: 1, sender: 'Marie Martin', message: 'Question sur le cours de physique', time: '2 min', avatar: 'MM' },
    { id: 2, sender: 'Pierre Durand', message: 'Demande de rendez-vous', time: '15 min', avatar: 'PD' },
    { id: 3, sender: 'Sophie Leroy', message: 'Merci pour l\'explication', time: '1 h', avatar: 'SL' }
  ];
  
  teacher = {
    name: 'Prof. Enseignant',
    email: 'enseignant@smartcampus.com',
    avatar: 'PE'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleDropdown(dropdown: string): void {
    this.showNotificationsDropdown = dropdown === 'notifications' ? !this.showNotificationsDropdown : false;
    this.showMessagesDropdown = dropdown === 'messages' ? !this.showMessagesDropdown : false;
    this.showProfileDropdown = dropdown === 'profile' ? !this.showProfileDropdown : false;
  }

  navigateToNotifications(): void {
    this.router.navigate(['/teacher/notifications']);
    this.showNotificationsDropdown = false;
  }

  navigateToMessages(): void {
    this.router.navigate(['/teacher/messages']);
    this.showMessagesDropdown = false;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  getNotificationIcon(type: string): string {
    switch(type) {
      case 'info': return '📘';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      default: return '📢';
    }
  }
}
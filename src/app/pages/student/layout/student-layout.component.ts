import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.scss']
})
export class StudentLayoutComponent implements OnInit {
  student: any = {};
  unreadNotifications = 0;
  unreadMessages = 0;
  isMenuOpen = false;

  constructor(
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadStudentProfile();
    this.loadNotificationCounts();
  }

  loadStudentProfile(): void {
    this.studentService.getMyProfile().subscribe(profile => {
      this.student = profile;
    });
  }

  loadNotificationCounts(): void {
    this.studentService.getMyNotifications().subscribe(notifications => {
      this.unreadNotifications = notifications.filter(n => !n.lu).length;
    });
    
    this.studentService.getMyMessages().subscribe(messages => {
      this.unreadMessages = messages.filter(m => !m.lu).length;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    // Implementation for logout
    this.router.navigate(['/login']);
  }

  navigateTo(route: string): void {
    this.router.navigate(['/student', route]);
    this.isMenuOpen = false;
  }
}
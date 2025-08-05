import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.scss']
})
export class StudentLayoutComponent implements OnInit {
  student: Student | null = null;
  loading = true;

  navigationItems = [
    { label: 'Dashboard', icon: 'dashboard', route: 'dashboard' },
    { label: 'My Profile', icon: 'person', route: 'profile' },
    { label: 'My Notes', icon: 'school', route: 'notes' },
    { label: 'My Attendance', icon: 'event_available', route: 'attendance' },
    { label: 'My Sessions', icon: 'schedule', route: 'sessions' },
    { label: 'My Schedule', icon: 'calendar_today', route: 'schedule' },
    { label: 'Events', icon: 'event', route: 'events' },
    { label: 'Messages', icon: 'message', route: 'messages' },
    { label: 'Notifications', icon: 'notifications', route: 'notifications' }
  ];

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudentProfile();
  }

  loadStudentProfile(): void {
    this.studentService.getStudentProfile().subscribe({
      next: (student) => {
        this.student = student;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading student profile:', error);
        this.loading = false;
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([`/student/${route}`]);
  }

  logout(): void {
    // Implement logout logic
    console.log('Logout clicked');
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { StudentService, Student } from '../../services/student.service';

interface NavigationItem {
  path: string;
  title: string;
  icon: string;
  badge?: number;
}

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.scss']
})
export class StudentLayoutComponent implements OnInit {
  @ViewChild('drawer', { static: true }) drawer!: MatSidenav;
  
  currentStudent$: Observable<Student | null>;
  currentPageTitle = 'Dashboard';
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  navigationItems: NavigationItem[] = [
    { path: '/student/dashboard', title: 'Dashboard', icon: 'dashboard' },
    { path: '/student/profile', title: 'My Profile', icon: 'person' },
    { path: '/student/notes', title: 'My Notes', icon: 'grade' },
    { path: '/student/attendance', title: 'My Attendance', icon: 'how_to_reg' },
    { path: '/student/sessions', title: 'My Sessions', icon: 'schedule' },
    { path: '/student/schedule', title: 'My Schedule', icon: 'calendar_today' },
    { path: '/student/events', title: 'Events', icon: 'event' },
    { path: '/student/messages', title: 'Messages', icon: 'message', badge: 5 },
    { path: '/student/notifications', title: 'Notifications', icon: 'notifications', badge: 2 }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private studentService: StudentService
  ) {
    this.currentStudent$ = this.studentService.getCurrentStudent();
  }

  ngOnInit(): void {
    // Update page title based on current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updatePageTitle(event.url);
    });

    // Update initial page title
    this.updatePageTitle(this.router.url);
  }

  private updatePageTitle(url: string): void {
    const item = this.navigationItems.find(nav => url.includes(nav.path.split('/').pop() || ''));
    this.currentPageTitle = item ? item.title : 'Dashboard';
  }

  onNavigationClick(): void {
    // Close drawer on mobile after navigation
    this.isHandset$.subscribe(isHandset => {
      if (isHandset && this.drawer) {
        this.drawer.close();
      }
    });
  }

  logout(): void {
    // Handle logout logic here
    console.log('Logout clicked');
  }
}
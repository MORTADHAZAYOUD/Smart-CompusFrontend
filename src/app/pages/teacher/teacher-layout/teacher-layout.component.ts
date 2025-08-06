import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { TeacherService, Notification } from '../../../services/teacher.service';
import { AuthService } from '../../../services/auth.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-teacher-layout',
  templateUrl: './teacher-layout.component.html',
  styleUrls: ['./teacher-layout.component.scss']
})
export class TeacherLayoutComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  currentRoute = '';
  teacherName = '';
  unreadNotifications = 0;
  unreadMessages = 0;

  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/teacher/dashboard' },
    { icon: 'school', label: 'Sessions', route: '/teacher/sessions' },
    { icon: 'people', label: 'Students', route: '/teacher/students' },
    { icon: 'event', label: 'Calendar', route: '/teacher/calendar' },
    { icon: 'message', label: 'Messages', route: '/teacher/messages', badge: 0 },
    { icon: 'notifications', label: 'Notifications', route: '/teacher/notifications', badge: 0 }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private teacherService: TeacherService,
    private authService: AuthService
  ) {
    // Track current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadNotificationCounts();
  }

  loadUserInfo(): void {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      this.teacherName = `${user.firstName} ${user.lastName}`;
    }
  }

  loadNotificationCounts(): void {
    // Load unread notifications count
    this.teacherService.getUnreadNotificationsCount().subscribe(count => {
      this.unreadNotifications = count;
      this.updateMenuBadge('notifications', count);
    });

    // Load unread messages count
    this.teacherService.getMessages().subscribe(messages => {
      this.unreadMessages = messages.filter(m => !m.isRead).length;
      this.updateMenuBadge('messages', this.unreadMessages);
    });
  }

  updateMenuBadge(route: string, count: number): void {
    const menuItem = this.menuItems.find(item => item.route.includes(route));
    if (menuItem) {
      menuItem.badge = count > 0 ? count : undefined;
    }
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute.includes(route);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    
    // Close drawer on mobile after navigation
    this.isHandset$.subscribe(isHandset => {
      if (isHandset && this.drawer) {
        this.drawer.close();
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  openProfile(): void {
    // Navigate to teacher profile or open profile dialog
    console.log('Open teacher profile');
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationItemComponent } from '../shared/notification-item/notification-item.component';
import { StudentService, Notification } from '../../../services/student.service';

@Component({
  selector: 'app-student-notifications',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatBadgeModule,
    NotificationItemComponent
  ],
  templateUrl: './student-notifications.component.html',
  styleUrls: ['./student-notifications.component.scss']
})
export class StudentNotificationsComponent implements OnInit {
  notifications$: Observable<Notification[]>;
  unreadCount = 0;

  constructor(private studentService: StudentService) {
    this.notifications$ = this.studentService.getNotifications();
  }

  ngOnInit(): void {
    this.notifications$.subscribe(notifications => {
      this.unreadCount = notifications.filter(n => !n.isRead).length;
    });
  }

  onMarkAsRead(notificationId: number): void {
    this.studentService.markNotificationAsRead(notificationId).subscribe();
  }

  onActionClicked(actionUrl: string): void {
    // Handle navigation or action
    console.log('Action clicked:', actionUrl);
  }

  markAllAsRead(): void {
    this.studentService.markAllNotificationsAsRead().subscribe();
  }

  getUnreadNotifications(): Observable<Notification[]> {
    return this.studentService.getUnreadNotifications();
  }

  getAllNotifications(): Observable<Notification[]> {
    return this.notifications$;
  }

  trackByNotificationId(index: number, notification: Notification): number {
    return notification.id;
  }
}
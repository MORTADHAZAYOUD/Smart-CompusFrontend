import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../../services/student.service';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent {
  @Input() notification!: Notification;
  @Input() compact: boolean = false;
  @Output() markAsRead = new EventEmitter<number>();
  @Output() actionClicked = new EventEmitter<string>();

  getNotificationIcon(type: string): string {
    const icons = {
      'info': 'info',
      'warning': 'warning',
      'success': 'check_circle',
      'error': 'error'
    };
    return icons[type as keyof typeof icons] || 'notifications';
  }

  getNotificationColor(type: string): string {
    const colors = {
      'info': 'primary',
      'warning': 'warn',
      'success': 'primary',
      'error': 'warn'
    };
    return colors[type as keyof typeof colors] || 'primary';
  }

  formatDate(date: string): string {
    const notificationDate = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - notificationDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return notificationDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  }

  onMarkAsRead(): void {
    if (!this.notification.isRead) {
      this.markAsRead.emit(this.notification.id);
    }
  }

  onActionClick(): void {
    if (this.notification.actionUrl) {
      this.actionClicked.emit(this.notification.actionUrl);
    }
  }
}
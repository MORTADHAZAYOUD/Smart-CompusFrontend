import { Component, Input } from '@angular/core';
import { Event } from '../../../services/student.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event!: Event;
  @Input() compact: boolean = false;

  getEventTypeIcon(type: string): string {
    const icons = {
      'academic': 'school',
      'social': 'people',
      'exam': 'quiz',
      'holiday': 'beach_access',
      'meeting': 'groups'
    };
    return icons[type as keyof typeof icons] || 'event';
  }

  getEventTypeColor(type: string): string {
    const colors = {
      'academic': 'primary',
      'social': 'accent',
      'exam': 'warn',
      'holiday': 'primary',
      'meeting': 'primary'
    };
    return colors[type as keyof typeof colors] || 'primary';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }

  formatTime(time: string): string {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  getTimeRange(): string {
    if (this.event.startTime && this.event.endTime) {
      return `${this.formatTime(this.event.startTime)} - ${this.formatTime(this.event.endTime)}`;
    }
    return 'All day';
  }
}
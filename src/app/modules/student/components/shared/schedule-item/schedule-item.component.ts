import { Component, Input } from '@angular/core';
import { Session } from '../../../services/student.service';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent {
  @Input() session!: Session;
  @Input() compact: boolean = false;

  getSessionTypeIcon(type: string): string {
    const icons = {
      'Lecture': 'school',
      'Lab': 'science',
      'Tutorial': 'help',
      'Exam': 'quiz'
    };
    return icons[type as keyof typeof icons] || 'schedule';
  }

  getSessionTypeColor(type: string): string {
    const colors = {
      'Lecture': 'primary',
      'Lab': 'accent',
      'Tutorial': 'warn',
      'Exam': 'warn'
    };
    return colors[type as keyof typeof colors] || 'primary';
  }

  formatTime(time: string): string {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
}
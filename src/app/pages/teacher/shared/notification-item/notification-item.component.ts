import { Component, Input } from '@angular/core';
import { Notification } from '../../../../services/teacher.service';

@Component({
  selector: 'app-notification-item',
  template: `<div>Notification Item Placeholder</div>`
})
export class NotificationItemComponent {
  @Input() notification!: Notification;
}
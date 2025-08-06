import { Component, Input } from '@angular/core';
import { Message } from '../../../../services/teacher.service';

@Component({
  selector: 'app-message-item',
  template: `<div>Message Item Placeholder</div>`
})
export class MessageItemComponent {
  @Input() message!: Message;
}
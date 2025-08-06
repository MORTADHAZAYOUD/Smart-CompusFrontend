import { Component, Input } from '@angular/core';
import { Session } from '../../../../services/teacher.service';

@Component({
  selector: 'app-session-card',
  template: `<div>Session Card Placeholder</div>`
})
export class SessionCardComponent {
  @Input() session!: Session;
}
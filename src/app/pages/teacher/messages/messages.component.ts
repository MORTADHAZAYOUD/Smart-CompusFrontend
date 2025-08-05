import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-messages',
  template: `
    <div class="page-header">
      <h1>Messages</h1>
      <p>Communiquez avec les parents et collègues</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">💬</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra de gérer vos messages</p>
    </div>
  `,
  styleUrls: ['./messages.component.scss']
})
export class TeacherMessagesComponent {}
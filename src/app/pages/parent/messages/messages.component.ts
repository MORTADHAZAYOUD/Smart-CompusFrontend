import { Component } from '@angular/core';

@Component({
  selector: 'app-parent-messages',
  template: `
    <div class="page-header">
      <h1>Messages</h1>
      <p>Échangez avec les enseignants</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">💬</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra d'échanger des messages</p>
    </div>
  `,
  styleUrls: ['./messages.component.scss']
})
export class ParentMessagesComponent {}
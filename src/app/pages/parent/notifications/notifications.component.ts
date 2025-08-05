import { Component } from '@angular/core';

@Component({
  selector: 'app-parent-notifications',
  template: `
    <div class="page-header">
      <h1>Notifications</h1>
      <p>Recevez les alertes importantes</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">🔔</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra de gérer vos notifications</p>
    </div>
  `,
  styleUrls: ['./notifications.component.scss']
})
export class ParentNotificationsComponent {}
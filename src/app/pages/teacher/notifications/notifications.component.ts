import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-notifications',
  template: `
    <div class="page-header">
      <h1>Notifications</h1>
      <p>Gérez vos notifications et alertes</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">🔔</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra de gérer vos notifications</p>
    </div>
  `,
  styleUrls: ['./notifications.component.scss']
})
export class TeacherNotificationsComponent {}
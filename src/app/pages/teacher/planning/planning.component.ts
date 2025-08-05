import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-planning',
  template: `
    <div class="page-header">
      <h1>Planning</h1>
      <p>Gérez votre emploi du temps et planifiez vos activités</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">📅</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra de gérer votre planning</p>
    </div>
  `,
  styleUrls: ['./planning.component.scss']
})
export class TeacherPlanningComponent {}
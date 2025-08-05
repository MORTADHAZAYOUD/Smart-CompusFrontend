import { Component } from '@angular/core';

@Component({
  selector: 'app-parent-planning',
  template: `
    <div class="page-header">
      <h1>Planning</h1>
      <p>Consultez l'emploi du temps et les événements</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">📅</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra de consulter le planning de vos enfants</p>
    </div>
  `,
  styleUrls: ['./planning.component.scss']
})
export class ParentPlanningComponent {}
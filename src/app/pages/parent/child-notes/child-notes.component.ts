import { Component } from '@angular/core';

@Component({
  selector: 'app-child-notes',
  template: `
    <div class="page-header">
      <h1>Notes des Enfants</h1>
      <p>Consultez les notes et résultats scolaires de vos enfants</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">📊</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra de consulter les notes de vos enfants</p>
    </div>
  `,
  styleUrls: ['./child-notes.component.scss']
})
export class ChildNotesComponent {}
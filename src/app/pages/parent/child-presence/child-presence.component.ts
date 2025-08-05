import { Component } from '@angular/core';

@Component({
  selector: 'app-child-presence',
  template: `
    <div class="page-header">
      <h1>Présences des Enfants</h1>
      <p>Suivez l'assiduité de vos enfants</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">✅</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra de suivre les présences de vos enfants</p>
    </div>
  `,
  styleUrls: ['./child-presence.component.scss']
})
export class ChildPresenceComponent {}
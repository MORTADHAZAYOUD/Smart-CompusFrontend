import { Component } from '@angular/core';

@Component({
  selector: 'app-pedagogical-tracking',
  template: `
    <div class="page-header">
      <h1>Suivi Pédagogique</h1>
      <p>Suivez la progression de vos élèves</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">📊</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra de suivre la progression pédagogique</p>
    </div>
  `,
  styleUrls: ['./pedagogical-tracking.component.scss']
})
export class PedagogicalTrackingComponent {}
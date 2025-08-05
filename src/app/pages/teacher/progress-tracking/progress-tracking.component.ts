import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-tracking',
  template: `
    <div class="page-header">
      <h1>Suivi Progression</h1>
      <p>Suivez la progression individuelle des élèves</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">📈</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra de suivre la progression individuelle</p>
    </div>
  `,
  styleUrls: ['./progress-tracking.component.scss']
})
export class ProgressTrackingComponent {}
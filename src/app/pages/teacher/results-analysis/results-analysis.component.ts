import { Component } from '@angular/core';

@Component({
  selector: 'app-results-analysis',
  template: `
    <div class="page-header">
      <h1>Analyse Résultats</h1>
      <p>Analysez les résultats de vos classes</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">📋</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra d'analyser les résultats</p>
    </div>
  `,
  styleUrls: ['./results-analysis.component.scss']
})
export class ResultsAnalysisComponent {}
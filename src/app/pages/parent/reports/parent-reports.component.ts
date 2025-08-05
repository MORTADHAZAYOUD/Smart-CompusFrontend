import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-reports',
  template: `
    <div class="reports">
      <div class="page-header">
        <h1>📈 Rapports scolaires</h1>
        <p>Consultez les rapports détaillés de vos enfants</p>
      </div>
      <div class="coming-soon">
        <div class="icon">🚧</div>
        <h2>Fonctionnalité en développement</h2>
        <p>Les rapports scolaires seront bientôt disponibles.</p>
      </div>
    </div>
  `,
  styles: [`
    .reports { padding: 2rem; }
    .page-header { text-align: center; margin-bottom: 2rem; }
    .page-header h1 { color: white; font-size: 2.2rem; margin: 0 0 0.5rem 0; }
    .page-header p { color: rgba(255, 255, 255, 0.9); font-size: 1.1rem; }
    .coming-soon { 
      background: rgba(255, 255, 255, 0.95); 
      border-radius: 15px; 
      padding: 3rem; 
      text-align: center; 
    }
    .coming-soon .icon { font-size: 4rem; margin-bottom: 1rem; }
    .coming-soon h2 { color: #2c3e50; margin: 0 0 1rem 0; }
    .coming-soon p { color: #7f8c8d; }
  `]
})
export class ParentReportsComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
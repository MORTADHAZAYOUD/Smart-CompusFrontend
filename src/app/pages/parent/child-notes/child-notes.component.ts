import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-notes',
  template: `
    <div class="child-notes">
      <div class="notes-header">
        <h1>📝 Notes de l'enfant</h1>
        <p>Consultez les évaluations et les notes de votre enfant</p>
      </div>
      <div class="coming-soon">
        <div class="icon">📝</div>
        <h2>Fonctionnalité en cours de développement</h2>
        <p>La consultation des notes sera bientôt disponible</p>
      </div>
    </div>
  `,
  styles: [`
    .child-notes {
      .notes-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        border-radius: 12px;
        margin-bottom: 30px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        
        h1 { margin: 0 0 10px 0; font-size: 2rem; font-weight: 600; }
        p { margin: 0; opacity: 0.9; font-size: 1.1rem; }
      }
      
      .coming-soon {
        background: white;
        border-radius: 12px;
        padding: 60px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        
        .icon { font-size: 4rem; margin-bottom: 20px; opacity: 0.5; }
        h2 { color: #2c3e50; margin-bottom: 15px; }
        p { color: #7f8c8d; font-size: 1.1rem; }
      }
    }
  `]
})
export class ChildNotesComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
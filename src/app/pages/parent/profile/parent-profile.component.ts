import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-profile',
  template: `
    <div class="profile">
      <div class="page-header">
        <h1>👤 Mon profil parent</h1>
        <p>Gérez vos informations personnelles et paramètres</p>
      </div>
      <div class="coming-soon">
        <div class="icon">⚙️</div>
        <h2>Gestion du profil</h2>
        <p>La gestion complète du profil sera bientôt disponible.</p>
      </div>
    </div>
  `,
  styles: [`
    .profile { padding: 2rem; }
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
export class ParentProfileComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
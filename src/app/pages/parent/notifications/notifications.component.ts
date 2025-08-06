import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  template: `
    <div class="notifications">
      <div class="notifications-header">
        <h1>🔔 Notifications</h1>
        <p>Consultez vos notifications et alertes</p>
      </div>
      <div class="coming-soon">
        <div class="icon">🔔</div>
        <h2>Fonctionnalité en cours de développement</h2>
        <p>Le système de notifications sera bientôt disponible</p>
      </div>
    </div>
  `,
  styles: [`
    .notifications {
      .notifications-header {
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
export class NotificationsComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
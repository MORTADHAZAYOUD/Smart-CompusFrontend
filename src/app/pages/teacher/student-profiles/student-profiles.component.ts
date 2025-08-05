import { Component } from '@angular/core';

@Component({
  selector: 'app-student-profiles',
  template: `
    <div class="page-header">
      <h1>Profils Élèves</h1>
      <p>Consultez les profils de vos élèves</p>
    </div>
    <div class="empty-state">
      <div class="empty-icon">👥</div>
      <h3>Fonctionnalité en développement</h3>
      <p>Cette section permettra de consulter les profils élèves</p>
    </div>
  `,
  styleUrls: ['./student-profiles.component.scss']
})
export class StudentProfilesComponent {}
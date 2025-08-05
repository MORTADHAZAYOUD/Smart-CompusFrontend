import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLayoutComponent } from './layout/student-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyNotesComponent } from './my-notes/my-notes.component';
import { EmploiTempsComponent } from './emploi-temps/emploi-temps.component';
import { MySeancesComponent } from './my-seances/my-seances.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'my-notes', component: MyNotesComponent },
      { path: 'emploi-temps', component: EmploiTempsComponent },
      { path: 'my-seances', component: MySeancesComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'profil', component: ProfilComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
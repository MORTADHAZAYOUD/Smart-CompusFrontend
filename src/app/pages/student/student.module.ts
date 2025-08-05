import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StudentRoutingModule } from './student-routing.module';
import { StudentLayoutComponent } from './layout/student-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyNotesComponent } from './my-notes/my-notes.component';
import { EmploiTempsComponent } from './emploi-temps/emploi-temps.component';
import { MySeancesComponent } from './my-seances/my-seances.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfilComponent } from './profil/profil.component';

@NgModule({
  declarations: [
    StudentLayoutComponent,
    DashboardComponent,
    MyNotesComponent,
    EmploiTempsComponent,
    MySeancesComponent,
    MessagesComponent,
    NotificationsComponent,
    ProfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
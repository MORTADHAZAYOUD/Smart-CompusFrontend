import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ParentLayoutComponent } from './parent-layout/parent-layout.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';
import { ChildProfileComponent } from './child-profile/child-profile.component';
import { ChildAttendanceComponent } from './child-attendance/child-attendance.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: ParentLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ParentDashboardComponent },
      { path: 'child-profile', component: ChildProfileComponent },
      { path: 'child-attendance', component: ChildAttendanceComponent },
      { path: 'messages', component: MessagesComponent },
    ]
  }
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ParentLayoutComponent,
    ParentDashboardComponent,
    ChildProfileComponent,
    ChildAttendanceComponent,
    MessagesComponent,
  ]
})
export class ParentModule { }
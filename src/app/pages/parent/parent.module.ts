import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ParentLayoutComponent } from './parent-layout/parent-layout.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';
import { ChildProfileComponent } from './child-profile/child-profile.component';
import { ChildAttendanceComponent } from './child-attendance/child-attendance.component';
import { ChildNotesComponent } from './child-notes/child-notes.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EventsComponent } from './events/events.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: ParentLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ParentDashboardComponent },
      { path: 'child-profile', component: ChildProfileComponent },
      { path: 'child-attendance', component: ChildAttendanceComponent },
      { path: 'child-notes', component: ChildNotesComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'events', component: EventsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'notifications', component: NotificationsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ParentLayoutComponent,
    ParentDashboardComponent,
    ChildProfileComponent,
    ChildAttendanceComponent,
    ChildNotesComponent,
    ScheduleComponent,
    EventsComponent,
    MessagesComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ParentModule { }
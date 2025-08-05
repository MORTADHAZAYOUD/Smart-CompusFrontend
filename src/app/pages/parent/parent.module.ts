import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ParentDashboardComponent } from './dashboard/dashboard.component';
import { ChildTrackingComponent } from './child-tracking/child-tracking.component';
import { ChildNotesComponent } from './child-notes/child-notes.component';
import { ChildPresenceComponent } from './child-presence/child-presence.component';
import { ParentPlanningComponent } from './planning/planning.component';
import { ParentMessagesComponent } from './messages/messages.component';
import { ParentNotificationsComponent } from './notifications/notifications.component';

const routes = [
  { path: '', component: ParentDashboardComponent },
  { path: 'dashboard', component: ParentDashboardComponent },
  { path: 'child-tracking', component: ChildTrackingComponent },
  { path: 'child-notes', component: ChildNotesComponent },
  { path: 'child-presence', component: ChildPresenceComponent },
  { path: 'planning', component: ParentPlanningComponent },
  { path: 'messages', component: ParentMessagesComponent },
  { path: 'notifications', component: ParentNotificationsComponent }
];

@NgModule({
  declarations: [
    ParentDashboardComponent,
    ChildTrackingComponent,
    ChildNotesComponent,
    ChildPresenceComponent,
    ParentPlanningComponent,
    ParentMessagesComponent,
    ParentNotificationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ParentModule { }
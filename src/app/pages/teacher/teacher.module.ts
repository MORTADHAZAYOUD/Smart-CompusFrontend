import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TeacherDashboardComponent } from './dashboard/dashboard.component';
import { SessionManagementComponent } from './session-management/session-management.component';
import { PedagogicalTrackingComponent } from './pedagogical-tracking/pedagogical-tracking.component';
import { StudentProfilesComponent } from './student-profiles/student-profiles.component';
import { ProgressTrackingComponent } from './progress-tracking/progress-tracking.component';
import { ResultsAnalysisComponent } from './results-analysis/results-analysis.component';
import { TeacherPlanningComponent } from './planning/planning.component';
import { TeacherMessagesComponent } from './messages/messages.component';
import { TeacherNotificationsComponent } from './notifications/notifications.component';

const routes = [
  { path: '', component: TeacherDashboardComponent },
  { path: 'dashboard', component: TeacherDashboardComponent },
  { path: 'sessions', component: SessionManagementComponent },
  { path: 'pedagogical-tracking', component: PedagogicalTrackingComponent },
  { path: 'student-profiles', component: StudentProfilesComponent },
  { path: 'progress-tracking', component: ProgressTrackingComponent },
  { path: 'results-analysis', component: ResultsAnalysisComponent },
  { path: 'planning', component: TeacherPlanningComponent },
  { path: 'messages', component: TeacherMessagesComponent },
  { path: 'notifications', component: TeacherNotificationsComponent }
];

@NgModule({
  declarations: [
    TeacherDashboardComponent,
    SessionManagementComponent,
    PedagogicalTrackingComponent,
    StudentProfilesComponent,
    ProgressTrackingComponent,
    ResultsAnalysisComponent,
    TeacherPlanningComponent,
    TeacherMessagesComponent,
    TeacherNotificationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TeacherModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherLayoutComponent } from './teacher-layout/teacher-layout.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { SessionManagementComponent } from './session-management/session-management.component';
import { StudentTrackingComponent } from './student-tracking/student-tracking.component';
import { PlanningComponent } from './planning/planning.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TeacherHeaderComponent } from './shared/teacher-header/teacher-header.component';
import { TeacherSidebarComponent } from './shared/teacher-sidebar/teacher-sidebar.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TeacherRoutingModule,

  ]
})
export class TeacherModule { }
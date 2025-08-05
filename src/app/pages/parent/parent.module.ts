import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentLayoutComponent } from './layout/parent-layout.component';
import { ParentDashboardComponent } from './dashboard/parent-dashboard.component';
import { ChildrenManagementComponent } from './children-management/children-management.component';
import { ParentReportsComponent } from './reports/parent-reports.component';
import { ParentNotificationsComponent } from './notifications/parent-notifications.component';
import { ParentProfileComponent } from './profile/parent-profile.component';

@NgModule({
  declarations: [
    ParentLayoutComponent,
    ParentDashboardComponent,
    ChildrenManagementComponent,
    ParentReportsComponent,
    ParentNotificationsComponent,
    ParentProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ParentRoutingModule
  ]
})
export class ParentModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { StudentsManagementComponent } from './students/students-management.component';
import { TeachersManagementComponent } from './teachers/teachers-management.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AdminRoutingModule,
    AdminLayoutComponent,
    AdminDashboardComponent,
    StudentsManagementComponent,
    TeachersManagementComponent,
    ReportsComponent,
    SettingsComponent

  ]
})
export class AdminModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentLayoutComponent } from './layout/parent-layout.component';
import { ParentDashboardComponent } from './dashboard/parent-dashboard.component';
import { ChildrenManagementComponent } from './children-management/children-management.component';
import { ParentReportsComponent } from './reports/parent-reports.component';
import { ParentNotificationsComponent } from './notifications/parent-notifications.component';
import { ParentProfileComponent } from './profile/parent-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ParentLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ParentDashboardComponent },
      { path: 'children', component: ChildrenManagementComponent },
      { path: 'reports', component: ParentReportsComponent },
      { path: 'notifications', component: ParentNotificationsComponent },
      { path: 'profile', component: ParentProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
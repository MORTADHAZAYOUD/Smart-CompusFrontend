import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { NotificationItemComponent } from './shared/notification-item/notification-item.component';

const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        component: StudentDashboardComponent,
        data: { title: 'Dashboard', icon: 'dashboard' }
      },

      { 
        path: 'notifications', 
        component: NotificationItemComponent,
        data: { title: 'Notifications', icon: 'notifications' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
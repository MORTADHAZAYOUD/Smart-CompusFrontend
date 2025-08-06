import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentNotesComponent } from './student-notes/student-notes.component';
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
        path: 'profile', 
        component: StudentProfileComponent,
        data: { title: 'My Profile', icon: 'person' }
      },
      { 
        path: 'notes', 
        component: StudentNotesComponent,
        data: { title: 'My Notes', icon: 'grade' }
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
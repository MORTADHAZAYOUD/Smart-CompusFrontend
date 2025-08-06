import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherGuard } from '../../core/guards/teacher.guard';
import { TeacherLayoutComponent } from './teacher-layout/teacher-layout.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { SessionManagementComponent } from './session-management/session-management.component';
import { StudentMonitoringComponent } from './student-monitoring/student-monitoring.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MessagingComponent } from './messaging/messaging.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherLayoutComponent,
    canActivate: [TeacherGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: TeacherDashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: 'sessions',
        component: SessionManagementComponent,
        data: { title: 'Session Management' }
      },
      {
        path: 'students',
        component: StudentMonitoringComponent,
        data: { title: 'Student Monitoring' }
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        data: { title: 'Calendar' }
      },
      {
        path: 'messages',
        component: MessagingComponent,
        data: { title: 'Messages' }
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: { title: 'Notifications' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
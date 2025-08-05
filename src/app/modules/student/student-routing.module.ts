import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentLayoutComponent } from './components/student-layout/student-layout.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { StudentNotesComponent } from './components/student-notes/student-notes.component';
import { StudentAttendanceComponent } from './components/student-attendance/student-attendance.component';
import { StudentSessionsComponent } from './components/student-sessions/student-sessions.component';
import { StudentScheduleComponent } from './components/student-schedule/student-schedule.component';
import { StudentEventsComponent } from './components/student-events/student-events.component';
import { StudentMessagesComponent } from './components/student-messages/student-messages.component';
import { StudentNotificationsComponent } from './components/student-notifications/student-notifications.component';

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
        path: 'attendance', 
        component: StudentAttendanceComponent,
        data: { title: 'My Attendance', icon: 'how_to_reg' }
      },
      { 
        path: 'sessions', 
        component: StudentSessionsComponent,
        data: { title: 'My Sessions', icon: 'schedule' }
      },
      { 
        path: 'schedule', 
        component: StudentScheduleComponent,
        data: { title: 'My Schedule', icon: 'calendar_today' }
      },
      { 
        path: 'events', 
        component: StudentEventsComponent,
        data: { title: 'Events', icon: 'event' }
      },
      { 
        path: 'messages', 
        component: StudentMessagesComponent,
        data: { title: 'Messages', icon: 'message' }
      },
      { 
        path: 'notifications', 
        component: StudentNotificationsComponent,
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
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';   
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { StudentLayoutComponent } from './pages/student/student-layout/student-layout.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './pages/student/student-profile/student-profile.component';
import { StudentNotesComponent } from './pages/student/student-notes/student-notes.component';
import { NotificationItemComponent } from './pages/student/shared/notification-item/notification-item.component';

export const routes: Routes = [
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path: 'home', component: HomeComponent },
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
    },
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

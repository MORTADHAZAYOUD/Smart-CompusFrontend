import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';   
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/student/dashboard/dashboard.component';
export const routes: Routes = [
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path: 'home', component: HomeComponent },
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'dashboard', component: DashboardComponent },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'parent',
        loadChildren: () => import('./pages/parent/parent.module').then(m => m.ParentModule)
    },
    {
        path: 'teacher',
        loadChildren: () => import('./pages/teacher/teacher.module').then(m => m.TeacherModule)
    }
];

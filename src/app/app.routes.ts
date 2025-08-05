import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';   
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path: 'home', component: HomeComponent },
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'student',
        loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
    },
    // Legacy route redirect for dashboard
    {path: 'dashboard', redirectTo: 'student/dashboard', pathMatch: 'full' }
];

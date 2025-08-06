import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// Chart library
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Teacher Components
import { TeacherLayoutComponent } from './teacher-layout/teacher-layout.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { SessionManagementComponent } from './session-management/session-management.component';
import { StudentMonitoringComponent } from './student-monitoring/student-monitoring.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MessagingComponent } from './messaging/messaging.component';
import { NotificationsComponent } from './notifications/notifications.component';

// Shared Components
import { SessionCardComponent } from './shared/session-card/session-card.component';
import { StudentCardComponent } from './shared/student-card/student-card.component';
import { MessageItemComponent } from './shared/message-item/message-item.component';
import { NotificationItemComponent } from './shared/notification-item/notification-item.component';
import { StatsCardComponent } from './shared/stats-card/stats-card.component';
import { SessionDialogComponent } from './shared/session-dialog/session-dialog.component';
import { AttendanceDialogComponent } from './shared/attendance-dialog/attendance-dialog.component';
import { GradeDialogComponent } from './shared/grade-dialog/grade-dialog.component';

// Routing
import { TeacherRoutingModule } from './teacher-routing.module';

@NgModule({
  declarations: [
    TeacherLayoutComponent,
    TeacherDashboardComponent,
    SessionManagementComponent,
    StudentMonitoringComponent,
    CalendarComponent,
    MessagingComponent,
    NotificationsComponent,
    SessionCardComponent,
    StudentCardComponent,
    MessageItemComponent,
    NotificationItemComponent,
    StatsCardComponent,
    SessionDialogComponent,
    AttendanceDialogComponent,
    GradeDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TeacherRoutingModule,
    
    // Material Modules
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    
    // Charts
    NgxChartsModule
  ]
})
export class TeacherModule { }
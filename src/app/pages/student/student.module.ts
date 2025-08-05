import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Chart library
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Student components
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';

// Shared components
import { StatCardComponent } from './shared/stat-card/stat-card.component';
import { NotificationItemComponent } from './shared/notification-item/notification-item.component';
import { ScheduleItemComponent } from './shared/schedule-item/schedule-item.component';
import { EventCardComponent } from './shared/event-card/event-card.component';

// Student routing
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  declarations: [
    StudentLayoutComponent,
    StudentDashboardComponent,
    StatCardComponent,
    NotificationItemComponent,
    ScheduleItemComponent,
    EventCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    StudentRoutingModule,
    
    // Angular Material
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    MatProgressBarModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    
    // Charts
    NgxChartsModule
  ]
})
export class StudentModule { }
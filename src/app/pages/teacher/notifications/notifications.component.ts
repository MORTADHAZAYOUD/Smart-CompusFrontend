import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  template: `
    <div class="placeholder-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Notifications</mat-card-title>
          <mat-card-subtitle>View and manage your notifications</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="placeholder-content">
            <mat-icon>notifications</mat-icon>
            <h3>Notifications System</h3>
            <p>This module will include:</p>
            <ul>
              <li>View all notifications</li>
              <li>Mark as read/unread</li>
              <li>Filter by type and priority</li>
              <li>Real-time updates</li>
            </ul>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .placeholder-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    .placeholder-content {
      text-align: center;
      padding: 48px 24px;
    }
    .placeholder-content mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #1976d2;
      margin-bottom: 16px;
    }
    .placeholder-content ul {
      text-align: left;
      max-width: 300px;
      margin: 24px auto;
    }
  `]
})
export class NotificationsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() suffix: string = '';
  @Input() icon: string = '';
  @Input() color: 'success' | 'warning' | 'danger' | 'info' | 'primary' = 'primary';
  @Input() percentage?: number;
  @Input() trend?: 'up' | 'down' | 'stable';
  @Input() trendValue?: number;

  getColorClass(): string {
    return `stat-card-${this.color}`;
  }

  getTrendIcon(): string {
    switch (this.trend) {
      case 'up':
        return 'trending_up';
      case 'down':
        return 'trending_down';
      default:
        return 'trending_flat';
    }
  }

  getTrendClass(): string {
    return `trend-${this.trend}`;
  }
}
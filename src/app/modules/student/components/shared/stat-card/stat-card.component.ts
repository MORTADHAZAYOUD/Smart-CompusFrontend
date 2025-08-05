import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
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
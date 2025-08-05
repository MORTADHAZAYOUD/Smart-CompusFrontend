import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface DashboardCardData {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  action?: {
    label: string;
    route?: string;
    onClick?: () => void;
  };
}

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent {
  @Input() data!: DashboardCardData;
  @Input() loading = false;
  @Input() clickable = false;
  @Output() cardClick = new EventEmitter<void>();

  onCardClick(): void {
    if (this.clickable) {
      this.cardClick.emit();
    }
  }

  getTrendColor(trend?: { value: number; isPositive: boolean }): string {
    if (!trend) return '#999';
    return trend.isPositive ? '#4CAF50' : '#F44336';
  }

  getTrendIcon(trend?: { value: number; isPositive: boolean }): string {
    if (!trend) return 'trending_flat';
    return trend.isPositive ? 'trending_up' : 'trending_down';
  }
}
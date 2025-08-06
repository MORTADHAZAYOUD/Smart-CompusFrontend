import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  template: `<div>Stats Card Placeholder</div>`
})
export class StatsCardComponent {
  @Input() title!: string;
  @Input() value!: string | number;
  @Input() icon!: string;
}
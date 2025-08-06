import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-student-tracking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-tracking.component.html',
  styleUrls: ['./student-tracking.component.scss']
})
export class StudentTrackingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
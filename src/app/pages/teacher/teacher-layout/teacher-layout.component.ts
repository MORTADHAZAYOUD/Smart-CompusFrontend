import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TeacherSidebarComponent } from '../shared/teacher-sidebar/teacher-sidebar.component'; // adjust path as needed
import { TeacherHeaderComponent } from '../shared/teacher-header/teacher-header.component'; 
@Component({
  selector: 'app-teacher-layout',
    standalone: true,
  imports: [CommonModule, RouterLink,     RouterModule,    TeacherSidebarComponent,   // ✅ Added
    TeacherHeaderComponent  ],
  templateUrl: './teacher-layout.component.html',
  styleUrls: ['./teacher-layout.component.scss']
})
export class TeacherLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onSidebarToggle(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
  }
}
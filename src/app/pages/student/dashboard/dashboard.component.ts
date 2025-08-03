// student-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
// Update the import path to the correct location of student.service.ts
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  stats = {
    moyenne: 15.5,
    tauxPresence: 92,
    coursSemaine: 8,
    devoirsRendre: 3
  };

  studentName = 'John Doe';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.studentService.getDashboardStats().subscribe(data => {
      this.stats = data;
    });
  }

  navigateTo(route: string): void {
    // Simple navigation logic
    window.location.href = `/student/${route}`;
  }
}
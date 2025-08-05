import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  stats = {
    moyenne: 15.5,
    tauxPresence: 92,
    coursSemaine: 8,
    devoirsRendre: 3
  };

  recentNotes: any[] = [];
  upcomingSeances: any[] = [];
  recentMessages: any[] = [];
  isLoading = true;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    Promise.all([
      this.studentService.getDashboardStats().toPromise(),
      this.studentService.getMyNotes().toPromise(),
      this.studentService.getMySeances().toPromise(),
      this.studentService.getMyMessages().toPromise()
    ]).then(([stats, notes, seances, messages]) => {
      this.stats = stats;
      this.recentNotes = notes.slice(0, 3);
      this.upcomingSeances = seances.slice(0, 3);
      this.recentMessages = messages.slice(0, 3);
      this.isLoading = false;
    }).catch(error => {
      console.error('Error loading dashboard data:', error);
      this.isLoading = false;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate(['/student', route]);
  }

  getGradeColor(note: number): string {
    if (note >= 16) return '#10b981';
    if (note >= 14) return '#f59e0b';
    if (note >= 12) return '#ef4444';
    return '#6b7280';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  }
}
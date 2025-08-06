import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherService, Session } from '../../../services/teacher.service';
import { SessionDialogComponent } from '../shared/session-dialog/session-dialog.component';
import { AttendanceDialogComponent } from '../shared/attendance-dialog/attendance-dialog.component';
import { GradeDialogComponent } from '../shared/grade-dialog/grade-dialog.component';

@Component({
  selector: 'app-session-management',
  templateUrl: './session-management.component.html',
  styleUrls: ['./session-management.component.scss']
})
export class SessionManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['title', 'type', 'subject', 'class', 'date', 'time', 'actions'];
  dataSource = new MatTableDataSource<Session>();
  isLoading = true;
  selectedFilter = 'all';
  searchTerm = '';

  filterOptions = [
    { value: 'all', label: 'All Sessions' },
    { value: 'cours', label: 'Courses' },
    { value: 'devoir', label: 'Assignments' },
    { value: 'examen', label: 'Exams' }
  ];

  constructor(
    private teacherService: TeacherService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadSessions(): void {
    this.isLoading = true;
    this.teacherService.getSessions().subscribe(
      sessions => {
        this.dataSource.data = sessions;
        this.applyFilters();
        this.isLoading = false;
      },
      error => {
        console.error('Error loading sessions:', error);
        this.snackBar.open('Error loading sessions', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    );
  }

  applyFilters(): void {
    let filteredData = this.dataSource.data;

    // Apply type filter
    if (this.selectedFilter !== 'all') {
      filteredData = filteredData.filter(session => session.type === this.selectedFilter);
    }

    // Apply search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filteredData = filteredData.filter(session =>
        session.title.toLowerCase().includes(searchLower) ||
        session.subject.toLowerCase().includes(searchLower) ||
        session.class.toLowerCase().includes(searchLower)
      );
    }

    this.dataSource.data = filteredData;
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  createSession(): void {
    const dialogRef = this.dialog.open(SessionDialogComponent, {
      width: '600px',
      data: { session: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teacherService.createSession(result).subscribe(
          newSession => {
            this.loadSessions();
            this.snackBar.open('Session created successfully', 'Close', { duration: 3000 });
          },
          error => {
            console.error('Error creating session:', error);
            this.snackBar.open('Error creating session', 'Close', { duration: 3000 });
          }
        );
      }
    });
  }

  editSession(session: Session): void {
    const dialogRef = this.dialog.open(SessionDialogComponent, {
      width: '600px',
      data: { session: { ...session }, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && session.id) {
        this.teacherService.updateSession(session.id, result).subscribe(
          updatedSession => {
            this.loadSessions();
            this.snackBar.open('Session updated successfully', 'Close', { duration: 3000 });
          },
          error => {
            console.error('Error updating session:', error);
            this.snackBar.open('Error updating session', 'Close', { duration: 3000 });
          }
        );
      }
    });
  }

  deleteSession(session: Session): void {
    if (confirm(`Are you sure you want to delete "${session.title}"?`)) {
      if (session.id) {
        this.teacherService.deleteSession(session.id).subscribe(
          () => {
            this.loadSessions();
            this.snackBar.open('Session deleted successfully', 'Close', { duration: 3000 });
          },
          error => {
            console.error('Error deleting session:', error);
            this.snackBar.open('Error deleting session', 'Close', { duration: 3000 });
          }
        );
      }
    }
  }

  markAttendance(session: Session): void {
    const dialogRef = this.dialog.open(AttendanceDialogComponent, {
      width: '800px',
      data: { session }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Attendance updated successfully', 'Close', { duration: 3000 });
      }
    });
  }

  assignGrades(session: Session): void {
    const dialogRef = this.dialog.open(GradeDialogComponent, {
      width: '800px',
      data: { session }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Grades assigned successfully', 'Close', { duration: 3000 });
      }
    });
  }

  getSessionTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      cours: 'book',
      devoir: 'assignment',
      examen: 'quiz'
    };
    return icons[type] || 'school';
  }

  getSessionTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      cours: '#1976d2',
      devoir: '#ff9800',
      examen: '#f44336'
    };
    return colors[type] || '#757575';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatTime(startTime: string, endTime: string): string {
    return `${startTime} - ${endTime}`;
  }

  isSessionPast(dateString: string, endTime: string): boolean {
    const sessionDateTime = new Date(`${dateString} ${endTime}`);
    return sessionDateTime < new Date();
  }

  isSessionToday(dateString: string): boolean {
    const sessionDate = new Date(dateString);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString();
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatCardComponent } from '../shared/stat-card/stat-card.component';
import { StudentService, Note } from '../../../services/student.service';

interface SubjectSummary {
  subject: string;
  subjectCode: string;
  notes: Note[];
  average: number;
  weightedAverage: number;
  totalCoefficient: number;
}

@Component({
  selector: 'app-student-notes',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
    NgxChartsModule,
    StatCardComponent
  ],
  templateUrl: './student-notes.component.html',
  styleUrls: ['./student-notes.component.scss']
})
export class StudentNotesComponent implements OnInit {
  notes$: Observable<Note[]>;
  subjectSummaries$: Observable<SubjectSummary[]>;
  globalAverage$: Observable<number>;
  
  displayedColumns: string[] = ['date', 'examType', 'grade', 'maxGrade', 'coefficient', 'teacher'];
  selectedSubject: string = 'all';
  sortBy: string = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(private studentService: StudentService) {
    this.notes$ = this.studentService.getNotes();
    this.subjectSummaries$ = this.calculateSubjectSummaries();
    this.globalAverage$ = this.calculateGlobalAverage();
  }

  ngOnInit(): void {}

  private calculateSubjectSummaries(): Observable<SubjectSummary[]> {
    return this.notes$.pipe(
      map(notes => {
        const subjectMap = new Map<string, Note[]>();
        
        // Group notes by subject
        notes.forEach(note => {
          if (!subjectMap.has(note.subject)) {
            subjectMap.set(note.subject, []);
          }
          subjectMap.get(note.subject)?.push(note);
        });

        // Calculate summaries for each subject
        const summaries: SubjectSummary[] = [];
        subjectMap.forEach((subjectNotes, subject) => {
          const totalWeighted = subjectNotes.reduce((sum, note) => 
            sum + (note.grade * note.coefficient), 0);
          const totalCoefficient = subjectNotes.reduce((sum, note) => 
            sum + note.coefficient, 0);
          const weightedAverage = totalCoefficient > 0 ? totalWeighted / totalCoefficient : 0;
          const average = subjectNotes.reduce((sum, note) => sum + note.grade, 0) / subjectNotes.length;

          summaries.push({
            subject,
            subjectCode: subjectNotes[0].subjectCode,
            notes: subjectNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
            average,
            weightedAverage,
            totalCoefficient
          });
        });

        return summaries.sort((a, b) => a.subject.localeCompare(b.subject));
      })
    );
  }

  private calculateGlobalAverage(): Observable<number> {
    return this.subjectSummaries$.pipe(
      map(summaries => {
        if (summaries.length === 0) return 0;
        const totalWeighted = summaries.reduce((sum, summary) => 
          sum + (summary.weightedAverage * summary.totalCoefficient), 0);
        const totalCoefficient = summaries.reduce((sum, summary) => 
          sum + summary.totalCoefficient, 0);
        return totalCoefficient > 0 ? totalWeighted / totalCoefficient : 0;
      })
    );
  }

  getFilteredNotes(): Observable<Note[]> {
    return combineLatest([this.notes$, this.subjectSummaries$]).pipe(
      map(([notes, summaries]) => {
        if (!notes) return [];
        
        let filteredNotes = notes;
        
        // Filter by subject
        if (this.selectedSubject !== 'all') {
          filteredNotes = notes.filter(note => note.subject === this.selectedSubject);
        }
        
        // Sort notes
        filteredNotes = [...filteredNotes].sort((a, b) => {
          let comparison = 0;
          
          switch (this.sortBy) {
            case 'date':
              comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
              break;
            case 'grade':
              comparison = a.grade - b.grade;
              break;
            case 'subject':
              comparison = a.subject.localeCompare(b.subject);
              break;
            case 'examType':
              comparison = a.examType.localeCompare(b.examType);
              break;
            default:
              comparison = 0;
          }
          
          return this.sortDirection === 'asc' ? comparison : -comparison;
        });
        
        return filteredNotes;
      })
    );
  }

  onSortChange(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'desc';
    }
  }

  getGradeColor(grade: number, maxGrade: number): 'success' | 'warning' | 'danger' | 'info' | 'primary' {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  }

  getGradePercentage(grade: number, maxGrade: number): number {
    return (grade / maxGrade) * 100;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getExamTypeIcon(examType: string): string {
    const icons = {
      'Midterm': 'quiz',
      'Final': 'assignment',
      'Quiz': 'help',
      'Project': 'work',
      'Lab Report': 'science',
      'Essay': 'edit',
      'Presentation': 'present_to_all'
    };
    return icons[examType as keyof typeof icons] || 'assignment';
  }

  getSubjectIcon(subject: string): string {
    const icons = {
      'Mathematics': 'functions',
      'Physics': 'scatter_plot',
      'Chemistry': 'science',
      'Computer Science': 'computer',
      'English': 'translate',
      'History': 'history_edu',
      'Biology': 'biotech'
    };
    return icons[subject as keyof typeof icons] || 'book';
  }
}
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';

interface Note {
  id: number;
  matiere: string;
  enseignant: string;
  type: string;
  date: Date;
  note: number;
  coefficient: number;
}

interface SubjectAverage {
  subject: string;
  average: number;
  count: number;
}

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.scss']
})
export class MyNotesComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  subjects: string[] = [];
  subjectAverages: SubjectAverage[] = [];
  
  // Filter properties
  searchTerm = '';
  selectedSubject = '';
  selectedType = '';
  sortBy = 'date';
  
  // Statistics
  averageGrade = 0;
  totalNotes = 0;
  isLoading = true;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.studentService.getMyNotes().subscribe({
      next: (notes) => {
        this.notes = notes.map(note => ({
          ...note,
          date: new Date(note.date)
        }));
        this.filteredNotes = [...this.notes];
        this.extractSubjects();
        this.calculateStatistics();
        this.calculateSubjectAverages();
        this.sortNotes();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading notes:', error);
        this.isLoading = false;
      }
    });
  }

  extractSubjects(): void {
    this.subjects = [...new Set(this.notes.map(note => note.matiere))].sort();
  }

  calculateStatistics(): void {
    this.totalNotes = this.notes.length;
    if (this.totalNotes > 0) {
      const totalWeightedGrade = this.notes.reduce((sum, note) => sum + (note.note * note.coefficient), 0);
      const totalCoefficients = this.notes.reduce((sum, note) => sum + note.coefficient, 0);
      this.averageGrade = totalWeightedGrade / totalCoefficients;
    }
  }

  calculateSubjectAverages(): void {
    const subjectGroups = this.notes.reduce((groups, note) => {
      if (!groups[note.matiere]) {
        groups[note.matiere] = [];
      }
      groups[note.matiere].push(note);
      return groups;
    }, {} as { [key: string]: Note[] });

    this.subjectAverages = Object.entries(subjectGroups).map(([subject, notes]) => {
      const totalWeightedGrade = notes.reduce((sum, note) => sum + (note.note * note.coefficient), 0);
      const totalCoefficients = notes.reduce((sum, note) => sum + note.coefficient, 0);
      const average = totalWeightedGrade / totalCoefficients;
      
      return {
        subject,
        average,
        count: notes.length
      };
    }).sort((a, b) => b.average - a.average);
  }

  filterNotes(): void {
    this.filteredNotes = this.notes.filter(note => {
      const matchesSearch = !this.searchTerm || 
        note.matiere.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        note.enseignant.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesSubject = !this.selectedSubject || note.matiere === this.selectedSubject;
      const matchesType = !this.selectedType || note.type === this.selectedType;
      
      return matchesSearch && matchesSubject && matchesType;
    });
    
    this.sortNotes();
  }

  sortNotes(): void {
    this.filteredNotes.sort((a, b) => {
      switch (this.sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'matiere':
          return a.matiere.localeCompare(b.matiere);
        case 'note':
          return b.note - a.note;
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });
  }

  getGradeColor(grade: number): string {
    if (grade >= 16) return '#10b981';
    if (grade >= 14) return '#f59e0b';
    if (grade >= 12) return '#ef4444';
    return '#6b7280';
  }

  getNotesCountByRange(min: number, max: number): number {
    return this.notes.filter(note => note.note >= min && note.note <= max).length;
  }

  formatDate(date: Date, type: 'day' | 'month'): string {
    if (type === 'day') {
      return date.getDate().toString().padStart(2, '0');
    }
    return date.toLocaleDateString('fr-FR', { month: 'short' });
  }

  isRecentNote(date: Date): boolean {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return date > oneWeekAgo;
  }
}

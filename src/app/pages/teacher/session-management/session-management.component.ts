import { Component, OnInit } from '@angular/core';

interface Session {
  id: number;
  subject: string;
  class: string;
  date: Date;
  startTime: string;
  endTime: string;
  room: string;
  studentsCount: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  attendanceMarked: boolean;
  gradesAssigned: boolean;
}

@Component({
  selector: 'app-session-management',
  templateUrl: './session-management.component.html',
  styleUrls: ['./session-management.component.scss']
})
export class SessionManagementComponent implements OnInit {
  
  sessions: Session[] = [
    {
      id: 1,
      subject: 'Mathématiques',
      class: '3ème A',
      date: new Date(),
      startTime: '08:00',
      endTime: '09:00',
      room: 'Salle 205',
      studentsCount: 25,
      status: 'completed',
      attendanceMarked: true,
      gradesAssigned: false
    },
    {
      id: 2,
      subject: 'Physique',
      class: 'Terminale S',
      date: new Date(),
      startTime: '10:00',
      endTime: '11:30',
      room: 'Labo 1',
      studentsCount: 28,
      status: 'ongoing',
      attendanceMarked: false,
      gradesAssigned: false
    },
    {
      id: 3,
      subject: 'Mathématiques',
      class: '1ère S',
      date: new Date(Date.now() + 86400000),
      startTime: '14:00',
      endTime: '16:00',
      room: 'Salle 205',
      studentsCount: 32,
      status: 'scheduled',
      attendanceMarked: false,
      gradesAssigned: false
    }
  ];
  
  filteredSessions: Session[] = [];
  filterStatus = 'all';
  searchTerm = '';
  showCreateModal = false;
  
  newSession: Partial<Session> = {
    subject: '',
    class: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    room: '',
    studentsCount: 0
  };

  constructor() { }

  ngOnInit(): void {
    this.filteredSessions = [...this.sessions];
  }
  
  filterSessions(): void {
    this.filteredSessions = this.sessions.filter(session => {
      const matchesStatus = this.filterStatus === 'all' || session.status === this.filterStatus;
      const matchesSearch = this.searchTerm === '' || 
        session.subject.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        session.class.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        session.room.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }
  
  onFilterChange(): void {
    this.filterSessions();
  }
  
  onSearchChange(): void {
    this.filterSessions();
  }
  
  getStatusIcon(status: string): string {
    switch(status) {
      case 'scheduled': return '📅';
      case 'ongoing': return '🟢';
      case 'completed': return '✅';
      case 'cancelled': return '❌';
      default: return '📚';
    }
  }
  
  getStatusColor(status: string): string {
    switch(status) {
      case 'scheduled': return 'info';
      case 'ongoing': return 'success';
      case 'completed': return 'primary';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  }
  
  startSession(session: Session): void {
    session.status = 'ongoing';
    this.filterSessions();
  }
  
  endSession(session: Session): void {
    session.status = 'completed';
    this.filterSessions();
  }
  
  markAttendance(session: Session): void {
    session.attendanceMarked = true;
    // Navigate to attendance marking page
  }
  
  assignGrades(session: Session): void {
    session.gradesAssigned = true;
    // Navigate to grade assignment page
  }
  
  editSession(session: Session): void {
    // Edit session logic
  }
  
  deleteSession(session: Session): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')) {
      this.sessions = this.sessions.filter(s => s.id !== session.id);
      this.filterSessions();
    }
  }
  
  openCreateModal(): void {
    this.showCreateModal = true;
    this.newSession = {
      subject: '',
      class: '',
      date: new Date(),
      startTime: '',
      endTime: '',
      room: '',
      studentsCount: 0
    };
  }
  
  closeCreateModal(): void {
    this.showCreateModal = false;
  }
  
  createSession(): void {
    if (this.isValidSession()) {
      const session: Session = {
        id: Math.max(...this.sessions.map(s => s.id)) + 1,
        subject: this.newSession.subject!,
        class: this.newSession.class!,
        date: this.newSession.date!,
        startTime: this.newSession.startTime!,
        endTime: this.newSession.endTime!,
        room: this.newSession.room!,
        studentsCount: this.newSession.studentsCount!,
        status: 'scheduled',
        attendanceMarked: false,
        gradesAssigned: false
      };
      
      this.sessions.push(session);
      this.filterSessions();
      this.closeCreateModal();
    }
  }
  
  private isValidSession(): boolean {
    return !!(
      this.newSession.subject &&
      this.newSession.class &&
      this.newSession.startTime &&
      this.newSession.endTime &&
      this.newSession.room &&
      this.newSession.studentsCount! > 0
    );
  }
}
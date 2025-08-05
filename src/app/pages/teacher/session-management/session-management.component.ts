import { Component, OnInit } from '@angular/core';
import { TeacherService, Session } from '../../../services/teacher.service';

@Component({
  selector: 'app-session-management',
  templateUrl: './session-management.component.html',
  styleUrls: ['./session-management.component.scss']
})
export class SessionManagementComponent implements OnInit {

  sessions: Session[] = [];
  selectedSession: Session | null = null;
  showCreateForm = false;
  showEditForm = false;
  newSession: Partial<Session> = {};

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.teacherService.getMySessions().subscribe(sessions => {
      this.sessions = sessions.sort((a, b) => a.date.getTime() - b.date.getTime());
    });
  }

  selectSession(session: Session): void {
    this.selectedSession = session;
    this.showCreateForm = false;
    this.showEditForm = false;
  }

  createNewSession(): void {
    this.newSession = {
      matiere: '',
      classe: '',
      date: new Date(),
      heureDebut: '',
      heureFin: '',
      salle: '',
      type: 'Cours'
    };
    this.showCreateForm = true;
    this.showEditForm = false;
    this.selectedSession = null;
  }

  editSession(): void {
    if (this.selectedSession) {
      this.newSession = { ...this.selectedSession };
      this.showEditForm = true;
      this.showCreateForm = false;
    }
  }

  saveSession(): void {
    if (this.showCreateForm) {
      this.teacherService.createSession(this.newSession).subscribe(() => {
        this.loadSessions();
        this.showCreateForm = false;
      });
    } else if (this.showEditForm && this.selectedSession) {
      this.teacherService.updateSession(this.selectedSession.id, this.newSession).subscribe(() => {
        this.loadSessions();
        this.showEditForm = false;
      });
    }
  }

  cancelForm(): void {
    this.showCreateForm = false;
    this.showEditForm = false;
    this.newSession = {};
  }

  deleteSession(): void {
    if (this.selectedSession && confirm('Êtes-vous sûr de vouloir supprimer cette séance?')) {
      this.teacherService.deleteSession(this.selectedSession.id).subscribe(() => {
        this.loadSessions();
        this.selectedSession = null;
      });
    }
  }

  markPresence(sessionId: number): void {
    window.location.href = `/teacher/sessions/${sessionId}/presence`;
  }

  getSessionTypeClass(type: string): string {
    switch (type) {
      case 'Cours': return 'course';
      case 'TD': return 'td';
      case 'TP': return 'tp';
      case 'Examen': return 'exam';
      default: return 'other';
    }
  }

  getSessionStatusClass(session: Session): string {
    const now = new Date();
    const sessionDate = new Date(session.date);
    
    if (sessionDate.toDateString() === now.toDateString()) {
      return 'today';
    } else if (sessionDate < now) {
      return 'past';
    } else {
      return 'future';
    }
  }
}
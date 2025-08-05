import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Student {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  moyenne: number;
  tauxPresence: number;
  photo?: string;
}

export interface Session {
  id: number;
  matiere: string;
  classe: string;
  date: Date;
  heureDebut: string;
  heureFin: string;
  salle: string;
  type: 'Cours' | 'TD' | 'TP' | 'Examen';
  contenu?: string;
  objectifs?: string[];
}

export interface SessionPresence {
  id: number;
  sessionId: number;
  studentId: number;
  statut: 'Présent' | 'Absent' | 'Retard';
  remarques?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  
  private apiUrl = '/api/teacher';

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboardStats(): Observable<any> {
    return of({
      nombreClasses: 4,
      nombreEtudiants: 120,
      seancesAujourdhui: 6,
      devoisACorreger: 15,
      moyenneGenerale: 13.8,
      tauxPresenceMoyen: 85
    });
  }

  // Session Management
  getMySessions(): Observable<Session[]> {
    return of([
      {
        id: 1,
        matiere: 'Mathématiques',
        classe: 'CE2 A',
        date: new Date('2024-01-20'),
        heureDebut: '08:00',
        heureFin: '09:00',
        salle: 'A101',
        type: 'Cours',
        contenu: 'Les fractions',
        objectifs: ['Comprendre la notion de fraction', 'Savoir lire une fraction']
      },
      {
        id: 2,
        matiere: 'Mathématiques',
        classe: 'CE2 B',
        date: new Date('2024-01-20'),
        heureDebut: '10:00',
        heureFin: '11:00',
        salle: 'A102',
        type: 'TD'
      }
    ]);
  }

  createSession(session: Partial<Session>): Observable<any> {
    return of({ success: true, sessionId: Math.random() });
  }

  updateSession(sessionId: number, session: Partial<Session>): Observable<any> {
    return of({ success: true });
  }

  deleteSession(sessionId: number): Observable<any> {
    return of({ success: true });
  }

  // Presence Management
  getSessionPresences(sessionId: number): Observable<SessionPresence[]> {
    return of([
      {
        id: 1,
        sessionId: sessionId,
        studentId: 1,
        statut: 'Présent'
      },
      {
        id: 2,
        sessionId: sessionId,
        studentId: 2,
        statut: 'Absent',
        remarques: 'Maladie'
      }
    ]);
  }

  markPresence(sessionId: number, presences: SessionPresence[]): Observable<any> {
    return of({ success: true });
  }

  // Student Management
  getMyStudents(): Observable<Student[]> {
    return of([
      {
        id: 1,
        nom: 'Doe',
        prenom: 'Alice',
        classe: 'CE2 A',
        moyenne: 15.2,
        tauxPresence: 95
      },
      {
        id: 2,
        nom: 'Smith',
        prenom: 'Bob',
        classe: 'CE2 A',
        moyenne: 12.8,
        tauxPresence: 87
      }
    ]);
  }

  getStudentsByClass(classe: string): Observable<Student[]> {
    return of([
      {
        id: 1,
        nom: 'Doe',
        prenom: 'Alice',
        classe: classe,
        moyenne: 15.2,
        tauxPresence: 95
      }
    ]);
  }

  getStudentProfile(studentId: number): Observable<any> {
    return of({
      id: studentId,
      nom: 'Doe',
      prenom: 'Alice',
      classe: 'CE2 A',
      moyenne: 15.2,
      tauxPresence: 95,
      notes: [
        { matiere: 'Mathématiques', note: 16.5, date: new Date('2024-01-15') }
      ],
      absences: [
        { date: new Date('2024-01-10'), motif: 'Maladie' }
      ]
    });
  }

  // Notes and Evaluation
  addNote(studentId: number, note: any): Observable<any> {
    return of({ success: true });
  }

  updateNote(noteId: number, note: any): Observable<any> {
    return of({ success: true });
  }

  getClassNotes(classe: string): Observable<any[]> {
    return of([
      {
        id: 1,
        studentId: 1,
        nom: 'Doe',
        prenom: 'Alice',
        note: 16.5,
        type: 'Contrôle',
        date: new Date('2024-01-15')
      }
    ]);
  }

  // Progress and Analytics
  getClassProgress(classe: string): Observable<any> {
    return of({
      moyenneClasse: 13.8,
      evolution: [12.5, 13.1, 13.8, 14.2],
      repartition: {
        excellent: 5,
        bien: 12,
        moyen: 8,
        insuffisant: 3
      }
    });
  }

  getStudentProgress(studentId: number): Observable<any> {
    return of({
      evolution: [12.0, 13.5, 14.8, 15.2],
      pointsForts: ['Mathématiques', 'Sciences'],
      pointsAmeliorer: ['Français', 'Histoire'],
      recommandations: [
        'Encourager la lecture',
        'Réviser les bases en orthographe'
      ]
    });
  }

  // Planning and Schedule
  getMySchedule(): Observable<any[]> {
    return of([
      {
        jour: 'Lundi',
        seances: [
          { matiere: 'Mathématiques', classe: 'CE2 A', heure: '08:00-09:00', salle: 'A101' },
          { matiere: 'Mathématiques', classe: 'CE2 B', heure: '10:00-11:00', salle: 'A102' }
        ]
      }
    ]);
  }

  createActivity(activity: any): Observable<any> {
    return of({ success: true });
  }

  // Messages and Communication
  getMyMessages(): Observable<any[]> {
    return of([
      {
        id: 1,
        expediteur: 'Parent - Alice Doe',
        sujet: 'Question sur les devoirs',
        contenu: 'Bonjour, pourriez-vous m\'expliquer l\'exercice 5?',
        date: new Date('2024-01-18'),
        lu: false,
        type: 'parent'
      }
    ]);
  }

  sendMessage(recipientId: number, subject: string, content: string): Observable<any> {
    return of({ success: true });
  }

  // Notifications
  getMyNotifications(): Observable<any[]> {
    return of([
      {
        id: 1,
        titre: 'Réunion équipe pédagogique',
        message: 'Réunion prévue demain à 14h en salle des professeurs',
        date: new Date('2024-01-18'),
        type: 'info',
        lu: false
      }
    ]);
  }

  sendAlert(studentIds: number[], message: string): Observable<any> {
    return of({ success: true });
  }
}
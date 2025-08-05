import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// ✅ Properly typed interfaces
export interface Child {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  moyenne: number;
  tauxPresence: number;
  photo?: string;
}

export interface ChildNote {
  id: number;
  childId: number;
  matiere: string;
  enseignant: string;
  type: string;
  date: Date;
  note: number;
  coefficient: number;
  commentaire?: string;
}

export interface ChildPresence {
  id: number;
  childId: number;
  matiere: string;
  date: Date;
  statut: 'Présent' | 'Absent' | 'Retard';
  heureDebut: string;
  heureFin: string;
  justifie?: boolean;
}

// ✅ New properly typed interfaces
export interface DashboardStats {
  nombreEnfants: number;
  moyenneGenerale: number;
  tauxPresenceGlobal: number;
  messagesPendants: number;
  prochainRendezVous: Date | null;
}

export interface ChildProfile {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  classe: string;
  telephone: string;
  dateNaissance: Date;
  enseignantPrincipal: string;
  allergies: string[];
  contactUrgence: {
    nom: string;
    telephone: string;
  };
}

export interface UpcomingEvent {
  id: number;
  titre: string;
  date: Date;
  heure: string;
  type: string;
  enseignant: string;
}

export interface Message {
  id: number;
  expediteur: string;
  enfant: string;
  sujet: string;
  contenu: string;
  date: Date;
  lu: boolean;
  type: string;
}

export interface Notification {
  id: number;
  titre: string;
  message: string;
  date: Date;
  type: 'warning' | 'info' | 'success' | 'error';
  lu: boolean;
  enfant: string;
}

export interface ChildAnalytics {
  evolution: {
    notes: number[];
    presence: number[];
  };
  comparaison: {
    moyenneClasse: number;
    moyenneEnfant: number;
  };
  pointsForts: string[];
  pointsAmeliorer: string[];
}

export interface ScheduleSeance {
  matiere: string;
  heure: string;
  enseignant: string;
}

export interface DaySchedule {
  jour: string;
  seances: ScheduleSeance[];
}

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  
  private readonly apiUrl = '/api/parent';
  private readonly isProduction = false; // Toggle for mock/real data

  constructor(private http: HttpClient) {}

  // ✅ Private validation method
  private validateChildId(childId: number): boolean {
    return childId > 0 && Number.isInteger(childId);
  }

  // ✅ Private error handler
  private handleError(operation = 'operation') {
    return (error: any): Observable<never> => {
      console.error(`${operation} failed:`, error);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }

  // Dashboard - ✅ Properly typed
  getDashboardStats(): Observable<DashboardStats> {
    if (!this.isProduction) {
      return of({
        nombreEnfants: 2,
        moyenneGenerale: 14.8,
        tauxPresenceGlobal: 89,
        messagesPendants: 4,
        prochainRendezVous: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
    }
    
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard`)
      .pipe(catchError(this.handleError('getDashboardStats')));
  }

  // Children management - ✅ With error handling
  getMyChildren(): Observable<Child[]> {
    if (!this.isProduction) {
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
          nom: 'Doe',
          prenom: 'Bob',
          classe: 'CM1 B',
          moyenne: 14.1,
          tauxPresence: 87
        }
      ]);
    }

    return this.http.get<Child[]>(`${this.apiUrl}/children`)
      .pipe(catchError(this.handleError('getMyChildren')));
  }

  // ✅ Properly typed with validation
  getChildProfile(childId: number): Observable<ChildProfile> {
    if (!this.validateChildId(childId)) {
      return throwError(() => new Error('Invalid child ID'));
    }

    if (!this.isProduction) {
      return of({
        id: childId,
        nom: 'Doe',
        prenom: 'Alice',
        email: 'alice.doe@school.com',
        classe: 'CE2 A',
        telephone: '12345678',
        dateNaissance: new Date('2010-05-15'),
        enseignantPrincipal: 'Mme. Martin',
        allergies: ['Arachides'],
        contactUrgence: {
          nom: 'Grand-mère',
          telephone: '87654321'
        }
      });
    }

    return this.http.get<ChildProfile>(`${this.apiUrl}/children/${childId}`)
      .pipe(catchError(this.handleError('getChildProfile')));
  }

  // Notes tracking - ✅ With validation
  getChildNotes(childId: number): Observable<ChildNote[]> {
    if (!this.validateChildId(childId)) {
      return throwError(() => new Error('Invalid child ID'));
    }

    if (!this.isProduction) {
      return of([
        {
          id: 1,
          childId: childId,
          matiere: 'Mathématiques',
          enseignant: 'Mme. Martin',
          type: 'Contrôle',
          date: new Date('2024-01-15'),
          note: 16.5,
          coefficient: 2,
          commentaire: 'Très bon travail'
        },
        {
          id: 2,
          childId: childId,
          matiere: 'Français',
          enseignant: 'M. Dupont',
          type: 'Dictée',
          date: new Date('2024-01-12'),
          note: 14.0,
          coefficient: 1
        }
      ]);
    }

    return this.http.get<ChildNote[]>(`${this.apiUrl}/children/${childId}/notes`)
      .pipe(catchError(this.handleError('getChildNotes')));
  }

  // Presence tracking
  getChildPresences(childId: number): Observable<ChildPresence[]> {
    if (!this.validateChildId(childId)) {
      return throwError(() => new Error('Invalid child ID'));
    }

    if (!this.isProduction) {
      return of([
        {
          id: 1,
          childId: childId,
          matiere: 'Mathématiques',
          date: new Date('2024-01-15'),
          statut: 'Présent',
          heureDebut: '08:00',
          heureFin: '09:00'
        },
        {
          id: 2,
          childId: childId,
          matiere: 'Français',
          date: new Date('2024-01-14'),
          statut: 'Absent',
          heureDebut: '09:00',
          heureFin: '10:00',
          justifie: false
        }
      ]);
    }

    return this.http.get<ChildPresence[]>(`${this.apiUrl}/children/${childId}/presences`)
      .pipe(catchError(this.handleError('getChildPresences')));
  }

  // ✅ Properly typed schedule
  getChildSchedule(childId: number): Observable<DaySchedule[]> {
    if (!this.validateChildId(childId)) {
      return throwError(() => new Error('Invalid child ID'));
    }

    if (!this.isProduction) {
      return of([
        {
          jour: 'Lundi',
          seances: [
            { matiere: 'Mathématiques', heure: '08:00-09:00', enseignant: 'Mme. Martin' },
            { matiere: 'Français', heure: '09:15-10:15', enseignant: 'M. Dupont' }
          ]
        }
      ]);
    }

    return this.http.get<DaySchedule[]>(`${this.apiUrl}/children/${childId}/schedule`)
      .pipe(catchError(this.handleError('getChildSchedule')));
  }

  getUpcomingEvents(): Observable<UpcomingEvent[]> {
    if (!this.isProduction) {
      return of([
        {
          id: 1,
          titre: 'Réunion parent-professeur',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          heure: '14:00',
          type: 'Rendez-vous',
          enseignant: 'Mme. Martin'
        }
      ]);
    }

    return this.http.get<UpcomingEvent[]>(`${this.apiUrl}/events`)
      .pipe(catchError(this.handleError('getUpcomingEvents')));
  }

  // Messages - ✅ Properly typed
  getMyMessages(): Observable<Message[]> {
    if (!this.isProduction) {
      return of([
        {
          id: 1,
          expediteur: 'Mme. Martin',
          enfant: 'Alice Doe',
          sujet: 'Réunion parent-enseignant',
          contenu: 'Bonjour, je souhaiterais programmer une rencontre...',
          date: new Date('2024-01-18'),
          lu: false,
          type: 'enseignant'
        }
      ]);
    }

    return this.http.get<Message[]>(`${this.apiUrl}/messages`)
      .pipe(catchError(this.handleError('getMyMessages')));
  }

  // ✅ Better response typing
  sendMessage(recipientId: number, subject: string, content: string): Observable<{success: boolean; message: string}> {
    if (!recipientId || !subject.trim() || !content.trim()) {
      return throwError(() => new Error('Invalid message parameters'));
    }

    const messageData = { recipientId, subject: subject.trim(), content: content.trim() };

    if (!this.isProduction) {
      return of({ success: true, message: 'Message envoyé avec succès' });
    }

    return this.http.post<{success: boolean; message: string}>(`${this.apiUrl}/messages`, messageData)
      .pipe(catchError(this.handleError('sendMessage')));
  }

  // Notifications - ✅ Properly typed
  getMyNotifications(): Observable<Notification[]> {
    if (!this.isProduction) {
      return of([
        {
          id: 1,
          titre: 'Absence non justifiée',
          message: 'Alice était absente hier en mathématiques',
          date: new Date('2024-01-18'),
          type: 'warning',
          lu: false,
          enfant: 'Alice Doe'
        },
        {
          id: 2,
          titre: 'Nouvelle note',
          message: 'Nouvelle note en français pour Bob',
          date: new Date('2024-01-17'),
          type: 'info',
          lu: true,
          enfant: 'Bob Doe'
        }
      ]);
    }

    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`)
      .pipe(catchError(this.handleError('getMyNotifications')));
  }

  markNotificationAsRead(notificationId: number): Observable<{success: boolean}> {
    if (!this.validateChildId(notificationId)) {
      return throwError(() => new Error('Invalid notification ID'));
    }

    if (!this.isProduction) {
      return of({ success: true });
    }

    return this.http.patch<{success: boolean}>(`${this.apiUrl}/notifications/${notificationId}/read`, {})
      .pipe(catchError(this.handleError('markNotificationAsRead')));
  }

  // ✅ Properly typed analytics
  getChildAnalytics(childId: number): Observable<ChildAnalytics> {
    if (!this.validateChildId(childId)) {
      return throwError(() => new Error('Invalid child ID'));
    }

    if (!this.isProduction) {
      return of({
        evolution: {
          notes: [14.5, 15.2, 14.8, 16.1, 15.5],
          presence: [95, 92, 98, 89, 94]
        },
        comparaison: {
          moyenneClasse: 14.2,
          moyenneEnfant: 15.2
        },
        pointsForts: ['Mathématiques', 'Sciences'],
        pointsAmeliorer: ['Histoire', 'Géographie']
      });
    }

    return this.http.get<ChildAnalytics>(`${this.apiUrl}/children/${childId}/analytics`)
      .pipe(catchError(this.handleError('getChildAnalytics')));
  }
}
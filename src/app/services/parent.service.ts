import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  
  private apiUrl = '/api/parent';

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboardStats(): Observable<any> {
    return of({
      nombreEnfants: 2,
      moyenneGenerale: 14.8,
      tauxPresenceGlobal: 89,
      messagesPendants: 4,
      prochainRendezVous: new Date('2024-01-25')
    });
  }

  // Children management
  getMyChildren(): Observable<Child[]> {
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

  getChildProfile(childId: number): Observable<any> {
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

  // Notes tracking
  getChildNotes(childId: number): Observable<ChildNote[]> {
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

  // Presence tracking
  getChildPresences(childId: number): Observable<ChildPresence[]> {
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

  // Schedule and Events
  getChildSchedule(childId: number): Observable<any[]> {
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

  getUpcomingEvents(): Observable<any[]> {
    return of([
      {
        id: 1,
        titre: 'Réunion parent-professeur',
        date: new Date('2024-01-25'),
        heure: '14:00',
        type: 'Rendez-vous',
        enseignant: 'Mme. Martin'
      }
    ]);
  }

  // Messages
  getMyMessages(): Observable<any[]> {
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

  sendMessage(recipientId: number, subject: string, content: string): Observable<any> {
    return of({ success: true, message: 'Message envoyé avec succès' });
  }

  // Notifications
  getMyNotifications(): Observable<any[]> {
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

  markNotificationAsRead(notificationId: number): Observable<any> {
    return of({ success: true });
  }

  // Reports and Analytics
  getChildAnalytics(childId: number): Observable<any> {
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
}
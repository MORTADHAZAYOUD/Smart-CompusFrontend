// services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  private apiUrl = '/api/student';

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboardStats(): Observable<any> {
    // Mock data for now - replace with real API
    return of({
      moyenne: 15.5,
      tauxPresence: 92,
      coursSemaine: 8,
      devoirsRendre: 3
    });
  }

  // Notes
  getMyNotes(): Observable<any[]> {
    // Mock data - replace with: return this.http.get<any[]>(`${this.apiUrl}/notes`);
    return of([
      {
        id: 1,
        matiere: 'Mathématiques',
        enseignant: 'Prof. Martin',
        type: 'Examen',
        date: new Date('2024-01-15'),
        note: 16.5,
        coefficient: 2
      },
      {
        id: 2,
        matiere: 'Physique',
        enseignant: 'Prof. Dubois',
        type: 'Devoir',
        date: new Date('2024-01-10'),
        note: 14.0,
        coefficient: 1
      }
    ]);
  }

  // Présences
  getMyPresences(): Observable<any[]> {
    return of([
      {
        id: 1,
        matiere: 'Mathématiques',
        date: new Date('2024-01-15'),
        statut: 'Présent',
        heureDebut: '08:00',
        heureFin: '10:00'
      }
    ]);
  }

  // Séances
  getMySeances(): Observable<any[]> {
    return of([
      {
        id: 1,
        matiere: 'Mathématiques',
        enseignant: 'Prof. Martin',
        date: new Date('2024-01-20'),
        heureDebut: '08:00',
        heureFin: '10:00',
        salle: 'A101',
        type: 'Cours'
      }
    ]);
  }

  // Schedule
  getMySchedule(): Observable<any[]> {
    return of([
      {
        jour: 'Lundi',
        seances: [
          { matiere: 'Mathématiques', heure: '08:00-10:00', salle: 'A101' },
          { matiere: 'Physique', heure: '10:15-12:15', salle: 'B205' }
        ]
      }
    ]);
  }

  // Profile
  getMyProfile(): Observable<any> {
    return of({
      id: 1,
      nom: 'Doe',
      prenom: 'John',
      email: 'john.doe@school.com',
      classe: 'L3 Informatique',
      telephone: '12345678',
      dateNaissance: new Date('2000-05-15')
    });
  }

  // Messages
  getMyMessages(): Observable<any[]> {
    return of([
      {
        id: 1,
        expediteur: 'Prof. Martin',
        sujet: 'Rappel examen',
        contenu: 'N\'oubliez pas l\'examen de demain',
        date: new Date('2024-01-18'),
        lu: false
      }
    ]);
  }

  // Notifications
  getMyNotifications(): Observable<any[]> {
    return of([
      {
        id: 1,
        titre: 'Nouvelle note',
        message: 'Votre note de mathématiques a été ajoutée',
        date: new Date('2024-01-18'),
        type: 'info',
        lu: false
      }
    ]);
  }
}
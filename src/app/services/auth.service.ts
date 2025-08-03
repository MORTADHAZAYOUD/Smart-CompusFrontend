// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface RegistrationData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  type: string;
  dateNaissance?: string;
  classe_id?: string;
  specialite?: string;
  profession?: string;
  telephone?: string;
  childrenNames?: string[];
}

export interface RegistrationResponse {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  field?: string;
  user?: {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    type: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Adjust this to your Symfony API URL

  constructor(private http: HttpClient) {}

  /**
   * Register a new user
   * @param userData - Registration data
   * @returns Observable with registration response
   */
  register(userData: RegistrationData): Observable<RegistrationResponse> {
    console.log('🚀 Sending registration data:', userData);
    
    return this.http.post<RegistrationResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('❌ Registration error:', error);
          
          // Handle different types of errors
          if (error.error && error.error.success === false) {
            // Backend returned a structured error response
            return throwError(() => error);
          } else if (error.status === 0) {
            // Network error
            return throwError(() => ({
              error: {
                success: false,
                error: 'Erreur de connexion au serveur. Vérifiez votre connexion internet.',
                code: 'NETWORK_ERROR'
              }
            }));
          } else if (error.status === 500) {
            // Server error
            return throwError(() => ({
              error: {
                success: false,
                error: 'Erreur interne du serveur. Veuillez réessayer plus tard.',
                code: 'SERVER_ERROR'
              }
            }));
          } else {
            // Other HTTP errors
            return throwError(() => ({
              error: {
                success: false,
                error: `Erreur HTTP ${error.status}: ${error.statusText}`,
                code: 'HTTP_ERROR'
              }
            }));
          }
        })
      );
  }
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}

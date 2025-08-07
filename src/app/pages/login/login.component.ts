
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('✅ Connexion réussie', res);
        localStorage.setItem('token', res.token);
        // Navigate based on user type
        if (res.user?.type) {
          switch (res.user.type) {
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            case 'teacher':
              this.router.navigate(['/teacher']);
              break;
            case 'parent':
              this.router.navigate(['/parent']);
              break;
            case 'student':
            default:
              this.router.navigate(['/student']);
              break;
          }
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('❌ Erreur de connexion', err);
        // Show error message to user
        alert('Erreur de connexion: ' + (err.error?.error || 'Erreur inconnue'));
      }
    });
  }
}
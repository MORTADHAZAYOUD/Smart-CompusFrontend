import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // Basic fields
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  userType = '';
  
  // Messages
  successMessage = '';
  errorMessage = '';
  fieldErrors: { [key: string]: string } = {};
  
  // Loading state
  isLoading = false;

  // Student specific fields
  className = '';
  birthDate = '';

  // Teacher specific fields
  specialite = '';

  // Parent specific fields
  childrenCount = 1;
  childrenNames: string[] = [''];
  profession = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Clear all error messages
  clearErrors() {
    this.errorMessage = '';
    this.fieldErrors = {};
  }

  // Show field-specific error
  showFieldError(field: string, message: string) {
    this.fieldErrors[field] = message;
  }

  // Check if field has error
  hasFieldError(field: string): boolean {
    return !!this.fieldErrors[field];
  }

  // Get field error message
  getFieldError(field: string): string {
    return this.fieldErrors[field] || '';
  }

  onUserTypeChange() {
    // Reset specific fields and errors when user type changes
    this.className = '';
    this.birthDate = '';
    this.specialite = '';
    this.childrenCount = 1;
    this.childrenNames = [''];
    this.profession = '';
    this.clearErrors();
  }

  onChildrenCountChange() {
    const count = this.childrenCount;
    this.childrenNames = Array(count).fill('').map((_, index) => 
      this.childrenNames[index] || ''
    );
    this.clearErrors();
  }

  updateChildName(index: number, name: string) {
    this.childrenNames[index] = name;
    // Clear error for this child name field
    delete this.fieldErrors[`childName${index}`];
  }

  // Comprehensive validation
  validateForm(): boolean {
    this.clearErrors();
    let isValid = true;

    // 1. Basic field validation
    if (!this.firstname.trim()) {
      this.showFieldError('firstname', 'Le prénom est obligatoire');
      isValid = false;
    } else if (this.firstname.trim().length < 2) {
      this.showFieldError('firstname', 'Le prénom doit contenir au moins 2 caractères');
      isValid = false;
    } else if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(this.firstname.trim())) {
      this.showFieldError('firstname', 'Le prénom contient des caractères invalides');
      isValid = false;
    }

    if (!this.lastname.trim()) {
      this.showFieldError('lastname', 'Le nom est obligatoire');
      isValid = false;
    } else if (this.lastname.trim().length < 2) {
      this.showFieldError('lastname', 'Le nom doit contenir au moins 2 caractères');
      isValid = false;
    } else if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(this.lastname.trim())) {
      this.showFieldError('lastname', 'Le nom contient des caractères invalides');
      isValid = false;
    }

    // 2. Email validation
    if (!this.email.trim()) {
      this.showFieldError('email', 'L\'email est obligatoire');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email.trim())) {
        this.showFieldError('email', 'Format d\'email invalide');
        isValid = false;
      }
    }

    // 3. Password validation
    if (!this.password) {
      this.showFieldError('password', 'Le mot de passe est obligatoire');
      isValid = false;
    } else if (this.password.length < 6) {
      this.showFieldError('password', 'Le mot de passe doit contenir au moins 6 caractères');
      isValid = false;
    }

    // 4. User type validation
    if (!this.userType) {
      this.showFieldError('userType', 'Veuillez sélectionner un type d\'utilisateur');
      isValid = false;
    }

    // 5. Type-specific validation
    if (this.userType === 'student') {
      if (!this.birthDate) {
        this.showFieldError('birthDate', 'La date de naissance est obligatoire');
        isValid = false;
      } else {
        // Check age (between 3 and 25 years old)
        const birthDateObj = new Date(this.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        
        const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate()) 
          ? age - 1 : age;

        if (actualAge < 3) {
          this.showFieldError('birthDate', 'L\'âge minimum est de 3 ans');
          isValid = false;
        } else if (actualAge > 25) {
          this.showFieldError('birthDate', 'L\'âge maximum est de 25 ans');
          isValid = false;
        }
      }

      if (!this.className.trim()) {
        this.showFieldError('className', 'Le nom de la classe est obligatoire');
        isValid = false;
      }
    }

    if (this.userType === 'teacher') {
      if (!this.specialite.trim()) {
        this.showFieldError('specialite', 'La spécialité est obligatoire');
        isValid = false;
      } else if (this.specialite.trim().length < 3) {
        this.showFieldError('specialite', 'La spécialité doit contenir au moins 3 caractères');
        isValid = false;
      }
    }

    if (this.userType === 'parent') {
      if (!this.profession.trim()) {
        this.showFieldError('profession', 'La profession est obligatoire');
        isValid = false;
      } else if (this.profession.trim().length < 2) {
        this.showFieldError('profession', 'La profession doit contenir au moins 2 caractères');
        isValid = false;
      }

      // Validate children names
      for (let i = 0; i < this.childrenNames.length; i++) {
        const childName = this.childrenNames[i];
        if (!childName.trim()) {
          this.showFieldError(`childName${i}`, `Le nom de l'enfant ${i + 1} est obligatoire`);
          isValid = false;
        } else if (childName.trim().length < 2) {
          this.showFieldError(`childName${i}`, `Le nom de l'enfant ${i + 1} doit contenir au moins 2 caractères`);
          isValid = false;
        } else if (!/^[a-zA-ZÀ-ÿ\s\-']+$/.test(childName.trim())) {
          this.showFieldError(`childName${i}`, `Le nom de l'enfant ${i + 1} contient des caractères invalides`);
          isValid = false;
        }
      }
    }

    // Show general error if validation failed
    if (!isValid) {
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire';
    }

    return isValid;
  }

  // Build data to send to backend
  buildRegistrationData() {
    const baseData: any = {
      email: this.email.trim().toLowerCase(),
      password: this.password,
      firstname: this.firstname.trim(),
      lastname: this.lastname.trim(),
      type: this.userType.charAt(0).toUpperCase() + this.userType.slice(1) // "student" => "Student"
    };

    // Add type-specific fields
    switch (this.userType) {
      case 'student':
        baseData.dateNaissance = this.birthDate;
        baseData.classe_id = this.className; // Note: You might want to convert this to actual class ID
        break;

      case 'teacher':
        baseData.specialite = this.specialite.trim();
        break;

      case 'parent':
        baseData.profession = this.profession.trim();
        baseData.telephone = ''; // Add telephone field if needed
        baseData.childrenNames = this.childrenNames.map(name => name.trim());
        break;
    }

    return baseData;
  }

  // Handle form submission
  onSubmit() {
    // Clear previous messages
    this.successMessage = '';
    this.errorMessage = '';

    // Validate form
    if (!this.validateForm()) {
      return;
    }

    // Set loading state
    this.isLoading = true;

    // Build registration data
    const registrationData = this.buildRegistrationData();

    // Send to backend
    this.authService.register(registrationData).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response.success) {
          this.successMessage = response.message || 'Inscription réussie !';
          this.errorMessage = '';
          this.clearErrors();
          
          // Redirect after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          // Handle backend validation errors
          this.handleBackendError(response);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('❌ Erreur d\'inscription', err);
        this.handleBackendError(err.error || err);
      }
    });
  }

  // Handle backend errors
  private handleBackendError(errorResponse: any) {
    this.successMessage = '';
    
    if (errorResponse && errorResponse.error && errorResponse.code) {
      // Handle specific error codes from backend
      switch (errorResponse.code) {
        case 'USER_EXISTS':
        case 'USER_ALREADY_EXISTS':
        case 'EMAIL_ALREADY_USED':
          this.showFieldError('email', 'Cet email est déjà utilisé');
          this.errorMessage = 'Un compte existe déjà avec cet email';
          break;

        case 'INVALID_EMAIL':
          this.showFieldError('email', 'Format d\'email invalide');
          break;

        case 'PASSWORD_TOO_SHORT':
          this.showFieldError('password', errorResponse.error);
          break;

        case 'INVALID_USER_TYPE':
          this.showFieldError('userType', errorResponse.error);
          break;

        case 'MISSING_FIELD':
          if (errorResponse.field) {
            this.showFieldError(errorResponse.field, errorResponse.error);
          }
          this.errorMessage = errorResponse.error;
          break;

        case 'INVALID_AGE':
          this.showFieldError('birthDate', errorResponse.error);
          break;

        case 'INVALID_DATE_FORMAT':
          this.showFieldError('birthDate', 'Format de date invalide');
          break;

        case 'CLASS_NOT_FOUND':
          this.showFieldError('className', 'Classe non trouvée');
          break;

        case 'MISSING_SPECIALITY':
          this.showFieldError('specialite', errorResponse.error);
          break;

        case 'MISSING_PROFESSION':
          this.showFieldError('profession', errorResponse.error);
          break;

        default:
          this.errorMessage = errorResponse.error || 'Erreur lors de l\'inscription';
      }
    } else {
      // Generic error handling
      this.errorMessage = 'Erreur de connexion. Veuillez réessayer.';
    }
  }

  // Check if there are any field errors
  hasAnyFieldErrors(): boolean {
    return Object.keys(this.fieldErrors).length > 0;
  }

  // Get field error keys for template iteration
  getFieldErrorKeys(): string[] {
    return Object.keys(this.fieldErrors);
  }

  // Reset form
  resetForm() {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.password = '';
    this.userType = '';
    this.className = '';
    this.birthDate = '';
    this.specialite = '';
    this.childrenCount = 1;
    this.childrenNames = [''];
    this.profession = '';
    this.clearErrors();
    this.successMessage = '';
  }
}
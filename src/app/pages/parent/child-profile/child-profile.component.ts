import { Component, OnInit } from '@angular/core';

interface ChildProfile {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  class: string;
  teacher: string;
  studentId: string;
  photo: string;
  address: string;
  phone: string;
  email: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalInfo: {
    allergies: string[];
    medications: string[];
    notes: string;
  };
}

@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.scss']
})
export class ChildProfileComponent implements OnInit {
  childProfile: ChildProfile = {
    firstName: 'Marie',
    lastName: 'Dupont',
    dateOfBirth: '2010-05-15',
    class: '6ème A',
    teacher: 'Mme. Martin',
    studentId: 'ST2024001',
    photo: '',
    address: '123 Rue de la Paix, 75001 Paris',
    phone: '01 23 45 67 89',
    email: 'marie.dupont@example.com',
    emergencyContact: {
      name: 'Jean Dupont',
      relationship: 'Père',
      phone: '06 12 34 56 78'
    },
    medicalInfo: {
      allergies: ['Arachides', 'Lactose'],
      medications: ['Ventoline (si besoin)'],
      notes: 'Asthme léger, inhalateur disponible à l\'infirmerie'
    }
  };

  isEditMode = false;

  constructor() {}

  ngOnInit(): void {}

  getAge(): number {
    const today = new Date();
    const birthDate = new Date(this.childProfile.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile(): void {
    // Here you would typically save to a service
    this.isEditMode = false;
    // Show success message
  }

  cancelEdit(): void {
    this.isEditMode = false;
    // Reset changes if needed
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
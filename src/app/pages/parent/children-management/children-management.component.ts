import { Component, OnInit } from '@angular/core';

interface Child {
  id: number;
  name: string;
  class: string;
  dateOfBirth: Date;
  studentId: string;
  profileImage?: string;
  averageGrade: number;
  attendance: number;
  behaviorRating: string;
  linkedDate: Date;
  status: 'active' | 'inactive';
  teachers: Teacher[];
  subjects: Subject[];
  emergencyContact?: string;
}

interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  phone?: string;
}

interface Subject {
  name: string;
  teacher: string;
  currentGrade: number;
  attendance: number;
  lastActivity: Date;
}

interface LinkChildRequest {
  studentId: string;
  studentName: string;
  verificationCode?: string;
}

@Component({
  selector: 'app-children-management',
  templateUrl: './children-management.component.html',
  styleUrls: ['./children-management.component.scss']
})
export class ChildrenManagementComponent implements OnInit {

  children: Child[] = [
    {
      id: 1,
      name: 'Emma Dupont',
      class: '3ème A',
      dateOfBirth: new Date('2009-03-15'),
      studentId: 'STU2024001',
      averageGrade: 15.2,
      attendance: 95,
      behaviorRating: 'Excellent',
      linkedDate: new Date('2023-09-01'),
      status: 'active',
      emergencyContact: '06 12 34 56 78',
      teachers: [
        { id: 1, name: 'Mme Dubois', subject: 'Mathématiques', email: 'dubois@smartcompus.com', phone: '01 23 45 67 89' },
        { id: 2, name: 'M. Martin', subject: 'Français', email: 'martin@smartcompus.com', phone: '01 23 45 67 90' },
        { id: 3, name: 'Mlle Bernard', subject: 'Sciences', email: 'bernard@smartcompus.com' }
      ],
      subjects: [
        { name: 'Mathématiques', teacher: 'Mme Dubois', currentGrade: 16.5, attendance: 98, lastActivity: new Date('2024-01-15') },
        { name: 'Français', teacher: 'M. Martin', currentGrade: 14.8, attendance: 92, lastActivity: new Date('2024-01-14') },
        { name: 'Sciences', teacher: 'Mlle Bernard', currentGrade: 15.5, attendance: 96, lastActivity: new Date('2024-01-13') },
        { name: 'Histoire', teacher: 'M. Leroy', currentGrade: 14.2, attendance: 94, lastActivity: new Date('2024-01-12') }
      ]
    },
    {
      id: 2,
      name: 'Lucas Dupont',
      class: '6ème B',
      dateOfBirth: new Date('2012-07-22'),
      studentId: 'STU2024002',
      averageGrade: 13.8,
      attendance: 92,
      behaviorRating: 'Bien',
      linkedDate: new Date('2023-09-01'),
      status: 'active',
      emergencyContact: '06 12 34 56 78',
      teachers: [
        { id: 4, name: 'Mme Garcia', subject: 'Mathématiques', email: 'garcia@smartcompus.com', phone: '01 23 45 67 91' },
        { id: 5, name: 'M. Rousseau', subject: 'Français', email: 'rousseau@smartcompus.com' },
        { id: 6, name: 'Mlle Petit', subject: 'Arts', email: 'petit@smartcompus.com' }
      ],
      subjects: [
        { name: 'Mathématiques', teacher: 'Mme Garcia', currentGrade: 12.5, attendance: 89, lastActivity: new Date('2024-01-15') },
        { name: 'Français', teacher: 'M. Rousseau', currentGrade: 14.2, attendance: 95, lastActivity: new Date('2024-01-14') },
        { name: 'Arts', teacher: 'Mlle Petit', currentGrade: 17.8, attendance: 98, lastActivity: new Date('2024-01-13') },
        { name: 'Sport', teacher: 'M. Lopez', currentGrade: 15.0, attendance: 88, lastActivity: new Date('2024-01-11') }
      ]
    }
  ];

  selectedChild: Child | null = null;
  showLinkChildModal = false;
  showChildDetailModal = false;
  
  linkChildRequest: LinkChildRequest = {
    studentId: '',
    studentName: '',
    verificationCode: ''
  };

  searchQuery = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor() { }

  ngOnInit(): void {
    // Load children data
  }

  get filteredChildren(): Child[] {
    if (!this.searchQuery) {
      return this.children;
    }
    
    return this.children.filter(child =>
      child.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      child.class.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      child.studentId.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openLinkChildModal(): void {
    this.showLinkChildModal = true;
    this.linkChildRequest = { studentId: '', studentName: '', verificationCode: '' };
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeLinkChildModal(): void {
    this.showLinkChildModal = false;
    this.linkChildRequest = { studentId: '', studentName: '', verificationCode: '' };
    this.errorMessage = '';
  }

  openChildDetail(child: Child): void {
    this.selectedChild = child;
    this.showChildDetailModal = true;
  }

  closeChildDetail(): void {
    this.showChildDetailModal = false;
    this.selectedChild = null;
  }

  linkNewChild(): void {
    if (!this.linkChildRequest.studentId || !this.linkChildRequest.studentName) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API call
    setTimeout(() => {
      // Mock successful linking
      const newChild: Child = {
        id: this.children.length + 1,
        name: this.linkChildRequest.studentName,
        class: 'En attente',
        dateOfBirth: new Date(),
        studentId: this.linkChildRequest.studentId,
        averageGrade: 0,
        attendance: 0,
        behaviorRating: 'En attente',
        linkedDate: new Date(),
        status: 'inactive',
        teachers: [],
        subjects: []
      };

      this.children.push(newChild);
      this.successMessage = `${this.linkChildRequest.studentName} a été lié avec succès à votre compte.`;
      this.isLoading = false;
      
      setTimeout(() => {
        this.closeLinkChildModal();
      }, 2000);
    }, 2000);
  }

  unlinkChild(child: Child): void {
    if (confirm(`Êtes-vous sûr de vouloir dissocier ${child.name} de votre compte ?`)) {
      this.children = this.children.filter(c => c.id !== child.id);
      this.successMessage = `${child.name} a été dissocié de votre compte.`;
    }
  }

  updateEmergencyContact(child: Child, newContact: string): void {
    child.emergencyContact = newContact;
    this.successMessage = 'Contact d\'urgence mis à jour avec succès.';
  }

  contactTeacher(teacher: Teacher): void {
    // Implement teacher contact functionality
    if (teacher.email) {
      window.open(`mailto:${teacher.email}?subject=Concernant mon enfant`);
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return '#2ecc71';
      case 'inactive': return '#e74c3c';
      default: return '#95a5a6';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      default: return 'Inconnu';
    }
  }

  getBehaviorColor(rating: string): string {
    switch (rating.toLowerCase()) {
      case 'excellent': return '#2ecc71';
      case 'bien': return '#3498db';
      case 'moyen': return '#f39c12';
      case 'insuffisant': return '#e74c3c';
      default: return '#95a5a6';
    }
  }

  getGradeColor(grade: number): string {
    if (grade >= 16) return '#2ecc71';
    if (grade >= 14) return '#3498db';
    if (grade >= 12) return '#f39c12';
    if (grade >= 10) return '#e67e22';
    return '#e74c3c';
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
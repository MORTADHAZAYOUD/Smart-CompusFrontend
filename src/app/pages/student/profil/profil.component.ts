import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  student: any = {};
  isLoading = true;
  isEditing = false;
  editForm: any = {};

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.studentService.getMyProfile().subscribe({
      next: (profile) => {
        this.student = profile;
        this.editForm = { ...profile };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading = false;
      }
    });
  }

  startEditing(): void {
    this.isEditing = true;
    this.editForm = { ...this.student };
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.editForm = { ...this.student };
  }

  saveProfile(): void {
    // Here you would call the API to save the profile
    console.log('Saving profile:', this.editForm);
    this.student = { ...this.editForm };
    this.isEditing = false;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }
}
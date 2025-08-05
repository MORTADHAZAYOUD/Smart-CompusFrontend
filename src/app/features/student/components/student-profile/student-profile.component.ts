import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  student: Student | null = null;
  loading = true;
  editing = false;
  profileForm!: FormGroup;
  imagePreview: string | null = null;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStudentProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      birthDate: ['', [Validators.required]],
      parentName: ['', [Validators.required]],
      parentPhone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]]
    });
  }

  loadStudentProfile(): void {
    this.studentService.getStudentProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (student) => {
          this.student = student;
          this.populateForm(student);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading student profile:', error);
          this.loading = false;
          this.snackBar.open('Error loading profile', 'Close', { duration: 3000 });
        }
      });
  }

  populateForm(student: Student): void {
    this.profileForm.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      address: student.address,
      birthDate: student.birthDate,
      parentName: student.parentName,
      parentPhone: student.parentPhone
    });
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    if (!this.editing) {
      this.populateForm(this.student!);
      this.imagePreview = null;
    }
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const updatedProfile = {
        ...this.student,
        ...this.profileForm.value
      };

      this.studentService.updateStudentProfile(updatedProfile)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (student) => {
            this.student = student;
            this.editing = false;
            this.imagePreview = null;
            this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error updating profile:', error);
            this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
          }
        });
    } else {
      this.markFormGroupTouched();
      this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 3000 });
    }
  }

  cancelEdit(): void {
    this.editing = false;
    this.populateForm(this.student!);
    this.imagePreview = null;
  }

  markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) return `Please enter a valid ${fieldName}`;
    }
    return '';
  }

  getCurrentImage(): string {
    return this.imagePreview || this.student?.photo || '';
  }
}
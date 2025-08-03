import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService, Teacher } from '../../../services/admin.service';

@Component({
  selector: 'app-teachers-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DatePipe],
  templateUrl: './teachers-management.component.html',
  styleUrls: ['./teachers-management.component.scss']
})
export class TeachersManagementComponent implements OnInit {
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];
  loading = true;
  showModal = false;
  editMode = false;
  selectedTeacher: Teacher | null = null;
  
  teacherForm: FormGroup;
  searchTerm = '';
  statusFilter = 'all';

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.teacherForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      specialite: ['', Validators.required],
      telephone: [''],
      status: ['active', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.loading = true;
    
    // Simulate API call with mock data
    setTimeout(() => {
      this.teachers = [
        {
          id: 1,
          firstname: 'Dr. Marie',
          lastname: 'Dubois',
          email: 'marie.dubois@university.com',
          specialite: 'Mathématiques',
          telephone: '0123456789',
          status: 'active',
          createdAt: new Date('2023-01-15')
        },
        {
          id: 2,
          firstname: 'Prof. Jean',
          lastname: 'Martin',
          email: 'jean.martin@university.com',
          specialite: 'Informatique',
          telephone: '0123456790',
          status: 'active',
          createdAt: new Date('2023-02-01')
        },
        {
          id: 3,
          firstname: 'Dr. Sophie',
          lastname: 'Laurent',
          email: 'sophie.laurent@university.com',
          specialite: 'Physique',
          telephone: '0123456791',
          status: 'active',
          createdAt: new Date('2023-03-10')
        },
        {
          id: 4,
          firstname: 'Prof. Pierre',
          lastname: 'Durand',
          email: 'pierre.durand@university.com',
          specialite: 'Chimie',
          telephone: '0123456792',
          status: 'inactive',
          createdAt: new Date('2023-04-05')
        }
      ];
      
      this.filteredTeachers = [...this.teachers];
      this.loading = false;
    }, 1000);
  }

  filterTeachers(): void {
    this.filteredTeachers = this.teachers.filter(teacher => {
      const matchesSearch = teacher.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           teacher.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           teacher.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           teacher.specialite.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || teacher.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  openModal(teacher?: Teacher): void {
    this.editMode = !!teacher;
    this.selectedTeacher = teacher || null;
    this.showModal = true;
    
    if (teacher) {
      this.teacherForm.patchValue({
        firstname: teacher.firstname,
        lastname: teacher.lastname,
        email: teacher.email,
        specialite: teacher.specialite,
        telephone: teacher.telephone,
        status: teacher.status
      });
    } else {
      this.teacherForm.reset();
      this.teacherForm.patchValue({ status: 'active' });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedTeacher = null;
    this.teacherForm.reset();
  }

  onSubmit(): void {
    if (this.teacherForm.valid) {
      const teacherData = this.teacherForm.value;
      
      if (this.editMode && this.selectedTeacher) {
        // Update teacher
        console.log('Updating teacher:', teacherData);
        const index = this.teachers.findIndex(t => t.id === this.selectedTeacher!.id);
        if (index !== -1) {
          this.teachers[index] = { ...this.teachers[index], ...teacherData };
          this.filterTeachers();
        }
      } else {
        // Create new teacher
        console.log('Creating teacher:', teacherData);
        const newTeacher: Teacher = {
          id: Math.max(...this.teachers.map(t => t.id)) + 1,
          ...teacherData,
          createdAt: new Date()
        };
        this.teachers.push(newTeacher);
        this.filterTeachers();
      }
      
      this.closeModal();
    }
  }

  deleteTeacher(teacher: Teacher): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'enseignant ${teacher.firstname} ${teacher.lastname} ?`)) {
      console.log('Deleting teacher:', teacher.id);
      this.teachers = this.teachers.filter(t => t.id !== teacher.id);
      this.filterTeachers();
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      default: return status;
    }
  }
}
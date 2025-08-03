import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService, Student } from '../../../services/admin.service';

@Component({
  selector: 'app-students-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DatePipe],
  templateUrl: './students-management.component.html',
  styleUrls: ['./students-management.component.scss']
})
export class StudentsManagementComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  loading = true;
  showModal = false;
  editMode = false;
  selectedStudent: Student | null = null;
  
  studentForm: FormGroup;
  searchTerm = '';
  statusFilter = 'all';
  
  classes = [
    { id: 1, name: 'L1 Informatique' },
    { id: 2, name: 'L2 Informatique' },
    { id: 3, name: 'L3 Informatique' },
    { id: 4, name: 'M1 Informatique' },
    { id: 5, name: 'M2 Informatique' }
  ];

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required],
      classe_id: ['', Validators.required],
      telephone: [''],
      status: ['active', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    
    // Simulate API call with mock data
    setTimeout(() => {
      this.students = [
        {
          id: 1,
          firstname: 'Jean',
          lastname: 'Dupont',
          email: 'jean.dupont@email.com',
          dateNaissance: '2000-05-15',
          classe_id: 3,
          classe_name: 'L3 Informatique',
          telephone: '0123456789',
          status: 'active',
          createdAt: new Date('2023-09-01')
        },
        {
          id: 2,
          firstname: 'Marie',
          lastname: 'Martin',
          email: 'marie.martin@email.com',
          dateNaissance: '1999-12-03',
          classe_id: 4,
          classe_name: 'M1 Informatique',
          telephone: '0123456790',
          status: 'active',
          createdAt: new Date('2023-09-01')
        },
        {
          id: 3,
          firstname: 'Pierre',
          lastname: 'Durand',
          email: 'pierre.durand@email.com',
          dateNaissance: '2001-03-22',
          classe_id: 2,
          classe_name: 'L2 Informatique',
          telephone: '0123456791',
          status: 'suspended',
          createdAt: new Date('2023-09-01')
        },
        {
          id: 4,
          firstname: 'Sophie',
          lastname: 'Laurent',
          email: 'sophie.laurent@email.com',
          dateNaissance: '2000-08-10',
          classe_id: 3,
          classe_name: 'L3 Informatique',
          telephone: '0123456792',
          status: 'active',
          createdAt: new Date('2023-09-01')
        }
      ];
      
      this.filteredStudents = [...this.students];
      this.loading = false;
    }, 1000);
  }

  filterStudents(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = student.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           student.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'all' || student.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  openModal(student?: Student): void {
    this.editMode = !!student;
    this.selectedStudent = student || null;
    this.showModal = true;
    
    if (student) {
      this.studentForm.patchValue({
        firstname: student.firstname,
        lastname: student.lastname,
        email: student.email,
        dateNaissance: student.dateNaissance,
        classe_id: student.classe_id,
        telephone: student.telephone,
        status: student.status
      });
    } else {
      this.studentForm.reset();
      this.studentForm.patchValue({ status: 'active' });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedStudent = null;
    this.studentForm.reset();
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      
      if (this.editMode && this.selectedStudent) {
        // Update student
        console.log('Updating student:', studentData);
        // this.adminService.updateStudent(this.selectedStudent.id, studentData).subscribe(...)
        
        // Simulate update
        const index = this.students.findIndex(s => s.id === this.selectedStudent!.id);
        if (index !== -1) {
          this.students[index] = { ...this.students[index], ...studentData };
          this.filterStudents();
        }
      } else {
        // Create new student
        console.log('Creating student:', studentData);
        // this.adminService.createStudent(studentData).subscribe(...)
        
        // Simulate creation
        const newStudent: Student = {
          id: Math.max(...this.students.map(s => s.id)) + 1,
          ...studentData,
          classe_name: this.classes.find(c => c.id == studentData.classe_id)?.name || '',
          createdAt: new Date()
        };
        this.students.push(newStudent);
        this.filterStudents();
      }
      
      this.closeModal();
    }
  }

  deleteStudent(student: Student): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'étudiant ${student.firstname} ${student.lastname} ?`)) {
      console.log('Deleting student:', student.id);
      // this.adminService.deleteStudent(student.id).subscribe(...)
      
      // Simulate deletion
      this.students = this.students.filter(s => s.id !== student.id);
      this.filterStudents();
    }
  }

  suspendStudent(student: Student): void {
    if (confirm(`Êtes-vous sûr de vouloir suspendre l'étudiant ${student.firstname} ${student.lastname} ?`)) {
      console.log('Suspending student:', student.id);
      // this.adminService.suspendStudent(student.id).subscribe(...)
      
      // Simulate suspension
      const index = this.students.findIndex(s => s.id === student.id);
      if (index !== -1) {
        this.students[index].status = 'suspended';
        this.filterStudents();
      }
    }
  }

  activateStudent(student: Student): void {
    console.log('Activating student:', student.id);
    // this.adminService.activateStudent(student.id).subscribe(...)
    
    // Simulate activation
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index].status = 'active';
      this.filterStudents();
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'suspended': return 'status-suspended';
      case 'inactive': return 'status-inactive';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active': return 'Actif';
      case 'suspended': return 'Suspendu';
      case 'inactive': return 'Inactif';
      default: return status;
    }
  }
}
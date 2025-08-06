import { Component, Input } from '@angular/core';
import { Student } from '../../../../services/teacher.service';

@Component({
  selector: 'app-student-card',
  template: `<div>Student Card Placeholder</div>`
})
export class StudentCardComponent {
  @Input() student!: Student;
}
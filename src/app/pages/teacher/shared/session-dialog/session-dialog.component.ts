import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeacherService, Session } from '../../../../services/teacher.service';

interface DialogData {
  session: Session | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-session-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.mode === 'create' ? 'Create' : 'Edit' }} Session</h2>
    
    <mat-dialog-content class="dialog-content">
      <form [formGroup]="sessionForm" class="session-form">
        <mat-form-field appearance="outline">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" placeholder="Enter session title">
          <mat-error *ngIf="sessionForm.get('title')?.hasError('required')">
            Title is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Type</mat-label>
          <mat-select formControlName="type">
            <mat-option value="cours">Course</mat-option>
            <mat-option value="devoir">Assignment</mat-option>
            <mat-option value="examen">Exam</mat-option>
          </mat-select>
          <mat-error *ngIf="sessionForm.get('type')?.hasError('required')">
            Type is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Subject</mat-label>
          <input matInput formControlName="subject" placeholder="Enter subject">
          <mat-error *ngIf="sessionForm.get('subject')?.hasError('required')">
            Subject is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Class</mat-label>
          <input matInput formControlName="class" placeholder="Enter class">
          <mat-error *ngIf="sessionForm.get('class')?.hasError('required')">
            Class is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="date">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="sessionForm.get('date')?.hasError('required')">
            Date is required
          </mat-error>
        </mat-form-field>

        <div class="time-fields">
          <mat-form-field appearance="outline">
            <mat-label>Start Time</mat-label>
            <input matInput type="time" formControlName="startTime">
            <mat-error *ngIf="sessionForm.get('startTime')?.hasError('required')">
              Start time is required
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>End Time</mat-label>
            <input matInput type="time" formControlName="endTime">
            <mat-error *ngIf="sessionForm.get('endTime')?.hasError('required')">
              End time is required
            </mat-error>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3" 
                    placeholder="Enter session description (optional)"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!sessionForm.valid">
        {{ data.mode === 'create' ? 'Create' : 'Update' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-content {
      min-width: 500px;
      max-height: 80vh;
      overflow-y: auto;
    }
    .session-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .time-fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class SessionDialogComponent implements OnInit {
  sessionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private dialogRef: MatDialogRef<SessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.sessionForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.data.session) {
      this.populateForm(this.data.session);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      subject: ['', Validators.required],
      class: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: ['']
    });
  }

  populateForm(session: Session): void {
    this.sessionForm.patchValue({
      title: session.title,
      type: session.type,
      subject: session.subject,
      class: session.class,
      date: new Date(session.date),
      startTime: session.startTime,
      endTime: session.endTime,
      description: session.description || ''
    });
  }

  onSave(): void {
    if (this.sessionForm.valid) {
      const formValue = this.sessionForm.value;
      const session: Session = {
        ...formValue,
        date: formValue.date.toISOString().split('T')[0] // Convert to YYYY-MM-DD
      };
      
      if (this.data.session?.id) {
        session.id = this.data.session.id;
      }
      
      this.dialogRef.close(session);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
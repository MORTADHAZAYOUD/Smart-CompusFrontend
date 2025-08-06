import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Session } from '../../../../services/teacher.service';

@Component({
  selector: 'app-attendance-dialog',
  template: `
    <h2 mat-dialog-title>Mark Attendance - {{ data.session.title }}</h2>
    <mat-dialog-content>
      <p>Attendance marking functionality will be implemented here.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `
})
export class AttendanceDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AttendanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { session: Session }
  ) {}

  onSave(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../../models/Student";

interface StudentDialogData {
  editThisStudent?: Student
}

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss'
})
export class StudentDialogComponent {
  studentForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: StudentDialogData
    ) {
    this.initializeForm(data?.editThisStudent);
  }

  private initializeForm(student?: Student): void {
    const studentData = student || { firstName: null, lastName: null, email: null };

    this.studentForm = this.fb.group({
      firstName: [studentData.firstName, Validators.required],
      lastName: [studentData.lastName, Validators.required],
      email: [studentData.email, [Validators.required, Validators.email]]
    });
  }

  submitStudentData() {
    if (this.studentForm.invalid){
      this.studentForm.markAsTouched();
    } else {
      this.matDialogRef.close(
        {
          ...this.studentForm.value,
          id: this.data?.editThisStudent ? this.data.editThisStudent.id : 1, //TODO: generate uuid
          createdAt: this.data?.editThisStudent ? this.data.editThisStudent.createdAt : new Date()
        });
    }
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}

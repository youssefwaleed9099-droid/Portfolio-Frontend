import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IEducationAPI } from '../../core/models/education.model';
import { EducationService, IEducationPayload } from '../../core/services/education-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-education',
  styleUrl: './education.css',
  templateUrl: './education.html',
})
export class Education implements OnInit {
  educationList: IEducationAPI[] = [];

  editEducationByID: string | null = null;

  educationForm: FormGroup = new FormGroup({
    university: new FormControl(''),
    college: new FormControl(''),
    major: new FormControl(''),
    graduationYear: new FormControl(''),
  });

  constructor(
    private educationService: EducationService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadEducation();
  }

  loadEducation() {
    this.educationService.getAllEducation().subscribe((data) => {
      this.educationList = data;
      this._cdr.detectChanges();
    });
  }

  onSubmit() {
    if (this.educationForm.invalid) return;

    const formData = this.educationForm.value as IEducationPayload;

    if (this.editEducationByID) {
      this.educationService.updateEducation(this.editEducationByID, formData).subscribe({
        next: () => {
          this.loadEducation();
          this.cancelEdit();
        },
        error: (err) => console.error(err),
      });
    } else {
      this.educationService.addEducation(formData).subscribe({
        next: () => {
          (this.loadEducation, this.educationForm.reset());
        },
        error: (err) => console.error(err),
      });
    }
  }

  onEdit(education: IEducationAPI) {
    this.editEducationByID = education._id;
    this.educationForm.patchValue({
      university: education.university,
      college: education.college,
      major: education.major,
      graduationYear: education.graduationYear,
    });
  }

  cancelEdit() {
    this.editEducationByID = null;
    this.educationForm.reset();
  }

  onDeleteEducation(id: string) {
    if (confirm('Are you sure you want delete education')) {
      this.educationService.deleteEducation(id).subscribe({
        next: () => {
          console.log('Education deleted successfully');
          this.loadEducation();
        },
        error: (err) => console.error(err),
      });
    }
  }
}

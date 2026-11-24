import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IEducationAPI } from '../../core/models/education.model';
import { EducationDetails } from './education-details/education-details';
import { EducationService } from '../../core/services/education-service';

@Component({
  imports: [EducationDetails],
  selector: 'app-education',
  styleUrl: './education.css',
  templateUrl: './education.html',
})
export class Education implements OnInit {
  educations!: IEducationAPI[];
  constructor(
    private _educationService: EducationService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._educationService.getAllEducation().subscribe((data) => {
      this.educations = data;
      this._cdr.detectChanges();
    });
  }
}

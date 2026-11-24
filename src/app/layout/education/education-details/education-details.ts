import { Component, Input } from '@angular/core';
import { IEducationAPI } from '../../../core/models/education.model';

@Component({
  imports: [],
  selector: 'app-education-details',
  styleUrl: './education-details.css',
  templateUrl: './education-details.html',
})
export class EducationDetails {
  @Input() myEducation!: IEducationAPI;
}

import { Component, Input } from '@angular/core';
import { IProjectsAPI } from '../../../core/models/projects.model';

@Component({
  imports: [],
  selector: 'app-projects-details',
  styleUrl: './projects-details.css',
  templateUrl: './projects-details.html',
})
export class ProjectsDetails {
  @Input() myProjects!: IProjectsAPI
}

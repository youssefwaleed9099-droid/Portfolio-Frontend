import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../core/services/projects-service';
import { ProjectsDetails } from './projects-details/projects-details';
import { IProjectsAPI } from '../../core/models/projects.model';

@Component({
  imports: [ProjectsDetails],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects implements OnInit {
  projects!: IProjectsAPI[];
  constructor(
    private _projectsService: ProjectsService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._projectsService.getAllProjects().subscribe((data) => {
      this.projects = data;
      this._cdr.detectChanges();
    });
  }
}

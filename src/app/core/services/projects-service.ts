import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IProjectsAPI } from '../models/projects.model';

// export interface IProjectPayload{
//    _id: string;
//   title: string;
//   description: string;
//   technologies: string[];
//   liveURL: string;
//   GitHubURL: string;
// }

@Service()
export class ProjectsService {
  private apiURL = 'http://localhost:3000/api/projects';
  private _http = inject(HttpClient);

  getAllProjects() {
    return this._http.get<IProjectsAPI[]>(this.apiURL);
  }

  addProject(projectData: any) {
    return this._http.post(this.apiURL, projectData);
  }

  updateProject(id: string, projectData: any) {
    return this._http.put(`${this.apiURL}/${id}`, projectData);
  }

  deleteProject(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}

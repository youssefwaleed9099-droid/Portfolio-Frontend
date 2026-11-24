import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IEducationAPI } from '../models/education.model';

export interface IEducationPayload {
  _id: string;
  university: string;
  college: string;
  major: string;
  graduationYear: number;
}

@Service()
export class EducationService {
  private apiURL = 'http://localhost:3000/api/education';
  private _http = inject(HttpClient);

  getAllEducation() {
    return this._http.get<IEducationAPI[]>(this.apiURL);
  }

  addEducation(educationData: IEducationAPI) {
    return this._http.post(this.apiURL, educationData);
  }

  updateEducation(id: string, educationData: IEducationAPI) {
    return this._http.put(`${this.apiURL}/${id}`, educationData);
  }

  deleteEducation(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}

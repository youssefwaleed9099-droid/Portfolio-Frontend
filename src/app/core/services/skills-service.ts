import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ISkillsAPI } from '../models/skills.model';

export interface ISkillPayload {
  _id: string;
  skill: string;
  category: string;
}

@Service()
export class SkillsService {
  private apiURL = 'http://localhost:3000/api/skills';
  private _http = inject(HttpClient);

  getAllSkills() {
    return this._http.get<ISkillsAPI[]>(this.apiURL);
  }

  addSkill(skillData: ISkillsAPI) {
    return this._http.post(this.apiURL, skillData);
  }

  updateSkills(id: string, skillData: ISkillsAPI) {
    return this._http.put(`${this.apiURL}/${id}`, skillData);
  }

  deleteSkill(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}

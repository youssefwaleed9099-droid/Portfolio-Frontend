import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IAboutAPI } from '../models/about.model';

@Service()
export class AboutService {
    private apiURL = 'http://localhost:3000/api/about'
    private _http = inject(HttpClient)

    getAllAboutContent() {
        return this._http.get<IAboutAPI[]>(this.apiURL)
    }

    updateAboutContent(data: any) {
        return this._http.put(this.apiURL, data)
    }
}

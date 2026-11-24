import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IHomeAPI } from '../models/home.model';

@Service()
export class HomeService {
    private apiURL = "http://localhost:3000/api/home"
    private _http = inject(HttpClient)

    getHome() {
        return this._http.get<IHomeAPI[]>(this.apiURL)
    }

    updateHomeContent(data: any) {
        return this._http.put(this.apiURL, data)
    }
}

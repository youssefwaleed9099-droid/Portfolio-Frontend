import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IContactAPI } from '../models/contact.model';

@Service()
export class ContactService {
  private apiURL = 'http://localhost:3000/api/contactForm';
  private _http = inject(HttpClient);

  getAllContacts() {
    return this._http.get<IContactAPI[]>(this.apiURL);
  }

  sendContactMessage(data: any) {
    return this._http.post(this.apiURL, data);
  }

  deleteContactMessage(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}

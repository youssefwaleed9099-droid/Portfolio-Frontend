import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IContactAPI } from '../../core/models/contact.model';
import { ContactService } from '../../core/services/contact-service';

@Component({
  imports: [],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact implements OnInit {
  messages: IContactAPI[] = [];
  constructor(
    private _contactService: ContactService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
   this.loadMessages()
  }

  loadMessages() {
     this._contactService.getAllContacts().subscribe((data) => {
      this.messages = data;
      this._cdr.detectChanges();
    });
  }

  onDeleteMessage(id: string) {
    if(confirm('Are you sure you want to delete this message?')) {
      this._contactService.deleteContactMessage(id).subscribe( () => {
        this.loadMessages()
      })
    }
  }
}

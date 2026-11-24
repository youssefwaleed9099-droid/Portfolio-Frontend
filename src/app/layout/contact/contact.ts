import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(private contactService: ContactService) {}

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.contactService.sendContactMessage(this.contactForm.value).subscribe({
      next: () => {
        this.contactForm.reset();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

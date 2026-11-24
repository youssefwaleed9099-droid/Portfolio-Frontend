import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AboutService } from '../../core/services/about-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About implements OnInit {
  selectedFile: File | null = null;

  aboutForm = new FormGroup({
    name: new FormControl(''),
    title: new FormControl(''),
    bio: new FormControl(''),
    email: new FormControl(''),
    resumeURL: new FormControl(''),
  });

  constructor(private aboutServie: AboutService) {}

  ngOnInit(): void {
    this.aboutServie.getAllAboutContent().subscribe((data) => {
      if (data && data.length > 0) {
        const aboutData = data[0];
        this.aboutForm.patchValue({
          name: aboutData.name,
          title: aboutData.title,
          bio: aboutData.bio,
          email: aboutData.email,
          resumeURL: aboutData.resumeURL,
        });
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    let myData = new FormData();
    myData.append('name', this.aboutForm.get('name')?.value || '');
    myData.append('title', this.aboutForm.get('title')?.value || '');
    myData.append('bio', this.aboutForm.get('bio')?.value || '');
    myData.append('email', this.aboutForm.get('email')?.value || '');
    myData.append('resumeURL', this.aboutForm.get('resumeURL')?.value || '');

    if (this.selectedFile) {
      myData.append('profileImage', this.selectedFile);
    }

    this.aboutServie.updateAboutContent(myData).subscribe({
      next: (res) => {
        console.log('Data updated successfully', res);
      },
      error: (err) => {
        console.error('Update data went wrong', err);
      },
    });
  }
}

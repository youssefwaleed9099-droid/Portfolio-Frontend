import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeService } from '../../core/services/home-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  homeForm: FormGroup = new FormGroup({
    availability: new FormControl('', [Validators.required, Validators.minLength(15)]),
    heading: new FormControl('', [Validators.required, Validators.minLength(15)]),
  });

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getHome().subscribe((data) => {
      if (data && data.length > 0) {
        const homeData = data[0];
        this.homeForm.patchValue({
          availability: homeData.availability,
          heading: homeData.heading,
        });
      }
    });
  }

  onSubmit() {
    const myData = {
      availability: this.homeForm.get('availability')?.value,
      heading: this.homeForm.get('heading')?.value,
    };

    this.homeService.updateHomeContent(myData).subscribe({
      next: (res) => {
        console.log('Home data updated successfully', res);
      },
      error: (err) => {
        console.log('update data went wrong');
      },
    });
    this.homeForm.reset();
  }
}

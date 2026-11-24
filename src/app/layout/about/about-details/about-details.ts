import { Component, Input } from '@angular/core';
import { IAboutAPI } from '../../../core/models/about.model';

@Component({
  imports: [],
  selector: 'app-about-details',
  styleUrl: './about-details.css',
  templateUrl: './about-details.html',
})
export class AboutDetails {
  @Input() myAbout!: IAboutAPI
}

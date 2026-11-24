import { Component, Input } from '@angular/core';
import { IHomeAPI } from '../../../core/models/home.model';

@Component({
  imports: [],
  selector: 'app-home-details',
  styleUrl: './home-details.css',
  templateUrl: './home-details.html',
})
export class HomeDetails {
  @Input() homeSection!: IHomeAPI;
}

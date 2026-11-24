import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IAboutAPI } from '../../core/models/about.model';
import { AboutDetails } from './about-details/about-details';
import { AboutService } from '../../core/services/about-service';

@Component({
  imports: [AboutDetails],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About implements OnInit {
  aboutContent?: IAboutAPI[];
  constructor(
    private _aboutService: AboutService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._aboutService.getAllAboutContent().subscribe((data) => {
      this.aboutContent = data;
      this._cdr.detectChanges();
    });
  }
}

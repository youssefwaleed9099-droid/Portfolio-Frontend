import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeDetails } from './home-details/home-details';
import { IHomeAPI } from '../../core/models/home.model';
import { HomeService } from '../../core/services/home-service';

@Component({
  imports: [HomeDetails],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  homeSec?: IHomeAPI[];
  constructor(
    private _homeService: HomeService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._homeService.getHome().subscribe((data) => {
      this.homeSec = data;
      this._cdr.detectChanges();
    });
  }
}

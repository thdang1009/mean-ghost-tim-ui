import { Component, OnInit } from '@angular/core';
import { HomeService } from '@services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoadingResults = true;
  thisYear = (new Date).getFullYear();

  constructor(private api: HomeService) { }

  ngOnInit() {
  }

}

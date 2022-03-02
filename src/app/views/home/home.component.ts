import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/_services/auth.service';
import { HomeService } from '@services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogined = false;
  isLoadingResults = true;
  thisYear = (new Date).getFullYear();

  constructor(private api: HomeService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.isLogined = this.authService.isLogin();
  }

}

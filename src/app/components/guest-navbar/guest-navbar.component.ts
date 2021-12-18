import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/_services/auth.service';
@Component({
  selector: 'app-guest-navbar',
  templateUrl: './guest-navbar.component.html',
  styleUrls: ['./guest-navbar.component.css']
})
export class GuestNavbarComponent implements OnInit {

  isLogined = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLogined = this.authService.isLogin();
  }
  gotoAdminView() {
    if (this.isLogined) {
      this.router.navigate(['admin/dashboard']);
    }
  }

  login() {
    this.router.navigate(['login']);
  }
  logout() {
    this.router.navigate(['logout']);
  }

}

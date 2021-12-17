import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/_services/_index';
import { showNoti } from '@app/_shares/common';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout()
      .subscribe(_ => {
        showNoti('Logout success!', 'success');
      }, (err) => {
      });
  }
}

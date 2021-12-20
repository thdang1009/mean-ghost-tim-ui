import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/_services/_index';
import { showNoti } from '@app/_shares/common';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout()
      .subscribe(_ => {
        this.isLoggedIn.emit(false);
        showNoti('Logout success!', 'success');
      }, (err) => {
      });
  }
}

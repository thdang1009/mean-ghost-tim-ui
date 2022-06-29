import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@services/_index';
import { showNoti } from '@shares/common';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();

  isRunning = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isRunning = true;
    this.authService.logout()
      .subscribe(_ => {
        this.isRunning = false;
        this.isLoggedIn.emit(false);
        showNoti('Logout success!', 'success');
      }, (err) => {
        this.isRunning = false;
      });
  }
}

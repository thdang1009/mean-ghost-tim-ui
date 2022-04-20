import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/_services/auth.service';
import { NavigationService } from '@app/_services/navigation.service';
import { showNoti } from '@app/_shares/common';

@Component({
  selector: 'confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(
    private authenService: AuthService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    const code = this.route.snapshot.params.confirmationCode;
    this.authenService.confirmEmail(code)
      .subscribe(_ => {
        showNoti(`Confirm email successfully!`, 'success');
        this.navigationService.gotoHome();
      }, err => {
        
        console.log(err);
        showNoti(`Confirm fail ${err}`, 'danger');
      });
  }

}

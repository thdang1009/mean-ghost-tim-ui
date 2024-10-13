import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators, NgForm, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '@services/_index';
import { showNoti } from '@shares/common';
import { MyErrorStateMatcher } from '../login/login.component';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: UntypedFormGroup;
  sentOTPForm: UntypedFormGroup;
  email = '';
  matcher = new MyErrorStateMatcher();
  isLoadingResults = false;
  isRunning = false;
  state = 1;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: [null, Validators.required],
      otp: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { validators: this.checkReasswords });

    this.sentOTPForm = this.formBuilder.group({
      email: [null, Validators.required]
    });
  }

  checkReasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  callSentOTP(form) {
    this.isRunning = true;
    this.authService.resetPassword(form)
      .subscribe(res => {
        this.isRunning = false;
        this.state = 2;
        this.resetPasswordForm.patchValue({
          email: this.sentOTPForm.value.email
        });
        showNoti('Check your email!', 'success');
      }, (err) => {
        this.isRunning = false;
      });
  }

  callUpdateNewPassword(form) {
    this.isRunning = true;
    this.authService.setNewPassword(form)
      .subscribe(res => {
        this.isRunning = false;
        showNoti('Your password has been updated, please login again!', 'success');
        this.router.navigate(['/login']);
      }, (err) => {
        this.isRunning = false;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { CONSTANT } from '@shares/constant';
import { showNoti } from '@shares/common';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username = '';
  password = '';
  matcher = new MyErrorStateMatcher();
  isLoadingResults = false;
  isRunning = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isRunning = true;
    this.authService.login(form)
      .subscribe(res => {
        this.isRunning = false;
        if (res.token) {
          localStorage.setItem(CONSTANT.TOKEN, res.token);
          this.router.navigate(['/admin/dashboard']);
          showNoti('Login success!', 'success');
        }
      }, (err) => {
        this.isRunning = false;
      });
  }

  register() {
    this.router.navigate(['register']);
  }

}

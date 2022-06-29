import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { AlertService } from '@services/alert.service';
import { UserService } from '@services/user.service';
import { showNoti } from '@shares/common';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


export class MyErrorStateMatcherRepassword implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const invalidCtrl = !!(control.invalid && (control.parent.dirty || control.touched));
    const invalidParent = !!(control.parent && control.parent.invalid && control.parent.dirty);
    return !!(control && (invalidCtrl || invalidParent) && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  registerForm: FormGroup;
  fullName = '';
  username = '';
  password = '';
  repassword = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  matcherRepassword = new MyErrorStateMatcherRepassword();
  permissions = [
    'ADMIN',
    'MEMBER'
  ];
  permission = this.permissions[1]; // CONSTANT.PERMISSION.MEMBER;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      repassword: [null, Validators.required],
      permission: [this.permissions[1], Validators.required]
    }, {
      validators: this.checkReasswords
    });
  }

  checkReasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('repassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  onFormSubmit(data: any) {
    console.log(data);
    const newUser: User = {
      fullName: data.fullName,
      username: data.username,
      permission: data.permission,
      password: data.password
    }
    this.userService.addUser(newUser)
      .subscribe(user => {
        if (user && user.id) {
          showNoti(`Create success`, 'success');
          this.router.navigate(['/admin/user-management/list-user']);
        }
      }, (err) => {
        console.log(err);
        this.alertService.error(err.error);
      });
  }
}
